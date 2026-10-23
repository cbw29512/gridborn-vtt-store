import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import {catalog} from '../src/catalog.js';
import {animatedPreviews} from '../src/animated-previews.js';
import {filterCatalog} from '../src/filters.js';
import {readCatalogRoute} from '../src/routing.js';
import {hasCatalogMotion} from '../src/catalog-motion.js';

const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const app=readFileSync(new URL('../src/app.js',import.meta.url),'utf8');
const css=readFileSync(new URL('../src/catalog-motion.css',import.meta.url),'utf8');
const colors=['Black','Blue','Brass','Bronze','Copper','Gold','Green','Red','Silver','White'];
const exists=path=>existsSync(new URL('../'+path.replace(/^\.\//,''),import.meta.url));

test('Monsters page contains one catalog grid and no duplicate featured dragon collection',()=>{
 assert.ok(html.includes('id="results"'));
 assert.ok(html.includes('href="?category=Monsters#catalog"'));
 assert.doesNotMatch(html,/id="featured-dragons"|id="featured-dragons-grid"|THE DRAGON COLLECTION/);
 assert.doesNotMatch(app,/featured-monsters|featuredDragons|initializeFeaturedDragonMotion/);
 assert.doesNotMatch(css,/\.featured-dragons|\.featured-dragon-card/);
 assert.doesNotMatch(html,/latest-previews|LATEST ARRIVALS/);
 assert.match(app,/assertSingleProductGallery\(document\)/);
 assert.match(app,/initializeCatalogMotion\(\)/);
 assert.match(app,/hasCatalogMotion\(b\.id\)/);
 assert.equal(readCatalogRoute('?category=Monsters',catalog).category,'Monsters');
});

test('Ten original animated Young Dragon records remain once in the Monsters catalog',()=>{
 const monsters=filterCatalog(catalog,readCatalogRoute('?category=Monsters',catalog));
 assert.equal(monsters.length,336);
 const dragons=monsters.filter(x=>/^Young (Black|Blue|Brass|Bronze|Copper|Gold|Green|Red|Silver|White) Dragon$/.test(x.name));
 assert.equal(dragons.length,10);
 assert.equal(new Set(dragons.map(x=>x.id)).size,10);
 assert.deepEqual(dragons.map(x=>x.name).sort(),colors.map(x=>'Young '+x+' Dragon').sort());
 for(const dragon of dragons){
  const animation=animatedPreviews[dragon.id];
  assert.ok(animation,dragon.id+' preview must remain');
  assert.equal(dragon.category,'Monsters');
  assert.equal(dragon.animationStatus,'art-study');
  assert.equal(dragon.purchasable,false);
  assert.equal(hasCatalogMotion(dragon.id),true);
  for(const key of ['still','idle','move','action','rest'])
   assert.ok(exists(animation[key]),dragon.id+' source '+key);
 }
 const young=filterCatalog(catalog,readCatalogRoute('?category=Monsters&q=Young',catalog));
 assert.deepEqual(young.map(x=>x.id).sort(),dragons.map(x=>x.id).sort());
});
