/**
 * Collapsed skeleton rest study: bones settle inertly instead of breathing or
 * sitting on a living character's stool. Takes only normalized palette data.
 * Preview geometry, not independently licensed/exported VTT animation.
 */
export function renderSkeletonRest(recipe) {
  try {
    if(recipe.ancestry!=='Skeleton') throw new Error('Skeleton rest requires Skeleton ancestry');
    const bone=recipe.palette.skin;
    const metal=recipe.palette.metal;
    const accent=recipe.palette.accent;
    const seg=(d,width=8)=>'<path d="'+d+'" fill="none" stroke="'+bone+
      '" stroke-width="'+width+'" stroke-linecap="round" stroke-linejoin="round"/>';
    return '<g class="rig-skeleton-rest">'+
      // Abandoned shoulder plate and frayed cloth preserve character identity.
      '<path d="M117 151L153 164 167 182 135 177Z" fill="#364050" stroke="#18232e" stroke-width="4"/>'+
      '<path d="M124 155L149 164 151 170 130 167Z" fill="'+metal+'"/>'+
      '<path d="M159 182L179 187 175 200 152 196Z" fill="'+accent+'"/>'+
      // Skull faces sideways, detached from the normal upright rig silhouette.
      '<g class="rig-skeleton-rest-skull">'+
      '<path d="M61 150Q66 128 89 130L105 142 103 159 92 166 92 176 77 178 71 169 62 165Z" fill="'+bone+
      '" stroke="#26303a" stroke-width="5"/>'+
      '<path d="M74 148L85 143 89 156 76 160Z" fill="#27313a"/>'+
      '<path d="M94 149L100 151 97 160 91 159Z" fill="#27313a"/>'+
      '<path d="M74 165L91 167 91 176 77 175Z" fill="#46515a"/>'+
      seg('M78 168L78 173M84 169L84 175',2)+'</g>'+
      // Distinct articulated ribs on a grounded, horizontal spine.
      '<g class="rig-skeleton-rest-ribs">'+
      seg('M101 164L160 187',7)+
      seg('M117 167Q108 177 122 187',5)+
      seg('M129 172Q120 182 137 192',5)+
      seg('M141 177Q134 186 151 195',5)+
      seg('M119 166Q127 155 139 166',4)+
      seg('M135 174Q147 164 155 177',4)+'</g>'+
      // Arms folded independently toward the map ground.
      '<g class="rig-skeleton-rest-arms">'+
      seg('M115 165L101 187L90 199',7)+seg('M149 176L134 194L121 205',7)+
      seg('M89 199L83 205M90 199L94 207M121 205L115 211M121 205L125 211',3)+
      '</g>'+
      // Two femurs and two lower legs extend in different directions.
      '<g class="rig-skeleton-rest-legs">'+
      '<path d="M153 187Q164 178 175 187L174 198 156 201Z" fill="'+bone+'"/>'+
      seg('M168 195L191 191L211 202',10)+
      seg('M166 200L176 215L152 222',9)+
      seg('M210 203L227 211M211 203L224 205',5)+
      seg('M152 222L137 227M152 222L139 218',5)+
      '</g></g>';
  } catch(error) {
    console.error('Could not render inert skeleton rest study',error);
    throw error;
  }
}
