import {readFileSync,writeFileSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {renderGoblinRanger,GOBLIN_RANGER_STATES} from '../src/creature-rigs/goblin-ranger.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
try{
 const art=readFileSync(resolve(root,'assets/studies/goblin-pathfinder-nonbinary.svg'),'utf8');
 for(const mode of GOBLIN_RANGER_STATES){
  const output=renderGoblinRanger(mode,art),path=resolve(root,'assets/demos/goblin-pathfinder-nonbinary-'+mode+'.svg');
  if(process.argv.includes('--check')){
   if(readFileSync(path,'utf8')!==output)throw Error('Goblin Pathfinder state drift: '+mode);
  }else writeFileSync(path,output);
 }
 console.log('Goblin Pathfinder original states are source-synchronized');
}catch(error){console.error('Goblin Pathfinder state generation failed',error);process.exitCode=1;}
