"""Orc Songweaver lute private-media manifest remains source-only, noncommercial."""
import json
import logging
import sys
import unittest
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'tools'))
from state_only_spec import validate_state_only_manifest
class OrcSongweaverMedia(unittest.TestCase):
 def test_manifest(self):
  try:
   m=json.loads((ROOT/'assets/demos/orc-songweaver-female-manifest.json').read_text('utf8'))
   self.assertEqual(validate_state_only_manifest(m,ROOT)['id'],'pregen-bard-female-1')
   self.assertFalse(m['purchasable'])
   self.assertEqual(m['artLicenseStatus'],'not-verified')
   self.assertEqual(m['vttCompatibility'],'untested')
  except Exception:
   logging.exception('Songweaver noncommercial source/manifest failure')
   raise
if __name__=='__main__':unittest.main()
