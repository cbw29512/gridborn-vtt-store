import {readFileSync,writeFileSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {renderOrcBard,ORC_BARD_STATES} from '../src/creature-rigs/orc-bard.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
try{
 const art=readFileSync(resolve(root,'assets/studies/orc-songweaver-female.svg'),'utf8');
 for(const mode of ORC_BARD_STATES){
  const output=renderOrcBard(mode,art),path=resolve(root,'assets/demos/orc-songweaver-female-'+mode+'.svg');
  if(process.argv.includes('--check')){
   if(readFileSync(path,'utf8')!==output)throw Error('Orc Songweaver source drift: '+mode);
  }else writeFileSync(path,output);
 }
 console.log('Orc Songweaver source states synchronized');
}catch(error){console.error('Orc Songweaver source generation failed',error);process.exitCode=1;}
