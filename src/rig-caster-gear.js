/** Three clearly differentiated magic-user outfit studies.
 * Visual-only SVG strings from validated immutable appearance recipes.
 */
const path=(d,fill,stroke='none',w=0)=>
  '<path d="'+d+'" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+w+'"/>';
const rect=(x,y,w,h,fill)=>
  '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" fill="'+fill+'"/>';

export function casterBack(r) {
  try {
    const p=r.palette;
    if(r.outfit==='Druid leaf mantle'){
      return '<g class="rig-druid-leaf-back">'+
        path('M87 106L113 123 111 191 78 187 68 167Z','#315743','#172b2b',4)+
        path('M145 122L170 104 190 168 174 193 144 183Z','#466b49','#172b2b',4)+
        path('M82 149L111 178 94 195Z',p.accent)+
        path('M165 148L179 182 155 190Z',p.primary)+'</g>';
    }
    if(r.outfit==='Sorcerer regalia'){
      return '<g class="rig-sorcerer-mantle-back">'+
        path('M89 96L119 119 129 145 141 119 171 96 194 190 162 221 128 190 96 220 64 191Z',p.primary,'#1e2938',5)+
        path('M89 121L105 185 91 207 73 187Z',p.accent)+
        path('M164 119L185 186 166 210 153 180Z',p.accent)+
        '</g>';
    }
    if(r.outfit==='Warlock pact coat'){
      return '<g class="rig-warlock-pact-back">'+
        path('M89 101L121 133 113 216 78 225 68 186Z','#242033','#141b2d',5)+
        path('M144 132L169 102 191 189 172 225 141 215Z','#34243b','#141b2d',5)+
        path('M86 138L104 201 86 212Z',p.accent)+
        path('M156 146L174 208 181 201Z',p.primary)+
        '</g>';
    }
    return '';
  } catch(error) {
    console.error('Caster back silhouette failed',error);
    throw error;
  }
}

export function casterFront(r) {
  try {
    const p=r.palette;
    if(r.outfit==='Druid leaf mantle'){
      return '<g class="rig-druid-leaf-mantle">'+
        path('M87 98L115 103 122 127 98 146 70 128Z','#284d3c','#172c28',4)+
        path('M145 102L171 97 188 127 158 146 135 126Z','#456e45','#172c28',4)+
        path('M79 119L102 139 88 151Z',p.accent)+
        path('M178 119L158 139 169 150Z',p.accent)+
        path('M111 112L131 140 147 114','none',p.accent,7)+
        path('M115 139L129 130 141 139 130 151Z',p.metal)+
        path('M98 162L115 170 108 200 93 187Z',p.primary)+
        path('M151 164L168 187 155 204 142 171Z','#375c42')+
        '</g>';
    }
    if(r.outfit==='Sorcerer regalia'){
      return '<g class="rig-sorcerer-regalia">'+
        path('M92 102L112 93 129 125 145 93 167 102 185 139 160 151 144 136 129 168 112 136 94 151 74 139Z',p.primary,'#1c2838',4)+
        path('M91 112L112 101 124 132 107 144Z',p.accent)+
        path('M147 100L165 111 151 145 132 133Z',p.accent)+
        path('M111 149L128 164 145 149 160 197 128 218 97 197Z',p.primary)+
        path('M120 141L128 129 136 141 128 150Z',p.metal)+
        path('M128 130L128 151M118 141H138','none','#f7e6bf',2)+
        '</g>';
    }
    if(r.outfit==='Warlock pact coat'){
      return '<g class="rig-warlock-pact-coat">'+
        path('M95 91L127 120 158 90 182 121 152 146 145 165 111 165 104 147 74 121Z','#26243a','#101925',5)+
        path('M93 99L120 126 108 141 77 118Z',p.primary)+
        path('M160 100L138 125 151 142 177 118Z',p.primary)+
        path('M106 148L129 159 150 148 165 199 140 219 128 211 111 220 94 201Z',p.primary,'#101925',4)+
        path('M120 145L129 138 138 145 134 156 124 156Z',p.accent)+
        path('M126 158L129 190 132 157','none',p.metal,3)+
        '<circle cx="129" cy="177" r="10" fill="none" stroke="'+p.accent+'" stroke-width="3"/>'+
        path('M129 165L136 181 122 181Z','none',p.accent,2)+
        '</g>';
    }
    return '';
  } catch(error) {
    console.error('Caster front silhouette failed',error);
    throw error;
  }
}

export function casterWeapon(r) {
  try {
    if(r.outfit!=='Druid leaf mantle'||r.weapon!=='Staff')return '';
    const p=r.palette;
    // Branch and leaf shapes extend the standard staff, remaining right-hand rig children.
    return '<g class="rig-druid-living-staff">'+
      path('M186 84Q210 59 207 39M188 92Q175 70 169 63','none','#785b3b',6)+
      path('M205 60Q218 42 221 54Q217 67 205 60Z','#4d8056')+
      path('M171 64Q158 52 153 62Q160 74 171 64Z',p.primary)+
      path('M197 70Q200 55 211 53','none',p.accent,2)+
      '</g>';
  } catch(error) {
    console.error('Living staff detail failed',error);
    throw error;
  }
}
