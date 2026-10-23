import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {DIRE_WOLF_MODES,renderDireWolf} from '../src/creature-rigs/dire-wolf.mjs';
import {catalog} from '../src/catalog.js';
import {animatedPreviews} from '../src/animated-previews.js';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('Dire Wolf is NOT a copied card and uses the EXACT four-legged Gray Wolf skeleton',()=>{
 const monsters=catalog.filter(x=>x.id==='mon-forest-wolf');
 assert.equal(monsters.length,1);
 assert.equal(monsters[0].name,'Dire Wolf');
 assert.equal(monsters[0].category,'Monsters');
 assert.equal(monsters[0].animationStatus,'art-study');
 assert.equal(monsters[0].purchasable,false);
 const gray=catalog.find(x=>x.id==='ani-forest-wolf');
 assert.equal(gray.category,'Animals');
 assert.equal(gray.animationStatus,'art-study');
 assert.equal(new Set([gray.previewArt,monsters[0].previewArt]).size,2);
 assert.deepEqual(DIRE_WOLF_MODES,['still','idle','move','attack','rest']);
 for(const mode of DIRE_WOLF_MODES){
  const original=read(mode==='still'?'assets/studies/gray-wolf.svg':'assets/demos/gray-wolf-'+mode+'.svg');
  const dire=read(mode==='still'?'assets/studies/dire-wolf.svg':'assets/demos/dire-wolf-'+mode+'.svg');
  assert.equal(dire,renderDireWolf(mode,original),'Dire must inherit source exactly: '+mode);
  assert.ok(dire.includes('data-foundation-id="gray-wolf-quadruped"'));
  assert.ok(dire.includes('class="dire-mane"'));
  assert.ok(dire.includes('class="dire-scale"'));
  for(const part of ['wolf-leg-hind-near','wolf-leg-hind-far','wolf-leg-front-near','wolf-leg-front-far'])
    assert.ok(dire.includes(part));
  assert.match(dire,/Dire Wolf/);
  assert.match(dire,/<title id="title">Dire Wolf/);
  assert.doesNotMatch(dire,/<title id="title">Gray Wolf/);
 }
 const still=read('assets/studies/dire-wolf.svg');
 assert.match(still,/fangs/);
 assert.match(still,/scale\(1\.06\)/);
 assert.throws(()=>renderDireWolf('fly',still),/not supported/);
 assert.throws(()=>renderDireWolf('idle','broken'),/Missing shared wolf skeleton/);
});
test('Dire Wolf animated preview has bite and gait, no retail claims',()=>{
 const id='mon-forest-wolf',pre=animatedPreviews[id];
 assert.ok(pre);assert.equal(pre.still,'./assets/studies/dire-wolf.svg');
 for(const mode of ['idle','move','attack','rest']){
  const s=read('assets/demos/dire-wolf-'+mode+'.svg');
  assert.equal(pre[mode==='attack'?'action':mode],'./assets/demos/dire-wolf-'+mode+'.svg');
  assert.match(s,/prefers-reduced-motion:reduce/);
  assert.match(s,/wolf-body/);
 }
 assert.match(read('assets/demos/dire-wolf-attack.svg'),/wolf-bite/);
 assert.match(read('assets/demos/dire-wolf-move.svg'),/wolf-leg-a/);
 const manifest=JSON.parse(read('assets/demos/dire-wolf-manifest.json'));
 assert.equal(manifest.id,id);assert.equal(manifest.purchasable,false);
 assert.equal(manifest.vttCompatibility,'untested');
});
