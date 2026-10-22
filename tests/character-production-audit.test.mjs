import test from 'node:test';
import assert from 'node:assert/strict';
import {characterProductionAudit} from '../src/character-production-audit.mjs';
import {catalog} from '../src/catalog.js';

test('report distinguishes concepts, animated classes and animated hero identities',()=>{
  const report=characterProductionAudit();
  assert.equal(report.classCount,12);
  assert.equal(report.variantConcepts,108);
  assert.deepEqual(report.classesMissingStudy,[]);
  assert.equal(report.animatedCharacterStudies,14);
  assert.equal(report.animatedHeroVariants,7);
  assert.equal(report.classes.reduce((n,c)=>n+c.remainingVariantStudies,0),101);
  for(const row of report.classes){
    assert.equal(row.concepts,9);
    assert.deepEqual(row.genderConcepts,{male:3,female:3,nonbinary:3});
  }
});

test('fail closed on duplicate and absent variant identities',()=>{
  assert.throws(()=>characterProductionAudit([...catalog,catalog[0]]),/Duplicate catalog ID/);
  assert.throws(()=>characterProductionAudit(catalog.filter(x=>x.id!=='pregen-bard-male-1')), /Variant missing from catalog/);
});
