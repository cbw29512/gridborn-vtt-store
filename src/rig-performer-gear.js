/** Original visual accessory layers for Bard and Monk prebuilt studies.
 * Expects a schema-validated recipe. No combat or licensing semantics.
 */
const path=(d,fill,stroke='none',w=0)=>
  '<path d="'+d+'" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+w+'"/>';
const rect=(x,y,w,h,fill)=>
  '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" fill="'+fill+'"/>';

export function performerBack(r) {
  try {
    if(r.outfit!=='Bard performance coat')return '';
    const p=r.palette;
    // Two flared coat tails project below the normal torso silhouette.
    return '<g class="rig-bard-coat-tails">'+
      path('M92 124L126 148 121 209 97 221 83 207Z',p.primary,'#1c2536',4)+
      path('M134 149L168 124 185 205 161 222 133 211Z',p.primary,'#1c2536',4)+
      path('M95 151L106 204 94 213Z',p.accent)+
      path('M154 153L167 208 177 205Z',p.accent)+
      '</g>';
  } catch(error) {
    console.error('Bard coat-tail render failed',error);
    throw error;
  }
}

export function performerFront(r) {
  try {
    const p=r.palette;
    if(r.outfit==='Bard performance coat'){
      return '<g class="rig-bard-performance-coat">'+
        path('M91 103L127 113 153 103 174 133 150 146 146 162 110 164 103 142 80 133Z',p.primary,'#1e2633',4)+
        path('M106 110L128 130 148 110 141 148 126 155 112 143Z',p.accent)+
        path('M118 116L128 127 135 116 131 141 125 141Z','#f5e0aa')+
        path('M80 121L92 111 102 124 89 143 75 135Z',p.accent)+
        path('M155 113L169 120 183 133 168 145 154 134Z',p.accent)+
        rect(120,146,16,9,'#2b3440')+
        path('M124 147L132 147 135 151 128 155 121 151Z',p.metal)+
        '</g>';
    }
    if(r.outfit==='Monk wraps'){
      return '<g class="rig-monk-wraps">'+
        path('M98 108L124 113 145 109 155 136 143 151 116 149 100 130Z',p.primary,'#1b2531',4)+
        path('M100 113L126 135 145 113','none',p.accent,10)+
        path('M109 113L129 133 144 116','none','#dac4a0',3)+
        path('M96 151L158 151 165 166 93 166Z',p.accent,'#1f2935',4)+
        path('M127 159L145 166 141 218 126 209Z',p.primary,'#202631',3)+
        path('M124 161L111 166 115 208 124 202Z',p.accent)+
        rect(75,139,24,12,p.primary)+rect(158,139,23,12,p.primary)+
        path('M79 152L99 144M160 143L180 151','none',p.accent,4)+
        '</g>';
    }
    return '';
  } catch(error) {
    console.error('Performer/monk silhouette rendering failed',error);
    throw error;
  }
}

export function performerOffhand(r) {
  try {
    if(r.offhand!=='Lute')return '';
    const p=r.palette;
    // A left-hand lute projects beyond the shoulder and has visible strings.
    return '<g class="rig-bard-lute">'+
      path('M63 126L72 71 79 72 75 130Z','#8b6549','#202733',4)+
      path('M65 75L64 58 81 61 81 76Z',p.accent)+
      path('M54 127Q76 109 93 132L96 165Q74 192 55 169Z','#8b5a39','#1b2631',5)+
      path('M60 133Q76 121 89 137L90 162Q74 178 59 164Z','#c08b51')+
      '<circle cx="75" cy="146" r="9" fill="#27303a"/>'+
      rect(63,163,24,5,p.metal)+
      path('M68 79L69 166M72 79L73 166M76 79L77 166M80 79L81 166','none','#ead5ae',1)+
      '</g>';
  } catch(error) {
    console.error('Lute art could not be rendered',error);
    throw error;
  }
}
