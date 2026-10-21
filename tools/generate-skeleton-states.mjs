import {readFileSync,writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {resolve,dirname} from 'node:path';
import {SKELETON_STATES,renderSkeleton} from '../src/creature-rigs/skeleton.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const source=readFileSync(resolve(root,'assets/studies/skeleton-warrior.svg'),'utf8');
const check=process.argv.includes('--check');
for(const state of SKELETON_STATES){
 const path=resolve(root,'assets/demos/skeleton-warrior-'+state+'.svg');
 const result=renderSkeleton(state,source);
 if(check){
   if(readFileSync(path,'utf8')!==result)throw Error('Skeleton state drift: '+path);
 }else writeFileSync(path,result,'utf8');
}
console.log(check?'Skeleton state sources synchronized':'Skeleton motion files generated');
