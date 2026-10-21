import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {renderSkeleton,SKELETON_STATES} from '../src/creature-rigs/skeleton.mjs';
import {verifyMotionCatalog,REQUIRED_STATES} from '../src/production-motion-gate.mjs';
import {animatedPreviews} from '../src/animated-previews.js';
import {artStudies} from '../src/art-studies.js';
import {catalog} from '../src/catalog.js';

const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');

test('Full-motion gate rejects incomplete/false animated storefront listings',()=>{
 assert.deepEqual(REQUIRED_STATES,['still','idle','move','action','rest']);
 assert.equal(verifyMotionCatalog(catalog),true);
 const clone=structuredClone(animatedPreviews);
 delete clone['mon-dng-skeleton'].rest;
 assert.throws(()=>verifyMotionCatalog(catalog,clone),/missing approved rest/i);
 const badDur=structuredClone(animatedPreviews);
 badDur['mon-dng-skeleton'].actionDurationMs=0;
 assert.throws(()=>verifyMotionCatalog(catalog,badDur),/one-shot attack duration/i);
 const badStill=structuredClone(animatedPreviews);
 badStill['mon-dng-skeleton'].still='./assets/demos/cave-goblin-idle.svg';
 assert.throws(()=>verifyMotionCatalog(catalog,badStill),/Still study does not match/i);
 const badLabel=structuredClone(animatedPreviews);
 delete badLabel['mon-dng-skeleton'].labels.rest;
 assert.throws(()=>verifyMotionCatalog(catalog,badLabel),/label all four motions/i);
 const noSource=structuredClone(animatedPreviews);
 delete noSource['mon-dng-skeleton'];
 assert.throws(()=>verifyMotionCatalog(catalog,noSource),/without complete motion/i);
 const badCatalog=catalog.map(x=>x.id==='mon-dng-skeleton'?{...x,purchasable:true}:x);
 assert.throws(()=>verifyMotionCatalog(badCatalog),/marked purchasable/i);
 for(const [id,preview] of Object.entries(animatedPreviews)){
   assert.equal(preview.still,artStudies[id],id);
   for(const state of REQUIRED_STATES){
     const asset=preview[state].slice(2);
     assert.ok(existsSync(new URL('../'+asset,import.meta.url)),id+' missing '+state);
   }
 }
});

test('Skeleton Warrior has four reproducible distinct animated anatomy studies',()=>{
 const original=read('assets/studies/skeleton-warrior.svg');
 assert.deepEqual(SKELETON_STATES,['idle','move','attack','rest']);
 assert.match(original,/Open ribcage/);
 for(const mode of SKELETON_STATES){
   const svg=renderSkeleton(mode,original);
   assert.equal(read('assets/demos/skeleton-warrior-'+mode+'.svg'),svg,mode);
   assert.match(svg,new RegExp('data-gridborn-mode="'+mode+'"'));
   for(const part of ['bone-skull','bone-ribcage','bone-pelvis','bone-arm-left',
     'bone-arm-right','bone-leg-left','bone-leg-right','bone-blade','bone-shield'])
     assert.match(svg,new RegExp('class="'+part+'"'),mode+' missing '+part);
   assert.match(svg,/prefers-reduced-motion:reduce/);
 }
 assert.throws(()=>renderSkeleton('walk',original),/Unsupported/);
 assert.throws(()=>renderSkeleton('idle','invalid source'),/Skeleton source artwork changed/);
});

test('Skeleton undead mechanics: jerky motion, one attack and inert collapsed rest',()=>{
 const idle=read('assets/demos/skeleton-warrior-idle.svg');
 const move=read('assets/demos/skeleton-warrior-move.svg');
 const attack=read('assets/demos/skeleton-warrior-attack.svg');
 const rest=read('assets/demos/skeleton-warrior-rest.svg');
 assert.match(idle,/bone-idle-skull 3s steps\(1,end\) infinite/);
 assert.match(move,/bone-shuffle-left 1\.2s/);
 assert.match(move,/bone-shuffle-right 1\.2s/);
 assert.match(attack,/bone-attack-sword 1\.4s steps\(1,end\) 1 both/);
 assert.doesNotMatch(attack,/bone-attack-sword 1\.4s[^\n]*infinite/);
 assert.match(rest,/rotate\(80 128 143\)/);
 assert.match(rest,/Corpse pose: all bones stay immobile/);
 assert.match(rest,/bone-inert-glimmer 4s/);
 assert.doesNotMatch(rest,/@keyframes[^\n]*(?:breath|breathe|respir)|animation:[^\n]*(?:breath|breathe|respir)/i);
 const preview=animatedPreviews['mon-dng-skeleton'];
 assert.equal(preview.actionDurationMs,1400);
 const manifest=JSON.parse(read('assets/demos/skeleton-warrior-manifest.json'));
 assert.equal(manifest.purchasable,false);
 assert.equal(manifest.artLicenseStatus,'not-verified');
 assert.equal(manifest.stateOnly,true);
 assert.equal(manifest.stateClips.idle.durationSec,3);
 assert.equal(manifest.stateClips.move.durationSec,2.4);
 assert.equal(manifest.stateClips.attack.durationSec,1.4);
 assert.equal(manifest.restDurationSec,4);
 for(const state of ['idle','move','attack']){
   assert.equal(manifest.stateClips[state].source,preview[state==='attack'?'action':state].slice(2));
 }
});
