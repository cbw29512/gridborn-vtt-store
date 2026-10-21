"""Independent Goblin VTT media sources: fail-closed manifests and private packaging."""
import copy
import json
import logging
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "tools"))
from asset_spec import validate_manifest
from controller_package import create_controller_package

logging.disable(logging.CRITICAL)

class GoblinIndependentMediaTests(unittest.TestCase):
    def setUp(self):
        self.spec = json.loads(
            (ROOT / "assets/demos/cave-goblin-manifest.json").read_text("utf8"))

    def test_sources_validate_and_match_live_public_previews(self):
        self.assertEqual(validate_manifest(self.spec, ROOT)["id"], "mon-cave-goblin")
        for state in ("idle", "move", "attack"):
            source = self.spec["stateClips"][state]["source"]
            self.assertEqual(source, f"assets/demos/cave-goblin-{state}.svg")
            self.assertTrue((ROOT / source).is_file())
        self.assertEqual(self.spec["stateClips"]["attack"]["durationSec"], 1.4)
        self.assertEqual(self.spec["stateClips"]["move"]["durationSec"], 3.6)

    def test_missing_or_unexpected_clips_are_blocked(self):
        bad = copy.deepcopy(self.spec)
        del bad["stateClips"]["attack"]
        with self.assertRaises(ValueError):
            validate_manifest(bad, ROOT, False)
        bad = copy.deepcopy(self.spec)
        bad["stateClips"]["attack"]["durationSec"] = 1.41
        with self.assertRaises(ValueError):
            validate_manifest(bad, ROOT, False)
        bad = copy.deepcopy(self.spec)
        bad["stateClips"]["move"]["source"] = "../../untrusted.svg"
        with self.assertRaises(ValueError):
            validate_manifest(bad, ROOT, False)
        bad = copy.deepcopy(self.spec)
        bad["stateClips"]["idle"]["source"] = "/tmp/demo.svg"
        with self.assertRaises(ValueError):
            validate_manifest(bad, ROOT, False)
        bad = copy.deepcopy(self.spec)
        bad["stateClips"]["move"]["durationSec"] = 0
        with self.assertRaises(ValueError):
            validate_manifest(bad, ROOT, False)
        bad = copy.deepcopy(self.spec)
        bad["stateClips"]["idle"]["durationSec"] = True
        with self.assertRaises(ValueError):
            validate_manifest(bad, ROOT, False)

    def test_source_specific_frame_counts_and_receipt(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            independent = {}
            for state in ("idle", "move", "attack"):
                folder = root / state
                folder.mkdir()
                independent[state] = folder
            exports = root / "exports"
            exports.mkdir()
            (exports / "mon-cave-goblin-rest.webm").write_bytes(b"rest")
            (exports / "mon-cave-goblin-still.png").write_bytes(b"still")
            captured = []
            def encode(origin, target, fps, start_frame=0, frame_count=None):
                captured.append((origin.name,target.name,fps,start_frame,frame_count))
                target.write_bytes(b"prototype")
            def inspect(path, pixels, fps, seconds):
                return {"frames": round(fps * seconds), "decodedAlphaVerified": True}
            motion = {state: {"distinctSampleFrames": 2, "seamChangedPixelRatio": 0}
                      for state in independent}
            target = create_controller_package(self.spec, root / "action", exports,
                                               encode, inspect, independent, motion)
            receipt = json.loads((target / "gridborn-preview.json").read_text("utf8"))
            self.assertEqual(receipt["attackMs"], 1400)
            self.assertFalse(receipt["purchaseEnabled"])
            self.assertEqual(receipt["clipSource"], "independent-svg-states")
            self.assertEqual([(x[0],x[4]) for x in captured],
                             [("idle", 36), ("move", 36), ("attack", 14)])
            self.assertEqual(receipt["technicalQA"]["attack"]["frames"], 14)
            self.assertEqual(receipt["sourceFiles"]["attack"],
                             "assets/demos/cave-goblin-attack.svg")

    def test_independent_source_not_allowed_to_fall_back_to_master(self):
        with tempfile.TemporaryDirectory() as tmp:
            root=Path(tmp)
            (root / "mon-cave-goblin-rest.webm").write_bytes(b"rest")
            (root / "mon-cave-goblin-still.png").write_bytes(b"still")
            with self.assertRaises(ValueError):
                create_controller_package(self.spec, root, root,
                                          lambda *args,**kwargs: None,
                                          lambda *args: None)

if __name__ == "__main__":
    unittest.main()
