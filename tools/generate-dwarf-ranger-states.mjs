import {readFileSync,writeFileSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {renderDwarfRanger,DWARF_RANGER_STATES} from '../src/creature-rigs/dwarf-ranger.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
try{
 const src=readFileSync(resolve(root,'assets/studies/dwarf-pathfinder-male.svg'),'utf8');
 for(const state of DWARF_RANGER_STATES){
  const output=renderDwarfRanger(state,src),dest=resolve(root,'assets/demos/dwarf-pathfinder-male-'+state+'.svg');
  if(process.argv.includes('--check')){
   if(readFileSync(dest,'utf8')!==output)throw Error('Dwarf Ranger source/export drift '+state);
  }else writeFileSync(dest,output);
 }
 console.log('Dwarf Pathfinder states match canonical source');
}catch(error){console.error('Dwarf Pathfinder export failed',error);process.exitCode=1;}
