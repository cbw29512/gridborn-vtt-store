"""Manifest-driven independent Foundry clip packaging contract tests."""
import copy
import json
import logging
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "tools"))
from controller_package import phase_clips
from asset_spec import load_manifest

logging.disable(logging.CRITICAL)


class FoundryClipTests(unittest.TestCase):
    def test_fighter_and_goblin_share_export_contract(self):
        for file in ("manifest.json", "cave-goblin-manifest.json"):
            with self.subTest(file=file):
                spec = load_manifest(ROOT / "assets/demos" / file, ROOT)
                self.assertEqual(phase_clips(spec), [
                    ("idle", 0, 270), ("move", 270, 80), ("attack", 350, 100)
                ])

    def test_missing_recovery_is_rejected(self):
        spec = load_manifest(ROOT / "assets/demos/manifest.json", ROOT)
        invalid = copy.deepcopy(spec)
        invalid["timeline"] = [x for x in spec["timeline"] if x["phase"] != "recover"]
        with self.assertRaises(ValueError):
            phase_clips(invalid)


if __name__ == "__main__":
    unittest.main()
