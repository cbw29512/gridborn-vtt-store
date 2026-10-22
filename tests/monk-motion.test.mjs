import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {renderMonk,MONK_STATES} from '../src/creature-rigs/monk.mjs';
import {animatedPreviews} from '../src/animated-previews.js';
import {artStudies} from '../src/art-studies.js';
import {HERO_VARIANTS} from '../src/hero-variants.js';
import {catalog} from '../src/catalog.js';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('Wayfarer source contains complete attached palm strike and front-kick limbs',()=>{
 const id='pregen-monk-male-1',art=read('assets/studies/human-wayfarer-monk.svg');
 const character=HERO_VARIANTS.find(x=>x.id===id),card=catalog.find(x=>x.id===id),preview=animatedPreviews[id];
 assert.deepEqual([character.ancestry,character.gender,character.specialty],['Human','male','Wayfarer']);
 assert.equal(card.animationStatus,'art-study');
 assert.equal(card.purchasable,false);
 assert.equal(preview.still,artStudies[id]);
 assert.deepEqual(MONK_STATES,['idle','move','attack','rest']);
 for(const part of ['monk-left-leg','monk-right-leg','monk-left-guard','monk-right-guard','data-attack-pose="palm-strike"','data-attack-pose="front-kick"'])
  assert.ok(art.includes(part),'Missing source anatomical rig: '+part);
 assert.doesNotMatch(art,/data-weapon=/);
 for(const state of MONK_STATES){
  const output=read('assets/demos/human-wayfarer-monk-'+state+'.svg');
  assert.equal(output,renderMonk(state,art),'Monk source-to-export drift: '+state);
  assert.match(output,new RegExp('data-gridborn-mode="'+state+'"'));
  assert.match(output,/prefers-reduced-motion:reduce/);
  assert.equal(preview[state==='attack'?'action':state],'./assets/demos/human-wayfarer-monk-'+state+'.svg');
 }
 const attack=read('assets/demos/human-wayfarer-monk-attack.svg');
 assert.match(attack,/monk-palm-release 1\.4s steps\(1,end\) 1 both/);
 assert.match(attack,/monk-chamber-extend-kick 1\.4s steps\(1,end\) 1 both/);
 assert.match(attack,/23%,40%\{opacity:1\}/);
 assert.match(attack,/59%,67%\{opacity:1;transform:translate\(0,0\)\}/);
 assert.match(attack,/monk-base-leg-hide/);
 for(const state of ['idle','move','rest']){
  const svg=read('assets/demos/human-wayfarer-monk-'+state+'.svg');
  assert.doesNotMatch(svg,/monk-palm-release|monk-chamber-extend-kick/);
  assert.match(svg,state==='move'?/84%,100%\{transform:/ : /85%,100%\{transform:/);
 }
 const m=JSON.parse(read('assets/demos/human-wayfarer-monk-manifest.json'));
 assert.equal(m.id,id);assert.equal(m.stateOnly,true);assert.equal(m.purchasable,false);
 assert.equal(m.vttCompatibility,'untested');assert.equal(m.artLicenseStatus,'not-verified');
 assert.deepEqual(Object.values(m.stateClips).map(x=>x.durationSec),[3.2,2.4,1.4]);
 assert.throws(()=>renderMonk('fly',art),/Unsupported Wayfarer state/);
 assert.throws(()=>renderMonk('idle','invalid art'),/Wayfarer source art\/limbs missing/);
});
