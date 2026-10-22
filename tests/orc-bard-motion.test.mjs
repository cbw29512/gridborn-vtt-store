import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {renderOrcBard,ORC_BARD_STATES} from '../src/creature-rigs/orc-bard.mjs';
import {animatedPreviews} from '../src/animated-previews.js';
import {artStudies} from '../src/art-studies.js';
import {HERO_VARIANTS} from '../src/hero-variants.js';
import {catalog} from '../src/catalog.js';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('Orc Songweaver plucks its physical lute and releases independently drawn magic',()=>{
 const id='pregen-bard-female-1',art=read('assets/studies/orc-songweaver-female.svg');
 const v=HERO_VARIANTS.find(x=>x.id===id),item=catalog.find(x=>x.id===id),p=animatedPreviews[id];
 assert.deepEqual([v.ancestry,v.gender,v.specialty],['Orc','female','Songweaver']);
 assert.equal(v.gear.offhand,'Lute');
 assert.equal(v.gear.headgear,'Circlet');
 assert.equal(v.gear.weapon,'Sword');
 assert.equal(item.animationStatus,'art-study');
 assert.equal(item.purchasable,false);
 assert.equal(p.still,artStudies[id]);
 assert.deepEqual(ORC_BARD_STATES,['idle','move','attack','rest']);
 for(const f of ['data-instrument="large-pear-bellied-lute"','data-instrument-action="plucking-hand"','data-instrument-part="strings"','class="orc-bard-fretting-arm"','class="orc-bard-sword" data-weapon="sheathed-sword"','data-spell-effect="resonant-song"'])
  assert.ok(art.includes(f),'Missing original instrument or limb part: '+f);
 assert.notEqual(art,read('assets/studies/halfling-bard.svg'));
 for(const state of ORC_BARD_STATES){
  const result=read('assets/demos/orc-songweaver-female-'+state+'.svg');
  assert.equal(result,renderOrcBard(state,art),'Orc Songweaver source/out drift '+state);
  assert.match(result,new RegExp('data-gridborn-mode="'+state+'"'));
  assert.match(result,/prefers-reduced-motion:reduce/);
  assert.equal(p[state==='attack'?'action':state],'./assets/demos/orc-songweaver-female-'+state+'.svg');
 }
 const attack=read('assets/demos/orc-songweaver-female-attack.svg');
 assert.match(attack,/orc-bard-chord-strike 1\.4s steps\(1,end\) 1 both/);
 assert.match(attack,/orc-bard-string-vibration 1\.4s steps\(1,end\) 1 both/);
 assert.match(attack,/orc-bard-soundwave-flight 1\.4s linear 1 both/);
 assert.match(attack,/65%\{opacity:1;transform:translate\(5px,-3px\)\}/);
 assert.doesNotMatch(attack,/orc-bard-soundwave-flight[^\n]*infinite/);
 for(const state of ['idle','move','rest']){
  const result=read('assets/demos/orc-songweaver-female-'+state+'.svg');
  assert.doesNotMatch(result,/@keyframes orc-bard-soundwave-flight/);
  assert.match(result,state==='move'?/84%,100%\{transform:/ : /85%,100%\{transform:/);
 }
 const manifest=JSON.parse(read('assets/demos/orc-songweaver-female-manifest.json'));
 assert.equal(manifest.id,id);assert.equal(manifest.stateOnly,true);
 assert.equal(manifest.purchasable,false);
 assert.equal(manifest.artLicenseStatus,'not-verified');
 assert.equal(manifest.vttCompatibility,'untested');
 assert.deepEqual(Object.values(manifest.stateClips).map(x=>x.durationSec),[3.2,2.4,1.4]);
 assert.throws(()=>renderOrcBard('fly',art),/Unsupported Orc Songweaver state/);
 assert.throws(()=>renderOrcBard('idle','bad source'),/Orc Songweaver original source instrument\/grip anchors changed/);
});
