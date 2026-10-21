"""Validate original Gridborn token export metadata before rendering.

The manifest, not a product's name, defines the timeline and deliverables.
Only public concept studies are allowed through this prototype exporter.
"""
import json
import logging
from pathlib import Path
from xml.etree import ElementTree

LOG = logging.getLogger(__name__)
PHASES = ("idle", "move", "attack", "recover")


def validate_svg(path: Path) -> None:
    """Reject executable, external, or malformed SVG input."""
    try:
        content = path.read_text(encoding="utf-8")
        doc = ElementTree.fromstring(content)
        if doc.tag != "{http://www.w3.org/2000/svg}svg":
            raise ValueError("Expected SVG root element")
        for element in doc.iter():
            if element.tag.rsplit("}", 1)[-1] in ("script", "foreignObject"):
                raise ValueError("Executable SVG elements are forbidden")
            for key, value in element.attrib.items():
                name = key.rsplit("}", 1)[-1].lower()
                if name.startswith("on") or (name == "href" and ("://" in value or value.startswith("//"))):
                    raise ValueError("Executable or external SVG attribute")
        if "url(http" in content.lower() or "@import" in content.lower():
            raise ValueError("External CSS references are forbidden")
    except Exception:
        LOG.exception("SVG validation failed: %s", path)
        raise


def validate_manifest(data: dict, root: Path, check_files: bool = True) -> dict:
    """Fail closed on mismatched phases, unsafe paths and sale claims."""
    try:
        if data.get("schemaVersion") != 1 or data.get("status") != "concept-only":
            raise ValueError("Unrecognized schema/status")
        if data.get("purchasable") is not False or data.get("artLicenseStatus") != "not-verified":
            raise ValueError("Concepts cannot be sold or presented as licensed")
        if data.get("vttCompatibility") != "untested":
            raise ValueError("Compatibility must be independently tested")
        if not isinstance(data.get("id"), str) or not data["id"].strip():
            raise ValueError("Missing asset ID")
        if type(data.get("canvasPx")) is not int or not 128 <= data["canvasPx"] <= 1024:
            raise ValueError("canvasPx must be an integer between 128 and 1024")
        if type(data.get("fps")) is not int or not 1 <= data["fps"] <= 30:
            raise ValueError("fps must be an integer between 1 and 30")
        states = data.get("timeline")
        if not isinstance(states, list) or len(states) != len(PHASES):
            raise ValueError("Exactly four timeline phases required")
        prior = 0
        for state, name in zip(states, PHASES):
            if state.get("phase") != name or state.get("startSec") != prior:
                raise ValueError("Non-contiguous or out-of-order animation phases")
            end = state.get("endSec")
            if type(end) not in (int, float) or end <= prior:
                raise ValueError("Invalid phase duration")
            prior = end
        if prior != 45:
            raise ValueError("Prototype duration must be exactly 45 seconds")
        if data.get("plannedOutputs") != ["transparent-webm", "static-png", "rest-webm"]:
            raise ValueError("Unexpected output contract")
        if type(data.get("restDurationSec")) not in (int, float) or not 2 <= data["restDurationSec"] <= 30:
            raise ValueError("Rest loop duration must be between 2 and 30 seconds")
        independent = data.get("stateClips")
        if independent is not None:
            if not isinstance(independent, dict) or set(independent) != {"idle", "move", "attack"}:
                raise ValueError("Independent state clips must specify Idle, Move and Attack")
            for state in ("idle", "move", "attack"):
                clip = independent[state]
                if not isinstance(clip, dict) or set(clip) != {"source", "durationSec"}:
                    raise ValueError("Independent state clip requires source and durationSec")
                seconds = clip["durationSec"]
                if type(seconds) not in (int, float) or not 0.5 <= seconds <= 30:
                    raise ValueError("Invalid independent state duration")
                frames = seconds * data["fps"]
                if abs(frames - round(frames)) > 1e-8:
                    raise ValueError("Independent state duration must align to complete frames")
        for field in ("source", "stillSource", "restSource"):
            relative = Path(data.get(field, ""))
            if relative.is_absolute() or relative.suffix != ".svg" or ".." in relative.parts:
                raise ValueError(f"Unsafe {field} path")
            resolved = (root / relative).resolve()
            if not resolved.is_relative_to(root.resolve()):
                raise ValueError(f"Source escapes repository: {field}")
            if check_files:
                if not resolved.is_file():
                    raise FileNotFoundError(f"Missing SVG source: {relative}")
                validate_svg(resolved)
        if independent is not None:
            for state, clip in independent.items():
                relative = Path(clip["source"])
                if relative.is_absolute() or relative.suffix != ".svg" or ".." in relative.parts:
                    raise ValueError(f"Unsafe independent {state} source")
                resolved = (root / relative).resolve()
                if not resolved.is_relative_to(root.resolve()):
                    raise ValueError(f"Independent {state} source escapes repository")
                if check_files:
                    if not resolved.is_file():
                        raise FileNotFoundError(f"Missing independent {state} SVG")
                    validate_svg(resolved)
        return data
    except Exception:
        LOG.exception("Invalid Gridborn asset manifest")
        raise


def load_manifest(file: Path, root: Path, check_files: bool = True) -> dict:
    try:
        return validate_manifest(json.loads(file.read_text(encoding="utf-8")), root, check_files)
    except Exception:
        LOG.exception("Cannot load asset manifest: %s", file)
        raise
