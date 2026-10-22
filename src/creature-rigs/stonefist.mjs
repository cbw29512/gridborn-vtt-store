/** Original female Orc Stonefist: anatomy-first unarmed strike, not recolored Wayfarer. */
export const STONEFIST_STATES=Object.freeze(['idle','move','attack','rest']);
const MOTIONS=Object.freeze({
 "idle": ".stone-core{animation:stone-ground-breath 3.2s steps(1,end) infinite}.stone-left-guard{transform-origin:101px 135px;animation:stone-watch-guard 3.2s steps(1,end) infinite}\n@keyframes stone-ground-breath{0%,85%,100%{transform:translate(0,0)}30%{transform:translateY(-2px)}57%{transform:translateY(1px)}}\n@keyframes stone-watch-guard{0%,85%,100%{transform:rotate(0)}30%{transform:rotate(-3deg)}57%{transform:rotate(2deg)}}",
 "move": ".stone-core{animation:stone-side-step 1.2s steps(1,end) infinite}.stone-left-leg{transform-origin:116px 164px;animation:stone-left-step 1.2s steps(1,end) infinite}.stone-right-leg{transform-origin:148px 165px;animation:stone-right-step 1.2s steps(1,end) infinite}\n@keyframes stone-side-step{0%,84%,100%{transform:translate(0,0)}25%{transform:translate(-4px,-2px)}58%{transform:translate(4px,-1px)}}\n@keyframes stone-left-step{0%,84%,100%{transform:rotate(0)}25%{transform:rotate(-10deg)}58%{transform:rotate(10deg)}}\n@keyframes stone-right-step{0%,84%,100%{transform:rotate(0)}25%{transform:rotate(10deg)}58%{transform:rotate(-10deg)}}",
 "attack": ".stone-core{animation:stone-stance-drive 1.4s steps(1,end) 1 both}.stone-right-guard{animation:stone-guard-away 1.4s steps(1,end) 1 both}.stone-hammer-arm{transform-origin:157px 132px;animation:stone-raised-hammer 1.4s steps(1,end) 1 both}.stone-recoil-arm{animation:stone-return-arm 1.4s steps(1,end) 1 both}.stone-impact{animation:stone-ground-hit 1.4s steps(1,end) 1 both}\n@keyframes stone-stance-drive{0%,100%{transform:translate(0,0)}25%{transform:translate(-3px,-2px)}47%{transform:translate(2px,1px)}68%{transform:translate(0,-1px)}85%{transform:translate(0,0)}}\n@keyframes stone-guard-away{0%,19%,80%,100%{opacity:1}23%,74%{opacity:0}}\n@keyframes stone-raised-hammer{0%,18%,75%,100%{opacity:0;transform:rotate(0)}23%{opacity:1;transform:rotate(-9deg)}39%{opacity:1;transform:rotate(-18deg)}50%,60%{opacity:1;transform:rotate(53deg)}71%{opacity:1;transform:rotate(12deg)}}\n@keyframes stone-return-arm{0%,69%,82%,100%{opacity:0}73%,79%{opacity:1}}\n@keyframes stone-ground-hit{0%,46%,68%,100%{opacity:0;transform:translateY(0)}52%,59%{opacity:1;transform:translateY(-3px)}65%{opacity:.5;transform:translateY(-4px)}}",
 "rest": ".stone-core{animation:stone-rest-stance 4s steps(1,end) infinite}.stone-left-guard{animation:stone-unwind-left 4s steps(1,end) infinite}.stone-right-guard{animation:stone-unwind-right 4s steps(1,end) infinite}\n@keyframes stone-rest-stance{0%,85%,100%{transform:translateY(10px)}52%{transform:translateY(11px)}}\n@keyframes stone-unwind-left{0%,85%,100%{transform:translateY(12px)}52%{transform:translateY(13px)}}\n@keyframes stone-unwind-right{0%,85%,100%{transform:translateY(9px)}52%{transform:translateY(11px)}}"
});
const REDUCED='@media(prefers-reduced-motion:reduce){.stone-core,.stone-left-guard,.stone-right-guard,.stone-left-leg,.stone-right-leg,.stone-hammer-arm,.stone-recoil-arm,.stone-impact{animation:none!important}}';
export function renderStonefist(mode,art){
 try{
  if(!STONEFIST_STATES.includes(mode))throw new Error('Unsupported Stonefist mode: '+mode);
  if(typeof art!=='string'||!art.includes('data-attack-pose="hammerfist"')||
    !art.includes('data-attack-pose="recoil"')||!art.includes('data-effect="hammer-dust"')||!art.endsWith('</svg>\n'))
   throw new Error('Stonefist anatomy/source art anchors missing');
  return art.replace('<svg xmlns=','<svg data-gridborn-mode="'+mode+'" xmlns=')
   .replace('</title>',' — '+mode+' state study</title>')
   .replace('</desc>','</desc>\n<style>\n'+MOTIONS[mode]+'\n'+REDUCED+'\n</style>');
 }catch(error){console.error('Stonefist source-render failed',mode,error);throw error;}
}
