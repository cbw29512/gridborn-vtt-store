import {readFileSync,writeFileSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {renderMonk,MONK_STATES} from '../src/creature-rigs/monk.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
try{
 const art=readFileSync(resolve(root,'assets/studies/human-wayfarer-monk.svg'),'utf8');
 for(const mode of MONK_STATES){
  const output=renderMonk(mode,art),path=resolve(root,'assets/demos/human-wayfarer-monk-'+mode+'.svg');
  if(process.argv.includes('--check')){
   if(readFileSync(path,'utf8')!==output)throw new Error('Wayfarer animation source drift: '+mode);
  }else writeFileSync(path,output);
 }
 console.log('Wayfarer Monk source states synchronized');
}catch(error){console.error('Wayfarer source generation failed',error);process.exitCode=1;}
