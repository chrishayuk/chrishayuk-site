# First film journey

Branch: `design/editorial-homepages`. Local experiment; not deployed.

The homepage's latest film is a still linked to its screening page. Both surfaces
use the same original frame. Native cross-document view transitions carry that
frame between the two layouts over 560ms; the surrounding page appears over
260ms. No navigation delay or scroll interception is added.

The screening page opens with the original frame in a dark, viewport-bounded
area. Its editorial title, credits and short introduction follow the film. The
play control sits at the lower left; return and stop controls sit below the frame.
The full original description and source/citation material use anchored
disclosures. Films without captions show a quiet availability line; indexed
chapters and timed transcripts retain their seek controls. Playback remains an explicit action through the existing HAUSE
YouTubeFilm and MotionProvider. No YouTube iframe is present on initial arrival.
The surrounding page darkens while the embedded player is open. Stop film
unmounts the player, restores the poster and returns keyboard focus to Play.
Navigation/reading contrast returns on hover or keyboard focus.

This is a viewing state: pausing inside YouTube keeps the dark room until Stop
film, navigation or the existing motion controller closes the player. Escape
also stops it when keyboard focus is in the containing page; keyboard events
inside YouTube's cross-origin iframe remain YouTube's responsibility. The visible
Stop control remains available. Chapters and transcript seeking are retained.

Back to the house traverses history for same-tab homepage arrivals; the browser
retains the original scroll position. Direct arrivals and new tabs have a real
`/#film` link. Modified clicks retain native browser behaviour.

Reduced motion and the existing paused-motion preference skip the page
transition. Unsupported browsers use normal links. The animation is restricted
to the homepage's selected film journey; other pages retain ordinary navigation.

## Verification

- Next production build and vinext deployment build pass.
- 55 tests pass: 51 existing publication checks and four transition event tests.
- Served homepage and screening page each have one main/h1, unique IDs, matching
  priority posters and no initial YouTube iframe. Return link is present.
- Browser discovery returned no connection. Animation timing, native history
  restoration, touch/keyboard interaction and embedded playback require visual
  and interaction review. These have not been browser-verified.

Implementation reference: [Chrome's cross-document transition documentation](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document).
Uses the library Film form without changing the vendored HAUSE source.
