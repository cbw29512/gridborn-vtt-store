"""Hexwarden original private media export remains noncommercial."""
import json
import logging
import sys
import unittest
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'tools'))
from state_only_spec import validate_state_only_manifest
class HexwardenMedia(unittest.TestCase):
 def test_manifest(self):
  try:
   m=json.loads((ROOT/'assets/demos/dwarf-hexwarden-warlock-manifest.json').read_text('utf8'))
   self.assertEqual(validate_state_only_manifest(m,ROOT)['id'],'pregen-warlock-nonbinary-1')
   self.assertFalse(m['purchasable'])
   self.assertEqual(m['artLicenseStatus'],'not-verified')
   self.assertEqual(m['vttCompatibility'],'untested')
  except Exception:
   logging.exception('Hexwarden manifest contract failed')
   raise
if __name__=='__main__':unittest.main()
