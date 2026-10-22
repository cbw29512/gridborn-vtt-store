"""Fail closed: female Orc Pathfinder media contract stays source-only and noncommercial."""
import json
import logging
import sys
import unittest
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'tools'))
from state_only_spec import validate_state_only_manifest
class OrcPathfinderMedia(unittest.TestCase):
 def test_manifest(self):
  try:
   spec=json.loads((ROOT/'assets/demos/orc-pathfinder-female-manifest.json').read_text('utf8'))
   self.assertEqual(validate_state_only_manifest(spec,ROOT)['id'],'pregen-ranger-female-1')
   self.assertFalse(spec['purchasable'])
   self.assertEqual(spec['artLicenseStatus'],'not-verified')
   self.assertEqual(spec['vttCompatibility'],'untested')
  except Exception:
   logging.exception('Orc Pathfinder manifest validation failed')
   raise
if __name__=='__main__': unittest.main()
