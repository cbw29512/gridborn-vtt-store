"""Gray Wolf state-only export contract, private package, and release safety."""
import copy
import json
import logging
import sys
import tempfile
import unittest
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/"tools"))
from state_only_spec import load_state_only_manifest,validate_state_only_manifest
from controller_package import create_controller_package

logging.disable(logging.CRITICAL)

class WolfStateOnlyTests(unittest.TestCase):
    def setUp(self):
        self.path=ROOT/"assets/demos/gray-wolf-manifest.json"
        self.spec=json.loads(self.path.read_text("utf8"))

    def test_full_source_contract_and_loop_durations(self):
        self.assertEqual(load_state_only_manifest(self.path,ROOT)["id"],"ani-forest-wolf")
        self.assertEqual(self.spec["stateOnly"],True)
        self.assertNotIn("source",self.spec)
        self.assertNotIn("timeline",self.spec)
        self.assertEqual(self.spec["restDurationSec"],4.8)
        self.assertEqual({k:v["durationSec"] for k,v in self.spec["stateClips"].items()},
                         {"idle":3.2,"move":2,"attack":1.3})
        self.assertFalse(self.spec["purchasable"])

    def test_malformed_state_sources_fail_closed(self):
        changes=[
          ("stateOnly",False),("purchasable",True),("vttCompatibility","Foundry"),
          ("restDurationSec",4.81),("stateClips",{}),
          ("stillSource","../../secret.svg"),("artLicenseStatus","approved"),
          ("canvasPx",True)
        ]
        for key,value in changes:
            with self.subTest(key=key):
                bad=copy.deepcopy(self.spec)
                bad[key]=value
                with self.assertRaises(ValueError):
                    validate_state_only_manifest(bad,ROOT,False)
        bad=copy.deepcopy(self.spec)
        bad["stateClips"]["attack"]["durationSec"]=1.31
        with self.assertRaises(ValueError):
            validate_state_only_manifest(bad,ROOT,False)
        bad=copy.deepcopy(self.spec)
        bad["stateClips"]["move"]["source"]="/tmp/not-an-asset.svg"
        with self.assertRaises(ValueError):
            validate_state_only_manifest(bad,ROOT,False)
        bad=copy.deepcopy(self.spec)
        bad["source"]="assets/demos/gray-wolf-showcase.svg"
        with self.assertRaises(ValueError):
            validate_state_only_manifest(bad,ROOT,False)

    def test_state_exact_packages_cannot_use_reel_or_missing_frames(self):
        with tempfile.TemporaryDirectory() as tmp:
            root=Path(tmp)
            (root/"ani-forest-wolf-rest.webm").write_bytes(b"rest")
            (root/"ani-forest-wolf-still.png").write_bytes(b"still")
            encoded=[]
            def encoder(frames,target,fps,start_frame=0,frame_count=None):
                encoded.append((frames.name,target.name,fps,start_frame,frame_count))
                target.write_bytes(b"media")
            def inspect(path,canvas,fps,seconds):
                return {"frames":round(fps*seconds),"decodedAlphaVerified":True}
            frames={}
            for mode in ("idle","move","attack"):
                path=root/mode
                path.mkdir()
                frames[mode]=path
            checks={mode:{"distinctSampleFrames":3,"seamChangedPixelRatio":0}
                    for mode in frames}
            with self.assertRaises(ValueError):
                create_controller_package(self.spec,root/"absent",root,
                                          encoder,inspect)
            package=create_controller_package(
                self.spec,root/"absent",root,encoder,inspect,
                independent_frames=frames,independent_motion=checks)
            receipt=json.loads((package/"gridborn-preview.json").read_text("utf8"))
            self.assertEqual(encoded,[("idle","idle.webm",10,0,32),
                                      ("move","move.webm",10,0,20),
                                      ("attack","attack.webm",10,0,13)])
            self.assertEqual(receipt["attackMs"],1300)
            self.assertEqual(receipt["clipSource"],"independent-svg-states")
            self.assertEqual(receipt["stateOnly"],True)
            self.assertEqual(receipt["restSourceFile"],
                             "assets/demos/gray-wolf-rest.svg")
            self.assertFalse(receipt["purchaseEnabled"])
            self.assertEqual(receipt["vttCompatibility"],"untested")

if __name__=="__main__":
    unittest.main()
