import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {renderRanger,RANGER_STATES} from '../src/creature-rigs/ranger.mjs';
import {animatedPreviews} from '../src/animated-previews.js';
import {artStudies} from '../src/art-studies.js';
import {catalog} from '../src/catalog.js';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('Ranger source-derived bow draws and fires one arrow toward target',()=>{
 const id='chr-rng-elf',art=read('assets/studies/elven-ranger.svg'),preview=animatedPreviews[id];
 const card=catalog.find(x=>x.id===id);
 assert.equal(card.animationStatus,'art-study');
 assert.equal(card.purchasable,false);
 assert.equal(preview.still,artStudies[id]);
 assert.deepEqual(RANGER_STATES,['idle','move','attack','rest']);
 assert.match(art,/data-weapon="longbow"/);
 assert.match(art,/ranger-string-drawn" opacity="0"/);
 assert.match(art,/data-weapon-projectile="arrow"/);
 for(const mode of RANGER_STATES){
  const output=read('assets/demos/elven-ranger-'+mode+'.svg');
  assert.equal(output,renderRanger(mode,art),'Generated SVG drift: '+mode);
  assert.match(output,new RegExp('data-gridborn-mode="'+mode+'"'));
  assert.match(output,/prefers-reduced-motion:reduce/);
  assert.equal(preview[mode==='attack'?'action':mode],'./assets/demos/elven-ranger-'+mode+'.svg');
 }
 const attack=read('assets/demos/elven-ranger-attack.svg');
 assert.match(attack,/ranger-string-tension 1\.4s/);
 assert.match(attack,/ranger-arrow-flight 1\.4s linear 1 both/);
 assert.match(attack,/62%\{opacity:1;transform:translate\(12px,-2px\)\}/);
 assert.doesNotMatch(attack,/ranger-arrow-flight[^\n]*infinite/);
 for(const mode of ['idle','move','rest'])
  assert.doesNotMatch(read('assets/demos/elven-ranger-'+mode+'.svg'),/ranger-arrow-flight/);
 const manifest=JSON.parse(read('assets/demos/elven-ranger-manifest.json'));
 assert.equal(manifest.id,id);
 assert.equal(manifest.stateOnly,true);
 assert.equal(manifest.purchasable,false);
 assert.equal(manifest.vttCompatibility,'untested');
 assert.deepEqual(Object.values(manifest.stateClips).map(x=>x.durationSec),[3.2,2.4,1.4]);
 assert.throws(()=>renderRanger('fly',art),/Unsupported Ranger mode/);
 assert.throws(()=>renderRanger('idle','not art'),/Ranger source missing required rig/);
});
