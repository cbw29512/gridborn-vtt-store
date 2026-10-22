import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {CREATURE_FAMILIES,validateCreatureFamily} from '../src/creature-family-standards.mjs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('Ogre family keeps a real anatomy reference, but role profiles are visually identifiable',()=>{
 const ogre=CREATURE_FAMILIES.ogre;
 assert.equal(validateCreatureFamily(ogre),true);
 assert.equal(ogre.referenceId,'mon-cave-ogre');
 assert.ok(ogre.coreFeatures.length>=3);
 const source=read(ogre.referenceArt.slice(2));
 assert.match(source,/tusk|ogre|massive forearms/i);
 assert.deepEqual(Object.keys(ogre.roles),['common','mage','knight','king']);
 const {common,mage,knight,king}=ogre.roles;
 assert.match(common.weapon,/club/i); assert.match(mage.weapon,/staff/i);
 assert.match(knight.weapon,/sword/i); assert.match(king.weapon,/scepter/i);
 assert.match(mage.clothing,/robe/i);assert.match(knight.clothing,/plate/i);
 assert.match(king.details.join(' '),/crown/);
 assert.equal(new Set(Object.values(ogre.roles).map(x=>x.weapon)).size,4);
 for(const item of Object.values(ogre.roles))assert.ok(item.details.length>=3);
});
test('No mere recolor, ambiguous roles or missing anatomical reference passes family checks',()=>{
 const ogre=CREATURE_FAMILIES.ogre;
 assert.throws(()=>validateCreatureFamily({...ogre,coreFeatures:[]}),/anatomical reference/i);
 assert.throws(()=>validateCreatureFamily({...ogre,referenceArt:'./bad.svg'}),/anatomical reference/i);
 assert.throws(()=>validateCreatureFamily({...ogre,roles:{...ogre.roles,mage:{...ogre.roles.common}}}),/palette swaps/i);
 assert.throws(()=>validateCreatureFamily({...ogre,roles:{...ogre.roles,king:{...ogre.roles.king,details:[]}}}),/must define/i);
});
test('Family metadata is art direction only; no unfinished role marketed as a product',()=>{
 const cat=read('src/catalog.js');
 const source=read('src/creature-family-standards.mjs');
 assert.doesNotMatch(source,/purchasable:\s*true|checkout|stripe/i);
 assert.match(cat,/purchasable: false/);
 assert.match(read('src/creature-view.js'),/Side\/profile for nonhumanoid monsters/);
});
