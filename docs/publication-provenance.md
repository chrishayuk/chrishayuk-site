# Provenance and continuity in the publication

The bundled HAUSE contract is `vendor/hause/provenance.ts`. It accompanies legibility; it is not an upstream HAUSE release. The site adapter and audit live in `lib/provenance.ts` and `lib/provenance-audit.ts`.

A published version preserves the manuscript in `content/publications.json`. Its SHA-256 covers the complete record using `stableJson`. `content/publication-provenance.json` binds a change classification, reason and evidence references to that checksum. Neither manifest may rewrite or remove a previously committed release; CI compares both against the push's previous commit or the pull request's base. An updated checksum alone cannot authorise a rewritten manuscript.

The working manuscript remains available separately from the currently published record. The release command reads that manuscript, preserves the original publication date and stable route, sets the revision date, and requires a strictly increasing version and explicit change reason:

```sh
node --experimental-strip-types scripts/publish-record.ts RECORD-ID 1.1 YYYY-MM-DD clarification 'What changed and why'
```

Kinds are `initial`, `clarification`, `interpretation` and `correction`. The command prepares local files for review; deployment is separate. First releases use `initial`. It refuses unlisted previews, impossible dates, duplicate numeric versions and broken predecessor links. `npm run audit:provenance` validates manuscripts, source parity, actual preserved bytes and continuity. `PROVENANCE_BASE=<commit>` additionally verifies append-only Git history. A partial release write fails the audit and must be repaired before deployment.

The canonical editorial route presents the current release. `/records/{id}/{version}` renders the frozen semantic acts, without current custom studies, interactive demonstrations or a changing search projection. This is manuscript preservation, not a byte-for-byte archive of the original HTML or every external dependency. Images and media that were recorded only by ID remain references in the manuscript view. Current thread navigation and version history are surrounding context, not frozen evidence.

`/api/record/{id}?version={version}` returns the exact manuscript, checksum and provenance. `/api/record/{id}/history` returns versions, change reasons, previous/next links, evidence and pinned citation-export URLs. Drafts have no published versions; unlisted records are excluded. BibTeX and CSL JSON cite the version URL. First-publication and revision dates remain separate. A scientific status of `REFUTED` or `NOT SUPPORTED` does not unpublish a record.

Optional `experiments` identifiers belong in the authored record only when known. Optional `supersedes` references name a record ID, version and reason. The audit requires a preserved target and rejects circular supersession. Reverse `supersededBy` links are derived from later records, so the earlier manuscript need not change. Ordinary revisions use previous/next; thread membership is reading order, not supersession.

Local `/data/` sources are copied to `/data/publications/sha256/{hash}.{extension}`. The provenance records when each copy was made. The older MOTIVATION-2 v1.0 manuscript was not modified: its evidence copy was captured on 12 September 2026 when this preservation system was introduced. This does not retroactively attest an earlier capture. External links retain their original references and produce advisory notices; a Git URL or a site's own checksum is not an independent archival guarantee.

The graph has manuscript-version nodes, source links, preserved-artifact checksums and revision/supersession edges. Historical manuscripts and artifacts are not silently mixed into Ask's current findings. A separate retrievable history node links to the visible version section. `llms.txt` explains how to resolve the same history. `follow.json` labels clarification versus interpretation/correction from the explicit change record, with the older earlier-version rule retained for legacy entries.

Structured data uses [isBasedOn](https://schema.org/isBasedOn) for a manuscript's predecessor and source `archivedAt` for preserved copies. It preserves the editorial headline and the version's dates. The readable citation apparatus exposes the same source references and capture dates.

Acceptance checks cover rehashed rewrites, removed versions, first-publication drift, invalid dates, equivalent version spellings, missing evidence, changed provenance, graph relationships and draft history. Production checks resolve the version page, history API, citation exports and preserved bytes over HTTP. A visual browser review still depends on an available browser connection.
