import {readFileSync,writeFileSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {renderCourtBard,COURT_BARD_STATES} from '../src/creature-rigs/court-bard.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
try{
 const source=readFileSync(resolve(root,'assets/studies/elf-court-nonbinary.svg'),'utf8');
 for(const mode of COURT_BARD_STATES){
  const output=renderCourtBard(mode,source),path=resolve(root,'assets/demos/elf-court-nonbinary-'+mode+'.svg');
  if(process.argv.includes('--check')){
   if(readFileSync(path,'utf8')!==output)throw Error('Elf court bard source drift: '+mode);
  }else writeFileSync(path,output);
 }
 console.log('Elf court bard original source states synchronized');
}catch(error){console.error('Elf Court Bard media generation failed',error);process.exitCode=1;}
