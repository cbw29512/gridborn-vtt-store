# VTT compatibility acceptance plan (Human Fighter)

**Status as of October 20, 2026: Foundry VTT NOT TESTED; Roll20 NOT TESTED.**
The full 45-second action and 6-second rest WebM technical QA has passed.
Technical video validation is not a successful VTT import test.

## Evidence record

Update `docs/compatibility-record.json` after testing. A `passed` platform
requires its actual tested version, browser, date, and HTTPS evidence location.
Do not mark `releaseApproved` until artwork rights are verified and at least
one named VTT successfully imports the finished asset. Never enable checkout
before release approval. CI runs regression tests against these requirements.

## Foundry VTT — manual import

1. Use the private action WebM, rest WebM and static PNG from the complete export.
2. Upload WebM as prototype/placed token artwork and save it to a test Actor.
3. Place a token on light, dark, textured and gridless maps; inspect the alpha
   edges, 1-square footprint, face clarity and correct scaling.
4. Watch the entire 45-second loop twice; confirm attack and recovery timing.
5. Switch to rest WebM, observe multiple full six-second cycles and transitions.
6. Test player-client synchronization and performance with 12 concurrent tokens.
7. Test the PNG static fallback; record browser, Foundry version, file size,
   screenshots and any unexpected cropping, clipping or playback issues.

Foundry's official media guidance recommends transparent WebM for tokens and
video frame rates around 30 fps or less. That is format guidance only, **not
a claim that these specific assets have passed in Foundry**:
https://foundryvtt.com/article/media/

## Roll20 — manual import

1. Upload the same private WebM/PNG set to a test game's Art Library.
2. Put the WebM on the token layer, set to a 1-square footprint and verify
   the default token and placed copy do not crop or distort the artwork.
3. Watch two 45-second action loops and two six-second resting loops.
4. Verify transparency on light and dark backgrounds and at typical zoom.
5. Verify the static PNG fallback and test common Chrome/Firefox setups.
6. Check upload size/account restrictions and performance with 12 tokens.
7. Capture the actual test date, platform/browser version, upload size and
   evidence. Record results as PASS/FAIL with observed details.

Roll20's partner specifications recommend transparent WebM animation, a
280px-per-grid-square art scale, and aiming for static files below 5 MB.
Our current prototype export is **256px**, which is below the recommended
token art scale; inspect quality on Roll20 and consider a 280px commercial
variant before pursuing Marketplace approval:
https://roll20partners.zendesk.com/hc/en-us/articles/10828203014423-Image-Dimensions-Resolution-and-File-Type-Specifications

## Release decision

Current status: NO sale, NO certified VTT list, NO licensing assertion.

Complete: real platform imports, transparency, looping, readability, size,
license terms and human visual review. Avoid copying protected product files
or exposing customer data in the public GitHub repository. Keep test binaries
and private screenshots out of source control.
