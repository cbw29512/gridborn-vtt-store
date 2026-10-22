"""The original nonbinary Goblin Pathfinder must not become commercially enabled."""
import json
import logging
import sys
import unittest
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'tools'))
from state_only_spec import validate_state_only_manifest
class GoblinPathfinderMedia(unittest.TestCase):
 def test_source_spec(self):
  try:
   m=json.loads((ROOT/'assets/demos/goblin-pathfinder-nonbinary-manifest.json').read_text('utf8'))
   self.assertEqual(validate_state_only_manifest(m,ROOT)['id'],'pregen-ranger-nonbinary-1')
   self.assertFalse(m['purchasable'])
   self.assertEqual(m['vttCompatibility'],'untested')
   self.assertEqual(m['artLicenseStatus'],'not-verified')
  except Exception:
   logging.exception('Goblin Pathfinder media contract failed')
   raise
if __name__=='__main__':unittest.main()
