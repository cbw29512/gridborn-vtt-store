import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {renderSorcerer,SORCERER_STATES} from '../src/creature-rigs/sorcerer.mjs';
import {animatedPreviews} from '../src/animated-previews.js';
import {artStudies} from '../src/art-studies.js';
import {HERO_VARIANTS} from '../src/hero-variants.js';
import {catalog} from '../src/catalog.js';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('Sparkweaver hand-crystal gathers charge and launches a separate one-shot bolt',()=>{
 const id='pregen-sorcerer-nonbinary-1',art=read('assets/studies/elf-sparkweaver-sorcerer.svg');
 const variant=HERO_VARIANTS.find(x=>x.id===id),card=catalog.find(x=>x.id===id);
 const p=animatedPreviews[id];
 assert.deepEqual([variant.ancestry,variant.gender,variant.specialty],['Elf','nonbinary','Sparkweaver']);
 assert.equal(card.animationStatus,'art-study');
 assert.equal(card.purchasable,false);
 assert.equal(p.still,artStudies[id]);
 assert.deepEqual(SORCERER_STATES,['idle','move','attack','rest']);
 for(const feature of ['data-focus="hand-crystal"','data-spell-phase="gather"','data-spell-phase="release"','class="spark-casting-arm"','data-weapon="staff-carried"'])assert.ok(art.includes(feature),'Missing source: '+feature);
 for(const mode of SORCERER_STATES){
  const svg=read('assets/demos/elf-sparkweaver-sorcerer-'+mode+'.svg');
  assert.equal(svg,renderSorcerer(mode,art),'Source drift: '+mode);
  assert.match(svg,new RegExp('data-gridborn-mode="'+mode+'"'));
  assert.match(svg,/prefers-reduced-motion:reduce/);
  assert.equal(p[mode==='attack'?'action':mode],'./assets/demos/elf-sparkweaver-sorcerer-'+mode+'.svg');
 }
 const attack=read('assets/demos/elf-sparkweaver-sorcerer-attack.svg');
 assert.match(attack,/spark-gather 1\.4s steps\(1,end\) 1 both/);
 assert.match(attack,/spark-release 1\.4s linear 1 both/);
 assert.match(attack,/54%\{opacity:1;transform:translate\(0,0\)\}/);
 assert.match(attack,/65%\{opacity:1;transform:translate\(4px,-2px\)\}/);
 assert.doesNotMatch(attack,/spark-release[^\n]*infinite/);
 for(const mode of ['idle','move','rest']){
  const svg=read('assets/demos/elf-sparkweaver-sorcerer-'+mode+'.svg');
  assert.doesNotMatch(svg,/@keyframes spark-release/);
  assert.match(svg,mode==='move'?/84%,100%\{transform:/ : /85%,100%\{transform:/);
 }
 const m=JSON.parse(read('assets/demos/elf-sparkweaver-sorcerer-manifest.json'));
 assert.equal(m.id,id);assert.equal(m.purchasable,false);
 assert.equal(m.stateOnly,true);assert.equal(m.vttCompatibility,'untested');
 assert.deepEqual(Object.values(m.stateClips).map(x=>x.durationSec),[3.2,2.4,1.4]);
 assert.throws(()=>renderSorcerer('fly',art),/Unsupported Sparkweaver mode/);
 assert.throws(()=>renderSorcerer('idle','invalid source'),/Sparkweaver source art\/focus anchors changed/);
});
