"""Second-asset manifest contract and VTT sale-safety tests."""
import copy
import json
import logging
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "tools"))
from asset_spec import validate_manifest

logging.disable(logging.CRITICAL)


class GoblinManifestTests(unittest.TestCase):
    def setUp(self):
        try:
            file = ROOT / "assets/demos/cave-goblin-manifest.json"
            self.data = json.loads(file.read_text(encoding="utf-8"))
        except Exception:
            logging.exception("Unable to read goblin export manifest")
            raise

    def test_real_source_svg_is_valid_and_no_paid_outputs(self):
        validated = validate_manifest(self.data, ROOT)
        self.assertEqual(validated["id"], "mon-cave-goblin")
        self.assertFalse(validated["purchasable"])
        self.assertEqual(validated["vttCompatibility"], "untested")

    def test_action_and_rest_source_have_declared_keyframes(self):
        action = (ROOT / self.data["source"]).read_text(encoding="utf-8")
        rest = (ROOT / self.data["restSource"]).read_text(encoding="utf-8")
        self.assertIn("goblin-body 45s", action)
        self.assertIn("goblin-rest-breathe 6s", rest)
        self.assertIn("prefers-reduced-motion", rest)

    def test_platform_compatibility_cannot_be_claimed(self):
        changed = copy.deepcopy(self.data)
        changed["vttCompatibility"] = "foundry-vtt"
        with self.assertRaises(ValueError):
            validate_manifest(changed, ROOT, check_files=False)

    def test_goblin_outputs_cannot_be_purchasable(self):
        changed = copy.deepcopy(self.data)
        changed["purchasable"] = True
        with self.assertRaises(ValueError):
            validate_manifest(changed, ROOT, check_files=False)


if __name__ == "__main__":
    unittest.main()
