# Publication legibility

The Notebook is the acceptance corpus for a small, framework-neutral HAUSE capability. Its implementation is in the site's vendored HAUSE package (`vendor/hause/legibility.ts`); it has not been released separately upstream.

Editorial `title` and literal `subject` have different jobs. Each listed notebook and reading thread declares a subject, question, search title, description and discovery concepts in `lib/legibility.ts`. Its existing authored abstract remains the readable account of the work.

## Projections

- HTML title and meta description use the literal search projection.
- H1, decks, artwork, Open Graph and social titles retain editorial wording.
- Structured headlines retain the editorial title; `alternativeHeadline`, `description` and `about` carry the discovery projection. The existing abstract, source references and collection membership remain explicit.
- Drafts have an Article/CreativeWork type and draft status, with no invented publication date. Published records retain their existing citation provenance.
- Graph record and thread nodes expose the subject and question. Discovery aliases help find those nodes; the source excerpts and individual evidence acts remain authored text.
- llms.txt includes the same subject and question beside the unchanged abstract and publication status, for both notebook entries and reading threads.
- Feed titles, immutable snapshots, publication hashes and citation titles remain unchanged. Metadata edits do not become new scientific results or publication dates.

Thread subjects are also visible in the existing introductory label. The programmes cover AI agent permission and task scope, artificial life and evolutionary innovation, and transformer memory and interpretation. Existing reading order supplies graph relationships and structured collection membership.

## Contract and validation

`npm run audit:legibility` checks the entire listed notebook/thread corpus. Required checks cover subject, question, abstract, canonical HTTP(S) URL, explicit indexing policy, author, concepts and an equivalent readable abstract. A projected search head also requires its title and description. Published work requires its real recorded publication date; impossible calendar dates fail. Duplicate effective search titles (ignoring case and punctuation) and dangling metadata records fail. An absent collection or an unchanged search title is advisory.

Every diagnostic has a stable code, severity, explanation and remedy. For example:

```text
REQUIRED [literal-subject]: The publication does not declare what it is about.
  Supply a literal subject. The editorial title may remain unchanged.
```

## Deliberately retaining the editorial head

An author can opt out of the separate search projection:

```ts
{
 subject: "The literal subject",
 question: "What question does the work address?",
 concepts: ["A subject actually discussed"],
 search: {
  mode: "editorial",
  reason: "The authored title already states this question precisely."
 }
}
```

The existing editorial title and description then remain in HTML metadata. JSON-LD omits the alternative search headline and search description; the graph omits search overrides and marks `searchProjection: "editorial"`. Subject, question, concepts and readable abstract remain available to graph retrieval and llms.txt. If searchTitle or description are retained for a possible later revision, they are dormant and do not enter retrieval. Remove `search` to re-enable the projection.

This is an editorial choice, not `noindex`, an unlisted page, a publication-state change, or permission to omit meaning and provenance. The audit requires a nonempty reason and reports it as an advisory. Deleting the whole legibility record still fails. Source-record authorship, dates and status take precedence over any extra fields accidentally supplied in a discovery record. No current page has been opted out just to exercise the feature.

## Edit-parity acceptance tests

The test suite starts fresh isolated processes and edits the in-memory fixture records before loading the production consumers. It exercises a draft, a published note and a thread in projected and editorial modes. It compares actual pageMetadata, the JSON-LD projection used by the page renderers, graph fields, retrieval and llmsDocument. It also checks editorial/social wording, draft/published state, preview withholding, membership, and preservation of the published manuscript. It writes no fixture content into the real corpus.

The deployment check independently verifies rendered HTML and JSON-LD against the served graph for all 23 pages and handles either search mode. This checks the wiring as well as the projection helpers. The isolated edit tests are not a browser hot-reload test; they model a rebuilt edition.

This is not an automated scientific review: authors must verify that discovery wording is supported by the page. It does not enforce title length, keyword density, ranking forecasts, fabricated answers or scholarly status. The deployment check reads actual metadata and structured data, so an unused data field cannot satisfy acceptance by itself.

Google's [title guidance](https://developers.google.com/search/docs/appearance/title-link) recommends descriptive, concise titles and may generate a different search result title. Its [Article guidance](https://developers.google.com/search/docs/appearance/structured-data/article) describes supported article properties. Neither guarantees ranking or traffic; measure those after recrawling.

The next upstream step is to move this proven contract and its tests into HAUSE's source package. A general Thread API and feed grouping need their own consumers and are not claimed by this first implementation.
