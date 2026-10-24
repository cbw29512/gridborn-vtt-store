import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {catalog} from '../src/catalog.js';
import {filterCatalog} from '../src/filters.js';
import {readCatalogRoute} from '../src/routing.js';
import {assertSingleProductGallery} from '../src/storefront-gallery.js';

const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const html=read('index.html'),app=read('src/app.js');
const categories=['Characters','NPCs','Monsters','Animals'];

test('One product gallery on the selling site; shortcut images are navigation, not another gallery',()=>{
 assert.equal((html.match(/id="results"/g)||[]).length,1);
 assert.equal((html.match(/class="product-grid"/g)||[]).length,1);
 assert.equal((html.match(/class="collection-nav"/g)||[]).length,1);
 assert.equal((html.match(/data-category-link=/g)||[]).length,4);
 assert.doesNotMatch(html,/latest-previews|featured-dragons|featured-dragon-card/i);
 assert.doesNotMatch(app,/latestPreviews|featuredDragon|renderFeaturedDragonGallery/i);
 assert.match(app,/assertSingleProductGallery\(document\)/);
 assert.match(read('src/product-card.js'),/card\.dataset\.productId=item\.id/);
 assert.doesNotMatch(read('src/components.css'),/\.latest-previews|\.latest-preview-link/);
 for(const category of categories){
  assert.match(html,new RegExp('href="\\?category='+category+'#catalog"'));
  const ids=filterCatalog(catalog,readCatalogRoute('?category='+category,catalog)).map(x=>x.id);
  assert.equal(new Set(ids).size,ids.length,category+' catalog duplicates');
 }
});
function fakeRoot(arrays){
 const [grids,cards,owned]=arrays;
 return {querySelectorAll(selector){
  if(selector==='.product-grid')return grids;
  if(selector==='.product-card')return cards;
  throw Error('Unexpected selector '+selector);
 }};
}
const one=(id)=>({dataset:{productId:id}});
test('Rendering guard rejects duplicate cards, second grids and misplaced cards',()=>{
 const a=one('chr-ftr-human'),b=one('mon-cave-ogre');
 const grid={id:'results',querySelectorAll:()=>[a,b]};
 assert.equal(assertSingleProductGallery(fakeRoot([[grid],[a,b],[a,b]])),true);
 assert.throws(()=>assertSingleProductGallery(fakeRoot([[grid,{id:'extras'}],[a,b],[a,b]])),/Only the canonical/);
 assert.throws(()=>assertSingleProductGallery(fakeRoot([[{...grid,id:'repeated'}],[a,b],[a,b]])),/Only the canonical/);
 assert.throws(()=>assertSingleProductGallery(fakeRoot([[grid],[a,b,one('npc-inn-human')],[a,b]])),/only in the canonical/);
 const double=one('chr-ftr-human');
 const dupe={id:'results',querySelectorAll:()=>[a,double]};
 assert.throws(()=>assertSingleProductGallery(fakeRoot([[dupe],[a,double],[a,double]])),/duplicated product listing/);
 const unlabeled={id:'results',querySelectorAll:()=>[{}]};
 assert.throws(()=>assertSingleProductGallery(fakeRoot([[unlabeled],[{}],[{}]])),/Missing or duplicated/);
 assert.throws(()=>assertSingleProductGallery(null),/queryable storefront root/);
});
