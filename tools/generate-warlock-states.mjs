import {readFileSync,writeFileSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {renderWarlock,WARLOCK_STATES} from '../src/creature-rigs/warlock.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
try{
 const art=readFileSync(resolve(root,'assets/studies/dwarf-hexwarden-warlock.svg'),'utf8');
 for(const mode of WARLOCK_STATES){
  const output=renderWarlock(mode,art),path=resolve(root,'assets/demos/dwarf-hexwarden-warlock-'+mode+'.svg');
  if(process.argv.includes('--check')){
   if(readFileSync(path,'utf8')!==output)throw new Error('Hexwarden export source drift: '+mode);
  }else writeFileSync(path,output);
 }
 console.log('Hexwarden states source-synchronized');
}catch(error){console.error('Hexwarden state generation failed',error);process.exitCode=1;}
