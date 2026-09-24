# Editorial branch review and corrections

Branch: `design/editorial-homepages`

## Implemented

- Notebook programme entrances now show recorded research and its diagrams through
  the existing result components. Generated entrance illustrations are removed.
- Collection and record titles use the homepage's 34–56px Newsreader scale;
  section titles use its 28–40px scale. Programme text and labels use Archivo.
- Film, research, systems, notebook and prose pages share the quieter hierarchy.
- Header and footer use the same primary destinations. The complete catalogue
  remains available in the archive group.
- Homepage films retain a 16:9 frame before and during playback, preserving the
  full image and avoiding the previous aspect-ratio jump.
- The colophon names the fonts actually loaded by the site.

## Verification

The production Next.js build and complete existing test suite pass. Served
homepage and Notebook HTML each have one h1, unique IDs and valid local anchors.
The earlier review checked all 33 internal homepage destinations successfully.

Browser discovery still returned no available browser. Desktop/mobile appearance,
keyboard interaction, colour modes and playback have not received a visual
sign-off. Further visual review should inspect the implemented composition before
changing typefaces again.
