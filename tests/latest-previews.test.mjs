import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {catalog} from '../src/catalog.js';
import {readCatalogRoute} from '../src/routing.js';
import {filterCatalog} from '../src/filters.js';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('Latest-preview strip is early, navigable and linked to real media',()=>{
 assert.match(html,/Latest animated Gridborn previews/);
 assert.ok(html.indexOf('class="latest-previews"')<html.indexOf('class="collection-nav"'));
 const dragon=readCatalogRoute('?category=Monsters&q=Young+Dragon',catalog);
 const d=filterCatalog(catalog,dragon);
 assert.equal(d.length,10,'ten real young color/metal dragon cards');
 assert.ok(d.every(x=>x.animationStatus==='art-study'&&!x.purchasable));
 const npc=readCatalogRoute('?category=NPCs&q=Village+Innkeeper',catalog);
 const n=filterCatalog(catalog,npc);
 assert.deepEqual(n.map(x=>x.id),['npc-inn-human']);
 assert.equal(n[0].animationStatus,'art-study');
 for(const route of ['?category=Monsters&amp;q=Young+Dragon#catalog',
  '?category=NPCs&amp;q=Village+Innkeeper#catalog']) assert.ok(html.includes(route));
 assert.match(html,/Preview art only · buying disabled/);
});
