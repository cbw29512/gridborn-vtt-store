/** A transparent view of the two source-of-truth asset rosters. No purchases. */
const $=id=>document.getElementById(id);
const stages={
 'animated-study':'Animated study',
 'static-study':'Static study',
 'static-related':'Related art study',
 'catalog-concept':'Catalog concept',
 'not-produced':'Not produced'
};
const modes=['idle','move','attack','rest'];
let rosters=[];
function node(tag,css='',value=''){
 const el=document.createElement(tag);
 if(css)el.className=css;
 if(value!==undefined&&value!==null)el.textContent=String(value);
 return el;
}
function card(asset,category) {
 const article=node('article','production-card');
 const top=node('div','production-card-top'),nameBlock=node('div');
 nameBlock.append(node('span','eyebrow',category==='heroes'?'PREMADE HERO':'MONSTER'),
   node('h3','',asset.displayName));
 const state=node('span','production-state',stages[asset.artStatus]??'In development');
 state.dataset.state=asset.artStatus;
 top.append(nameBlock,state);
 article.append(top,node('div','production-card-meta',
   (asset.class??asset.family)+' · '+asset.size+' · '+asset.rigFamily));
 for(const [title,key] of [['Silhouette','silhouette'],['Gear & materials','equipment'],
   ['Signature accuracy','acceptance']]) {
  const para=node('p','production-detail');
  para.append(node('strong','',title+': '),document.createTextNode(asset[key]));
  article.append(para);
 }
 const animations=node('div','production-animations');
 for(const key of modes) {
  const row=node('div');
  row.append(node('b','',key.toUpperCase()),node('span','',asset.animation[key]));
  animations.append(row);
 }
 article.append(animations,node('div','production-gates',
   'Visual acceptance: pending · VTT import: untested · Not for sale'));
 return article;
}
function visibleStatus(value,selected) {
 if(selected==='all')return true;
 if(selected==='static-study')return ['static-study','static-related'].includes(value);
 return value===selected;
}
function render() {
 try {
  const category=$('production-category').value,status=$('production-status').value;
  const query=$('production-search').value.trim().toLowerCase();
  const items=rosters.filter(({asset,group})=>
   (category==='all'||category===group)&&visibleStatus(asset.artStatus,status)&&
   (!query||[asset.displayName,asset.class,asset.family,asset.rigFamily,
     asset.silhouette,asset.equipment,asset.acceptance]
     .filter(Boolean).join(' ').toLowerCase().includes(query)));
  const grid=$('production-grid');
  grid.replaceChildren(...items.map(({asset,group})=>card(asset,group)));
  $('production-count').textContent=items.length+
    (items.length===1?' design shown':' designs shown')+' · No finished products';
 }catch(error) {
  console.error('Gridborn production board could not render',error);
  $('production-error').hidden=false;
 }
}
async function start() {
 try {
  const files=['hero-roster.json','monster-roster.json'];
  const entries=await Promise.all(files.map(async file=>{
   const result=await fetch('./docs/production/'+file);
   if(!result.ok)throw new Error('Could not fetch '+file);
   return result.json();
  }));
  if(entries.some((x,i)=>x.schemaVersion!==1||x.total!==12||
    !Array.isArray(x.assets)||x.assets.length!==12||
    x.category!==(i===0?'heroes':'monsters')))throw new Error('Invalid production manifest');
  rosters=entries.flatMap(x=>x.assets.map(asset=>({group:x.category,asset})));
  $('planned-count').textContent=String(rosters.length);
  $('study-count').textContent=String(rosters.filter(x=>
   ['animated-study','static-study','static-related'].includes(x.asset.artStatus)).length);
  $('complete-count').textContent=String(rosters.filter(x=>x.asset.commercialRelease).length);
  for(const id of ['production-search','production-category','production-status'])
   $(id).addEventListener(id==='production-search'?'input':'change',render);
  render();
 }catch(error) {
  console.error('Gridborn production board failed to load',error);
  $('production-count').textContent='Production roster unavailable';
  $('production-error').hidden=false;
 }
}
start();
