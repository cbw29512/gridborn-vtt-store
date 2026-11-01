/** Original Fighter study, isolated as actual looping Move and one-shot Attack.
 * The preexisting Idle source is retained verbatim as the canonical Idle.
 * Source controls remain public prototypes; exported VP9 alpha files stay private.
 */
export const FIGHTER_GENERATED_STATES=Object.freeze(['move','attack']);

const BOOTS=`  <rect x="99" y="165" width="22" height="25" fill="#171a27"/> <rect x="127" y="164" width="23" height="26" fill="#171a27"/>
  <rect x="102" y="166" width="17" height="20" fill="#493c3a"/> <rect x="130" y="165" width="17" height="21" fill="#493c3a"/>
  <rect x="101" y="184" width="22" height="8" fill="#171a27"/> <rect x="128" y="184" width="23" height="8" fill="#171a27"/>`;

const ARTICULATED_BOOTS=`  <g class="fighter-boot-left">
  <rect x="99" y="165" width="22" height="25" fill="#171a27"/>
  <rect x="102" y="166" width="17" height="20" fill="#493c3a"/>
  <rect x="101" y="184" width="22" height="8" fill="#171a27"/>
  </g>
  <g class="fighter-boot-right">
  <rect x="127" y="164" width="23" height="26" fill="#171a27"/>
  <rect x="130" y="165" width="17" height="21" fill="#493c3a"/>
  <rect x="128" y="184" width="23" height="8" fill="#171a27"/>
  </g>`;

const STYLES=Object.freeze({
 move:`
/* Four complete .8-second steps in a seam-safe 3.2-second clip. */
.body{animation:fighter-move-bob .8s ease-in-out infinite}
.cape{animation:fighter-move-cape .8s ease-in-out infinite}
.shield{transform-origin:97px 115px;animation:fighter-move-shield .8s ease-in-out infinite}
.sword{transform-origin:168px 142px;animation:fighter-move-sword .8s ease-in-out infinite}
.fighter-boot-left{transform-origin:111px 168px;animation:fighter-move-left .8s ease-in-out infinite}
.fighter-boot-right{transform-origin:139px 168px;animation:fighter-move-right .8s ease-in-out infinite}
@keyframes fighter-move-bob{
0%,10%,90%,100%{transform:translateY(0)}
30%{transform:translateY(-3px)}50%{transform:translateY(-1px)}
70%{transform:translateY(-3px)}
}
@keyframes fighter-move-left{
0%,10%,90%,100%{transform:rotate(0)}
30%{transform:rotate(-14deg)}50%{transform:rotate(13deg)}
70%{transform:rotate(6deg)}
}
@keyframes fighter-move-right{
0%,10%,90%,100%{transform:rotate(0)}
30%{transform:rotate(14deg)}50%{transform:rotate(-13deg)}
70%{transform:rotate(-6deg)}
}
@keyframes fighter-move-cape{
0%,10%,90%,100%{transform:translateX(0)}
30%{transform:translateX(4px)}50%{transform:translateX(-2px)}
70%{transform:translateX(3px)}
}
@keyframes fighter-move-shield{
0%,10%,90%,100%{transform:rotate(0)}
30%{transform:rotate(-5deg)}50%{transform:rotate(6deg)}
70%{transform:rotate(-3deg)}
}
@keyframes fighter-move-sword{
0%,10%,90%,100%{transform:rotate(0)}
30%{transform:rotate(7deg)}50%{transform:rotate(-6deg)}
70%{transform:rotate(3deg)}
}
`,
 attack:`
/* One-shot 1.4s outward slash: blade clears the helmet and frame. */
.body{animation:fighter-attack-lunge 1.4s ease-in-out 1 both}
.cape{animation:fighter-attack-cape 1.4s ease-in-out 1 both}
.shield{transform-origin:97px 115px;animation:fighter-attack-guard 1.4s ease-in-out 1 both}
.sword{transform-origin:168px 142px;animation:fighter-attack-swing 1.4s cubic-bezier(.2,.8,.3,1) 1 both}
@keyframes fighter-attack-lunge{
0%,100%{transform:translate(0,0)}
22%{transform:translate(3px,1px)}
53%{transform:translate(-8px,-3px)}
74%{transform:translate(-3px,-1px)}
}
@keyframes fighter-attack-cape{
0%,100%{transform:translateX(0)}
22%{transform:translateX(-3px)}
53%{transform:translateX(10px)}
74%{transform:translateX(5px)}
}
@keyframes fighter-attack-guard{
0%,100%{transform:rotate(0)}
22%{transform:rotate(-18deg)}
53%{transform:rotate(12deg)}
}
@keyframes fighter-attack-swing{
0%,100%{transform:rotate(0)}
22%{transform:rotate(8deg)}
53%{transform:rotate(43deg)}
74%{transform:rotate(15deg)}
}
`
});
const reduce=`
@media(prefers-reduced-motion:reduce){
.body,.cape,.shield,.sword,.eye,.fighter-boot-left,.fighter-boot-right{animation:none!important}
}`;

export function renderFighterState(source,mode){
 if(!FIGHTER_GENERATED_STATES.includes(mode))
  throw new Error('Unsupported Fighter generation state');
 if(typeof source!=='string'||!source.includes(BOOTS)||
    !source.includes('<style>')||!source.includes('</style>')||
    !source.includes('<g class="shield">')||!source.includes('<g class="sword">'))
  throw new Error('Canonical Fighter Idle art changed: re-review rig anchors');
 let svg=source.replace(BOOTS,ARTICULATED_BOOTS);
 svg=svg.replace(/<style>[\s\S]*?<\/style>/,'<style>\n'+STYLES[mode]+reduce+'\n</style>');
 svg=svg.replace('<svg xmlns="http://www.w3.org/2000/svg"','<svg data-gridborn-mode="'+mode+'" xmlns="http://www.w3.org/2000/svg"');
 svg=svg.replace(/<title id="title">[^<]*<\/title>/,
   '<title id="title">Human Fighter — '+mode+' original animation study</title>');
 svg=svg.replace(/<desc id="description">[^<]*<\/desc>/,
   '<desc id="description">'+(mode==='move'
    ?'Separate looping 3.2-second alternating-foot walking study.'
    :'Single 1.4-second sword swing with guard, strike and recovery.')+
    ' Preview artwork only; no licensed or tested VTT product.</desc>');
 return svg;
}
