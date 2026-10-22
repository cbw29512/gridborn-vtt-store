/** Art direction: species/family likeness comes before occupation variation.
 * A title or alternate palette alone does not make a new creature.
 * Keep the same anatomy reference; role changes gear, clothing and movement.
 * This metadata is an art acceptance rule, never a claim of completed art.
 */
export const CREATURE_FAMILIES=Object.freeze({
  ogre:Object.freeze({
    referenceId:'mon-cave-ogre',
    referenceArt:'./assets/studies/cave-ogre.svg',
    coreFeatures:Object.freeze(['massive forearms','tusks','hunched head','heavy limbs','oversized frame']),
    view:'three-quarter side, keep the proportions and recognizable head',
    roles:Object.freeze({
      common:Object.freeze({
        clothing:'Rough patchwork hide and weathered cloth',
        weapon:'Crude knotty stone club',
        details:Object.freeze(['bare feet or rough wraps','scarred dull skin','bone ties']),
        motion:'Heavy lumber, weight shift, blunt one-shot club strike'
      }),
      mage:Object.freeze({
        clothing:'Long layered ritual robes fitted to the same huge ogre',
        weapon:'Rune-carved ritual staff and spell focus',
        details:Object.freeze(['glowing charms','scrolls or satchel','embroidered sleeves']),
        motion:'Staff preparation, spell flare and a slower deliberate casting strike'
      }),
      knight:Object.freeze({
        clothing:'Polished, fitted plate over the same hulking torso',
        weapon:'Well-made oversized sword and reinforced shield',
        details:Object.freeze(['visible steel joints','crest on plate','armored boots']),
        motion:'Deliberate braced advance, guarded sword cut and shield recovery'
      }),
      king:Object.freeze({
        clothing:'Fur-trimmed royal mantle over lavish regalia',
        weapon:'Gold-tipped royal scepter',
        details:Object.freeze(['distinctive crown','jewel settings','ornate gold trim']),
        motion:'Commanding stance, scepter decree and measured ceremonial gestures'
      })
    })
  })
});

export function validateCreatureFamily(family) {
 if (!family || typeof family.referenceId!=='string' ||
     !/^\.\/assets\/studies\/[a-z0-9-]+\.svg$/.test(family.referenceArt) ||
     !Array.isArray(family.coreFeatures) || family.coreFeatures.length<3)
    throw new Error('Creature family requires a real shared anatomical reference');
 if (!family.roles || typeof family.roles!=='object')throw new Error('Family has no roles');
 const identifiers=new Set(),equip=new Set();
 for(const [role,look] of Object.entries(family.roles)){
   if(identifiers.has(role)||!look || typeof look.clothing!=='string' ||
     typeof look.weapon!=='string' || !Array.isArray(look.details) ||
     look.details.length<3 || typeof look.motion!=='string')
     throw new Error('Creature role must define clothing, weapon, details and motion');
   const key=look.clothing.trim().toLowerCase()+'|'+look.weapon.trim().toLowerCase();
   if(equip.has(key))throw new Error('Two creature roles cannot be mere palette swaps');
   equip.add(key);
   if(new Set(look.details.map(x=>x.toLowerCase())).size!==look.details.length)
     throw new Error('Role details must be distinct');
   identifiers.add(role);
 }
 return true;
}
