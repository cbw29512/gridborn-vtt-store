"""Frame-accurate, safe, noncommercial export assertions for the fourth wave."""
import copy
import json
import sys
import tempfile
import unittest
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'tools'))
from state_only_spec import validate_state_only_manifest
from controller_package import create_controller_package
STUDIES=[
 ('chr-pal-human','human-paladin'),('chr-rge-gnome','gnome-rogue'),
 ('mon-swamp-lizard','swamp-lizardfolk'),('ani-ocean-greatwhite','great-white-shark')
]
class WaveFourTests(unittest.TestCase):
 def test_sources_durations_and_no_purchase(self):
  for token,stem in STUDIES:
   with self.subTest(token=token):
    spec=json.loads((ROOT/'assets/demos'/f'{stem}-manifest.json').read_text('utf8'))
    self.assertEqual(validate_state_only_manifest(spec,ROOT)['id'],token)
    self.assertFalse(spec['purchasable'])
    self.assertEqual(spec['vttCompatibility'],'untested')
    self.assertEqual({k:v['durationSec'] for k,v in spec['stateClips'].items()},
                     {'idle':3.2,'move':2.4,'attack':1.4})
    self.assertEqual(spec['restDurationSec'],4)
    for state in ('idle','move','attack'):
     bad=copy.deepcopy(spec);del bad['stateClips'][state]
     with self.assertRaises(ValueError):validate_state_only_manifest(bad,ROOT,False)
     bad=copy.deepcopy(spec);bad['stateClips'][state]['source']='../../bad.svg'
     with self.assertRaises(ValueError):validate_state_only_manifest(bad,ROOT,False)

 def test_private_controller_receipt_exposes_real_duration_not_fake_product(self):
  for token,stem in STUDIES:
   with self.subTest(token=token),tempfile.TemporaryDirectory() as temp:
    root=Path(temp)
    (root/f'{token}-still.png').write_bytes(b'png')
    (root/f'{token}-rest.webm').write_bytes(b'webm')
    spec=json.loads((ROOT/'assets/demos'/f'{stem}-manifest.json').read_text('utf8'))
    paths={}
    for state in ('idle','move','attack'):
     folder=root/state;folder.mkdir();paths[state]=folder
    called=[]
    def encode(src,target,fps,start_frame=0,frame_count=None):
     called.append((src.name,target.name,frame_count))
     target.write_bytes(b'private')
    def inspect(path,canvas,fps,seconds):
     return {'frames':round(fps*seconds),'decodedAlphaVerified':True}
    motion={state:{'distinctSampleFrames':2,'seamChangedPixelRatio':0}
            for state in paths}
    with self.assertRaises(ValueError):
     create_controller_package(spec,root/'missing',root,encode,inspect)
    bundle=create_controller_package(spec,root/'missing',root,encode,inspect,paths,motion)
    receipt=json.loads((bundle/'gridborn-preview.json').read_text('utf8'))
    self.assertEqual(called,[('idle','idle.webm',32),('move','move.webm',24),
                             ('attack','attack.webm',14)])
    self.assertEqual(receipt['attackMs'],1400)
    self.assertEqual(receipt['clipSource'],'independent-svg-states')
    self.assertEqual(receipt['sourceFiles']['attack'],
                     f'assets/demos/{stem}-attack.svg')
    self.assertFalse(receipt['purchaseEnabled'])
if __name__=='__main__':unittest.main()
