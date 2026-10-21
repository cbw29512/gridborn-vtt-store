import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {GOBLIN_STATES,renderGoblinState} from '../src/creature-rigs/goblin-states.mjs';
import {animatedPreviews} from '../src/animated-previews.js';
import {catalog} from '../src/catalog.js';

const read=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');

test('three Goblin states are deterministic derivations of the original source',()=>{
  const master=read('assets/demos/cave-goblin-loop.svg');
  assert.deepEqual(GOBLIN_STATES,['idle','move','attack']);
  for(const mode of GOBLIN_STATES){
    const svg=renderGoblinState(master,mode);
    assert.equal(svg,read('assets/demos/cave-goblin-'+mode+'.svg'));
    assert.match(svg,new RegExp('data-gridborn-mode="'+mode+'"'));
    assert.match(svg,/class="goblin-leg-left"/);
    assert.match(svg,/class="goblin-leg-right"/);
    assert.match(svg,/Original Cave Goblin study only/);
    assert.match(svg,/prefers-reduced-motion:reduce/);
    assert.doesNotMatch(svg,/45s steps\(1,end\) infinite/);
  }
  assert.throws(()=>renderGoblinState(master,'rest'),/Invalid/);
  assert.throws(()=>renderGoblinState('broken','idle'),/source has drifted/);
});

test('Goblin Move is a real alternating leg gait, not a whole-body-only translate',()=>{
  const svg=read('assets/demos/cave-goblin-move.svg');
  for(const animation of ['gb-goblin-step-left','gb-goblin-step-right',
    'gb-goblin-walk-bob','gb-goblin-walk-blade','gb-goblin-walk-buckler'])
    assert.match(svg,new RegExp(animation));
  assert.match(svg,/infinite/);
  assert.match(svg,/rotate\(-16deg\)/);
  assert.match(svg,/rotate\(16deg\)/);
});

test('Goblin Attack is once and returns to idle through the shared concept controller',()=>{
  const svg=read('assets/demos/cave-goblin-attack.svg');
  assert.match(svg,/gb-goblin-strike-lunge 1\.4s ease-in-out 1 both/);
  assert.match(svg,/gb-goblin-strike-blade 1\.4s/);
  assert.doesNotMatch(svg,/infinite/);
  const preview=animatedPreviews['mon-cave-goblin'];
  assert.equal(preview.actionDurationMs,1400);
  assert.equal(preview.action,'./assets/demos/cave-goblin-attack.svg');
  assert.equal(preview.idle,'./assets/demos/cave-goblin-idle.svg');
  assert.equal(preview.move,'./assets/demos/cave-goblin-move.svg');
  assert.equal(preview.rest,'./assets/demos/cave-goblin-rest.svg');
  assert.match(read('src/concept-preview.js'),/updatePreview\('idle'\)/);
});

test('Goblin art still is preview-only while four public prototype states load',()=>{
  const item=catalog.find(i=>i.id==='mon-cave-goblin');
  assert.ok(item);
  assert.equal(item.purchasable,false);
  assert.equal(item.animationStatus,'art-study');
  for(const mode of ['idle','move','action','rest']){
    const file=animatedPreviews[item.id][mode].replace('./','');
    assert.ok(existsSync(new URL('../'+file,import.meta.url)),file);
  }
  assert.ok(read('assets/demos/cave-goblin-manifest.json').includes('"purchasable": false'));
  assert.ok(read('tools/generate-goblin-states.mjs').includes('--check'));
});
