import {readFileSync,writeFileSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {INNKEEPER_STATES,renderVillageInnkeeper} from '../src/creature-rigs/innkeeper.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
try{
 const art=readFileSync(resolve(root,'assets/studies/village-innkeeper.svg'),'utf8');
 for(const mode of INNKEEPER_STATES){
  const path=resolve(root,'assets/demos/village-innkeeper-'+mode+'.svg');
  const output=renderVillageInnkeeper(mode,art);
  if(process.argv.includes('--check')){
   if(readFileSync(path,'utf8')!==output)throw Error('Innkeeper source drift: '+mode);
  }else writeFileSync(path,output);
 }
 console.log('Village Innkeeper states synchronized');
}catch(error){console.error('Village Innkeeper animation generation failed',error);process.exitCode=1;}
