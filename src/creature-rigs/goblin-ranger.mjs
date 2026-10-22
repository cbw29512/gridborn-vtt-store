/** Original nonbinary Goblin Pathfinder Ranger: small-body shortbow and true projectile. */
export const GOBLIN_RANGER_STATES=Object.freeze(['idle','move','attack','rest']);
const MOTIONS=Object.freeze({
 "idle": ".gob-ranger-core{animation:gob-ranger-scout 3.2s steps(1,end) infinite}.gob-ranger-quiver{animation:gob-ranger-fletching 3.2s steps(1,end) infinite}\n@keyframes gob-ranger-scout{0%,85%,100%{transform:translate(0,0)}29%{transform:translate(-2px,-2px)}55%{transform:translate(2px,1px)}}\n@keyframes gob-ranger-fletching{0%,85%,100%{transform:translate(0,0)}29%{transform:translate(-2px,0)}55%{transform:translate(1px,0)}}",
 "move": ".gob-ranger-core{animation:gob-ranger-scurry 1.2s steps(1,end) infinite}.gob-ranger-leg-left{transform-origin:118px 175px;animation:gob-ranger-left-step 1.2s steps(1,end) infinite}.gob-ranger-leg-right{transform-origin:147px 175px;animation:gob-ranger-right-step 1.2s steps(1,end) infinite}\n@keyframes gob-ranger-scurry{0%,84%,100%{transform:translate(0,0)}26%{transform:translate(-5px,-3px)}61%{transform:translate(5px,-1px)}}\n@keyframes gob-ranger-left-step{0%,84%,100%{transform:rotate(0)}26%{transform:rotate(-15deg)}61%{transform:rotate(15deg)}}\n@keyframes gob-ranger-right-step{0%,84%,100%{transform:rotate(0)}26%{transform:rotate(15deg)}61%{transform:rotate(-15deg)}}",
 "attack": ".gob-ranger-core{animation:gob-ranger-brace 1.4s steps(1,end) 1 both}.gob-ranger-rest-draw-arm{animation:gob-ranger-rest-hand-fade 1.4s steps(1,end) 1 both}.gob-ranger-anchor-arm{animation:gob-ranger-anchor-hand 1.4s steps(1,end) 1 both}.gob-ranger-string-rest{animation:gob-ranger-string-loose 1.4s steps(1,end) 1 both}.gob-ranger-string-drawn{animation:gob-ranger-string-tension 1.4s steps(1,end) 1 both}.gob-ranger-arrow{animation:gob-ranger-arrow-flight 1.4s linear 1 both}\n@keyframes gob-ranger-brace{0%,100%{transform:translate(0,0)}20%{transform:translate(-3px,-2px)}54%{transform:translate(-2px,-1px)}78%{transform:translate(0,0)}}\n@keyframes gob-ranger-rest-hand-fade{0%,19%,67%,100%{opacity:1}23%,62%{opacity:0}}\n@keyframes gob-ranger-anchor-hand{0%,19%,67%,100%{opacity:0}23%,62%{opacity:1}}\n@keyframes gob-ranger-string-loose{0%,19%,67%,100%{opacity:1}23%,62%{opacity:0}}\n@keyframes gob-ranger-string-tension{0%,19%,67%,100%{opacity:0}23%,62%{opacity:1}}\n@keyframes gob-ranger-arrow-flight{0%,22%,68%,100%{opacity:0;transform:translate(0,0)}29%,59%{opacity:1;transform:translate(0,0)}62%{opacity:1;transform:translate(6px,0)}65%{opacity:1;transform:translate(13px,0)}67%{opacity:.8;transform:translate(16px,0)}}",
 "rest": ".gob-ranger-core{animation:gob-ranger-low-rest 4s steps(1,end) infinite}.gob-ranger-bow-arm{animation:gob-ranger-bow-settle 4s steps(1,end) infinite}\n@keyframes gob-ranger-low-rest{0%,85%,100%{transform:translateY(10px)}47%{transform:translateY(11px)}}\n@keyframes gob-ranger-bow-settle{0%,85%,100%{transform:translateY(7px)}47%{transform:translateY(8px)}}"
});
const REDUCED='@media(prefers-reduced-motion:reduce){.gob-ranger-core,.gob-ranger-quiver,.gob-ranger-leg-left,.gob-ranger-leg-right,.gob-ranger-bow-arm,.gob-ranger-rest-draw-arm,.gob-ranger-anchor-arm,.gob-ranger-string-rest,.gob-ranger-string-drawn,.gob-ranger-arrow{animation:none!important}}';
export function renderGoblinRanger(mode,art){
 try{
  if(!GOBLIN_RANGER_STATES.includes(mode))throw new Error('Unsupported Goblin Pathfinder mode: '+mode);
  if(typeof art!=='string'||!art.includes('data-weapon="compact-recurve-shortbow"')||
     !art.includes('data-projectile="shortbow-arrow"')||!art.includes('data-pose="cheek-anchor"')||!art.endsWith('</svg>\n'))
   throw new Error('Goblin Pathfinder canonical shortbow rig missing');
  return art.replace('<svg xmlns=','<svg data-gridborn-mode="'+mode+'" xmlns=')
    .replace('</title>',' — '+mode+' state study</title>')
    .replace('</desc>','</desc>\n<style>\n'+MOTIONS[mode]+'\n'+REDUCED+'\n</style>');
 }catch(error){console.error('Goblin Pathfinder rendering failed',mode,error);throw error;}
}
