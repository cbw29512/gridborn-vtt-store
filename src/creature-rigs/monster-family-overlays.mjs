/** Reuse Ogre/Goblin anatomy and preserve original asset-gait source, with role-specific gear. */
export const MONSTER_VARIANTS=Object.freeze([{"name":"Ogre","id":"mon-srd-52-ogre","stem":"srd-ogre","base":"cave-ogre"},{"name":"Goblin Boss","id":"mon-srd-52-goblin-boss","stem":"srd-goblin-boss","base":"cave-goblin"}]);
const modes=Object.freeze(["still","idle","move","attack","rest"]);
const ogreArmor="<g class=\"ogre-role-armor\">\n<path d=\"M90 106L113 112 157 106 181 112 182 140 161 151 102 148 80 137Z\" fill=\"#76583f\" stroke=\"#373032\" stroke-width=\"4\"/>\n<path d=\"M102 112l21 9 29-6-1 25h-43z\" fill=\"#a17e53\" stroke=\"#3b2f2c\" stroke-width=\"4\"/>\n<path d=\"M106 110l16 38m25-36l-13 35\" stroke=\"#c4ab81\" stroke-width=\"7\"/>\n<path d=\"M105 146h72v13h-72Z\" fill=\"#52403a\" stroke=\"#ac864d\" stroke-width=\"3\"/>\n<path d=\"M127 147h22v10h-22z\" fill=\"#d2b77b\"/>\n</g>",ogreHelm="<g class=\"ogre-role-helm\">\n<path d=\"M96 72l8-16 35-16 27 19 7 12-27-13-39 14Z\" fill=\"#635246\" stroke=\"#302b2d\" stroke-width=\"4\"/>\n<path d=\"M117 52l22-8 21 17\" fill=\"none\" stroke=\"#a88c6e\" stroke-width=\"5\"/>\n<path d=\"M130 65h10l-2 23h-9Z\" fill=\"#adb9b6\" stroke=\"#3e494e\" stroke-width=\"2\"/>\n</g>",ogreWeapon="<g class=\"ogre-ironbound-club\">\n<path d=\"M179 42l16-23 11 7-16 25Z\" fill=\"#9aa7a8\" stroke=\"#485458\" stroke-width=\"4\"/>\n<path d=\"M209 26l11 7-2 27-11 9\" fill=\"none\" stroke=\"#b7bec1\" stroke-width=\"6\"/>\n<path d=\"M194 63l14 5\" fill=\"none\" stroke=\"#dfb46e\" stroke-width=\"3\"/>\n</g>";
const goblinArmor="<g class=\"boss-role-armor\">\n<path d=\"M105 105l19-6 23 6 18 23-14 26h-42l-16-27Z\" fill=\"#593d3a\" stroke=\"#332c31\" stroke-width=\"4\"/>\n<path d=\"M110 113l16-6 10 17-10 22-21-10Z\" fill=\"#986047\" stroke=\"#e5b87b\" stroke-width=\"3\"/>\n<path d=\"M139 113l12 5 10 15-12 13-17-8Z\" fill=\"#79534b\" stroke=\"#cfb274\" stroke-width=\"3\"/>\n<path d=\"M109 150h43v10h-43z\" fill=\"#cc9b5b\" stroke=\"#574433\" stroke-width=\"3\"/>\n<path d=\"M124 149h14v11h-14z\" fill=\"#324f55\"/>\n</g>",goblinHelm="<g class=\"boss-copper-crown\">\n<path d=\"M108 59l-4-20 15 12 14-22 12 22 18-12-5 22Z\" fill=\"#b18646\" stroke=\"#43342e\" stroke-width=\"4\"/>\n<path d=\"M113 61h43v12h-43Z\" fill=\"#936943\" stroke=\"#41342e\" stroke-width=\"3\"/>\n<path d=\"M119 60l14-17 10 17\" fill=\"none\" stroke=\"#e5bd76\" stroke-width=\"4\"/>\n<path d=\"M132 63h9v10h-9z\" fill=\"#b14d3f\"/>\n</g>",goblinSword="<g class=\"boss-steel-sword\">\n<path d=\"M183 82l5-38 10 17-11 43h-4Z\" fill=\"#d5e1db\" stroke=\"#4a5559\" stroke-width=\"3\"/>\n<path d=\"M170 128l15 4 15-5-4 12h-21z\" fill=\"#e1bc78\" stroke=\"#49453f\" stroke-width=\"3\"/>\n</g>";
function change(s,from,to){if(!s.includes(from))throw Error("No source anchor "+from.slice(0,55));return s.replace(from,to)}
function renderVariant(role,mode,src){
 if(!modes.includes(mode)||!src.includes('viewBox="0 0 256 240"'))throw Error("Bad source/mode");
 let s=src.replaceAll(role.base==="cave-ogre"?"Cave Ogre":"Cave Goblin",role.name)
 .replace('<svg ',`<svg data-gridborn-family="${role.base==="cave-ogre"?"ogre":"goblin"}" data-source-body="${role.base}" `);
 if(mode!=="still"&&!s.includes(`data-gridborn-mode="${mode}"`))s=change(s,'<svg ',`<svg data-gridborn-mode="${mode}" `);
 if(role.base==="cave-ogre"){
  s=change(s,'<g class="rig-head">',ogreArmor+'<g class="rig-head">');
  s=change(s,'<g class="rig-arm-left">',ogreHelm+'<g class="rig-arm-left">');
  s=change(s,'<g class="rig-weapon">','<g class="rig-weapon">'+ogreWeapon);
 }else{
  if(mode==="still"){
   s=change(s,'<!-- shadows and pointed legs -->','<g class="body">\n<!-- shadows and pointed legs -->');
   s=change(s,'</svg>','</g>\n</svg>');
  }
  s=change(s,'<!-- face and giant ears -->',goblinArmor+'<!-- face and giant ears -->');
  if(s.includes('<g class="blade">')){
   s=change(s,'<g class="blade">',goblinHelm+'<g class="blade">'+goblinSword);
  }else{
   s=change(s,'<!-- crooked dagger -->',goblinHelm+'<g class="blade">'+goblinSword+'<!-- crooked dagger -->');
   s=change(s,'<!-- battered buckler -->','</g>\n<!-- battered buckler -->');
  }
 }
 if(!s.includes('data-source-body=')||(!s.includes('boss-role-armor')&&!s.includes('ogre-role-armor')))
  throw Error('Missing role overlay');
 return s;
}
export {renderVariant};
