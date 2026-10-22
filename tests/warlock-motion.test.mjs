import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {renderWarlock,WARLOCK_STATES} from '../src/creature-rigs/warlock.mjs';
import {animatedPreviews} from '../src/animated-previews.js';
import {artStudies} from '../src/art-studies.js';
import {HERO_VARIANTS} from '../src/hero-variants.js';
import {catalog} from '../src/catalog.js';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('Hexwarden original grimoire invokes separate rune and eldritch projectile',()=>{
 const id='pregen-warlock-nonbinary-1',art=read('assets/studies/dwarf-hexwarden-warlock.svg');
 const variant=HERO_VARIANTS.find(x=>x.id===id),card=catalog.find(x=>x.id===id),preview=animatedPreviews[id];
 assert.deepEqual([variant.ancestry,variant.gender,variant.specialty],['Dwarf','nonbinary','Hexwarden']);
 assert.equal(card.animationStatus,'art-study');
 assert.equal(card.purchasable,false);
 assert.equal(preview.still,artStudies[id]);
 assert.deepEqual(WARLOCK_STATES,['idle','move','attack','rest']);
 for(const feature of ['data-focus="occult-book"','data-weapon="staff-carried"','data-spell-phase="invoke"','data-spell-phase="eldritch-bolt"','class="hex-book-arm"']){
  assert.ok(art.includes(feature),'Missing original book/hand rig: '+feature);
 }
 for(const mode of WARLOCK_STATES){
  const svg=read('assets/demos/dwarf-hexwarden-warlock-'+mode+'.svg');
  assert.equal(svg,renderWarlock(mode,art),'Source mismatch: '+mode);
  assert.match(svg,new RegExp('data-gridborn-mode="'+mode+'"'));
  assert.match(svg,/prefers-reduced-motion:reduce/);
  assert.equal(preview[mode==='attack'?'action':mode],'./assets/demos/dwarf-hexwarden-warlock-'+mode+'.svg');
 }
 const attack=read('assets/demos/dwarf-hexwarden-warlock-attack.svg');
 assert.match(attack,/hex-rune-invoke 1\.4s steps\(1,end\) 1 both/);
 assert.match(attack,/hex-eldritch-release 1\.4s linear 1 both/);
 assert.match(attack,/57%\{opacity:1;transform:translate\(0,0\)\}/);
 assert.match(attack,/68%\{opacity:1;transform:translate\(2px,-2px\)\}/);
 assert.doesNotMatch(attack,/hex-eldritch-release[^\n]*infinite/);
 for(const mode of ['idle','move','rest']){
  const svg=read('assets/demos/dwarf-hexwarden-warlock-'+mode+'.svg');
  assert.doesNotMatch(svg,/@keyframes hex-rune-invoke|@keyframes hex-eldritch-release/);
  assert.match(svg,mode==='move'?/84%,100%\{transform:/ : /85%,100%\{transform:/);
 }
 const m=JSON.parse(read('assets/demos/dwarf-hexwarden-warlock-manifest.json'));
 assert.equal(m.id,id);assert.equal(m.purchasable,false);assert.equal(m.stateOnly,true);
 assert.equal(m.artLicenseStatus,'not-verified');assert.equal(m.vttCompatibility,'untested');
 assert.deepEqual(Object.values(m.stateClips).map(x=>x.durationSec),[3.2,2.4,1.4]);
 assert.throws(()=>renderWarlock('fly',art),/Unsupported Hexwarden state/);
 assert.throws(()=>renderWarlock('idle','invalid art'),/Hexwarden source rune\/book rig changed/);
});
