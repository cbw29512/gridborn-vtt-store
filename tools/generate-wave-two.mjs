import {readFileSync,writeFileSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {renderWave,WAVE_STATES} from '../src/creature-rigs/wave-two.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const definitions=[
 {kind:'wizard',source:'elven-wizard.svg',prefix:'elven-wizard'},
 {kind:'vanguard',source:'orc-axe-vanguard-pregen.svg',prefix:'orc-axe-vanguard-pregen'},
 {kind:'armor',source:'animated-armor.svg',prefix:'animated-armor'}
];
const check=process.argv.includes('--check');
for(const {kind,source,prefix} of definitions){
 const art=readFileSync(resolve(root,'assets/studies',source),'utf8');
 for(const mode of WAVE_STATES){
  const result=renderWave(kind,mode,art);
  const path=resolve(root,'assets/demos',prefix+'-'+mode+'.svg');
  if(check){
   if(readFileSync(path,'utf8')!==result)throw Error('Motion source drift: '+prefix+' '+mode);
  }else writeFileSync(path,result,'utf8');
 }
}
console.log(check?'Three character/monster animation rigs synchronized':'Three motion sets generated');
