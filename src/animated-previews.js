/**
 * Verified source-path mapping for public art studies; preview only.
 * Source details are keyed by catalog ID, never a creature-name heuristic.
 */
export const animatedPreviews = Object.freeze({
  'chr-ftr-human': Object.freeze({
    still: './assets/demos/human-fighter-still.svg',
    idle: './assets/demos/human-fighter-idle.svg',
    move: './assets/demos/human-fighter-move.svg',
    action: './assets/demos/human-fighter-attack.svg',
    rest: './assets/demos/human-fighter-rest.svg',
    actionDurationMs: 1400,
    labels: Object.freeze({
      idle: 'Idle · shield and cape breathing (prototype)',
      move: 'Move · alternating armored footsteps (prototype)',
      action: 'Attack · single guarded sword strike, then Idle (prototype)',
      rest: 'Rest · lowered sword and gentle breathing (prototype)'
    }),
  }),
  'mon-dng-skeleton': Object.freeze({
    still: './assets/studies/skeleton-warrior.svg',
    idle: './assets/demos/skeleton-warrior-idle.svg',
    move: './assets/demos/skeleton-warrior-move.svg',
    action: './assets/demos/skeleton-warrior-attack.svg',
    rest: './assets/demos/skeleton-warrior-rest.svg',
    actionDurationMs: 1400,
    labels: Object.freeze({
      idle: 'Idle · undead skull and weapon fidgets; no breathing (prototype)',
      move: 'Move · alternating, jerky skeletal shuffle (prototype)',
      action: 'Attack · one bone-arm sword strike, then Idle (prototype)',
      rest: 'Rest · collapsed, inert bones; faint spectral glimmer (prototype)'
    }),
  }),
  'mon-cave-spider': Object.freeze({
    still: './assets/studies/giant-cave-spider.svg',
    idle: './assets/demos/giant-cave-spider-idle.svg',
    move: './assets/demos/giant-cave-spider-move.svg',
    action: './assets/demos/giant-cave-spider-attack.svg',
    rest: './assets/demos/giant-cave-spider-rest.svg',
    actionDurationMs: 1400,
    labels: Object.freeze({
      idle: 'Idle · abdomen breathing and palp motion (prototype)',
      move: 'Move · eight legs in alternating tetrapod gait (prototype)',
      action: 'Attack · single fang jab, then Idle (prototype)',
      rest: 'Rest · eight legs folded close to body (prototype)'
    }),
  }),
  'ani-forest-wolf': Object.freeze({
    still: './assets/studies/gray-wolf.svg',
    idle: './assets/demos/gray-wolf-idle.svg',
    move: './assets/demos/gray-wolf-move.svg',
    action: './assets/demos/gray-wolf-attack.svg',
    rest: './assets/demos/gray-wolf-rest.svg',
    actionDurationMs: 1300,
    labels: Object.freeze({
      idle: 'Idle · gentle breathing loop with synchronized ears and tail (prototype)',
      move: 'Move · four-legged trot in diagonal pairs (prototype)',
      action: 'Attack · one bite with a forward lunge, then Idle (prototype)',
      rest: 'Rest · curled breathing wolf pose (prototype)'
    }),
  }),
  'mon-cave-goblin': Object.freeze({
    still: './assets/studies/cave-goblin.svg',
    idle: './assets/demos/cave-goblin-idle.svg',
    move: './assets/demos/cave-goblin-move.svg',
    action: './assets/demos/cave-goblin-attack.svg',
    rest: './assets/demos/cave-goblin-rest.svg',
    actionDurationMs: 1400,
    labels: Object.freeze({
      idle: 'Idle · breathing and blinking (prototype)',
      move: 'Move · alternating goblin leg stride (prototype)',
      action: 'Attack · one curved blade strike, then Idle (prototype)',
      rest: 'Rest · relaxed breathing pose (prototype)'
    }),
  }),
});
