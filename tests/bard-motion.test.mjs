import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {renderBard,BARD_STATES} from '../src/creature-rigs/bard.mjs';
import {animatedPreviews} from '../src/animated-previews.js';
import {artStudies} from '../src/art-studies.js';
import {catalog} from '../src/catalog.js';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('Halfling Bard original lute has fretting, strumming and independent sound spell',()=>{
 const id='chr-brd-halfling',source=read('assets/studies/halfling-bard.svg');
 const card=catalog.find(x=>x.id===id),preview=animatedPreviews[id];
 assert.ok(card);
 assert.equal(card.animationStatus,'art-study');
 assert.equal(card.purchasable,false);
 assert.equal(preview.still,artStudies[id]);
 assert.deepEqual(BARD_STATES,['idle','move','attack','rest']);
 for(const feature of [
  'data-weapon="six-course-lute"','class="bard-fret-hand"',
  'class="bard-pluck-hand"','class="bard-strings"',
  'class="bard-lute"','data-spell-effect="resonant-chord"',
  '<circle cx="145" cy="160" r="15"'
 ])assert.ok(source.includes(feature),'Missing lute feature '+feature);
 for(const mode of BARD_STATES){
  const actual=read('assets/demos/halfling-bard-'+mode+'.svg');
  assert.equal(actual,renderBard(mode,source),'Source/output drift '+mode);
  assert.match(actual,new RegExp('data-gridborn-mode="'+mode+'"'));
  assert.match(actual,/prefers-reduced-motion:reduce/);
  assert.equal(preview[mode==='attack'?'action':mode],'./assets/demos/halfling-bard-'+mode+'.svg');
 }
 const attack=read('assets/demos/halfling-bard-attack.svg');
 assert.match(attack,/bard-chord-pluck 1\.4s steps\(1,end\) 1 both/);
 assert.match(attack,/bard-resonant-cast 1\.4s linear 1 both/);
 assert.match(attack,/61%\{opacity:1;transform:translate\(14px,-5px\)\}/);
 assert.doesNotMatch(attack,/bard-resonant-cast[^\n]*infinite/);
 assert.match(attack,/class="bard-spell" data-spell-effect="resonant-chord" opacity="0"/);
 for(const mode of ['idle','move','rest']){
  const actual=read('assets/demos/halfling-bard-'+mode+'.svg');
  assert.doesNotMatch(actual,/bard-resonant-cast/);
  assert.match(actual,mode==='move'?/84%,100%\{transform:/ : /85%,100%\{transform:/);
 }
 const manifest=JSON.parse(read('assets/demos/halfling-bard-manifest.json'));
 assert.equal(manifest.id,id);
 assert.equal(manifest.stateOnly,true);
 assert.equal(manifest.purchasable,false);
 assert.equal(manifest.artLicenseStatus,'not-verified');
 assert.equal(manifest.vttCompatibility,'untested');
 assert.deepEqual(Object.values(manifest.stateClips).map(x=>x.durationSec),[3.2,2.4,1.4]);
 assert.throws(()=>renderBard('fly',source),/Unsupported Bard state/);
 assert.throws(()=>renderBard('idle','not a source'),/Bard source art\/instrument rig changed/);
});
