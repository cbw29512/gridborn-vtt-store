import { normalizeRecipe } from './builder-data.js';
const xml=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
const rect=(x,y,w,h,c)=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" fill="'+c+'"/>';
const path=(d,c)=>'<path d="'+d+'" fill="'+c+'"/>';
const line=(x,y,x2,y2,c,w)=>'<path d="M'+x+' '+y+'L'+x2+' '+y2+'" stroke="'+c+'" stroke-width="'+w+'" fill="none"/>';
const edge='#161c2a', dark='#273443';
function cape(r){
 if(r.cape==='None')return '';
 const p=r.palette, long=r.cape==='Long cape', end=long?211:174;
 return '<g class="rig-cape">'+path('M90 93H166L186 '+(end-12)+' 162 '+end+' 123 '+(end-10)+' 85 '+end+' 68 '+(end-12)+'Z',edge)+
 path('M95 97H161L173 '+(end-17)+' 155 '+(end-4)+' 123 '+(end-15)+' 91 '+(end-4)+' 80 '+(end-17)+'Z',p.primary)+
 line(96,102,91,end-27,p.accent,4)+line(160,102,164,end-27,p.accent,4)+'</g>';
}
function legs(r,rest=false) {
 const p=r.palette,boots=r.outfit==='Plate armor'?p.metal:dark;
 if(rest) return '<g class="rig-legs rig-legs-rest">'+path('M94 166H162L167 181H89Z',edge)+
   '<g class="rig-leg-left">'+path('M102 174H128L117 197 78 206 67 192 98 184Z',boots)+
     rect(65,193,34,15,edge)+rect(71,197,25,8,p.primary)+line(106,182,94,196,p.accent,3)+'</g>'+
   '<g class="rig-leg-right">'+path('M133 175H159L178 193 193 198 184 212 149 199Z',boots)+
     rect(165,195,30,16,edge)+rect(169,197,21,9,p.primary)+line(148,181,167,195,p.accent,3)+'</g></g>';
 return '<g class="rig-legs">'+path('M94 154H161V169H94Z',edge)+
 '<g class="rig-leg-left">'+rect(99,160,25,37,boots)+rect(99,186,26,12,edge)+
 rect(103,187,19,6,p.primary)+line(110,163,110,184,p.accent,2)+'</g>'+
 '<g class="rig-leg-right">'+rect(136,160,25,37,boots)+rect(135,186,27,12,edge)+
 rect(139,187,19,6,p.primary)+line(147,163,147,184,p.accent,2)+'</g></g>';
}
function restSeat(r) {
 const p=r.palette;
 return '<g class="rig-rest-seat">'+
 rect(94,176,69,30,edge)+rect(100,177,58,13,p.primary)+rect(103,191,12,24,'#584230')+
 rect(145,191,12,24,'#584230')+rect(99,191,60,5,p.accent)+'</g>';
}
function arms(r){
 const p=r.palette,guard=r.outfit==='Plate armor'?p.metal:r.outfit==='Wizard robes'?p.primary:p.skin;
 return '<g class="rig-arm-left">'+rect(73,108,29,56,edge)+rect(78,112,20,45,guard)+rect(78,142,20,14,p.accent)+rect(80,156,16,13,p.skin)+'</g>'+
 '<g class="rig-arm-right">'+rect(154,108,29,56,edge)+rect(159,112,20,45,guard)+rect(160,142,18,14,p.accent)+rect(160,156,17,13,p.skin)+'</g>';
}
function torso(r){
 const p=r.palette,robe=r.outfit==='Wizard robes',village=r.outfit==='Village clothes',plate=r.outfit==='Plate armor';
 let body=rect(89,101,80,65,edge)+rect(94,105,70,55,robe?p.primary:village?'#e4d2ae':p.primary);
 if(robe)body+=path('M101 105H155L174 172H82Z',p.primary)+rect(123,113,11,53,p.accent)+rect(126,114,6,49,p.primary);
 else if(plate)body+=rect(98,110,62,46,p.metal)+rect(106,114,47,37,dark)+rect(112,117,35,31,p.metal)+rect(123,117,11,31,p.accent);
 else if(village)body+=rect(107,111,45,54,'#eadabf')+rect(105,151,51,9,p.primary)+rect(116,119,7,40,p.accent);
 else body+=rect(100,113,57,37,p.primary)+rect(112,114,7,29,p.accent)+rect(139,114,7,29,p.accent);
 body+=rect(94,153,70,12,edge)+rect(99,155,60,7,p.accent)+rect(123,151,12,15,p.metal);
 return '<g class="rig-torso">'+body+'</g>';
}
function face(r){
 const p=r.palette,skeleton=r.ancestry==='Skeleton',goblin=r.ancestry==='Goblin',orc=r.ancestry==='Orc';
 const x=goblin?108:104,w=goblin?42:49;
 let out=rect(x-4,57,w+8,56,edge)+rect(x,64,w,43,p.skin);
 if(r.ancestry==='Elf'||goblin)out+=path('M109 76L83 68 96 98 110 97Z',p.skin)+path('M149 76L174 68 160 98 147 97Z',p.skin);
 if(orc)out+=rect(93,80,14,18,p.skin)+rect(151,80,14,18,p.skin);
 if(skeleton){
  out+=rect(112,82,13,12,dark)+rect(139,82,13,12,dark)+rect(127,96,7,8,dark)+rect(115,107,34,7,edge);
  for(let x=120;x<148;x+=7)out+=line(x,108,x,114,p.skin,2);
 }else{
  out+='<g class="rig-eyes">'+rect(113,85,11,7,edge)+rect(136,85,11,7,edge)+
    rect(117,85,5,3,orc?'#ffca7b':'#a3dfda')+rect(140,85,5,3,orc?'#ffca7b':'#a3dfda')+
    '</g><g class="rig-eyelids">'+rect(113,84,11,9,p.skin)+rect(136,84,11,9,p.skin)+
    line(114,90,123,90,edge,2)+line(137,90,146,90,edge,2)+'</g>';
  out+=rect(122,100,19,5,orc?'#38533f':'#88534e');
  if(orc||goblin)out+=rect(120,102,5,10,'#ede4c5')+rect(141,102,5,10,'#ede4c5');
 }
 if(r.hair!=='None'&&!skeleton){
  out+=path('M100 79V60L114 53H145L155 61V79H145V68H112V79Z',p.hair);
  if(r.hair==='Long')out+=rect(99,78,9,43,p.hair)+rect(149,78,9,43,p.hair);
  if(r.hair==='Braided')out+=rect(102,78,9,35,p.hair)+rect(148,78,9,35,p.hair)+rect(99,112,14,9,p.accent);
 }
 if(r.ancestry==='Dwarf'&&r.hair!=='None')
  out+=path('M109 104H151L145 129 130 140 113 129Z',p.hair)+rect(124,111,9,27,p.accent);
 return '<g class="rig-head">'+out+'</g>';
}
function hat(r){
 const p=r.palette; let b='';
 if(r.headgear==='Helmet')b=path('M101 78V58L115 49H143L156 61V82H146V70H112V82H102Z',p.metal)+rect(124,49,10,34,p.accent);
 if(r.headgear==='Hood')b=path('M99 87V70L109 49H147L158 70V87H147V74L142 62H114L109 74V87Z',p.primary)+path('M109 53H147L144 63H113Z',p.accent);
 if(r.headgear==='Circlet')b=rect(101,71,54,8,p.accent)+path('M124 71L129 63 135 71 129 79Z',p.metal);
 return '<g class="rig-headgear">'+b+'</g>';
}
function hand(r){
 const p=r.palette;let item='';
 if(r.weapon==='Sword')item=rect(181,63,9,79,p.metal)+path('M185 46L196 65H174Z',p.metal)+rect(171,141,30,10,p.accent)+rect(183,150,7,28,'#674b32');
 if(r.weapon==='Axe')item=rect(182,69,10,114,'#745238')+path('M173 73L203 57 221 70 217 114 191 103 173 101Z',p.metal)+rect(190,81,10,13,edge);
 if(r.weapon==='Staff')item=rect(183,70,8,119,'#805939')+path('M175 68L188 47 202 68 188 91Z',p.accent)+rect(182,64,12,14,p.metal);
 if(r.weapon==='Bow')item='<path d="M174 55Q220 119 174 180" fill="none" stroke="'+p.accent+'" stroke-width="8"/>'+line(176,57,176,179,p.metal,3);
 return '<g class="rig-weapon">'+item+'</g>';
}
function offhand(r){
 const p=r.palette;let item='';
 if(r.offhand==='Shield')item=path('M55 119H100V151L79 186 55 155Z',edge)+path('M61 126H94V151L79 176 61 149Z',p.primary)+rect(75,132,9,37,p.accent)+rect(66,145,27,8,p.metal);
 if(r.offhand==='Spellbook')item=rect(53,119,43,51,edge)+rect(58,124,17,39,p.primary)+rect(76,124,17,39,p.accent)+line(75,125,75,163,p.metal,3);
 if(r.offhand==='Lantern')item=rect(63,133,28,38,edge)+rect(68,139,18,25,p.accent)+rect(71,143,12,18,'#fff3b9')+'<path d="M70 132Q78 115 86 132" stroke="'+p.metal+'" stroke-width="5" fill="none"/>';
 return '<g class="rig-offhand">'+item+'</g>';
}
export function renderRig(input,{mode='idle',animated=false}={}) {
 const r=normalizeRecipe(input);
 if(!['idle','move','attack','rest'].includes(mode))throw new Error('Invalid rig preview mode');
 const seated=mode==='rest';
 const layers=(seated?restSeat(r):'')+
   '<g class="rig-back">'+cape(r)+'</g>'+legs(r,seated)+
   '<g class="rig-upper">'+arms(r)+torso(r)+face(r)+hat(r)+hand(r)+offhand(r)+'</g>';
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" role="img" aria-label="'+xml(r.name)+
 ' modular fantasy token" shape-rendering="crispEdges" class="rig-image mode-'+mode+(animated?' rig-animated':'')+'">'+
 '<title>'+xml(r.name)+'</title><desc>Gridborn original modular block fantasy character concept</desc>'+
 '<ellipse cx="128" cy="209" rx="71" ry="19" fill="#070e18" opacity=".39"/>'+
 '<ellipse cx="128" cy="204" rx="74" ry="24" fill="none" stroke="'+r.palette.accent+'" stroke-width="4" opacity=".85"/>'+
 '<g class="rig-figure">'+layers+'</g></svg>';
}
