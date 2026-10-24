import {readFileSync,writeFileSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {UNDEAD_VARIANTS,renderUndead} from '../src/creature-rigs/undead-family.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
try{
 for(const role of UNDEAD_VARIANTS)for(const mode of ['still','idle','move','attack','rest']){
  const base=mode==='still'?`assets/studies/${role.source}.svg`:`assets/demos/${role.source}-${mode}.svg`;
  const output=mode==='still'?`assets/studies/${role.stem}.svg`:`assets/demos/${role.stem}-${mode}.svg`;
  const rendered=renderUndead(role,mode,readFileSync(resolve(root,base),'utf8'));
  if(process.argv.includes('--check')){
   if(readFileSync(resolve(root,output),'utf8')!==rendered)throw Error('Undead source drift: '+output);
  }else writeFileSync(resolve(root,output),rendered);
 }
 console.log('Undead variants use shared Ogre/Skeleton anatomy and original weapon anchors.');
}catch(error){console.error(error);process.exitCode=1;}
