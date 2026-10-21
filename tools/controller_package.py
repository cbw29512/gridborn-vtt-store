"""Split a certified private action reel into independently usable VTT clips.

Uses the manifest's phase boundaries; Attack includes Recovery, then the
optional Foundry controller returns the token to Idle after ten seconds.
"""
import json
import logging
import shutil
from pathlib import Path

LOG = logging.getLogger("gridborn.controller-package")


def phase_clips(spec: dict) -> list[tuple[str, int, int]]:
    try:
        states = spec["timeline"]
        fps = spec["fps"]
        by_name = {state["phase"]: state for state in states}
        if set(by_name) != {"idle", "move", "attack", "recover"}:
            raise ValueError("Controller requires all four source animation phases")
        clips = []
        for label in ("idle", "move", "attack"):
            segment = by_name[label]
            end = by_name["recover"]["endSec"] if label == "attack" else segment["endSec"]
            start_frame = int(segment["startSec"] * fps)
            frames = int((end - segment["startSec"]) * fps)
            if frames < 1:
                raise ValueError("Empty animation segment")
            clips.append((label, start_frame, frames))
        return clips
    except Exception:
        LOG.exception("Invalid controller timeline phase metadata")
        raise


def create_controller_package(spec: dict, frames: Path, exports: Path,
                              encoder, inspect_video) -> Path:
    try:
        target = exports / (spec["id"] + "-foundry")
        target.mkdir(parents=True, exist_ok=True)
        checks = {}
        for mode, start, count in phase_clips(spec):
            dest = target / (mode + ".webm")
            encoder(frames, dest, spec["fps"], start_frame=start, frame_count=count)
            checks[mode] = inspect_video(dest, spec["canvasPx"], spec["fps"],
                                         count // spec["fps"])
        shutil.copyfile(exports / (spec["id"] + "-rest.webm"), target / "rest.webm")
        shutil.copyfile(exports / (spec["id"] + "-still.png"), target / "still.png")
        checks["rest"] = inspect_video(target / "rest.webm", spec["canvasPx"],
                                      spec["fps"], spec["restDurationSec"])
        seconds = next(count // spec["fps"] for label, _, count in phase_clips(spec)
                       if label == "attack")
        receipt = {
            "assetId": spec["id"], "status": "technical-preview-pass",
            "purchaseEnabled": False, "vttCompatibility": "untested",
            "files": ["idle.webm", "move.webm", "attack.webm", "rest.webm", "still.png"],
            "attackMs": seconds * 1000, "technicalQA": checks,
        }
        (target / "gridborn-preview.json").write_text(
            json.dumps(receipt, indent=2) + "\n", encoding="utf-8")
        return target
    except Exception:
        LOG.exception("Private controller export package generation failed")
        raise
