"""Export original Gridborn SVG animation studies privately, never to GitHub.

Use Python Playwright + Chromium to seek the source's actual CSS animations.
FFmpeg turns transparent RGBA frame PNGs into VP9-alpha WebM. These exports
are concept proofs, not licensed or VTT-certified commercial products.
"""
import argparse
import json
import logging
import shutil
import subprocess
import tempfile
from pathlib import Path

from asset_spec import load_manifest
from media_cert import inspect_motion, inspect_png, inspect_video

LOG = logging.getLogger("gridborn.export")
ROOT = Path(__file__).resolve().parents[1]
DEFAULT_SPEC = ROOT / "assets/demos/manifest.json"


def render_frames(spec: dict, frames: Path, sample: int | None = None, mode: str = "action") -> Path | None:
    """Playwright seeks each CSS keyframe deterministically at frame midpoint."""
    try:
        from playwright.sync_api import sync_playwright
        if mode not in ("action", "rest"):
            raise ValueError("Unsupported animation export mode")
        source_key = "source" if mode == "action" else "restSource"
        animated = (ROOT / spec[source_key]).read_text(encoding="utf-8")
        size, fps = spec["canvasPx"], spec["fps"]
        duration = spec["timeline"][-1]["endSec"] if mode == "action" else spec["restDurationSec"]
        count = int(duration * fps)
        if sample is not None:
            count = min(sample, count)
        html_start = ('<!doctype html><html><head><style>html,body{margin:0;background:transparent}'
                      f'svg{{width:{size}px;height:{size}px;display:block}}</style></head><body>')
        with sync_playwright() as client:
            browser = client.chromium.launch(
                headless=True, executable_path=shutil.which("chromium") or shutil.which("google-chrome"),
                args=["--disable-dev-shm-usage"])
            try:
                page = browser.new_page(viewport={"width": size, "height": size}, device_scale_factor=1)
                page.set_content(html_start + animated + "</body></html>", wait_until="load")
                page.evaluate("""() => {for (const a of document.querySelector('svg').getAnimations({subtree:true})) a.pause();}""")
                running = page.evaluate("() => document.querySelector('svg').getAnimations({subtree:true}).length")
                if not running:
                    raise ValueError("Animated source has no browser CSS animations")
                for index in range(count):
                    timestamp = (index + 0.5) * 1000 / fps
                    page.evaluate("""ms => {for (const a of document.querySelector('svg').getAnimations({subtree:true})) a.currentTime = ms;}""", timestamp)
                    page.locator("svg").screenshot(
                        path=str(frames / f"frame_{index:05d}.png"),
                        omit_background=True, animations="allow")
                if mode == "rest":
                    return None
                still = (ROOT / spec["stillSource"]).read_text(encoding="utf-8")
                page.set_content(html_start + still + "</body></html>", wait_until="load")
                poster = frames / "still.png"
                page.locator("svg").screenshot(path=str(poster), omit_background=True)
                return poster
            finally:
                browser.close()
    except Exception:
        LOG.exception("Failed to render source animation")
        raise


def encode_webm(frames: Path, target: Path, fps: int) -> None:
    try:
        ffmpeg = shutil.which("ffmpeg")
        if not ffmpeg:
            raise FileNotFoundError("FFmpeg is required for VP9-alpha output")
        args = [ffmpeg, "-hide_banner", "-loglevel", "error", "-y",
                "-framerate", str(fps), "-i", str(frames / "frame_%05d.png"),
                "-c:v", "libvpx-vp9", "-pix_fmt", "yuva420p", "-auto-alt-ref", "0",
                "-b:v", "0", "-crf", "35", "-threads", "4", str(target)]
        subprocess.run(args, check=True, capture_output=True, text=True)
        LOG.info("Created WebM concept preview: %s", target)
    except subprocess.CalledProcessError as error:
        LOG.error("FFmpeg error: %s", error.stderr)
        raise
    except Exception:
        LOG.exception("WebM encoding failed")
        raise


def main() -> int:
    try:
        cli = argparse.ArgumentParser(description="Export a private Gridborn art study")
        cli.add_argument("--manifest", type=Path, default=DEFAULT_SPEC)
        cli.add_argument("--output-dir", type=Path, required=True)
        cli.add_argument("--sample-frames", type=int, default=None)
        cli.add_argument("--certify", action="store_true", help="Run full technical media QA")
        args = cli.parse_args()
        logging.basicConfig(level=logging.INFO, format="%(levelname)s %(message)s")
        spec = load_manifest(args.manifest, ROOT)
        if args.sample_frames is not None and args.sample_frames < 1:
            raise ValueError("--sample-frames must be positive")
        if args.certify and args.sample_frames is not None:
            raise ValueError("Certification requires every action and rest frame")
        output = args.output_dir.resolve()
        if output.is_relative_to(ROOT):
            raise ValueError("Refusing to export private files inside public GitHub")
        output.mkdir(parents=True, exist_ok=True)
        with tempfile.TemporaryDirectory(prefix="gridborn-frames-") as directory:
            action_frames, rest_frames = Path(directory) / "action", Path(directory) / "rest"
            action_frames.mkdir()
            rest_frames.mkdir()
            still = render_frames(spec, action_frames, args.sample_frames, "action")
            if still is None:
                raise ValueError("Action exporter did not produce a static fallback")
            shutil.copyfile(still, output / (spec["id"] + "-still.png"))
            encode_webm(action_frames, output / (spec["id"] + "-loop.webm"), spec["fps"])
            render_frames(spec, rest_frames, args.sample_frames, "rest")
            encode_webm(rest_frames, output / (spec["id"] + "-rest.webm"), spec["fps"])
            if args.certify:
                quality = {
                    "asset": spec["id"], "status": "technical-preview-pass",
                    "license": "not-verified", "vttCompatibility": "untested",
                    "purchasable": False,
                    "still": inspect_png(output / (spec["id"] + "-still.png"), spec["canvasPx"]),
                    "actionMotion": inspect_motion(action_frames, spec, "action"),
                    "restMotion": inspect_motion(rest_frames, spec, "rest"),
                    "actionVideo": inspect_video(output / (spec["id"] + "-loop.webm"),
                                                 spec["canvasPx"], spec["fps"],
                                                 spec["timeline"][-1]["endSec"]),
                    "restVideo": inspect_video(output / (spec["id"] + "-rest.webm"),
                                               spec["canvasPx"], spec["fps"],
                                               spec["restDurationSec"]),
                }
                (output / (spec["id"] + "-media-qa.json")).write_text(
                    json.dumps(quality, indent=2) + "\n", encoding="utf-8")
                LOG.info("Technical media QA passed: %s", json.dumps(quality))
        LOG.info("Private proof-of-concept exports: %s", output)
        return 0
    except Exception:
        LOG.exception("Gridborn prototype export failed")
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
