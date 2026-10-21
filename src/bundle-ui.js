/** Accessible client-only bundle planner; not a checkout or entitlement system. */
import {BUNDLE_TEMPLATES,BUNDLE_TIERS,MAX_BUNDLE_TOKENS,bundlePricing,
  cleanBundleIds,validateBundleTemplates} from './bundle-data.js';

const STORAGE_KEY='gridborn.bundle-plan.v1';
const byId=id=>document.getElementById(id);
const money=cents=>'$'+(cents/100).toFixed(2);
const create=(tag,className,text)=>{
  const node=document.createElement(tag);
  if(className)node.className=className;
  if(text!==undefined)node.textContent=text;
  return node;
};

export function initializeBundles(catalog) {
  try {
    validateBundleTemplates(catalog);
    const index=new Map(catalog.map(item=>[item.id,item]));
    const nodes={
      templates:byId('bundle-templates'),items:byId('bundle-items'),
      count:byId('bundle-count'),total:byId('bundle-total'),
      regular:byId('bundle-regular'),savings:byId('bundle-savings'),
      breakdown:byId('bundle-breakdown'),feedback:byId('bundle-feedback'),
      clear:byId('bundle-clear'),export:byId('bundle-export')
    };
    if(Object.values(nodes).some(node=>!node))
      throw new Error('Bundle Studio elements are missing');
    let selected=[];
    try {
      const saved=JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]');
      selected=cleanBundleIds(saved,catalog);
    }catch(error){console.warn('Bundle draft could not be restored',error);}
    function save(){
      try{localStorage.setItem(STORAGE_KEY,JSON.stringify(selected));}
      catch(error){console.warn('Bundle autosave unavailable',error);}
    }
    function feedback(message){nodes.feedback.textContent=message;}
    function refresh(){
      nodes.items.replaceChildren();
      for(const id of selected){
        const item=index.get(id);
        const row=create('div','bundle-item');
        const name=create('span','bundle-item-name',item.name);
        const category=create('small','bundle-item-category',item.category);
        const remove=create('button','bundle-remove','Remove');
        remove.type='button';remove.dataset.bundleRemove=id;
        remove.setAttribute('aria-label','Remove '+item.name+' from bundle');
        row.append(name,category,remove);
        nodes.items.append(row);
      }
      if(!selected.length)
        nodes.items.append(create('p','bundle-empty','Choose a themed pack or add tokens from the catalog below.'));
      const pricing=bundlePricing(selected.length);
      nodes.count.textContent=selected.length+' / '+MAX_BUNDLE_TOKENS+' selected';
      nodes.total.textContent=money(pricing.totalCents);
      nodes.regular.textContent='At $0.99 each: '+money(pricing.regularCents);
      nodes.savings.textContent='Bundle discount: '+money(pricing.savingsCents);
      nodes.breakdown.textContent=pricing.packs.length
        ?pricing.packs.map(p=>p.quantity+' × '+p.label).join(' + ')
        :'Add tokens to see your estimated price';
      nodes.clear.disabled=nodes.export.disabled=selected.length===0;
      document.querySelectorAll('[data-bundle-id]').forEach(button=>{
        const included=selected.includes(button.dataset.bundleId);
        button.disabled=included;
        button.textContent=included?'In bundle ✓':'Add to bundle +';
        button.setAttribute('aria-pressed',String(included));
      });
    }
    function replace(ids,label) {
      selected=cleanBundleIds(ids,catalog);
      save();refresh();
      feedback(label+' loaded into your draft. No purchase has been made.');
      byId('bundle-studio').scrollIntoView({block:'start',behavior:'auto'});
    }
    for(const pack of BUNDLE_TEMPLATES){
      const card=create('article','bundle-template');
      const title=create('h3','',pack.title);
      const info=create('p','',pack.description);
      const price=create('strong','bundle-template-price',money(bundlePricing(5).totalCents));
      const button=create('button','bundle-template-load','Use this 5-token pack');
      button.type='button';
      button.dataset.bundleTemplate=pack.id;
      button.setAttribute('aria-label','Replace draft with '+pack.title+' bundle');
      button.addEventListener('click',()=>replace(pack.ids,pack.title));
      const names=create('small','bundle-template-items',
        pack.ids.map(id=>index.get(id).name).join(' · '));
      card.append(title,info,price,names,button);
      nodes.templates.append(card);
    }
    document.addEventListener('click',event=>{
      const add=event.target.closest('button[data-bundle-id]');
      if(add){
        const id=add.dataset.bundleId;
        if(!index.has(id)){console.error('Unknown token ID in bundle selection',id);return;}
        if(selected.includes(id)){feedback('That token is already in the bundle.');return;}
        if(selected.length>=MAX_BUNDLE_TOKENS){
          feedback('The current bundle planner supports up to 25 different tokens.');return;
        }
        selected.push(id);save();refresh();
        feedback(index.get(id).name+' added to your bundle draft.');
      }
      const remove=event.target.closest('button[data-bundle-remove]');
      if(remove){
        selected=selected.filter(id=>id!==remove.dataset.bundleRemove);
        save();refresh();feedback('Token removed from your bundle draft.');
      }
    });
    document.addEventListener('gridborn:catalog-rendered',refresh);
    nodes.clear.addEventListener('click',()=>{
      selected=[];save();refresh();feedback('Bundle draft cleared.');
    });
    nodes.export.addEventListener('click',()=>{
      try{
        const pricing=bundlePricing(selected.length);
        const data={
          format:'gridborn-bundle-plan',version:1,previewOnly:true,
          canPurchase:false,currency:'USD',ids:selected.slice(),
          tokenNames:selected.map(id=>index.get(id).name),pricing
        };
        const blob=new Blob([JSON.stringify(data,null,2)+'\n'],{type:'application/json'});
        const url=URL.createObjectURL(blob),link=document.createElement('a');
        link.href=url;link.download='gridborn-bundle-plan.json';
        document.body.append(link);link.click();link.remove();
        setTimeout(()=>URL.revokeObjectURL(url),1500);
        feedback('Bundle draft downloaded. These assets are not yet for sale.');
      }catch(error){console.error('Bundle plan export failed',error);feedback('Could not export this bundle.');}
    });
    refresh();
    for(const tier of BUNDLE_TIERS){
      const span=create('span','bundle-tier',tier.size+' for '+money(tier.cents));
      byId('bundle-tiers').append(span);
    }
  }catch(error){console.error('Could not initialize Bundle Studio',error);
    const node=byId('bundle-feedback');
    if(node)node.textContent='Bundle planner is temporarily unavailable.';
  }
}
