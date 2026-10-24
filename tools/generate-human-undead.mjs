import {readFileSync,writeFileSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {HUMAN_UNDEAD,deriveHumanUndead,renderHumanUndead} from '../src/creature-rigs/human-undead.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
try{
 const foundation=readFileSync(resolve(root,'assets/studies/village-innkeeper.svg'),'utf8');
 for(const role of HUMAN_UNDEAD){
  const art=deriveHumanUndead(foundation,role);
  for(const mode of ['still','idle','move','attack','rest']){
   const file=resolve(root,mode==='still'?`assets/studies/${role.stem}.svg`:`assets/demos/${role.stem}-${mode}.svg`);
   const value=mode==='still'?art:renderHumanUndead(mode,art,role);
   if(process.argv.includes('--check')){
    if(readFileSync(file,'utf8')!==value)throw Error('Human Undead source drift: '+file);
   }else writeFileSync(file,value);
  }
 }
 console.log('Two Human-based SRD undead roles inherit one Human limb skeleton.');
}catch(e){console.error(e);process.exitCode=1;}
