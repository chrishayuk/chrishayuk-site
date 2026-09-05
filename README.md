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

This is a private production edition. The original photography and films are missing, so media frames are explicitly labelled. No stock portrait or synthetic notebook impersonates Chris’s record. IBM film records link to verified original productions. Their local editorial titles are not claimed as original episode titles. Drafts do not enter public APIs or feeds. The global robots policy prevents indexing this edition.

The homepage does **not yet meet** the photographic-area or three-owned-film launch criteria. Do not make it public until original media and record review are complete.

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
