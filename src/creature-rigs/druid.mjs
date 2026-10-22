/** Source-backed original Human Wildspeaker Druid, distinct from arcane casters.
 * No source-name dispatch: one immutable character rig, four authored states.
 */
export const DRUID_STATES=Object.freeze(['idle','move','attack','rest']);
const MOTIONS=Object.freeze({
 "idle": ".druid-core{animation:druid-watch 3.2s steps(1,end) infinite}.druid-mantle{animation:druid-leaf-breath 3.2s steps(1,end) infinite}.druid-staff{transform-origin:75px 126px;animation:druid-staff-balance 3.2s steps(1,end) infinite}\n@keyframes druid-watch{0%,85%,100%{transform:translate(0,0)}27%{transform:translate(-2px,-2px)}56%{transform:translate(2px,0)}}\n@keyframes druid-leaf-breath{0%,85%,100%{transform:translate(0,0)}27%{transform:translate(-2px,0)}56%{transform:translate(2px,1px)}}\n@keyframes druid-staff-balance{0%,85%,100%{transform:rotate(0)}27%{transform:rotate(-2deg)}56%{transform:rotate(2deg)}}",
 "move": ".druid-core{animation:druid-walk 1.2s steps(1,end) infinite}.druid-left-leg{transform-origin:115px 171px;animation:druid-left-step 1.2s steps(1,end) infinite}.druid-right-leg{transform-origin:146px 171px;animation:druid-right-step 1.2s steps(1,end) infinite}\n@keyframes druid-walk{0%,84%,100%{transform:translate(0,0)}31%{transform:translate(-4px,-2px)}62%{transform:translate(4px,-1px)}}\n@keyframes druid-left-step{0%,84%,100%{transform:rotate(0)}31%{transform:rotate(-11deg)}62%{transform:rotate(14deg)}}\n@keyframes druid-right-step{0%,84%,100%{transform:rotate(0)}31%{transform:rotate(13deg)}62%{transform:rotate(-12deg)}}",
 "attack": ".druid-core{animation:druid-cast-brace 1.4s steps(1,end) 1 both}.druid-casting-arm{transform-origin:157px 126px;animation:druid-vine-hand 1.4s steps(1,end) 1 both}.druid-vine{animation:druid-thorn-whip 1.4s linear 1 both}.druid-staff{transform-origin:75px 125px;animation:druid-staff-root 1.4s steps(1,end) 1 both}\n@keyframes druid-cast-brace{0%,100%{transform:translate(0,0)}23%{transform:translate(-2px,0)}50%{transform:translate(-2px,-2px)}75%{transform:translate(1px,0)}}\n@keyframes druid-vine-hand{0%,100%{transform:rotate(0)}23%{transform:rotate(-17deg)}48%{transform:rotate(14deg)}74%{transform:rotate(3deg)}}\n@keyframes druid-thorn-whip{0%,24%{opacity:0;transform:translate(0,0)}36%{opacity:.75;transform:translate(0,0)}49%{opacity:1;transform:translate(2px,-2px)}59%{opacity:1;transform:translate(9px,-3px)}76%,100%{opacity:0;transform:translate(9px,-3px)}}\n@keyframes druid-staff-root{0%,100%{transform:rotate(0)}26%{transform:rotate(3deg)}52%{transform:rotate(-2deg)}}",
 "rest": ".druid-core{animation:druid-rest-crouch 4s steps(1,end) infinite}.druid-staff{transform-origin:75px 125px;animation:druid-rest-staff 4s steps(1,end) infinite}.druid-casting-arm{animation:druid-rest-arm 4s steps(1,end) infinite}\n@keyframes druid-rest-crouch{0%,85%,100%{transform:translateY(9px)}50%{transform:translateY(10px)}}\n@keyframes druid-rest-staff{0%,85%,100%{transform:rotate(-9deg)}50%{transform:rotate(-10deg)}}\n@keyframes druid-rest-arm{0%,85%,100%{transform:translateY(7px)}50%{transform:translateY(8px)}}"
});
const REDUCED='@media(prefers-reduced-motion:reduce){.druid-core,.druid-mantle,.druid-staff,.druid-left-leg,.druid-right-leg,.druid-casting-arm,.druid-vine{animation:none!important}}';
export function renderDruid(mode,art){
 try{
  if(!DRUID_STATES.includes(mode))throw new Error('Unsupported Wildspeaker mode: '+mode);
  if(typeof art!=='string'||!art.includes('data-weapon="living-quarterstaff"')||
    !art.includes('data-spell-effect="thorn-whip"')||!art.endsWith('</svg>\n'))
   throw new Error('Wildspeaker source rig/art anchors changed');
  return art.replace('<svg xmlns=','<svg data-gridborn-mode="'+mode+'" xmlns=')
   .replace('</title>',' — '+mode+' movement study</title>')
   .replace('</desc>','</desc>\n<style>\n'+MOTIONS[mode]+'\n'+REDUCED+'\n</style>');
 }catch(error){console.error('Wildspeaker source generation failed',mode,error);throw error;}
}
