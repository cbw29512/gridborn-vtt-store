/** Human Farmer derives from the SAME approved human source skeleton as Village Innkeeper. */
const TORSO="<!-- Original human anatomy; farmer clothing and denim bib are role overlays. -->\n<path d=\"M92 98h69v12h14v39h-18v25H93v-26H78v-37h14z\" fill=\"#3b3431\"/>\n<path d=\"M95 101h62v54H95z\" fill=\"#e8d19e\"/>\n<path d=\"M103 116h47v59h-47z\" fill=\"#557785\"/>\n<path d=\"M106 111h11v45h-11zM141 111h10v45h-10z\" fill=\"#345365\"/>\n<path d=\"M118 133h20v23h-20z\" fill=\"#8299a0\" stroke=\"#365769\" stroke-width=\"3\"/>\n<path d=\"M119 134v8h17v-8\" fill=\"none\" stroke=\"#c4c6a7\" stroke-width=\"2\"/>\n<rect x=\"83\" y=\"113\" width=\"15\" height=\"39\" fill=\"#e8d19e\"/>\n<path d=\"M95 144h61\" fill=\"none\" stroke=\"#bc9161\" stroke-width=\"7\"/>\n<rect x=\"127\" y=\"108\" width=\"7\" height=\"16\" fill=\"#c6a171\"/>\n";
const HEAD="<!-- Same underlying human head geometry: long braid and straw field hat. -->\n<rect x=\"106\" y=\"57\" width=\"48\" height=\"53\" fill=\"#35272b\"/>\n<rect x=\"110\" y=\"67\" width=\"40\" height=\"40\" fill=\"#e2ad84\"/>\n<path d=\"M105 72V58h12v-8h25v7h13v19h-9v-9h-30v7z\" fill=\"#593a31\"/>\n<path d=\"M145 74h12v30l-7 10-8-8z\" fill=\"#6d4633\"/>\n<path d=\"M148 87h10m-10 10h10\" stroke=\"#c18e5a\" stroke-width=\"3\"/>\n<rect x=\"115\" y=\"84\" width=\"6\" height=\"4\" fill=\"#41332a\"/><rect x=\"139\" y=\"84\" width=\"6\" height=\"4\" fill=\"#41332a\"/>\n<path d=\"M124 95h16\" stroke=\"#a45f57\" stroke-width=\"3\"/>\n<path d=\"M106 54h49v-17h-49z\" fill=\"#caa15f\"/>\n<rect x=\"94\" y=\"54\" width=\"74\" height=\"9\" fill=\"#e4bc78\"/>\n<rect x=\"109\" y=\"51\" width=\"43\" height=\"5\" fill=\"#836041\"/>\n<path d=\"M115 45h27\" stroke=\"#f4dc9d\" stroke-width=\"3\"/>\n";
const TOOL="<g id=\"farm-tool-arm\">\n<!-- A real three-tined pitchfork, held with the human wrist rather than floating. -->\n<rect x=\"177\" y=\"67\" width=\"6\" height=\"123\" fill=\"#8b5e37\" stroke=\"#48372e\" stroke-width=\"2\"/>\n<path d=\"M180 68V45M169 45V71Q169 83 180 84Q191 83 191 71V45\" fill=\"none\" stroke=\"#b9c4c8\" stroke-width=\"5\" stroke-linecap=\"square\"/>\n<path d=\"M169 61h22\" fill=\"none\" stroke=\"#dbe1d5\" stroke-width=\"3\"/>\n<rect x=\"159\" y=\"113\" width=\"14\" height=\"38\" fill=\"#e8d19e\"/>\n<rect x=\"169\" y=\"128\" width=\"16\" height=\"13\" rx=\"3\" fill=\"#e2ad84\" stroke=\"#bd8668\" stroke-width=\"2\"/>\n</g>\n";
const POCKET="<path d=\"M96 144h14v15H96z\" fill=\"#e2ad84\"/>\n<path d=\"M104 170h16v10h-16\" fill=\"none\" stroke=\"#c6a171\" stroke-width=\"3\"/>\n<g id=\"farm-hay\" fill=\"#d2b36b\"><path d=\"M94 168l-11-22 15 10z\"/><path d=\"M92 161l-11-14\" stroke=\"#cfb071\" stroke-width=\"3\"/></g>\n";
const DIRT="<g id=\"farm-dirt\" opacity=\"0\" fill=\"#9b7b58\"><path d=\"M202 170l15-7-6 15z\"/><circle cx=\"219\" cy=\"164\" r=\"4\"/><circle cx=\"224\" cy=\"180\" r=\"3\"/></g>";
function replaceSection(s,start,end,newSource){
 const first=s.indexOf(start),last=s.indexOf(end,first+start.length);
 if(first<0||last<0)throw Error('Shared source marker missing: '+start);
 return s.slice(0,first)+newSource+s.slice(last);
}
function buildHumanFarmerSource(original){
 if(typeof original!=='string'||!original.includes('id="inn-left-leg"')||
    !original.includes('id="inn-right-leg"')||!original.includes('viewBox="0 0 256 240"'))
   throw Error('Human NPC anatomy foundation missing');
 let s=original;
 s=s.replace('<title id="title">Village Innkeeper — original Gridborn art study</title>',
  '<title id="title">Human Farmer · Female — original Gridborn study</title>');
 s=s.replace(/<desc id="description">[\s\S]*?<\/desc>/,
  '<desc id="description">Original human farmer with straw hat, denim overalls, braid and a physically held three-tined pitchfork; inherits core human anatomy from the Innkeeper body rig.</desc>');
 s=replaceSection(s,'<!-- puff-sleeve tunic and green vest -->','<!-- head and swept-back hair -->',TORSO);
 s=replaceSection(s,'<!-- head and swept-back hair -->','<g id="inn-server-arm">',HEAD);
 s=replaceSection(s,'<g id="inn-server-arm">','<path d="M96 144h14v15H96z" fill="#e2ad84"/>',TOOL);
 s=replaceSection(s,'<path d="M96 144h14v15H96z" fill="#e2ad84"/>','<g id="inn-splash"',POCKET);
 s=replaceSection(s,'<g id="inn-splash"','\n\n</g>',DIRT);
 for(const [from,to] of [['inn-body','farm-body'],['inn-left-leg','farm-left-leg'],['inn-right-leg','farm-right-leg']])
   s=s.replaceAll(from,to);
 for(const id of ['farm-body','farm-left-leg','farm-right-leg','farm-tool-arm','farm-dirt']){
  if(!s.includes('id="'+id+'"'))throw Error('Missing authored farmer group '+id);
 }
 return s;
}
const MOTION=Object.freeze({
  "idle": "#farm-body{animation:farm-stance 3.2s steps(1,end) infinite}#farm-tool-arm{transform-origin:161px 116px;animation:farm-pitchfork-idle 3.2s steps(1,end) infinite}\n@keyframes farm-stance{0%,100%{transform:translate(0,0)}38%{transform:translate(0,-2px)}70%{transform:translate(1px,0)}}\n@keyframes farm-pitchfork-idle{0%,100%{transform:rotate(0)}38%{transform:rotate(3deg)}70%{transform:rotate(-3deg)}}",
  "move": "#farm-body{animation:farm-walk 1.2s steps(1,end) infinite}#farm-left-leg{transform-origin:115px 160px;animation:farm-left-step 1.2s steps(1,end) infinite}#farm-right-leg{transform-origin:148px 160px;animation:farm-right-step 1.2s steps(1,end) infinite}#farm-tool-arm{transform-origin:161px 116px;animation:farm-carry-tool 1.2s steps(1,end) infinite}\n@keyframes farm-walk{0%,100%{transform:translate(0,0)}25%{transform:translate(2px,-3px)}60%{transform:translate(-2px,-1px)}}\n@keyframes farm-left-step{0%,100%{transform:rotate(0)}25%{transform:rotate(-17deg)}60%{transform:rotate(15deg)}}\n@keyframes farm-right-step{0%,100%{transform:rotate(0)}25%{transform:rotate(16deg)}60%{transform:rotate(-16deg)}}\n@keyframes farm-carry-tool{0%,100%{transform:rotate(0)}25%{transform:rotate(-5deg)}60%{transform:rotate(5deg)}}",
  "attack": "#farm-body{animation:farm-brace 1.4s steps(1,end) 1 both}#farm-tool-arm{transform-origin:162px 128px;animation:farm-pitchfork-thrust 1.4s steps(1,end) 1 both}#farm-dirt{animation:farm-impact 1.4s steps(1,end) 1 both}\n@keyframes farm-brace{0%,100%{transform:translate(0,0)}24%{transform:translate(-4px,0)}52%{transform:translate(2px,-2px)}80%{transform:translate(-1px,0)}}\n@keyframes farm-pitchfork-thrust{0%,100%{transform:rotate(0)}24%{transform:rotate(12deg)}52%,65%{transform:rotate(67deg) translate(3px,-4px)}80%{transform:rotate(16deg)}}\n@keyframes farm-impact{0%,42%,70%,100%{opacity:0;transform:translate(0,0)}55%,63%{opacity:1;transform:translate(6px,-3px)}}",
  "rest": "#farm-body{animation:farm-rest-body 4s steps(1,end) infinite}#farm-tool-arm{transform-origin:162px 128px;animation:farm-rest-pitchfork 4s steps(1,end) infinite}\n@keyframes farm-rest-body{0%,100%{transform:translate(0,3px)}55%{transform:translate(0,5px)}}\n@keyframes farm-rest-pitchfork{0%,100%{transform:rotate(13deg)}55%{transform:rotate(16deg)}}"
});
const REDUCED="@media(prefers-reduced-motion:reduce){#farm-body,#farm-left-leg,#farm-right-leg,#farm-tool-arm,#farm-dirt{animation:none!important}#farm-dirt{opacity:0!important}}";
export const HUMAN_FARMER_STATES=Object.freeze(["idle","move","attack","rest"]);
function renderHumanFarmer(mode,farmerArt){
 if(!HUMAN_FARMER_STATES.includes(mode))throw Error('Unsupported Human Farmer state: '+mode);
 if(typeof farmerArt!=='string'||!farmerArt.includes('viewBox="0 0 256 240"')||
    !['farm-body','farm-left-leg','farm-right-leg','farm-tool-arm','farm-dirt'].every(id=>farmerArt.includes('id="'+id+'"'))||
    !farmerArt.trimEnd().endsWith('</svg>'))throw Error('Human Farmer source rig incomplete');
 return farmerArt.replace('<svg xmlns=','<svg data-gridborn-mode="'+mode+'" xmlns=')
   .replace('</title>',' — '+mode+' motion study</title>')
   .replace('</desc>','</desc>\n<style>\n'+MOTION[mode]+'\n'+REDUCED+'\n</style>');
}
export {buildHumanFarmerSource,renderHumanFarmer};
