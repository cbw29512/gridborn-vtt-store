import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {animatedPreviews} from '../src/animated-previews.js';
import {showcaseDurationMs,fullShowcaseMs,MOTION_STAGES} from '../src/catalog-motion.js';
import {DEFAULT_ATTACK_MS} from '../foundry/gridborn-controller/scripts/contract.mjs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');

test('Website showcases use source cycle timings without changing animation speed',()=>{
 const expected={
  'chr-ftr-human':[3200,3200,1400,2400],
  'mon-dng-skeleton':[3000,2400,1400,2400],
  'mon-cave-spider':[3600,2400,1400,2400],
  'ani-forest-wolf':[3200,2000,1300,2400],
  'mon-cave-goblin':[3600,3600,1400,2400],
  'chr-wiz-elf':[3200,2400,1400,2400],
  'pregen-barbarian-male-3':[3200,2400,1400,2400],
  'mon-dng-armor':[3200,2400,1400,2400]
 };
 assert.deepEqual(MOTION_STAGES.map(x=>x.key),['idle','move','action','rest']);
 for(const [id,times] of Object.entries(expected)){
  const preview=animatedPreviews[id];
  const actual=['idle','move','action','rest'].map(key=>showcaseDurationMs(preview,key));
  assert.deepEqual(actual,times,id);
  assert.equal(fullShowcaseMs(preview),times.reduce((a,b)=>a+b,0));
  assert.ok(fullShowcaseMs(preview)>=8900 && fullShowcaseMs(preview)<=11000,id);
  assert.equal(preview.restDurationMs>=2400,true,id);
 }
 assert.throws(()=>showcaseDurationMs(animatedPreviews['mon-cave-spider'],'unknown'),/Missing showcase/);
});

test('Gameplay stays manual and calm: looping states hold until changed, Attack returns to Idle',()=>{
 assert.equal(DEFAULT_ATTACK_MS,1400);
 const hud=read('foundry/gridborn-controller/scripts/hud.mjs');
 const playback=read('foundry/gridborn-controller/scripts/playback.mjs');
 assert.match(hud,/Idle, Move and Rest repeat until you choose another state/);
 assert.match(hud,/No automatic showcase cycle during a game/);
 assert.match(hud,/DEFAULT_ATTACK_MS/);
 assert.match(playback,/if \(mode !== 'attack'\) return state;/);
 assert.match(playback,/playMode\(token, 'idle', options\)/);
 assert.doesNotMatch(playback,/MOTION_STAGES|fullShowcaseMs/);
 const detail=read('src/concept-preview.js');
 assert.match(detail,/for\(const pixels of \[128,64,32\]\)/);
 assert.match(detail,/Play attack once/);
 assert.match(detail,/Hold rest loop/);
});
