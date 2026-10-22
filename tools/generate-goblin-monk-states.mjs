import {readFileSync,writeFileSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {renderGoblinMonk,GOBLIN_MONK_STATES} from '../src/creature-rigs/goblin-monk.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
try{
 const src=readFileSync(resolve(root,'assets/studies/goblin-stonefist-nonbinary.svg'),'utf8');
 for(const mode of GOBLIN_MONK_STATES){
  const out=renderGoblinMonk(mode,src),p=resolve(root,'assets/demos/goblin-stonefist-nonbinary-'+mode+'.svg');
  if(process.argv.includes('--check')){
   if(readFileSync(p,'utf8')!==out)throw new Error('Goblin Monk source drift: '+mode);
  }else writeFileSync(p,out);
 }
 console.log('Goblin Monk source exports match');
}catch(error){console.error('Goblin Monk source generation failed',error);process.exitCode=1;}
