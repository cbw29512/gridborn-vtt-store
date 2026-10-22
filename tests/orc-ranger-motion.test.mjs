import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {renderOrcRanger,ORC_RANGER_STATES} from '../src/creature-rigs/orc-ranger.mjs';
import {animatedPreviews} from '../src/animated-previews.js';
import {artStudies} from '../src/art-studies.js';
import {HERO_VARIANTS} from '../src/hero-variants.js';
import {catalog} from '../src/catalog.js';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('Orc Pathfinder recurve longbow rests, draws and shoots separate fletched arrow',()=>{
 const id='pregen-ranger-female-1',src=read('assets/studies/orc-pathfinder-female.svg');
 const variant=HERO_VARIANTS.find(x=>x.id===id),card=catalog.find(x=>x.id===id),p=animatedPreviews[id];
 assert.deepEqual([variant.ancestry,variant.gender,variant.specialty],['Orc','female','Pathfinder']);
 assert.equal(card.purchasable,false);
 assert.equal(card.animationStatus,'art-study');
 assert.equal(p.still,artStudies[id]);
 assert.deepEqual(ORC_RANGER_STATES,['idle','move','attack','rest']);
 for(const feature of [
  'class="pathfinder-quiver"','class="pathfinder-bow-arm"',
  'class="pathfinder-draw-arm-rest"','data-pose="string-anchor"',
  'class="pathfinder-string-rest"','class="pathfinder-string-anchored"',
  'data-weapon="wood-recurve-longbow"','data-projectile="fletched-arrow"'
 ])assert.ok(src.includes(feature),'Missing distinct Orc bow rig '+feature);
 assert.notEqual(src,read('assets/studies/elven-ranger.svg'));
 for(const mode of ORC_RANGER_STATES){
  const output=read('assets/demos/orc-pathfinder-female-'+mode+'.svg');
  assert.equal(output,renderOrcRanger(mode,src),'Orc bow source drift '+mode);
  assert.match(output,new RegExp('data-gridborn-mode="'+mode+'"'));
  assert.match(output,/prefers-reduced-motion:reduce/);
  assert.equal(p[mode==='attack'?'action':mode],'./assets/demos/orc-pathfinder-female-'+mode+'.svg');
 }
 const attack=read('assets/demos/orc-pathfinder-female-attack.svg');
 assert.match(attack,/pathfinder-string-draw 1\.4s steps\(1,end\) 1 both/);
 assert.match(attack,/pathfinder-anchor-hand 1\.4s steps\(1,end\) 1 both/);
 assert.match(attack,/pathfinder-arrow-release 1\.4s linear 1 both/);
 assert.match(attack,/62%\{opacity:1;transform:translate\(7px,0\)\}/);
 assert.match(attack,/65%\{opacity:1;transform:translate\(15px,0\)\}/);
 assert.doesNotMatch(attack,/pathfinder-arrow-release[^\n]*infinite/);
 for(const mode of ['idle','move','rest']){
  const output=read('assets/demos/orc-pathfinder-female-'+mode+'.svg');
  assert.doesNotMatch(output,/@keyframes pathfinder-arrow-release/);
  assert.match(output,mode==='move'?/84%,100%\{transform:/ : /85%,100%\{transform:/);
 }
 const manifest=JSON.parse(read('assets/demos/orc-pathfinder-female-manifest.json'));
 assert.equal(manifest.id,id);
 assert.equal(manifest.stateOnly,true);
 assert.equal(manifest.purchasable,false);
 assert.equal(manifest.vttCompatibility,'untested');
 assert.equal(manifest.artLicenseStatus,'not-verified');
 assert.deepEqual(Object.values(manifest.stateClips).map(x=>x.durationSec),[3.2,2.4,1.4]);
 assert.throws(()=>renderOrcRanger('fly',src),/Unsupported Orc Pathfinder mode/);
 assert.throws(()=>renderOrcRanger('idle','wrong source'),/Orc Pathfinder canonical source anatomy or bow string anchors missing/);
});
