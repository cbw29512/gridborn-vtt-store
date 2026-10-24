import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {UNDEAD_VARIANTS,renderUndead} from '../src/creature-rigs/undead-family.mjs';
import {catalog} from '../src/catalog.js';
import {animatedPreviews} from '../src/animated-previews.js';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const modes=['still','idle','move','attack','rest'];
test('Two original indexed undead use canonical catalog identities and source-derived rig geometry',()=>{
 assert.deepEqual(UNDEAD_VARIANTS.map(v=>v.id),['mon-srd-52-ogre-zombie','mon-srd-52-skeleton']);
 for(const v of UNDEAD_VARIANTS){
  const cards=catalog.filter(c=>c.id===v.id);
  assert.equal(cards.length,1,'No duplicated product card for '+v.id);
  const item=cards[0],pre=animatedPreviews[v.id];
  assert.equal(item.name,v.name);
  assert.equal(item.category,'Monsters');
  assert.equal(item.source,'SRD 5.2.1');
  assert.equal(item.purchasable,false);
  assert.equal(item.animationStatus,'art-study');
  assert.equal(pre.still,item.previewArt);
  for(const mode of modes){
   const original=read(mode==='still'?'assets/studies/'+v.source+'.svg':'assets/demos/'+v.source+'-'+mode+'.svg');
   const output=read(mode==='still'?'assets/studies/'+v.stem+'.svg':'assets/demos/'+v.stem+'-'+mode+'.svg');
   assert.equal(output,renderUndead(v,mode,original),v.name+' '+mode+' deterministic build');
   assert.match(output,new RegExp('data-source-body="'+v.source+'"'));
   if(mode!=='still'){
    assert.match(output,new RegExp('data-gridborn-mode="'+mode+'"'));
    assert.match(output,/prefers-reduced-motion:reduce/);
   }
   const path='./assets/'+(mode==='still'?'studies/'+v.stem:'demos/'+v.stem+'-'+mode)+'.svg';
   assert.equal(pre[mode==='attack'?'action':mode],path);
  }
  const manifest=JSON.parse(read('assets/demos/'+v.stem+'-manifest.json'));
  assert.equal(manifest.id,v.id);assert.equal(manifest.purchasable,false);
  assert.equal(manifest.artLicenseStatus,'not-verified');
  assert.equal(manifest.vttCompatibility,'untested');
  assert.throws(()=>renderUndead(v,'fly','invalid'),/Invalid undead family source/);
 }
 assert.equal(catalog.find(x=>x.id==='mon-cave-ogre').animationStatus,'art-study');
 assert.equal(catalog.find(x=>x.id==='mon-dng-skeleton').animationStatus,'art-study');
});
test('Undead actions are physically driven, Skeleton never breathes, Ogre Zombie drags',()=>{
 const zIdle=read('assets/demos/srd-ogre-zombie-idle.svg');
 const zMove=read('assets/demos/srd-ogre-zombie-move.svg');
 const zAttack=read('assets/demos/srd-ogre-zombie-attack.svg');
 const zRest=read('assets/demos/srd-ogre-zombie-rest.svg');
 assert.match(zIdle,/ogre-zombie-sway/);assert.doesNotMatch(zIdle,/animation:ogre-heavy-breath 3\.2s ease-in-out infinite\}\.rig-weapon/);
 assert.match(zMove,/ogre-zombie-drag-leg/);assert.match(zMove,/rig-leg-left/);
 assert.match(zAttack,/ogre-zombie-club/);assert.match(zAttack,/rig-weapon/);
 assert.match(zRest,/ogre-zombie-inert/);assert.match(zRest,/ogre-zombie-ground-club/);
 const skelAttack=read('assets/demos/srd-skeleton-attack.svg');
 const skelRest=read('assets/demos/srd-skeleton-rest.svg');
 assert.match(skelAttack,/bone-attack-sword/);
 assert.match(skelAttack,/skeleton-rusted-sword/);
 assert.match(skelRest,/Corpse pose: all bones stay immobile/);
 assert.doesNotMatch(skelRest,/animation:[^;]*breath/);
 assert.match(skelRest,/bone-assembly.*rotate\(80 128 143\)/);
 assert.match(read('assets/studies/srd-skeleton.svg'),/bone-ribcage/);
 assert.match(read('assets/studies/srd-ogre-zombie.svg'),/zombie-decay-face/);
});
