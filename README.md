# CHRIS HAY — a house for ideas, systems and objects

The primary record of Chris Hay’s practice: ideas, systems and objects. Built with HAUSE, with a cinematic homepage, work dossiers, a sourced film collection, notebook and research records, and publication/citation infrastructure.

The brand is **CHRIS HAY**. **A house for ideas, systems and objects.** is the umbrella; **Building things to find out how they work.** is the philosophy. `lib/house.ts` supplies the author-described practice to About, metadata and Ask. The graph marks this as positioning, separate from experimental evidence and the authorship of external productions.

## Run

```sh
npm ci
npm run dev
npm run typecheck
npm test
npm run build
```

The app uses the bundled Sites/vinext architecture. HAUSE is vendored from clean revision `a93fb729c7d9ba02f7c1b2c369394526f9a3d158` with a portable file dependency. The shared publication/film extensions are published upstream at HAUSE revision `74cd09234a3d4028edc695353085a0f6f876eccf`. See [HAUSE contributions and audit](docs/hause-publication-contribution.md); exhibition-specific media, status and layout behaviour lives in `components/`.

## Production hosting

GitHub Actions checks every pull request. A passing push to `main` deploys the Next.js standalone build to the Fly app `chrishayuk-site` in London. `npm run build:fly` builds it; the existing Sites/vinext scripts and private preview remain available. The Docker build enables indexing for the public edition; local and Sites builds default to noindex.

Canonical domain: **https://chrishayuk.com**. The other four owned domains and all five `www` hosts permanently redirect there, preserving paths and query strings. See [deployment and DNS](docs/deployment.md).

## Production state

This is the first public production edition. Real channel films, three short preview excerpts and a studio portrait are in place. Remaining original location and notebook photography slots are explicitly labelled. No stock portrait or synthetic notebook impersonates Chris’s record. IBM film records link to verified original productions. Their local editorial titles are not claimed as original episode titles. Drafts do not enter the published-only record feed; the notebook feeds carry explicitly labelled drafts; catalogued YouTube source records enter the record API separately from local publications. The public Fly edition permits indexing; drafts remain explicitly labelled and excluded from publication feeds.

The homepage does **not yet meet** the photographic-area launch criterion. The owner has authorized this initial public edition; the media inventory continues to identify the original photography still required.

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

A record can carry `visibility: "unlisted"`. It then resolves at its own URL so it can be
reviewed on the deployed site, and appears in no index, catalogue, feed, thread, sitemap or
graph, with `noindex` metadata and a visible preview notice. See [unlisted previews](docs/previews.md).

After editorial review, create an immutable snapshot with:

```sh
node --experimental-strip-types scripts/publish-record.ts RECORD-ID 1.0 YYYY-MM-DD
```

The command appends a complete snapshot and a SHA-256 of deterministic, sorted-key JSON to `content/publications.json`. An existing ID/version cannot be overwritten. First publication date remains unchanged on a new version. Rebuild and deploy to make the new snapshot available. Version pages live at `/records/ID/VERSION`; records, citations and concepts are available under `/api/`. Publishing a record is separate from allowing public access to the site.

## Following the work

Two feeds, because two questions are being asked. `/record/feed.xml` and `/record/feed.json` carry published records only, following the publication policy exactly. `/notebook/feed.xml` and the default `/feed.json` carry the notebook as it is actually kept — drafts included, each entry labelled `DRAFT · V0.1 · RECORDED <date>` in its own description, with a `urn:chrishayuk:record:ID:VERSION` GUID that is explicitly not a permalink. A draft that reached a reader looking like a publication would be the one thing these feeds must never do.

A feed item identifies a record *version*, so a material revision arrives as the new object it is and an ordinary edit produces no feed event at all. `lib/feeds.ts` holds both definitions; the routes are two lines each.

`/rss.xml` is a 308 to `/record/feed.xml`. Autodiscovery lives in `feedAlternates` (`lib/metadata.ts`) and is applied by both the root layout and `pageMetadata` — the latter matters, because `publicationMetadata` returns its own `alternates` and Next replaces rather than merges them, which previously left every record page advertising no feed at all.

`/follow.json` is the same authority in the form a program wants: per record, its version, `state` (`draft` or `published`), `recorded_at`, `published_at` only where one exists, `material_revision`, topics, summary, canonical URL and the independent capture where there is one. Three properties make it safe to poll — `updated_at` is derived from the newest record rather than the clock, so two polls with nothing published between them return byte-identical documents; `material_revision` is true only when an earlier version of that record exists, so "ignore minor revisions" is a rule a watcher can actually act on; and a draft carries no `published_at`, because manufacturing one is the exact claim this record exists to make impossible.

`CHATGPT_TASK` in `lib/follow.ts` is the one fact the site cannot derive. A ChatGPT shared scheduled-task link is created by hand in an account and cannot be minted through an API, so paste the `chatgpt.com/s/...` URL there and the Follow panel grows a **FOLLOW WITH CHATGPT** option; left `null`, it offers none. A reader who takes that link gets their own copy of the task in their own account — this site is never told, and holds nothing about them.

`components/Follow.tsx` is the reader-facing surface: FOLLOW joins CITE and ARCHIVE in the record bar, and the panel appears on record pages, `/notebook` and `/record`. It is not a mailing list — no account, no address, nothing for this site to store. Email can arrive later as another transport under the same verb.

## Machine readership

The site loads a Google tag, and a tag is a script. Nothing that reads this
publication without running JavaScript has ever appeared in any measurement here
— not GPTBot or ClaudeBot collecting text, not OAI-SearchBot or Claude-SearchBot
indexing it, not ChatGPT-User or Claude-User fetching a page because somebody
asked a question, not a single feed client polling `/notebook/feed.xml`. That is
most of the audience this publication was built for.

`proxy.ts` counts them at the server, where they are visible, and `/readership`
publishes the result. The question it answers is not how many: it is **which
ideas are being retrieved into somebody's conversation**, as distinct from
merely being indexed, and whether an agent takes the documents this site
publishes for machines — the two feeds, `/follow.json`, the record API — or only
scrapes the pages.

A user agent is a string the client chose to send, so nothing is counted on the
strength of its name alone. Where a provider publishes the addresses its
crawlers use, every claim is checked against that published list;
`content/agent-ranges.json` holds a dated snapshot of eight such documents from
OpenAI, Anthropic, Perplexity, Google and Microsoft, committed the same way
`content/archive.json` is and refreshed after every deploy. A claim its own
provider's addresses contradict is recorded as **refuted** and excluded from
every total on the page. Verified and self-declared figures are never added
together, because a number anyone can raise by setting a header is not a
readership figure.

The store holds counters and nothing else — `(hour, path, agent, outcome) → n`.
No address, session, cookie, fingerprint or query string, and no timestamp finer
than the hour. An address is used once, to ask whether a declared agent is where
its provider says it is, and the three-word answer is what survives.

```sh
npm run agent-ranges          # refresh the published crawler address snapshot
```

Counting requires a durable store: `READERSHIP_DB` names a SQLite file on the
Fly volume. Unset — local, previews, the Sites build — requests are classified
and nothing is kept, and the page says so rather than showing an invented
figure. See [machine readership](docs/machine-readership.md).

## The independent archive

A date on this site is evidence only to someone who already trusts this site. `scripts/archive-wayback.ts` asks the Internet Archive to capture each canonical object after a deploy, then reads the Wayback index back to learn when that URL was **first** captured, and records the answer in `content/archive.json`.

```sh
npm run archive                 # resolve-only: reads the public CDX index, submits nothing
IA_ACCESS_KEY=... IA_SECRET_KEY=... npm run archive   # also submits to Save Page Now
```

Credentials are Internet Archive S3-style keys from <https://archive.org/account/s3.php>; Save Page Now rejects anonymous requests. Without them the script still runs and records whatever has already been captured, so it is never blocked on a secret.

The script bounds network calls and submits at most six pages per run by default. A successful Save Page Now job never establishes a first-capture date by itself; only a valid earliest CDX result does. The rules it enforces: a capture already on file is never moved forward (an earlier one replaces it, a later one does not); a URL must be on the public allowlist, including when supplied with `--url`, and the live site must return 200; and nothing is invented — a URL with no capture gets no entry and no page shows an archive line.

`lib/canonical.ts` holds two deliberately different lists. `canonicalPaths` is the shared sitemap surface: standing pages, threads and indexed authored records, including public notebook drafts. Catalogue-only film stubs remain reachable through their collections. `archivePaths` is the evidence surface and follows *visibility*, because priority attaches to when work became publicly readable rather than to when its author finished reviewing it. Unlisted previews appear in neither — a third-party capture cannot be withdrawn. The several hundred catalogued IBM records are excluded too: they are records of someone else's productions and carry no claim of Chris's.

The deploy workflow runs the archive job after a successful deploy and commits `content/archive.json` back. That commit is excluded from the push trigger by `paths-ignore`, so it starts no second deploy; the dates reach the site on the next one.


## Handoff

- [Production board](docs/homepage-production-board.md)
- [HAUSE source inspection](docs/hause-integration-handoff.md)
- [Media production inventory](content/homepage-media.production.json)

The current social card `public/og-house.png` uses the new house identity. It was generated with the built-in image tool; the exact prompt and asset provenance are in [the brand record](docs/brand.md). No generated photography is used.


## YouTube collection and graph

- `/film/youtube`: feature, latest long-form upload, editorial selections, most viewed.
- `/film/youtube/archive`: all 195 public entries (177 videos, 18 Shorts), searchable and sortable; no public streams tab at retrieval.
- `/film/youtube/:youtubeId`: explicit full playback, chapters, original description, available timed captions, source citation and related work.
- `/ask`: source retrieval across video metadata and indexed automatic captions. This is not an LLM answer generator.
- `/api/graph`: record, concept, channel and timed-passage nodes with typed, attributed edges.
- `/api/search?q=...`: source passages with original timestamp URLs; metadata-only matches are labelled.

`content/youtube-catalogue.json` is a dated public-source snapshot. Preserve its git history on refresh. Source publication dates are nullable and never inferred from relative “months ago” labels. View counts from flat listings are approximate, explicitly marked. “Latest” uses the long-form channel ordering, not invented dates. IDs preserve YouTube's case-sensitive identity.

Refresh from cached public metadata with `python3 scripts/import-youtube.py work/media-ingest`. The importer checks the channel ID and refuses an empty catalogue. It takes `channel-current.json`, optional `channel-other.jsonl`, per-video `.info.json` and available `.en-orig.json3` captions. It does not copy signed download URLs into source. Full metadata is currently available for three videos; automatic, unreviewed timed captions for two. Caption rate limiting interrupted further ingestion; missing transcripts stay explicit.

Imported films have `publication: catalogued`, distinct from local published editorial claims. Citations identify the original YouTube film. Metadata-derived concept/project edges are for discovery, never proof of a claim. Raw downloads are ignored. `sourceMetadata` retains retrieval time, content hash and coverage. The graph includes the full text of public editorial drafts, preserving draft status, semantic acts and source anchors. Ask retrieves these alongside catalogued films, chapters, published editorial records when present, and the verified IBM appearance register; `drafts=exclude` removes draft results.

Media edit decisions are recorded in `docs/youtube-media.md`. Full YouTube players load only on explicit activation. Offscreen, hidden-page, menu and global-pause events remove the full player; returning requires another play action. Playback position within the embedded player is not retained on suspension. Muted local previews share the existing motion coordinator. All frames remain useful with video disabled.

## Mixture of Experts selection

`/film/mixture-of-experts` leads with Chris's latest verified appearance. `?sort=popular` leads with the most-viewed selection. The 5 September snapshot compares 128 entries in IBM Technology's official programme playlist and verifies participant credits in full video metadata: episode 123 (4 September 2026) and episode 40 (the playlist's most viewed). Full films use click-to-load official YouTube embeds and official source posters; episode 123 uses IBM's revised 7 September title and panel artwork. IBM footage and transcripts are not downloaded or republished.

`python3 scripts/import-ibm.py work/media-ingest` reads `ibm-playlist.json` and available candidate `.info.json` files; it rejects incorrect source channels and admits only films whose original descriptions name Chris Hay. Refresh the playlist and candidate metadata before running it. Selection is a dated snapshot, not a live API integration. Summaries are editorial; publication dates, participant verification and view counts are source-derived. All 46 verified IBM appearances enter the graph and Ask metadata search, with IBM as producer and Chris as participant. Source citations credit IBM; the personal channel archive remains 195 videos.

### Regular panelist provenance

The Mixture of Experts introduction states regular participation from episode one (3 May 2024) and **at least 46 episodes**, backed by `content/ibm-appearances.json`. The 5 September audit read 127 public video descriptions from the 128-entry official playlist; one entry was unavailable. A direct participant credit confirms each included appearance. The register deduplicates numbered episodes and includes separately published bonus episodes; missing names do not prove absence. All 46 film records are accessible in the page’s collapsed appearance register, each retaining its original source link. Episode-one provenance is independently supported by IBM’s inaugural episode page.

Refresh with `python3 scripts/audit-ibm-appearances.py work/media-ingest` after refreshing the cached playlist and full episode metadata. Review any newly matched credits before publication. This audit intentionally does not change the featured latest/popular film selection or republish IBM transcripts. The series node in `/api/graph` exposes the minimum count, role, start date and source references.


## House catalogue and measurement

Ideas, Systems, Objects and Record are the primary entrances. `/record` provides
server-rendered search, kind filters and pagination across the existing record
identities. `/work` remains available with `/systems` as its canonical index;
dossier URLs remain stable. See [brand architecture](docs/brand.md).

Search metadata, citations and the optional Google tag use HAUSE. See the
[implementation audit](docs/search-and-analytics.md) for verified coverage and
remaining account-side checks, and [deployment](docs/deployment.md) for the
site-specific GA4 configuration.


## Expanded graph

`/knowledge` exposes the connected record behind Ask. `lib/graph.ts` builds one
corpus for the graph API and retrieval, from the existing records and source
catalogues. It includes 252 record nodes, 33 authored HAUSE-act passages, 235
film chapters, 108 automatic-caption passages, 16 concepts and 302 source
references (955 nodes and 1,879 relationships including house/identity nodes).
Counts are derived at build/runtime, not maintained independently in the UI.

- `/api/search?q=...&scope=records|films|concepts|all` scopes retrieval.
- `drafts=exclude` removes editorial drafts, including related-result links.
- Authored passage IDs include the record version; source URLs resolve to
  `#act-N` anchors on their record pages.
- Chapter titles carry `source-chapter` provenance and original YouTube times;
  they are not treated as transcript quotations.
- Source reference nodes record citations only; they do not imply ingestion of
  a linked repository or website. Only two actual transcripts are indexed.
- Editorial and metadata-inferred edges remain distinct; neither is evidence
  that connected records support each other's claims.

The raw graph includes draft text because those records are already public on
the site. This is a change in retrieval coverage, not a publication transition;
`indexedRecords`, version snapshots, publication feeds and citations retain
those boundaries. [Implementation and coverage](docs/graph.md).

## Social distribution

Every listed Notebook record has a deterministic 1200×630 PNG at `/api/social/ID`. Open Graph and X metadata use that card, with a content-derived cache key. The card carries the real title, proposition, ID, version and editorial status; a draft has a recorded date, not an invented publication date. Fraunces is bundled with its OFL license so card rendering needs no font service.

HAUSE supplies `Share`: LinkedIn, X and a native Copy disclosure with clipboard feedback and selectable text. The site supplies the proposition and canonical URL. No social SDK or automatic posting is involved. `/api/share/ID` exports editable LinkedIn and X drafts extracted from the same record; short source records remain short rather than acquiring filler or invented claims. Unlisted and non-notebook records return 404 from both social routes.

`revised` is an authored material-revision date. Publication snapshots retain their original `published` date, while feed ordering and `follow.json.updated_at` use the revision event. Polls do not generate timestamps. Optional shared-task UI remains absent until a real destination has been configured.

The legacy `/rss.xml` address now follows the Notebook, keeping default RSS and JSON discovery aligned. The explicitly named Record feeds remain published-only.
