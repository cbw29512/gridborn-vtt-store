import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {catalog} from '../src/catalog.js';
import {featuredDragonEntries,FEATURED_DRAGON_COLORS,shouldShowFeaturedDragons,initializeFeaturedDragonMotion} from '../src/featured-monsters.js';
import {MOTION_STAGES,showcaseDurationMs} from '../src/catalog-motion.js';
import {readCatalogRoute} from '../src/routing.js';
import {filterCatalog} from '../src/filters.js';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const readLocal=p=>existsSync(new URL('../'+p.replace(/^\.\//,''),import.meta.url));
test('the exact user-shared general Monsters URL displays the new family showcase above the catalog',()=>{
 const state=readCatalogRoute('?category=Monsters',catalog);
 assert.deepEqual(state,{category:'Monsters',query:'',primary:'',secondary:''});
 assert.equal(shouldShowFeaturedDragons(state),true);
 assert.equal(shouldShowFeaturedDragons(readCatalogRoute('?category=Monsters&q=Young',catalog)),false);
 assert.equal(shouldShowFeaturedDragons(readCatalogRoute('?category=Characters',catalog)),false);
 assert.equal(shouldShowFeaturedDragons(readCatalogRoute('?category=Monsters&primary=Dragon',catalog)),false);
 const h=html.indexOf('id="featured-dragons"');
 assert.ok(h>0&&h<html.indexOf('class="latest-previews"'));
 assert.match(html,/id="featured-dragons-grid"/);
 assert.match(html,/THE DRAGON COLLECTION/);
 assert.doesNotMatch(html,/Prototype previews · not for sale/);
 assert.doesNotMatch(html,/Animated art study · view all 4 states/);
 assert.match(html,/src="\.\/assets\/demos\/dragon-young-red-idle\.svg"/);
 assert.match(html,/src="\.\/assets\/demos\/village-innkeeper-idle\.svg"/);
});
test('10 real animated Young Dragons, all links work and never imply a purchase',()=>{
 const featured=featuredDragonEntries();
 assert.equal(featured.length,10);
 assert.equal(new Set(featured.map(x=>x.id)).size,10);
 assert.deepEqual(featured.map(x=>x.name),FEATURED_DRAGON_COLORS.map(c=>'Young '+c+' Dragon'));
 for(const x of featured){
  assert.ok(readLocal(x.still),x.id+' still file');
  for(const stage of MOTION_STAGES){
   assert.ok(readLocal(x.preview[stage.key]),x.id+' '+stage.key+' animation file');
   assert.ok(showcaseDurationMs(x.preview,stage.key)>=500);
  }
  const q=x.href.slice(x.href.indexOf('?'),x.href.indexOf('#'));
  const state=readCatalogRoute(q,catalog);
  assert.deepEqual(filterCatalog(catalog,state).map(x=>x.id),[x.id]);
  const item=catalog.find(c=>c.id===x.id);
  assert.equal(item.purchasable,false);
  assert.equal(item.animationStatus,'art-study');
 }
 const invalid=[...catalog].filter(x=>x.id!==featured[0].id);
 assert.throws(()=>featuredDragonEntries(invalid),/Missing source-backed/);
});

test('featured gallery uses a real synchronized four-state motion lifecycle',()=>{
 const src=readFileSync(new URL('../src/featured-monsters.js',import.meta.url),'utf8');
 assert.match(src,/export function initializeFeaturedDragonMotion/);
 assert.match(src,/MOTION_STAGES\[i\]\.key/);
 assert.match(src,/showcaseDurationMs\(entries\[0\]\.preview,mode\)/);
 assert.match(src,/setTimeout/);
 assert.match(src,/IntersectionObserver/);
 assert.match(src,/prefers-reduced-motion: reduce/);
 assert.match(src,/visibilitychange/);
 assert.match(src,/gridborn:catalog-rendered/);
 assert.match(src,/section\.dataset\.featuredPhase=mode/);
 assert.match(src,/observer\?\.disconnect\(\)/);
 assert.match(src,/!canAnimate\(\)/);
 assert.match(src,/renderFeaturedDragonGallery/);
 assert.equal(typeof initializeFeaturedDragonMotion,'function');
 const phases=MOTION_STAGES.map(x=>x.key);
 assert.deepEqual(phases,['idle','move','action','rest']);
 const first=featuredDragonEntries()[0].preview;
 const total=phases.reduce((n,phase)=>n+showcaseDurationMs(first,phase),0);
 assert.ok(total>=9000&&total<=11000,'Full gallery preview must cycle in 9–11 seconds');
});
