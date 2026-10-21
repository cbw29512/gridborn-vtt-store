import {readFileSync,writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname,resolve} from 'node:path';
import {GOBLIN_STATES,renderGoblinState} from '../src/creature-rigs/goblin-states.mjs';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const input=resolve(root,'assets/demos/cave-goblin-loop.svg');
const source=readFileSync(input,'utf8');
const check=process.argv.includes('--check');
for(const mode of GOBLIN_STATES){
 const output=resolve(root,'assets/demos/cave-goblin-'+mode+'.svg');
 const rendered=renderGoblinState(source,mode);
 if(check){
  if(readFileSync(output,'utf8')!==rendered)
   throw new Error('Goblin generated state has drifted: '+output);
 }else writeFileSync(output,rendered,'utf8');
}
console.log(check?'Goblin states in sync':'Goblin state studies written');
