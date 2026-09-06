# Search, source retrieval and measurement

Implementation audit: 6 September 2026.

## Shared HAUSE capabilities

- `publicationMetadata`: page titles, descriptions, canonical URLs, robots,
  Open Graph and X metadata. The site supplies facts, indexing policy and the
  default social image; films supply their own original posters.
- `JsonLd`, `webSiteLd`, `videoObjectLd`, `breadcrumbLd`, `citationLd`: structured
  website, film, breadcrumb and publication facts. Person, profile, catalogue
  and unpublished-draft records currently supply their local schema objects
  to HAUSE's shared JSON-LD renderer.
- `citationFormats`, `citationMeta`, `CitationExport`, `Citation`, `Provenance`:
  source citations and publication history. Local draft reference formatting
  remains site code because drafts are not published research.
- `Analytics`: Google tag loading, configured with a site-specific measurement
  ID. Chris Hay's layout uses this existing component with measurement ID
  `G-4CCGGE1T19`, configured in Fly as `GOOGLE_ANALYTICS_ID`. The correct tag
  was verified on the live homepage and catalogue; preview hosts exclude it. HAUSE's own site uses `G-35LSQK48G5`.

## Verified behaviour

Production checks exercise canonical host redirects, indexable public HTML,
noindex Fly previews, canonical collection and paginated catalogue URLs, social
images, robots/sitemap, graph membership, source search and corporate-author
citation exports. Publication tests retain unknown dates rather than replacing
film release dates with catalogue retrieval dates.

Server-rendered summaries, authors, stable URLs and source links are available
without playing film. The graph contains 241 films and two indexed automatic
transcripts. The other films are discoverable through available source metadata;
their complete spoken contents are not searchable. Eleven editorial drafts
remain outside published feeds. Their full text and semantic acts now enter
Ask with explicit draft labels and an exclusion filter, alongside 235 chapter
titles. The graph and search share the same corpus; chapter titles remain
distinct from actual transcript passages.

## Not established by this audit

A rendered Google tag does not prove receipt in GA4. Realtime/DebugView,
client-navigation page views and any custom events still need account/browser
verification. Google Search Console ownership, sitemap submission, actual
indexing and search performance are separate account-side checks.

HAUSE's homepage currently has no dedicated Open Graph image. Most HAUSE pages
have their own canonical URLs, but older pages still author metadata directly;
they are not yet all consumers of `publicationMetadata`.

Search-readable content and citations create eligibility; they do not guarantee
ranking or inclusion in generated answers. Google describes AI search visibility
as following the same foundational SEO requirements:
https://developers.google.com/search/docs/appearance/ai-features
