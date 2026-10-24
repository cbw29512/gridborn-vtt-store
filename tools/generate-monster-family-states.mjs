import {readFileSync,writeFileSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {MONSTER_VARIANTS,renderVariant} from '../src/creature-rigs/monster-family-overlays.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
try{
 for(const r of MONSTER_VARIANTS)for(const mode of ['still','idle','move','attack','rest']){
  const input=resolve(root,mode==='still'?`assets/studies/${r.base}.svg`:`assets/demos/${r.base}-${mode}.svg`);
  const output=resolve(root,mode==='still'?`assets/studies/${r.stem}.svg`:`assets/demos/${r.stem}-${mode}.svg`);
  const actual=renderVariant(r,mode,readFileSync(input,'utf8'));
  if(process.argv.includes('--check')){
   if(readFileSync(output,'utf8')!==actual)throw Error('Source drift: '+output);
  }else writeFileSync(output,actual);
 }
 console.log('Reused original Ogre and Goblin motion sources in two new visible variants.');
}catch(e){console.error(e);process.exitCode=1;}
