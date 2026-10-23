import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {buildHumanFarmerSource,renderHumanFarmer,HUMAN_FARMER_STATES} from '../src/creature-rigs/human-farmer.mjs';
import {NPC_CONCEPTS} from '../src/npc-roster.js';
import {catalog} from '../src/catalog.js';
import {animatedPreviews} from '../src/animated-previews.js';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('Human Farmer reuses the Innkeeper HUMAN leg/body anatomy, not a separate rig',()=>{
 const source=read('assets/studies/village-innkeeper.svg');
 const farmer=read('assets/studies/human-farmer.svg');
 assert.equal(farmer,buildHumanFarmerSource(source));
 for(const [farmerId,innkeeperId] of [['farm-left-leg','inn-left-leg'],['farm-right-leg','inn-right-leg']]){
  const body=(s,id)=>s.match(new RegExp('<g id="'+id+'">([\\s\\S]*?)<\\/g>'))?.[1];
  assert.equal(body(farmer,farmerId),body(source,innkeeperId),'same original human bones and boots');
 }
 assert.ok(farmer.includes('denim')||farmer.includes('denim bib'));
 assert.match(farmer,/id="farm-tool-arm"/);
 assert.match(farmer,/pitchfork/);
 assert.doesNotMatch(farmer,/inn-server-arm|inn-keys|inn-splash|foam|tankard/);
 assert.match(farmer,/Human Farmer · Female/);
 const npc=NPC_CONCEPTS.find(x=>x.id==='npc-roster-farmer-human');
 assert.equal(npc.gender,'female');
 assert.equal(npc.occupation,'Farmer');
 assert.throws(()=>buildHumanFarmerSource('broken'),/anatomy foundation missing/);
});
test('Human Farmer has 4 source-synchronized motion states and retail remains disabled',()=>{
 const id='npc-roster-farmer-human';
 const item=catalog.find(x=>x.id===id),preview=animatedPreviews[id];
 assert.equal(item.category,'NPCs');
 assert.equal(item.animationStatus,'art-study');
 assert.equal(item.purchasable,false);
 assert.equal(item.previewArt,preview.still);
 const source=read('assets/studies/human-farmer.svg');
 assert.deepEqual(HUMAN_FARMER_STATES,['idle','move','attack','rest']);
 for(const mode of HUMAN_FARMER_STATES){
  const output=read('assets/demos/human-farmer-'+mode+'.svg');
  assert.equal(output,renderHumanFarmer(mode,source));
  assert.match(output,new RegExp('data-gridborn-mode="'+mode+'"'));
  assert.match(output,/prefers-reduced-motion:reduce/);
  assert.equal(preview[mode==='attack'?'action':mode],'./assets/demos/human-farmer-'+mode+'.svg');
 }
 assert.match(read('assets/demos/human-farmer-attack.svg'),/farm-pitchfork-thrust/);
 assert.match(read('assets/demos/human-farmer-attack.svg'),/farm-impact/);
 for(const mode of ['idle','move','rest'])
  assert.doesNotMatch(read('assets/demos/human-farmer-'+mode+'.svg'),/farm-pitchfork-thrust|farm-impact/);
 const manifest=JSON.parse(read('assets/demos/human-farmer-manifest.json'));
 assert.equal(manifest.id,id);assert.equal(manifest.purchasable,false);
 assert.equal(manifest.artLicenseStatus,'not-verified');
 assert.equal(manifest.vttCompatibility,'untested');
 assert.throws(()=>renderHumanFarmer('fly',source),/Unsupported Human Farmer state/);
});
