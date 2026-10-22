"""Human Wildspeaker media manifest remains unapproved and source-valid."""
import json
import logging
import sys
import unittest
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'tools'))
from state_only_spec import validate_state_only_manifest
class WildspeakerMediaTests(unittest.TestCase):
 def test_manifest(self):
  try:
   src=json.loads((ROOT/'assets/demos/human-wildspeaker-druid-manifest.json').read_text('utf8'))
   self.assertEqual(validate_state_only_manifest(src,ROOT)['id'],'pregen-druid-female-1')
   self.assertFalse(src['purchasable'])
   self.assertEqual(src['artLicenseStatus'],'not-verified')
  except Exception:
   logging.exception('Wildspeaker manifest validation failed')
   raise
if __name__=='__main__':unittest.main()
