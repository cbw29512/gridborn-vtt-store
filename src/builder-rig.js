import { normalizeRecipe } from './builder-data.js';
import {renderSpecialtyBack,renderSpecialtyFront,renderRightDagger,renderLeftDagger} from './rig-specialty.js';
import {rigProportions} from './rig-proportions.js';
import {performerBack,performerFront,performerOffhand} from './rig-performer-gear.js';
import {casterBack,casterFront,casterWeapon} from './rig-caster-gear.js';
const xml=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
const rect=(x,y,w,h,c)=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" fill="'+c+'"/>';
const path=(d,c)=>'<path d="'+d+'" fill="'+c+'"/>';
const line=(x,y,x2,y2,c,w)=>'<path d="M'+x+' '+y+'L'+x2+' '+y2+'" stroke="'+c+'" stroke-width="'+w+'" fill="none"/>';
const edge='#161c2a', dark='#273443';
// Consistent north-west key light; every interchangeable block shares a palette.
const tint=(color,amount)=>{
 const value=color.slice(1);
 const parts=[0,2,4].map(start=>parseInt(value.slice(start,start+2),16));
 return '#'+parts.map(n=>Math.max(0,Math.min(255,Math.round(
  amount>0?n+(255-n)*amount:n*(1+amount)
 ))).toString(16).padStart(2,'0')).join('');
};

function cape(r){
 if(r.cape==='None')return '';
 const p=r.palette, long=r.cape==='Long cape', end=long?211:174;
 return '<g class="rig-cape">'+path('M90 93H166L186 '+(end-12)+' 162 '+end+' 123 '+(end-10)+' 85 '+end+' 68 '+(end-12)+'Z',edge)+
 path('M95 97H161L173 '+(end-17)+' 155 '+(end-4)+' 123 '+(end-15)+' 91 '+(end-4)+' 80 '+(end-17)+'Z',p.primary)+
 line(96,102,91,end-27,p.accent,4)+line(160,102,164,end-27,p.accent,4)+
 path('M103 111L111 123 104 '+(end-22)+' 117 '+(end-15)+' 91 '+(end-8)+'Z',tint(p.primary,-.28))+
 path('M151 110L158 118 165 '+(end-13)+' 155 '+(end-9)+'Z',tint(p.primary,.22))+
 rect(119,101,18,5,tint(p.accent,.26))+'</g>';
}
function legs(r,rest=false) {
 const p=r.palette,boots=['Plate armor','Paladin tabard'].includes(r.outfit)?p.metal:dark;
 if(rest) return '<g class="rig-legs rig-legs-rest">'+path('M94 166H162L167 181H89Z',edge)+
   '<g class="rig-leg-left">'+path('M102 174H128L117 197 78 206 67 192 98 184Z',boots)+
     rect(65,193,34,15,edge)+rect(71,197,25,8,p.primary)+rect(73,199,16,3,tint(p.primary,.28))+
     line(106,182,94,196,p.accent,3)+'</g>'+
   '<g class="rig-leg-right">'+path('M133 175H159L178 193 193 198 184 212 149 199Z',boots)+
     rect(165,195,30,16,edge)+rect(169,197,21,9,p.primary)+rect(172,199,12,3,tint(p.primary,.28))+
     line(148,181,167,195,p.accent,3)+'</g></g>';
 return '<g class="rig-legs">'+path('M94 154H161V169H94Z',edge)+
 '<g class="rig-leg-left">'+rect(99,160,25,37,boots)+rect(99,186,26,12,edge)+
 rect(103,187,19,6,p.primary)+rect(101,164,5,17,tint(boots,.31))+
 line(110,163,110,184,p.accent,2)+'</g>'+
 '<g class="rig-leg-right">'+rect(136,160,25,37,boots)+rect(135,186,27,12,edge)+
 rect(139,187,19,6,p.primary)+rect(138,164,4,17,tint(boots,.27))+
 line(147,163,147,184,p.accent,2)+'</g></g>';
}
function restSeat(r) {
 const p=r.palette;
 return '<g class="rig-rest-seat">'+
 rect(94,176,69,30,edge)+rect(100,177,58,13,p.primary)+rect(103,191,12,24,'#584230')+
 rect(145,191,12,24,'#584230')+rect(99,191,60,5,p.accent)+
 rect(100,179,58,4,tint(p.primary,.3))+rect(107,195,5,16,'#987751')+
 rect(147,195,5,16,'#987751')+'</g>';
}
function arms(r){
 const p=r.palette,guard=['Plate armor','Paladin tabard'].includes(r.outfit)?p.metal:r.outfit==='Wizard robes'?p.primary:p.skin;
 return '<g class="rig-arm-left">'+rect(73,108,29,56,edge)+rect(78,112,20,45,guard)+rect(78,142,20,14,p.accent)+rect(80,156,16,13,p.skin)+
 rect(79,114,5,24,tint(guard,.28))+rect(82,158,4,7,tint(p.skin,.24))+'</g>'+
 '<g class="rig-arm-right">'+rect(154,108,29,56,edge)+rect(159,112,20,45,guard)+rect(160,142,18,14,p.accent)+rect(160,156,17,13,p.skin)+
 rect(160,114,5,24,tint(guard,.26))+rect(162,158,4,8,tint(p.skin,.25))+'</g>';
}
function torso(r){
 const p=r.palette,robe=r.outfit==='Wizard robes',village=r.outfit==='Village clothes',plate=['Plate armor','Paladin tabard'].includes(r.outfit),oath=r.outfit==='Paladin tabard';
 let body=rect(89,101,80,65,edge)+rect(94,105,70,55,robe?p.primary:village?'#e4d2ae':p.primary);
 if(robe)body+=path('M101 105H155L174 172H82Z',p.primary)+
 path('M99 112H107L92 161H84Z',tint(p.primary,.24))+
 path('M149 111H157L172 164H160Z',tint(p.primary,-.29))+
 rect(123,113,11,53,p.accent)+rect(126,114,6,49,p.primary)+
 rect(124,117,3,42,tint(p.accent,.34))+
 rect(110,130,9,4,tint(p.accent,.15));
 else if(plate)body+=rect(98,110,62,46,p.metal)+
 rect(100,111,7,36,tint(p.metal,.48))+
 rect(153,115,5,35,tint(p.metal,-.3))+
 rect(106,114,47,37,dark)+rect(112,117,35,31,p.metal)+
 path('M114 119H124L118 141H114Z',tint(p.metal,.5))+
 rect(140,118,5,28,tint(p.metal,-.31))+
 rect(123,117,11,31,p.accent)+
 rect(109,146,8,4,p.accent)+rect(141,146,8,4,p.accent);
 else if(village)body+=rect(107,111,45,54,'#eadabf')+
 rect(110,116,5,36,'#fff0d2')+rect(146,116,4,35,'#bfa688')+
 rect(105,151,51,9,p.primary)+rect(116,119,7,40,p.accent)+
 rect(135,126,9,3,tint(p.accent,-.25));
 else body+=rect(100,113,57,37,p.primary)+rect(102,115,6,28,tint(p.primary,.3))+
 rect(150,115,5,32,tint(p.primary,-.25))+
 rect(112,114,7,29,p.accent)+rect(139,114,7,29,p.accent)+
 rect(108,145,42,3,tint(p.accent,.3));
 body+=rect(94,153,70,12,edge)+rect(99,155,60,7,p.accent)+rect(123,151,12,15,p.metal)+rect(127,153,4,6,tint(p.metal,.49));
 if(oath){
   const sun='<g class="rig-oath-symbol">'+
     rect(124,130,10,10,p.accent)+rect(127,127,4,16,tint(p.accent,.43))+
     rect(121,133,16,4,tint(p.accent,.2))+'</g>';
   body+='<g class="rig-paladin-tabard">'+
     path('M109 143H148L158 199 135 217 127 209 116 220 101 205Z',edge)+
     path('M114 146H144L151 196 135 207 127 200 117 211 108 200Z',p.primary)+
     path('M116 151H121L116 193 110 201Z',tint(p.primary,.38))+
     path('M139 151H145L151 195 141 203Z',tint(p.primary,-.19))+
     line(129,160,129,200,p.accent,4)+sun+'</g>';
 }
 return '<g class="rig-torso">'+body+'</g>';
}
function face(r){
 const p=r.palette,skeleton=r.ancestry==='Skeleton',goblin=r.ancestry==='Goblin',orc=r.ancestry==='Orc';
 const x=goblin?108:104,w=goblin?42:49;
 let out=rect(x-4,57,w+8,56,edge)+rect(x,64,w,43,p.skin)+
 rect(x+3,69,5,21,tint(p.skin,.25))+
 rect(x+w-5,69,4,28,tint(p.skin,-.23))+
 rect(x+8,98,w-17,4,tint(p.skin,-.12));
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
  out+=rect(125,92,7,7,tint(p.skin,-.19))+
    rect(122,100,19,5,orc?'#38533f':'#88534e');
  if(orc||goblin)out+=rect(120,102,5,10,'#ede4c5')+rect(141,102,5,10,'#ede4c5');
 }
 if(r.hair!=='None'&&!skeleton){
  out+=path('M100 79V60L114 53H145L155 61V79H145V68H112V79Z',p.hair)+
     rect(111,57,30,4,tint(p.hair,.23));
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
 if(r.weapon==='Sword')item=rect(181,63,9,79,p.metal)+
 path('M185 46L196 65H174Z',p.metal)+rect(182,66,3,71,tint(p.metal,.58))+
 rect(171,141,30,10,p.accent)+rect(174,143,24,3,tint(p.accent,.3))+
 rect(183,150,7,28,'#674b32');
 if(r.weapon==='Axe')item=rect(182,69,10,114,'#745238')+
 rect(185,71,3,104,'#b48b56')+
 path('M173 73L203 57 221 70 217 114 191 103 173 101Z',p.metal)+
 path('M203 61L216 72 214 85 199 79Z',tint(p.metal,.5))+
 rect(190,81,10,13,edge);
 if(r.weapon==='Mace')item=rect(182,83,10,102,'#745b43')+
 rect(185,85,3,98,tint(p.metal,.22))+
 path('M175 65H198L204 74 202 99 196 105H177L171 97 170 76Z',p.metal)+
 path('M179 70H192L196 78 196 95 188 101 177 94Z',tint(p.metal,.35))+
 rect(169,80,37,7,p.accent)+rect(169,91,37,7,p.accent)+
 rect(184,65,7,40,tint(p.metal,.55));
 if(r.weapon==='Staff')item=rect(183,70,8,119,'#805939')+
 rect(184,75,3,109,'#bc9163')+
 path('M175 68L188 47 202 68 188 91Z',p.accent)+
 path('M187 55L193 68 187 80 182 69Z',tint(p.accent,.48))+
 rect(182,64,12,5,p.metal);
 if(r.weapon==='Bow')item='<path d="M174 55Q220 119 174 180" fill="none" stroke="'+p.accent+'" stroke-width="8"/>'+line(176,57,176,179,p.metal,3);
 return '<g class="rig-weapon">'+item+renderRightDagger(r)+casterWeapon(r)+'</g>';
}
function offhand(r){
 const p=r.palette;let item='';
 if(r.offhand==='Shield')item=path('M55 119H100V151L79 186 55 155Z',edge)+
 path('M61 126H94V151L79 176 61 149Z',p.primary)+
 path('M63 128H70V155L77 174 61 150Z',tint(p.primary,.33))+
 rect(75,132,9,37,p.accent)+rect(66,145,27,8,p.metal)+
 rect(67,146,22,3,tint(p.metal,.47))+
 rect(77,145,6,8,tint(p.accent,.32));
 if(r.offhand==='Spellbook')item=rect(53,119,43,51,edge)+rect(58,124,17,39,p.primary)+rect(76,124,17,39,p.accent)+line(75,125,75,163,p.metal,3);
 if(r.offhand==='Lantern')item=rect(63,133,28,38,edge)+rect(68,139,18,25,p.accent)+rect(71,143,12,18,'#fff3b9')+'<path d="M70 132Q78 115 86 132" stroke="'+p.metal+'" stroke-width="5" fill="none"/>';
 return '<g class="rig-offhand">'+item+renderLeftDagger(r)+performerOffhand(r)+'</g>';
}
export function renderRig(input,{mode='idle',animated=false}={}) {
 try {
 const r=normalizeRecipe(input);
 if(!['idle','move','attack','rest'].includes(mode))throw new Error('Invalid rig preview mode');
 const seated=mode==='rest';
 const layers=(seated?restSeat(r):'')+
   '<g class="rig-back">'+cape(r)+renderSpecialtyBack(r)+performerBack(r)+casterBack(r)+'</g>'+legs(r,seated)+
   '<g class="rig-upper">'+arms(r)+torso(r)+renderSpecialtyFront(r)+performerFront(r)+casterFront(r)+face(r)+hat(r)+hand(r)+offhand(r)+'</g>';
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" role="img" aria-label="'+xml(r.name)+
 ' modular fantasy token" shape-rendering="crispEdges" class="rig-image mode-'+mode+(animated?' rig-animated':'')+'">'+
 '<title>'+xml(r.name)+'</title><desc>Gridborn original modular block fantasy character concept</desc>'+
 '<ellipse cx="128" cy="209" rx="71" ry="19" fill="#070e18" opacity=".39"/>'+
 '<ellipse cx="128" cy="204" rx="74" ry="24" fill="none" stroke="'+r.palette.accent+'" stroke-width="4" opacity=".85"/>'+
 '<g class="rig-figure"><g class="rig-proportions" transform="'+rigProportions(r.ancestry)+'">'+layers+'</g></g></svg>';
 } catch(error) {
  console.error('Unable to render humanoid prebuilt rig',error);
  throw error;
 }
}
