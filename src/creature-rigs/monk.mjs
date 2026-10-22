/** Original unarmed Human Wayfarer. Complete alternate strike limbs stay attached to the hips and shoulder. */
export const MONK_STATES=Object.freeze(['idle','move','attack','rest']);
const MOTIONS=Object.freeze({
 "idle": ".monk-core{animation:monk-grounded-breath 3.2s steps(1,end) infinite}.monk-left-guard{transform-origin:110px 130px;animation:monk-guard-check 3.2s steps(1,end) infinite}\n@keyframes monk-grounded-breath{0%,85%,100%{transform:translate(0,0)}29%{transform:translate(0,-2px)}58%{transform:translate(1px,0)}}\n@keyframes monk-guard-check{0%,85%,100%{transform:rotate(0)}29%{transform:rotate(3deg)}58%{transform:rotate(-3deg)}}",
 "move": ".monk-core{animation:monk-footwork 1.2s steps(1,end) infinite}.monk-left-leg{transform-origin:116px 167px;animation:monk-left-step 1.2s steps(1,end) infinite}.monk-right-leg{transform-origin:145px 167px;animation:monk-right-step 1.2s steps(1,end) infinite}\n@keyframes monk-footwork{0%,84%,100%{transform:translate(0,0)}25%{transform:translate(-4px,-3px)}59%{transform:translate(5px,-1px)}}\n@keyframes monk-left-step{0%,84%,100%{transform:rotate(0)}25%{transform:rotate(-17deg)}59%{transform:rotate(13deg)}}\n@keyframes monk-right-step{0%,84%,100%{transform:rotate(0)}25%{transform:rotate(15deg)}59%{transform:rotate(-15deg)}}",
 "attack": ".monk-core{animation:monk-stance-plant 1.4s steps(1,end) 1 both}.monk-right-guard{animation:monk-guard-withdraw 1.4s steps(1,end) 1 both}.monk-palm-strike{animation:monk-palm-release 1.4s steps(1,end) 1 both}.monk-right-leg{animation:monk-base-leg-hide 1.4s steps(1,end) 1 both}.monk-kick-leg{animation:monk-chamber-extend-kick 1.4s steps(1,end) 1 both}.monk-strike-trail{animation:monk-impact-line 1.4s steps(1,end) 1 both}\n@keyframes monk-stance-plant{0%,100%{transform:translate(0,0)}20%{transform:translate(-3px,0)}41%{transform:translate(2px,-1px)}62%{transform:translate(-2px,-2px)}81%{transform:translate(0,0)}}\n@keyframes monk-guard-withdraw{0%,19%,43%,100%{opacity:1}23%,40%{opacity:0}}\n@keyframes monk-palm-release{0%,19%,43%,100%{opacity:0}23%,40%{opacity:1}}\n@keyframes monk-base-leg-hide{0%,49%,77%,100%{opacity:1}55%,73%{opacity:0}}\n@keyframes monk-chamber-extend-kick{0%,49%,77%,100%{opacity:0}52%{opacity:1;transform:translate(-16px,13px)}59%,67%{opacity:1;transform:translate(0,0)}73%{opacity:1;transform:translate(-15px,13px)}}\n@keyframes monk-impact-line{0%,23%,43%,100%{opacity:0}31%{opacity:1}40%{opacity:.5}}",
 "rest": ".monk-core{animation:monk-calm-rest 4s steps(1,end) infinite}.monk-left-guard{animation:monk-lowered-guard 4s steps(1,end) infinite}.monk-right-guard{animation:monk-relax-fist 4s steps(1,end) infinite}\n@keyframes monk-calm-rest{0%,85%,100%{transform:translateY(10px)}49%{transform:translateY(11px)}}\n@keyframes monk-lowered-guard{0%,85%,100%{transform:translateY(11px)}49%{transform:translateY(12px)}}\n@keyframes monk-relax-fist{0%,85%,100%{transform:translateY(10px)}49%{transform:translateY(12px)}}"
});
const REDUCED='@media(prefers-reduced-motion:reduce){.monk-core,.monk-left-guard,.monk-right-guard,.monk-left-leg,.monk-right-leg,.monk-palm-strike,.monk-kick-leg,.monk-strike-trail{animation:none!important}}';
export function renderMonk(mode,art){
 try{
  if(!MONK_STATES.includes(mode))throw new Error('Unsupported Wayfarer state: '+mode);
  if(typeof art!=='string'||!art.includes('data-attack-pose="palm-strike"')||
   !art.includes('data-attack-pose="front-kick"')||!art.endsWith('</svg>\n'))
   throw new Error('Wayfarer source art/limbs missing');
  return art.replace('<svg xmlns=','<svg data-gridborn-mode="'+mode+'" xmlns=')
    .replace('</title>',' — '+mode+' motion study</title>')
    .replace('</desc>','</desc>\n<style>\n'+MOTIONS[mode]+'\n'+REDUCED+'\n</style>');
 }catch(error){console.error('Gridborn Wayfarer source rendering failed',mode,error);throw error;}
}
