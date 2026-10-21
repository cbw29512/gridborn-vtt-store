"""Fail-closed manifest contract for original creatures with only separate states."""
import json
from pathlib import Path
from asset_spec import validate_svg

STATES=("idle","move","attack")
OUTPUTS=["transparent-webm","static-png","rest-webm"]

def validate_state_only_manifest(spec:dict, root:Path, check_files:bool=True)->dict:
    if not isinstance(spec,dict) or spec.get("schemaVersion")!=1 or spec.get("stateOnly") is not True:
        raise ValueError("Expected a v1 state-only manifest")
    if spec.get("status")!="concept-only" or spec.get("purchasable") is not False:
        raise ValueError("State-only concepts cannot be sold")
    if spec.get("artLicenseStatus")!="not-verified" or spec.get("vttCompatibility")!="untested":
        raise ValueError("No unverified licensing or VTT compatibility claims")
    if not isinstance(spec.get("id"),str) or not spec["id"].strip():
        raise ValueError("Invalid token ID")
    if type(spec.get("canvasPx")) is not int or not 128 <= spec["canvasPx"] <= 1024:
        raise ValueError("Invalid canvas size")
    fps=spec.get("fps")
    if type(fps) is not int or not 1 <= fps <= 30:
        raise ValueError("Invalid frames per second")
    if "source" in spec or "timeline" in spec:
        raise ValueError("State-only manifest cannot include a showcase reel or timeline")
    if spec.get("plannedOutputs")!=OUTPUTS:
        raise ValueError("Unexpected export contract")
    clips=spec.get("stateClips")
    if not isinstance(clips,dict) or set(clips)!=set(STATES):
        raise ValueError("Exactly three independent state clips required")
    if not isinstance(spec.get("restSource"),str) or not isinstance(spec.get("stillSource"),str):
        raise ValueError("Missing Rest or still source")
    seconds=spec.get("restDurationSec")
    if type(seconds) not in (int,float) or not 2 <= seconds <= 30:
        raise ValueError("Invalid Rest duration")
    all_clips=[(state,clips[state]) for state in STATES]
    all_clips.append(("rest",{"source":spec["restSource"],"durationSec":seconds}))
    for state,info in all_clips:
        if not isinstance(info,dict) or set(info)!={"source","durationSec"}:
            raise ValueError(f"Malformed {state} source and duration")
        duration=info["durationSec"]
        if type(duration) not in (int,float) or not 0.5 <= duration <= 30:
            raise ValueError(f"Invalid {state} duration")
        if abs(round(duration*fps)-duration*fps)>1e-8:
            raise ValueError(f"{state} duration must align with the frame grid")
    paths=[spec["stillSource"]]+[info["source"] for _,info in all_clips]
    for source in paths:
        if not isinstance(source,str) or not source.strip():
            raise ValueError("Missing source path")
        relative=Path(source)
        if relative.is_absolute() or relative.suffix!=".svg" or ".." in relative.parts:
            raise ValueError("Unsafe state source path")
        target=(root/relative).resolve()
        if not target.is_relative_to(root.resolve()):
            raise ValueError("State source escapes the repository")
        if check_files:
            if not target.is_file():
                raise FileNotFoundError(source)
            validate_svg(target)
    return spec

def load_state_only_manifest(path:Path,root:Path)->dict:
    return validate_state_only_manifest(json.loads(path.read_text("utf8")),root)
