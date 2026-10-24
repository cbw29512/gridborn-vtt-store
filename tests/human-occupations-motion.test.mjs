import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {HUMAN_ROLE_SPECS,buildHumanOccupation,renderHumanOccupation} from '../src/creature-rigs/human-occupations.mjs';
import {catalog} from '../src/catalog.js';
import {animatedPreviews} from '../src/animated-previews.js';
import {NPC_CONCEPTS} from '../src/npc-roster.js';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const modes=['idle','move','attack','rest'];
test('City Guard and Blacksmith are TWO real existing NPC identities using ONE Human anatomy',()=>{
 const base=read('assets/studies/village-innkeeper.svg');
 const origLeg=(s,id)=>s.match(new RegExp('<g id="'+id+'">([\\s\\S]*?)<\\/g>'))?.[1];
 const names=Object.keys(HUMAN_ROLE_SPECS).sort();
 assert.deepEqual(names,['blacksmith','guard']);
 const icons=new Set();
 for(const key of names){
  const role=HUMAN_ROLE_SPECS[key],art=read('assets/studies/'+role.stem+'.svg');
  assert.equal(art,buildHumanOccupation(base,role,'human-body'),role.stem+' source drift');
  assert.equal(art.includes('data-foundation-id="standard-human-npc"'),true);
  for(const limb of ['left','right'])
   assert.equal(origLeg(art,'human-'+limb+'-leg'),origLeg(base,'inn-'+limb+'-leg'));
  for(const rig of ['human-body','human-left-leg','human-right-leg','human-tool-arm','human-offhand-arm','human-impact'])
   assert.match(art,new RegExp('id="'+rig+'"'));
  assert.ok(!art.includes('inn-server-arm')&&!art.includes('inn-keys'));
  const record=catalog.find(x=>x.id===role.id);
  assert.ok(record,role.id+' original catalog card missing');
  assert.equal(record.name,role.name);
  assert.equal(record.category,'NPCs');
  assert.equal(record.purchasable,false);
  assert.equal(record.animationStatus,'art-study');
  icons.add(art);
 }
 assert.equal(icons.size,2,'A different role must look different on the same body');
 assert.equal(NPC_CONCEPTS.find(x=>x.id==='npc-roster-blacksmith-human').gender,'nonbinary');
 assert.throws(()=>buildHumanOccupation('bad',HUMAN_ROLE_SPECS.guard,'human-body'),/foundation anchor missing/);
});
test('Each occupation has 4 deterministic states, real weapon action and blocked retail',()=>{
 for(const role of Object.values(HUMAN_ROLE_SPECS)){
  const art=read('assets/studies/'+role.stem+'.svg');
  const pre=animatedPreviews[role.id];
  assert.equal(pre.still,'./assets/studies/'+role.stem+'.svg');
  for(const mode of modes){
   const animation=read('assets/demos/'+role.stem+'-'+mode+'.svg');
   assert.equal(animation,renderHumanOccupation(mode,art,role));
   assert.match(animation,new RegExp('data-gridborn-mode="'+mode+'"'));
   assert.match(animation,/prefers-reduced-motion:reduce/);
   assert.equal(pre[mode==='attack'?'action':mode],'./assets/demos/'+role.stem+'-'+mode+'.svg');
   if(mode!=='attack')assert.doesNotMatch(animation,new RegExp(role.actionName));
  }
  const attack=read('assets/demos/'+role.stem+'-attack.svg');
  assert.ok(attack.includes(role.actionName));
  assert.ok(attack.includes('1.4s steps(1,end) 1 both'));
  const manifest=JSON.parse(read('assets/demos/'+role.stem+'-manifest.json'));
  assert.equal(manifest.id,role.id);assert.equal(manifest.purchasable,false);
  assert.equal(manifest.artLicenseStatus,'not-verified');
  assert.equal(manifest.vttCompatibility,'untested');
  assert.throws(()=>renderHumanOccupation('fly',art,role),/Unsupported Human occupation/);
 }
 const svg=read('assets/studies/city-guard.svg');
 assert.match(svg,/Shield is strapped to the LEFT forearm/);
 assert.match(svg,/Spear and right glove are one group/);
 assert.match(read('assets/demos/human-blacksmith-attack.svg'),/human-hammer-swing/);
});
