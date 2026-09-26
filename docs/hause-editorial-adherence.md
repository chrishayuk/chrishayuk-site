# HAUSE adherence of the editorial branch

Scope: `design/editorial-homepages`, compared with the local canonical HAUSE
checkout at `d8ff653`. These changes have not been deployed by this session.

## Verified integration

- The application imports HAUSE tokens, semantic forms, citation/structured-data
  helpers, film controls, evidence components and a shared MotionProvider.
- `Acts.tsx` maps supported acts to actual forms. Statuses outside HAUSE's
  vocabulary retain their exact domain labels instead of being relabelled.
- 84 vendored files are byte-identical to files in the current library checkout,
  including tokens and shared components. README and PUBLICATION documentation
  differ. SOURCE_REVISION records the original base, while contribution documents
  record later additions; it is not a claim of an untouched single revision.
- `legibility.ts` and `provenance.ts` are additional bundled publication helpers,
  explicitly documented as not yet released upstream. Their audits validate this
  consumer; they do not certify general HAUSE conformance.
- The publication legibility audit passes for 34 records. The provenance audit
  passes for 10 preserved versions, with advisories for externally referenced
  sources. This run did not perform the optional Git-base append-only check.

## Consumer treatment and correction

HAUSE's evidence component documentation explicitly permits consumer font choices
and editorial CSS. Its Study helpers distinguish site-owned composition and
research content from shared semantic forms. Custom publication layouts are
therefore compatible with consuming HAUSE.

The font change should still preserve three distinct roles: editorial, system and
evidence. The earlier branch flattened `.record-voice` into Archivo, including
dates and publication status. This audit restores Geist Mono for those records,
homepage metadata and collection status labels. Navigation remains Archivo and
editorial titles remain Newsreader. All three roles map to HAUSE font variables.

Light-first presentation and a publication-specific grid are authored consumer
choices, rather than the library's default presentation. Static reveal overrides
are documented in the original integration handoff to ensure visible no-JS content.

## Limits

The integration is substantive, but there is no universal conformance test here.
This audit does not establish every custom instrument's fallback, computed style,
contrast or keyboard behaviour. The new edition still needs rendered browser
inspection. Successful builds and record audits cannot substitute for that.
