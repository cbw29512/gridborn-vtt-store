/** Two SRD Undead monsters derived deterministically from original Ogre/Skeleton body families.
 * Source artwork is not overwritten; every stage inherits original rig anchors. */
export const UNDEAD_VARIANTS=Object.freeze([{"id":"mon-srd-52-ogre-zombie","name":"Ogre Zombie","source":"cave-ogre","stem":"srd-ogre-zombie","kind":"zombie"},{"id":"mon-srd-52-skeleton","name":"Skeleton","source":"skeleton-warrior","stem":"srd-skeleton","kind":"skeleton"}]);
const zPalette=Object.freeze({"#546d6a":"#536055","#78908a":"#82917b","#668078":"#697865","#5c7873":"#667566","#849b8a":"#8d8a72","#8f9b7e":"#999078","#324c51":"#465751","#22343b":"#303c38","#e3c37d":"#c9b571","#eee2ba":"#dbd0b0","#4e6666":"#536056","#476061":"#556058"});
const zTorn="<g class=\"zombie-ragged-apron\">\n<path d=\"M89 117L114 113 152 118 174 109 184 144 162 152 153 173 142 164 124 180 111 164 92 173 80 146Z\" fill=\"#675c4a\" stroke=\"#3f413c\" stroke-width=\"4\"/>\n<path d=\"M97 121l21 9 26-7 24 8\" fill=\"none\" stroke=\"#a99d72\" stroke-width=\"5\"/>\n<path d=\"M118 133l12 18 9-8 15 17\" fill=\"none\" stroke=\"#3c4742\" stroke-width=\"5\"/>\n<path d=\"M103 151l8 12 11-8m30-8l-10 17\" stroke=\"#b9ad85\" stroke-width=\"3\"/>\n</g>",zFace="<g class=\"zombie-decay-face\">\n<path d=\"M102 90l9-12 7 5-3 17-8 5Z\" fill=\"#35443d\" stroke=\"#b7a581\" stroke-width=\"3\"/>\n<path d=\"M151 98l10-8 7 15-13 8Z\" fill=\"#48534a\"/>\n<path d=\"M114 86l8 5-9 5\" stroke=\"#ced6a5\" stroke-width=\"3\" fill=\"none\"/>\n<path d=\"M139 49l10 5-8 7\" stroke=\"#32443d\" stroke-width=\"4\" fill=\"none\"/>\n<path d=\"M155 119l9 4\" stroke=\"#4b5746\" stroke-width=\"4\"/>\n</g>",zWeapon="<g class=\"zombie-weathered-club\">\n<path d=\"M189 38l17 11-10 15m18-27l-12 13\" fill=\"none\" stroke=\"#403b39\" stroke-width=\"5\"/>\n<path d=\"M198 26l11 8\" stroke=\"#c1b9a2\" stroke-width=\"3\"/>\n<path d=\"M200 87l9 7\" stroke=\"#544239\" stroke-width=\"4\"/>\n</g>";
const zMotion=Object.freeze({"idle":".rig-core{animation:ogre-zombie-sway 3.2s steps(1,end) infinite}.rig-weapon{animation:ogre-zombie-hold 3.2s steps(1,end) infinite;transform-origin:208px 172px}\n@keyframes ogre-zombie-sway{0%,100%{transform:translate(0,0) rotate(-2deg)}38%{transform:translate(2px,1px) rotate(2deg)}76%{transform:translate(-1px,1px) rotate(-3deg)}}\n@keyframes ogre-zombie-hold{0%,100%{transform:rotate(8deg)}38%{transform:rotate(-3deg)}76%{transform:rotate(5deg)}}","move":".rig-core{animation:ogre-zombie-drag 1.2s steps(1,end) infinite}.rig-leg-left{animation:ogre-zombie-drag-leg 1.2s steps(1,end) infinite;transform-origin:110px 157px}.rig-leg-right{animation:ogre-zombie-catch-leg 1.2s steps(1,end) infinite;transform-origin:160px 154px}.rig-weapon{animation:ogre-zombie-carry 1.2s steps(1,end) infinite;transform-origin:208px 172px}\n@keyframes ogre-zombie-drag{0%,100%{transform:translate(0,0)}33%{transform:translate(-3px,2px)}66%{transform:translate(4px,-2px)}}\n@keyframes ogre-zombie-drag-leg{0%,100%{transform:rotate(-9deg)}33%{transform:rotate(-2deg)}66%{transform:rotate(-13deg)}}\n@keyframes ogre-zombie-catch-leg{0%,100%{transform:rotate(2deg)}33%{transform:rotate(13deg)}66%{transform:rotate(-9deg)}}\n@keyframes ogre-zombie-carry{0%,100%{transform:rotate(15deg)}33%{transform:rotate(8deg)}66%{transform:rotate(19deg)}}","attack":".rig-core{animation:ogre-zombie-slam 1.4s steps(1,end) 1 both}.rig-weapon{animation:ogre-zombie-club 1.4s steps(1,end) 1 both;transform-origin:208px 172px}\n@keyframes ogre-zombie-slam{0%,100%{transform:translate(0,0)}30%{transform:translate(3px,1px)}60%{transform:translate(-9px,-3px)}82%{transform:translate(-2px,1px)}}\n@keyframes ogre-zombie-club{0%,100%{transform:rotate(0)}30%{transform:rotate(-34deg)}60%{transform:rotate(68deg)}82%{transform:rotate(15deg)}}","rest":".rig-core{animation:ogre-zombie-inert 4s steps(1,end) infinite}.rig-weapon{animation:ogre-zombie-ground-club 4s steps(1,end) infinite;transform-origin:208px 172px}\n@keyframes ogre-zombie-inert{0%,100%{transform:translateY(13px) rotate(5deg)}}\n@keyframes ogre-zombie-ground-club{0%,100%{transform:rotate(57deg)}}"});
const sPalette=Object.freeze({"#56465b":"#524841","#242534":"#292c30","#857085":"#7a6d61","#322d41":"#45433e","#855760":"#65716a","#b47f7d":"#909d89","#92c4b3":"#9da77b","#c9ab78":"#c1aa79","#ebd4a0":"#d5b986"});
const sStraps="<g class=\"skeleton-plain-gear\">\n<path d=\"M108 111l11 6 26-8\" stroke=\"#836c50\" stroke-width=\"5\" fill=\"none\"/>\n<path d=\"M109 149l9 6m28-6l-8 8\" stroke=\"#ac9374\" stroke-width=\"3\" fill=\"none\"/>\n<path d=\"M101 135l7 10\" stroke=\"#b6ae93\" stroke-width=\"3\"/>\n</g>",sCracks="<g class=\"skeleton-grave-cracks\">\n<path d=\"M129 58l-5 9 7 7-5 9\" stroke=\"#645e53\" stroke-width=\"4\" fill=\"none\"/>\n<path d=\"M117 104l-5-4m36-3l-3 7\" stroke=\"#9b8e73\" stroke-width=\"3\"/>\n</g>",sShield="<g class=\"skeleton-iron-rim\">\n<path d=\"M64 128H99v28l-16 28-18-26Z\" fill=\"none\" stroke=\"#74847a\" stroke-width=\"4\"/>\n<path d=\"M83 134v36\" stroke=\"#d0b98c\" stroke-width=\"4\"/>\n</g>",sBlade="<g class=\"skeleton-rusted-sword\">\n<path d=\"M194 56l2 27-4 10\" stroke=\"#aa865f\" stroke-width=\"3\" fill=\"none\"/>\n<path d=\"M188 135h19\" stroke=\"#c4a16c\" stroke-width=\"3\"/>\n</g>";
function renderUndead(role,mode,src){
 if(!["still","idle","move","attack","rest"].includes(mode)||typeof src!=="string"||!src.includes('viewBox="0 0 256 240"'))
  throw Error("Invalid undead family source");
 const zombie=role.kind==="zombie";
 const label=zombie?"Cave Ogre":"Skeleton Warrior";
 const group=zombie?"rig-core":"bone-ribcage";
 if(!src.includes(label)||!src.includes(`class="${group}"`))throw Error("Missing source anatomy");
 let svg=src.replaceAll(label,role.name).replace("<svg ",`<svg data-undead-family="${zombie?"ogre":"skeleton"}" data-source-body="${role.source}" `);
 if(zombie){
  for(const [old,color] of Object.entries(zPalette))svg=svg.replaceAll(old,color);
  svg=svg.replace('<g class="rig-head">',zTorn+'\n<g class="rig-head">');
  svg=svg.replace('<g class="rig-arm-left">',zFace+'\n<g class="rig-arm-left">');
  svg=svg.replace('<g class="rig-weapon">','<g class="rig-weapon">'+zWeapon);
  if(mode!=="still")svg=svg.replace('</style>',zMotion[mode]+'\n</style>');
 }else{
  for(const [old,color] of Object.entries(sPalette))svg=svg.replaceAll(old,color);
  svg=svg.replace('<g class="bone-arm-left">',sStraps+'\n<g class="bone-arm-left">');
  svg=svg.replace('</g>\n<g class="bone-blade">',sCracks+'\n</g>\n<g class="bone-blade">');
  svg=svg.replace('<g class="bone-shield">','<g class="bone-shield">'+sShield);
  svg=svg.replace('<g class="bone-blade">','<g class="bone-blade">'+sBlade);
 }
 if(!svg.includes(`data-source-body="${role.source}"`))throw Error("Missing source identity");
 if(zombie&&!svg.includes('zombie-ragged-apron'))throw Error("Missing zombie clothing");
 if(!zombie&&!svg.includes('skeleton-grave-cracks'))throw Error("Missing undead bone identity");
 if(mode!=="still"&&!svg.includes(`data-gridborn-mode="${mode}"`))throw Error("Lost animation stage");
 return svg;
}
export {renderUndead};
