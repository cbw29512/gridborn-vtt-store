"""Fighter source-exact export tests: validate sources and prevent 45s reel fallback."""
import copy
import json
import logging
import sys
import tempfile
import unittest
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT / "tools"))
from asset_spec import validate_manifest
from controller_package import create_controller_package

logging.disable(logging.CRITICAL)

class FighterStateSourceTests(unittest.TestCase):
    def setUp(self):
        self.spec=json.loads((ROOT / "assets/demos/manifest.json").read_text("utf8"))

    def test_real_independent_sources_are_validated(self):
        self.assertEqual(validate_manifest(self.spec,ROOT)["id"],"chr-ftr-human")
        for state,seconds in (("idle",3.2),("move",3.2),("attack",1.4)):
            info=self.spec["stateClips"][state]
            self.assertEqual(info["source"],f"assets/demos/human-fighter-{state}.svg")
            self.assertEqual(info["durationSec"],seconds)
            self.assertTrue((ROOT / info["source"]).is_file())

    def test_missing_unsafe_and_fractional_frame_count_fail_closed(self):
        bad=copy.deepcopy(self.spec)
        del bad["stateClips"]["move"]
        with self.assertRaises(ValueError): validate_manifest(bad,ROOT,False)
        bad=copy.deepcopy(self.spec)
        bad["stateClips"]["idle"]["durationSec"]=3.21
        with self.assertRaises(ValueError): validate_manifest(bad,ROOT,False)
        bad=copy.deepcopy(self.spec)
        bad["stateClips"]["attack"]["source"]="../../danger.svg"
        with self.assertRaises(ValueError): validate_manifest(bad,ROOT,False)

    def test_controller_uses_exact_source_frames_and_attack_duration(self):
        with tempfile.TemporaryDirectory() as tmp:
            root=Path(tmp)
            exports=root / "exports"
            exports.mkdir()
            (exports / "chr-ftr-human-rest.webm").write_bytes(b"rest")
            (exports / "chr-ftr-human-still.png").write_bytes(b"still")
            frame_paths={}
            for state in ("idle","move","attack"):
                p=root / state
                p.mkdir()
                frame_paths[state]=p
            actions=[]
            def encode(source,destination,fps,start_frame=0,frame_count=None):
                actions.append((source.name,destination.name,fps,start_frame,frame_count))
                destination.write_bytes(b"video")
            def inspect(path,size,fps,seconds):
                return {"frames":round(seconds*fps),"decodedAlphaVerified":True}
            motion={state:{"distinctSampleFrames":3,"seamChangedPixelRatio":0}
                    for state in frame_paths}
            folder=create_controller_package(
                self.spec,root/"master",exports,encode,inspect,
                independent_frames=frame_paths,independent_motion=motion)
            report=json.loads((folder/"gridborn-preview.json").read_text("utf8"))
            self.assertEqual(actions,[("idle","idle.webm",10,0,32),
                                      ("move","move.webm",10,0,32),
                                      ("attack","attack.webm",10,0,14)])
            self.assertEqual(report["attackMs"],1400)
            self.assertEqual(report["clipSource"],"independent-svg-states")
            self.assertEqual(report["sourceFiles"]["move"],
                             "assets/demos/human-fighter-move.svg")
            self.assertFalse(report["purchaseEnabled"])

    def test_missing_independent_frames_cannot_fall_back_to_showcase(self):
        with tempfile.TemporaryDirectory() as tmp:
            output=Path(tmp)
            with self.assertRaises(ValueError):
                create_controller_package(self.spec,output,output,
                                          lambda *a,**kw: None,
                                          lambda *a: None)

if __name__=="__main__":
    unittest.main()
