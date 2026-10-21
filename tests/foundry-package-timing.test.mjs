import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {validatePackageReceipt,readPackageTiming} from
  '../foundry/gridborn-controller/scripts/package-timing.mjs';

const folder='worlds/adventure/gridborn/mon-cave-spider';
const receipt={
  assetId:'mon-cave-spider',status:'technical-preview-pass',
  purchaseEnabled:false,vttCompatibility:'untested',
  files:['idle.webm','move.webm','attack.webm','rest.webm','still.png'],
  attackMs:1400,clipSource:'independent-svg-states'
};
test('private package receipt supplies source-exact timing with no monster-name switch',()=>{
 assert.deepEqual(validatePackageReceipt(receipt),{
   assetId:'mon-cave-spider',attackMs:1400
 });
 assert.deepEqual(validatePackageReceipt({...receipt,assetId:'ani-forest-wolf',attackMs:1300}),{
   assetId:'ani-forest-wolf',attackMs:1300
 });
 assert.equal(Object.isFrozen(validatePackageReceipt(receipt)),true);
});

test('receipt auto-detection reads only a sanitized same-origin Foundry Data folder',async()=>{
 const requests=[];
 const fakeFetch=async(path,options)=>{
  requests.push({path,options});
  return {ok:true,json:async()=>receipt};
 };
 const found=await readPackageTiming('  '+folder+'/  ',fakeFetch);
 assert.deepEqual(found,{assetId:'mon-cave-spider',attackMs:1400});
 assert.deepEqual(requests,[{
   path:folder+'/gridborn-preview.json',
   options:{credentials:'same-origin',cache:'no-store',redirect:'error'}
 }]);
 for(const unsafe of ['../secret','/admin','https://evil.invalid/x',
   'worlds/a/../../secret','worlds//double','worlds/a?query=secret']){
  await assert.rejects(readPackageTiming(unsafe,fakeFetch));
 }
 assert.equal(requests.length,1,'Unsafe paths never reach fetch');
});

test('missing receipt does not invent a duration; malformed receipt is rejected',async()=>{
 assert.equal(await readPackageTiming(folder,async()=>({status:404,ok:false})),null);
 await assert.rejects(readPackageTiming(folder,async()=>({status:403,ok:false})),/Could not read/);
 await assert.rejects(readPackageTiming(folder,async()=>({ok:true,json:async()=>{throw Error('invalid JSON');}})),/not valid JSON/);
 await assert.rejects(readPackageTiming(folder,null),/No Foundry package reader/);
 const unsafe=[
  {purchaseEnabled:true}, {status:'commercially-certified'},
  {assetId:'../escape'}, {attackMs:undefined},
  {attackMs:499}, {attackMs:60001}, {attackMs:1400.5},
  {attackMs:'1400'}, {files:['idle.webm']},
  {clipSource:'external-script'}
 ];
 for(const change of unsafe)
  assert.throws(()=>validatePackageReceipt({...receipt,...change}),JSON.stringify(change));
});

test('Foundry setup retains per-token manual override and never guesses from unrelated name',()=>{
 const hud=readFileSync(new URL('../foundry/gridborn-controller/scripts/hud.mjs',import.meta.url),'utf8');
 const media=readFileSync(new URL('../tools/controller_package.py',import.meta.url),'utf8');
 assert.match(hud,/readPackageTiming\(input\.value\)/);
 assert.match(hud,/auto\.type = 'checkbox'/);
 assert.match(hud,/auto\.checked = true/);
 assert.match(hud,/receipt\?\.attackMs \?\? Number\(seconds\.value\) \* 1000/);
 assert.match(hud,/Timing receipt not found/);
 assert.match(hud,/aria-pressed/);
 assert.match(media,/"attackMs": round\(seconds \* 1000\)/);
 assert.match(media,/"files": \[/);
 assert.doesNotMatch(hud,/mon-cave-spider|chr-ftr-human|ani-forest-wolf|mon-dng-skeleton/);
});
