/** Original small Halfling Bard performing with a genuinely fretted/plucked lute. */
export const BARD_STATES=Object.freeze(['idle','move','attack','rest']);
const MOTIONS=Object.freeze({
 "idle": ".bard-core{animation:bard-sway 3.2s steps(1,end) infinite}.bard-pluck-hand{transform-origin:148px 149px;animation:bard-pick 3.2s steps(1,end) infinite}\n@keyframes bard-sway{0%,85%,100%{transform:translate(0,0)}24%{transform:translate(-2px,-1px)}57%{transform:translate(2px,0)}}\n@keyframes bard-pick{0%,85%,100%{transform:rotate(0)}24%{transform:rotate(8deg)}40%{transform:rotate(-8deg)}57%{transform:rotate(5deg)}}",
 "move": ".bard-core{animation:bard-march 1.2s steps(1,end) infinite}.bard-left-leg{transform-origin:110px 167px;animation:bard-left-step 1.2s steps(1,end) infinite}.bard-right-leg{transform-origin:142px 168px;animation:bard-right-step 1.2s steps(1,end) infinite}\n@keyframes bard-march{0%,84%,100%{transform:translate(0,0)}29%{transform:translate(-3px,-2px)}58%{transform:translate(4px,-1px)}}\n@keyframes bard-left-step{0%,84%,100%{transform:rotate(0)}29%{transform:rotate(-13deg)}58%{transform:rotate(12deg)}}\n@keyframes bard-right-step{0%,84%,100%{transform:rotate(0)}29%{transform:rotate(13deg)}58%{transform:rotate(-13deg)}}",
 "attack": ".bard-core{animation:bard-chord-brace 1.4s steps(1,end) 1 both}.bard-pluck-hand{transform-origin:145px 149px;animation:bard-chord-pluck 1.4s steps(1,end) 1 both}.bard-strings{animation:bard-chord-strings 1.4s steps(1,end) 1 both}.bard-spell{animation:bard-resonant-cast 1.4s linear 1 both}\n@keyframes bard-chord-brace{0%,100%{transform:translate(0,0)}27%{transform:translate(-2px,-2px)}51%{transform:translate(0,-3px)}75%{transform:translate(1px,0)}}\n@keyframes bard-chord-pluck{0%,100%{transform:rotate(0)}23%{transform:rotate(-16deg)}42%{transform:rotate(20deg)}61%{transform:rotate(-7deg)}}\n@keyframes bard-chord-strings{0%,100%{opacity:.88}30%{opacity:1}46%{opacity:.52}54%{opacity:1}62%{opacity:.6}}\n@keyframes bard-resonant-cast{0%,27%{opacity:0;transform:translate(0,0)}37%{opacity:.8;transform:translate(0,0)}49%{opacity:1;transform:translate(6px,-3px)}61%{opacity:1;transform:translate(14px,-5px)}74%,100%{opacity:0;transform:translate(14px,-5px)}}",
 "rest": ".bard-core{animation:bard-seated-rest 4s steps(1,end) infinite}.bard-lute{transform-origin:147px 151px;animation:bard-lute-down 4s steps(1,end) infinite}.bard-pluck-hand{animation:bard-rest-hand 4s steps(1,end) infinite}\n@keyframes bard-seated-rest{0%,85%,100%{transform:translateY(8px)}43%{transform:translateY(10px)}}\n@keyframes bard-lute-down{0%,85%,100%{transform:rotate(11deg) translateY(5px)}43%{transform:rotate(13deg) translateY(5px)}}\n@keyframes bard-rest-hand{0%,85%,100%{transform:translateY(6px)}43%{transform:translateY(7px)}}"
});
const REDUCED='@media(prefers-reduced-motion:reduce){.bard-core,.bard-pluck-hand,.bard-left-leg,.bard-right-leg,.bard-lute,.bard-strings,.bard-spell{animation:none!important}}';
export function renderBard(mode,art){
 try {
  if(!BARD_STATES.includes(mode))throw new Error('Unsupported Bard state: '+mode);
  if(typeof art!=='string'||!art.includes('data-weapon="six-course-lute"')||
     !art.includes('data-spell-effect="resonant-chord"')||!art.endsWith('</svg>\n'))
   throw new Error('Bard source art/instrument rig changed');
  return art.replace('<svg xmlns=','<svg data-gridborn-mode="'+mode+'" xmlns=')
   .replace('</title>',' — '+mode+' motion study</title>')
   .replace('</desc>','</desc>\n<style>\n'+MOTIONS[mode]+'\n'+REDUCED+'\n</style>');
 }catch(error){console.error('Gridborn Bard source rendering failed:',mode,error);throw error;}
}
