# HAUSE contribution and publication audit — 5 September 2026

The reusable implementation belongs to HAUSE. Changes are applied to `/Users/christopherhay/chris-source/hause-design/hause` and mirrored exactly into the portable vendored dependency. The base revision remains `a93fb729c7d9ba02f7c1b2c369394526f9a3d158`; the contribution is published in the HAUSE repository at `74cd09234a3d4028edc695353085a0f6f876eccf`. Consumers can pin that revision; this is not an npm registry release.

## Contributed and consumed

| HAUSE module | Publication use |
| --- | --- |
| MotionProvider / useMotion / chooseMotion | Shared ownership for local ambient footage, full films and system studies; reduced motion, data saving, pause, hidden-page and modal suspension |
| YouTubeFilm | Poster-first privacy-enhanced screening, manual activation, preview slot, chapter requests |
| FilmChapters / TimedTranscript | Source chapter navigation and server-rendered caption passages, with explicit automatic/unreviewed status |
| CitationExport | Four formats, clipboard feedback, downloads and no-JS disclosure |
| cite.ts | Film/image kinds, literal corporate authors, unknown dates, stable graph identifiers and matching head metadata |
| seo.ts | Canonical/social/citation metadata and VideoObject builders; local catalogue URL distinguished from original publication |
| ModeToggle / modeScript | HAUSE light/dark choice, larger touch target, persisted selection before paint, configurable authored default |

`vendor/hause/PUBLICATION.md` documents the generic contracts and adoption. Existing HAUSE Film/Citation forms are preserved. CHRISHAYUK supplies its record adapters, retrieval logic, rights, editorial summaries, routing, imagery and art direction. The atmospheric filters, contact sheet and homepage scene sequence remain specific to this publication. The existing local Media renderer is another candidate once its readiness/rights registry becomes a reusable record contract.

## Verified

- All 46 audited IBM appearances are full film records and metadata-searchable; personal channel remains 195 films. Graph edges distinguish IBM production from Chris's participation.
- Ask can retrieve the dated, lower-bound panelist register. It remains source retrieval, with only two indexed automatic transcripts; this is not transcript-level search over every film.
- Film citations use the original film URL, original producer, and source publication date where available. Missing dates remain n.d.; no retrieval date is promoted to publication.
- APA retains the full known date. BibTeX protects corporate authors. CSL-JSON emits literal organizations and omits unknown issued dates. Drafts remain unpublished and excluded from the citation API.
- Server-rendered film pages include a factual synopsis before playback, head citation metadata, VideoObject and breadcrumbs. About uses ProfilePage; the root exposes Person and WebSite.
- The sitemap includes 241 film records plus nine index pages: 250 unique canonical URLs. Query parameters for sorting/seeking canonicalize to the underlying page.
- RSS/JSON Feed are valid and intentionally contain only locally published editorial records; there are none yet. Catalogued films are exposed through the record API and sitemap instead.
- 17 publication tests, three portable HAUSE tests, TypeScript and the production build pass. An 18-route local HTTP audit checks actual returned HTML, JSON and XML, source citations, sitemap coverage, canonical metadata, no initial iframes and draft rejection.

## Limits and release work

This is a private owner-only edition. The robots file and metadata still prohibit indexing. No search ranking, Google indexing, rich-result eligibility, or AI-engine inclusion has been demonstrated. Canonical identity uses the planned `chrishayuk.com` domain; the canonical domain, media reachability, robots policy and public rich-result testing must be reviewed together at public launch.

192 personal-channel entries still have listing-only metadata and unknown publication dates. Their structured records intentionally omit upload dates, so do not claim complete Google VideoObject rich-result coverage. IBM timestamps are retained only when supplied by the original metadata.

Light/dark mode has code and bootstrap checks; browser interaction and visual QA were not performed. Films remain in authored cinematic black. The toggle is an explicit HAUSE environment choice, not an OS preference setting. Full YouTube playback resets when suspended, as before this extraction.

Authoritative guidance: [Google video structured data](https://developers.google.com/search/docs/appearance/structured-data/video), [Google AI features and websites](https://developers.google.com/search/docs/appearance/ai-features), [canonical URL guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls). HAUSE projects factual records into machine-readable surfaces; no special AI-only file or unsupported schema is required.
