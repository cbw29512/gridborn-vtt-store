/** Original female Orc Songweaver, realistic pear-bodied lute with attached plucking and fret hands. */
export const ORC_BARD_STATES=Object.freeze(['idle','move','attack','rest']);
const MOTIONS=Object.freeze({
 "idle": ".orc-bard-core{animation:orc-bard-sway 3.2s steps(1,end) infinite}.orc-bard-pluck-hand{transform-origin:147px 160px;animation:orc-bard-light-strum 3.2s steps(1,end) infinite}\n@keyframes orc-bard-sway{0%,85%,100%{transform:translate(0,0)}28%{transform:translate(-2px,-1px)}58%{transform:translate(2px,0)}}\n@keyframes orc-bard-light-strum{0%,85%,100%{transform:rotate(0)}26%{transform:rotate(9deg)}46%{transform:rotate(-6deg)}58%{transform:rotate(4deg)}}",
 "move": ".orc-bard-core{animation:orc-bard-walk 1.2s steps(1,end) infinite}.orc-bard-left-leg{transform-origin:113px 169px;animation:orc-bard-left-step 1.2s steps(1,end) infinite}.orc-bard-right-leg{transform-origin:149px 169px;animation:orc-bard-right-step 1.2s steps(1,end) infinite}\n@keyframes orc-bard-walk{0%,84%,100%{transform:translate(0,0)}29%{transform:translate(-4px,-2px)}59%{transform:translate(4px,-1px)}}\n@keyframes orc-bard-left-step{0%,84%,100%{transform:rotate(0)}29%{transform:rotate(-10deg)}59%{transform:rotate(12deg)}}\n@keyframes orc-bard-right-step{0%,84%,100%{transform:rotate(0)}29%{transform:rotate(12deg)}59%{transform:rotate(-11deg)}}",
 "attack": ".orc-bard-core{animation:orc-bard-brace 1.4s steps(1,end) 1 both}.orc-bard-pluck-hand{transform-origin:146px 160px;animation:orc-bard-chord-strike 1.4s steps(1,end) 1 both}.orc-bard-strings{animation:orc-bard-string-vibration 1.4s steps(1,end) 1 both}.orc-bard-chord{animation:orc-bard-soundwave-flight 1.4s linear 1 both}\n@keyframes orc-bard-brace{0%,100%{transform:translate(0,0)}22%{transform:translate(-2px,-2px)}52%{transform:translate(1px,-3px)}77%{transform:translate(0,0)}}\n@keyframes orc-bard-chord-strike{0%,100%{transform:rotate(0)}23%{transform:rotate(-16deg)}39%{transform:rotate(22deg)}51%{transform:rotate(-13deg)}65%{transform:rotate(5deg)}}\n@keyframes orc-bard-string-vibration{0%,100%{opacity:.9}25%{opacity:1}42%{opacity:.45}56%{opacity:1}67%{opacity:.6}}\n@keyframes orc-bard-soundwave-flight{0%,32%{opacity:0;transform:translate(0,0)}41%{opacity:.7;transform:translate(0,0)}54%{opacity:1;transform:translate(1px,-1px)}65%{opacity:1;transform:translate(5px,-3px)}74%,100%{opacity:0;transform:translate(5px,-3px)}}",
 "rest": ".orc-bard-core{animation:orc-bard-rest-bow 4s steps(1,end) infinite}.orc-bard-lute{transform-origin:152px 156px;animation:orc-bard-lute-lower 4s steps(1,end) infinite}.orc-bard-pluck-arm{animation:orc-bard-arm-relax 4s steps(1,end) infinite}\n@keyframes orc-bard-rest-bow{0%,85%,100%{transform:translateY(9px)}49%{transform:translateY(10px)}}\n@keyframes orc-bard-lute-lower{0%,85%,100%{transform:rotate(-8deg)}49%{transform:rotate(-9deg)}}\n@keyframes orc-bard-arm-relax{0%,85%,100%{transform:translateY(4px)}49%{transform:translateY(5px)}}"
});
const REDUCED='@media(prefers-reduced-motion:reduce){.orc-bard-core,.orc-bard-pluck-hand,.orc-bard-left-leg,.orc-bard-right-leg,.orc-bard-strings,.orc-bard-chord,.orc-bard-lute,.orc-bard-pluck-arm{animation:none!important}}';
export function renderOrcBard(mode,art){
 try{
  if(!ORC_BARD_STATES.includes(mode))throw new Error('Unsupported Orc Songweaver state: '+mode);
  if(typeof art!=='string'||!art.includes('data-instrument="large-pear-bellied-lute"')||
    !art.includes('data-instrument-action="plucking-hand"')||!art.includes('data-spell-effect="resonant-song"')||!art.endsWith('</svg>\n'))
   throw new Error('Orc Songweaver original source instrument/grip anchors changed');
  return art.replace('<svg xmlns=','<svg data-gridborn-mode="'+mode+'" xmlns=')
   .replace('</title>',' — '+mode+' state study</title>')
   .replace('</desc>','</desc>\n<style>\n'+MOTIONS[mode]+'\n'+REDUCED+'\n</style>');
 }catch(error){console.error('Orc Songweaver source generation failed',mode,error);throw error;}
}
