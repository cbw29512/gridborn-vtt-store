"""Source-only Sparkweaver private media contract; commercial sale prohibited."""
import json
import logging
import sys
import unittest
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'tools'))
from state_only_spec import validate_state_only_manifest
class SparkweaverMedia(unittest.TestCase):
 def test_manifest(self):
  try:
   manifest=json.loads((ROOT/'assets/demos/elf-sparkweaver-sorcerer-manifest.json').read_text('utf8'))
   self.assertEqual(validate_state_only_manifest(manifest,ROOT)['id'],'pregen-sorcerer-nonbinary-1')
   self.assertFalse(manifest['purchasable'])
   self.assertEqual(manifest['artLicenseStatus'],'not-verified')
  except Exception:
   logging.exception('Sparkweaver state-only manifest invalid')
   raise
if __name__=='__main__':unittest.main()
