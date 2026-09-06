# The connected record

6 September 2026 — graph 1.1.

The graph grew from 385 nodes / 1,309 relationships to 955 / 1,879 by making
existing source material addressable. No experiments, transcripts or historical
publication dates were invented to increase these counts.

## Added coverage

- Full abstracts, statuses, versions and authors on all 252 records.
- 33 text-bearing HAUSE acts from the 11 public editorial drafts: statements,
  observations, questions, evidence, comparison and refusal.
- 235 chapter nodes from the original film metadata, with original timestamps.
- 302 source-reference nodes, connected by `cites-source`, not `supports`.
- Searchable concept associations and house areas.

The 241 films and 108 passages from two automatic transcripts remain. Chapters
are chapter-title metadata, not 235 newly transcribed passages. References to
external documents are not ingested documents.

## One corpus

`lib/graph.ts` builds the graph and Ask searches its retrievable nodes. The
public API therefore contains the exact text and basis behind each result.
A query cannot search a parallel, hidden answer bank. Related links retain the
editorial or metadata-inferred basis of their source edges.

`lib/record-knowledge.ts` projects HAUSE semantic acts into text. It preserves
question/claim statuses, evidence labels and refusal language. The record page
provides corresponding `#act-N` source anchors; IDs include the record version.
Source-reference anchors and film chapter timestamps also resolve visibly.

## Publication boundaries

Public drafts are searchable as `draft-record`, including their act kind,
status and version. They are still drafts. Ask provides an exclusion filter,
which is also available as `drafts=exclude` on the search API. Draft content
never enters the published-record feed or receives an invented publication date.

The IBM producer / Chris panelist distinction remains in graph authorship.
Automatic-caption passages remain unreviewed. Concept tags and related-record
links indicate discovery relationships, not scientific agreement or support.

## Surfaces

- `/ask`: scoped source retrieval, draft filter, semantic labels, related links.
- `/knowledge`: editorial relationships, concept associations and actual coverage.
- `/api/graph`: versioned graph payload with node, relationship and coverage data.
- `/api/search`: the same corpus, with `scope` and `drafts` parameters.

## Validation

Tests verify unique IDs, resolved edges, exact authored act text, source anchors,
draft exclusion, source chapter titles/timestamps, corporate authorship and
unknown-date handling. HTTP checks exercise the new page, source links and API
filters. Browser interaction and external search-engine indexing are separate
checks; this pass does not claim either was audited.
