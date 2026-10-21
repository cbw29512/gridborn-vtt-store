import { PARTS, PALETTES, PRESETS,
  normalizeRecipe, presetToRecipe, toPortableRecipe, fromPortableRecipe } from './builder-data.js';
import { renderRig } from './builder-rig.js';
const $=id=>document.getElementById(id);
const DRAFT='gridborn.builder.draft.v1';
const COLORS=['skin','primary','accent','hair','metal'];
const LABELS={ancestry:'Species',outfit:'Outfit / armor',headgear:'Headwear',
  hair:'Hair / beard',weapon:'Main-hand weapon',offhand:'Off-hand item',cape:'Cape'};
let recipe=presetToRecipe('chr-ftr-human'),preset='chr-ftr-human',palette='royal',mode='idle';
function status(msg){$('builder-status').textContent=msg;}
function slug(){return recipe.name.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,40)||'adventurer';}
function download(blob,filename){
  const url=URL.createObjectURL(blob),link=document.createElement('a');
  link.href=url;link.download=filename;document.body.append(link);link.click();link.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1500);
}
function draft(){
  try{localStorage.setItem(DRAFT,toPortableRecipe(recipe));}
  catch(error){console.warn('Gridborn autosave unavailable',error);}
}
function render(){
  const safe=normalizeRecipe(recipe);
  $('builder-stage').dataset.mode=mode;
  $('builder-avatar').innerHTML=renderRig(safe,{mode,animated:true});
  $('builder-summary').textContent=safe.ancestry+' · '+safe.outfit+' · '+safe.weapon;
  for(const button of $('builder-modes').querySelectorAll('button'))
    button.setAttribute('aria-pressed',String(button.dataset.mode===mode));
}
function sync(){
  $('build-name').value=recipe.name;
  for(const key of Object.keys(PARTS))$('part-'+key).value=recipe[key];
  for(const key of COLORS)$('color-'+key).value=recipe.palette[key];
  for(const button of $('builder-presets').querySelectorAll('button'))
    button.setAttribute('aria-pressed',String(button.dataset.preset===preset));
  for(const button of $('builder-palettes').querySelectorAll('button'))
    button.setAttribute('aria-pressed',String(button.dataset.palette===palette));
}
function apply(next,{selectedPreset='',selectedPalette=''}={}){
  recipe=normalizeRecipe(next);preset=selectedPreset;palette=selectedPalette;
  sync();render();draft();
}
function controls(){
  for(const [key,values] of Object.entries(PARTS)){
    const field=document.createElement('div');field.className='builder-field';
    const label=document.createElement('label');label.htmlFor='part-'+key;label.textContent=LABELS[key];
    const select=document.createElement('select');select.id='part-'+key;
    for(const value of values)select.add(new Option(value,value));
    select.addEventListener('change',()=>{
      try{apply({...recipe,[key]:select.value});status(LABELS[key]+' updated');}
      catch(error){status(error.message);}
    });
    field.append(label,select);$('builder-parts').append(field);
  }
  for(const [key,item] of Object.entries(PRESETS)){
    const button=document.createElement('button');button.type='button';
    button.className='preset-button';button.dataset.preset=key;
    const title=document.createElement('strong');title.textContent=item.name;
    const subtitle=document.createElement('small');
    subtitle.textContent=item.ancestry+' · '+item.outfit;
    button.append(title,subtitle);
    button.addEventListener('click',()=>{
      apply(presetToRecipe(key),{selectedPreset:key,selectedPalette:item.palette});
      status(item.name+' loaded · customize any part');
    });
    $('builder-presets').append(button);
  }
  for(const [key,item] of Object.entries(PALETTES)){
    const button=document.createElement('button');button.type='button';
    button.className='palette-preset';button.dataset.palette=key;
    const swatches=document.createElement('span');swatches.className='palette-dots';
    swatches.setAttribute('aria-hidden','true');
    for(const slot of COLORS){
      const swatch=document.createElement('i');swatch.style.backgroundColor=item[slot];
      swatches.append(swatch);
    }
    const title=document.createElement('strong');title.textContent=item.label;
    button.append(swatches,title);
    button.addEventListener('click',()=>{
      apply({...recipe,palette:item},{selectedPalette:key});
      status(item.label+' palette applied');
    });
    $('builder-palettes').append(button);
  }
  for(const key of COLORS){
    const label=document.createElement('label');label.htmlFor='color-'+key;
    label.textContent={skin:'Skin / bone',primary:'Clothing',accent:'Accent',hair:'Hair',metal:'Metal'}[key];
    const picker=document.createElement('input');picker.type='color';picker.id='color-'+key;
    picker.addEventListener('input',()=>{
      try{apply({...recipe,palette:{...recipe.palette,[key]:picker.value}});status('Custom color applied');}
      catch(error){status(error.message);}
    });
    label.append(picker);$('builder-colors').append(label);
  }
}
async function exportPng(){
  const svg=renderRig(recipe,{mode:'idle',animated:false}).replace('</svg>',
    '<rect x="41" y="229" width="174" height="20" rx="3" fill="#0b1018" opacity=".96"/>'+
    '<text x="128" y="243" text-anchor="middle" font-size="11" fill="#f5d393" font-family="sans-serif" font-weight="bold">GRIDBORN · PREVIEW ONLY</text></svg>');
  const url=URL.createObjectURL(new Blob([svg],{type:'image/svg+xml;charset=utf-8'}));
  try{
    const image=new Image();
    await new Promise((resolve,reject)=>{
      image.onload=resolve;image.onerror=()=>reject(new Error('PNG preview could not be rendered'));
      image.src=url;
    });
    const canvas=document.createElement('canvas');canvas.width=512;canvas.height=512;
    const ctx=canvas.getContext('2d');if(!ctx)throw new Error('PNG canvas is unavailable');
    ctx.clearRect(0,0,512,512);ctx.drawImage(image,0,0,512,512);
    const blob=await new Promise((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(new Error('PNG encoding failed')),'image/png'));
    download(blob,'gridborn-'+slug()+'-preview.png');status('Watermarked preview PNG saved');
  }finally{URL.revokeObjectURL(url);}
}
function events(){
  $('build-name').addEventListener('change',()=>{
    try{apply({...recipe,name:$('build-name').value});status('Character renamed');}
    catch(error){$('build-name').value=recipe.name;status(error.message);}
  });
  $('builder-avatar').addEventListener('animationend',event=>{
    if(event.animationName!=='gb-attack-lunge' || mode!=='attack') return;
    // The attack is a one-shot; a new user selection always wins.
    mode='idle';render();status('Attack complete · returned to Idle');
  });
  $('builder-modes').addEventListener('click',event=>{
    const button=event.target.closest('button[data-mode]');if(!button)return;
    mode=button.dataset.mode;render();
    const descriptions={
      idle:'Idle · subtle breathing and occasional blinking',
      move:'Move · alternating strides, arm swings and trailing cape',
      attack:'Attack · wind-up, strike and recovery (plays once)',
      rest:'Rest · seated posture, relaxed arms and gentle breathing'
    };
    status(descriptions[mode]);
  });
  document.querySelectorAll('[data-bg]').forEach(button=>button.addEventListener('click',()=>{
    $('builder-stage').dataset.background=button.dataset.bg;
    document.querySelectorAll('[data-bg]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  }));
  $('download-recipe').addEventListener('click',()=>{
    try{download(new Blob([toPortableRecipe(recipe)],{type:'application/json'}),
      'gridborn-'+slug()+'.json');status('Design recipe saved to your downloads');}
    catch(error){status(error.message);}
  });
  $('download-png').addEventListener('click',async()=>{
    try{await exportPng();}catch(error){console.error('Gridborn PNG export failed',error);status(error.message);}
  });
  $('import-recipe').addEventListener('change',async event=>{
    const file=event.target.files?.[0];if(!file)return;
    try{
      if(file.size>10000)throw new Error('Design file is too large');
      apply(fromPortableRecipe(await file.text()));status('Saved design loaded');
    }catch(error){status('Could not load design: '+error.message);}
    finally{event.target.value='';}
  });
  $('builder-reset').addEventListener('click',()=>{
    apply(presetToRecipe('chr-ftr-human'),{selectedPreset:'chr-ftr-human',selectedPalette:'royal'});
    mode='idle';render();status('Reset to Human Fighter');
  });
}
try{
  controls();events();
  const params=new URLSearchParams(window.location.search),starting=params.get('preset');
  if(starting&&Object.hasOwn(PRESETS,starting)){
    apply(presetToRecipe(starting),{selectedPreset:starting,selectedPalette:PRESETS[starting].palette});
    status('Premade design loaded · customize it');
  }else{
    try{
      const stored=localStorage.getItem(DRAFT);
      if(stored){apply(fromPortableRecipe(stored));status('Your last design has been restored');}
      else apply(presetToRecipe('chr-ftr-human'),{selectedPreset:'chr-ftr-human',selectedPalette:'royal'});
    }catch(error){
      console.warn('Could not restore saved design',error);
      apply(presetToRecipe('chr-ftr-human'),{selectedPreset:'chr-ftr-human',selectedPalette:'royal'});
    }
  }
}catch(error){
  console.error('Gridborn character builder failed',error);
  status('Builder initialization failed. Refresh the page to retry.');
}
