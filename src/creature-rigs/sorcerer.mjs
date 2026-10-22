/** Original Elf Sparkweaver Sorcerer, spells originate in the palm rather than staff rotation. */
export const SORCERER_STATES=Object.freeze(['idle','move','attack','rest']);
const MOTIONS=Object.freeze({
 "idle": ".spark-core{animation:spark-breath 3.2s steps(1,end) infinite}.spark-focus{animation:spark-focus-pulse 3.2s steps(1,end) infinite}\n@keyframes spark-breath{0%,85%,100%{transform:translate(0,0)}28%{transform:translateY(-2px)}56%{transform:translateY(1px)}}\n@keyframes spark-focus-pulse{0%,85%,100%{opacity:1}28%{opacity:.8}56%{opacity:1}}",
 "move": ".spark-core{animation:spark-walk 1.2s steps(1,end) infinite}.spark-left-leg{transform-origin:113px 171px;animation:spark-left-step 1.2s steps(1,end) infinite}.spark-right-leg{transform-origin:147px 171px;animation:spark-right-step 1.2s steps(1,end) infinite}\n@keyframes spark-walk{0%,84%,100%{transform:translate(0,0)}32%{transform:translate(-4px,-3px)}64%{transform:translate(4px,-1px)}}\n@keyframes spark-left-step{0%,84%,100%{transform:rotate(0)}32%{transform:rotate(-13deg)}64%{transform:rotate(14deg)}}\n@keyframes spark-right-step{0%,84%,100%{transform:rotate(0)}32%{transform:rotate(14deg)}64%{transform:rotate(-13deg)}}",
 "attack": ".spark-core{animation:spark-stance 1.4s steps(1,end) 1 both}.spark-casting-arm{transform-origin:156px 121px;animation:spark-cast-gesture 1.4s steps(1,end) 1 both}.spark-charge{animation:spark-gather 1.4s steps(1,end) 1 both}.spark-bolt{animation:spark-release 1.4s linear 1 both}\n@keyframes spark-stance{0%,100%{transform:translate(0,0)}23%{transform:translate(-3px,0)}54%{transform:translate(0,-2px)}77%{transform:translate(1px,0)}}\n@keyframes spark-cast-gesture{0%,100%{transform:rotate(0)}22%{transform:rotate(-11deg)}42%{transform:rotate(9deg)}65%{transform:rotate(-2deg)}}\n@keyframes spark-gather{0%,20%,53%,100%{opacity:0}27%{opacity:.6}38%,47%{opacity:1}}\n@keyframes spark-release{0%,48%{opacity:0;transform:translate(0,0)}54%{opacity:1;transform:translate(0,0)}65%{opacity:1;transform:translate(4px,-2px)}74%,100%{opacity:0;transform:translate(5px,-3px)}}",
 "rest": ".spark-core{animation:spark-rest 4s steps(1,end) infinite}.spark-staff{transform-origin:70px 131px;animation:spark-staff-lower 4s steps(1,end) infinite}.spark-focus{animation:spark-focus-settle 4s steps(1,end) infinite}\n@keyframes spark-rest{0%,85%,100%{transform:translateY(8px)}50%{transform:translateY(9px)}}\n@keyframes spark-staff-lower{0%,85%,100%{transform:rotate(-8deg)}50%{transform:rotate(-9deg)}}\n@keyframes spark-focus-settle{0%,85%,100%{opacity:.8}50%{opacity:.7}}"
});
const REDUCED='@media(prefers-reduced-motion:reduce){.spark-core,.spark-focus,.spark-left-leg,.spark-right-leg,.spark-casting-arm,.spark-charge,.spark-bolt,.spark-staff{animation:none!important}}';
export function renderSorcerer(mode,art){
 try{
  if(!SORCERER_STATES.includes(mode))throw new Error('Unsupported Sparkweaver mode: '+mode);
  if(typeof art!=='string'||!art.includes('data-focus="hand-crystal"')||
    !art.includes('data-spell-phase="gather"')||!art.includes('data-spell-phase="release"')||!art.endsWith('</svg>\n'))
    throw new Error('Sparkweaver source art/focus anchors changed');
  return art.replace('<svg xmlns=','<svg data-gridborn-mode="'+mode+'" xmlns=')
   .replace('</title>',' — '+mode+' animation study</title>')
   .replace('</desc>','</desc>\n<style>\n'+MOTIONS[mode]+'\n'+REDUCED+'\n</style>');
 }catch(error){console.error('Sparkweaver source output failed',mode,error);throw error;}
}
