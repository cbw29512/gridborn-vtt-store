import {readFileSync,writeFileSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {renderDruid,DRUID_STATES} from '../src/creature-rigs/druid.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
try{
 const source=readFileSync(resolve(root,'assets/studies/human-wildspeaker-druid.svg'),'utf8');
 for(const mode of DRUID_STATES){
  const output=renderDruid(mode,source),path=resolve(root,'assets/demos/human-wildspeaker-druid-'+mode+'.svg');
  if(process.argv.includes('--check')){
   if(readFileSync(path,'utf8')!==output)throw Error('Wildspeaker output drift: '+mode);
  }else writeFileSync(path,output);
 }
 console.log('Wildspeaker original states synchronized');
}catch(error){console.error('Wildspeaker source export failed',error);process.exitCode=1;}
