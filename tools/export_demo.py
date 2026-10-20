"""Export original Gridborn SVG animation studies privately, never to GitHub.

Use Python Playwright + Chromium to seek the source's actual CSS animations.
FFmpeg turns transparent RGBA frame PNGs into VP9-alpha WebM. These exports
are concept proofs, not licensed or VTT-certified commercial products.
"""
import argparse
import logging
import shutil
import subprocess
import tempfile
from pathlib import Path

from asset_spec import load_manifest

LOG = logging.getLogger("gridborn.export")
ROOT = Path(__file__).resolve().parents[1]
DEFAULT_SPEC = ROOT / "assets/demos/manifest.json"


def render_frames(spec: dict, frames: Path, sample: int | None = None) -> Path:
    """Playwright seeks each CSS keyframe deterministically at frame midpoint."""
    try:
        from playwright.sync_api import sync_playwright
        animated = (ROOT / spec["source"]).read_text(encoding="utf-8")
        still = (ROOT / spec["stillSource"]).read_text(encoding="utf-8")
        size, fps = spec["canvasPx"], spec["fps"]
        count = int(spec["timeline"][-1]["endSec"] * fps)
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
        args = cli.parse_args()
        logging.basicConfig(level=logging.INFO, format="%(levelname)s %(message)s")
        spec = load_manifest(args.manifest, ROOT)
        if args.sample_frames is not None and args.sample_frames < 1:
            raise ValueError("--sample-frames must be positive")
        output = args.output_dir.resolve()
        if output.is_relative_to(ROOT):
            raise ValueError("Refusing to export private files inside public GitHub")
        output.mkdir(parents=True, exist_ok=True)
        with tempfile.TemporaryDirectory(prefix="gridborn-frames-") as directory:
            frames = Path(directory)
            still = render_frames(spec, frames, args.sample_frames)
            shutil.copyfile(still, output / (spec["id"] + "-still.png"))
            encode_webm(frames, output / (spec["id"] + "-loop.webm"), spec["fps"])
        LOG.info("Private proof-of-concept exports: %s", output)
        return 0
    except Exception:
        LOG.exception("Gridborn prototype export failed")
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
