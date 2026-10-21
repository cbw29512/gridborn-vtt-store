"""Private export of state-only creature SVGs; no 45-second reel needed."""
import argparse
import json
import logging
import tempfile
from pathlib import Path

from playwright.sync_api import sync_playwright
from export_demo import ROOT, encode_webm, render_frames
from state_only_spec import load_state_only_manifest
from media_cert import inspect_motion, inspect_png, inspect_video
from controller_package import create_controller_package

LOG=logging.getLogger("gridborn.state-only-export")

def render_still(spec:dict, target:Path)->None:
    size=spec["canvasPx"]
    source=(ROOT/spec["stillSource"]).read_text("utf8")
    prefix=('<html><head><style>html,body{margin:0;background:transparent}'
            f'svg{{width:{size}px;height:{size}px;display:block}}</style></head><body>')
    with sync_playwright() as p:
        browser=p.chromium.launch(headless=True,args=["--disable-dev-shm-usage"])
        try:
            page=browser.new_page(viewport={"width":size,"height":size},device_scale_factor=1)
            page.set_content(prefix+source+"</body></html>",wait_until="load")
            page.locator("svg").screenshot(path=str(target),omit_background=True)
        finally:
            browser.close()

def export_states(spec:dict,output:Path)->dict:
    output.mkdir(parents=True,exist_ok=True)
    still=output/(spec["id"]+"-still.png")
    render_still(spec,still)
    still_qa=inspect_png(still,spec["canvasPx"])
    receipts={}
    frames={}
    with tempfile.TemporaryDirectory(prefix="gridborn-state-frames-") as temp:
        root=Path(temp)
        for mode in ("idle","move","attack","rest"):
            target=root/mode
            target.mkdir()
            render_frames(spec,target,mode=mode)
            frames[mode]=target
            receipts[mode]=inspect_motion(target,spec,mode)
        rest=output/(spec["id"]+"-rest.webm")
        encode_webm(frames["rest"],rest,spec["fps"])
        rest_video=inspect_video(rest,spec["canvasPx"],spec["fps"],spec["restDurationSec"])
        state_frames={mode:frames[mode] for mode in ("idle","move","attack")}
        state_qa={mode:receipts[mode] for mode in state_frames}
        bundle=create_controller_package(
            spec,root/"unused-master",output,encode_webm,inspect_video,
            independent_frames=state_frames,independent_motion=state_qa)
    report={
      "asset":spec["id"],"status":"technical-preview-pass",
      "license":"not-verified","vttCompatibility":"untested","purchasable":False,
      "clipSource":"independent-svg-states","still":still_qa,
      "motionQA":receipts,"restVideo":rest_video,
      "files":["idle.webm","move.webm","attack.webm","rest.webm","still.png"],
      "package":bundle.name,
    }
    (output/(spec["id"]+"-media-qa.json")).write_text(json.dumps(report,indent=2)+"\n","utf8")
    return report

def main()->int:
    cli=argparse.ArgumentParser(description="Private state-only Gridborn media certification")
    cli.add_argument("--manifest",type=Path,required=True)
    cli.add_argument("--output-dir",type=Path,required=True)
    cli.add_argument("--certify",action="store_true")
    cli.add_argument("--controller-package",action="store_true")
    args=cli.parse_args()
    logging.basicConfig(level=logging.INFO,format="%(levelname)s %(message)s")
    try:
        if not args.certify or not args.controller_package:
            raise ValueError("State-only exports require full certification and controller packaging")
        spec=load_state_only_manifest(args.manifest,ROOT)
        output=args.output_dir.resolve()
        if output.is_relative_to(ROOT):
            raise ValueError("Refusing private exports inside public repository")
        report=export_states(spec,output)
        LOG.info("Verified private state-only media: %s",json.dumps(report))
        return 0
    except Exception:
        LOG.exception("State-only media export failed; no release was approved")
        return 1

if __name__=="__main__":
    raise SystemExit(main())
