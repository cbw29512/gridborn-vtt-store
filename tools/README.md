# Gridborn private prototype export

## A. Objective

Export the original Human Fighter SVG animation study to transparent image/video
prototypes for testing. **No checkout, shipping, redistribution license, or VTT
compatibility claim is implied.** Do not publish these full exports in GitHub.

## B. Schema and state

The single source of truth is `assets/demos/manifest.json`:

- Identity and status: `id`, `concept-only`, `purchasable: false`.
- Asset references: action SVG, separate six-second rest SVG, and static SVG, relative to the repository.
- Rendering: 256-square RGBA canvas, 10 sampled frames per second.
- Phases: idle 0–27 s, move 27–35 s, attack 35–38 s, recover 38–45 s.
- Export targets: static PNG, 45-second VP9-alpha action WebM, six-second VP9-alpha rest WebM (all studies).
- Verification: rights and compatibility are both explicitly unverified.

## C. Logic flow

1. Validate the manifest and every source SVG (paths, safety, phase continuity).
2. Open the original SVG in Chromium, pause CSS animations and seek by frame time.
3. Capture transparent square PNG frames and a separate static PNG.
4. Encode the frames into WebM using FFmpeg, preserving the alpha channel flag.
5. Write exports **outside** the public repository; delete intermediate frames.

## D. Implementation

Prerequisites: Python 3.10+, `python -m pip install playwright`,
`python -m playwright install chromium`, and FFmpeg on your PATH.
Existing system Chromium can be used when installed.

Run from the repository directory:

```sh
python tools/export_demo.py --output-dir ../gridborn-private-art
python tools/export_demo.py --output-dir ../gridborn-smoke --sample-frames 5
python -m unittest discover -s tests -p "test_*.py"
npm test
```

A full run produces a 45-second action WebM, six-second rest WebM and a 256×256 PNG.
`--sample-frames` intentionally produces a short smoke-test clip.

### Full automated technical QA (private files only)

Install Pillow (`python -m pip install Pillow`), then run:

```sh
python tools/export_demo.py --certify --output-dir ../gridborn-private-qa
```

This renders **450 action frames plus 60 rest frames**, inspects actual PNG
alpha pixels and decoded VP9 alpha, checks VP9 codec, 256×256 dimensions,
10 fps, full 45s/6s durations, frame counts, sampled motion in idle/move/
attack, and the first/last-frame loop seam. The private output includes
`chr-ftr-human-media-qa.json` with measured results and explicit
`purchasable: false` and `vttCompatibility: untested`. Running `--certify`
with `--sample-frames` is rejected. The GitHub full-media QA workflow
runs this in an ephemeral runner without uploading any products.

### State-exact Cave Goblin controller clips

The Goblin manifest declares `stateClips` with the **real sources used in
the storefront**: `cave-goblin-idle.svg`, `cave-goblin-move.svg`, and
`cave-goblin-attack.svg`. The three clips are now rendered separately,
not extracted from the 45-second master showcase. Private outputs:

- Idle: 3.6 s / 36 frames, looping.
- Move: 3.6 s / 36 frames, five complete .72-second walk cycles.
- Attack: 1.4 s / 14 frames, one-shot, followed by Idle in the controller.
- Rest: 6 s / 60 frames from the original rest study.

Every decoded video must pass alpha, duration, and frame verification; the
rendered state frames undergo distinct-motion checks and loop-seam checks
for Idle and Move. The private `gridborn-preview.json` additionally records
`clipSource: independent-svg-states`, the exact source paths, and QA facts.
Source declarations that are missing, path-traversing, or off the frame grid
fail closed. The Human Fighter retains the legacy source-reel split until
its own independent SVG states are authored and verified.

Render/test without publishing files:

```sh
python tools/export_demo.py --certify --controller-package \
  --manifest assets/demos/cave-goblin-manifest.json \
  --output-dir ../gridborn-private-goblin
python -m unittest discover -s tests -p 'test_*.py'
```

**These clips are still art prototypes**, not a completed, licensed,
import-tested sale or delivery system.

**Technical QA is not VTT import certification, an art-quality review,
a legal license verification or production approval.** The visible loop
should still be inspected manually at its actual duration on a desktop
and mobile device before claiming suitability for sale.

## E. Acceptance tests (still needed for a sale)

- Inspect alpha visually over light/dark VTT grids and verify no opaque corners.
- Review idle/move/attack/recovery timeline boundaries and looping seams.
- Check actual frame rate, visible pixel-art quality, transparency and file size.
- Import into explicitly named target VTTs; record version and tested behavior.
- Independently validate the six-second draft rest loop in the intended VTT.
- Verify original artwork rights and define a buyer license.
- Build protected storage/Stripe fulfillment **after**, not before, acceptance.

A synthetic 3-frame smoke test in the development environment successfully
generated an RGBA PNG and an FFmpeg VP9-alpha WebM with `alpha_mode=1`.
That smoke test did not use the actual full Human Fighter source and does not
qualify the public artwork for sale. See `tests/test_asset_spec.py` for
fail-closed schema tests. Keep modules under 150 lines.
