/** Original reusable winged quadrupedal dragon rig — art studies only, never published as sale-ready. */
export const DRAGON_PALETTES=Object.freeze({
  "Red": {
    "body": "#a13a34",
    "belly": "#db9c69",
    "wing": "#ba5944",
    "ridge": "#f0ad65",
    "horn": "#392633",
    "eye": "#fff0a7",
    "breath": "#ffb03b",
    "shape": "swept",
    "element": "fire"
  },
  "Green": {
    "body": "#327657",
    "belly": "#a3bc6b",
    "wing": "#408f64",
    "ridge": "#c8da83",
    "horn": "#24453b",
    "eye": "#ffdb65",
    "breath": "#9ddb62",
    "shape": "frill",
    "element": "poison"
  },
  "Gold": {
    "body": "#bd8330",
    "belly": "#f4d68d",
    "wing": "#dfa94b",
    "ridge": "#fff0ac",
    "horn": "#ebd595",
    "eye": "#fff9d5",
    "breath": "#ffda63",
    "shape": "antler",
    "element": "fire"
  },
  "Black": {
    "body": "#282f39",
    "belly": "#6c7372",
    "wing": "#404a54",
    "ridge": "#afc0a6",
    "horn": "#c7bda2",
    "eye": "#d4ffae",
    "breath": "#9dc966",
    "shape": "forked",
    "element": "acid"
  },
  "Blue": {
    "body": "#295da4",
    "belly": "#98b5ce",
    "wing": "#357bc3",
    "ridge": "#a4d2f4",
    "horn": "#2a3a55",
    "eye": "#fff2bd",
    "breath": "#96deff",
    "shape": "lightning-crest",
    "element": "lightning"
  },
  "White": {
    "body": "#dbe7e8",
    "belly": "#fbf6df",
    "wing": "#a8cdd9",
    "ridge": "#e6f7ff",
    "horn": "#6e8a99",
    "eye": "#9cf0ff",
    "breath": "#d5faff",
    "shape": "ice-spines",
    "element": "cold"
  },
  "Brass": {
    "body": "#b67840",
    "belly": "#e7c087",
    "wing": "#c49054",
    "ridge": "#f6d99a",
    "horn": "#8d5739",
    "eye": "#fff7c9",
    "breath": "#ffa14e",
    "shape": "ram",
    "element": "fire"
  },
  "Bronze": {
    "body": "#43817c",
    "belly": "#b5b485",
    "wing": "#5d9e92",
    "ridge": "#d7cd8c",
    "horn": "#2c554b",
    "eye": "#fff2af",
    "breath": "#b0f3ff",
    "shape": "finback",
    "element": "lightning"
  },
  "Copper": {
    "body": "#a65e3e",
    "belly": "#e5ab83",
    "wing": "#bd7952",
    "ridge": "#f2c3a0",
    "horn": "#5b4538",
    "eye": "#e3ffae",
    "breath": "#9edb91",
    "shape": "curl",
    "element": "acid"
  },
  "Silver": {
    "body": "#aebfcf",
    "belly": "#f4f5ef",
    "wing": "#a3b2ca",
    "ridge": "#fff9ee",
    "horn": "#637a91",
    "eye": "#d3f4ff",
    "breath": "#d7f7ff",
    "shape": "feather",
    "element": "cold"
  }
});
export const DRAGON_AGE_SCALES=Object.freeze({"wyrmling":0.66,"young":0.86,"adult":1,"ancient":1.06});
const MOTION=Object.freeze({
  "idle": "#dragon-core{animation:dragon-breathe 3.2s steps(1,end) infinite}#dragon-tail{transform-origin:91px 151px;animation:dragon-tail-sway 3.2s steps(1,end) infinite}#dragon-wing-near{transform-origin:120px 106px;animation:dragon-wing-rest 3.2s steps(1,end) infinite}\n@keyframes dragon-breathe{0%,100%{transform:translateY(0)}35%{transform:translateY(-2px)}68%{transform:translateY(1px)}}\n@keyframes dragon-tail-sway{0%,100%{transform:rotate(0)}35%{transform:rotate(3deg)}68%{transform:rotate(-3deg)}}\n@keyframes dragon-wing-rest{0%,100%{transform:rotate(0)}35%{transform:rotate(-4deg)}68%{transform:rotate(2deg)}}",
  "move": "#dragon-core{animation:dragon-walk 1.2s steps(1,end) infinite}#dragon-front-near{transform-origin:157px 154px;animation:dragon-front-stride 1.2s steps(1,end) infinite}#dragon-hind-near{transform-origin:100px 149px;animation:dragon-hind-stride 1.2s steps(1,end) infinite}#dragon-front-far{transform-origin:171px 152px;animation:dragon-hind-stride 1.2s steps(1,end) infinite}#dragon-hind-far{transform-origin:121px 155px;animation:dragon-front-stride 1.2s steps(1,end) infinite}#dragon-tail{transform-origin:91px 151px;animation:dragon-march-tail 1.2s steps(1,end) infinite}\n@keyframes dragon-walk{0%,100%{transform:translate(0,0)}25%{transform:translate(3px,-2px)}60%{transform:translate(-2px,0)}}\n@keyframes dragon-front-stride{0%,100%{transform:rotate(0)}25%{transform:rotate(16deg)}60%{transform:rotate(-13deg)}}\n@keyframes dragon-hind-stride{0%,100%{transform:rotate(0)}25%{transform:rotate(-16deg)}60%{transform:rotate(15deg)}}\n@keyframes dragon-march-tail{0%,100%{transform:rotate(0)}25%{transform:rotate(-7deg)}60%{transform:rotate(5deg)}}",
  "attack": "#dragon-head{transform-origin:180px 122px;animation:dragon-exhale 1.4s steps(1,end) 1 both}#dragon-mouth{transform-origin:204px 125px;animation:dragon-open-jaws 1.4s steps(1,end) 1 both}#dragon-breath{animation:dragon-release 1.4s steps(1,end) 1 both}#dragon-wing-near{transform-origin:120px 106px;animation:dragon-wing-brace 1.4s steps(1,end) 1 both}\n@keyframes dragon-exhale{0%,100%{transform:rotate(0)}23%{transform:rotate(-6deg)}52%,65%{transform:rotate(5deg)}}\n@keyframes dragon-open-jaws{0%,100%{transform:rotate(0)}34%,68%{transform:rotate(10deg)}}\n@keyframes dragon-wing-brace{0%,100%{transform:rotate(0)}35%,67%{transform:rotate(-11deg)}}\n@keyframes dragon-release{0%,38%,79%,100%{opacity:0;transform:translate(0,0) scale(.5)}49%,62%{opacity:1;transform:translate(9px,-2px) scale(1)}}",
  "rest": "#dragon-head{transform-origin:180px 122px;animation:dragon-head-settle 4s steps(1,end) infinite}#dragon-wing-near{transform-origin:120px 106px;animation:dragon-fold-wings 4s steps(1,end) infinite}#dragon-tail{transform-origin:91px 151px;animation:dragon-tail-rest 4s steps(1,end) infinite}\n@keyframes dragon-head-settle{0%,100%{transform:translate(-5px,8px)}52%{transform:translate(-5px,10px)}}\n@keyframes dragon-fold-wings{0%,100%{transform:rotate(-24deg)}52%{transform:rotate(-22deg)}}\n@keyframes dragon-tail-rest{0%,100%{transform:rotate(-6deg)}52%{transform:rotate(-8deg)}}"
});
const REDUCED="@media(prefers-reduced-motion:reduce){#dragon-core,#dragon-tail,#dragon-wing-near,#dragon-head,#dragon-mouth,#dragon-breath,#dragon-front-near,#dragon-hind-near,#dragon-front-far,#dragon-hind-far{animation:none!important}#dragon-breath{opacity:0!important}}";
function crownMarkup(p){
 if(p.shape==="forked")return `<path d="M182 93L156 64 174 75 160 49 190 79Z" fill="${p.horn}" stroke="#29303a" stroke-width="3"/><path d="M201 91L205 56 215 70 225 59 220 91Z" fill="${p.horn}" stroke="#29303a" stroke-width="3"/>`;
 if(p.shape==="lightning-crest")return `<path d="M188 92L189 45 201 57 198 88Z" fill="${p.horn}" stroke="${p.ridge}" stroke-width="3"/><path d="M204 88L221 70 213 94Z" fill="${p.ridge}"/>`;
 if(p.shape==="ice-spines")return `<path d="M178 97L173 79 186 87 184 61 194 82 203 57 206 89 219 75 215 96Z" fill="${p.ridge}" stroke="${p.horn}" stroke-width="3"/>`;
 if(p.shape==="ram")return `<path d="M181 91Q161 83 161 67Q161 50 178 52L184 65Q168 61 172 76L191 90Z" fill="${p.horn}" stroke="${p.ridge}" stroke-width="3"/><path d="M208 91Q219 80 224 89Q226 101 212 98Z" fill="${p.horn}"/>`;
 if(p.shape==="finback")return `<path d="M171 103L164 78 180 86 173 59 191 80 196 54 205 88Z" fill="${p.ridge}" stroke="${p.horn}" stroke-width="3"/><path d="M206 88L216 73 215 94Z" fill="${p.horn}"/>`;
 if(p.shape==="curl")return `<path d="M183 89Q155 66 166 52Q176 42 188 53Q173 53 176 66Q177 78 197 89Z" fill="${p.horn}" stroke="${p.ridge}" stroke-width="3"/><path d="M207 86Q218 58 230 73Q231 86 216 93Z" fill="${p.horn}"/>`;
 if(p.shape==="feather")return `<path d="M175 97L161 87 175 84 169 67 187 77 184 51 202 79 210 62 215 88Z" fill="${p.ridge}" stroke="${p.horn}" stroke-width="3"/><path d="M212 91L231 76 224 97Z" fill="${p.horn}"/>`;
 if(p.shape==="swept")return `<path d="M183 88L172 62 191 75 204 92Z" fill="${p.horn}" stroke="#261d2a" stroke-width="3"/><path d="M204 87L204 64 218 77 217 94Z" fill="${p.horn}" stroke="#261d2a" stroke-width="3"/>`;
 if(p.shape==="frill")return `<path d="M178 102L158 89 176 88 164 69 187 81 189 64 206 87Z" fill="${p.ridge}" stroke="${p.horn}" stroke-width="4"/><path d="M194 89L186 67 210 84Z" fill="${p.horn}"/>`;
 return `<path d="M183 91Q167 71 168 55L177 68 184 62 185 52 195 75 200 86Z" fill="${p.horn}" stroke="#76551f" stroke-width="3"/><path d="M206 89Q213 70 224 66L219 82 230 81 217 95Z" fill="${p.horn}" stroke="#76551f" stroke-width="3"/><path d="M212 128Q220 148 238 135" fill="none" stroke="${p.ridge}" stroke-width="3"/>`;
}
function breathMarkup(p){
 if(p.element==="acid")return `<path d="M223 123Q237 116 241 129L235 144 229 133Z"/><circle cx="247" cy="132" r="5"/><path d="M252 115Q261 124 256 133Q250 129 252 115Z"/>`;
 if(p.element==="cold")return `<path d="M226 124L241 110 239 120 255 112 247 127 259 134 241 133 234 146Z"/><path d="M232 130L249 119M241 136L242 114" fill="none" stroke="${p.ridge}" stroke-width="3"/>`;
 if(p.element==="lightning")return `<path d="M225 125L238 106 235 123 250 112 243 130 256 122 238 146 241 130Z"/><path d="M232 137L247 116" fill="none" stroke="${p.ridge}" stroke-width="3"/>`;
 if(p.element==="poison")return `<circle cx="237" cy="115" r="12"/><circle cx="251" cy="107" r="9"/><circle cx="248" cy="133" r="10"/><circle cx="225" cy="129" r="7"/>`;
 return `<path d="M226 118Q235 94 239 108L247 96 247 111 257 103 253 135 242 141 237 131 229 136Z"/><path d="M235 121L245 111 246 130Z" fill="${p.ridge}"/>`;
}
export function dragonArtwork(species,age,mode="still"){
 const p=DRAGON_PALETTES[species],scale=DRAGON_AGE_SCALES[age];if(!p||!scale)throw Error("Unknown dragon species or age");
 if(!["still","idle","move","attack","rest"].includes(mode))throw Error("Unsupported dragon state");
 const t=(128*(1-scale)).toFixed(2),y=(209*(1-scale)).toFixed(2);
 const status=mode==="still"?"":` data-gridborn-mode="${mode}"`;
 const style=mode==="still"?"":`<style>${MOTION[mode]}\n${REDUCED}</style>`;
 return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 240" role="img" aria-labelledby="title description" shape-rendering="crispEdges"${status} data-foundation-id="western-four-legged-winged-dragon" data-dragon-species="${species}" data-dragon-age="${age}">
<title id="title">Young ${species} Dragon — original Gridborn ${mode} art study</title>
<desc id="description">Original side-profile six-limbed fantasy dragon, four articulated legs, two membranous wings, tail, horns, readable eye and species-specific ${p.element} breath. Research and release approval pending.</desc>
${style}
<ellipse cx="126" cy="213" rx="84" ry="11" fill="#101522" opacity=".27"/>
<g id="dragon-family" transform="translate(${t} ${y}) scale(${scale})">
<g id="dragon-core">
<g id="dragon-tail"><path d="M92 150Q55 152 35 174Q16 186 7 163Q20 178 26 162Q48 139 92 135Z" fill="${p.body}" stroke="#2b2934" stroke-width="5"/><path d="M49 154L44 138 58 148 71 131 73 146Z" fill="${p.ridge}"/></g>
<g id="dragon-wing-far"><path d="M120 122L101 65 89 39 68 58 56 39 39 68 84 102 98 125Z" fill="${p.wing}" stroke="#2b2934" stroke-width="5"/><path d="M120 122L89 39M120 122L56 39M120 122L39 68" fill="none" stroke="${p.ridge}" stroke-width="3" opacity=".65"/></g>
<g id="dragon-hind-far"><path d="M117 145L130 155 133 188 119 201 104 201 115 181 102 169Z" fill="${p.body}" stroke="#2b2934" stroke-width="5"/><path d="M102 201L112 195 117 201 124 195" fill="none" stroke="${p.horn}" stroke-width="4"/></g>
<g id="dragon-front-far"><path d="M164 150L178 160 180 188 169 204 150 202 163 186 152 169Z" fill="${p.body}" stroke="#2b2934" stroke-width="5"/><path d="M152 203L160 194 169 202 175 195" fill="none" stroke="${p.horn}" stroke-width="4"/></g>
<g id="dragon-body"><path d="M87 123Q108 104 155 114Q181 118 186 145Q179 164 151 168L100 166Q80 154 87 123Z" fill="${p.body}" stroke="#2b2934" stroke-width="5"/><path d="M93 148Q132 160 177 141L164 162 110 164Z" fill="${p.belly}"/><path d="M95 124L108 112 115 121 128 111 138 122 150 115 161 128" fill="none" stroke="${p.ridge}" stroke-width="4"/><path d="M118 134L129 128 137 135M141 141L152 134 160 143" stroke="${p.ridge}" stroke-width="3" fill="none" opacity=".78"/></g>
<g id="dragon-wing-near"><path d="M119 118L113 58 95 27 80 50 63 33 45 65 71 87 88 84 103 123Z" fill="${p.wing}" stroke="#2b2934" stroke-width="5"/><path d="M119 118L95 27M119 118L63 33M119 118L45 65" stroke="${p.ridge}" stroke-width="3" fill="none" opacity=".73"/><path d="M119 118L103 114" stroke="${p.horn}" stroke-width="5"/></g>
<g id="dragon-hind-near"><path d="M98 147L116 151 120 172 109 196 89 202 75 196 96 181 88 165Z" fill="${p.body}" stroke="#2b2934" stroke-width="5"/><path d="M76 197L85 191 93 199 103 191" fill="none" stroke="${p.horn}" stroke-width="4"/><path d="M94 161L110 170" fill="none" stroke="${p.ridge}" stroke-width="4"/></g>
<g id="dragon-front-near"><path d="M155 145L171 154 175 174 163 198 143 205 135 196 151 183 146 163Z" fill="${p.body}" stroke="#2b2934" stroke-width="5"/><path d="M136 197L145 190 153 200 163 192" fill="none" stroke="${p.horn}" stroke-width="4"/><path d="M151 163L167 171" fill="none" stroke="${p.ridge}" stroke-width="4"/></g>
<g id="dragon-neck"><path d="M160 123Q175 103 190 98L206 104 200 134 177 151 168 146Z" fill="${p.body}" stroke="#2b2934" stroke-width="5"/><path d="M176 143L198 118 198 132 183 147Z" fill="${p.belly}"/><path d="M171 118L179 109 182 117 192 103" fill="none" stroke="${p.ridge}" stroke-width="4"/></g>
<g id="dragon-head"><g id="dragon-horns">${crownMarkup(p)}</g><path d="M181 100Q199 88 218 102L226 111 245 118 241 129 218 129 209 137 193 131 181 118Z" fill="${p.body}" stroke="#2b2934" stroke-width="5"/><path d="M202 112L220 108 221 119 207 121Z" fill="${p.belly}"/><path d="M209 108L218 108 215 114 210 114Z" fill="${p.eye}" stroke="#302830" stroke-width="2"/><circle cx="214" cy="110" r="2" fill="#242132"/><path d="M233 118L237 120" stroke="${p.horn}" stroke-width="4"/><g id="dragon-mouth"><path d="M213 130L238 129 232 137 221 136Z" fill="${p.horn}" stroke="#2b2934" stroke-width="3"/><path d="M219 131L223 135 227 131 231 134" fill="none" stroke="#fff2d1" stroke-width="2"/></g></g>
</g>
<g id="dragon-breath" opacity="0" fill="${p.breath}">${breathMarkup(p)}</g>
</g>
</svg>
`;
}
export const DRAGON_MODES=Object.freeze(['still','idle','move','attack','rest']);
