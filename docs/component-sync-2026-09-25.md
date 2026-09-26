# Shared HAUSE publication components — 26 September 2026

Both hause.design and chrishayuk.com pin HAUSE source revision
`ee2095e01f937158be790d0c4458b629d5846866`. The design site installs the Git
package; Chris Hay vendors the same source inventory. `npm run check:hause`
verifies all 123 shared files and the exact revision. CI independently checks
out that upstream commit so changing a consumer and its checksum cannot hide drift.

## Notebook composition

`NotebookTemplate` composes the shared Codex with warm squared paper and a
responsive editorial layout. `NotebookNote` pairs an explanation with an authored
sketch. `NotebookFilm` mounts a consumer-owned player with its real source,
caption and timestamp. Playback stays with the existing player and motion system.

The paper grows to fit its figures, tables and captions. Fixed internal scrolling
is now an explicit `sizing="fixed"` option. Previous/Next and the spread label sit
on the paper's top edge, stay visible below the view selector, and return readers
to the beginning when turning from within a long spread. The page-turn layer
excludes the controls. Manuscript, history, reduced motion and print are supported.

All 30 current Chris Hay notebooks use the shared template with authored chapters.
Citation fragments and the complete manuscript remain present. Preserved editions
keep their original presentation. The recovery note has three small SVG apparatus
explanations. Film acts and local clips use shared notebook mounts in this context.

The HAUSE publication room demonstrates the notebook, marginal sketch, mounted
film and open-paper preview. Its API documentation and Ask corpus are regenerated from the same source.
The catalogue covers 37 forms and 88 capability records. Earlier evaluation inputs
and outcomes retain their recorded scope.

## Other shared publication surfaces

Codex, Manuscript, EditorialPlate, NotebookEdition, NotebookSupport, ReadingFigure,
FigureMotion, AnchoredDisclosure, citation helpers, legibility and revision
continuity belong to HAUSE. The design book consumes exhibition capabilities
directly rather than maintaining its former 35-form compatibility snapshot.
StagedTransition and TextCorrection have authored studies and selection grammar.

## Validation

The library's 17 tests, README inventory and TypeScript checks pass. Both consumer
source inventories match the revision above. Consumer suites, both production builds,
HAUSE generated-page coverage and the complete notebook/homepage HTTP audit pass
for this synchronized release. The notebook audit checks headings, unique IDs,
fragment destinations, manuscript text, citation anchors, page controls and content
sizing across current notes and preserved editions; it does not verify geometry.

Browser visual and interaction verification remains pending because no browser
connection was available in this session. Existing application-wide lint findings
outside the verified shared mirror are separate from these checks.

## Homepage publication selection

`NotebookPreview` also supplies the homepage’s open spread. Chris Hay selects the
newest current published notebook node from `recordGraph()` by its publication
date, with record ID as a stable same-day tie break. Drafts, unlisted records,
archived versions and undated records cannot take that slot; a revision date does
not promote an older publication. The displayed passage comes from the selected
record. Featured articles resolve editorial preferences against the same graph,
exclude the latest and fill remaining places from published entries.

Publishing a new record through the normal content/deployment workflow updates
the homepage without an edit to `app/page.tsx`. Future notebooks also have a
shared-template fallback, so they do not require a bespoke renderer. Four tests
cover publication transitions, exclusions, feature deduplication and real graph
record resolution. The browser appearance still needs visual verification.
