"""Private frame, safety and provenance checks for four distinct new studies."""
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
 ('chr-clr-dwarf','dwarven-cleric'),
 ('pregen-cleric-female-2','human-mercywarden-female'),
 ('pregen-rogue-nonbinary-1','human-shadowstep-nonbinary'),
 ('mon-cave-ogre','cave-ogre')
]

class MotionWaveThreeTests(unittest.TestCase):
 def test_art_manifest_source_durations_and_safety(self):
  for token,stem in ASSETS:
   with self.subTest(token=token):
    spec=json.loads((ROOT/'assets/demos'/f'{stem}-manifest.json').read_text('utf8'))
    self.assertEqual(validate_state_only_manifest(spec,ROOT)['id'],token)
    self.assertEqual({k:v['durationSec'] for k,v in spec['stateClips'].items()},
                     {'idle':3.2,'move':2.4,'attack':1.4})
    self.assertEqual(spec['restDurationSec'],4)
    self.assertFalse(spec['purchasable'])
    self.assertEqual(spec['vttCompatibility'],'untested')
    for state in ('idle','move','attack'):
     no=copy.deepcopy(spec)
     del no['stateClips'][state]
     with self.assertRaises(ValueError):validate_state_only_manifest(no,ROOT,False)
     unsafe=copy.deepcopy(spec)
     unsafe['stateClips'][state]['source']='../../untrusted.svg'
     with self.assertRaises(ValueError):validate_state_only_manifest(unsafe,ROOT,False)

 def test_missing_frames_fails_closed_and_receipts_remain_private(self):
  for token,stem in ASSETS:
   with self.subTest(token=token),tempfile.TemporaryDirectory() as temp:
    root=Path(temp)
    (root/f'{token}-still.png').write_bytes(b'PNG')
    (root/f'{token}-rest.webm').write_bytes(b'WEBM')
    spec=json.loads((ROOT/'assets/demos'/f'{stem}-manifest.json').read_text('utf8'))
    frames={}
    for state in ('idle','move','attack'):
     folder=root/state
     folder.mkdir()
     frames[state]=folder
    encoded=[]
    def encode(source,dest,fps,start_frame=0,frame_count=None):
     encoded.append((source.name,dest.name,frame_count))
     dest.write_bytes(b'private')
    def inspect(path,canvas,fps,seconds):
     return {'frames':round(fps*seconds),'decodedAlphaVerified':True}
    checks={state:{'distinctSampleFrames':3,'seamChangedPixelRatio':0}
            for state in frames}
    with self.assertRaises(ValueError):
     create_controller_package(spec,root/'missing',root,encode,inspect)
    output=create_controller_package(spec,root/'missing',root,encode,inspect,
                                     frames,checks)
    receipt=json.loads((output/'gridborn-preview.json').read_text('utf8'))
    self.assertEqual(encoded,[('idle','idle.webm',32),('move','move.webm',24),
                              ('attack','attack.webm',14)])
    self.assertEqual(receipt['attackMs'],1400)
    self.assertEqual(receipt['clipSource'],'independent-svg-states')
    self.assertEqual(receipt['sourceFiles']['attack'],
                     f'assets/demos/{stem}-attack.svg')
    self.assertIs(receipt['purchaseEnabled'],False)

if __name__=='__main__':
 unittest.main()
