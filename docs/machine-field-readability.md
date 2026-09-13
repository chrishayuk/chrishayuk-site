# Machine field map and reading entrances — 13 September 2026

Nine existing notes now open with a plain question and a two- or three-sentence
result before the laboratory identifiers. The source is `lib/machine-field.ts`:
the same text renders the visible entrance, Article `hasPart`, graph/Ask summary
nodes and `llms.txt`. Editorial H1s, manuscripts, versions and evidence remain
unchanged. Frozen editions do not receive the current summary.

The permanent map lives at `/thread/machines#field-map`, with direct entrances
from Home, Notebook, both threads and all nine notes. It follows questions rather
than chronology: discover, use, authorise, choose, remember, pass on, maintain.
Each stage links to its notes. The maintenance question remains open in the
A1B3–A1B12 corpus; the map does not import claims from later, unreviewed work.
A graph node connects the map to the same nine notes with editorial relationships.

## Discovery audit

All nine URLs were already present in the public sitemap. It contained no
`lastmod` entries. Current publication checks already cover canonical URLs,
indexability, Notebook membership, thread relationships and graph/Ask routes.

`lib/page-updates.ts` now records significant changes to the current page, with
a date and reason. These dates project into sitemap `lastmod`, current-page
`dateModified` and article Open Graph modification time. The reading entrance
labels its date as PAGE UPDATED. It does not change the manuscript's revision,
first-publication date, citation or frozen snapshot. Unknown page dates are omitted;
request time and build time never supply a modification date.

This follows [Google's sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap):
use verifiable dates of significant page changes, not a continuously refreshed
clock. Sitemap inclusion is not evidence of indexing. Search Console impressions,
indexing decisions and ranking changes were not measured in this pass.

Browser discovery reported no available browser. Static markup, data, compilation
and deployment checks are available; visual and click-based QA remain unverified.

Validation: all 148 tests, TypeScript, changed-file lint, the Next.js production
build, full local deployment checks and preserved-publication checks passed.
The deployment checks cover nine visible summaries, every map destination,
matching JSON-LD/graph text and sitemap dates, plus all 24 Notebook routes.
