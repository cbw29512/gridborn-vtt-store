import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {renderGoblinRanger,GOBLIN_RANGER_STATES} from '../src/creature-rigs/goblin-ranger.mjs';
import {animatedPreviews} from '../src/animated-previews.js';
import {artStudies} from '../src/art-studies.js';
import {HERO_VARIANTS} from '../src/hero-variants.js';
import {catalog} from '../src/catalog.js';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('Goblin Pathfinder has distinct small-species silhouette and attached shortbow arrow',()=>{
 const id='pregen-ranger-nonbinary-1',art=read('assets/studies/goblin-pathfinder-nonbinary.svg');
 const v=HERO_VARIANTS.find(x=>x.id===id),card=catalog.find(x=>x.id===id),p=animatedPreviews[id];
 assert.deepEqual([v.ancestry,v.gender,v.specialty],['Goblin','nonbinary','Pathfinder']);
 assert.equal(card.animationStatus,'art-study');
 assert.equal(card.purchasable,false);
 assert.equal(p.still,artStudies[id]);
 assert.deepEqual(GOBLIN_RANGER_STATES,['idle','move','attack','rest']);
 for(const feature of ['class="gob-ranger-quiver"','class="gob-ranger-bow-arm"','class="gob-ranger-rest-draw-arm"','data-pose="cheek-anchor"','class="gob-ranger-string-rest"','class="gob-ranger-string-drawn"','data-weapon="compact-recurve-shortbow"','data-projectile="shortbow-arrow"'])
  assert.ok(art.includes(feature),'Missing unique Goblin bow feature '+feature);
 assert.notEqual(art,read('assets/studies/orc-pathfinder-female.svg'));
 assert.notEqual(art,read('assets/studies/elven-ranger.svg'));
 for(const mode of GOBLIN_RANGER_STATES){
  const output=read('assets/demos/goblin-pathfinder-nonbinary-'+mode+'.svg');
  assert.equal(output,renderGoblinRanger(mode,art),'Original Goblin bow source mismatch '+mode);
  assert.match(output,new RegExp('data-gridborn-mode="'+mode+'"'));
  assert.match(output,/prefers-reduced-motion:reduce/);
  assert.equal(p[mode==='attack'?'action':mode],'./assets/demos/goblin-pathfinder-nonbinary-'+mode+'.svg');
 }
 const attack=read('assets/demos/goblin-pathfinder-nonbinary-attack.svg');
 assert.match(attack,/gob-ranger-anchor-hand 1\.4s steps\(1,end\) 1 both/);
 assert.match(attack,/gob-ranger-string-tension 1\.4s steps\(1,end\) 1 both/);
 assert.match(attack,/gob-ranger-arrow-flight 1\.4s linear 1 both/);
 assert.match(attack,/62%\{opacity:1;transform:translate\(6px,0\)\}/);
 assert.match(attack,/65%\{opacity:1;transform:translate\(13px,0\)\}/);
 assert.doesNotMatch(attack,/gob-ranger-arrow-flight[^\n]*infinite/);
 for(const mode of ['idle','move','rest']){
  const out=read('assets/demos/goblin-pathfinder-nonbinary-'+mode+'.svg');
  assert.doesNotMatch(out,/@keyframes gob-ranger-arrow-flight/);
  assert.match(out,mode==='move'?/84%,100%\{transform:/ : /85%,100%\{transform:/);
 }
 const m=JSON.parse(read('assets/demos/goblin-pathfinder-nonbinary-manifest.json'));
 assert.equal(m.id,id);assert.equal(m.stateOnly,true);assert.equal(m.purchasable,false);
 assert.equal(m.vttCompatibility,'untested');assert.equal(m.artLicenseStatus,'not-verified');
 assert.deepEqual(Object.values(m.stateClips).map(x=>x.durationSec),[3.2,2.4,1.4]);
 assert.throws(()=>renderGoblinRanger('fly',art),/Unsupported Goblin Pathfinder mode/);
 assert.throws(()=>renderGoblinRanger('idle','bad source'),/Goblin Pathfinder canonical shortbow rig missing/);
});
