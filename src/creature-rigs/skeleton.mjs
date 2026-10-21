/** Skeleton Warrior original static art -> 4 independent SVG prototypes.
 * Rest is a collapsed corpse, never a breathing humanoid.
 * Deterministic generation detects source changes without editing original art.
 */
export const SKELETON_STATES=Object.freeze(['idle','move','attack','rest']);
export const renderSkeleton=function renderSkeleton(mode, source) {
  const modes=['idle','move','attack','rest'];
  if(!modes.includes(mode))throw Error('Unsupported Skeleton Warrior state: '+mode);
  if(typeof source!=='string'||!source.includes('<g class="bone-ribcage">')||!source.includes('<g class="bone-leg-left">')||!source.includes('<g class="bone-blade">')||!source.includes('<g class="bone-skull">')||!source.endsWith('</svg>\n'))throw Error('Skeleton source artwork changed; review rig anchors');
  const gait=`.bone-assembly{animation:bone-shuffle-body 1.2s steps(1,end) infinite}
.bone-leg-left{transform-origin:112px 156px;animation:bone-shuffle-left 1.2s steps(1,end) infinite}
.bone-leg-right{transform-origin:148px 156px;animation:bone-shuffle-right 1.2s steps(1,end) infinite}
.bone-cape{animation:bone-shuffle-cape 1.2s steps(1,end) infinite}
.bone-arm-left,.bone-shield{transform-origin:100px 110px;animation:bone-shuffle-shield 1.2s steps(1,end) infinite}
.bone-arm-right,.bone-blade{transform-origin:157px 110px;animation:bone-shuffle-blade 1.2s steps(1,end) infinite}
@keyframes bone-shuffle-body{0%,8%,92%,100%{transform:translate(0,0)}25%{transform:translate(-3px,1px)}50%{transform:translate(1px,-2px)}75%{transform:translate(3px,1px)}}
@keyframes bone-shuffle-left{0%,8%,92%,100%{transform:rotate(0)}25%{transform:rotate(-14deg)}50%{transform:rotate(7deg)}75%{transform:rotate(12deg)}}
@keyframes bone-shuffle-right{0%,8%,92%,100%{transform:rotate(0)}25%{transform:rotate(13deg)}50%{transform:rotate(-9deg)}75%{transform:rotate(-13deg)}}
@keyframes bone-shuffle-cape{0%,8%,92%,100%{transform:translateX(0)}25%{transform:translateX(4px)}50%{transform:translateX(-2px)}75%{transform:translateX(-4px)}}
@keyframes bone-shuffle-shield{0%,8%,92%,100%{transform:rotate(0)}25%{transform:rotate(5deg)}50%{transform:rotate(-6deg)}75%{transform:rotate(-3deg)}}
@keyframes bone-shuffle-blade{0%,8%,92%,100%{transform:rotate(0)}25%{transform:rotate(-4deg)}50%{transform:rotate(5deg)}75%{transform:rotate(7deg)}}`;
  const idle=`.bone-skull{transform-origin:129px 105px;animation:bone-idle-skull 3s steps(1,end) infinite}
.bone-arm-left,.bone-shield{transform-origin:100px 110px;animation:bone-idle-guard 3s steps(1,end) infinite}
.bone-arm-right,.bone-blade{transform-origin:157px 110px;animation:bone-idle-sword 3s steps(1,end) infinite}
.bone-cape{animation:bone-idle-cloth 3s steps(1,end) infinite}
@keyframes bone-idle-skull{0%,12%,88%,100%{transform:rotate(0)}32%{transform:rotate(-3deg)}65%{transform:rotate(2deg)}}
@keyframes bone-idle-guard{0%,12%,88%,100%{transform:rotate(0)}32%{transform:rotate(3deg)}65%{transform:rotate(-2deg)}}
@keyframes bone-idle-sword{0%,12%,88%,100%{transform:rotate(0)}32%{transform:rotate(-4deg)}65%{transform:rotate(3deg)}}
@keyframes bone-idle-cloth{0%,12%,88%,100%{transform:translateX(0)}32%{transform:translateX(2px)}65%{transform:translateX(-2px)}}`;
  const attack=`.bone-assembly{animation:bone-attack-lunge 1.4s steps(1,end) 1 both}
.bone-arm-right,.bone-blade{transform-origin:157px 110px;animation:bone-attack-sword 1.4s steps(1,end) 1 both}
.bone-arm-left,.bone-shield{transform-origin:100px 110px;animation:bone-attack-block 1.4s steps(1,end) 1 both}
.bone-skull{transform-origin:129px 105px;animation:bone-attack-head 1.4s steps(1,end) 1 both}
@keyframes bone-attack-lunge{0%,100%{transform:translate(0,0)}21%{transform:translate(3px,0)}49%{transform:translate(-11px,-3px)}72%{transform:translate(-4px,0)}}
@keyframes bone-attack-sword{0%,100%{transform:rotate(0)}21%{transform:rotate(-49deg)}49%{transform:rotate(61deg)}72%{transform:rotate(17deg)}}
@keyframes bone-attack-block{0%,100%{transform:rotate(0)}21%{transform:rotate(-11deg)}49%{transform:rotate(13deg)}72%{transform:rotate(6deg)}}
@keyframes bone-attack-head{0%,100%{transform:rotate(0)}21%{transform:rotate(5deg)}49%{transform:rotate(-6deg)}}`;
  const rest=`/* Corpse pose: all bones stay immobile. Only a faint eye-socket glimmer varies. */
.bone-skull{animation:bone-inert-glimmer 4s steps(1,end) infinite}
@keyframes bone-inert-glimmer{0%,20%,70%,100%{opacity:1}40%,52%{opacity:.90}}`;
  const animations={idle,move:gait,attack,rest};
  const reduce='@media(prefers-reduced-motion:reduce){.bone-assembly,.bone-skull,.bone-cape,.bone-leg-left,.bone-leg-right,.bone-arm-left,.bone-arm-right,.bone-shield,.bone-blade{animation:none!important}}';
  const description={
    idle:'Undead remains upright and shifts skull, guard and sword jerkily, without breathing.',
    move:'Undead shuffles with opposing articulated legs and synchronized sword and shield motion.',
    attack:'One sudden sword windup and downward strike, then resets to guarded pose.',
    rest:'Inert collapsed skeleton with folded bones; no respiration or other living movement, only a faint spectral glimmer.'
  };
  let svg=source.replace(/<title id="title">[^<]*<\/title>/,`<title id="title">Skeleton Warrior — ${mode} original motion study</title>`);
  svg=svg.replace(/<desc id="description">[^<]*<\/desc>/,`<desc id="description">${description[mode]} Preview only; not a certified VTT product.</desc>`);
  svg=svg.replace('<svg xmlns=',`<svg data-gridborn-mode="${mode}" xmlns=`);
  svg=svg.replace(/<\/desc>/,`</desc>\n<style>\n${animations[mode]}\n${reduce}\n</style>`);
  if(mode==='rest'){
    svg=svg.replace('<g class="bone-cape">','<g class="bone-assembly" transform="translate(0 16) rotate(80 128 143)"><g transform="translate(128 143) scale(.72) translate(-128 -143)">\n<g class="bone-cape">');
    svg=svg.replace('</svg>\n','</g></g>\n</svg>\n');
  }else{
    svg=svg.replace('<g class="bone-cape">','<g class="bone-assembly">\n<g class="bone-cape">');
    svg=svg.replace('</svg>\n','</g>\n</svg>\n');
  }
  return svg;
};
