import {writeFileSync,readFileSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {dragonArtwork,DRAGON_MODES} from '../src/creature-rigs/dragon.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const colors=['Red','Green','Gold'];
try{
 for(const species of colors)for(const mode of DRAGON_MODES){
  const stem='dragon-young-'+species.toLowerCase();
  const path=resolve(root,mode==='still'?'assets/studies/'+stem+'.svg':
   'assets/demos/'+stem+'-'+mode+'.svg');
  const result=dragonArtwork(species,'young',mode);
  if(process.argv.includes('--check')){
   if(readFileSync(path,'utf8')!==result)throw Error('Shared dragon source drift: '+path);
  }else writeFileSync(path,result);
 }
 console.log('Three original dragon variations generated from one anatomy foundation');
}catch(error){console.error('Dragon family source render failed',error);process.exitCode=1;}
