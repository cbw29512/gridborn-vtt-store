import {readFileSync,writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {resolve,dirname} from 'node:path';
import {renderWaveThree,WAVE_THREE_STATES} from '../src/creature-rigs/wave-three.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const inputs=[['dwarf','dwarven-cleric'],['mercy','human-mercywarden-female'],
 ['shadow','human-shadowstep-nonbinary'],['ogre','cave-ogre']];
const check=process.argv.includes('--check');
for(const [kind,stem] of inputs){
 const source=readFileSync(resolve(root,'assets/studies',stem+'.svg'),'utf8');
 for(const state of WAVE_THREE_STATES){
  const content=renderWaveThree(kind,state,source);
  const file=resolve(root,'assets/demos',stem+'-'+state+'.svg');
  if(check){
   if(readFileSync(file,'utf8')!==content)throw Error('Wave Three art drift: '+stem+' '+state);
  }else writeFileSync(file,content,'utf8');
 }
}
console.log(check?'Four distinct motion rigs synchronized':'Four new full-motion rigs generated');
