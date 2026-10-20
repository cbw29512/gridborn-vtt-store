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
