import {readFileSync,writeFileSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {renderOrcRanger,ORC_RANGER_STATES} from '../src/creature-rigs/orc-ranger.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
try{
 const art=readFileSync(resolve(root,'assets/studies/orc-pathfinder-female.svg'),'utf8');
 for(const mode of ORC_RANGER_STATES){
  const output=renderOrcRanger(mode,art),path=resolve(root,'assets/demos/orc-pathfinder-female-'+mode+'.svg');
  if(process.argv.includes('--check')){
   if(readFileSync(path,'utf8')!==output)throw new Error('Orc Pathfinder source drift: '+mode);
  }else writeFileSync(path,output);
 }
 console.log('Orc Pathfinder original four states match source');
}catch(error){console.error('Orc Pathfinder source generation failed',error);process.exitCode=1;}
