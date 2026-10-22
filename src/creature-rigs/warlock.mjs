/** Original Dwarf Hexwarden, pact effect emerging from grimoire not staff or generic aura. */
export const WARLOCK_STATES=Object.freeze(['idle','move','attack','rest']);
const MOTIONS=Object.freeze({
 "idle": ".hex-core{animation:hex-breath 3.2s steps(1,end) infinite}.hex-book{animation:hex-page-stir 3.2s steps(1,end) infinite}\n@keyframes hex-breath{0%,85%,100%{transform:translate(0,0)}25%{transform:translateY(-2px)}56%{transform:translateY(1px)}}\n@keyframes hex-page-stir{0%,85%,100%{transform:translate(0,0)}25%{transform:translateY(-1px)}56%{transform:translateY(1px)}}",
 "move": ".hex-core{animation:hex-short-stride 1.2s steps(1,end) infinite}.hex-left-leg{transform-origin:112px 174px;animation:hex-left-step 1.2s steps(1,end) infinite}.hex-right-leg{transform-origin:145px 174px;animation:hex-right-step 1.2s steps(1,end) infinite}\n@keyframes hex-short-stride{0%,84%,100%{transform:translate(0,0)}29%{transform:translate(-4px,-2px)}63%{transform:translate(4px,-1px)}}\n@keyframes hex-left-step{0%,84%,100%{transform:rotate(0)}29%{transform:rotate(-13deg)}63%{transform:rotate(12deg)}}\n@keyframes hex-right-step{0%,84%,100%{transform:rotate(0)}29%{transform:rotate(13deg)}63%{transform:rotate(-12deg)}}",
 "attack": ".hex-core{animation:hex-brace 1.4s steps(1,end) 1 both}.hex-book{transform-origin:186px 141px;animation:hex-tome-open 1.4s steps(1,end) 1 both}.hex-rune{animation:hex-rune-invoke 1.4s steps(1,end) 1 both}.hex-bolt{animation:hex-eldritch-release 1.4s linear 1 both}\n@keyframes hex-brace{0%,100%{transform:translate(0,0)}24%{transform:translate(-2px,-1px)}52%{transform:translate(-1px,-2px)}74%{transform:translate(1px,0)}}\n@keyframes hex-tome-open{0%,100%{transform:rotate(0)}25%{transform:rotate(-5deg)}51%{transform:rotate(4deg)}75%{transform:rotate(0)}}\n@keyframes hex-rune-invoke{0%,22%,54%,100%{opacity:0}30%{opacity:.6}43%,49%{opacity:1}}\n@keyframes hex-eldritch-release{0%,51%{opacity:0;transform:translate(0,0)}57%{opacity:1;transform:translate(0,0)}68%{opacity:1;transform:translate(2px,-2px)}78%,100%{opacity:0;transform:translate(2px,-2px)}}",
 "rest": ".hex-core{animation:hex-rest 4s steps(1,end) infinite}.hex-book{transform-origin:184px 143px;animation:hex-book-lower 4s steps(1,end) infinite}.hex-staff{transform-origin:68px 127px;animation:hex-staff-ease 4s steps(1,end) infinite}\n@keyframes hex-rest{0%,85%,100%{transform:translateY(8px)}50%{transform:translateY(9px)}}\n@keyframes hex-book-lower{0%,85%,100%{transform:rotate(9deg) translateY(5px)}50%{transform:rotate(10deg) translateY(5px)}}\n@keyframes hex-staff-ease{0%,85%,100%{transform:rotate(-7deg)}50%{transform:rotate(-8deg)}}"
});
const REDUCED='@media(prefers-reduced-motion:reduce){.hex-core,.hex-book,.hex-left-leg,.hex-right-leg,.hex-rune,.hex-bolt,.hex-staff{animation:none!important}}';
export function renderWarlock(mode,art){
 try{
  if(!WARLOCK_STATES.includes(mode))throw new Error('Unsupported Hexwarden state: '+mode);
  if(typeof art!=='string'||!art.includes('data-focus="occult-book"')||
    !art.includes('data-spell-phase="invoke"')||!art.includes('data-spell-phase="eldritch-bolt"')||!art.endsWith('</svg>\n'))
   throw new Error('Hexwarden source rune/book rig changed');
  return art.replace('<svg xmlns=','<svg data-gridborn-mode="'+mode+'" xmlns=')
   .replace('</title>',' — '+mode+' animation study</title>')
   .replace('</desc>','</desc>\n<style>\n'+MOTIONS[mode]+'\n'+REDUCED+'\n</style>');
 }catch(error){console.error('Hexwarden original state generation failed',mode,error);throw error;}
}
