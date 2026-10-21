/**
 * Visual-only equipment layers used by the shared humanoid preview.
 * These do not define combat mechanics, rights or commercial release status.
 * A normalized recipe is required before any SVG is assembled.
 */
const shape=(d,fill,stroke='none',width=0)=>
  '<path d="'+d+'" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+width+'"/>';
const bar=(x,y,w,h,fill)=>
  '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" fill="'+fill+'"/>';

export function renderSpecialtyBack(recipe) {
  try {
    if(recipe.outfit!=='Ranger field gear')return '';
    const p=recipe.palette;
    // Quiver extends beyond the left shoulder: readable at tabletop size.
    return '<g class="rig-ranger-quiver">'+
      shape('M69 82L91 75 113 143 89 153Z','#263443','#15202c',4)+
      shape('M75 85L88 82 105 139 93 146Z',p.primary)+
      shape('M78 84L88 81 106 140 101 144Z',p.accent)+
      shape('M75 82L68 61M83 79L80 55M91 76L92 60','none',p.metal,4)+
      shape('M67 62L75 61 71 51Z',p.accent)+
      shape('M78 55L85 52 82 44Z',p.accent)+
      shape('M89 58L98 55 91 46Z',p.accent)+
      shape('M86 123L104 118','none','#192633',5)+
      '</g>';
  } catch(error) {
    console.error('Unable to render ranger back equipment',error);
    throw error;
  }
}

export function renderSpecialtyFront(recipe) {
  try {
    const p=recipe.palette;
    if(recipe.outfit==='Rogue leathers') {
      // Asymmetric leather mantle, diagonal bandolier, twin belt pouches.
      return '<g class="rig-rogue-leathers">'+
        shape('M91 103L120 107 141 145 126 152 95 116Z','#202c39','#121c29',4)+
        shape('M93 107L117 112 135 143 127 146 100 116Z',p.primary)+
        shape('M147 108L158 112 121 161 113 157Z',p.accent)+
        shape('M154 113L166 117 126 165 120 160Z','#293a48')+
        bar(96,153,27,24,'#172734')+bar(100,157,21,18,p.primary)+
        bar(144,153,26,24,'#172734')+bar(147,157,19,18,p.primary)+
        bar(111,162,7,7,p.accent)+bar(156,162,7,7,p.accent)+
        shape('M81 101L96 91 107 114 93 131 73 114Z','#182732','#111d2a',3)+
        '</g>';
    }
    if(recipe.outfit==='Ranger field gear') {
      // Broad hunting shoulder, field bandolier, and lower split coat.
      return '<g class="rig-ranger-field-gear">'+
        shape('M92 101L114 108 104 130 77 122 78 109Z','#243b35','#162821',4)+
        shape('M90 104L110 110 99 123 83 118Z',p.primary)+
        shape('M151 105L169 112 176 127 151 128 141 116Z','#243b35','#162821',4)+
        shape('M150 109L166 114 170 124 153 123Z',p.primary)+
        shape('M151 110L120 165 113 163 144 109Z',p.accent)+
        shape('M151 114L125 158','none','#28332e',5)+
        shape('M96 162L116 169 111 203 90 193Z',p.primary,'#1a262d',3)+
        shape('M143 167L164 163 174 194 152 203Z',p.primary,'#1a262d',3)+
        bar(120,153,16,12,p.metal)+bar(126,156,5,7,p.accent)+
        '</g>';
    }
    return '';
  } catch(error) {
    console.error('Unable to render class-specific outerwear',error);
    throw error;
  }
}

export function renderRightDagger(recipe) {
  try {
    if(recipe.weapon!=='Twin daggers')return '';
    const p=recipe.palette;
    return shape('M186 111L198 63 207 52 205 74 195 126Z',p.metal,'#192637',3)+
      shape('M196 64L203 57 195 103Z','#eef1da')+
      bar(181,124,26,7,p.accent)+
      shape('M189 130L194 164','none','#6b4e37',8);
  } catch(error) {
    console.error('Unable to render right-hand dagger',error);
    throw error;
  }
}

export function renderLeftDagger(recipe) {
  try {
    if(recipe.weapon!=='Twin daggers'||recipe.offhand!=='None')return '';
    const p=recipe.palette;
    return shape('M76 118L60 74 52 62 54 88 68 135Z',p.metal,'#192637',3)+
      shape('M58 74L54 67 65 105Z','#eef1da')+
      bar(55,132,26,7,p.accent)+
      shape('M68 140L73 169','none','#6b4e37',8);
  } catch(error) {
    console.error('Unable to render left-hand dagger',error);
    throw error;
  }
}
