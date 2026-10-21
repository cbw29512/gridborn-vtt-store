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
