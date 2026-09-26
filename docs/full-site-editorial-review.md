# Full-site editorial review

25 September 2026 · `design/editorial-homepages` · after `6fc8618`

## Scope and confidence

Reviewed the local branch served at `http://localhost:3104`. Sixty-two distinct public pages returned HTTP 200: the 30 listed Notebook entries, main collections, four programmes, four system dossiers, film collections and one screening page, archives, search, public machine instruments, demonstrations and publication information. The private observatory returned its intentional unauthenticated 404.

Read the corresponding layouts, shared navigation, typography, motion coordinator and transition code. Inspected the generated doorway and workshop image assets directly. The social PNGs were inspected in the preceding pass.

**This is a source, content and served-page review.** The browser connection reports no available browser. Desktop/mobile composition, computed contrast, keyboard operation, playback and the appearance of transitions remain unverified. Successful HTTP responses do not establish that those interactions work.

## Overall assessment

The new homepage and Notebook opening establish a quieter editorial identity. Several deeper pages still carry the older exhibition styling. Moving through the site therefore encounters two different approaches: restrained publication layouts and heavily announced research rooms.

The most persistent generic signals are identifiable: generated architectural scenes, repeated two-part rhetorical headings, conceptual diagrams standing in for actual software, and layers of navigation and record information surrounding the same material. The type families have been aligned; their scale and use have not yet been aligned everywhere.

## Confirmed corrections

### 1. Recovery is represented by the wrong graphic on Agent Ecology

`app/thread/agent-ecology/page.tsx` sends every entry to `EcologyCard`. That component handles written inheritance and the earlier handoff, then falls back to contribution/transmission/external memory. It has no recovery case. The sixth entry consequently presents “Clear the history. Keep the reminder.” beside the recovery article.

Use the existing evidence-backed recovery preview for `N-ECOLOGY-RECOVERY`. Keep 0/12 prose and 7/12 executable as a treatment comparison.

Sources: `components/EcologyCard.tsx:5`, `app/thread/agent-ecology/page.tsx:22`, `components/PublicationIndex.tsx`.

### 2. Ideas labels published notes as drafts

The `/ideas` list hardcodes `DRAFT` for every entry. Its introduction also calls the entire list open working records. The served page labels the published recovery note as a draft. This legacy collection remains reachable from About, so it is part of the reader's experience.

Derive publication labels from each record and revise the collection description. Preserve existing URLs while clarifying the relationship with Notebook and Research.

Source: `components/HouseCollections.tsx:15`.

## Page-by-page direction

| Area | Finding | Next change |
| --- | --- | --- |
| Home | Real film material leads, followed by a short introduction, two selected results and a useful contents structure. | Use this as the baseline for spacing and navigation. Verify its first screen and the selected-result offset in the browser before further composition changes. |
| Programmes | Thread headings still use `clamp(62px, 8.5vw, 128px)` while collection titles use 34–56px. Intros stack title, abstract, context and several routes before the work. | Bring entrances onto the common reading scale. Introduce each programme with one question and one selected object, then its reading order. |
| Machines programme | Field map, latest-result preview and eight-study sequence repeat several destinations. About 1,600 words sit outside closed disclosures across the page. | Give the field map and chronological sequence clear, separate purposes. Avoid presenting the same result repeatedly in successive sections. |
| Agent Ecology | The generated workshop introduces the programme; the final question still centres on the earlier routing/defender world despite the recovery follow-up being present. | Lead with an actual recorded artefact and make the concluding question reflect the current research boundary. Correct the recovery graphic. |
| Cell80 | Real replay and causal material give this programme a specific identity. Numbered rooms and repeated statement/summary devices add substantial narration. | Bring the replay forward; edit surrounding instructions and repeated interpretations. Retain load/play controls and the distinction between replay and simulation. |
| Learned systems | The map sequence has source film stills and working demonstrations, which are useful material. The surrounding thread layout remains on the old scale. | Preserve the films and instruments; simplify labels and unify the programme entrance. |
| Systems | The index has an actual LARQL clip, but VINDEX3 uses a conceptual tensor animation. Individual dossiers lead with propositions, draft metadata and generic record layouts. | Give each dossier an actual demonstration, source or specimen near the opening. Keep the documented scope alongside the object. |
| Notebook index | Compact masthead, selected lead, recent notes and programme sidebar provide a clear reading route. | Preserve this hierarchy. Visually check the sidebar's position after the note list on mobile. |
| Notebook articles | Recovery now has a shorter reading path. Other templates frequently repeat description, instruction, outcome and takeaway around one figure. | Edit the most repetitive passages individually. Retain outcome qualifications, methods and the complete manuscript. Word count alone is not a reason to remove useful prose. |
| Article endings | About the note, thread navigation, history, sources, related records, provenance, citation, sharing and following can accumulate before the global footer. | Make one next reading destination clear. Group optional record/export functions and avoid repeated invitations to follow. Keep sources easy to find. |
| Film | The screening component is a useful change of medium, with explicit play, stop and source access. Film collection pages retain more rhetorical headings and metadata. | Carry the same direct editorial treatment through the film index, channel and screening entrance. Review chapter seeking, stop/focus and return navigation in the browser. |
| About | A real studio portrait is present. Much of the writing explains the publication and repeats the system catalogue. | Put Chris and the work first, using factual existing material. Reduce the repeated explanation of what “ideas, systems and objects” means. |
| Archive, search and catalogue | These are useful lookup surfaces. Their plain structure serves that purpose. | Keep search and filters direct. Review phone widths and keyboard focus; elaborate entrance motion adds little here. |
| Header and footer | The homepage has its own header treatment. Thread URLs do not mark a primary section current. The footer combines reader destinations with numerous feeds and machine interfaces. | Establish one consistent header and location mapping. Group publication/technical links more quietly in the footer. |

## Imagery

`VisualStudy` explicitly uses AI-generated images: an amber-edged doorway, an empty workshop containing a glowing glass record, and repeated glass plates. They are disclosed correctly, but their aesthetic conflicts with the requested direction. The doorway leads Machines; the workshop leads Agent Ecology and appears again in *The AI left. Its knowledge didn't.*

My recommendation is to remove these atmosphere interludes from those journeys and compose with the existing experimental traces, source film stills and interactive objects. Do not replace every removed image with another illustration. Some passages can simply be text and space.

The exhibition essay also contains an ImageGen room image. It should be evaluated as material specific to that essay, rather than automatically reused as a site identity.

Sources: `components/VisualStudy.tsx`, `components/WorldRemembersNotebook.tsx`, `lib/media.ts`.

## Motion and transitions

The site already has substantial motion machinery. A shared HAUSE coordinator chooses an active object, respects pause/reduced-motion preferences, and suspends on hidden pages or an open menu. Individual exhibits use different replay, animation and control patterns.

Cross-page choreography is much narrower: the transition script permits home ↔ latest film and Notebook contents ↔ listed note. Other destinations skip that transition, and many links use client navigation. A complete exhibition journey has not been implemented across programmes, film collections and objects.

Extend continuity where it has a clear source and destination: a selected film still becoming the screening, or a selected experimental object becoming the article figure. Keep navigation immediate, preserve normal scrolling and history, and leave a readable static state when motion is disabled. Check existing controls and transitions before adding more animation.

Sources: `lib/page-transitions.ts`, `app/film-journey.css`, `app/notebook-journey.css`, `vendor/hause/components/Motion.tsx`.

## Suggested order

1. Correct the recovery preview and inaccurate publication labels.
2. Recompose programme entrances: consistent heading scale, real objects, shorter introductions.
3. Give system dossiers the same editorial attention as their index previews.
4. Edit repetitive article narration and simplify the shared ending.
5. Align header, film collections, About and footer.
6. Review the whole journey in a connected browser, at desktop and phone widths, before extending motion.

Application code was not changed during this review.

## Programme implementation follow-up

The subsequent programme pass implements the first two items above:

- All four programme entrances now use the publication's 34–56px heading scale, a short introduction and a selected piece of source material.
- Machines opens with the exact Recognition-2 descriptions and first-choice counts derived from its subject records. The field map is available in a disclosure; direct links to it and individual map questions open that disclosure.
- Agent Ecology opens with I12R's two arms, denominators and world flags from the evidence JSON. Its ending names the proposed mechanism-repair experiment and preserves its untested status.
- Cell80 opens with the existing recorded paired-world replay. Loading remains explicit. The replay is registered as manual-only with the shared motion coordinator, including pause, menu and visibility handling.
- Learned Systems opens with the existing residual-map source-film excerpt.
- Compact reading lists retain all 30 programme step anchors, plus Cell80's `further-notes` anchor. Their record identities, destinations, scientific descriptions and publication states remain derived from the existing thread data.
- Generated doorway/workshop images are removed from programme entrances. The two generated interludes are also removed from the related inheritance article.
- The reusable recovery preview now derives its values from evidence and labels the treatments separately; it has no before/after arrow. Both the homepage and any legacy EcologyCard recovery caller use it.
- Ideas derives publication status from each record. Programme pages mark Research as the current primary section.

Verification: Vite production build, TypeScript, 66 publication/recovery/Cell80 tests, and served HTML checks for all four programmes plus Ideas, the inheritance article, homepage and recovery article. Checked unique IDs, retained step anchors, research navigation, published recovery status, generated-interlude removal and visible recovery qualifiers. Targeted ESLint reported no errors and one existing canvas-expression warning in Cell80WorldReplay. Browser discovery still reports no available browser; replay controls, disclosure-link scrolling, responsive layout and animation timing require visual/interaction review.

The remaining system-dossier, shared article-ending, About and footer recommendations are separate work from this programme pass.
