import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {MONSTER_VARIANTS,renderRankVariant,renderVariant} from '../src/creature-rigs/monster-family-overlays.mjs';
import {catalog} from '../src/catalog.js';
import {animatedPreviews} from '../src/animated-previews.js';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('Goblin Warrior/Minion are two authentic monster records reusing exactly one body/gait',()=>{
 const ranks=MONSTER_VARIANTS.filter(x=>x.rank);
 assert.deepEqual(ranks.map(x=>x.name),['Goblin Warrior','Goblin Minion']);
 const seen=new Set();
 for(const role of ranks){
  const row=catalog.filter(x=>x.id===role.id);
  assert.equal(row.length,1);
  assert.equal(row[0].name,role.name);
  assert.equal(row[0].category,'Monsters');
  assert.equal(row[0].source,'SRD 5.2.1');
  assert.equal(row[0].purchasable,false);
  assert.equal(row[0].animationStatus,'art-study');
  const still=read('assets/studies/'+role.stem+'.svg');
  assert.equal(still.includes(role.rank==='warrior'?'warrior-role-armor':'minion-role-rags'),true);
  seen.add(still);
  const pre=animatedPreviews[role.id];
  for(const mode of ['still','idle','move','attack','rest']){
   const source=read(mode==='still'?'assets/studies/cave-goblin.svg':'assets/demos/cave-goblin-'+mode+'.svg');
   const result=read(mode==='still'?'assets/studies/'+role.stem+'.svg':'assets/demos/'+role.stem+'-'+mode+'.svg');
   assert.equal(result,renderRankVariant(role,mode,source));
   assert.match(result,/data-source-body="cave-goblin"/);
   assert.match(result,/class="body"/);
   if(mode!=='still')assert.match(result,new RegExp('data-gridborn-mode="'+mode+'"'));
   if(mode==='attack')assert.match(result,/gb-goblin-strike-blade/);
   if(mode==='move')assert.match(result,/gb-goblin-step-left/);
   if(mode!=='still')assert.match(result,/prefers-reduced-motion:reduce/);
   const key=mode==='attack'?'action':mode;
   assert.equal(pre[key],'./assets/'+(mode==='still'?'studies/'+role.stem:'demos/'+role.stem+'-'+mode)+'.svg');
  }
  const m=JSON.parse(read('assets/demos/'+role.stem+'-manifest.json'));
  assert.equal(m.id,role.id);assert.equal(m.purchasable,false);
  assert.equal(m.vttCompatibility,'untested');
 }
 assert.equal(seen.size,2,'Minion must look different from armored Warrior');
 assert.throws(()=>renderRankVariant(ranks[0],'fly','invalid'),/Invalid Goblin rank source/);
});
test('Existing Ogre and Goblin Boss remain deterministic under the extended shared generator',()=>{
 for(const role of MONSTER_VARIANTS.filter(x=>!x.rank)){
  for(const mode of ['still','idle','move','attack','rest']){
   const base=read(mode==='still'?'assets/studies/'+role.base+'.svg':'assets/demos/'+role.base+'-'+mode+'.svg');
   const dest=read(mode==='still'?'assets/studies/'+role.stem+'.svg':'assets/demos/'+role.stem+'-'+mode+'.svg');
   assert.equal(dest,renderVariant(role,mode,base));
  }
 }
});
