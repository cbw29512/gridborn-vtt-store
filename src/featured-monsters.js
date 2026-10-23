/** Featured original art: only real SRD Young Dragons with verified four-state preview links. */
import {catalog} from './catalog.js';
import {animatedPreviews} from './animated-previews.js';
export const FEATURED_DRAGON_COLORS=Object.freeze(["Black","Blue","Brass","Bronze","Copper","Gold","Green","Red","Silver","White"]);
export function featuredDragonEntries(items=catalog,previews=animatedPreviews){
 const byId=new Map(items.map(x=>[x.id,x]));
 const dragons=FEATURED_DRAGON_COLORS.map(color=>{
  const id='mon-srd-52-young-'+color.toLowerCase()+'-dragon';
  const item=byId.get(id),preview=previews[id];
  if(!item||item.category!=='Monsters'||item.name!=='Young '+color+' Dragon'||
      item.purchasable!==false||item.animationStatus!=='art-study'||!item.previewArt||
      !preview?.idle||!preview?.move||!preview?.action||!preview?.rest)
    throw new Error('Missing source-backed featured dragon: '+id);
  return Object.freeze({id,name:item.name,still:item.previewArt,idle:preview.idle,
   href:'?category=Monsters&q='+encodeURIComponent(item.name)+'#catalog'});
 });
 return Object.freeze(dragons);
}
export function renderFeaturedDragonGallery(grid,dragons=featuredDragonEntries()){
 if(!grid)throw new Error('Featured dragon grid is missing');
 const cards=dragons.map(entry=>{
  const a=document.createElement('a');a.className='featured-dragon-card';a.href=entry.href;
  a.dataset.dragonId=entry.id;
  const image=document.createElement('img');
  image.className='featured-dragon-art';image.src=entry.idle;
  image.alt=entry.name+' animated idle preview';
  image.width=160;image.height=142;image.loading='eager';image.decoding='async';
  image.addEventListener('error',()=>{
   if(image.getAttribute('src')!==entry.still){image.src=entry.still;image.alt=entry.name+' static art preview';}
  });
  const name=document.createElement('strong');name.textContent=entry.name;
  const label=document.createElement('small');label.textContent='Animated art study · view all 4 states';
  a.append(image,name,label);
  return a;
 });
 grid.replaceChildren(...cards);
 return cards.length;
}
export function shouldShowFeaturedDragons(state){
 return state?.category==='Monsters'&&!state.query?.trim()&&!state.primary&&!state.secondary;
}
