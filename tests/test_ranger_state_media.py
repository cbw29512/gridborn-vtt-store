"""Elven Ranger source-only noncommercial manifest verification."""
import json
import logging
import sys
import unittest
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'tools'))
from state_only_spec import validate_state_only_manifest
class RangerTests(unittest.TestCase):
 def test_manifest(self):
  try:
   spec=json.loads((ROOT/'assets/demos/elven-ranger-manifest.json').read_text('utf8'))
   self.assertEqual(validate_state_only_manifest(spec,ROOT)['id'],'chr-rng-elf')
   self.assertFalse(spec['purchasable'])
   self.assertEqual(spec['artLicenseStatus'],'not-verified')
  except Exception:
   logging.exception('Ranger manifest validation failed')
   raise
if __name__=='__main__':unittest.main()
