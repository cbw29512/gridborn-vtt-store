/** Original authored source drawings -> isolated public Idle/Move/Attack/Rest studies.
 * Each character or creature retains its own silhouette and equipment; no generic sprites.
 */
export const WAVE_STATES=Object.freeze(['idle','move','attack','rest']);
export const renderWave=function renderWave(kind,mode,source){
 const modes=['idle','move','attack','rest'];
 if(!modes.includes(mode)||!['wizard','vanguard','armor'].includes(kind))throw Error('Unsupported study mode');
 if(typeof source!=='string'||!source.includes('<svg xmlns=')||!source.includes('</svg>'))throw Error('Source SVG changed');
 const marker={
  wizard:['<!-- Mantle, wide flared indigo robe -->','<!-- silver staff, held at left, gold prongs and sky-blue arcana -->'],
  vanguard:['<!-- boots and dark fur cape -->','<!-- axe -->'],
  armor:['<!-- START FIGURE -->','<!-- START WEAPON -->']
 }[kind];
 if(marker.some(m=>!source.includes(m)))throw Error('Rig anchors changed: '+kind);
 const cycles={idle:'3.2s',move:'1.2s',attack:'1.4s',rest:'4s'};
 const cape=kind==='wizard'?'.rig-head{animation:head-turn 3.2s steps(1,end) infinite;transform-origin:128px 98px}':'';
 let base={
 wizard:{
 idle:`.rig-core{animation:wiz-idle 3.2s ease-in-out infinite}.rig-weapon{animation:wiz-staff-idle 3.2s ease-in-out infinite;transform-origin:76px 124px}.rig-glow{animation:wiz-glow 3.2s steps(1,end) infinite}
 @keyframes wiz-idle{0%,10%,90%,100%{transform:translateY(0)}38%{transform:translateY(-3px)}68%{transform:translateY(-1px)}}
 @keyframes wiz-staff-idle{0%,10%,90%,100%{transform:rotate(0)}38%{transform:rotate(-5deg)}68%{transform:rotate(3deg)}}
 @keyframes wiz-glow{0%,10%,90%,100%{opacity:.36}38%{opacity:1}68%{opacity:.62}}`,
 move:`.rig-core{animation:wiz-walk 1.2s ease-in-out infinite}.rig-weapon{animation:wiz-staff-walk 1.2s ease-in-out infinite;transform-origin:76px 124px}.rig-glow{animation:wiz-glow-walk 1.2s steps(1,end) infinite}
 @keyframes wiz-walk{0%,10%,90%,100%{transform:translate(0,0)}30%{transform:translate(-5px,-3px)}62%{transform:translate(5px,1px)}}
 @keyframes wiz-staff-walk{0%,10%,90%,100%{transform:rotate(0)}30%{transform:rotate(-8deg)}62%{transform:rotate(5deg)}}
 @keyframes wiz-glow-walk{0%,10%,90%,100%{opacity:.4}30%{opacity:1}62%{opacity:.55}}`,
 attack:`.rig-core{animation:wiz-cast 1.4s ease-in-out 1 both}.rig-weapon{animation:wiz-staff-cast 1.4s ease-in-out 1 both;transform-origin:76px 124px}.rig-glow{animation:wiz-burst 1.4s steps(1,end) 1 both}.rig-projectile{animation:wiz-projectile-flight 1.4s linear 1 both}
 @keyframes wiz-cast{0%,100%{transform:translate(0,0)}23%{transform:translate(4px,1px)}52%{transform:translate(-6px,-4px)}75%{transform:translate(-2px,0)}}
 @keyframes wiz-staff-cast{0%,100%{transform:rotate(0)}23%{transform:rotate(18deg)}52%{transform:rotate(-28deg)}75%{transform:rotate(-9deg)}}
 @keyframes wiz-burst{0%,14%,79%,100%{opacity:.25;transform:translate(0,0)}40%{opacity:1;transform:translate(-16px,-10px)}57%{opacity:.75;transform:translate(-30px,-12px)}}
 @keyframes wiz-projectile-flight{0%,33%{opacity:0;transform:translate(0,0)}40%{opacity:1;transform:translate(-4px,-2px)}56%{opacity:1;transform:translate(-24px,-6px)}68%,100%{opacity:0;transform:translate(-33px,-9px)}}`,
 rest:`.rig-core{animation:wiz-rest 4s ease-in-out infinite}.rig-weapon{animation:wiz-rest-staff 4s ease-in-out infinite;transform-origin:76px 124px}.rig-glow{animation:wiz-rest-glow 4s steps(1,end) infinite}
 @keyframes wiz-rest{0%,10%,90%,100%{transform:translateY(7px) rotate(-3deg)}45%{transform:translateY(5px) rotate(-3deg)}}
 @keyframes wiz-rest-staff{0%,10%,90%,100%{transform:rotate(-25deg)}45%{transform:rotate(-28deg)}}
 @keyframes wiz-rest-glow{0%,10%,90%,100%{opacity:.15}45%{opacity:.4}}`
 },
 vanguard:{
 idle:`.rig-core{animation:orc-brace 3.2s ease-in-out infinite}.rig-weapon{animation:orc-heft 3.2s ease-in-out infinite;transform-origin:190px 154px}
 @keyframes orc-brace{0%,10%,90%,100%{transform:translate(0,0)}38%{transform:translateY(-3px) rotate(-2deg)}68%{transform:translateY(1px)}}
 @keyframes orc-heft{0%,10%,90%,100%{transform:rotate(0)}38%{transform:rotate(-12deg)}68%{transform:rotate(7deg)}}`,
 move:`.rig-core{animation:orc-march 1.2s ease-in-out infinite}.rig-boot-l{transform-origin:107px 159px;animation:orc-left 1.2s steps(1,end) infinite}.rig-boot-r{transform-origin:147px 159px;animation:orc-right 1.2s steps(1,end) infinite}.rig-weapon{animation:orc-weapon-march 1.2s ease-in-out infinite;transform-origin:190px 154px}
 @keyframes orc-march{0%,10%,90%,100%{transform:translate(0,0)}30%{transform:translate(-4px,-3px)}65%{transform:translate(3px,-1px)}}
 @keyframes orc-left{0%,10%,90%,100%{transform:rotate(0)}30%{transform:rotate(-18deg)}65%{transform:rotate(15deg)}}
 @keyframes orc-right{0%,10%,90%,100%{transform:rotate(0)}30%{transform:rotate(18deg)}65%{transform:rotate(-15deg)}}
 @keyframes orc-weapon-march{0%,10%,90%,100%{transform:rotate(0)}30%{transform:rotate(9deg)}65%{transform:rotate(-8deg)}}`,
 attack:`.rig-core{animation:orc-charge 1.4s ease-in-out 1 both}.rig-weapon{animation:orc-chop 1.4s cubic-bezier(.25,.8,.3,1) 1 both;transform-origin:190px 154px}
 @keyframes orc-charge{0%,100%{transform:translate(0,0)}25%{transform:translate(4px,0)}53%{transform:translate(-11px,-4px)}76%{transform:translate(-2px,-1px)}}
 @keyframes orc-chop{0%,100%{transform:rotate(0)}25%{transform:rotate(-54deg)}53%{transform:rotate(65deg)}76%{transform:rotate(15deg)}}`,
 rest:`.rig-core{animation:orc-rest 4s ease-in-out infinite}.rig-weapon{animation:orc-rest-axe 4s ease-in-out infinite;transform-origin:190px 154px}
 @keyframes orc-rest{0%,10%,90%,100%{transform:translateY(10px) rotate(4deg)}45%{transform:translateY(8px) rotate(4deg)}}
 @keyframes orc-rest-axe{0%,10%,90%,100%{transform:rotate(46deg)}45%{transform:rotate(44deg)}}`
 },
 armor:{
 idle:`.rig-core{animation:armor-creak 3.2s steps(1,end) infinite}.rig-weapon{animation:armor-guard 3.2s steps(1,end) infinite;transform-origin:190px 140px}.rig-visorglow{animation:armor-eye 3.2s steps(1,end) infinite}
 @keyframes armor-creak{0%,10%,90%,100%{transform:translate(0,0)}32%{transform:translateY(-2px) rotate(-2deg)}58%{transform:rotate(2deg)}}
 @keyframes armor-guard{0%,10%,90%,100%{transform:rotate(0)}32%{transform:rotate(-8deg)}58%{transform:rotate(4deg)}}
 @keyframes armor-eye{0%,10%,90%,100%{opacity:.32}32%{opacity:.93}58%{opacity:.45}}`,
 move:`.rig-core{animation:armor-march 1.2s steps(1,end) infinite}.rig-foot-left{transform-origin:107px 167px;animation:armor-foot-left 1.2s steps(1,end) infinite}.rig-foot-right{transform-origin:145px 166px;animation:armor-foot-right 1.2s steps(1,end) infinite}.rig-weapon{animation:armor-weapon-march 1.2s steps(1,end) infinite;transform-origin:190px 140px}
 @keyframes armor-march{0%,10%,90%,100%{transform:translate(0,0)}32%{transform:translate(-4px,-3px)}66%{transform:translate(4px,-2px)}}
 @keyframes armor-foot-left{0%,10%,90%,100%{transform:rotate(0)}32%{transform:rotate(-17deg)}66%{transform:rotate(14deg)}}
 @keyframes armor-foot-right{0%,10%,90%,100%{transform:rotate(0)}32%{transform:rotate(16deg)}66%{transform:rotate(-14deg)}}
 @keyframes armor-weapon-march{0%,10%,90%,100%{transform:rotate(0)}32%{transform:rotate(-8deg)}66%{transform:rotate(7deg)}}`,
 attack:`.rig-core{animation:armor-lunge 1.4s steps(1,end) 1 both}.rig-weapon{animation:armor-cleave 1.4s ease-in-out 1 both;transform-origin:194px 155px}
 @keyframes armor-lunge{0%,100%{transform:translate(0,0)}25%{transform:translate(-3px,0)}53%{transform:translate(6px,-3px)}77%{transform:translate(2px,0)}}
 @keyframes armor-cleave{0%,100%{transform:translate(0,0) rotate(0deg)}25%{transform:translate(-3px,0) rotate(-30deg)}53%{transform:translate(6px,-3px) rotate(26deg)}77%{transform:translate(2px,0) rotate(6deg)}}`,
 rest:`.rig-core{animation:armor-inert 4s steps(1,end) infinite;transform-origin:128px 154px}.rig-weapon{animation:armor-rest-blade 4s steps(1,end) infinite;transform-origin:190px 140px}.rig-visorglow{animation:armor-rest-eye 4s steps(1,end) infinite}
 @keyframes armor-inert{0%,10%,90%,100%{transform:translateY(12px) rotate(14deg)}48%{transform:translateY(12px) rotate(15deg)}}
 @keyframes armor-rest-blade{0%,10%,90%,100%{transform:rotate(65deg)}48%{transform:rotate(64deg)}}
 @keyframes armor-rest-eye{0%,10%,90%,100%{opacity:.2}48%{opacity:.65}}`
 }
 }[kind][mode];
 const reduced='@media(prefers-reduced-motion:reduce){.rig-core,.rig-weapon,.rig-head,.rig-boot-l,.rig-boot-r,.rig-foot-left,.rig-foot-right,.rig-visorglow,.rig-glow'+(kind==='wizard'&&mode==='attack'?',.rig-projectile':'')+'{animation:none!important}}';
 let svg=source.replace(/<title id="title">[^<]*<\/title>/,`<title id="title">${{wizard:'Elven Wizard',vanguard:'Orc Axe Vanguard Barbarian pregen',armor:'Animated Armor'}[kind]} — ${mode} original motion study</title>`)
 .replace(/<desc id="description">[^<]*<\/desc>/,`<desc id="description">${{wizard:'Cyan arcane staff, levitating robes and casting flare',vanguard:'Orc warpaint and massive brass axe',armor:'Empty visor, articulated metal plates and heavy blade'}[kind]} with ${mode} animation. Noncommercial prototype.</desc>`);
 svg=svg.replace('</desc>','</desc>\n<style>\n'+base+'\n'+reduced+'\n</style>');
 svg=svg.replace('<svg xmlns=',`<svg data-gridborn-mode="${mode}" xmlns=`);
 svg=svg.replace(marker[0],'<g class="rig-core">\n'+marker[0]);
 svg=svg.replace(marker[1],'</g>\n<g class="rig-weapon">\n'+marker[1]);
 svg=svg.replace('</svg>','</g>\n</svg>');
 if(kind==='wizard'){
  const h='<!-- angled face and elven ears -->';
  const close='<!-- silver staff, held at left, gold prongs and sky-blue arcana -->';
  // Inner head grouping closed before core ends; optional source markers.
  if(!svg.includes(h)||!svg.includes(close))throw Error('Wizard face rig changed');
  svg=svg.replace(h,'<g class="rig-head">\n'+h);
  svg=svg.replace('</g>\n<g class="rig-weapon">','</g>\n</g>\n<g class="rig-weapon">');
  svg=svg.replace('</g>\n</svg>','<g class="rig-glow"><circle cx="75" cy="53" r="17" fill="#7ee8f4" opacity=".55"/><path d="M58 52l17-21 19 22-18 17z" fill="none" stroke="#e4eead" stroke-width="4"/></g>\n</g>\n</svg>');
  // The spell leaves the focus as an independent layer; it must not inherit staff rotation.
  // Source-specific glyph is intentionally narrow and remains within the 256x240 frame.
  if(mode==='attack'){
   svg=svg.replace('</svg>','<g class="rig-projectile" data-weapon-projectile="arcane-bolt" opacity="0"><path d="M63 53L42 48L53 45L47 51L53 59Z" fill="#9be8f7" stroke="#386f9b" stroke-width="2"/><path d="M64 53L43 50" stroke="#f2fcff" stroke-width="3" stroke-linecap="round"/></g>\n</svg>');
  }
 }
 if(kind==='vanguard'){
  const boots='<rect x="96" y="159" width="25" height="34" fill="#1d2530"/><rect x="135" y="159" width="25" height="34" fill="#1d2530"/>';
  const bootTop='<rect x="100" y="160" width="17" height="27" fill="#654436"/><rect x="139" y="160" width="17" height="27" fill="#654436"/>';
  if(!svg.includes(boots)||!svg.includes(bootTop))throw Error('Barbarian boot rig changed');
  svg=svg.replace(boots,'<g class="rig-boot-l"><rect x="96" y="159" width="25" height="34" fill="#1d2530"/><rect x="100" y="160" width="17" height="27" fill="#654436"/></g><g class="rig-boot-r"><rect x="135" y="159" width="25" height="34" fill="#1d2530"/><rect x="139" y="160" width="17" height="27" fill="#654436"/></g>');
  svg=svg.replace(bootTop,'');
 }
 if(kind==='armor'){
  if(!svg.includes('class="rig-foot-left"'))throw Error('Missing articulated armor feet');
  svg=svg.replace('<path d="M115 92h25v4h-25z" fill="#7aafb8" opacity=".65"/>','<path class="rig-visorglow" d="M115 92h25v4h-25z" fill="#7aafb8" opacity=".65"/>');
 }
 return svg;
};
