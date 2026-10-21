/** Shared original Gray Wolf quadruped rig; authored for 3/4 tabletop view.
 * Each limb has its own joint transform; all modes derive from this file.
 * Generated preview SVGs are NOT independently VTT-certified media products.
 */
export const WOLF_MODES=Object.freeze(['still','idle','move','attack','rest']);
export const renderWolf=function renderWolf(mode="still"){
 if(!["still","idle","move","attack","rest"].includes(mode))throw Error("Unknown wolf animation");
 const A = mode!=="still", R=mode==="rest";
 const shape=(d,f,more="")=>`<path d="${d}" fill="${f}" ${more}/>`;
 const rect=(x,y,w,h,f)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${f}"/>`;
 const leg=(name,near,front,rest)=>{
  const x=front?168:100, dx=near?9:-10, y=near?147:132;
  const c=near?"#82979a":"#526a76",hi=near?"#afc0bb":"#829ba0";
  if(rest)return `<g class="wolf-leg wolf-leg-${front?"front":"hind"}-${near?"near":"far"}">
   ${shape(`M${x+dx-18} 158 L${x+dx+5} 162 L${x+dx+8} 179 L${x+dx-7} 184 L${x+dx-24} 177Z`,c)}
   ${shape(`M${x+dx-25} 176L${x+dx+2} 176L${x+dx+8} 185L${x+dx-28} 185Z`,"#324451")}
   ${rect(x+dx-20,177,12,3,hi)}</g>`;
  const shift=front?11:-7;
  const knee=y+21, foot=y+49, x1=x+dx;
  return `<g class="wolf-leg wolf-leg-${front?"front":"hind"}-${near?"near":"far"}">
   ${shape(`M${x1-12} ${y} L${x1+10} ${y-2} L${x1+11+shift/2} ${knee} L${x1+5} ${knee+6} L${x1-11} ${knee+4}Z`,"#25333d")}
   ${shape(`M${x1-9} ${y+1} L${x1+6} ${y} L${x1+8+shift/2} ${knee-1} L${x1-7} ${knee+2}Z`,c)}
   ${shape(`M${x1-5} ${knee-3}L${x1+12} ${knee+2}L${x1+shift+5} ${foot-7}L${x1+shift-9} ${foot-5}Z`,c)}
   ${shape(`M${x1+shift-10} ${foot-8}h25l7 8h-40Z`,"#2a3841")}
   ${rect(x1+shift-7,foot-8,16,4,hi)}
   ${rect(x1+shift-6,foot-1,4,3,"#161f2a")}
   ${rect(x1+shift+2,foot-1,4,3,"#161f2a")}
  </g>`;
 };
 const animStyles= A?`<style>
 .wolf-body{transform-origin:129px 145px;animation:wolf-${mode==="move"?"stride-body":mode==="attack"?"lunge":mode==="rest"?"sleep-breath":"idle-breath"} ${mode==="move"?"1s ease-in-out infinite":mode==="attack"?"1.3s cubic-bezier(.2,.78,.25,1) 1 both":mode==="rest"?"4.8s ease-in-out infinite":"3.2s ease-in-out infinite"}}
 .wolf-tail{transform-origin:83px 135px}
 .wolf-head{transform-origin:185px 129px}
 .wolf-leg{transform-box:view-box}
 .wolf-leg-hind-far{transform-origin:88px 147px}
 .wolf-leg-hind-near{transform-origin:108px 158px}
 .wolf-leg-front-far{transform-origin:156px 138px}
 .wolf-leg-front-near{transform-origin:177px 156px}
 ${mode==="idle"?`
 .wolf-tail{animation:wolf-tail-sway 4.1s ease-in-out infinite}
 .wolf-ear{animation:wolf-ear-twitch 5.1s steps(1,end) infinite}
 .wolf-head{animation:wolf-idle-head 3.2s ease-in-out infinite}
 `:""}
 ${mode==="move"?`
 .wolf-leg-hind-far,.wolf-leg-front-near{animation:wolf-leg-a 1s ease-in-out infinite}
 .wolf-leg-front-far,.wolf-leg-hind-near{animation:wolf-leg-b 1s ease-in-out infinite}
 .wolf-tail{animation:wolf-tail-run 1s ease-in-out infinite}
 .wolf-head{animation:wolf-run-head 1s ease-in-out infinite}
 `:""}
 ${mode==="attack"?`
 .wolf-head{animation:wolf-bite 1.3s ease-in-out 1 both}
 .wolf-tail{animation:wolf-tail-strike 1.3s ease-in-out 1 both}
 .wolf-leg-front-near,.wolf-leg-front-far{animation:wolf-brace 1.3s ease-in-out 1 both}
 `:""}
 ${mode==="rest"?`
 .wolf-tail{animation:wolf-sleep-tail 4.8s ease-in-out infinite}
 .wolf-head{animation:wolf-sleep-head 4.8s ease-in-out infinite}
 `:""}
 @keyframes wolf-idle-breath{0%,100%{transform:translateY(0)}50%{transform:translateY(2px)}}
 @keyframes wolf-idle-head{0%,100%{transform:rotate(0)}50%{transform:rotate(2deg)}}
 @keyframes wolf-tail-sway{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(8deg)}}
 @keyframes wolf-ear-twitch{0%,68%,72%,100%{transform:rotate(0)}69%,71%{transform:rotate(4deg)}}
 @keyframes wolf-stride-body{0%,50%,100%{transform:translateY(0)}25%,75%{transform:translateY(-5px)}}
 @keyframes wolf-leg-a{0%,100%{transform:rotate(-17deg)}50%{transform:rotate(19deg) translateY(-6px)}}
 @keyframes wolf-leg-b{0%,100%{transform:rotate(19deg) translateY(-6px)}50%{transform:rotate(-17deg)}}
 @keyframes wolf-tail-run{0%,100%{transform:rotate(7deg)}50%{transform:rotate(-8deg)}}
 @keyframes wolf-run-head{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(4deg)}}
 @keyframes wolf-lunge{0%,100%{transform:translateX(0)}20%{transform:translateX(-7px)}47%{transform:translate(13px,-8px)}70%{transform:translateX(5px)}}
 @keyframes wolf-bite{0%,22%,100%{transform:rotate(0)}47%{transform:rotate(16deg)}61%{transform:rotate(-9deg)}}
 @keyframes wolf-tail-strike{0%,100%{transform:rotate(0)}45%{transform:rotate(-19deg)}}
 @keyframes wolf-brace{0%,100%{transform:rotate(0)}47%{transform:rotate(-12deg)}}
 @keyframes wolf-sleep-breath{0%,100%{transform:translateY(0)}50%{transform:translateY(2px)}}
 @keyframes wolf-sleep-tail{0%,100%{transform:rotate(0)}50%{transform:rotate(5deg)}}
 @keyframes wolf-sleep-head{0%,100%{transform:translateY(0)}50%{transform:translateY(1px)}}
 @media(prefers-reduced-motion:reduce){
  .wolf-body,.wolf-tail,.wolf-head,.wolf-leg,.wolf-ear{animation:none!important}
 }
 </style>`:"";
 const tail=R?`<g class="wolf-tail">
  ${shape("M84 137L59 147 39 159 55 176 84 162 105 162Z","#273846")}
  ${shape("M82 141L59 151 48 162 60 169 89 155Z","#819397")}
  ${shape("M48 163L60 169 72 161 62 158Z","#c3c6b8")}
 </g>`:`<g class="wolf-tail">
  ${shape("M84 132L61 120 42 100 28 101 33 128 69 150 90 155Z","#24333f")}
  ${shape("M84 133L61 124 40 105 37 106 40 123 71 147 84 149Z","#7d9198")}
  ${shape("M33 102L45 110 44 123 36 120Z","#d8d1bf")}
 </g>`;
 const torso=R?`<g class="wolf-torso">
  ${shape("M75 117Q97 97 136 114L174 132 174 161 145 178 94 173 72 151Z","#24343f")}
  ${shape("M80 119Q110 105 140 122L169 136 168 161 142 173 94 167 78 148Z","#748c94")}
  ${shape("M84 128Q109 116 136 129L145 151 115 161 85 152Z","#a2b7b8")}
  ${shape("M103 154L148 150 158 159 120 167 94 160Z","#d1d0c2")}
 </g>`:`<g class="wolf-torso">
  ${shape("M77 105Q95 94 123 99L167 108 188 130 172 160 111 174 76 157 67 136Z","#24333e")}
  ${shape("M81 109Q101 100 128 103L165 113 180 132 167 155 112 167 81 152 73 135Z","#6e848c")}
  ${shape("M89 116L130 109 158 123 160 144 117 157 86 141Z","#92a6aa")}
  ${shape("M108 133L162 131 151 151 116 163 89 150Z","#d1d4c9")}
  ${shape("M77 110L104 101 102 118 83 127Z","#aab7b6")}
  ${shape("M136 108L166 114 173 129 157 125Z","#566d78")}
 </g>`;
 const head=R?`<g class="wolf-head">
  ${shape("M151 137L172 123 198 131 207 150 192 165 167 167 148 151Z","#263642")}
  ${shape("M154 137L174 128 197 137 201 150 185 161 164 159Z","#8fa6a8")}
  ${shape("M170 135L173 111 187 128 194 130 203 119 202 142Z","#314552")}
  ${shape("M176 122L179 115 186 130Z","#caaca1")}
  ${shape("M183 148L215 145 222 152 205 165 181 164Z","#e6e0cb")}
  ${shape("M213 149L223 152 220 156 211 155Z","#1b2a33")}
  ${shape("M175 147L193 149","#20333c",`stroke="#22323b" stroke-width="3"`)}
  ${shape("M179 149L194 149","none",`stroke="#24323a" stroke-width="3"`)}
 </g>`:`<g class="wolf-head">
  ${shape("M159 93L179 82 198 86 217 107 220 126 210 142 181 151 158 134 153 114Z","#253641")}
  ${shape("M163 99L179 87 197 91 210 108 213 126 203 136 184 144 164 131Z","#899da2")}
  <g class="wolf-ear">
   ${shape("M168 98L164 61 186 78 190 101Z","#293b49")}
   ${shape("M173 90L170 72 182 82 183 96Z","#b48f83")}
   ${shape("M188 92L203 64 207 105 198 109Z","#293b49")}
   ${shape("M192 90L201 75 201 98Z","#bd9991")}
  </g>
  ${shape("M175 118L197 109 213 116 222 125 205 138 181 140Z","#c0c7bb")}
  ${shape("M194 121L221 114 241 124 237 138 219 143 204 139Z","#e0dfd0")}
  ${shape("M231 120L242 123 239 133 231 131Z","#202b33")}
  ${shape("M201 135L222 142 238 137 222 148 208 143Z","#4a4d4a")}
  ${shape("M201 139L219 145 226 143 214 149Z","#b9a79b")}
  ${rect(190,110,11,7,"#263540")}
  ${rect(193,111,4,4,"#e2bb70")}
  ${shape("M170 116L182 114 178 133 166 130Z","#e3e0cf")}
  ${shape("M209 108L213 112 213 119 209 117Z","#586b70")}
 </g>`;
 const ground=`<ellipse cx="132" cy="205" rx="91" ry="13" fill="#08121b" opacity=".31"/>`;
 const baseRing=R?"":`<ellipse cx="133" cy="196" rx="105" ry="27" fill="none" stroke="#d3ae75" stroke-width="3" opacity=".68"/>`;
 // In a rest pose the four folded joints are drawn as separate anatomical limbs.
 const layers=`${ground}${baseRing}
 <g class="wolf-body">
 ${tail}
 ${leg("hind-far",false,false,R)}
 ${leg("front-far",false,true,R)}
 ${torso}
 ${leg("hind-near",true,false,R)}
 ${leg("front-near",true,true,R)}
 ${head}
 </g>`;
 return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 240" shape-rendering="crispEdges"
 role="img" aria-labelledby="title description" class="wolf-scene wolf-${mode}">
<title id="title">Gray Wolf — ${mode==="still"?"static":mode} Gridborn quadruped study</title>
<desc id="description">Original four-legged Gray Wolf with long muzzle, pointed ears, thick tail and four individually drawn paws. ${mode==="rest"?"Curled resting pose.":mode==="move"?"Alternating diagonal-pair trotting gait.":mode==="attack"?"One deliberate forward bite and recovery.":mode==="idle"?"Gentle breathing and ear and tail motion.":"Static anatomy study."} Preview only; not a certified VTT animation or sale-ready asset.</desc>
${animStyles}${layers}
</svg>\n`;
};
