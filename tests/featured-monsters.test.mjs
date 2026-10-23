import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {catalog} from '../src/catalog.js';
import {featuredDragonEntries,FEATURED_DRAGON_COLORS,shouldShowFeaturedDragons} from '../src/featured-monsters.js';
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
 assert.match(html,/Prototype previews · not for sale/);
});
test('10 real animated Young Dragons, all links work and never imply a purchase',()=>{
 const featured=featuredDragonEntries();
 assert.equal(featured.length,10);
 assert.equal(new Set(featured.map(x=>x.id)).size,10);
 assert.deepEqual(featured.map(x=>x.name),FEATURED_DRAGON_COLORS.map(c=>'Young '+c+' Dragon'));
 for(const x of featured){
  assert.ok(readLocal(x.still),x.id+' still file');
  assert.ok(readLocal(x.idle),x.id+' idle file');
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
