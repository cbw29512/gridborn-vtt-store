import { openConcept } from './concept-dialog.js';
import { animatedPreviews } from './animated-previews.js';
import { PRESETS } from './builder-data.js';
import { HERO_VARIANTS } from './hero-variants.js';
import {hasNPCRecipe} from './npc-recipes.js';
const generatedHeroIds=new Set(HERO_VARIANTS.map(x=>x.id));

export function makeCard(item) {
  try {
    const card = document.createElement('article'); card.className = 'product-card';
    card.dataset.cardCategory=item.category;
    const visual = document.createElement('div'); visual.className = 'product-visual';
    visual.dataset.category = item.category;
    const preview=animatedPreviews[item.id];
    const hasMotion=Boolean(preview?.idle&&preview?.move&&preview?.action&&preview?.rest);
    if(hasMotion){
      card.dataset.motionId=item.id;
      const stage=document.createElement('span');
      stage.className='product-motion-stage';
      stage.textContent='IDLE · animated preview';
      stage.setAttribute('aria-hidden','true');
      visual.append(stage);
    }
    const symbol = document.createElement('span'); symbol.className = 'product-placeholder'; symbol.textContent = item.symbol;
    if (item.previewArt) {
      const illustration = document.createElement('img');
      illustration.className = 'product-art';
      illustration.src = item.previewArt;
      illustration.alt = (hasMotion?'Automatic Idle, Move, Attack, Rest animation study of ':'Original pixel-art study for ')
        +item.name+'; not a finished token';
      illustration.loading = 'lazy';
      illustration.decoding = 'async';
      illustration.addEventListener('error', () => {
        try {
          if(hasMotion&&illustration.getAttribute('src')!==item.previewArt){
            card.dataset.motionFailed='true';
            illustration.src=item.previewArt;
            const stage=visual.querySelector('.product-motion-stage');
            if(stage)stage.textContent='STATIC · motion unavailable';
          }else{
            illustration.replaceWith(symbol); badge.textContent='CONCEPT ONLY';
          }
        }
        catch (error) { console.error('Cannot recover preview artwork', item.id, error); }
      });
      visual.append(illustration);
    } else {
      visual.append(symbol);
    }
    const badge = document.createElement('span'); badge.className = 'preview-label'; badge.textContent = hasMotion ? 'MOVING ART STUDY' : item.animationStatus === 'art-study' ? 'ANIMATION STUDY' :
      item.previewArt ? 'ART STUDY' : 'CONCEPT ONLY';
    const footprint = document.createElement('span'); footprint.className = 'product-footprint';
    footprint.textContent = item.squares + '×' + item.squares + ' GRID';
    visual.append(badge, footprint);
    const body = document.createElement('div'); body.className = 'product-body';
    const type = document.createElement('div'); type.className = 'product-type';
    type.textContent = item.primary + ' · ' + item.secondary;
    const name = document.createElement('h4'); name.className = 'product-name'; name.textContent = item.name;
    const meta = document.createElement('div'); meta.className = 'product-meta';
    meta.textContent = item.size +
      (item.challengeRating!==null&&item.challengeRating!==undefined?' · CR '+item.challengeRating:'') +
      (item.animationStatus === 'art-study'
        ? ' · Animation prototype' : ' · Animation not produced');
    const foot = document.createElement('div'); foot.className = 'product-foot';
    const price = document.createElement('strong'); price.className = 'product-price';
    price.textContent = item.previewArt
      ? 'Target $' + (item.priceCents / 100).toFixed(2)
      : 'Artwork pending';
    price.setAttribute('aria-label', item.previewArt
      ? 'Proposed price ' + price.textContent : 'Original artwork not yet produced');
    const availability = document.createElement('span');
    availability.className = 'product-unavailable'; availability.textContent = 'Preview only';
    const details = document.createElement('button');
    details.type = 'button'; details.className = 'details-button';
    details.textContent = 'View concept details';
    details.setAttribute('aria-label', 'View concept details for ' + item.name);
    details.addEventListener('click', () => openConcept(item, details));
    const customizeSlot=document.createElement('div');
    customizeSlot.className='product-customize-slot';
    if (Object.hasOwn(PRESETS,item.id)||generatedHeroIds.has(item.id)||hasNPCRecipe(item.id)) {
      const personalize = document.createElement('a');
      personalize.href = './builder.html?preset=' + encodeURIComponent(item.id);
      personalize.className = 'customize-link';
      personalize.textContent = 'Customize this look ✦';
      personalize.setAttribute('aria-label','Customize ' + item.name + ' in the builder');
      customizeSlot.append(personalize);
    }
    const bundleAdd=document.createElement('button');
    bundleAdd.type='button';
    bundleAdd.className='product-bundle-add';
    bundleAdd.dataset.bundleId=item.id;
    bundleAdd.setAttribute('aria-label','Add '+item.name+' to bundle plan');
    bundleAdd.textContent='Add to bundle +';
    foot.append(price, availability);
    body.append(type, name, meta, customizeSlot, details, bundleAdd, foot);
    card.append(visual, body);
    return card;
  } catch (error) { console.error('Unable to render token preview', item.id, error); return null; }
}
