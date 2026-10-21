"""Automatic technical QA for *private* Gridborn prototype media.

This checks measurable media properties, not artistic quality, licensing or VTT
compatibility. FFprobe/FFmpeg and Pillow are required for a full run.
"""
import hashlib
import json
import logging
import subprocess
from fractions import Fraction
from pathlib import Path

LOG = logging.getLogger(__name__)


def check_video_metadata(info: dict, size: int, fps: int, seconds: int) -> dict:
    """Fail if a VP9 clip has incorrect dimensions, timing, frames or alpha tag."""
    try:
        streams = info.get("streams", [])
        if len(streams) != 1:
            raise ValueError("Expected one video stream")
        stream = streams[0]
        if stream.get("codec_name") != "vp9":
            raise ValueError("Expected VP9 encoding")
        if (stream.get("width"), stream.get("height")) != (size, size):
            raise ValueError("Wrong WebM canvas dimensions")
        if Fraction(stream.get("r_frame_rate", "0")) != fps:
            raise ValueError("WebM frame rate differs from manifest")
        if stream.get("tags", {}).get("alpha_mode") != "1":
            raise ValueError("WebM is missing alpha-channel metadata")
        expected = seconds * fps
        if int(stream.get("nb_read_frames", "-1")) != expected:
            raise ValueError("WebM frame count differs from manifest")
        duration = float(info.get("format", {}).get("duration", "-1"))
        if abs(duration - seconds) > 1 / fps:
            raise ValueError("WebM duration differs from manifest")
        return {"durationSec": duration, "frames": expected, "codec": "vp9"}
    except Exception:
        LOG.exception("WebM metadata certification failed")
        raise


def inspect_png(path: Path, size: int) -> dict:
    """Inspect actual pixel opacity; an RGBA flag alone is insufficient."""
    try:
        from PIL import Image
        with Image.open(path) as image:
            image.load()
            if image.size != (size, size) or image.mode != "RGBA":
                raise ValueError("Expected square RGBA PNG")
            alpha = image.getchannel("A")
            if any(alpha.getpixel(pt) != 0 for pt in
                   [(0, 0), (size - 1, 0), (0, size - 1), (size - 1, size - 1)]):
                raise ValueError("PNG background corners are not transparent")
            maximum = alpha.getextrema()[1]
            if maximum < 240:
                raise ValueError("PNG has no predominantly opaque artwork")
            return {"width": size, "height": size, "mode": "RGBA", "cornersTransparent": True}
    except Exception:
        LOG.exception("PNG alpha check failed: %s", path)
        raise


def inspect_motion(frames: Path, spec: dict, mode: str) -> dict:
    """Sample real rendered PNG pixels across time and compare loop endpoints."""
    try:
        from PIL import Image
        fps = spec["fps"]
        seconds = (spec["stateClips"][mode]["durationSec"]
                   if mode in spec.get("stateClips", {})
                   else spec["restDurationSec"] if mode == "rest"
                   else spec["timeline"][-1]["endSec"])
        frame_count = int(seconds * fps)
        step = max(1, fps // 2)
        sample_ids = sorted(set(range(0, frame_count, step)) | {frame_count - 1})
        observed = {}
        for index in sample_ids:
            with Image.open(frames / f"frame_{index:05d}.png") as img:
                rgba = img.convert("RGBA").tobytes()
            observed[index] = rgba
        hashes = {i: hashlib.sha256(raw).hexdigest() for i, raw in observed.items()}
        minimum = 2 if mode in ("rest", "idle", "move", "attack") else 4
        if len(set(hashes.values())) < minimum:
            raise ValueError(f"{mode} animation contains too little rendered motion")
        phase_counts = {}
        if mode == "action":
            for phase in spec["timeline"]:
                sample_hashes = {hashes[i] for i in sample_ids
                                 if phase["startSec"] <= (i + 0.5) / fps < phase["endSec"]}
                phase_counts[phase["phase"]] = len(sample_hashes)
            for essential in ("idle", "move", "attack"):
                if phase_counts[essential] < 2:
                    raise ValueError(f"No visible animation during {essential}")
        start, end = observed[0], observed[frame_count - 1]
        changed_pixels = sum(start[i:i + 4] != end[i:i + 4]
                             for i in range(0, len(start), 4))
        seam_ratio = changed_pixels / (len(start) / 4)
        if mode != "attack" and seam_ratio > 0.01:
            raise ValueError(f"Loop seam changes {seam_ratio:.1%} of pixels")
        return {"frames": frame_count, "distinctSampleFrames": len(set(hashes.values())),
                "seamChangedPixelRatio": round(seam_ratio, 5),
                "phaseDistinctFrames": phase_counts}
    except Exception:
        LOG.exception("Rendered %s motion check failed", mode)
        raise


def inspect_video(path: Path, size: int, fps: int, seconds: int) -> dict:
    """Independently decode real VP9 alpha pixels, not just container metadata."""
    try:
        probed = subprocess.run(
            ["ffprobe", "-v", "error", "-count_frames", "-select_streams", "v:0",
             "-show_entries", "stream=codec_name,width,height,r_frame_rate,nb_read_frames:stream_tags=alpha_mode:format=duration",
             "-of", "json", str(path)], check=True, capture_output=True, text=True)
        report = check_video_metadata(json.loads(probed.stdout), size, fps, seconds)
        frame = subprocess.run(
            ["ffmpeg", "-hide_banner", "-loglevel", "error", "-c:v", "libvpx-vp9",
             "-i", str(path), "-frames:v", "1", "-pix_fmt", "rgba",
             "-f", "rawvideo", "pipe:1"], check=True, capture_output=True)
        raw = frame.stdout
        if len(raw) != size * size * 4:
            raise ValueError("Decoded VP9 frame has incorrect RGBA byte length")
        corners = (0, size - 1, size * (size - 1), size * size - 1)
        if any(raw[index * 4 + 3] != 0 for index in corners):
            raise ValueError("VP9 alpha did not survive actual decoding")
        if max(raw[3::4]) < 240:
            raise ValueError("Decoded VP9 frame has no opaque artwork")
        report["decodedAlphaVerified"] = True
        return report
    except Exception:
        LOG.exception("WebM alpha/duration inspection failed: %s", path)
        raise
