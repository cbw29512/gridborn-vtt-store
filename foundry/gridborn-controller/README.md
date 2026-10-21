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
   The controller checks that all four WebMs exist in Foundry's Data folder and automatically reads the exact Attack duration from the package's `gridborn-preview.json`. **No manual timing lookup or reprogramming is needed.** Keep **Auto-detect Attack duration** checked when using an exported Gridborn package. To use your own four WebMs without that receipt, uncheck auto-detect and enter your Attack duration in seconds.
6. Save. **Idle** becomes the token image. Press **Move**, **Rest**, or **Attack**.
   Attack runs once by the configured clip duration and returns to Idle. Idle, Move and Rest repeat until you choose a different state; there is no automatic four-state showcase during gameplay.
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

The original 45-second showcase is **not** the source of the current
Fighter/Goblin standalone clips. Their actual independent animation SVG
sources produce calm looping Idle/Move/Rest states, and a one-shot Attack.
The other creatures use the direct state-only exporter. Each private
controller folder includes `gridborn-preview.json`, which the setup form
reads from the **same local Foundry Data directory**. The controller validates
the package metadata and its Attack timing before applying it to the selected
token. The current export timings are 1.3 seconds (Gray Wolf) and 1.4 seconds
(other current studies). Timing is token-specific, not selected by monster
name; these values may evolve with future animations.

When the receipt is missing, setup does **not** guess an Attack duration:
the user can opt into the manual override instead. Invalid or inaccessible
receipts display an error and leave the token unchanged. No remote accounts
or external URLs are used. Idle, Move and Rest continue indefinitely until
the authorized GM/player switches states; Attack returns to Idle.
No website showcase sequence runs during tabletop gameplay.
Technical alpha/duration checks run on each clip. Do not commit private media.

## Limitations and release gates

- This is a manual HUD choice, **not automatically triggered by attacks**.
- Videos in the assigned folder must exist and be accessible to all clients.
  Setup does not upload or validate the underlying files.
- A timer is owned by the user who selected Attack. If they disconnect, the
  automatic return might not happen; simply choose Idle again. This remains
  unverified in real multiplayer Foundry sessions.
- Attack return is time-based; some browsers/VTT configurations might play
  the underlying clip differently. The per-token duration is editable.
- Switching scenes or duplicating tokens, GM/player permissions, HUD layout,
  animation smoothness, multiplayer synchronization and file-size behavior
  require real Foundry testing before a compatibility claim.
- This developer module only targets Foundry **v13+ API patterns**, with no
  verified version claimed in the manifest. V14 is untested as well.
- No right-click change is promised for Roll20 or other virtual tabletops.
- The standalone Idle WebM remains the **no-module fallback**.
