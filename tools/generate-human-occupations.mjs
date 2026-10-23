import {readFileSync,writeFileSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {HUMAN_ROLE_SPECS,buildHumanOccupation,renderHumanOccupation} from '../src/creature-rigs/human-occupations.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
try{
 const base=readFileSync(resolve(root,'assets/studies/village-innkeeper.svg'),'utf8');
 const output=Object.values(HUMAN_ROLE_SPECS).flatMap(role=>{
  const art=buildHumanOccupation(base,role,'human-body');
  return [[`assets/studies/${role.stem}.svg`,art],
   ...['idle','move','attack','rest'].map(mode=>[
    `assets/demos/${role.stem}-${mode}.svg`,renderHumanOccupation(mode,art,role)])];
 });
 for(const [path,content] of output){
  const full=resolve(root,path);
  if(process.argv.includes('--check')){
   if(readFileSync(full,'utf8')!==content)throw Error('Human role art source drift: '+path);
  }else writeFileSync(full,content);
 }
 console.log('Shared Human NPC anatomy: '+Object.keys(HUMAN_ROLE_SPECS).length+' roles, '+output.length+' canonical art assets.');
}catch(e){console.error('Human role generation failed',e);process.exitCode=1;}
