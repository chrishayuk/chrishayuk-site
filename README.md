# CHRIS HAY — a research house

A HAUSE publication with a fourteen-scene homepage, work dossiers, a sourced film collection, notebook and research records, and publication/citation infrastructure.

## Run

```sh
npm ci
npm run dev
npm run typecheck
npm test
npm run build
```

The app uses the bundled Sites/vinext architecture. HAUSE is vendored from clean revision `a93fb729c7d9ba02f7c1b2c369394526f9a3d158` with a portable file dependency. The library source is unchanged; exhibition-specific media, status and layout behaviour lives in `components/`.

## Production state

This is a private production edition. Real channel films, three short preview excerpts and a studio portrait are in place. Remaining original location and notebook photography slots are explicitly labelled. No stock portrait or synthetic notebook impersonates Chris’s record. IBM film records link to verified original productions. Their local editorial titles are not claimed as original episode titles. Drafts do not enter public APIs or feeds; catalogued YouTube source records enter the record API separately from local publications. The global robots policy prevents indexing this edition.

The homepage does **not yet meet** the photographic-area launch criterion. Do not make it public until original media and record review are complete.

## Add media

Place approved derivatives under `public/media/` and add entries to `content/media-library.json`, keyed by a stable ID from `lib/media.ts`. Example shape (filenames are illustrative):

```json
{
  "hero-identity": {
    "state": "ready",
    "rights": "owned",
    "desktop": "/media/identity-desktop.mp4",
    "mobile": "/media/identity-mobile.mp4",
    "poster": "/media/identity-desktop.webp",
    "mobilePoster": "/media/identity-mobile.webp",
    "alt": "An accurate description of the delivered film",
    "creator": "Actual creator",
    "source": "Original asset reference"
  }
}
```

Film sources attach only on playback eligibility. Missing independent mobile footage remains still on mobile. Global pause, reduced-motion, save-data and offscreen ownership are coordinated. Responsive photography uses an explicit desktop/mobile picture source. Further AVIF/WebP srcset derivatives can be added when the originals arrive; no fake derivatives are generated in this edition.

## Records and publication

`lib/records.ts` stores semantic acts and attribution, not layout components. Current authored entries are drafts. Reference controls identify them as unpublished manuscripts, without inventing dates. Actual publication uses HAUSE Citation/Provenance and its formatters.

After editorial review, create an immutable snapshot with:

```sh
node --experimental-strip-types scripts/publish-record.ts RECORD-ID 1.0 YYYY-MM-DD
```

The command appends a complete snapshot and a SHA-256 of deterministic, sorted-key JSON to `content/publications.json`. An existing ID/version cannot be overwritten. First publication date remains unchanged on a new version. Rebuild and deploy to make the new snapshot available. Version pages live at `/records/ID/VERSION`; records, citations and concepts are available under `/api/`. Publishing a record is separate from allowing public access to the site.

## Handoff

- [Production board](docs/homepage-production-board.md)
- [HAUSE source inspection](docs/hause-integration-handoff.md)
- [Media production inventory](content/homepage-media.production.json)

The social card `public/og.png` was generated using the built-in ImageGen tool. Brief: exact CHRIS HAY identity, BUILDING THINGS / TO FIND OUT / HOW THEY WORK., London 2026, A RESEARCH HOUSE and CHRISHAYUK.COM in editorial serif/sans/monospace on HAUSE ink and paper. No generated photography is used.


## YouTube collection and graph

- `/film/youtube`: feature, latest long-form upload, editorial selections, most viewed.
- `/film/youtube/archive`: all 195 public entries (177 videos, 18 Shorts), searchable and sortable; no public streams tab at retrieval.
- `/film/youtube/:youtubeId`: explicit full playback, chapters, original description, available timed captions, source citation and related work.
- `/ask`: source retrieval across video metadata and indexed automatic captions. This is not an LLM answer generator.
- `/api/graph`: record, concept, channel and timed-passage nodes with typed, attributed edges.
- `/api/search?q=...`: source passages with original timestamp URLs; metadata-only matches are labelled.

`content/youtube-catalogue.json` is a dated public-source snapshot. Preserve its git history on refresh. Source publication dates are nullable and never inferred from relative “months ago” labels. View counts from flat listings are approximate, explicitly marked. “Latest” uses the long-form channel ordering, not invented dates. IDs preserve YouTube's case-sensitive identity.

Refresh from cached public metadata with `python3 scripts/import-youtube.py work/media-ingest`. The importer checks the channel ID and refuses an empty catalogue. It takes `channel-current.json`, optional `channel-other.jsonl`, per-video `.info.json` and available `.en-orig.json3` captions. It does not copy signed download URLs into source. Full metadata is currently available for three videos; automatic, unreviewed timed captions for two. Caption rate limiting interrupted further ingestion; missing transcripts stay explicit.

Imported films have `publication: catalogued`, distinct from local published editorial claims. Citations identify the original YouTube film. Metadata-derived concept/project edges are for discovery, never proof of a claim. Raw downloads are ignored. `sourceMetadata` retains retrieval time, content hash and coverage. The graph includes draft record stubs marked non-retrievable for cross-links; Ask only retrieves catalogued films at present.

Media edit decisions are recorded in `docs/youtube-media.md`. Full YouTube players load only on explicit activation. Offscreen, hidden-page, menu and global-pause events remove the full player; returning requires another play action. Playback position within the embedded player is not retained on suspension. Muted local previews share the existing motion coordinator. All frames remain useful with video disabled.

## Mixture of Experts selection

`/film/mixture-of-experts` leads with Chris's latest verified appearance. `?sort=popular` leads with the most-viewed selection. The 5 September snapshot compares 128 entries in IBM Technology's official programme playlist and verifies participant credits in full video metadata: episode 123 (4 September 2026) and episode 40 (the playlist's most viewed). Full films use click-to-load official YouTube embeds and their original posters. IBM footage and transcripts are not downloaded or republished.

`python3 scripts/import-ibm.py work/media-ingest` reads `ibm-playlist.json` and available candidate `.info.json` files; it rejects incorrect source channels and admits only films whose original descriptions name Chris Hay. Refresh the playlist and candidate metadata before running it. Selection is a dated snapshot, not a live API integration. Summaries are editorial; publication dates, participant verification and view counts are source-derived. The two IBM records also enter the graph and Ask metadata search, with IBM as producer and Chris as participant. Source citations credit IBM; the personal channel archive remains 195 videos.
