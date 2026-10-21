# Gridborn Controller — Foundry developer preview

**Status: unverified.** Source-code tests and a package archive do not establish
compatibility with Foundry VTT. The controller has **not yet been exercised in
a real Foundry session**. It has no paid media or public licensed tokens.

## The simple user experience

1. As a GM, export a token to a private **four-file controller folder**.
2. Copy that folder into your Foundry `Data` directory, e.g.
   `Data/worlds/my-campaign/gridborn/chr-ftr-human/`.
3. Put the `gridborn-controller` module folder under `Data/modules/`.
   Its `module.json` must be directly under that folder. Enable it in your World.
4. Right-click an owned token. Open **Gridborn ✦ → Set up token**.
5. Paste the relative folder path (without `Data/`):
   `worlds/my-campaign/gridborn/chr-ftr-human`.
   Keep the default **10-second Attack** if using the current action reel.
6. Save. **Idle** becomes the token image. Press **Move**, **Rest**, or **Attack**.
   Attack runs the action-and-recovery clip once by *time limit* and returns to Idle.
7. **Restore original token** removes the configuration and original artwork returns.

No network accounts, required purchases, macros, API keys or game-system-specific
character actions. All four videos are named exactly:
`idle.webm`, `move.webm`, `attack.webm`, `rest.webm`.
A static `still.png` may be kept as a fallback but is not used automatically.

## Private export for the two existing art studies

Requires Python 3.10+, Playwright, Chromium, Pillow and FFmpeg.

```sh
python tools/export_demo.py --manifest assets/demos/manifest.json \
 --certify --controller-package --output-dir ../gridborn-private-fighter
python tools/export_demo.py --manifest assets/demos/cave-goblin-manifest.json \
 --certify --controller-package --output-dir ../gridborn-private-goblin
```

The action reel is split by **source metadata**, never a monster's name:
27-second Idle, 8-second Move, and 10-second Attack **including recovery**.
The separate six-second Rest is copied into the same private folder. Technical
alpha/duration checks run on each clip. Do not commit exported media to GitHub.

## Limitations and release gates

- This is a manual HUD choice, **not automatically triggered by attacks**.
- Videos in the assigned folder must exist and be accessible to all clients.
  Setup does not upload or validate the underlying files.
- A timer is owned by the user who selected Attack. If they disconnect, the
  automatic return might not happen; simply choose Idle again.
- Attack return is time-based; some browsers/VTT configurations might play
  the underlying clip differently. The 10-second duration is editable.
- Switching scenes or duplicating tokens, GM/player permissions, HUD layout,
  animation smoothness, multiplayer synchronization and file-size behavior
  require real Foundry testing before a compatibility claim.
- This developer module only targets Foundry **v13+ API patterns**, with no
  verified version claimed in the manifest. V14 is untested as well.
- No right-click change is promised for Roll20 or other virtual tabletops.
- The standalone Idle WebM remains the **no-module fallback**.
