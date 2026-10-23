import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {catalog} from '../src/catalog.js';
import {filterCatalog} from '../src/filters.js';
import {readCatalogRoute} from '../src/routing.js';
import {filterGalleryByMotion} from '../src/gallery-motion-filter.js';
import {hasCatalogMotion} from '../src/catalog-motion.js';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('Animated-only is a mode of the same four-category gallery, never a second grid',()=>{
 const html=read('index.html'),app=read('src/app.js');
 assert.equal((html.match(/class="product-grid"/g)||[]).length,1);
 assert.equal((html.match(/id="results"/g)||[]).length,1);
 assert.equal((html.match(/id="animated-only-toggle"/g)||[]).length,1);
 assert.match(html,/aria-pressed="false" aria-controls="results">Animated only/);
 assert.doesNotMatch(html,/latest-previews|featured-dragons/);
 assert.match(app,/filterGalleryByMotion\(filterCatalog\(catalog, state\),animatedOnly\)/);
 assert.match(app,/nodes\.animatedOnly\.addEventListener\('click'/);
 assert.match(app,/animatedOnly = false;/);
 assert.match(app,/nodes\.clear\.hidden = [^;]*!animatedOnly;/);
 assert.deepEqual(filterGalleryByMotion(catalog,false),catalog);
 const anim=filterGalleryByMotion(catalog,true);
 assert.equal(anim.length,40);
 assert.ok(anim.every(x=>hasCatalogMotion(x.id)&&!x.purchasable));
 for(const cat of ['Characters','NPCs','Monsters','Animals']){
  const items=filterCatalog(catalog,readCatalogRoute('?category='+cat,catalog));
  const moving=filterGalleryByMotion(items,true);
  assert.ok(moving.every(x=>x.category===cat));
  assert.equal(new Set(moving.map(x=>x.id)).size,moving.length);
 }
 const monsters=filterGalleryByMotion(filterCatalog(catalog,readCatalogRoute('?category=Monsters',catalog)),true);
 assert.equal(monsters.length,16);
 assert.equal(monsters.filter(x=>/^Young (Black|Blue|Brass|Bronze|Copper|Gold|Green|Red|Silver|White) Dragon$/.test(x.name)).length,10);
 assert.throws(()=>filterGalleryByMotion(null,true),/array/);
});
test('Original art is a keyboard accessible preview button, not a duplicate card',()=>{
 const card=read('src/product-card.js'),css=read('src/components.css');
 assert.match(card,/const visual = document\.createElement\('button'\)/);
 assert.match(card,/visual\.type='button'/);
 assert.match(card,/openConcept\(item,visual\)/);
 assert.match(card,/setAttribute\('aria-label', 'Explore '/);
 assert.match(card,/details\.textContent = hasMotion \? 'Explore animations' : 'View details'/);
 assert.match(card,/card\.dataset\.productId=item\.id/);
 assert.match(css,/\.product-visual\{[\s\S]*?cursor:pointer/);
 assert.match(css,/\.product-card\[data-motion-id\] \.preview-label\{display:none/);
});
