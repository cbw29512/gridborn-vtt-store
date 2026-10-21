"""Require private export manifests for Wizard, Barbarian pregen and Animated Armor."""
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

ASSETS=[
 ('chr-wiz-elf','elven-wizard'),
 ('pregen-barbarian-male-3','orc-axe-vanguard-pregen'),
 ('mon-dng-armor','animated-armor')
]

class WaveTwoExportTests(unittest.TestCase):
 def test_source_clips_and_validation_are_complete(self):
  for token,stem in ASSETS:
   with self.subTest(token=token):
    p=ROOT/'assets/demos'/f'{stem}-manifest.json'
    spec=json.loads(p.read_text('utf8'))
    self.assertEqual(validate_state_only_manifest(spec,ROOT)['id'],token)
    self.assertEqual({k:v['durationSec'] for k,v in spec['stateClips'].items()},
                     {'idle':3.2,'move':2.4,'attack':1.4})
    self.assertEqual(spec['restDurationSec'],4)
    self.assertFalse(spec['purchasable'])
    self.assertEqual(spec['vttCompatibility'],'untested')
    for state in ('idle','move','attack'):
     broken=copy.deepcopy(spec)
     broken['stateClips'][state]['source']='../../invalid.svg'
     with self.assertRaises(ValueError):
      validate_state_only_manifest(broken,ROOT,False)
     broken=copy.deepcopy(spec)
     broken['stateClips'][state]['durationSec']=1.41
     with self.assertRaises(ValueError):
      validate_state_only_manifest(broken,ROOT,False)

 def test_controller_receipt_and_frame_counts_do_not_fall_back(self):
  for token,stem in ASSETS:
   with self.subTest(token=token),tempfile.TemporaryDirectory() as temp:
    output=Path(temp)
    (output/f'{token}-still.png').write_bytes(b'still')
    (output/f'{token}-rest.webm').write_bytes(b'rest')
    frames={}
    for state in ('idle','move','attack'):
     folder=output/state
     folder.mkdir()
     frames[state]=folder
    manifest=json.loads((ROOT/'assets/demos'/f'{stem}-manifest.json').read_text('utf8'))
    received=[]
    def encode(directory,target,fps,start_frame=0,frame_count=None):
     received.append((directory.name,target.name,frame_count))
     target.write_bytes(b'private')
    def inspect(path,canvas,fps,seconds):
     return {'frames':round(fps*seconds),'decodedAlphaVerified':True}
    motion={state:{'distinctSampleFrames':2,'seamChangedPixelRatio':0} for state in frames}
    with self.assertRaises(ValueError):
     create_controller_package(manifest,output/'no-master',output,encode,inspect)
    bundle=create_controller_package(manifest,output/'no-master',output,encode,inspect,
                                     frames,motion)
    data=json.loads((bundle/'gridborn-preview.json').read_text('utf8'))
    self.assertEqual(received,[('idle','idle.webm',32),('move','move.webm',24),
                               ('attack','attack.webm',14)])
    self.assertEqual(data['attackMs'],1400)
    self.assertEqual(data['clipSource'],'independent-svg-states')
    self.assertEqual(data['sourceFiles']['attack'],f'assets/demos/{stem}-attack.svg')
    self.assertFalse(data['purchaseEnabled'])

if __name__=='__main__':
 unittest.main()
