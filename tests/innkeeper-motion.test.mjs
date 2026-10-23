import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {renderVillageInnkeeper,INNKEEPER_STATES} from '../src/creature-rigs/innkeeper.mjs';
import {animatedPreviews} from '../src/animated-previews.js';
import {catalog} from '../src/catalog.js';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('Village Innkeeper is a real four-state noncommercial NPC preview',()=>{
 try{
  const id='npc-inn-human',art=read('assets/studies/village-innkeeper.svg');
  const card=catalog.find(x=>x.id===id),preview=animatedPreviews[id];
  assert.equal(card.name,'Village Innkeeper');assert.equal(card.animationStatus,'art-study');
  assert.equal(card.purchasable,false);assert.equal(preview.still,card.previewArt);
  assert.deepEqual(INNKEEPER_STATES,['idle','move','attack','rest']);
  for(const part of ['inn-body','inn-left-leg','inn-right-leg','inn-server-arm','inn-splash'])
   assert.ok(art.includes('id="'+part+'"'),part);
  for(const state of INNKEEPER_STATES){
   const svg=read('assets/demos/village-innkeeper-'+state+'.svg');
   assert.equal(svg,renderVillageInnkeeper(state,art),state+' source drift');
   assert.match(svg,new RegExp('data-gridborn-mode="'+state+'"'));
   assert.match(svg,/prefers-reduced-motion:reduce/);
   assert.equal(preview[state==='attack'?'action':state],'./assets/demos/village-innkeeper-'+state+'.svg');
  }
  const attack=read('assets/demos/village-innkeeper-attack.svg');
  assert.match(attack,/inn-mug-shove/);assert.match(attack,/inn-foam-impact/);
  assert.match(attack,/1\.4s steps\(1,end\) 1 both/);
  for(const mode of ['idle','move','rest'])
   assert.doesNotMatch(read('assets/demos/village-innkeeper-'+mode+'.svg'),/inn-mug-shove|inn-foam-impact/);
  const m=JSON.parse(read('assets/demos/village-innkeeper-manifest.json'));
  assert.equal(m.id,id);assert.equal(m.purchasable,false);
  assert.equal(m.artLicenseStatus,'not-verified');assert.equal(m.vttCompatibility,'untested');
  assert.throws(()=>renderVillageInnkeeper('fly',art),/Unsupported Innkeeper state/);
  assert.throws(()=>renderVillageInnkeeper('idle','broken'),/source rig incomplete/);
 }catch(error){console.error('Innkeeper motion certification failed',error);throw error;}
});
