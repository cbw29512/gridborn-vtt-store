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
                              encoder, inspect_video, independent_frames=None,
                              independent_motion=None) -> Path:
    try:
        target = exports / (spec["id"] + "-foundry")
        target.mkdir(parents=True, exist_ok=True)
        checks = {}
        clips = spec.get("stateClips", {})
        if clips and (not independent_frames or set(independent_frames) != set(clips)):
            raise ValueError("All independently sourced clips must be rendered")
        if clips and (not independent_motion or set(independent_motion) != set(clips)):
            raise ValueError("Missing independent motion and loop QA receipts")
        segments=([] if spec.get("stateOnly") else phase_clips(spec))
        if spec.get("stateOnly"):
            segments=[(mode,0,round(clips[mode]["durationSec"]*spec["fps"]))
                      for mode in ("idle","move","attack")]
        for mode, start, count in segments:
            dest = target / (mode + ".webm")
            if mode in clips:
                origin = independent_frames[mode]
                start = 0
                count = round(clips[mode]["durationSec"] * spec["fps"])
                source_seconds = clips[mode]["durationSec"]
            else:
                origin = frames
                source_seconds = count / spec["fps"]
            encoder(origin, dest, spec["fps"], start_frame=start, frame_count=count)
            checks[mode] = inspect_video(dest, spec["canvasPx"], spec["fps"],
                                         source_seconds)
        shutil.copyfile(exports / (spec["id"] + "-rest.webm"), target / "rest.webm")
        shutil.copyfile(exports / (spec["id"] + "-still.png"), target / "still.png")
        checks["rest"] = inspect_video(target / "rest.webm", spec["canvasPx"],
                                      spec["fps"], spec["restDurationSec"])
        seconds = (clips["attack"]["durationSec"] if clips else
                   next(count / spec["fps"] for label, _, count in phase_clips(spec)
                        if label == "attack"))
        receipt = {
            "assetId": spec["id"], "status": "technical-preview-pass",
            "purchaseEnabled": False, "vttCompatibility": "untested",
            "files": ["idle.webm", "move.webm", "attack.webm", "rest.webm", "still.png"],
            "attackMs": round(seconds * 1000), "technicalQA": checks,
            "clipSource": "independent-svg-states" if clips else "master-reel-split",
            "independentMotionQA": independent_motion if clips else {},
            "sourceFiles": ({state: clips[state]["source"] for state in clips}
                            if clips else {}),
            "stateOnly": spec.get("stateOnly") is True,
            "restSourceFile": spec.get("restSource") if spec.get("stateOnly") else None,
        }
        (target / "gridborn-preview.json").write_text(
            json.dumps(receipt, indent=2) + "\n", encoding="utf-8")
        return target
    except Exception:
        LOG.exception("Private controller export package generation failed")
        raise
