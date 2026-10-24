import {readFileSync,writeFileSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {buildHumanFarmerSource,renderHumanFarmer,HUMAN_FARMER_STATES} from '../src/creature-rigs/human-farmer.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
try{
 const original=readFileSync(resolve(root,'assets/studies/village-innkeeper.svg'),'utf8');
 const still=buildHumanFarmerSource(original);
 const data=[['assets/studies/human-farmer.svg',still],
  ...HUMAN_FARMER_STATES.map(mode=>['assets/demos/human-farmer-'+mode+'.svg',
    renderHumanFarmer(mode,still)])];
 for(const [path,content] of data){
  const target=resolve(root,path);
  if(process.argv.includes('--check')){
    if(readFileSync(target,'utf8')!==content)throw Error('Human Farmer shared-body drift: '+path);
  }else writeFileSync(target,content);
 }
 console.log('Human Farmer now inherits the approved Innkeeper human anatomy, with separate profession overlays.');
}catch(e){console.error('Human Farmer source generation failed',e);process.exitCode=1;}
