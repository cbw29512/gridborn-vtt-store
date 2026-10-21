/** Original Giant Cave Spider: 8 legs, 8 eyes, two body regions, pedipalps.
 * Source-based generator; not a commercial export or VTT compatibility claim.
 */
export const SPIDER_MODES=Object.freeze(['still','idle','move','attack','rest']);
export const renderSpider=function renderSpider(mode='still'){
 const MODES=['still','idle','move','attack','rest'];
 if(!MODES.includes(mode))throw Error('Invalid spider animation mode');
 const rest=mode==='rest',animated=mode!=='still';
 const main='#443e43',shaded='#262936',highlight='#7e695e',amber='#f0ad65',outline='#171e27';
 const P=(d,fill,more='')=>`<path d="${d}" fill="${fill}" ${more}/>`;
 const legs=[];
 for(let side=0;side<2;side++){
  const dir=side===0?-1:1;
  for(let pair=0;pair<4;pair++){
   const n=side*4+pair+1,ax=128+dir*(pair===0?18:pair===3?22:29),ay=[96,112,129,149][pair];
   const dK=[42,37,42,39][pair],dF=[83,89,89,72][pair];
   let kneeX=ax+dir*(rest?22:dK),kneeY=rest?ay+[-3,-3,8,16][pair]:[60,105,163,188][pair];
   let footX=ax+dir*(rest?37:dF),footY=rest?[88,120,159,180][pair]:[31,94,180,211][pair];
   const stagger=(side===0?[0,1,1,0]:[1,0,0,1])[pair]?'b':'a';
   const leg=`<g class="spider-leg spider-leg-${n} spider-phase-${stagger}" data-leg="${n}"
 style="transform-origin:${ax}px ${ay}px;transform-box:view-box">
 ${P(`M${ax} ${ay}L${kneeX} ${kneeY}L${footX} ${footY}`,'none',`stroke="${outline}" stroke-width="14" stroke-linejoin="bevel" stroke-linecap="round"`)}
 ${P(`M${ax} ${ay}L${kneeX} ${kneeY}L${footX} ${footY}`,'none',`stroke="${shaded}" stroke-width="9" stroke-linejoin="bevel" stroke-linecap="round"`)}
 ${P(`M${ax+dir*2} ${ay-3}L${kneeX} ${kneeY-4}L${footX} ${footY}`,'none',`stroke="${pair===0?'#a28c6e':highlight}" stroke-width="3" stroke-linejoin="round" opacity=".92"`)}
 <circle cx="${kneeX}" cy="${kneeY}" r="6" fill="#252833" stroke="#9c8064" stroke-width="2"/>
 ${P(`M${footX-dir*3} ${footY-3}L${footX} ${footY+2}L${footX+dir*4} ${footY-1}`,'none',`stroke="#c2a884" stroke-width="2"`)}
 </g>`;
   legs.push(leg);
  }
 }
 const abdomen=`<g class="spider-abdomen">
 ${P(rest?'M85 124Q90 107 126 109Q165 108 175 134L166 165Q132 187 97 167Z':'M87 127Q81 110 97 97L135 88 171 113 174 152 152 180 101 177 82 150Z',outline)}
 ${P(rest?'M91 127Q94 114 128 115Q158 114 168 136L160 158Q127 177 101 161Z':'M93 128Q89 113 103 103L135 96 165 118 167 149 150 173 106 170 91 149Z',main)}
 ${P(rest?'M107 120L141 115 158 130 150 141 113 149 97 140Z':'M107 112L135 101 157 117 157 134 134 150 103 136Z',highlight)}
 ${P('M112 132L128 122 146 133 131 148Z','#b78c61')}
 ${P('M121 137L128 128 136 137 128 143Z','#ddab76')}
 ${P('M99 147L114 157 109 167M150 157L158 148','none',`stroke="#241f29" stroke-width="6" stroke-linecap="round"`)}
 ${P('M99 150L114 163M144 166L159 151','none',`stroke="#b39370" stroke-width="3"`)}
 <ellipse cx="128" cy="${rest?154:158}" rx="27" ry="12" fill="#1b202a" opacity=".25"/>
 </g>`;
 const ceph=`<g class="spider-cephalothorax">
 ${P(rest?'M101 90L113 77 144 79 157 96 151 126 129 135 105 122Z':'M99 85L113 67 143 69 161 91 153 125 126 141 103 123Z',outline)}
 ${P(rest?'M106 94L117 83 140 84 150 99 145 120 128 128 110 115Z':'M106 91L118 75 139 76 154 95 148 120 127 132 109 118Z','#66554e')}
 ${P(rest?'M113 90L134 83 145 94 130 108 111 108Z':'M113 85L137 75 149 94 135 110 111 108Z','#9a785e')}
 ${P('M119 103L127 97 138 105 128 119Z','#392f31')}
 ${P('M124 97L129 92 133 98 130 106Z','#bc8c62')}
 </g>`;
 const eyes=`<g class="spider-eyes">
 <circle cx="111" cy="95" r="5" fill="${outline}"/><circle cx="144" cy="95" r="5" fill="${outline}"/>
 <circle cx="119" cy="85" r="6" fill="${outline}"/><circle cx="136" cy="85" r="6" fill="${outline}"/>
 <circle cx="121" cy="87" r="3" fill="${amber}"/><circle cx="138" cy="87" r="3" fill="${amber}"/>
 <circle cx="113" cy="96" r="2" fill="#ffd8a0"/><circle cx="145" cy="96" r="2" fill="#ffd8a0"/>
 <circle cx="108" cy="106" r="3" fill="#23252e"/><circle cx="149" cy="106" r="3" fill="#23252e"/>
 <circle cx="116" cy="112" r="3" fill="#28303a"/><circle cx="142" cy="112" r="3" fill="#28303a"/>
 </g>`;
 const mouth=`<g class="spider-mouth">
 <g class="spider-palps">
 ${P('M112 114L104 123 104 135','none',`stroke="${outline}" stroke-width="8" stroke-linecap="round"`)}
 ${P('M144 114L153 124 153 135','none',`stroke="${outline}" stroke-width="8" stroke-linecap="round"`)}
 ${P('M112 114L105 125','none',`stroke="#bd9a77" stroke-width="3"`)}
 ${P('M144 114L152 125','none',`stroke="#bd9a77" stroke-width="3"`)}
 </g>
 <g class="spider-fangs">
 ${P('M116 115L126 137 127 149 120 144 113 130Z','#e5d5b7')}
 ${P('M141 115L130 137 130 149 137 144 144 130Z','#e5d5b7')}
 ${P('M119 119L125 137','none',`stroke="#fff0cf" stroke-width="2"`)}
 ${P('M139 119L132 137','none',`stroke="#fff0cf" stroke-width="2"`)}
 </g>
 </g>`;
 const web=rest?`<g class="spider-rest-web" opacity=".38">
 ${P('M79 157L180 157M91 180L169 180M113 192L145 192M88 166L124 195M168 167L134 196','none',`stroke="#b9bdc1" stroke-width="1.5"`)}
 </g>`:'';
 const css=animated?`<style>
 .spider-body{transform-origin:128px 129px;animation:spider-${mode==='move'?'walk-body':mode==='attack'?'strike-body':mode==='rest'?'rest-breath':'idle-breath'} ${mode==='move'?'1.2s ease-in-out infinite':mode==='attack'?'1.4s ease-in-out 1 both':mode==='rest'?'5s ease-in-out infinite':'3.6s ease-in-out infinite'}}
 .spider-palps,.spider-fangs{transform-origin:128px 115px}
 ${mode==='idle'?`
 .spider-palps{animation:spider-palp-twitch 3.6s ease-in-out infinite}
 .spider-leg-1,.spider-leg-8{animation:spider-leg-settle 3.6s ease-in-out infinite}
 `:''}
 ${mode==='move'?`
 .spider-phase-a{animation:spider-tetrapod-a 1.2s ease-in-out infinite}
 .spider-phase-b{animation:spider-tetrapod-b 1.2s ease-in-out infinite}
 .spider-palps{animation:spider-palp-walk 1.2s ease-in-out infinite}
 `:''}
 ${mode==='attack'?`
 .spider-fangs{animation:spider-fang-jab 1.4s ease-in-out 1 both}
 .spider-palps{animation:spider-palp-strike 1.4s ease-in-out 1 both}
 .spider-leg-1,.spider-leg-2,.spider-leg-5,.spider-leg-6{animation:spider-strike-brace 1.4s ease-in-out 1 both}
 `:''}
 ${mode==='rest'?`
 .spider-palps{animation:spider-rest-palps 5s ease-in-out infinite}
 `:''}
 @keyframes spider-idle-breath{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(2px) scale(1.018)}}
 @keyframes spider-leg-settle{0%,100%{transform:rotate(0)}50%{transform:rotate(4deg)}}
 @keyframes spider-palp-twitch{0%,100%{transform:rotate(-2deg)}50%{transform:rotate(4deg)}}
 @keyframes spider-walk-body{0%,50%,100%{transform:translateY(0)}25%,75%{transform:translateY(-5px)}}
 @keyframes spider-tetrapod-a{0%,100%{transform:rotate(-8deg) translateY(0)}50%{transform:rotate(9deg) translateY(-6px)}}
 @keyframes spider-tetrapod-b{0%,100%{transform:rotate(9deg) translateY(-6px)}50%{transform:rotate(-8deg) translateY(0)}}
 @keyframes spider-palp-walk{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(4deg)}}
 @keyframes spider-strike-body{0%,100%{transform:translateY(0)}24%{transform:translateY(8px)}49%{transform:translateY(-13px)}72%{transform:translateY(-4px)}}
 @keyframes spider-fang-jab{0%,24%,100%{transform:rotate(0)}49%{transform:rotate(15deg) scaleY(1.18)}72%{transform:rotate(-7deg)}}
 @keyframes spider-palp-strike{0%,100%{transform:translateY(0)}49%{transform:translateY(-14px)}}
 @keyframes spider-strike-brace{0%,100%{transform:rotate(0)}49%{transform:rotate(-10deg)}}
 @keyframes spider-rest-breath{0%,100%{transform:translateY(0)}50%{transform:translateY(2px)}}
 @keyframes spider-rest-palps{0%,100%{transform:rotate(0)}50%{transform:rotate(2deg)}}
 @media(prefers-reduced-motion:reduce){
  .spider-body,.spider-leg,.spider-palps,.spider-fangs{animation:none!important}
 }
</style>`:'';
 return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 240" role="img"
 aria-labelledby="title description" shape-rendering="crispEdges"
 class="spider-scene spider-${mode}">
<title id="title">Giant Cave Spider — ${mode} Gridborn original eight-leg study</title>
<desc id="description">Original arachnid token with eight independently segmented legs, visible cephalothorax, rear abdomen, eight small eyes and venom fangs. ${rest?'Folded resting pose with eight legs tucked close.':mode==='move'?'Alternating diagonal tetrapod gait.':mode==='attack'?'One short fang strike with recovery.':'Eight-legged recognizable cave spider.'} Preview only; no VTT export or commercial certification.</desc>
${css}
<ellipse cx="128" cy="204" rx="${rest?72:107}" ry="15" fill="#091019" opacity=".38"/>
<ellipse cx="128" cy="195" rx="${rest?68:108}" ry="${rest?21:29}" fill="none" stroke="#b38e6d" stroke-width="3" opacity=".6"/>
${web}
${legs.slice(0,4).join('\n')}
${legs.slice(4,8).join('\n')}
<g class="spider-body">
${abdomen}
${ceph}
${eyes}
${mouth}
</g>
</svg>\n`;
};
