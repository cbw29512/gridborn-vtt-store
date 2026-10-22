import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {renderStonefist,STONEFIST_STATES} from '../src/creature-rigs/stonefist.mjs';
import {animatedPreviews} from '../src/animated-previews.js';
import {artStudies} from '../src/art-studies.js';
import {HERO_VARIANTS} from '../src/hero-variants.js';
import {catalog} from '../src/catalog.js';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('female Orc Stonefist is distinct from Wayfarer and swings a complete attached fist',()=>{
 const id='pregen-monk-female-3',art=read('assets/studies/orc-stonefist-female.svg');
 const source=HERO_VARIANTS.find(x=>x.id===id),item=catalog.find(x=>x.id===id),p=animatedPreviews[id];
 assert.deepEqual([source.ancestry,source.gender,source.specialty],['Orc','female','Stonefist']);
 assert.equal(item.animationStatus,'art-study');
 assert.equal(item.purchasable,false);
 assert.equal(p.still,artStudies[id]);
 assert.deepEqual(STONEFIST_STATES,['idle','move','attack','rest']);
 for(const feature of ['class="stone-left-leg"','class="stone-right-leg"','class="stone-left-guard"','class="stone-right-guard"','data-attack-pose="hammerfist"','data-attack-pose="recoil"','data-effect="hammer-dust"']){
  assert.ok(art.includes(feature),'Missing original anatomical feature '+feature);
 }
 assert.doesNotMatch(art,/data-weapon=/);
 const wayfarer=read('assets/studies/human-wayfarer-monk.svg');
 assert.notEqual(art,wayfarer);
 assert.doesNotMatch(art,/data-attack-pose="front-kick"/);
 for(const mode of STONEFIST_STATES){
  const output=read('assets/demos/orc-stonefist-female-'+mode+'.svg');
  assert.equal(output,renderStonefist(mode,art),'Orc source drift '+mode);
  assert.match(output,new RegExp('data-gridborn-mode="'+mode+'"'));
  assert.match(output,/prefers-reduced-motion:reduce/);
  assert.equal(p[mode==='attack'?'action':mode],'./assets/demos/orc-stonefist-female-'+mode+'.svg');
 }
 const attack=read('assets/demos/orc-stonefist-female-attack.svg');
 assert.match(attack,/stone-raised-hammer 1\.4s steps\(1,end\) 1 both/);
 assert.match(attack,/stone-ground-hit 1\.4s steps\(1,end\) 1 both/);
 assert.match(attack,/50%,60%\{opacity:1;transform:rotate\(53deg\)\}/);
 assert.match(attack,/23%,74%\{opacity:0\}/);
 assert.doesNotMatch(attack,/stone-raised-hammer[^\n]*infinite/);
 for(const mode of ['idle','move','rest']){
  const output=read('assets/demos/orc-stonefist-female-'+mode+'.svg');
  assert.doesNotMatch(output,/@keyframes stone-raised-hammer|@keyframes stone-ground-hit/);
  assert.match(output,mode==='move'?/84%,100%\{transform:/ : /85%,100%\{transform:/);
 }
 const m=JSON.parse(read('assets/demos/orc-stonefist-female-manifest.json'));
 assert.equal(m.id,id);assert.equal(m.stateOnly,true);assert.equal(m.purchasable,false);
 assert.equal(m.vttCompatibility,'untested');assert.equal(m.artLicenseStatus,'not-verified');
 assert.deepEqual(Object.values(m.stateClips).map(x=>x.durationSec),[3.2,2.4,1.4]);
 assert.throws(()=>renderStonefist('fly',art),/Unsupported Stonefist mode/);
 assert.throws(()=>renderStonefist('idle','invalid art'),/Stonefist anatomy\/source art anchors missing/);
});
