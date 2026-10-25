/** Distinct hand-drawn anatomy sources define which layers can move.
 * Shared input contract, independent per-character rigging and timing.
 */
export const WAVE_THREE_STATES=Object.freeze(['idle','move','attack','rest']);
export const renderWaveThree=function makeMotion(kind,mode,source){
 const forms=["dwarf","mercy","shadow","ogre"];
 if(!forms.includes(kind)||!["idle","move","attack","rest"].includes(mode))throw Error("Unsupported motion profile");
 if(!source.includes("</svg>")||!source.includes("<title id=\"title\">"))throw Error("Original source missing structure");
 let art=source.replace(/<title id="title">[^<]*<\/title>/,`<title id="title">${{dwarf:"Dwarven Cleric",mercy:"Human Mercywarden Cleric female pregen",shadow:"Human Shadowstep Rogue nonbinary pregen",ogre:"Cave Ogre"}[kind]} — ${mode} animation study</title>`)
 .replace(/<desc id="description">[^<]*<\/desc>/,`<desc id="description">${{dwarf:"Stocky dwarf beard with mace, heavy shield and radiant holy symbol",mercy:"Auburn braid, pale blue healing surcoat, shield and mace",shadow:"Hooded nonbinary rogue with two copper daggers and shadow trail",ogre:"Enormous hunched ogre with slab club and heavy, uneven steps"}[kind]}. ${mode} animation prototype, preview only.</desc>`)
 .replace("<svg xmlns=",`<svg data-gridborn-mode="${mode}" xmlns=`);
 if(kind==="dwarf"){
  const anchor='<g class="dwarf-cloak">';
  if(!art.includes(anchor)||!art.includes('<g class="dwarf-shield">')||!art.includes('<g class="dwarf-mace">'))throw Error("Dwarf anatomy markers changed");
  art=art.replace(anchor,'<g class="rig-core">\n'+anchor);
  art=art.replace('<g class="dwarf-shield">','</g>\n<g class="dwarf-shield rig-offhand">');
  art=art.replace('<g class="dwarf-mace">','<g class="dwarf-mace rig-weapon">');
 }
 if(kind==="mercy"){
  const haloBoundary='</g>\n<g class="rig-effect">';
  if(!art.includes(haloBoundary)||!art.includes('</g>\n</svg>'))throw Error("Mercywarden art changed");
  art=art.replace(haloBoundary,'<g class="rig-effect">');
  art=art.replace('</g>\n</svg>','</g>\n</g>\n</svg>');
 }
 const animSets={
 dwarf:{
 idle:`.rig-core{animation:dwarf-guard 3.2s ease-in-out infinite}.rig-weapon{transform-origin:188px 151px;animation:dwarf-mace-guard 3.2s ease-in-out infinite}.rig-offhand{transform-origin:77px 142px;animation:dwarf-shield-guard 3.2s ease-in-out infinite}
@keyframes dwarf-guard{0%,10%,90%,100%{transform:translateY(0)}42%{transform:translateY(-2px)}66%{transform:translateY(1px)}}
@keyframes dwarf-mace-guard{0%,10%,90%,100%{transform:rotate(0)}42%{transform:rotate(5deg)}66%{transform:rotate(-4deg)}}
@keyframes dwarf-shield-guard{0%,10%,90%,100%{transform:rotate(0)}42%{transform:rotate(-6deg)}66%{transform:rotate(3deg)}}`,
 move:`.rig-core{animation:dwarf-braced-step 1.2s steps(1,end) infinite}.dwarf-legs{transform-origin:129px 170px;animation:dwarf-march-legs 1.2s steps(1,end) infinite}.rig-weapon{transform-origin:188px 151px;animation:dwarf-march-mace 1.2s steps(1,end) infinite}.rig-offhand{transform-origin:77px 142px;animation:dwarf-march-shield 1.2s steps(1,end) infinite}
@keyframes dwarf-braced-step{0%,10%,90%,100%{transform:translate(0,0)}30%{transform:translate(-4px,-2px)}65%{transform:translate(3px,-1px)}}
@keyframes dwarf-march-legs{0%,10%,90%,100%{transform:rotate(0)}30%{transform:rotate(-6deg)}65%{transform:rotate(6deg)}}
@keyframes dwarf-march-mace{0%,10%,90%,100%{transform:rotate(0)}30%{transform:rotate(11deg)}65%{transform:rotate(-8deg)}}
@keyframes dwarf-march-shield{0%,10%,90%,100%{transform:rotate(0)}30%{transform:rotate(-6deg)}65%{transform:rotate(5deg)}}`,
 attack:`.rig-core{animation:dwarf-smite-step 1.4s steps(1,end) 1 both}.rig-weapon{transform-origin:188px 151px;animation:dwarf-smite-mace 1.4s steps(1,end) 1 both}.rig-offhand{transform-origin:77px 142px;animation:dwarf-smite-block 1.4s steps(1,end) 1 both}
@keyframes dwarf-smite-step{0%,100%{transform:translate(0,0)}22%{transform:translate(3px,0)}52%{transform:translate(-8px,-3px)}75%{transform:translate(-2px,0)}}
@keyframes dwarf-smite-mace{0%,100%{transform:rotate(0)}22%{transform:rotate(-45deg)}52%{transform:rotate(52deg)}75%{transform:rotate(13deg)}}
@keyframes dwarf-smite-block{0%,100%{transform:rotate(0)}22%{transform:rotate(-10deg)}52%{transform:rotate(14deg)}75%{transform:rotate(6deg)}}`,
 rest:`.rig-core{animation:dwarf-prayer 4s ease-in-out infinite}.rig-weapon{transform-origin:188px 151px;animation:dwarf-prayer-mace 4s ease-in-out infinite}.rig-offhand{transform-origin:77px 142px;animation:dwarf-prayer-shield 4s ease-in-out infinite}
@keyframes dwarf-prayer{0%,10%,90%,100%{transform:translateY(8px)}45%{transform:translateY(6px)}}
@keyframes dwarf-prayer-mace{0%,10%,90%,100%{transform:rotate(24deg)}45%{transform:rotate(27deg)}}
@keyframes dwarf-prayer-shield{0%,10%,90%,100%{transform:rotate(15deg)}45%{transform:rotate(13deg)}}`
 },
 mercy:{
 idle:`.rig-core{animation:mercy-breathe 3.2s ease-in-out infinite}.rig-weapon{transform-origin:186px 150px;animation:mercy-mace-ready 3.2s ease-in-out infinite}.rig-effect{animation:mercy-warmth 3.2s steps(1,end) infinite}
@keyframes mercy-breathe{0%,10%,90%,100%{transform:translateY(0)}42%{transform:translateY(-2px)}68%{transform:translateY(1px)}}
@keyframes mercy-mace-ready{0%,10%,90%,100%{transform:rotate(0)}42%{transform:rotate(-5deg)}68%{transform:rotate(4deg)}}
@keyframes mercy-warmth{0%,10%,90%,100%{opacity:.3}42%{opacity:1}68%{opacity:.6}}`,
 move:`.rig-core{animation:mercy-walk 1.2s ease-in-out infinite}.rig-leg-left{transform-origin:111px 163px;animation:mercy-left 1.2s steps(1,end) infinite}.rig-leg-right{transform-origin:145px 163px;animation:mercy-right 1.2s steps(1,end) infinite}.rig-offhand{transform-origin:76px 143px;animation:mercy-shield-walk 1.2s ease-in-out infinite}
@keyframes mercy-walk{0%,10%,90%,100%{transform:translate(0,0)}30%{transform:translate(-4px,-2px)}65%{transform:translate(3px,-2px)}}
@keyframes mercy-left{0%,10%,90%,100%{transform:rotate(0)}30%{transform:rotate(-14deg)}65%{transform:rotate(12deg)}}
@keyframes mercy-right{0%,10%,90%,100%{transform:rotate(0)}30%{transform:rotate(14deg)}65%{transform:rotate(-12deg)}}
@keyframes mercy-shield-walk{0%,10%,90%,100%{transform:rotate(0)}30%{transform:rotate(-6deg)}65%{transform:rotate(5deg)}}`,
 attack:`.rig-core{animation:mercy-cast-step 1.4s ease-in-out 1 both}.rig-weapon{transform-origin:186px 150px;animation:mercy-cast-mace 1.4s ease-in-out 1 both}.rig-effect{transform-origin:185px 70px;animation:mercy-heal-flash 1.4s ease-out 1 both}
@keyframes mercy-cast-step{0%,100%{transform:translate(0,0)}24%{transform:translate(3px,1px)}54%{transform:translate(-6px,-2px)}75%{transform:translate(-1px,0)}}
@keyframes mercy-cast-mace{0%,100%{transform:rotate(0)}24%{transform:rotate(-24deg)}54%{transform:rotate(32deg)}75%{transform:rotate(10deg)}}
@keyframes mercy-heal-flash{0%,28%,100%{opacity:.1;transform:scale(.9)}54%{opacity:1;transform:scale(1.16)}72%{opacity:.55;transform:scale(1.04)}}`,
 rest:`.rig-core{animation:mercy-prayer 4s ease-in-out infinite}.rig-offhand{transform-origin:76px 143px;animation:mercy-shield-rest 4s ease-in-out infinite}.rig-effect{animation:mercy-candle 4s steps(1,end) infinite}
@keyframes mercy-prayer{0%,10%,90%,100%{transform:translateY(8px)}45%{transform:translateY(6px)}}
@keyframes mercy-shield-rest{0%,10%,90%,100%{transform:rotate(17deg)}45%{transform:rotate(15deg)}}
@keyframes mercy-candle{0%,10%,90%,100%{opacity:.25}45%{opacity:.55}}`
 },
 shadow:{
 idle:`.rig-core{animation:shadow-watch 3.2s steps(1,end) infinite}.rig-weapon{transform-origin:185px 140px;animation:shadow-dagger-guard 3.2s steps(1,end) infinite}.rig-effect{animation:shadow-flicker 3.2s steps(1,end) infinite}
@keyframes shadow-watch{0%,10%,90%,100%{transform:translateX(0)}38%{transform:translateX(-3px)}66%{transform:translateX(2px)}}
@keyframes shadow-dagger-guard{0%,10%,90%,100%{transform:rotate(0)}38%{transform:rotate(-14deg)}66%{transform:rotate(7deg)}}
@keyframes shadow-flicker{0%,10%,90%,100%{opacity:.2}38%{opacity:.7}66%{opacity:.4}}`,
 move:`.rig-core{animation:shadow-sidestep 1.2s steps(1,end) infinite}.rig-leg-left{transform-origin:110px 168px;animation:shadow-left 1.2s steps(1,end) infinite}.rig-leg-right{transform-origin:144px 168px;animation:shadow-right 1.2s steps(1,end) infinite}.rig-effect{animation:shadow-trail 1.2s steps(1,end) infinite}
@keyframes shadow-sidestep{0%,10%,90%,100%{transform:translate(0,0)}30%{transform:translate(-10px,-4px)}65%{transform:translate(6px,-1px)}}
@keyframes shadow-left{0%,10%,90%,100%{transform:rotate(0)}30%{transform:rotate(-18deg)}65%{transform:rotate(13deg)}}
@keyframes shadow-right{0%,10%,90%,100%{transform:rotate(0)}30%{transform:rotate(17deg)}65%{transform:rotate(-14deg)}}
@keyframes shadow-trail{0%,10%,90%,100%{opacity:.25;transform:translateX(0)}30%{opacity:.75;transform:translateX(10px)}65%{opacity:.5;transform:translateX(-7px)}}`,
 attack:`.rig-core{animation:shadow-strike 1.4s steps(1,end) 1 both}.rig-weapon{transform-origin:185px 140px;animation:shadow-knife 1.4s steps(1,end) 1 both}.rig-offhand{transform-origin:86px 143px;animation:shadow-second-knife 1.4s steps(1,end) 1 both}
@keyframes shadow-strike{0%,100%{transform:translate(0,0)}25%{transform:translate(5px,1px)}50%{transform:translate(-15px,-2px)}72%{transform:translate(-4px,0)}}
@keyframes shadow-knife{0%,100%{transform:rotate(0)}25%{transform:rotate(-55deg)}50%{transform:rotate(46deg)}72%{transform:rotate(10deg)}}
@keyframes shadow-second-knife{0%,100%{transform:rotate(0)}25%{transform:rotate(38deg)}50%{transform:rotate(-43deg)}72%{transform:rotate(-9deg)}}`,
 rest:`.rig-core{animation:shadow-crouch 4s steps(1,end) infinite}.rig-weapon{transform-origin:185px 140px;animation:shadow-sheathe 4s steps(1,end) infinite}.rig-effect{animation:shadow-darkness 4s steps(1,end) infinite}
@keyframes shadow-crouch{0%,10%,90%,100%{transform:translateY(12px) rotate(-5deg)}45%{transform:translateY(11px) rotate(-5deg)}}
@keyframes shadow-sheathe{0%,10%,90%,100%{transform:rotate(48deg)}45%{transform:rotate(46deg)}}
@keyframes shadow-darkness{0%,10%,90%,100%{opacity:.16}45%{opacity:.38}}`
 },
 ogre:{
 idle:`.rig-core{animation:ogre-heavy-breath 3.2s ease-in-out infinite}.rig-weapon{transform-origin:208px 172px;animation:ogre-club-weight 3.2s ease-in-out infinite}
@keyframes ogre-heavy-breath{0%,10%,90%,100%{transform:translate(0,0)}42%{transform:translate(0,-2px) rotate(-2deg)}70%{transform:translateY(1px)}}
@keyframes ogre-club-weight{0%,10%,90%,100%{transform:rotate(0)}42%{transform:rotate(-8deg)}70%{transform:rotate(5deg)}}`,
 move:`.rig-core{animation:ogre-lumber 1.2s steps(1,end) infinite}.rig-leg-left{transform-origin:110px 157px;animation:ogre-left 1.2s steps(1,end) infinite}.rig-leg-right{transform-origin:160px 154px;animation:ogre-right 1.2s steps(1,end) infinite}.rig-weapon{transform-origin:208px 172px;animation:ogre-club-lumber 1.2s steps(1,end) infinite}
@keyframes ogre-lumber{0%,10%,90%,100%{transform:translate(0,0)}30%{transform:translate(-6px,-3px)}65%{transform:translate(5px,1px)}}
@keyframes ogre-left{0%,10%,90%,100%{transform:rotate(0)}30%{transform:rotate(-12deg)}65%{transform:rotate(8deg)}}
@keyframes ogre-right{0%,10%,90%,100%{transform:rotate(0)}30%{transform:rotate(10deg)}65%{transform:rotate(-12deg)}}
@keyframes ogre-club-lumber{0%,10%,90%,100%{transform:rotate(0)}30%{transform:rotate(-7deg)}65%{transform:rotate(8deg)}}`,
 attack:`.rig-core{animation:ogre-slam-step 1.4s steps(1,end) 1 both}.rig-weapon{transform-origin:208px 172px;animation:ogre-club-slam 1.4s steps(1,end) 1 both}
@keyframes ogre-slam-step{0%,100%{transform:translate(0,0)}23%{transform:translate(4px,2px)}55%{transform:translate(-10px,-4px)}75%{transform:translate(-2px,1px)}}
@keyframes ogre-club-slam{0%,100%{transform:rotate(0)}23%{transform:rotate(-56deg)}55%{transform:rotate(69deg)}75%{transform:rotate(14deg)}}`,
 rest:`.rig-core{animation:ogre-rest 4s ease-in-out infinite}.rig-weapon{transform-origin:208px 172px;animation:ogre-club-ground 4s ease-in-out infinite}
@keyframes ogre-rest{0%,10%,90%,100%{transform:translateY(13px) rotate(5deg)}45%{transform:translateY(10px) rotate(5deg)}}
@keyframes ogre-club-ground{0%,10%,90%,100%{transform:rotate(58deg)}45%{transform:rotate(55deg)}}`
 }
 };
 const style=animSets[kind][mode],reduce=`@media(prefers-reduced-motion:reduce){.rig-core,.rig-head,.rig-weapon,.rig-offhand,.rig-effect,.rig-leg-left,.rig-leg-right,.dwarf-legs{animation:none!important}}`;
 if(!style)throw Error("Missing specialized motion");
 art=art.replace("</desc>","</desc>\n<style>\n"+style+"\n"+reduce+"\n</style>");
 return art;
};
