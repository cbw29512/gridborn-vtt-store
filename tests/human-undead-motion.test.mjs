import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {HUMAN_UNDEAD,deriveHumanUndead,renderHumanUndead} from '../src/creature-rigs/human-undead.mjs';
import {catalog} from '../src/catalog.js';
import {animatedPreviews} from '../src/animated-previews.js';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
function legGroup(text,id){
 const match=text.match(new RegExp('<g id="'+id+'">([\\s\\S]*?)<\\/g>'));
 assert.ok(match,'Missing leg '+id);
 return match[1].replace(/fill="#[0-9a-fA-F]{6}"/g,'fill="#PAINT"');
}
test('Human Ghoul and Zombie preserve human body leg geometry but no Innkeeper props',()=>{
 const original=read('assets/studies/village-innkeeper.svg');
 assert.deepEqual(HUMAN_UNDEAD.map(x=>x.id),['mon-srd-52-zombie','mon-srd-52-ghoul']);
 for(const role of HUMAN_UNDEAD){
  const art=read('assets/studies/'+role.stem+'.svg');
  assert.equal(art,deriveHumanUndead(original,role));
  assert.equal(art.includes('data-source-body="village-innkeeper"'),true);
  assert.equal(legGroup(art,'undead-left-leg'),legGroup(original,'inn-left-leg'));
  assert.equal(legGroup(art,'undead-right-leg'),legGroup(original,'inn-right-leg'));
  assert.doesNotMatch(art,/tankard|inn-server-arm|inn-splash|inn-keys|inn-body/);
  assert.match(art,/id="undead-right-claw"/);
  assert.match(art,/id="undead-left-claw"/);
  assert.match(art,/id="undead-claw-trails"/);
  const row=catalog.filter(x=>x.id===role.id);
  assert.equal(row.length,1);
  assert.equal(row[0].source,'SRD 5.2.1');
  assert.equal(row[0].category,'Monsters');
  assert.equal(row[0].name,role.name);
  assert.equal(row[0].purchasable,false);
  assert.equal(row[0].animationStatus,'art-study');
  assert.equal(row[0].previewArt,'./assets/studies/'+role.stem+'.svg');
 }
 const ghoulIdle=read('assets/demos/srd-ghoul-idle.svg');
 assert.match(ghoulIdle,/#undead-left-claw\\{[^}]*transform-origin:89px 122px/);
 assert.match(ghoulIdle,/#undead-right-claw\\{[^}]*transform-origin:165px 122px/);
 assert.notEqual(read('assets/studies/srd-zombie.svg'),read('assets/studies/srd-ghoul.svg'));
 assert.throws(()=>deriveHumanUndead('broken',HUMAN_UNDEAD[0]),/foundation missing/);
});
test('Each unarmed undead has independently authored four-state claw movement and noncommercial VTT manifest',()=>{
 for(const role of HUMAN_UNDEAD){
  const source=read('assets/studies/'+role.stem+'.svg'),pre=animatedPreviews[role.id];
  assert.equal(pre.still,'./assets/studies/'+role.stem+'.svg');
  for(const stage of ['idle','move','attack','rest']){
   const asset=read('assets/demos/'+role.stem+'-'+stage+'.svg');
   assert.equal(asset,renderHumanUndead(stage,source,role));
   assert.match(asset,new RegExp('data-gridborn-mode="'+stage+'"'));
   assert.match(asset,/prefers-reduced-motion:reduce/);
   assert.equal(pre[stage==='attack'?'action':stage],'./assets/demos/'+role.stem+'-'+stage+'.svg');
   if(stage==='rest')assert.doesNotMatch(asset,/animation:[^;]*breath/);
  }
  const attack=read('assets/demos/'+role.stem+'-attack.svg');
  if(role.kind==='zombie'){
   assert.match(attack,/undead-zombie-swipe/);
   assert.match(read('assets/demos/srd-zombie-move.svg'),/undead-zombie-drag/);
  }else{
   assert.match(attack,/undead-ghoul-rake-left/);
   assert.match(attack,/undead-ghoul-rake-right/);
   assert.match(read('assets/demos/srd-ghoul-move.svg'),/undead-ghoul-prowl/);
  }
  const m=JSON.parse(read('assets/demos/'+role.stem+'-manifest.json'));
  assert.equal(m.id,role.id);assert.equal(m.purchasable,false);
  assert.equal(m.vttCompatibility,'untested');
  assert.equal(m.artLicenseStatus,'not-verified');
  assert.throws(()=>renderHumanUndead('fly',source,role),/Unsupported human undead state/);
 }
});
