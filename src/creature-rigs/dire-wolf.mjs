/** Dire Wolf reuses each original Gray Wolf four-legged motion source; no extra body. */
export const DIRE_WOLF_MODES=Object.freeze(["still","idle","move","attack","rest"]);
const palettes=Object.freeze({
  "#24333f": "#302b31",
  "#24333e": "#302b31",
  "#25333d": "#302b31",
  "#253641": "#312d34",
  "#263642": "#312d34",
  "#526a76": "#5c4d4e",
  "#82979a": "#837069",
  "#afc0bb": "#b59e8a",
  "#6e848c": "#74625a",
  "#92a6aa": "#9d8774",
  "#d1d4c9": "#c7b69d",
  "#aab7b6": "#b4a086",
  "#566d78": "#51464b",
  "#7d9198": "#7b6660",
  "#899da2": "#a18c79",
  "#293b49": "#38323a",
  "#273846": "#42373d",
  "#819397": "#837066",
  "#24343f": "#383039",
  "#748c94": "#76645f",
  "#a2b7b8": "#a7947f",
  "#d1d0c2": "#c8b89f",
  "#e0dfd0": "#ead7b6",
  "#e6e0cb": "#e9d9bd",
  "#e2bb70": "#ffce64"
});
function renderDireWolf(mode,raw){
 if(!["still","idle","move","attack","rest"].includes(mode))throw Error("Dire Wolf mode not supported: "+mode);
 if(typeof raw!=="string"||!raw.includes('class="wolf-body"')||!raw.includes('class="wolf-head"')||
    !["wolf-leg-hind-near","wolf-leg-front-far","wolf-leg-front-near","wolf-leg-hind-far"].every(x=>raw.includes(x)))throw Error("Missing shared wolf skeleton");
 let s=raw.replaceAll("Gray Wolf","Dire Wolf");
 for(const [from,to] of Object.entries(palettes))s=s.replaceAll(from,to);
 s=s.replace('class="wolf-scene ',`data-foundation-id="gray-wolf-quadruped" data-dire-mode="${mode}" class="wolf-scene dire-wolf `);
 const layer='<g class="dire-scale" transform="translate(-8 -8) scale(1.06)">\n <g class="wolf-body">';
 if(!s.includes(' <g class="wolf-body">'))throw Error("Missing wolf body root");
 s=s.replace(' <g class="wolf-body">',' '+layer);
 const ruff=mode==="rest"
  ?`<g class="dire-mane"><path d="M133 113L143 104 149 122 157 117 170 135 160 152 149 165 143 152 137 159 132 143Z" fill="#4b3b3e" stroke="#2d2930" stroke-width="3"/><path d="M145 120l11 20-12 14" fill="none" stroke="#b79c82" stroke-width="5"/></g>`
  :`<g class="dire-mane"><path d="M137 109L147 91 155 107 161 98 168 118 178 119 177 142 167 160 158 145 151 163 141 143 131 132Z" fill="#473a3b" stroke="#292a33" stroke-width="4"/><path d="M145 108L155 127 149 144 164 135 166 146" fill="none" stroke="#b79b81" stroke-width="5"/></g>`;
 const ruffAnchor=' <g class="wolf-leg wolf-leg-hind-near">';
 if(!s.includes(ruffAnchor))throw Error("Missing wolf shoulder layer");
 s=s.replace(ruffAnchor,` ${ruff}\n`+ruffAnchor);
 const face=mode==="rest"
  ?`<path d="M180 133l7-5 6 5" fill="none" stroke="#3a3336" stroke-width="3"/>`
  :`<path d="M187 100l10 17-9 5" fill="none" stroke="#e5c4a0" stroke-width="4"/><path d="M214 143l5 11 6-12" fill="#f3e9d0" stroke="#493b37" stroke-width="2"/><path d="M223 142l6 8 5-11" fill="#f3e9d0" stroke="#493b37" stroke-width="2"/>`;
 const end='\n </g>\n </g>\n</svg>';
 if(!s.includes(end))throw Error("Missing base head enclosure");
 s=s.replace(end,`\n ${face}${end}`);
 const close='\n </g>\n</svg>';
 if(!s.includes(close))throw Error("Missing body closing");
 s=s.replace(close,'\n </g>\n </g>\n</svg>');
 s=s.replace(/Original four-legged Dire Wolf/,"A broader-shouldered Dire Wolf derived from original Gray Wolf anatomy with heavier ruff, long fangs, dark brindle coat and the same four independent legs");
 if(!s.includes('data-foundation-id="gray-wolf-quadruped"')||!s.includes('class="dire-mane"'))throw Error("Dire study anatomy incomplete");
 return s;
}
export {renderDireWolf};
