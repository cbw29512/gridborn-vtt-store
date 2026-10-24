import {readFileSync,writeFileSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {renderDireWolf,DIRE_WOLF_MODES} from '../src/creature-rigs/dire-wolf.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
try{
 for(const mode of DIRE_WOLF_MODES){
  const original=resolve(root,mode==='still'?'assets/studies/gray-wolf.svg':'assets/demos/gray-wolf-'+mode+'.svg');
  const target=resolve(root,mode==='still'?'assets/studies/dire-wolf.svg':'assets/demos/dire-wolf-'+mode+'.svg');
  const output=renderDireWolf(mode,readFileSync(original,'utf8'));
  if(process.argv.includes('--check')){
   if(readFileSync(target,'utf8')!==output)throw Error('Dire Wolf source drift: '+mode);
  }else writeFileSync(target,output);
 }
 console.log('Dire Wolf inherits all Gray Wolf skeleton / locomotion states');
}catch(e){console.error('Dire Wolf regeneration failed',e);process.exitCode=1;}
