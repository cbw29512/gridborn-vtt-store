import {readFileSync,writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {resolve,dirname} from 'node:path';
import {WOLF_MODES,renderWolf} from '../src/creature-rigs/wolf.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const outputs=Object.freeze({
  still:'assets/studies/gray-wolf.svg',
  idle:'assets/demos/gray-wolf-idle.svg',
  move:'assets/demos/gray-wolf-move.svg',
  attack:'assets/demos/gray-wolf-attack.svg',
  rest:'assets/demos/gray-wolf-rest.svg'
});
const check=process.argv.includes('--check');
for(const mode of WOLF_MODES){
 const path=resolve(root,outputs[mode]);const content=renderWolf(mode);
 if(check){if(readFileSync(path,'utf8')!==content)throw new Error('Regenerate Wolf: '+path);}
 else writeFileSync(path,content,'utf8');
}
console.log(check?'Wolf studies synchronized':'Wolf studies generated');
