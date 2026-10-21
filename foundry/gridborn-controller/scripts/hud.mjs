import { MODULE_ID, MODES, canControl, DEFAULT_ATTACK_MS } from './contract.mjs';
import { configureToken, playMode, restoreToken } from './playback.mjs';
import { verifyAssetFolder } from './asset-check.mjs';

function element(tag, className, label = '') {
  const node = document.createElement(tag);
  node.className = className;
  if (label) node.textContent = label;
  return node;
}

function notify(error) {
  console.error('Gridborn token control failed', error);
  globalThis.ui?.notifications?.error('Gridborn: ' + error.message);
}

export function attachTokenHud(hud, html) {
  try {
    const token = hud.object;
    if (!canControl(token, game.user)) return;
    const root = html instanceof HTMLElement ? html : html?.[0] ?? hud.element;
    if (!root?.appendChild || root.querySelector('.gridborn-hud')) return;
    const wrapper = element('div', 'gridborn-hud');
    const trigger = element('button', 'gridborn-trigger', 'Gridborn ✦');
    trigger.type = 'button'; trigger.title = 'Gridborn animations';
    trigger.setAttribute('aria-expanded', 'false');
    const panel = element('div', 'gridborn-panel'); panel.hidden = true;
    panel.setAttribute('role', 'group');
    panel.setAttribute('aria-label', 'Gridborn token animations');
    const status = element('div', 'gridborn-status');
    const actions = element('div', 'gridborn-actions');
    const hint = element('p', 'gridborn-hint',
      'Idle, Move and Rest repeat until you choose another state. Attack plays once, then returns to Idle. No automatic showcase cycle during a game.');
    const config = token.document.getFlag(MODULE_ID, 'config');
    for (const mode of MODES) {
      const button = element('button', 'gridborn-action', mode[0].toUpperCase() + mode.slice(1));
      button.type = 'button'; button.dataset.mode = mode; button.disabled = !config;
      button.addEventListener('click', async () => {
        try {
          button.disabled = true;
          await playMode(token, mode);
          status.textContent = mode + (mode === 'attack'
            ? ' · one strike, then back to Idle'
            : ' · loops until you choose a different state');
        } catch (error) { notify(error); }
        finally { button.disabled = false; }
      });
      actions.append(button);
    }
    const configure = element('button', 'gridborn-configure', 'Set up token');
    configure.type = 'button';
    const setup = element('form', 'gridborn-setup'); setup.hidden = true;
    const field = element('label', 'gridborn-field', 'Asset folder');
    const input = element('input', 'gridborn-input');
    input.name = 'folder'; input.required = true; input.maxLength = 512;
    input.placeholder = 'worlds/my-world/gridborn/fighter';
    input.value = config?.folder ?? ''; field.append(input);
    const duration = element('label', 'gridborn-field', 'Attack duration (seconds)');
    const seconds = element('input', 'gridborn-input');
    seconds.type = 'number'; seconds.min = '.5'; seconds.max = '60'; seconds.step = '.1';
    seconds.name = 'attackSeconds'; seconds.required = true;
    seconds.value = String((config?.attackMs ?? DEFAULT_ATTACK_MS) / 1000);
    duration.append(seconds);
    const save = element('button', 'gridborn-save', 'Save & use Idle');
    save.type = 'submit';
    setup.append(field, duration, save);
    if (config) {
      const remove = element('button', 'gridborn-remove', 'Restore original token');
      remove.type = 'button';
      remove.addEventListener('click', async () => {
        try {
          await restoreToken(token);
          status.textContent = 'Original token restored';
          actions.querySelectorAll('button').forEach(b => { b.disabled = true; });
        } catch (error) { notify(error); }
      });
      setup.append(remove);
    }
    setup.addEventListener('submit', async event => {
      event.preventDefault();
      try {
        const browse = globalThis.foundry?.applications?.apps?.FilePicker?.browse;
        await verifyAssetFolder(input.value, browse?.bind(
          globalThis.foundry?.applications?.apps?.FilePicker));
        await configureToken(token, {
          folder: input.value, attackMs: Number(seconds.value) * 1000
        });
        status.textContent = 'Idle ready · Choose an animation';
        actions.querySelectorAll('button').forEach(b => { b.disabled = false; });
        setup.hidden = true;
      } catch (error) { notify(error); }
    });
    configure.addEventListener('click', () => { setup.hidden = !setup.hidden; });
    panel.append(status, hint, actions, configure, setup);
    trigger.addEventListener('click', () => {
      panel.hidden = !panel.hidden;
      trigger.setAttribute('aria-expanded', String(!panel.hidden));
    });
    wrapper.append(trigger, panel); root.appendChild(wrapper);
  } catch (error) { notify(error); }
}
