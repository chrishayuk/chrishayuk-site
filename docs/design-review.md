# Editorial branch review

Branch: `design/editorial-homepages` · 24 September 2026

## Assessment

The homepage has a clearer editorial structure: an original film, a short
introduction, selected research, notes, and conversations. Newsreader gives the
publication a distinct title voice; Archivo makes its navigation easier to read.
The principal remaining issue is continuity with the inner pages.

This is a source, content and HTTP review. Browser discovery returned no available
browser. No desktop or mobile screenshots, computed styles, keyboard interaction,
video playback, or visual accessibility audit were obtained.

## Findings

| Area | Finding | Status |
| --- | --- | --- |
| Typography | The colophon still named Fraunces and Inter after the font change. | Corrected to Newsreader, Archivo and Geist Mono. |
| Homepage | Film and actual research provide identifiable subject matter. Heading roles and caption sizes are explicit. | Implemented; optical balance remains unverified. |
| Notebook | `ProgrammeDoors` still leads with generated threshold and inheritance illustrations. Their disclosure is accurate, but they continue the visual treatment the user wanted to move away from. | Needs a composition using actual work. |
| Inner hierarchy | `.curated-index .index-intro h1` can reach 150px, while the new homepage title stops at 56px. Film and other collection headings retain their older scales. | Needs a coordinated pass on collection pages. |
| Navigation | The footer presents Ideas / Systems / Objects / Record, while the header presents Systems / Film / Notebook / Research. Both sets work, but they require visitors to learn two structures. | Consolidate the editorial labels in a subsequent layout pass. |
| Imagery | The homepage film frame crops to 2:1 on desktop and 4:3 on mobile, then changes to 16:9 during playback. | Check faces, controls and the resulting movement in a browser. |
| Research | Exact findings, draft labels, source links and programme destinations remain present. | Preserve in further design work. |

## Verification

- All 33 internal destinations linked from the homepage returned HTTP 200.
- The 28 HTML destinations each contained one `main`, one `h1`, and no duplicate IDs.
- Homepage fragment destinations were present in the fetched target pages.
- Typecheck and whitespace checks passed after the colophon correction.
- The preceding typography pass passed both production builds; no visual sign-off is implied.

The next visual session should cover the homepage, Film, Notebook, Research and
one complete research record at 1440, 1024, 768 and 390px, including the menu,
both colour modes and film playback. Judge continuity, image selection and reading
rhythm before choosing another typeface.
