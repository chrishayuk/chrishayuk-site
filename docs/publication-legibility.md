# Publication legibility

The Notebook is the acceptance corpus for a small, framework-neutral HAUSE capability. Its implementation is in the site's vendored HAUSE package (`vendor/hause/legibility.ts`); it has not been released separately upstream.

Editorial `title` and literal `subject` have different jobs. Each listed notebook and reading thread declares a subject, question, search title, description and discovery concepts in `lib/legibility.ts`. Its existing authored abstract remains the readable account of the work.

## Projections

- HTML title and meta description use the literal search projection.
- H1, decks, artwork, Open Graph and social titles retain editorial wording.
- Structured headlines retain the editorial title; `alternativeHeadline`, `description` and `about` carry the discovery projection. The existing abstract, source references and collection membership remain explicit.
- Drafts have an Article/CreativeWork type and draft status, with no invented publication date. Published records retain their existing citation provenance.
- Graph record and thread nodes expose the subject and question. Discovery aliases help find those nodes; the source excerpts and individual evidence acts remain authored text.
- llms.txt includes the same subject and question beside the unchanged abstract and publication status.
- Feed titles, immutable snapshots, publication hashes and citation titles remain unchanged. Metadata edits do not become new scientific results or publication dates.

Thread subjects are also visible in the existing introductory label. The programmes cover AI agent permission and task scope, artificial life and evolutionary innovation, and transformer memory and interpretation. Existing reading order supplies graph relationships and structured collection membership.

## Contract and validation

`npm run audit:legibility` checks the entire listed notebook/thread corpus. Required checks cover subject, question, abstract, description, canonical HTTP(S) URL, explicit indexing policy, author, concepts and an equivalent readable abstract. Published work requires its recorded publication date. Duplicate search titles and dangling metadata records fail. An absent collection or an unchanged search title is advisory.

This is not an automated scientific review: authors must verify that discovery wording is supported by the page. It does not enforce title length, keyword density, ranking forecasts, fabricated answers or scholarly status. The deployment check reads actual metadata and structured data, so an unused data field cannot satisfy acceptance by itself.

Google's [title guidance](https://developers.google.com/search/docs/appearance/title-link) recommends descriptive, concise titles and may generate a different search result title. Its [Article guidance](https://developers.google.com/search/docs/appearance/structured-data/article) describes supported article properties. Neither guarantees ranking or traffic; measure those after recrawling.

The next upstream step is to move this proven contract and its tests into HAUSE's source package. A general Thread API and feed grouping need their own consumers and are not claimed by this first implementation.
