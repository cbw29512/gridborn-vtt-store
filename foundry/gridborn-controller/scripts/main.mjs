import { attachTokenHud } from './hud.mjs';
import { stopTimer } from './playback.mjs';

try {
  Hooks.on('renderTokenHUD', (hud, html) => attachTokenHud(hud, html));
  Hooks.on('deleteToken', document => stopTimer({ document }));
  console.info('Gridborn Controller developer preview registered');
} catch (error) {
  console.error('Gridborn Controller could not initialize', error);
}
