/** Source-specific four-state animations: Paladin, Gnome, Lizardfolk, Shark.
 * Artwork source is immutable; no species-name engine dispatch or shared silhouettes.
 */
export const WAVE_FOUR_STATES=Object.freeze(['idle','move','attack','rest']);
export const renderWaveFour=function renderWaveFour(kind,mode,source){
 const modes=['idle','move','attack','rest'];
 const ids=['paladin','gnome','lizardfolk','shark'];
 if(!ids.includes(kind)||!modes.includes(mode))throw Error('Invalid wave four motion');
 if(typeof source!=='string'||!source.includes('<svg xmlns=')||!source.includes('</svg>'))throw Error('Source art unavailable');
 const marker={paladin:'<g class="paladin-mantle">',gnome:'<g class="rig-core">',lizardfolk:'<g class="rig-tail">',shark:'<g class="shark-tail">'}[kind];
 if(!source.includes(marker))throw Error('Anatomy marker missing for '+kind);
 let s=source.replace(/<title id="title">[^<]*<\/title>/,`<title id="title">${{paladin:'Human Paladin',gnome:'Gnome Rogue',lizardfolk:'Swamp Lizardfolk',shark:'Great White Shark'}[kind]} — ${mode} original motion study</title>`)
  .replace(/<desc id="description">[^<]*<\/desc>/,`<desc id="description">${{paladin:'Ivory tabard with crested helm, shield and sword',gnome:'Small wide-goggled scout holding mechanical crossbow',lizardfolk:'Snouted swamp hunter with separate thick tail and spear',shark:'Side-profile blue-and-white shark with sweeping tail, dorsal and pectoral fins'}[kind]}, ${mode} motion prototype only. Not a paid product.</desc>`)
  .replace('<svg xmlns=',`<svg data-gridborn-mode="${mode}" xmlns=`);
 if(kind==='paladin'){
  const shield='<g class="paladin-shield">',weapon='<g class="paladin-sword">';
  if(!s.includes(shield)||!s.includes(weapon))throw Error('Paladin grouping anchors changed');
  s=s.replace(marker,'<g class="rig-core">\n'+marker)
    .replace(shield,'</g>\n<g class="paladin-shield rig-offhand">')
    .replace(weapon,'<g class="paladin-sword rig-weapon">');
 }
 if(kind==='shark'){
  for(const [a,b] of [
   ['class="shark-tail"','class="shark-tail rig-tail"'],
   ['class="shark-body"','class="shark-body rig-body"'],
   ['class="shark-pectoral-fin"','class="shark-pectoral-fin rig-fin"'],
   ['class="shark-head-features"','class="shark-head-features rig-head"']
  ]){if(!s.includes(a))throw Error('Shark part missing '+a);s=s.replace(a,b)}
 }
 const anim={
  paladin:{
   idle:`.rig-core{animation:paladin-watch 3.2s ease-in-out infinite}.rig-weapon{transform-origin:193px 148px;animation:paladin-sword-ready 3.2s steps(1,end) infinite}.rig-offhand{transform-origin:76px 151px;animation:paladin-shield-ready 3.2s ease-in-out infinite}
   @keyframes paladin-watch{0%,10%,90%,100%{transform:translateY(0)}42%{transform:translateY(-3px)}68%{transform:translateY(1px)}}
   @keyframes paladin-sword-ready{0%,10%,90%,100%{transform:rotate(0)}42%{transform:rotate(-8deg)}68%{transform:rotate(4deg)}}
   @keyframes paladin-shield-ready{0%,10%,90%,100%{transform:rotate(0)}42%{transform:rotate(5deg)}68%{transform:rotate(-4deg)}}`,
   move:`.rig-core{animation:paladin-plate-march 1.2s steps(1,end) infinite}.paladin-legs{transform-origin:130px 167px;animation:paladin-step-legs 1.2s steps(1,end) infinite}.rig-weapon{transform-origin:193px 148px;animation:paladin-step-sword 1.2s steps(1,end) infinite}.rig-offhand{transform-origin:76px 151px;animation:paladin-step-shield 1.2s steps(1,end) infinite}
   @keyframes paladin-plate-march{0%,10%,90%,100%{transform:translate(0,0)}30%{transform:translate(-5px,-3px)}65%{transform:translate(4px,-2px)}}
   @keyframes paladin-step-legs{0%,10%,90%,100%{transform:rotate(0)}30%{transform:rotate(-7deg)}65%{transform:rotate(7deg)}}
   @keyframes paladin-step-sword{0%,10%,90%,100%{transform:rotate(0)}30%{transform:rotate(8deg)}65%{transform:rotate(-6deg)}}
   @keyframes paladin-step-shield{0%,10%,90%,100%{transform:rotate(0)}30%{transform:rotate(-6deg)}65%{transform:rotate(5deg)}}`,
   attack:`.rig-core{animation:paladin-smite-step 1.4s steps(1,end) 1 both}.rig-weapon{transform-origin:193px 148px;animation:paladin-sunstrike 1.4s steps(1,end) 1 both}.rig-offhand{transform-origin:76px 151px;animation:paladin-shield-block 1.4s steps(1,end) 1 both}
   @keyframes paladin-smite-step{0%,100%{transform:translate(0,0)}24%{transform:translate(4px,0)}53%{transform:translate(-9px,-2px)}76%{transform:translate(-2px,0)}}
   @keyframes paladin-sunstrike{0%,100%{transform:rotate(0)}24%{transform:rotate(-43deg)}53%{transform:rotate(59deg)}76%{transform:rotate(12deg)}}
   @keyframes paladin-shield-block{0%,100%{transform:rotate(0)}24%{transform:rotate(-8deg)}53%{transform:rotate(14deg)}76%{transform:rotate(5deg)}}`,
   rest:`.rig-core{animation:paladin-prayer-rest 4s ease-in-out infinite}.rig-weapon{transform-origin:193px 148px;animation:paladin-sword-sheathe 4s ease-in-out infinite}.rig-offhand{transform-origin:76px 151px;animation:paladin-shield-lower 4s ease-in-out infinite}
   @keyframes paladin-prayer-rest{0%,10%,90%,100%{transform:translateY(9px)}50%{transform:translateY(7px)}}
   @keyframes paladin-sword-sheathe{0%,10%,90%,100%{transform:rotate(35deg)}50%{transform:rotate(32deg)}}
   @keyframes paladin-shield-lower{0%,10%,90%,100%{transform:rotate(22deg)}50%{transform:rotate(20deg)}}`
  },
  gnome:{
   idle:`.rig-core{animation:gnome-scan 3.2s steps(1,end) infinite}.rig-weapon{transform-origin:178px 140px;animation:gnome-crossbow-check 3.2s steps(1,end) infinite}.rig-effect{animation:gnome-bolt-gleam 3.2s steps(1,end) infinite}
   @keyframes gnome-scan{0%,10%,90%,100%{transform:translateX(0)}38%{transform:translateX(-3px)}68%{transform:translateX(2px)}}
   @keyframes gnome-crossbow-check{0%,10%,90%,100%{transform:rotate(0)}38%{transform:rotate(-11deg)}68%{transform:rotate(7deg)}}
   @keyframes gnome-bolt-gleam{0%,10%,90%,100%{opacity:.25}38%{opacity:.8}68%{opacity:.4}}`,
   move:`.rig-core{animation:gnome-scurry 1.2s steps(1,end) infinite}.rig-leg-left{transform-origin:111px 160px;animation:gnome-left-boot 1.2s steps(1,end) infinite}.rig-leg-right{transform-origin:144px 161px;animation:gnome-right-boot 1.2s steps(1,end) infinite}.rig-weapon{transform-origin:178px 140px;animation:gnome-crossbow-bob 1.2s steps(1,end) infinite}
   @keyframes gnome-scurry{0%,10%,90%,100%{transform:translate(0,0)}30%{transform:translate(-10px,-3px)}65%{transform:translate(7px,-1px)}}
   @keyframes gnome-left-boot{0%,10%,90%,100%{transform:rotate(0)}30%{transform:rotate(-20deg)}65%{transform:rotate(14deg)}}
   @keyframes gnome-right-boot{0%,10%,90%,100%{transform:rotate(0)}30%{transform:rotate(18deg)}65%{transform:rotate(-15deg)}}
   @keyframes gnome-crossbow-bob{0%,10%,90%,100%{transform:rotate(0)}30%{transform:rotate(7deg)}65%{transform:rotate(-5deg)}}`,
   attack:`.rig-core{animation:gnome-fire-brace 1.4s steps(1,end) 1 both}.rig-weapon{transform-origin:178px 140px;animation:gnome-crossbow-shot 1.4s steps(1,end) 1 both}.rig-effect{animation:gnome-bolt-launch 1.4s steps(1,end) 1 both}.rig-bolt{animation:gnome-bolt-flight 1.4s linear 1 both}
   @keyframes gnome-fire-brace{0%,100%{transform:translate(0,0)}23%{transform:translate(2px,1px)}51%{transform:translate(-7px,-2px)}75%{transform:translate(-1px,0)}}
   @keyframes gnome-crossbow-shot{0%,100%{transform:rotate(0)}23%{transform:rotate(-13deg)}51%{transform:rotate(18deg)}75%{transform:rotate(3deg)}}
   @keyframes gnome-bolt-launch{0%,12%,85%,100%{opacity:.12;transform:translateX(0)}45%{opacity:1;transform:translateX(12px)}62%{opacity:.58;transform:translateX(26px)}}
   @keyframes gnome-bolt-flight{0%,22%{opacity:1;transform:translate(0,0)}39%{opacity:1;transform:translate(0,0)}56%{opacity:1;transform:translate(19px,-8px)}63%,100%{opacity:0;transform:translate(22px,-9px)}}`,
   rest:`.rig-core{animation:gnome-crouch-rest 4s steps(1,end) infinite}.rig-weapon{transform-origin:178px 140px;animation:gnome-crossbow-lower 4s steps(1,end) infinite}.rig-effect{animation:gnome-bolt-rest 4s steps(1,end) infinite}
   @keyframes gnome-crouch-rest{0%,10%,90%,100%{transform:translateY(13px) rotate(-5deg)}50%{transform:translateY(12px) rotate(-5deg)}}
   @keyframes gnome-crossbow-lower{0%,10%,90%,100%{transform:rotate(43deg)}50%{transform:rotate(40deg)}}
   @keyframes gnome-bolt-rest{0%,10%,90%,100%{opacity:0}50%{opacity:.13}}`
  },
  lizardfolk:{
   idle:`.rig-core{animation:lizard-watch 3.2s steps(1,end) infinite}.rig-tail{transform-origin:105px 165px;animation:lizard-tail-sway 3.2s ease-in-out infinite}.rig-weapon{transform-origin:183px 156px;animation:lizard-spear-ready 3.2s steps(1,end) infinite}
   @keyframes lizard-watch{0%,10%,90%,100%{transform:translateY(0)}42%{transform:translateY(-2px)}68%{transform:translateY(1px)}}
   @keyframes lizard-tail-sway{0%,10%,90%,100%{transform:rotate(0)}42%{transform:rotate(-10deg)}68%{transform:rotate(8deg)}}
   @keyframes lizard-spear-ready{0%,10%,90%,100%{transform:rotate(0)}42%{transform:rotate(-6deg)}68%{transform:rotate(5deg)}}`,
   move:`.rig-core{animation:lizard-prowl 1.2s steps(1,end) infinite}.rig-leg-left{transform-origin:108px 159px;animation:lizard-left 1.2s steps(1,end) infinite}.rig-leg-right{transform-origin:154px 160px;animation:lizard-right 1.2s steps(1,end) infinite}.rig-tail{transform-origin:106px 162px;animation:lizard-tail-balance 1.2s steps(1,end) infinite}
   @keyframes lizard-prowl{0%,10%,90%,100%{transform:translate(0,0)}32%{transform:translate(-6px,-3px)}65%{transform:translate(5px,-1px)}}
   @keyframes lizard-left{0%,10%,90%,100%{transform:rotate(0)}32%{transform:rotate(-14deg)}65%{transform:rotate(11deg)}}
   @keyframes lizard-right{0%,10%,90%,100%{transform:rotate(0)}32%{transform:rotate(13deg)}65%{transform:rotate(-14deg)}}
   @keyframes lizard-tail-balance{0%,10%,90%,100%{transform:rotate(0)}32%{transform:rotate(-14deg)}65%{transform:rotate(12deg)}}`,
   attack:`.rig-core{animation:lizard-thrust-body 1.4s steps(1,end) 1 both}.rig-weapon{transform-origin:182px 156px;animation:lizard-spear-thrust 1.4s steps(1,end) 1 both}.rig-offhand{animation:lizard-shield-brace 1.4s steps(1,end) 1 both}.rig-tail{transform-origin:106px 162px;animation:lizard-tail-counterweight 1.4s steps(1,end) 1 both}
   @keyframes lizard-thrust-body{0%,100%{transform:translate(0,0)}24%{transform:translate(-3px,1px)}54%{transform:translate(9px,-2px)}74%{transform:translate(2px,0)}}
   @keyframes lizard-spear-thrust{0%,100%{transform:translate(0,0)}24%{transform:translate(-5px,4px)}54%{transform:translate(14px,-3px)}74%{transform:translate(3px,-1px)}}
   @keyframes lizard-shield-brace{0%,100%{transform:translate(0,0)}24%{transform:translate(-3px,1px)}54%{transform:translate(9px,-2px)}74%{transform:translate(2px,0)}}
   @keyframes lizard-tail-counterweight{0%,100%{transform:rotate(0)}24%{transform:rotate(-9deg)}54%{transform:rotate(16deg)}74%{transform:rotate(4deg)}}`,
   rest:`.rig-core{animation:lizard-low-rest 4s steps(1,end) infinite}.rig-tail{transform-origin:106px 162px;animation:lizard-tail-rest 4s steps(1,end) infinite}.rig-weapon{transform-origin:183px 156px;animation:lizard-spear-ground 4s steps(1,end) infinite}
   @keyframes lizard-low-rest{0%,10%,90%,100%{transform:translateY(10px)}48%{transform:translateY(9px)}}
   @keyframes lizard-tail-rest{0%,10%,90%,100%{transform:rotate(-16deg)}48%{transform:rotate(-14deg)}}
   @keyframes lizard-spear-ground{0%,10%,90%,100%{transform:rotate(42deg)}48%{transform:rotate(40deg)}}`
  },
  shark:{
   idle:`.rig-body{animation:shark-glide 3.2s ease-in-out infinite}.rig-tail{transform-origin:61px 127px;animation:shark-idle-tail 3.2s ease-in-out infinite}.rig-fin{transform-origin:151px 145px;animation:shark-idle-fin 3.2s ease-in-out infinite}
   @keyframes shark-glide{0%,10%,90%,100%{transform:translateY(0)}43%{transform:translateY(-3px)}70%{transform:translateY(1px)}}
   @keyframes shark-idle-tail{0%,10%,90%,100%{transform:rotate(0)}43%{transform:rotate(-13deg)}70%{transform:rotate(9deg)}}
   @keyframes shark-idle-fin{0%,10%,90%,100%{transform:rotate(0)}43%{transform:rotate(-5deg)}70%{transform:rotate(4deg)}}`,
   move:`.rig-body{animation:shark-swim-body 1.2s ease-in-out infinite}.rig-tail{transform-origin:61px 127px;animation:shark-caudal-kick 1.2s ease-in-out infinite}.rig-fin{transform-origin:151px 145px;animation:shark-steering-fin 1.2s ease-in-out infinite}
   @keyframes shark-swim-body{0%,10%,90%,100%{transform:translate(0,0)}31%{transform:translate(4px,-2px)}65%{transform:translate(-3px,2px)}}
   @keyframes shark-caudal-kick{0%,10%,90%,100%{transform:rotate(0)}31%{transform:rotate(-22deg)}65%{transform:rotate(20deg)}}
   @keyframes shark-steering-fin{0%,10%,90%,100%{transform:rotate(0)}31%{transform:rotate(7deg)}65%{transform:rotate(-7deg)}}`,
   attack:`.rig-body{animation:shark-bite-lunge 1.4s ease-in-out 1 both}.rig-tail{transform-origin:61px 127px;animation:shark-attack-tail 1.4s ease-in-out 1 both}.rig-head{animation:shark-jaw-snap 1.4s steps(1,end) 1 both;transform-origin:210px 138px}
   @keyframes shark-bite-lunge{0%,100%{transform:translate(0,0)}23%{transform:translate(-4px,0)}51%{transform:translate(13px,-3px)}75%{transform:translate(4px,0)}}
   @keyframes shark-attack-tail{0%,100%{transform:rotate(0)}23%{transform:rotate(-17deg)}51%{transform:rotate(25deg)}75%{transform:rotate(8deg)}}
   @keyframes shark-jaw-snap{0%,100%{transform:rotate(0)}23%{transform:rotate(7deg)}51%{transform:rotate(-9deg)}75%{transform:rotate(-3deg)}}`,
   rest:`.rig-body{animation:shark-rest-drift 4s ease-in-out infinite}.rig-tail{transform-origin:61px 127px;animation:shark-rest-tail 4s ease-in-out infinite}.rig-fin{transform-origin:151px 145px;animation:shark-rest-fin 4s ease-in-out infinite}
   @keyframes shark-rest-drift{0%,10%,90%,100%{transform:translateY(0)}48%{transform:translateY(-2px)}}
   @keyframes shark-rest-tail{0%,10%,90%,100%{transform:rotate(-4deg)}48%{transform:rotate(5deg)}}
   @keyframes shark-rest-fin{0%,10%,90%,100%{transform:rotate(0)}48%{transform:rotate(-3deg)}}`
  }
 }[kind][mode];
 const reduced='@media(prefers-reduced-motion:reduce){.rig-core,.rig-body,.rig-tail,.rig-fin,.rig-head,.rig-weapon,.rig-offhand,.rig-effect'+(kind==='gnome'?',.rig-bolt':'')+',.rig-leg-left,.rig-leg-right,.paladin-legs{animation:none!important}}';
 return s.replace('</desc>','</desc>\n<style>\n'+anim+'\n'+reduced+'\n</style>');
};
