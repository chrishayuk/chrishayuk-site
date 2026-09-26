# Editorial branch review and corrections

Branch: `design/editorial-homepages`

## Implemented

- Notebook now opens as a contents page: compact masthead, latest note with its
  recorded date and programme, then the chronological list. Programme navigation
  sits alongside it on desktop and follows the list on narrow screens.
- Repeated overlines, introductory navigation, oversized section headings and
  illustrated programme entrances are removed from this route. Archive and feed
  destinations remain available. No image is required when the note needs none.
- Collection and record titles use the homepage's 34–56px Newsreader scale;
  section titles use its 28–40px scale. Programme text and labels use Archivo.
- Film, research, systems, notebook and prose pages share the quieter hierarchy.
- Header and footer use the same primary destinations. The complete catalogue
  remains available in the archive group.
- Homepage films retain a 16:9 frame before and during playback, preserving the
  full image and avoiding the previous aspect-ratio jump.
- The colophon names the fonts actually loaded by the site.

## Verification

The preceding edition passed its production build and complete test suite. This
contents-page revision passes the production Next.js build and all 51 existing
publication tests. Served
homepage and Notebook HTML each have one h1, unique IDs and valid local anchors.
The earlier review checked all 33 internal homepage destinations successfully.

Browser discovery still returned no available browser. Desktop/mobile appearance,
keyboard interaction, colour modes and playback have not received a visual
sign-off. Further visual review should inspect the implemented composition before
changing typefaces again.
