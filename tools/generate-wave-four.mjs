import {readFileSync,writeFileSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {renderWaveFour,WAVE_FOUR_STATES} from '../src/creature-rigs/wave-four.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const entries=[['paladin','human-paladin'],['gnome','gnome-rogue'],
 ['lizardfolk','swamp-lizardfolk'],['shark','great-white-shark']];
const check=process.argv.includes('--check');
for(const [kind,stem] of entries){
 const original=readFileSync(resolve(root,'assets/studies',stem+'.svg'),'utf8');
 for(const state of WAVE_FOUR_STATES){
  const output=renderWaveFour(kind,state,original);
  const path=resolve(root,'assets/demos',stem+'-'+state+'.svg');
  if(check){
   if(readFileSync(path,'utf8')!==output)throw Error('Motion art drift: '+stem+' '+state);
  }else writeFileSync(path,output);
 }
}
console.log(check?'Four artwork sources match 16 original motion studies':'Generated 16 state studies');
