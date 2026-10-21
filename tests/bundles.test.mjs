import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {catalog} from '../src/catalog.js';
import {BUNDLE_TEMPLATES,BUNDLE_TIERS,UNIT_PRICE_CENTS,MAX_BUNDLE_TOKENS,
  bundlePricing,cleanBundleIds,validateBundleTemplates} from '../src/bundle-data.js';

test('bundles are proposed discount combinations, while all 518 tokens remain unavailable',()=>{
  assert.equal(catalog.length,518);
  assert.equal(UNIT_PRICE_CENTS,99);
  assert.equal(MAX_BUNDLE_TOKENS,25);
  assert.ok(catalog.every(item=>item.priceCents===99 && item.purchasable===false));
  assert.deepEqual(BUNDLE_TIERS.map(p=>[p.size,p.cents]),
    [[1,99],[5,399],[10,749],[25,1799]]);
});

test('bundle discounts apply automatically and never increase the ordinary total',()=>{
  const expected=new Map([[0,0],[1,99],[4,396],[5,399],
    [6,498],[10,749],[15,1148],[20,1498],[25,1799]]);
  for(let n=0;n<=MAX_BUNDLE_TOKENS;n++){
    const result=bundlePricing(n);
    assert.equal(result.count,n);
    assert.equal(result.regularCents,n*99);
    assert.equal(result.savingsCents,result.regularCents-result.totalCents);
    assert.ok(result.totalCents<=result.regularCents);
    assert.equal(result.packs.reduce((sum,p)=>sum+p.size*p.quantity,0),n);
    assert.equal(result.packs.reduce((sum,p)=>sum+p.cents*p.quantity,0),result.totalCents);
    if(expected.has(n))assert.equal(result.totalCents,expected.get(n));
  }
  for(const bad of [-1,26,1.5,NaN,'5',null])
    assert.throws(()=>bundlePricing(bad),/Bundle count/);
});

test('curated themed plans use five real, distinct catalog IDs',()=>{
  assert.equal(BUNDLE_TEMPLATES.length,4);
  assert.equal(validateBundleTemplates(catalog),true);
  for(const pack of BUNDLE_TEMPLATES){
    assert.equal(pack.ids.length,5);
    assert.equal(new Set(pack.ids).size,5);
    assert.equal(bundlePricing(pack.ids.length).totalCents,399);
    assert.ok(pack.ids.every(id=>catalog.some(item=>item.id===id)));
  }
});

test('bundle drafts safely discard fake IDs, duplicates and entries past 25',()=>{
  const list=catalog.map(item=>item.id);
  assert.deepEqual(cleanBundleIds([list[0],list[0],'__bogus__',list[1]],catalog),
    [list[0],list[1]]);
  assert.deepEqual(cleanBundleIds(null,catalog),[]);
  assert.deepEqual(cleanBundleIds('bad',catalog),[]);
  assert.equal(cleanBundleIds([...list.slice(0,40),list[0]],catalog).length,25);
});

test('bundles are accessible, preview-only and cannot initiate a payment',()=>{
  const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
  const html=read('index.html'),ui=read('src/bundle-ui.js');
  for(const id of ['bundles','bundle-studio','bundle-tiers','bundle-templates',
    'bundle-items','bundle-total','bundle-count','bundle-regular','bundle-savings',
    'bundle-breakdown','bundle-feedback','bundle-export','bundle-clear'])
    assert.match(html,new RegExp('id="'+id+'"'));
  assert.match(html,/Planning preview only/);
  assert.match(html,/No checkout/);
  assert.match(read('src/product-card.js'),/dataSet|dataset.bundleId/);
  assert.match(ui,/localStorage/);
  assert.match(ui,/canPurchase:false/);
  assert.match(ui,/gridborn:catalog-rendered/);
  assert.doesNotMatch(ui,/stripe|checkout\.sessions|payment_link/i);
  assert.doesNotMatch(html,/https:\/\/checkout\.stripe\.com|Buy now/i);
});
