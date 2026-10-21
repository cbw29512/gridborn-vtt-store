/**
 * Derived state studies reuse the existing original Cave Goblin silhouette.
 * They are public SVG prototypes, not exported/private VTT products.
 * The original 45-second reel remains the private exporter source of truth.
 */
export const GOBLIN_STATES=Object.freeze(['idle','move','attack']);
const LEG_PATH='<path d="M107 164h15v23h-15zM136 164h17v23h-17z" fill="#806446"/>';
const LEGS='<g class="goblin-leg-left"><path d="M107 164h15v23h-15z" fill="#806446"/></g>'+
  '<g class="goblin-leg-right"><path d="M136 164h17v23h-17z" fill="#806446"/></g>';
const BLINK_AFTER='<rect x="118" y="83" width="7" height="6" fill="#f8c75e"/><rect x="141" y="83" width="7" height="6" fill="#f8c75e"/>';
const BLINK=BLINK_AFTER+'<g class="goblin-blink" opacity="0">'+
  '<rect x="115" y="82" width="13" height="10" fill="#608a5e"/>'+
  '<rect x="138" y="82" width="13" height="10" fill="#608a5e"/></g>';
const ANIMATIONS=Object.freeze({
  idle:`
.body{animation:gb-goblin-idle 3.6s ease-in-out infinite;transform-origin:128px 150px}
.blade{animation:gb-goblin-idle-blade 3.6s ease-in-out infinite;transform-origin:183px 134px}
.buckler{animation:gb-goblin-idle-buckler 3.6s ease-in-out infinite;transform-origin:87px 146px}
.goblin-blink{animation:gb-goblin-blink 5.9s steps(1,end) infinite;opacity:0}
@keyframes gb-goblin-idle{0%,100%{transform:translateY(0)}50%{transform:translateY(2px)}}
@keyframes gb-goblin-idle-blade{0%,100%{transform:rotate(0)}50%{transform:rotate(2deg)}}
@keyframes gb-goblin-idle-buckler{0%,100%{transform:rotate(0)}50%{transform:rotate(-2deg)}}
@keyframes gb-goblin-blink{0%,47%,50%,100%{opacity:0}48%,49%{opacity:1}}
`,
  move:`
.body{animation:gb-goblin-walk-bob .72s ease-in-out infinite;transform-origin:128px 150px}
.goblin-leg-left{animation:gb-goblin-step-left .72s ease-in-out infinite;transform-origin:116px 166px}
.goblin-leg-right{animation:gb-goblin-step-right .72s ease-in-out infinite;transform-origin:145px 166px}
.blade{animation:gb-goblin-walk-blade .72s ease-in-out infinite;transform-origin:183px 134px}
.buckler{animation:gb-goblin-walk-buckler .72s ease-in-out infinite;transform-origin:87px 146px}
@keyframes gb-goblin-walk-bob{0%,50%,100%{transform:translateY(0)}25%,75%{transform:translateY(-4px)}}
@keyframes gb-goblin-step-left{0%,100%{transform:rotate(-16deg)}50%{transform:rotate(16deg)}}
@keyframes gb-goblin-step-right{0%,100%{transform:rotate(16deg)}50%{transform:rotate(-16deg)}}
@keyframes gb-goblin-walk-blade{0%,100%{transform:rotate(7deg)}50%{transform:rotate(-8deg)}}
@keyframes gb-goblin-walk-buckler{0%,100%{transform:rotate(-8deg)}50%{transform:rotate(9deg)}}
`,
  attack:`
.body{animation:gb-goblin-strike-lunge 1.4s ease-in-out 1 both;transform-origin:128px 150px}
.blade{animation:gb-goblin-strike-blade 1.4s cubic-bezier(.25,.75,.35,1) 1 both;transform-origin:183px 134px}
.buckler{animation:gb-goblin-strike-guard 1.4s ease-in-out 1 both;transform-origin:87px 146px}
@keyframes gb-goblin-strike-lunge{
0%,100%{transform:translate(0,0)}
24%{transform:translate(4px,1px)}
49%{transform:translate(-10px,-3px)}
70%{transform:translate(-4px,-1px)}
}
@keyframes gb-goblin-strike-blade{
0%,100%{transform:rotate(0)}
24%{transform:rotate(-48deg)}
49%{transform:rotate(62deg)}
70%{transform:rotate(22deg)}
}
@keyframes gb-goblin-strike-guard{
0%,100%{transform:rotate(0)}
24%{transform:rotate(18deg)}
49%{transform:rotate(-19deg)}
}
`
});
const ACCESSIBLE_NAMES=Object.freeze({
 idle:'Cave Goblin — looping idle breathing and blink study',
 move:'Cave Goblin — alternating leg walk study',
 attack:'Cave Goblin — single blade strike study'
});
export function renderGoblinState(source,mode){
 if(!GOBLIN_STATES.includes(mode))throw new Error('Invalid Goblin animation state');
 if(typeof source!=='string'||!source.includes(LEG_PATH)||
   !source.includes(BLINK_AFTER)||!source.includes('<style>')||
   !source.includes('</style>'))throw new Error('Goblin original source has drifted');
 let svg=source.replace(LEG_PATH,LEGS).replace(BLINK_AFTER,BLINK);
 const reduced='@media(prefers-reduced-motion:reduce){.body,.blade,.buckler,.goblin-leg-left,.goblin-leg-right,.goblin-blink{animation:none!important}}';
 svg=svg.replace(/<style>[\s\S]*?<\/style>/,
   '<style>\n'+ANIMATIONS[mode]+reduced+'\n</style>');
 svg=svg.replace('shape-rendering="crispEdges"',
   'shape-rendering="crispEdges" data-gridborn-mode="'+mode+'"');
 svg=svg.replace(/<title id="title">[^<]*<\/title>/,
   '<title id="title">'+ACCESSIBLE_NAMES[mode]+'</title>');
 svg=svg.replace(/<desc id="description">[^<]*<\/desc>/,
   '<desc id="description">Independent '+mode+
   ' animation preview. Original Cave Goblin study only; not an exported or purchasable VTT token.</desc>');
 return svg;
}
