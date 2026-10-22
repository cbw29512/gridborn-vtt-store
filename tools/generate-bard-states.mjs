import {readFileSync,writeFileSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {renderBard,BARD_STATES} from '../src/creature-rigs/bard.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
try{
 const source=readFileSync(resolve(root,'assets/studies/halfling-bard.svg'),'utf8');
 for(const mode of BARD_STATES){
  const output=renderBard(mode,source),path=resolve(root,'assets/demos/halfling-bard-'+mode+'.svg');
  if(process.argv.includes('--check')){
   if(readFileSync(path,'utf8')!==output)throw new Error('Bard generated state drift: '+mode);
  }else writeFileSync(path,output);
 }
 console.log('Halfling Bard states synchronized');
}catch(error){console.error('Failed to generate Bard state studies',error);process.exitCode=1;}
