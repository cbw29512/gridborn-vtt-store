/** Reuse Ogre/Goblin anatomy and preserve original asset-gait source, with role-specific gear. */
export const MONSTER_VARIANTS=Object.freeze([{"name":"Ogre","id":"mon-srd-52-ogre","stem":"srd-ogre","base":"cave-ogre"},{"name":"Goblin Boss","id":"mon-srd-52-goblin-boss","stem":"srd-goblin-boss","base":"cave-goblin"},{"rank":"warrior","name":"Goblin Warrior","id":"mon-srd-52-goblin-warrior","stem":"srd-goblin-warrior","base":"cave-goblin"},{"rank":"minion","name":"Goblin Minion","id":"mon-srd-52-goblin-minion","stem":"srd-goblin-minion","base":"cave-goblin"}]);
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

// Additional independently researched Goblin ranks reuse exactly the Cave Goblin limb and grip anatomy.
const RANK_OVERLAYS=Object.freeze({"warrior":{"torso":"<g class=\"warrior-role-armor\">\n<path d=\"M105 106l14-7 31 3 15 24-11 30h-47l-14-27Z\" fill=\"#38494d\" stroke=\"#26353a\" stroke-width=\"4\"/>\n<path d=\"M111 112l34-6 14 23-13 20h-34l-12-22Z\" fill=\"#879699\" stroke=\"#45545d\" stroke-width=\"4\"/>\n<path d=\"M110 117l43 8m-42 7l40 7\" stroke=\"#dccdb1\" stroke-width=\"3\"/>\n<path d=\"M109 149h45v9h-45Z\" fill=\"#7c4d40\" stroke=\"#cea974\" stroke-width=\"3\"/>\n</g>","helm":"<g class=\"warrior-iron-helmet\">\n<path d=\"M110 62l9-13 22-5 16 15 4 12-52 1Z\" fill=\"#a5b1ad\" stroke=\"#42545e\" stroke-width=\"4\"/>\n<path d=\"M106 70h54\" stroke=\"#c4cac0\" stroke-width=\"5\"/>\n<path d=\"M132 65h8v23h-8Z\" fill=\"#b3bcb8\" stroke=\"#4f6068\" stroke-width=\"2\"/>\n</g>","weapon":"<g class=\"warrior-steel-saber\">\n<path d=\"M179 90l10-47 7 14-10 56h-8Z\" fill=\"#c9d7d8\" stroke=\"#40525b\" stroke-width=\"4\"/>\n<path d=\"M168 125l17 7 16-5-5 12h-23Z\" fill=\"#cac0a4\" stroke=\"#50443e\" stroke-width=\"3\"/>\n</g>"},"minion":{"torso":"<g class=\"minion-role-rags\">\n<path d=\"M107 103l19 6 25-8 14 30-15 29-42-3-12-27Z\" fill=\"#745e46\" stroke=\"#3d3435\" stroke-width=\"4\"/>\n<path d=\"M111 111l24 7-12 19-13-7Z\" fill=\"#ac9269\"/>\n<path d=\"M141 111l17 15-9 25-12-6Z\" fill=\"#515d48\"/>\n<path d=\"M114 148l36 8-9 9-28-6Z\" fill=\"#4e4637\"/>\n</g>","helm":"<g class=\"minion-role-headwrap\">\n<path d=\"M111 57l15-11 27 6 5 14-48-1Z\" fill=\"#65513d\" stroke=\"#3c3634\" stroke-width=\"3\"/>\n<path d=\"M114 66l-4 13m40-14l8 16\" stroke=\"#af8d62\" stroke-width=\"4\"/>\n</g>","weapon":"<g class=\"minion-iron-dagger\">\n<path d=\"M180 92l7-25 7 12-7 26h-7Z\" fill=\"#c1c7ba\" stroke=\"#48565c\" stroke-width=\"3\"/>\n<path d=\"M175 128h22l-5 9h-15Z\" fill=\"#887354\" stroke=\"#393b37\" stroke-width=\"3\"/>\n</g>"}});
function renderRankVariant(role,mode,raw){
 if(!["still","idle","move","attack","rest"].includes(mode)||!raw.includes('viewBox="0 0 256 240"')||role.base!=="cave-goblin")throw Error("Invalid Goblin rank source");
 const overlay=RANK_OVERLAYS[role.rank];
 if(!overlay)throw Error("Goblin rank unknown: "+role.rank);
 let text=raw.replaceAll("Cave Goblin",role.name).replace("<svg ",`<svg data-source-body="cave-goblin" data-gridborn-family="goblin" `);
 if(mode!=="still"&&!text.includes(`data-gridborn-mode="${mode}"`))text=text.replace("<svg ",`<svg data-gridborn-mode="${mode}" `);
 if(mode==="still")text=text.replace('<!-- shadows and pointed legs -->','<g class="body">\n<!-- shadows and pointed legs -->').replace('</svg>','</g>\n</svg>');
 const face='<!-- face and giant ears -->';
 if(!text.includes(face))throw Error("Goblin body anatomy missing face");
 text=text.replace(face,overlay.torso+face);
 if(text.includes('<g class="blade">')){
  text=text.replace('<g class="blade">',overlay.helm+'<g class="blade">'+overlay.weapon);
 }else{
  if(!text.includes('<!-- crooked dagger -->')||!text.includes('<!-- battered buckler -->'))throw Error("Goblin grip anchors missing");
  text=text.replace('<!-- crooked dagger -->',overlay.helm+'<g class="blade">'+overlay.weapon+'<!-- crooked dagger -->');
  text=text.replace('<!-- battered buckler -->','</g>\n<!-- battered buckler -->');
 }
 if(!text.includes(`data-source-body="cave-goblin"`)||!text.includes(`class="body"`))throw Error("Missing Goblin source body");
 return text;
}
export {renderRankVariant};
