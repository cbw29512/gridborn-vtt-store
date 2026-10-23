/** Same human anatomy, distinct occupation overlays and mechanically credible attacks. */
export const HUMAN_ROLE_SPECS=Object.freeze({
  "guard": {
    "name": "City Guard",
    "id": "npc-guard-human",
    "stem": "city-guard",
    "description": "A city guard wearing steel armor and a navy-blue cloak, holding a spear in the right hand and a large shield strapped to the left arm.",
    "chest": "<!-- Steel breastplate, articulated straps and blue guard cloak -->\n<path d=\"M87 98L95 91 162 91 171 102 185 164 170 172 164 136 158 173 98 173 88 140 77 173 74 122Z\" fill=\"#263e58\" stroke=\"#1e3045\" stroke-width=\"4\"/>\n<path d=\"M91 104L117 97 159 102 166 149 148 161 109 160 91 145Z\" fill=\"#9eb1c2\" stroke=\"#364858\" stroke-width=\"5\"/>\n<path d=\"M99 107L114 102 121 123 113 145 96 141Z\" fill=\"#dce2df\"/>\n<path d=\"M131 104L153 106 158 141 143 148 130 126Z\" fill=\"#788c9b\"/>\n<path d=\"M121 98h10v54h-10z\" fill=\"#d2c482\"/>\n<rect x=\"91\" y=\"150\" width=\"76\" height=\"10\" fill=\"#574e49\"/><path d=\"M117 151h24v10h-24z\" fill=\"#e2b960\"/>\n<path d=\"M92 161l17 21h42l14-21\" fill=\"#394a5c\" stroke=\"#2a3948\" stroke-width=\"3\"/>\n",
    "head": "<!-- Same Human face dimensions with an occupational nasal helm overlay -->\n<rect x=\"106\" y=\"57\" width=\"48\" height=\"53\" fill=\"#312a30\"/>\n<rect x=\"110\" y=\"67\" width=\"40\" height=\"40\" fill=\"#e2ad84\"/>\n<rect x=\"115\" y=\"84\" width=\"6\" height=\"4\" fill=\"#392f29\"/><rect x=\"139\" y=\"84\" width=\"6\" height=\"4\" fill=\"#392f29\"/>\n<path d=\"M124 96h18\" stroke=\"#855a52\" stroke-width=\"3\"/>\n<path d=\"M104 64L112 48 148 48 156 65 151 82 144 82 144 67 115 67 113 82 105 82Z\" fill=\"#9eacb6\" stroke=\"#314656\" stroke-width=\"5\"/>\n<path d=\"M111 51L146 51\" stroke=\"#f0eddc\" stroke-width=\"3\"/>\n<path d=\"M126 64h9v29h-9z\" fill=\"#adbbc3\" stroke=\"#667a87\" stroke-width=\"2\"/>\n<path d=\"M121 48L130 40 138 48Z\" fill=\"#e2bb76\"/>\n",
    "right": "<g id=\"human-tool-arm\">\n<!-- Spear and right glove are one group: no detached shaft -->\n<path d=\"M180 42L174 68H186Z\" fill=\"#d3e0e1\" stroke=\"#546979\" stroke-width=\"4\"/>\n<rect x=\"177\" y=\"67\" width=\"6\" height=\"127\" fill=\"#755338\" stroke=\"#3f342e\" stroke-width=\"2\"/>\n<path d=\"M176 85h9\" stroke=\"#debd79\" stroke-width=\"3\"/>\n<rect x=\"159\" y=\"112\" width=\"16\" height=\"42\" fill=\"#8395a1\" stroke=\"#394b5a\" stroke-width=\"3\"/>\n<rect x=\"170\" y=\"127\" width=\"20\" height=\"15\" rx=\"3\" fill=\"#555f69\" stroke=\"#d0c1a5\" stroke-width=\"3\"/>\n</g>",
    "left": "<g id=\"human-offhand-arm\">\n<rect x=\"82\" y=\"114\" width=\"16\" height=\"43\" fill=\"#8597a5\" stroke=\"#394c5d\" stroke-width=\"3\"/>\n<!-- Shield is strapped to the LEFT forearm and spans below the elbow -->\n<path d=\"M67 120L101 120 110 139 103 171 86 183 69 170 61 139Z\" fill=\"#6a829c\" stroke=\"#e7cf8e\" stroke-width=\"6\"/>\n<path d=\"M67 131L101 131 105 140 99 164 86 174 73 164 67 140Z\" fill=\"#263f60\"/>\n<path d=\"M85 124v50m-18-31h37\" stroke=\"#e2c475\" stroke-width=\"5\"/>\n<circle cx=\"86\" cy=\"147\" r=\"7\" fill=\"#e5e8e1\" stroke=\"#7894a7\" stroke-width=\"3\"/>\n</g>",
    "effect": "<g id=\"human-impact\" opacity=\"0\" stroke=\"#f1d99a\" stroke-width=\"4\">\n<path d=\"M223 112l12-13m-3 22h15m-27-29l3-15\"/>\n</g>",
    "actionName": "human-spear-thrust",
    "motionName": "spear"
  },
  "blacksmith": {
    "name": "Human Blacksmith · Nonbinary",
    "id": "npc-roster-blacksmith-human",
    "stem": "human-blacksmith",
    "description": "A human blacksmith in soot-dark workwear with a long leather apron, utility belt and a steel-headed forge hammer securely gripped by the right hand.",
    "chest": "<!-- Work shirt, leather apron, hot-forge stains and iron buckles -->\n<path d=\"M92 100L160 100 173 119 163 168 94 170 78 121Z\" fill=\"#62564c\" stroke=\"#362f32\" stroke-width=\"5\"/>\n<path d=\"M95 102h61v53H95z\" fill=\"#926b49\"/>\n<path d=\"M104 114L117 107 141 107 156 118 155 185 101 185Z\" fill=\"#493d38\" stroke=\"#b68c66\" stroke-width=\"4\"/>\n<path d=\"M103 121L118 116 137 116 151 121\" fill=\"none\" stroke=\"#cfaa7e\" stroke-width=\"4\"/>\n<path d=\"M121 127h17v9h-17z\" fill=\"#9a7863\"/>\n<path d=\"M105 151h44v9h-44\" fill=\"none\" stroke=\"#bd9a70\" stroke-width=\"5\"/>\n<path d=\"M113 145l8 8 12-7 13 13\" fill=\"none\" stroke=\"#73584b\" stroke-width=\"3\"/>\n<rect x=\"93\" y=\"112\" width=\"18\" height=\"44\" fill=\"#765b48\"/>\n<rect x=\"99\" y=\"119\" width=\"10\" height=\"25\" fill=\"#a27f60\"/>\n",
    "head": "<!-- Same human head and eyes; soot streak, short hair, thick headband -->\n<rect x=\"106\" y=\"57\" width=\"48\" height=\"53\" fill=\"#312a30\"/>\n<rect x=\"110\" y=\"67\" width=\"40\" height=\"40\" fill=\"#e2ad84\"/>\n<path d=\"M105 72V58h12v-8h25v7h13v19h-9v-9h-30v7z\" fill=\"#342c2a\"/>\n<rect x=\"108\" y=\"70\" width=\"44\" height=\"7\" fill=\"#684c38\" stroke=\"#392f29\" stroke-width=\"2\"/>\n<rect x=\"115\" y=\"84\" width=\"6\" height=\"4\" fill=\"#382f28\"/><rect x=\"139\" y=\"84\" width=\"6\" height=\"4\" fill=\"#382f28\"/>\n<path d=\"M124 96h16\" stroke=\"#875747\" stroke-width=\"3\"/>\n<path d=\"M146 78l-5 7m-34 6l6 3\" stroke=\"#64564a\" stroke-width=\"3\"/>\n",
    "right": "<g id=\"human-tool-arm\">\n<!-- Full-hand steel hammer grip. Hammer head is visibly attached to haft. -->\n<rect x=\"179\" y=\"72\" width=\"8\" height=\"117\" fill=\"#9d6d45\" stroke=\"#493a30\" stroke-width=\"3\"/>\n<rect x=\"160\" y=\"62\" width=\"47\" height=\"23\" rx=\"2\" fill=\"#96a6ad\" stroke=\"#334452\" stroke-width=\"5\"/>\n<rect x=\"162\" y=\"66\" width=\"43\" height=\"5\" fill=\"#dee1d3\"/>\n<rect x=\"159\" y=\"113\" width=\"15\" height=\"41\" fill=\"#936d4e\" stroke=\"#40332f\" stroke-width=\"3\"/>\n<rect x=\"170\" y=\"124\" width=\"24\" height=\"17\" rx=\"3\" fill=\"#735449\" stroke=\"#bba184\" stroke-width=\"3\"/>\n</g>",
    "left": "<g id=\"human-offhand-arm\">\n<rect x=\"79\" y=\"111\" width=\"17\" height=\"44\" fill=\"#926d4b\" stroke=\"#3f332e\" stroke-width=\"4\"/>\n<path d=\"M79 145h20v15H79z\" fill=\"#694738\"/>\n<!-- Smith tongs hung from belt, not an impossible second weapon -->\n<path d=\"M107 161L102 185m3-21l8 21\" stroke=\"#aebbc0\" stroke-width=\"4\"/>\n<circle cx=\"107\" cy=\"161\" r=\"4\" fill=\"#ccb380\"/>\n</g>",
    "effect": "<g id=\"human-impact\" opacity=\"0\" fill=\"#ffd57d\">\n<path d=\"M214 117l10-15 4 15 17 2-15 8 6 16-14-11-12 10 5-18-14-9Z\"/>\n<path d=\"M219 91l4-12 6 12Z\" fill=\"#fff5b8\"/>\n</g>",
    "actionName": "human-hammer-swing",
    "motionName": "hammer"
  }
});
function buildHumanOccupation(base,def,bodyId){
 if(typeof base!=="string"||!base.includes('id="inn-left-leg"')||!base.includes('<!-- puff-sleeve tunic and green vest -->'))
  throw Error("Human foundation anchor missing");
 const start=base.indexOf("<!-- puff-sleeve tunic and green vest -->");
 const body=base.slice(0,start)
   .replace('<svg xmlns=','<svg data-foundation-id="standard-human-npc" xmlns=')
   .replace(/<title id="title">[\s\S]*?<\/title>/,`<title id="title">${def.name} — original Gridborn concept</title>`)
   .replace(/<desc id="description">[\s\S]*?<\/desc>/,`<desc id="description">${def.description}</desc>`)
   .replaceAll('inn-body',bodyId).replaceAll('inn-left-leg','human-left-leg').replaceAll('inn-right-leg','human-right-leg');
 return body+def.chest+def.head+def.right+"\n"+def.left+"\n"+def.effect+"\n</g>\n</svg>\n";
}
function motionFor(def){
 const base={
 idle:`#human-body{animation:human-role-idle 3.2s steps(1,end) infinite}#human-tool-arm{transform-origin:166px 125px;animation:human-tool-idle 3.2s steps(1,end) infinite}
@keyframes human-role-idle{0%,100%{transform:translateY(0)}35%{transform:translateY(-2px)}70%{transform:translateY(1px)}}
@keyframes human-tool-idle{0%,100%{transform:rotate(0)}40%{transform:rotate(-3deg)}65%{transform:rotate(2deg)}}`,
 move:`#human-body{animation:human-role-walk 1.2s steps(1,end) infinite}#human-left-leg{transform-origin:115px 160px;animation:human-left-step 1.2s steps(1,end) infinite}#human-right-leg{transform-origin:148px 160px;animation:human-right-step 1.2s steps(1,end) infinite}#human-tool-arm{transform-origin:166px 125px;animation:human-tool-walk 1.2s steps(1,end) infinite}
@keyframes human-role-walk{0%,100%{transform:translate(0,0)}25%{transform:translate(2px,-3px)}65%{transform:translate(-2px,-1px)}}
@keyframes human-left-step{0%,100%{transform:rotate(0)}25%{transform:rotate(-17deg)}65%{transform:rotate(15deg)}}
@keyframes human-right-step{0%,100%{transform:rotate(0)}25%{transform:rotate(16deg)}65%{transform:rotate(-16deg)}}
@keyframes human-tool-walk{0%,100%{transform:rotate(0)}25%{transform:rotate(-5deg)}65%{transform:rotate(4deg)}}`,
 rest:`#human-body{animation:human-role-rest 4s steps(1,end) infinite}#human-tool-arm{transform-origin:166px 125px;animation:human-tool-rest 4s steps(1,end) infinite}
@keyframes human-role-rest{0%,100%{transform:translateY(3px)}55%{transform:translateY(5px)}}
@keyframes human-tool-rest{0%,100%{transform:rotate(11deg)}55%{transform:rotate(14deg)}}`
 };
 base.attack=def.motionName==="spear"
 ?`#human-body{animation:human-spear-brace 1.4s steps(1,end) 1 both}#human-tool-arm{transform-origin:166px 132px;animation:${def.actionName} 1.4s steps(1,end) 1 both}#human-offhand-arm{transform-origin:91px 137px;animation:human-shield-block 1.4s steps(1,end) 1 both}#human-impact{animation:human-impact-hit 1.4s steps(1,end) 1 both}
@keyframes human-spear-brace{0%,100%{transform:translate(0,0)}25%{transform:translate(-4px,0)}54%{transform:translate(3px,-2px)}}
@keyframes ${def.actionName}{0%,100%{transform:rotate(0)}24%{transform:rotate(13deg)}52%,63%{transform:rotate(65deg) translate(6px,-3px)}80%{transform:rotate(12deg)}}
@keyframes human-shield-block{0%,100%{transform:rotate(0)}34%,67%{transform:rotate(-8deg)}}
@keyframes human-impact-hit{0%,39%,70%,100%{opacity:0}52%,61%{opacity:1}}`
 :`#human-body{animation:human-smith-brace 1.4s steps(1,end) 1 both}#human-tool-arm{transform-origin:166px 132px;animation:${def.actionName} 1.4s steps(1,end) 1 both}#human-impact{animation:human-impact-hit 1.4s steps(1,end) 1 both}
@keyframes human-smith-brace{0%,100%{transform:translate(0,0)}20%{transform:translate(-3px,-2px)}56%{transform:translate(2px,0)}}
@keyframes ${def.actionName}{0%,100%{transform:rotate(0)}26%{transform:rotate(-28deg)}52%,66%{transform:rotate(83deg) translate(4px,-2px)}85%{transform:rotate(14deg)}}
@keyframes human-impact-hit{0%,43%,72%,100%{opacity:0}55%,64%{opacity:1}}`;
 return base;
}
const REDUCED="@media(prefers-reduced-motion:reduce){#human-body,#human-left-leg,#human-right-leg,#human-tool-arm,#human-offhand-arm,#human-impact{animation:none!important}#human-impact{opacity:0!important}}";
function renderHumanOccupation(mode,art,def){
 if(!["idle","move","attack","rest"].includes(mode))throw Error("Unsupported Human occupation state: "+mode);
 if(!art.includes('data-foundation-id="standard-human-npc"')||!["human-body","human-left-leg","human-right-leg","human-tool-arm","human-offhand-arm","human-impact"].every(key=>art.includes(`id="${key}"`)))throw Error("Human occupation source rig incomplete");
 const animations=motionFor(def)[mode];
 return art.replace("<svg data-foundation-id=",`<svg data-gridborn-mode="${mode}" data-foundation-id=`)
  .replace('</title>',` — ${mode} motion study</title>`)
  .replace('</desc>',`</desc>\n<style>${animations}\n${REDUCED}</style>`);
}
export {buildHumanOccupation,renderHumanOccupation};
