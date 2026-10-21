import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {SPIDER_MODES,renderSpider} from '../src/creature-rigs/spider.mjs';
import {catalog} from '../src/catalog.js';
import {artStudies} from '../src/art-studies.js';
import {animatedPreviews} from '../src/animated-previews.js';
const get=name=>readFileSync(new URL('../'+name,import.meta.url),'utf8');
const paths={
 still:'assets/studies/giant-cave-spider.svg',
 idle:'assets/demos/giant-cave-spider-idle.svg',
 move:'assets/demos/giant-cave-spider-move.svg',
 attack:'assets/demos/giant-cave-spider-attack.svg',
 rest:'assets/demos/giant-cave-spider-rest.svg'
};
test('Spider is eight-legged, eight-eyed and reproducible in all five studies',()=>{
 assert.deepEqual(SPIDER_MODES,['still','idle','move','attack','rest']);
 for(const [mode,path] of Object.entries(paths)){
  const svg=renderSpider(mode);
  assert.equal(get(path),svg,path+' out of sync');
  assert.equal((svg.match(/class="spider-leg spider-leg-\d+/g)||[]).length,8);
  for(let i=1;i<=8;i++){
   assert.match(svg,new RegExp('class="spider-leg spider-leg-'+i+' '));
   assert.match(svg,new RegExp('data-leg="'+i+'"'));
  }
  for(const part of ['spider-abdomen','spider-cephalothorax',
   'spider-eyes','spider-palps','spider-fangs','spider-mouth'])
   assert.match(svg,new RegExp('class="'+part+'"'));
  assert.equal((svg.match(/<circle cx="1\d\d" cy="(?:85|95|106|112)"/g)||[]).length>=5,true);
  assert.match(svg,/Eight|eight/);
  assert.match(svg,/Preview only; no VTT export or commercial certification/);
  assert.doesNotMatch(svg,/<script\b|<foreignObject\b|(?:href|url)\s*=\s*["']https?:/i);
 }
 assert.throws(()=>renderSpider('flight'),/Invalid spider animation mode/);
});
test('Spider locomotion truly uses alternating sets of four legs',()=>{
 const svg=get(paths.move);
 assert.equal((svg.match(/class="spider-leg spider-leg-\d+ spider-phase-a"/g)||[]).length,4);
 assert.equal((svg.match(/class="spider-leg spider-leg-\d+ spider-phase-b"/g)||[]).length,4);
 assert.match(svg,/\.spider-phase-a\{animation:spider-tetrapod-a 1\.2s ease-in-out infinite/);
 assert.match(svg,/\.spider-phase-b\{animation:spider-tetrapod-b 1\.2s ease-in-out infinite/);
 assert.match(svg,/@keyframes spider-walk-body/);
 assert.match(svg,/@keyframes spider-palp-walk/);
});
test('single attack, curled rest and reduced motion have distinct contracts',()=>{
 const attack=get(paths.attack),rest=get(paths.rest),idle=get(paths.idle),move=get(paths.move);
 assert.match(attack,/spider-strike-body 1\.4s ease-in-out 1 both/);
 assert.match(attack,/spider-fang-jab 1\.4s ease-in-out 1 both/);
 assert.match(rest,/Folded resting pose/);
 assert.match(rest,/class="spider-rest-web"/);
 assert.doesNotMatch(rest,/spider-tetrapod-a 1\.2s/);
 assert.match(rest,/spider-rest-breath 5s ease-in-out infinite/);
 assert.match(idle,/spider-idle-breath 3\.6s ease-in-out infinite/);
 assert.match(rest,/prefers-reduced-motion:reduce/);
 assert.notEqual(rest,move); assert.notEqual(attack,idle);
});
test('catalog and production board mark the same Spider as a non-sale prototype',()=>{
 const spider=catalog.find(x=>x.id==='mon-cave-spider');
 const preview=animatedPreviews[spider.id];
 assert.equal(spider.previewArt,artStudies[spider.id]);
 assert.equal(spider.previewArt,'./assets/studies/giant-cave-spider.svg');
 assert.equal(spider.animationStatus,'art-study');
 assert.equal(spider.purchasable,false);
 assert.equal(spider.artLicenseStatus,'not-verified');
 assert.equal(preview.actionDurationMs,1400);
 for(const key of ['still','idle','move','action','rest'])
  assert.match(preview[key],/giant-cave-spider/);
 assert.match(preview.labels.move,/eight legs/);
 assert.match(preview.labels.rest,/folded/);
 const roster=JSON.parse(get('docs/production/monster-roster.json')).assets;
 const record=roster.find(x=>x.id===spider.id);
 assert.equal(record.artStatus,'animated-study');
 assert.equal(record.animationStatus,'prototype');
 assert.equal(record.commercialRelease,false);
 assert.ok(Object.values(record.review).every(x=>x===false));
 const script=get('src/concept-preview.js');
 assert.match(script,/current\.labels\?\.\[next\]/);
});
