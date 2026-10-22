/** Original Elven Ranger study. Four source-dependent SVG states. */
export const RANGER_STATES=Object.freeze(['idle','move','attack','rest']);
const MOTIONS=Object.freeze({
 "idle": ".ranger-core{animation:ranger-guard 3.2s ease-in-out infinite}.ranger-bow{transform-origin:200px 122px;animation:ranger-bow-watch 3.2s ease-in-out infinite}\n@keyframes ranger-guard{0%,100%{transform:translateY(0)}42%{transform:translateY(-2px)}70%{transform:translateY(1px)}}\n@keyframes ranger-bow-watch{0%,100%{transform:rotate(0)}42%{transform:rotate(3deg)}70%{transform:rotate(-2deg)}}",
 "move": ".ranger-core{animation:ranger-prowl 1.2s steps(1,end) infinite}.ranger-leg-left{transform-origin:118px 169px;animation:ranger-left-stride 1.2s steps(1,end) infinite}.ranger-leg-right{transform-origin:147px 169px;animation:ranger-right-stride 1.2s steps(1,end) infinite}.ranger-bow{transform-origin:200px 122px;animation:ranger-bow-carry 1.2s steps(1,end) infinite}\n@keyframes ranger-prowl{0%,100%{transform:translate(0,0)}31%{transform:translate(-4px,-3px)}66%{transform:translate(5px,-1px)}}\n@keyframes ranger-left-stride{0%,100%{transform:rotate(0)}31%{transform:rotate(-14deg)}66%{transform:rotate(13deg)}}\n@keyframes ranger-right-stride{0%,100%{transform:rotate(0)}31%{transform:rotate(14deg)}66%{transform:rotate(-14deg)}}\n@keyframes ranger-bow-carry{0%,100%{transform:rotate(0)}31%{transform:rotate(5deg)}66%{transform:rotate(-5deg)}}",
 "attack": ".ranger-core{animation:ranger-brace 1.4s steps(1,end) 1 both}.ranger-draw-arm{animation:ranger-pull 1.4s steps(1,end) 1 both}.ranger-string-rest{animation:ranger-string-release 1.4s steps(1,end) 1 both}.ranger-string-drawn{animation:ranger-string-tension 1.4s steps(1,end) 1 both}.ranger-arrow{animation:ranger-arrow-flight 1.4s linear 1 both}\n@keyframes ranger-brace{0%,100%{transform:translate(0,0)}24%{transform:translate(-2px,0)}51%{transform:translate(-2px,-2px)}76%{transform:translate(1px,0)}}\n@keyframes ranger-pull{0%,100%{transform:translateX(0)}24%,51%{transform:translateX(-7px)}60%{transform:translateX(3px)}}\n@keyframes ranger-string-release{0%,21%,58%,100%{opacity:1}24%,51%{opacity:0}}\n@keyframes ranger-string-tension{0%,21%,58%,100%{opacity:0}24%,51%{opacity:1}}\n@keyframes ranger-arrow-flight{0%,16%{opacity:0;transform:translate(0,0)}24%,51%{opacity:1;transform:translate(0,0)}62%{opacity:1;transform:translate(12px,-2px)}70%,100%{opacity:0;transform:translate(18px,-2px)}}",
 "rest": ".ranger-core{animation:ranger-rest 4s ease-in-out infinite}.ranger-bow{transform-origin:200px 122px;animation:ranger-lower 4s ease-in-out infinite}\n@keyframes ranger-rest{0%,100%{transform:translateY(8px)}48%{transform:translateY(7px)}}\n@keyframes ranger-lower{0%,100%{transform:rotate(18deg) translateY(6px)}48%{transform:rotate(16deg) translateY(6px)}}"
});
const REDUCED='@media(prefers-reduced-motion:reduce){.ranger-core,.ranger-bow,.ranger-draw-arm,.ranger-leg-left,.ranger-leg-right,.ranger-string-rest,.ranger-string-drawn,.ranger-arrow{animation:none!important}}';
export function renderRanger(mode,art){
 try{
  if(!RANGER_STATES.includes(mode))throw new Error('Unsupported Ranger mode: '+mode);
  if(typeof art!=='string'||!art.includes('data-weapon="longbow"')||
   !art.includes('data-weapon-projectile="arrow"')||!art.endsWith('</svg>\n'))
   throw new Error('Ranger source missing required rig');
  return art.replace('<svg xmlns=','<svg data-gridborn-mode="'+mode+'" xmlns=')
   .replace('</title>',' — '+mode+' preview</title>')
   .replace('</desc>','</desc>\n<style>\n'+MOTIONS[mode]+'\n'+REDUCED+'\n</style>');
 }catch(error){console.error('Gridborn Ranger render failed',mode,error);throw error;}
}
