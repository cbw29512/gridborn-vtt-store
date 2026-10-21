import {readFileSync,writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname,resolve} from 'node:path';
import {SPIDER_MODES,renderSpider} from '../src/creature-rigs/spider.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const files=Object.freeze({
 still:'assets/studies/giant-cave-spider.svg',
 idle:'assets/demos/giant-cave-spider-idle.svg',
 move:'assets/demos/giant-cave-spider-move.svg',
 attack:'assets/demos/giant-cave-spider-attack.svg',
 rest:'assets/demos/giant-cave-spider-rest.svg'
});
for(const mode of SPIDER_MODES){
 const path=resolve(root,files[mode]),svg=renderSpider(mode);
 if(process.argv.includes('--check')){
  if(readFileSync(path,'utf8')!==svg)throw new Error('Spider source has drifted: '+path);
 }else writeFileSync(path,svg,'utf8');
}
console.log(process.argv.includes('--check')?'Spider previews in sync':'Spider previews written');
