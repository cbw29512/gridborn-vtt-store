import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {catalogDragonRecipes,dragonRecipeForRecord,DRAGON_FAMILY} from '../src/dragon-family.js';
import {dragonArtwork,DRAGON_MODES} from '../src/creature-rigs/dragon.mjs';
import {monsterSRD} from '../src/monster-srd.js';
import {catalog} from '../src/catalog.js';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('One shared winged quadruped foundation maps all 40 existing age/color dragons',()=>{
 const all=catalogDragonRecipes();
 assert.equal(all.length,40);
 assert.equal(new Set(all.map(x=>x.species)).size,10);
 for(const color of DRAGON_FAMILY.species){
  assert.deepEqual(all.filter(x=>x.species===color).map(x=>x.age).sort(),['adult','ancient','wyrmling','young'].sort());
 }
 for(const item of all){
  assert.equal(item.foundationId,DRAGON_FAMILY.foundationId);
  assert.ok(catalog.some(c=>c.id===item.catalogId));
  assert.equal(item.commercialRelease,false);
 }
 for(const name of DRAGON_FAMILY.excludedTypes){
  const source=monsterSRD.find(x=>x.name===name);
  assert.ok(source,name+' source should exist');
  assert.throws(()=>dragonRecipeForRecord(source),/Not a standard/);
 }
});
test('Red, Green and Gold visibly vary scales, horns/frills and breath but preserve SAME rig joints',()=>{
 const ids=new Set(),stillHashes=new Set();
 for(const species of ['Red','Green','Gold']){
  const stem='dragon-young-'+species.toLowerCase(),cardId='mon-srd-52-young-'+species.toLowerCase()+'-dragon';
  const source=read('assets/studies/'+stem+'.svg');
  assert.equal(source,dragonArtwork(species,'young','still'));
  assert.ok(source.includes('data-foundation-id="'+DRAGON_FAMILY.foundationId+'"'));
  assert.ok(source.includes('data-dragon-species="'+species+'"'));
  for(const part of ['dragon-core','dragon-tail','dragon-wing-far','dragon-wing-near','dragon-hind-far','dragon-hind-near','dragon-front-far','dragon-front-near','dragon-head','dragon-horns','dragon-mouth','dragon-breath']){
   assert.ok(source.includes('id="'+part+'"'),part);
  }
  stillHashes.add(source);ids.add(cardId);
  for(const mode of DRAGON_MODES.filter(x=>x!=='still')){
   const output=read('assets/demos/'+stem+'-'+mode+'.svg');
   assert.equal(output,dragonArtwork(species,'young',mode),stem+' '+mode);
   assert.ok(output.includes('data-gridborn-mode="'+mode+'"'));
   assert.match(output,/prefers-reduced-motion:reduce/);
  }
  const action=read('assets/demos/'+stem+'-attack.svg');
  assert.match(action,/#dragon-breath\{animation:dragon-release/);
  assert.match(action,/1\.4s steps\(1,end\) 1 both/);
  for(const state of ['idle','move','rest'])
   assert.doesNotMatch(read('assets/demos/'+stem+'-'+state+'.svg'),/dragon-release/);
  const manifest=JSON.parse(read('assets/demos/'+stem+'-manifest.json'));
  assert.equal(manifest.id,cardId);
  assert.equal(manifest.purchasable,false);
  assert.equal(manifest.artLicenseStatus,'not-verified');
  assert.equal(manifest.vttCompatibility,'untested');
 }
 assert.equal(ids.size,3);assert.equal(stillHashes.size,3);
 assert.throws(()=>dragonArtwork('Purple','young'),/Unknown dragon/);
 assert.throws(()=>dragonArtwork('Red','young','fly'),/Unsupported dragon state/);
});
