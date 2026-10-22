import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {renderGoblinMonk,GOBLIN_MONK_STATES} from '../src/creature-rigs/goblin-monk.mjs';
import {animatedPreviews} from '../src/animated-previews.js';
import {artStudies} from '../src/art-studies.js';
import {HERO_VARIANTS} from '../src/hero-variants.js';
import {catalog} from '../src/catalog.js';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('Goblin Stonefist has separate original anatomy, feint and attached low heel-sweep',()=>{
 const id='pregen-monk-nonbinary-3',art=read('assets/studies/goblin-stonefist-nonbinary.svg');
 const v=HERO_VARIANTS.find(x=>x.id===id),card=catalog.find(x=>x.id===id),p=animatedPreviews[id];
 assert.deepEqual([v.ancestry,v.gender,v.specialty],['Goblin','nonbinary','Stonefist']);
 assert.equal(card.purchasable,false);
 assert.equal(card.animationStatus,'art-study');
 assert.equal(p.still,artStudies[id]);
 assert.deepEqual(GOBLIN_MONK_STATES,['idle','move','attack','rest']);
 for(const f of ['class="gob-left-leg"','class="gob-right-leg"','class="gob-left-guard"','class="gob-right-guard"','data-attack-pose="elbow-feint"','data-attack-pose="low-heel-sweep"','data-effect="low-ground-dust"'])
  assert.ok(art.includes(f),'Missing Goblin anatomy/strike part: '+f);
 assert.doesNotMatch(art,/data-weapon=/);
 assert.notEqual(art,read('assets/studies/human-wayfarer-monk.svg'));
 assert.notEqual(art,read('assets/studies/orc-stonefist-female.svg'));
 for(const mode of GOBLIN_MONK_STATES){
  const exported=read('assets/demos/goblin-stonefist-nonbinary-'+mode+'.svg');
  assert.equal(exported,renderGoblinMonk(mode,art),'Goblin original source mismatch '+mode);
  assert.match(exported,new RegExp('data-gridborn-mode="'+mode+'"'));
  assert.match(exported,/prefers-reduced-motion:reduce/);
  assert.equal(p[mode==='attack'?'action':mode],'./assets/demos/goblin-stonefist-nonbinary-'+mode+'.svg');
 }
 const attack=read('assets/demos/goblin-stonefist-nonbinary-attack.svg');
 assert.match(attack,/gob-elbow-feint 1\.4s steps\(1,end\) 1 both/);
 assert.match(attack,/gob-low-heel-kick 1\.4s steps\(1,end\) 1 both/);
 assert.match(attack,/59%,67%\{opacity:1;transform:translate\(0,0\) rotate\(0\)\}/);
 assert.match(attack,/gob-ground-scuff 1\.4s steps\(1,end\) 1 both/);
 assert.doesNotMatch(attack,/gob-low-heel-kick[^\n]*infinite/);
 for(const mode of ['idle','move','rest']){
  const exported=read('assets/demos/goblin-stonefist-nonbinary-'+mode+'.svg');
  assert.doesNotMatch(exported,/@keyframes gob-low-heel-kick|@keyframes gob-ground-scuff/);
  assert.match(exported,mode==='move'?/84%,100%\{transform:/ : /85%,100%\{transform:/);
 }
 const m=JSON.parse(read('assets/demos/goblin-stonefist-nonbinary-manifest.json'));
 assert.equal(m.id,id);assert.equal(m.stateOnly,true);assert.equal(m.purchasable,false);
 assert.equal(m.vttCompatibility,'untested');assert.equal(m.artLicenseStatus,'not-verified');
 assert.deepEqual(Object.values(m.stateClips).map(x=>x.durationSec),[3.2,2.4,1.4]);
 assert.throws(()=>renderGoblinMonk('fly',art),/Unsupported Goblin monk state/);
 assert.throws(()=>renderGoblinMonk('idle','invalid'),/Goblin source anatomy rig changed/);
});
