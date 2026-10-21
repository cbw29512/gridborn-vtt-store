/**
 * Verified source-path mapping for public art studies; preview only.
 * Source details are keyed by catalog ID, never a creature-name heuristic.
 */
export const animatedPreviews = Object.freeze({
  'chr-ftr-human': Object.freeze({
    still: './assets/demos/human-fighter-still.svg',
    action: './assets/demos/human-fighter-loop.svg',
    rest: './assets/demos/human-fighter-rest.svg',
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
  }),
  'mon-cave-goblin': Object.freeze({
    still: './assets/studies/cave-goblin.svg',
    action: './assets/demos/cave-goblin-loop.svg',
    rest: './assets/demos/cave-goblin-rest.svg',
  }),
});
