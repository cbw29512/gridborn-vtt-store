"""Wayfarer original unarmed prototype media manifest validation."""
import json
import logging
import sys
import unittest
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'tools'))
from state_only_spec import validate_state_only_manifest
class WayfarerMedia(unittest.TestCase):
 def test_manifest(self):
  try:
   m=json.loads((ROOT/'assets/demos/human-wayfarer-monk-manifest.json').read_text('utf8'))
   self.assertEqual(validate_state_only_manifest(m,ROOT)['id'],'pregen-monk-male-1')
   self.assertFalse(m['purchasable'])
   self.assertEqual(m['artLicenseStatus'],'not-verified')
  except Exception:
   logging.exception('Wayfarer manifest validation failed')
   raise
if __name__=='__main__':unittest.main()
