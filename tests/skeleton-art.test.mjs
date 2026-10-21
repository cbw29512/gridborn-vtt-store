import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const source=readFileSync(new URL('../assets/studies/skeleton-warrior.svg',import.meta.url),'utf8');
test('skeleton anatomy study shows uncovered ribs, pelvis and four bone limbs',()=>{
 for(const className of ['bone-ribcage','bone-pelvis','bone-leg-left','bone-leg-right',
  'bone-arm-left','bone-arm-right','bone-skull','bone-armor','bone-blade','bone-shield'])
  assert.match(source,new RegExp('class="'+className+'"'),className);
 assert.ok((source.match(/<path d="M128 /g)||[]).length>=4,'At least four left/right rib arcs');
 assert.match(source,/Dark gaps between rib arcs/);
 assert.match(source,/Partial armor cannot conceal the ribs/);
 assert.match(source,/exposed pelvis and jointed bone limbs/i);
});
test('revised skeleton remains static, original, and does not misrepresent product readiness',()=>{
 assert.match(source,/This is a static|Static concept study/i);
 assert.doesNotMatch(source,/<script\\b|<foreignObject\\b|(?:href|url)\\s*=\\s*["']https?:/i);
 assert.match(source,/viewBox="0 0 256 240"/);
 const catalog=readFileSync(new URL('../src/art-studies.js',import.meta.url),'utf8');
 assert.match(catalog,/mon-dng-skeleton.*skeleton-warrior\.svg/);
 const info=JSON.parse(readFileSync(new URL('../docs/production/monster-roster.json',import.meta.url),'utf8'));
 const record=info.assets.find(x=>x.id==='mon-dng-skeleton');
 assert.equal(record.artStatus,'static-study');
 assert.equal(record.animationStatus,'not-produced');
 assert.equal(record.review.anatomy,false);
 assert.equal(record.commercialRelease,false);
});
