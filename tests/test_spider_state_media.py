"""Spider state-only private package verifies actual source and frame counts."""
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

class SpiderStateMediaTest(unittest.TestCase):
    def setUp(self):
        self.spec=json.loads((ROOT/'assets/demos/giant-cave-spider-manifest.json').read_text('utf8'))

    def test_validated_spider_source_files_and_timings(self):
        self.assertEqual(validate_state_only_manifest(self.spec,ROOT)['id'],'mon-cave-spider')
        self.assertEqual({key:value['durationSec'] for key,value in self.spec['stateClips'].items()},
                         {'idle':3.6,'move':2.4,'attack':1.4})
        self.assertEqual(self.spec['restDurationSec'],5)
        self.assertFalse(self.spec['purchasable'])

    def test_missing_or_off_grid_frames_are_rejected(self):
        for mode in ('idle','move','attack'):
            broken=copy.deepcopy(self.spec)
            del broken['stateClips'][mode]
            with self.assertRaises(ValueError):
                validate_state_only_manifest(broken,ROOT,False)
            broken=copy.deepcopy(self.spec)
            broken['stateClips'][mode]['durationSec']=1.15
            with self.assertRaises(ValueError):
                validate_state_only_manifest(broken,ROOT,False)
            broken=copy.deepcopy(self.spec)
            broken['stateClips'][mode]['source']='../../danger.svg'
            with self.assertRaises(ValueError):
                validate_state_only_manifest(broken,ROOT,False)

    def test_package_requires_all_state_frames_and_preserves_provenance(self):
        with tempfile.TemporaryDirectory() as temporary:
            root=Path(temporary)
            (root/'mon-cave-spider-rest.webm').write_bytes(b'private rest')
            (root/'mon-cave-spider-still.png').write_bytes(b'private still')
            frames={}
            for mode in ('idle','move','attack'):
                folder=root/mode
                folder.mkdir()
                frames[mode]=folder
            emitted=[]
            def encode(folder,target,fps,start_frame=0,frame_count=None):
                emitted.append((folder.name,target.name,fps,start_frame,frame_count))
                target.write_bytes(b'webm')
            def inspect(path,size,fps,seconds):
                return {'frames':round(fps*seconds),'decodedAlphaVerified':True}
            motion={key:{'distinctSampleFrames':3,'seamChangedPixelRatio':0} for key in frames}
            with self.assertRaises(ValueError):
                create_controller_package(self.spec,root/'master',root,encode,inspect)
            package=create_controller_package(self.spec,root/'master',root,encode,inspect,frames,motion)
            report=json.loads((package/'gridborn-preview.json').read_text('utf8'))
            self.assertEqual(emitted,[('idle','idle.webm',10,0,36),('move','move.webm',10,0,24),
                                      ('attack','attack.webm',10,0,14)])
            self.assertEqual(report['attackMs'],1400)
            self.assertEqual(report['clipSource'],'independent-svg-states')
            self.assertEqual(report['sourceFiles']['move'],'assets/demos/giant-cave-spider-move.svg')
            self.assertFalse(report['purchaseEnabled'])

if __name__=='__main__':
    unittest.main()
