/** Village Innkeeper source-backed four-state study; no name-dispatch in engine. */
export const INNKEEPER_STATES=Object.freeze(['idle','move','attack','rest']);
const MOTIONS=Object.freeze({
  "idle": "#inn-body{animation:inn-weight 3.2s steps(1,end) infinite}#inn-server-arm{transform-origin:161px 118px;animation:inn-offer 3.2s steps(1,end) infinite}\n@keyframes inn-weight{0%,100%{transform:translate(0,0)}35%{transform:translate(0,-2px)}70%{transform:translate(1px,0)}}\n@keyframes inn-offer{0%,100%{transform:rotate(0)}35%{transform:rotate(-7deg)}70%{transform:rotate(3deg)}}",
  "move": "#inn-body{animation:inn-walk 1.2s steps(1,end) infinite}#inn-left-leg{transform-origin:115px 160px;animation:inn-left-step 1.2s steps(1,end) infinite}#inn-right-leg{transform-origin:148px 160px;animation:inn-right-step 1.2s steps(1,end) infinite}#inn-server-arm{transform-origin:161px 118px;animation:inn-cup-steady 1.2s steps(1,end) infinite}\n@keyframes inn-walk{0%,100%{transform:translate(0,0)}25%{transform:translate(2px,-3px)}60%{transform:translate(-2px,-1px)}}\n@keyframes inn-left-step{0%,100%{transform:rotate(0)}25%{transform:rotate(-17deg)}60%{transform:rotate(15deg)}}\n@keyframes inn-right-step{0%,100%{transform:rotate(0)}25%{transform:rotate(16deg)}60%{transform:rotate(-16deg)}}\n@keyframes inn-cup-steady{0%,100%{transform:rotate(0)}25%{transform:rotate(-5deg)}60%{transform:rotate(4deg)}}",
  "attack": "#inn-body{animation:inn-defend-stance 1.4s steps(1,end) 1 both}#inn-server-arm{transform-origin:161px 118px;animation:inn-mug-shove 1.4s steps(1,end) 1 both}#inn-splash{animation:inn-foam-impact 1.4s steps(1,end) 1 both}\n@keyframes inn-defend-stance{0%,100%{transform:translate(0,0)}25%{transform:translate(-4px,0)}52%{transform:translate(3px,-2px)}78%{transform:translate(-1px,0)}}\n@keyframes inn-mug-shove{0%,100%{transform:rotate(0)}25%{transform:rotate(12deg)}52%{transform:rotate(-55deg) translate(6px,-4px)}70%{transform:rotate(-23deg)}}\n@keyframes inn-foam-impact{0%,40%,66%,100%{opacity:0;transform:translate(0,0)}49%,56%{opacity:1;transform:translate(8px,-7px)}}",
  "rest": "#inn-body{animation:inn-easy-rest 4s steps(1,end) infinite}#inn-server-arm{transform-origin:161px 118px;animation:inn-lower-tankard 4s steps(1,end) infinite}\n@keyframes inn-easy-rest{0%,100%{transform:translate(0,2px)}50%{transform:translate(0,4px)}}\n@keyframes inn-lower-tankard{0%,100%{transform:rotate(18deg)}50%{transform:rotate(22deg)}}"
});
const REDUCED="@media(prefers-reduced-motion:reduce){#inn-body,#inn-left-leg,#inn-right-leg,#inn-server-arm,#inn-splash{animation:none!important}#inn-splash{opacity:0!important}}";
export function renderVillageInnkeeper(mode,art){
  try{
    if(!INNKEEPER_STATES.includes(mode))throw Error('Unsupported Innkeeper state: '+mode);
    if(typeof art!=='string'||!art.includes('viewBox="0 0 256 240"')||
      !['inn-body','inn-left-leg','inn-right-leg','inn-server-arm','inn-splash'].every(id=>art.includes('id="'+id+'"'))||
      !art.trimEnd().endsWith('</svg>'))throw Error('Innkeeper source rig incomplete');
    return art.replace('<svg xmlns=','<svg data-gridborn-mode="'+mode+'" xmlns=')
      .replace('</title>',' — '+mode+' motion study</title>')
      .replace('</desc>','</desc>\n<style>\n'+MOTIONS[mode]+'\n'+REDUCED+'\n</style>');
  }catch(error){console.error('Village Innkeeper source rendering failed',mode,error);throw error;}
}
