import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {MONSTER_VARIANTS,renderVariant} from '../src/creature-rigs/monster-family-overlays.mjs';
import {catalog} from '../src/catalog.js';
import {animatedPreviews} from '../src/animated-previews.js';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('Ogre and Goblin Boss are original existing SRD identities on inherited source bodies',()=>{
 assert.deepEqual(MONSTER_VARIANTS.map(x=>x.id),['mon-srd-52-ogre','mon-srd-52-goblin-boss']);
 for(const role of MONSTER_VARIANTS){
  const target=catalog.filter(x=>x.id===role.id);
  assert.equal(target.length,1);
  assert.equal(target[0].name,role.name);
  assert.equal(target[0].category,'Monsters');
  assert.equal(target[0].purchasable,false);
  assert.equal(target[0].animationStatus,'art-study');
  assert.equal(target[0].source,'SRD 5.2.1');
  assert.notEqual(target[0].previewArt,'./assets/studies/'+role.base+'.svg');
  for(const mode of ['still','idle','move','attack','rest']){
   const original=read(mode==='still'?'assets/studies/'+role.base+'.svg':'assets/demos/'+role.base+'-'+mode+'.svg');
   const rendered=read(mode==='still'?'assets/studies/'+role.stem+'.svg':'assets/demos/'+role.stem+'-'+mode+'.svg');
   assert.equal(rendered,renderVariant(role,mode,original),'Original-body generation must not drift: '+role.stem+' '+mode);
   assert.match(rendered,new RegExp('data-source-body="'+role.base+'"'));
   assert.match(rendered,new RegExp(role.name));
   if(mode!=='still')assert.match(rendered,new RegExp('data-gridborn-mode="'+mode+'"'));
   assert.match(rendered,role.base==='cave-ogre'?/ogre-role-armor/:/boss-role-armor/);
  }
  const p=animatedPreviews[role.id];
  assert.equal(p.still,'./assets/studies/'+role.stem+'.svg');
  const man=JSON.parse(read('assets/demos/'+role.stem+'-manifest.json'));
  assert.equal(man.purchasable,false);assert.equal(man.id,role.id);
  assert.equal(man.vttCompatibility,'untested');
  assert.throws(()=>renderVariant(role,'fly','bad'),/Bad source/);
 }
});
test('Ogre and Goblin Boss visibly differ from their base without changing action class',()=>{
 const ogre=read('assets/demos/srd-ogre-attack.svg');
 assert.match(ogre,/ogre-club-slam/);
 assert.match(ogre,/ogre-ironbound-club/);
 assert.match(ogre,/rig-weapon/);
 const goblin=read('assets/demos/srd-goblin-boss-attack.svg');
 assert.match(goblin,/gb-goblin-strike-blade/);
 assert.match(goblin,/boss-copper-crown/);
 assert.match(goblin,/boss-steel-sword/);
 assert.match(goblin,/class="blade"/);
 assert.match(read('assets/demos/srd-goblin-boss-rest.svg'),/data-gridborn-mode="rest"/);
 const cave=catalog.find(x=>x.id==='mon-cave-goblin'),boss=catalog.find(x=>x.id==='mon-srd-52-goblin-boss');
 assert.notEqual(cave.id,boss.id);
 assert.equal(cave.animationStatus,'art-study');
 assert.equal(boss.animationStatus,'art-study');
});
