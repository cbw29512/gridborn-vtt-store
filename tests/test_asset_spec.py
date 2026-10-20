"""Standard-library tests for the asset manifest and safety contract."""
import copy
import json
import logging
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "tools"))
from asset_spec import validate_manifest  # noqa: E402

logging.disable(logging.CRITICAL)  # Fail-closed tests deliberately raise errors.


class AssetManifestTests(unittest.TestCase):
    def setUp(self):
        try:
            self.sample = json.loads((ROOT / "assets/demos/manifest.json").read_text(encoding="utf-8"))
        except Exception:
            logging.exception("Failed to read manifest test data")
            raise

    def test_original_sources_validate(self):
        self.assertEqual(validate_manifest(self.sample, ROOT)["status"], "concept-only")

    def test_cannot_sell_preview(self):
        sample = copy.deepcopy(self.sample)
        sample["purchasable"] = True
        with self.assertRaises(ValueError):
            validate_manifest(sample, ROOT, False)

    def test_phase_gap_and_overlap_rejected(self):
        for start in (26, 28):
            with self.subTest(start=start):
                sample = copy.deepcopy(self.sample)
                sample["timeline"][1]["startSec"] = start
                with self.assertRaises(ValueError):
                    validate_manifest(sample, ROOT, False)

    def test_path_traversal_rejected(self):
        sample = copy.deepcopy(self.sample)
        sample["source"] = "../../private.svg"
        with self.assertRaises(ValueError):
            validate_manifest(sample, ROOT, False)

    def test_unverified_platform_claim_rejected(self):
        sample = copy.deepcopy(self.sample)
        sample["vttCompatibility"] = "all"
        with self.assertRaises(ValueError):
            validate_manifest(sample, ROOT, False)


if __name__ == "__main__":
    try:
        unittest.main()
    except Exception:
        logging.exception("Manifest test execution error")
        raise
