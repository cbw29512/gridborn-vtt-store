import {readFileSync,writeFileSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {renderRanger,RANGER_STATES} from '../src/creature-rigs/ranger.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
try{
 const art=readFileSync(resolve(root,'assets/studies/elven-ranger.svg'),'utf8');
 for(const mode of RANGER_STATES){
  const output=renderRanger(mode,art),path=resolve(root,'assets/demos/elven-ranger-'+mode+'.svg');
  if(process.argv.includes('--check')){
   if(readFileSync(path,'utf8')!==output)throw new Error('Ranger export drift '+mode);
  }else writeFileSync(path,output);
 }
 console.log('Elven Ranger exports source-synchronized');
}catch(error){console.error('Ranger state generation failed',error);process.exitCode=1;}
