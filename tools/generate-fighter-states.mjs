import {readFileSync,writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname,resolve} from 'node:path';
import {FIGHTER_GENERATED_STATES,renderFighterState} from '../src/creature-rigs/fighter-states.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const source=readFileSync(resolve(root,'assets/demos/human-fighter-idle.svg'),'utf8');
const check=process.argv.includes('--check');
for(const mode of FIGHTER_GENERATED_STATES){
 const path=resolve(root,'assets/demos/human-fighter-'+mode+'.svg');
 const svg=renderFighterState(source,mode);
 if(check){
  if(readFileSync(path,'utf8')!==svg)throw new Error('Fighter art has drifted: '+path);
 }else writeFileSync(path,svg,'utf8');
}
console.log(check?'Fighter states in sync':'Fighter states written');
