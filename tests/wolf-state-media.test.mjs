import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {WOLF_MODES,renderWolf} from '../src/creature-rigs/wolf.mjs';
import {animatedPreviews} from '../src/animated-previews.js';
import {catalog} from '../src/catalog.js';

const read=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
test('Wolf state-only sources are current and use an actual four-leg creature rig',()=>{
 const expected={
  still:'assets/studies/gray-wolf.svg',
  idle:'assets/demos/gray-wolf-idle.svg',
  move:'assets/demos/gray-wolf-move.svg',
  attack:'assets/demos/gray-wolf-attack.svg',
  rest:'assets/demos/gray-wolf-rest.svg'
 };
 assert.deepEqual(WOLF_MODES,['still','idle','move','attack','rest']);
 for(const mode of WOLF_MODES){
  const svg=renderWolf(mode);
  assert.equal(read(expected[mode]),svg,'Regenerate '+mode+' wolf art');
  assert.match(svg,/Original four-legged Gray Wolf/);
  if(mode!=='still')for(const limb of
   ['wolf-leg-front-near','wolf-leg-front-far','wolf-leg-hind-near','wolf-leg-hind-far'])
   assert.match(svg,new RegExp(limb));
 }
});

test('Wolf idle motion shares one clean export duration, while Attack is not endless',()=>{
 const idle=read('assets/demos/gray-wolf-idle.svg');
 assert.match(idle,/wolf-idle-breath 3\.2s/);
 assert.match(idle,/wolf-tail-sway 3\.2s/);
 assert.match(idle,/wolf-ear-twitch 3\.2s/);
 assert.doesNotMatch(idle,/wolf-tail-sway 4\.1s|wolf-ear-twitch 5\.1s/);
 const move=read('assets/demos/gray-wolf-move.svg');
 assert.match(move,/wolf-leg-a 1s ease-in-out infinite/);
 assert.match(move,/wolf-leg-b 1s ease-in-out infinite/);
 const attack=read('assets/demos/gray-wolf-attack.svg');
 assert.match(attack,/wolf-bite 1\.3s ease-in-out 1 both/);
});

test('Wolf export uses the real four previews and remains unavailable for purchase',()=>{
 const source=JSON.parse(read('assets/demos/gray-wolf-manifest.json'));
 const wolf=catalog.find(i=>i.id==='ani-forest-wolf');
 const preview=animatedPreviews['ani-forest-wolf'];
 assert.ok(wolf);
 assert.equal(wolf.purchasable,false);
 assert.equal(source.purchasable,false);
 assert.equal(source.vttCompatibility,'untested');
 assert.equal(preview.actionDurationMs,1300);
 for(const mode of ['idle','move','attack']){
  assert.equal(source.stateClips[mode].source,preview[mode==='attack'?'action':mode].slice(2));
 }
 assert.equal(source.restSource,preview.rest.slice(2));
 assert.equal(source.stillSource,preview.still.slice(2));
 assert.doesNotMatch(read('tools/export_states.py'),/stripe|checkout\.sessions/i);
});
