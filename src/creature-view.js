/** Art-direction ONLY; not a rules engine or species ontology.
 * Prefer unobstructed SIDE / three-quarter side silhouette for anything
 * with four or more legs, a tail, wings or a nonhumanoid body.
 * Upright humanoids can face the camera in 3/4 view.
 */
const HUMANOID_TYPE_ROOTS=new Set(['Humanoid','Giant']);
const UPRIGHT_CREATURES=new Set([
 'Animated Armor','Animated Flying Sword','Shield Guardian','Clay Golem','Flesh Golem',
 'Iron Golem','Stone Golem','Goblin Warrior','Goblin Boss','Hobgoblin Warrior',
 'Bugbear Warrior','Skeleton','Skeleton Warrior','Zombie','Ogre Zombie',
 'Wight','Wraith','Ghoul','Ghast','Lich','Mummy','Mummy Lord',
 'Vampire','Vampire Spawn','Specter','Ghost','Banshee','Shadow',
 'Druid','Archmage','Priest','Acolyte','Cultist','Cult Fanatic',
 'Bandit','Bandit Captain','Guard','Assassin','Commoner','Knight',
 'Gladiator','Berserker','Warrior','Minotaur','Hill Giant',
 'Troll','Ogre','Swamp Lizardfolk','Cave Goblin','Cave Ogre',
 'Mountain Troll','Medusa','Dryad','Hag','Harpy'
]);
export function viewForMonster(type,name) {
 const root=String(type).split(' (')[0];
 if(HUMANOID_TYPE_ROOTS.has(root)||UPRIGHT_CREATURES.has(name)||
    String(type).includes('Goblinoid')) return 'Three-quarter front (upright humanoid)';
 return 'Three-quarter side/profile (nonhumanoid; anatomy visible)';
}
export const MONSTER_ART_DIRECTION=Object.freeze({
 default:'Side/profile for nonhumanoid monsters, beasts, dragons, oozes and spiders',
 humanoid:'Three-quarter/front acceptable for upright humanoid monsters',
 legs:'Expose all species-defining limbs; 4 quadruped legs, 8 arachnid legs',
 face:'Show snout, horns, mandibles, wings, tail, fangs and attacking direction',
 export:'Side-view and mirror-safe attack direction; no arbitrary frontal recolor'
});
