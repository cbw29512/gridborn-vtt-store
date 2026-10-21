"""Skeleton Warrior source-exact private animation certification contract."""
import copy
import json
import logging
import sys
import tempfile
import unittest
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/"tools"))
from state_only_spec import validate_state_only_manifest
from controller_package import create_controller_package
logging.disable(logging.CRITICAL)

class SkeletonMediaSourceTests(unittest.TestCase):
    def setUp(self):
        self.spec=json.loads((ROOT/"assets/demos/skeleton-warrior-manifest.json").read_text("utf8"))

    def test_manifest_all_art_states_and_noncommercial_status(self):
        self.assertEqual(validate_state_only_manifest(self.spec,ROOT)["id"],"mon-dng-skeleton")
        self.assertEqual({k:v["durationSec"] for k,v in self.spec["stateClips"].items()},
                         {"idle":3,"move":2.4,"attack":1.4})
        self.assertEqual(self.spec["restDurationSec"],4)
        self.assertEqual(self.spec["status"],"concept-only")
        self.assertIs(self.spec["purchasable"],False)
        self.assertEqual(self.spec["vttCompatibility"],"untested")

    def test_missing_state_off_grid_and_traversal_are_rejected(self):
        for state in ("idle","move","attack"):
            missing=copy.deepcopy(self.spec)
            del missing["stateClips"][state]
            with self.assertRaises(ValueError):
                validate_state_only_manifest(missing,ROOT,False)
            wrong=copy.deepcopy(self.spec)
            wrong["stateClips"][state]["durationSec"]=1.41
            with self.assertRaises(ValueError):
                validate_state_only_manifest(wrong,ROOT,False)
            bad=copy.deepcopy(self.spec)
            bad["stateClips"][state]["source"]="../../etc/passwd"
            with self.assertRaises(ValueError):
                validate_state_only_manifest(bad,ROOT,False)

    def test_package_uses_each_independent_skeleton_svg_and_nonliving_rest(self):
        with tempfile.TemporaryDirectory() as temp:
            dest=Path(temp)
            (dest/"mon-dng-skeleton-rest.webm").write_bytes(b"r")
            (dest/"mon-dng-skeleton-still.png").write_bytes(b"s")
            frames={}
            for state in ("idle","move","attack"):
                folder=dest/state
                folder.mkdir()
                frames[state]=folder
            got=[]
            def encode(src,target,fps,start_frame=0,frame_count=None):
                got.append((src.name,target.name,fps,start_frame,frame_count))
                target.write_bytes(b"private")
            def inspect(path,size,fps,seconds):
                return {"frames":round(seconds*fps),"decodedAlphaVerified":True}
            motion={state:{"distinctSampleFrames":2,"seamChangedPixelRatio":0}
                    for state in frames}
            receipt=create_controller_package(self.spec,dest/"master-not-present",dest,
                                              encode,inspect,frames,motion)
            data=json.loads((receipt/"gridborn-preview.json").read_text("utf8"))
            self.assertEqual(got,[("idle","idle.webm",10,0,30),
                                   ("move","move.webm",10,0,24),
                                   ("attack","attack.webm",10,0,14)])
            self.assertEqual(data["attackMs"],1400)
            self.assertEqual(data["clipSource"],"independent-svg-states")
            self.assertEqual(data["restSourceFile"],"assets/demos/skeleton-warrior-rest.svg")
            self.assertEqual(data["sourceFiles"]["attack"],
                             "assets/demos/skeleton-warrior-attack.svg")
            self.assertFalse(data["purchaseEnabled"])

if __name__=="__main__":
    unittest.main()
