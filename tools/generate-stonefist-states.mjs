import {readFileSync,writeFileSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {renderStonefist,STONEFIST_STATES} from '../src/creature-rigs/stonefist.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
try{
 const source=readFileSync(resolve(root,'assets/studies/orc-stonefist-female.svg'),'utf8');
 for(const mode of STONEFIST_STATES){
  const output=renderStonefist(mode,source),path=resolve(root,'assets/demos/orc-stonefist-female-'+mode+'.svg');
  if(process.argv.includes('--check')){
   if(readFileSync(path,'utf8')!==output)throw new Error('Stonefist source export mismatch: '+mode);
  }else writeFileSync(path,output);
 }
 console.log('Stonefist source-linked states verified');
}catch(error){console.error('Stonefist state render failed',error);process.exitCode=1;}
