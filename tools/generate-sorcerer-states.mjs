import {readFileSync,writeFileSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {renderSorcerer,SORCERER_STATES} from '../src/creature-rigs/sorcerer.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
try{
 const art=readFileSync(resolve(root,'assets/studies/elf-sparkweaver-sorcerer.svg'),'utf8');
 for(const mode of SORCERER_STATES){
  const output=renderSorcerer(mode,art),path=resolve(root,'assets/demos/elf-sparkweaver-sorcerer-'+mode+'.svg');
  if(process.argv.includes('--check')){
   if(readFileSync(path,'utf8')!==output)throw new Error('Sparkweaver source drift: '+mode);
  }else writeFileSync(path,output);
 }
 console.log('Sparkweaver animation sources match');
}catch(error){console.error('Sparkweaver state generation failed',error);process.exitCode=1;}
