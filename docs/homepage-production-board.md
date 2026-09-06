> **Superseded homepage sequence — 6 September 2026.** The original 14-scene board below remains a shoot reference. The current homepage is edited around identity → latest YouTube → latest verified MoE appearance → latest notebook (the map) → selected films → further notes → selected work (LARQL, VINDEX3, MCP-CLI). Do not restore unsupplied-media scenes. Work uses an original film still and labelled static conceptual studies; copy flows naturally with no fixed-height title containers. Film navigation is direct, and the Film index presents Chris’s own channel before IBM appearances.

# CHRISHAYUK.COM — homepage production board

Version 0.2 · 05 September 2026 · Status: production specification, grounded in local HAUSE source

## Direction

**CHRISHAYUK is a film-and-photography publication whose underlying records contain unusually rigorous technical material.**

Visible identity: **CHRIS HAY**. Proposition: **BUILDING THINGS / TO FIND OUT / HOW THEY WORK.** The homepage establishes a person, a world and an evolving body of work. It is the opening sequence of a publication.

This board turns the supplied product specification into an implementation handoff. Copy is editorially provisional. Research conclusions, dates, record identifiers, film selections and affiliations must resolve to source records before publication. The examples N-0042 and E25 are brief references, not records verified by this board.

The site workspace contains no application or source media. HAUSE is available at `/Users/christopherhay/chris-source/hause-design/hause`. This board was reconciled with package `@chrishayuk/hause` 0.1.0 at clean commit `a93fb729c7d9ba02f7c1b2c369394526f9a3d158`. Its source provides TSX forms and a semantic manifest; it does not provide the brief’s generic `HauseComposition` runtime schema. The site must supply a validated semantic-record adapter to the actual forms.

See [HAUSE integration handoff](hause-integration-handoff.md) for exact source contracts and extensions. In the table, `Photograph*` and `PhotographicSequence*` are proposed exhibition-local semantic forms needed by this publication, not existing HAUSE exports. `Film†` is the existing form with required media and playback extensions. No generic `Sequence` or `Performance` component is assumed: performance is a HAUSE mode, and editorial ordering belongs to the site.

## The cut

Four movements: **person and place → questions and work → the world around the work → evidence and return to the person**.

| Scene | Primary idea | Dominant surface | HAUSE forms / declared extensions | Desktop height | Mobile height |
| --- | --- | --- | --- | --- | --- |
| 00 | Building to understand | Identity film | Hero + Film† | 100svh | 100svh |
| 01 | A person has made this work | Editorial portrait | Photograph* + Observation | 105svh | 120svh |
| 02 | Conversation is part of the work | Mixture of Experts film | Film† + Provenance / Citation on record | 110svh | 120svh |
| 03 | London, without explanation | Environmental photograph | Photograph* | 100svh | 100svh |
| 04 | An open research question | Notebook photograph | Photograph* + Question | 100svh | 110svh |
| 05 | The model as database | System film | Statement + Film†; Transformation for verified two-interpretation sequence | 100svh | 110svh |
| 06 | An authored film selection | Film contact sheet | PhotographicSequence* + Film† previews | 170svh | 210svh |
| 07 | Computation has a physical setting | Object photograph, then system film | Photograph* + Statement + Film† | 130svh | 150svh |
| 08 | A life around the work | Personal photographs | PhotographicSequence* | 160svh | 180svh |
| 09 | An unfinished thought has a record | Notebook photograph | Photograph* + Statement + Question + Citation | 100svh | 140svh |
| 10 | Meaning can change its presentation | Live semantic composition | Statement / Comparison / Evidence / Film† / Citation | 100svh | 120svh |
| 11 | Machines act through interfaces | Interaction film | Film† + Statement + Observation | 100svh | 110svh |
| 12 | Prediction and reproduction differ | Typographic finding | Evidence + Refusal + Citation | 110svh | 140svh |
| 13 | Return to Chris | Closing portrait film | Film† + Provenance / Citation; SiteFooter chrome | 100svh + footer | 110svh + footer |

Heights are art-direction targets, not fixed containers that clip copy. Every scene may grow with text zoom or translation. Total canvas is approximately 16 desktop / 18 mobile viewports plus footer. A deliberate visit can take 4–7 minutes through optional film watching, image inspection and record exploration. There is no minimum journey time and no forced dwell. Fast scrolling remains fast.

## Shared frame

Reference boards: desktop 1440 × 900; mobile 390 × 844. Review additionally at 320, 768, 1024 and 1920 CSS pixels, landscape mobile and 200% text zoom.

Desktop uses twelve columns, 48px outer margins and 24px gutters; images may bleed past them. Mobile uses four columns, 20px margins and 12px gutters. Switch a composition when its content no longer fits, with 768px as the initial art-direction breakpoint. Medium-width layouts must be explicitly checked.

Use HAUSE’s actual tokens: paper `--color-paper` (`#f2f0eb`), ink `--color-ink` (`#0b0b0b`), graphite `#292929`, mist/stone `#b8b6b1`, and signal `--color-accent` (`#b5651d`). The publication may add cinematic black `#000000` for film fields. Set scene-local `--bg` and `--fg` for the paper/ink sequence rather than inverting imagery. Signal is never the only indicator of status.

Use HAUSE’s three voices: Fraunces through `voice-editorial`, Inter through `voice-system`, Geist Mono through `voice-evidence`. Font loading belongs to the consumer; set `--font-fraunces`, `--font-inter` and `--font-geist-mono` on `<html>`. Initial sizes: display 80–144px desktop / 42–64px mobile; body 18px / 17px; metadata 12–14px. Fit long propositions by composition and wrapping, never by shrinking meaningful text to illegibility. Uppercase is for brief display statements and record labels, not long prose. The denser publication grid above is an explicit exhibition override of HAUSE’s default twelve-column grid; retain the semantic voices and spacing rhythm.

One persistent header:

```text
DESKTOP  CHRIS HAY           WORK  FILM  NOTEBOOK  RESEARCH  ABOUT
MOBILE   CHRIS HAY                                          MENU
```

Use readable contrast from the first frame. Quiet means small and restrained, not low opacity. Header surface follows the underlying scene; use a local opaque backing where image contrast is variable. Do not use unpredictable blend modes for essential text. Mobile menu is a labelled dialog with focus containment, Escape, background scroll lock and focus restoration. A skip link leads to the homepage story.

`ASK` appears only when the cited corpus interface exists in Release 3. Release 1 has no inactive Ask link. Images and threads may appear editorially in Release 1; their future index routes are not exposed early.

Native document scrolling throughout. No scroll hijacking, snap locks, forced horizontal journeys, delayed links or progress gates. Motion controls and navigation work immediately, including during the opening title reveal. Every heading and destination exists in server-rendered HTML.

## Scene 00 — Identity film

**One idea:** building things is how Chris investigates the world.

```text
DESKTOP                                  MOBILE
┌───────────────────────────────────┐    ┌───────────────────┐
│ CHRIS HAY                 NAV     │    │ CHRIS HAY    MENU │
│                                   │    │                   │
│       WALK / REFLECTION FILM      │    │ PORTRAIT EDIT     │
│                                   │    │                   │
│ BUILDING THINGS                   │    │ BUILDING THINGS   │
│ TO FIND OUT                       │    │ TO FIND OUT       │
│ HOW THEY WORK.                    │    │ HOW THEY WORK.    │
│ LONDON · 2026              PAUSE   │    │ LONDON      PAUSE │
└───────────────────────────────────┘    └───────────────────┘
```

**Provisional copy:** `CHRIS HAY`; `BUILDING THINGS / TO FIND OUT / HOW THEY WORK.`; `LONDON · 2026`.

**HAUSE intent:** `Film` establishes the person and place; `Hero` carries the proposition as the page’s single H1. It is an editorial proposition, not a research `Claim` requiring a status mark. A concise visible introduction immediately after the opening frame reads: “A film, photography and research record by Chris Hay. Intelligent systems, their representations, the interfaces around them, and the experiments that happen along the way.” Extend Hero’s editorial layout for this exhibition; the current component is a text section, not a media overlay.

**Media:** `hero-identity` — a 24-second owned film: 0–8s Chris walking; 8–16s train reflection; 16–24s hand opening a notebook. Long shots, no rapid terminal montage. Desktop 2:1 from a 16:9 master; mobile separately shot/edited 9:16. Both require Chris to be recognisable in the opening shot. A high-quality still from that shot is the first render.

**Timing:** name is visible at first paint; proposition receives a 400ms reveal beginning around 2s. Delay is a cosmetic enhancement only: no-JS, reduced-motion and save-data render the complete proposition immediately. If the visitor scrolls or interacts before 2s, complete the reveal immediately. No CTA occupies the opening surface.

**Transition / scroll:** natural scroll into a hard cut to paper. Never pin the opening frame. The film pauses on departure and resolves to its poster on failure; the text remains intact.

## Scene 01 — The person

**One idea:** this body of work belongs to a human being.

```text
DESKTOP                                  MOBILE
┌──────────────────────┬────────────┐    ┌───────────────────┐
│                      │ CHRIS HAY  │    │                   │
│ 4:5 PORTRAIT         │            │    │ 4:5 PORTRAIT      │
│ approx. 65% width    │ Research   │    │                   │
│                      │ Engineering│   ├───────────────────┤
│                      │ Film       │    │ CHRIS HAY         │
│                      │ Design     │    │ Research          │
│                      │            │    │ Engineering       │
│                      │ ABOUT      │    │ Film · Design     │
│                      │ LINKEDIN ↗ │    │ ABOUT  LINKEDIN ↗ │
└──────────────────────┴────────────┘    └───────────────────┘
```

**Copy:** `CHRIS HAY`; `Research / Engineering / Film / Design`; `ABOUT`; `LINKEDIN ↗`.

**HAUSE intent:** a sequence associating the author’s portrait with the four areas of practice. These labels describe practice, not formal qualifications. Link the person entity to the portrait’s creator and rights metadata.

**Media:** `portrait-editorial` — owned or commissioned environmental portrait, 4:5, direct gaze, natural light; separate mobile framing if the portrait cannot retain the intended negative space. Preserve the photograph’s ratio and extend the paper around it.

**Actions:** `/about`; LinkedIn URL supplied by the verified person record. Never guess the profile URL.

**Transition / scroll:** still, no parallax or face zoom. After paper, cut to cinematic black. The biography lives on About.

## Scene 02 — Mixture of Experts

**One idea:** conversation and public explanation are film properties of the publication.

```text
DESKTOP                                  MOBILE
┌───────────────────────────────────┐    ┌───────────────────┐
│ FILM / IBM                        │    │ FILM / IBM        │
│                                   │    │ APPROVED VERTICAL│
│        FEATURED EPISODE FRAME     │    │ FRAME / STILL     │
│ MIXTURE                           │    │ MIXTURE           │
│ OF EXPERTS                        │    │ OF EXPERTS        │
│ WATCH FILM →              PAUSE   │    │ WATCH FILM →      │
├───────────────────────────────────┤    ├───────────────────┤
│ Episode title · IBM · attribution │    │ Title · IBM       │
└───────────────────────────────────┘    └───────────────────┘
```

**Copy:** `FILM / IBM`; `MIXTURE / OF EXPERTS`; `WATCH FILM →`; selected episode title from its record. Do not publish the illustrative date, duration or episode in the brief without verification.

**HAUSE intent:** performance with source citation. The associated film record distinguishes producer, publisher and participant; appearing in a film does not make Chris its owner.

**Media:** `moe-feature` — one selected episode, 8–10-second muted excerpt only if reuse permits; desktop 16:9, approved mobile 9:16 selection. Otherwise use an approved poster/still. Where only an embed or external link is permitted, publish that treatment without copying footage. A desktop frame must not be silently centre-cropped into mobile footage.

**Actions:** `WATCH FILM →` opens `/film/{verified-slug}` with the original player/link. No iframe or third-party player loads on the homepage. The footer credit links to the original source. Additional portrait shorts move to Scene 06 and the collection page so the featured film remains singular.

**Transition / scroll:** natural scroll; hard cut to the London still. Poster fallback is an intended composition. The three-film minimum must still be met with owned hero, MCP and closing films if this stays static.

## Scene 03 — An image with no agenda

**One idea:** place.

```text
DESKTOP                                  MOBILE
┌───────────────────────────────────┐    ┌───────────────────┐
│                                   │    │                   │
│       LONDON PHOTOGRAPH           │    │ LONDON            │
│                                   │    │ VERTICAL FRAME    │
│                                   │    │                   │
│ London · [capture date]           │    │ London · [date]   │
└───────────────────────────────────┘    └───────────────────┘
```

**Copy:** `LONDON · {actual capture date}`. The date in the brief is not an instruction to fabricate a capture date. If unknown, show only the location.

**HAUSE intent:** the proposed `Photograph` form holds the photograph and its caption. It is a still observation, not an existing HAUSE performance. Do not force the image into an evidence act or imply a research conclusion.

**Media:** `london-night` — owned atmosphere photograph, desktop 3:2 source with approved wide crop, mobile separately composed 3:4. Wet pavement, ordinary street light, a quiet window or a railway platform. Location metadata stays broad.

**Actions:** none in Release 1; descriptive alt text and a normal figure caption. No decorative “explore” affordance without a destination.

**Transition / scroll:** no motion. The next frame is the close texture of a notebook. Keep the environmental image free of project overlays.

## Scene 04 — Current research

**One idea:** an open question, before its explanation.

```text
DESKTOP                                  MOBILE
┌───────────────────────────────────┐    ┌───────────────────┐
│       NOTEBOOK MACRO              │    │ NOTEBOOK MACRO    │
│                                   │    │                   │
│ CURRENT QUESTION / FFN            │    │ CURRENT QUESTION  │
│ WHAT IF THE FFN                   │    │ WHAT IF THE FFN   │
│ IS A GRAPH?                       │    │ IS A GRAPH?       │
│ FOLLOW THE THREAD →               │    │ FOLLOW THE THREAD→│
└───────────────────────────────────┘    └───────────────────┘
```

**Copy:** `CURRENT QUESTION / FFN`; `WHAT IF THE FFN / IS A GRAPH?`; `FOLLOW THE THREAD →`.

**HAUSE intent:** question; status `OPEN` only if the source record remains open. Do not present the question as an established result.

**Media:** `ffn-notebook` — an actual page belonging to this line of thought. Wide macro and separately framed portrait detail; preserve paper edges and handwriting. Supply a transcription of meaningful writing, reviewed against the source page. Never generate handwriting and pass it off as Chris’s research.

**Actions:** Release 1 `/research/ffn-as-graph#thread`, a real question page with a chronological section. Release 2 may add a standalone thread route while retaining this working link.

**Transition / scroll:** no simulated diagram tracing over the photograph. Hard cut from paper to a dark system field in Scene 05. Text may sit on an opaque paper margin if the image cannot support contrast.

## Scene 05 — VINDEX3

**One idea:** the model can be approached as a database.

```text
DESKTOP                                  MOBILE
┌───────────────────────────────────┐    ┌───────────────────┐
│ WORK / VINDEX3                    │    │ WORK / VINDEX3    │
│   TENSOR → CONTAINER → EXECUTION  │    │ TENSOR            │
│                                   │    │   ↓ CONTAINER     │
│ THE MODEL                         │    │   ↓ EXECUTION     │
│ IS THE DATABASE.                  │    │ THE MODEL IS      │
│ VINDEX3.ORG ↗   VIEW THE WORK →    │    │ THE DATABASE.     │
│                           PAUSE   │    │ TWO TEXT LINKS    │
└───────────────────────────────────┘    └───────────────────┘
```

**Copy:** `WORK / VINDEX3`; `THE MODEL / IS THE DATABASE.`; `VINDEX3.ORG ↗`; `VIEW THE WORK →`.

**HAUSE intent:** `Statement` carries the project’s proposition, followed by `Film` explaining its mechanism. HAUSE’s `Transformation` can additionally express one model’s two interpretations, if the source content meets that specific contract. It is not a generic three-stage animation. Use `Claim` only for a separately sourced assertion with an explicit supported status vocabulary.

**Media:** `vindex-system` — 12-second technical film, 2:1 desktop and a separately laid out 9:16 mobile version. Three beats: representation, addressable contents, execution. Exact labels and transitions come from verified project examples. Use a real trace or a clearly identified schematic; do not invent measured data. The accompanying static SVG renders all three states with a prose explanation.

**Actions:** `https://vindex3.org/` after destination verification; `/work/vindex3`. The dossier explains the proposition and links software and evidence. Links are separate in DOM and visually distinguish their destinations.

**Transition / scroll:** one complete mechanism plays on entry, then holds its final state; replay and pause controls available. No animation tied to scroll distance. Cut to a paper film contact sheet.

## Scene 06 — Film contact sheet

**One idea:** a curated body of films is available to enter.

```text
DESKTOP                                  MOBILE
┌───────────────────────────────────┐    ┌───────────────────┐
│ WATCH                             │    │ WATCH             │
│ ┌───────────────────────────────┐ │    │ FEATURE FILM 16:9 │
│ │ FEATURE FILM 16:9             │ │    │                   │
│ └───────────────────────────────┘ │    │  PORTRAIT 3:4     │
│   PORTRAIT 3:4    LANDSCAPE 16:9   │    │                   │
│                                   │    │ LANDSCAPE 16:9    │
│          LANDSCAPE 2.39:1          │    │                   │
│ VIEW ALL FILMS       YOUTUBE ↗    │    │ WIDE FRAME        │
└───────────────────────────────────┘    │ ALL FILMS YOUTUBE │
                                         └───────────────────┘
```

**Copy:** `WATCH`; titles from four selected film records; `VIEW ALL FILMS`; `YOUTUBE ↗`.

**HAUSE intent:** an editorial sequence of performances, each linked to its record. Selection order is authored; no automatic “latest four” or repeated same-size tiles.

**Media:** `watch-feature`, `watch-portrait`, `watch-landscape`, `watch-wide`. Source-authorised stills in the shown ratios. Feature may be YouTube; remaining selection should vary format and subject, including a talk or interview where available. Cropping approvals apply to stills too. Portrait framing is chosen only when it preserves the speaker and intended image.

**Interaction:** title is always available to assistive technology and visible on touch devices. On fine-pointer hover, or keyboard focus, reveal title/year/source; a separate Preview control offers the same information and playback without hover. A permitted muted preview begins after 300ms sustained hover. Only the target plays; leaving resets to the poster. Film playback in this scene preempts ambient motion elsewhere. Touch tap follows the film link directly, without a first-tap hover trap. Metadata never contains the only accessible link name.

**Actions:** each frame `/film/{verified-slug}`; `/film`; verified YouTube URL from the person record.

**Transition / scroll:** use normal vertical sequence on mobile, preserving deliberate indents and varied widths. No swipe-only carousel or horizontal overflow. Cut to a physical object in Scene 07.

## Scene 07 — LARQL

**One idea:** the model is something to enter and query.

```text
DESKTOP                                  MOBILE
┌───────────────────────────────────┐    ┌───────────────────┐
│ WORK / LARQL                      │    │ SSD / HAND 4:5    │
│ SSD / HAND / DESK                 │    │                   │
│                                   │    │ WORK / LARQL      │
│ MODELS ARE PLACES                 │    │ MODELS ARE PLACES │
│ YOU CAN GO.                       │    │ YOU CAN GO.       │
│ VIEW THE WORK →                   │    │ VIEW THE WORK →   │
├───────────────────────────────────┤    ├───────────────────┤
│ ACTUAL QUERY → TRAVERSAL → RESULT │    │ QUERY → RESULT    │
└───────────────────────────────────┘    └───────────────────┘
```

**Copy:** `WORK / LARQL`; `MODELS ARE PLACES / YOU CAN GO.`; “Querying learned systems.”; `VIEW THE WORK →`.

**HAUSE intent:** an implied question about access to a learned system, followed by a mechanism sequence. Keep the physical object and the computational trace associated with the work record.

**Media:** `larql-object` — owned SSD/laptop/hand photograph, 3:2 desktop and 4:5 mobile; `larql-traversal` — 10-second technical film using an actual reproducible query and its result. No fake command text, timings or memory graph. Annotate the trace in readable type; the dossier contains full commands and context. Supply a static three-stage explanation.

**Actions:** `/work/larql`; the dossier carries canonical software links.

**Transition / scroll:** object and mechanism are two natural vertical beats. The photo does not morph into abstract particles. Play the mechanism once when dominant; pause and replay are available. Cut to personal photography.

## Scene 08 — Personal photography

**One idea:** there is a world around the work.

```text
DESKTOP                                  MOBILE
┌───────────────────────────────────┐    ┌───────────────────┐
│ ARCHITECTURE 3:4                  │    │ ARCHITECTURE 3:4  │
│                     BOOKS 4:5    │    │                   │
│                                   │    │       BOOKS 4:5   │
│       JOURNEY / WINDOW 16:9       │    │                   │
│                                   │    │ JOURNEY 16:9      │
└───────────────────────────────────┘    └───────────────────┘
```

**Copy:** only genuine location/date captions where useful. No productivity lesson and no heading overlay.

**HAUSE intent:** sequence of photographic performances. Internal accessible section label: “Personal photographs”. Photographs are content, with appropriate alt text; the label does not require an added visual headline.

**Media:** `personal-architecture`, `personal-books`, `personal-journey`. Three owned images chosen for personal significance and visual relationship. Show varied scales: first about 40% desktop width, second 28% offset to the right, final 70% centred. Mobile sizes roughly 80%, 60%, 100%; preserve useful image detail. All remain still.

**Actions:** no links until individual image records are public in Release 2. Preserve media identifiers now so later links do not require rebuilding the sequence.

**Transition / scroll:** native scroll with generous but finite paper intervals. End with paper texture leading into the notebook image.

## Scene 09 — Notebook

**One idea:** an unfinished thought can be attributable and citeable.

```text
DESKTOP                                  MOBILE
┌────────────────────┬──────────────┐    ┌───────────────────┐
│                    │ N-0042       │    │ NOTEBOOK 4:5      │
│ ACTUAL PAGE 4:5    │ DATE         │    │                   │
│                    │ THE OPERATOR │    ├───────────────────┤
│                    │ KNOWS…       │    │ N-0042 · DATE     │
│                    │              │    │ THE OPERATOR      │
│                    │ IT DOESN’T…  │    │ KNOWS…            │
│                    │              │    │ IT DOESN’T…       │
│                    │ READ →  CITE │    │ READ →  CITE      │
└────────────────────┴──────────────┘    └───────────────────┘
```

**Copy from the brief, awaiting source:** `N-0042`; `05 SEPTEMBER 2026`; `THE OPERATOR KNOWS / WHERE THE MODEL GOES. / IT DOESN’T KNOW / WHAT THE MODEL DOES.`; `READ →`; `CITE`; `THOUGHT → EXPERIMENT → FINDING`.

**HAUSE intent:** claim within an open notebook question, followed by citation. The progression label represents possible development; do not imply an experiment or finding exists unless it is linked. If the entry remains a thought, use `THOUGHT · OPEN` until the actual chain exists.

**Media:** `operator-notebook` — photograph of the relevant original page, distinct from Scene 04, with an accurate transcription. Desktop image occupies about 60% width; mobile shows the page first and the text below.

**Actions:** `/notebook/n-0042` only once that record exists. `CITE` is a normal link to its citation section, progressively enhanced into an accessible dialog with Plain, APA, BibTeX and CSL-JSON. Copy actions announce success; formats also remain selectable/downloadable without clipboard access. Cite the published version, not an unpublished draft.

**Transition / scroll:** still composition, no handwriting animation. Paper continues into HAUSE. At large text sizes, allow the copy column to become a full-width block.

## Scene 10 — HAUSE

**One idea:** this publication’s semantic content can take different forms.

```text
DESKTOP                                  MOBILE
┌───────────────────────────────────┐    ┌───────────────────┐
│       LIVE COMPOSITION            │    │ LIVE COMPOSITION  │
│                                   │    │ ONE FORM AT A TIME│
│ Statement → Comparison → Evidence │    │                   │
│           → Film → Citation       │    │ Named controls    │
│                                   │    │                   │
│ THIS SITE IS COMPOSED WITH HAUSE.  │    │ COMPOSED WITH     │
│ EXPLORE HAUSE.DESIGN ↗             │    │ HAUSE.            │
└───────────────────────────────────┘    └───────────────────┘
```

**Copy:** `THIS SITE IS COMPOSED WITH HAUSE.`; `EXPLORE HAUSE.DESIGN ↗`. This statement ships only when the actual HAUSE integration is present.

**HAUSE intent:** an exhibition-authored sequence containing actual `Statement`, `Comparison`, `Evidence`, `Film` and `Citation` forms. Use an actual sourced record and its relationships; never manufacture evidence to fill a visual state. `Comparison` specifically presents the same underlying pieces under two interpretations with a range control; it cannot receive arbitrary before/after prose. If the selected record lacks this comparison or a sourced film, select another real record rather than inventing its contents. Form changes use staged swaps, not crossfades between physical forms.

**Media/rendering:** `hause-composition-reference` is a required static reference export of the composition. The primary surface is a live renderer, not a video of the HAUSE website. Each form has its own hierarchy; the citation form exposes the actual version and canonical destination. Semantic content stays readable in the document.

**Interaction:** a restrained demonstration advances once through five forms over about 15 seconds when dominant. Pause is available. Named buttons allow direct selection and do not steal focus. Manual selection stops automatic advancement. Auto-advancing content is not an ARIA live region. Reduced-motion/no-JS uses a compact vertical sequence of the same content, all forms available without animation.

**Actions:** `https://hause.design/` after destination verification; contextual source-record links.

**Transition / scroll:** the live composition obeys the shared motion coordinator, including its nested Film; the form sequence pauses while a selected film plays. Never pin it while the user scrolls. Cut to interaction film in Scene 11. The adapter and playback extension are new work against HAUSE’s existing TSX API; no generic composition renderer currently exists in the package.

## Scene 11 — MCP / agent systems

**One idea:** tools let machines act through other machines.

```text
DESKTOP                                  MOBILE
┌───────────────────────────────────┐    ┌───────────────────┐
│ SYSTEM / MCP                      │    │ SYSTEM / MCP      │
│                                   │    │ HAND / INTERFACE  │
│ HAND → TOOL ACTION → RESPONSE     │    │ FILM              │
│                                   │    │                   │
│ MACHINES                          │    │ MACHINES          │
│ USING MACHINES.                   │    │ USING MACHINES.   │
│ MCP-CLI →          CHUK →         │    │ MCP-CLI → CHUK →  │
└───────────────────────────────────┘    └───────────────────┘
```

**Copy:** `SYSTEM / MCP`; `MACHINES / USING MACHINES.`; `MCP-CLI`; `CHUK`; “Tool infrastructure.”

**HAUSE intent:** performance, then a short sequence identifying the tool, action and visible result. Any mechanism explanation derives from the captured operation.

**Media:** `mcp-interaction` — owned 10-second film of a real interaction: hand starts an action, tool invocation appears, a visible result follows. Desktop 16:9; independently edited mobile 9:16. Film a prepared demo environment with publishable information. Screen text is not the only explanation of the operation; give it a short text alternative.

**Actions:** `/work/mcp-cli`; `/work/mcp-cli#chuk` as a Release 1 contextual section until CHUK has its own dossier.

**Transition / scroll:** play once on entry, then hold; pause/replay available. Hard cut from the film to the finding. This supplies a third owned film moment independent of IBM reuse permission.

## Scene 12 — Latest finding

**One idea:** a successful prediction does not establish a reproduced mechanism.

```text
DESKTOP                                  MOBILE
┌───────────────────────────────────┐    ┌───────────────────┐
│ FINDING / E25                     │    │ FINDING / E25     │
│ SUPPORTED                         │    │ SUPPORTED         │
│ NATURAL DEPTH TRAJECTORIES         │    │ NATURAL DEPTH…    │
│ ARE HIGHLY PREDICTABLE.            │    │                   │
├───────────────────────────────────┤    ├───────────────────┤
│ NOT SUPPORTED                     │    │ NOT SUPPORTED     │
│ THE SAME OPERATOR DOES NOT         │    │ THE SAME OPERATOR │
│ REPRODUCE BLOCK RESPONSE.          │    │ DOES NOT…         │
│ READ THE EXPERIMENT →        CITE │    │ READ →  CITE      │
└───────────────────────────────────┘    └───────────────────┘
```

**Provisional copy:** the supported / not-supported pair in the supplied brief. The final text must identify the experiment’s model, scope and metric closely enough to avoid turning a bounded finding into a universal claim. Keep that context in a short visible sentence and the linked record.

**HAUSE intent:** paired `Evidence` and `Refusal` forms with separate claim-level statuses and citations. This editorial comparison is not the unrelated `Comparison` slider component. The supported result occupies paper with a solid rule and supporting reference; the not-supported proposition occupies ink with a clearly labelled boundary and its own reference. `Refusal` declines to assert reproduction; its red rule does not by itself classify a proposition as `REFUTED`. Meaning survives monochrome and colour removal. `NOT SUPPORTED` remains an exact domain label because HAUSE’s current `Status` type does not include it; see the adapter rules in the integration handoff.

**Semantic correction for publication:** `NOT SUPPORTED` labels the proposition “the same operator reproduces block response.” The sentence “the same operator does not reproduce block response” is an observation/interpretation with its own evidential status. Do not attach a negative status to a negative statement and invert the intended meaning. The final composition may show `NOT SUPPORTED / REPRODUCING BLOCK RESPONSE` with the explanation below. Reserve `REFUTED` for a source record that justifies that stronger status.

**Media:** none; this is the intentionally typographic scientific page. Research data and reproducible outputs must be present in the linked experiment, not implied by typography.

**Actions:** `/research/exp-2026-025` only once the alias E25 and canonical ID resolve to a real record; citation link targets the exact published version. If the cited material is not ready, replace this scene with another verified finding, retaining the evidence/refusal pairing only when both are justified.

**Transition / scroll:** no reveal that hides the refusal until a timed animation ends. Both outcomes are readable in normal document order. Cut to the final portrait film.

## Scene 13 — Closing film and archive

**One idea:** return from the work to the person.

```text
DESKTOP                                  MOBILE
┌───────────────────────────────────┐    ┌───────────────────┐
│          ALMOST-STILL PORTRAIT    │    │ PORTRAIT FILM     │
│                                   │    │ 9:16              │
│ CHRIS HAY                         │    │ CHRIS HAY         │
│ LONDON                            │    │ LONDON            │
│ YOUTUBE  LINKEDIN  GITHUB  IBM     │    │ SOCIAL TEXT LINKS │
├───────────────────────────────────┤    ├───────────────────┤
│ ARCHIVE / FEEDS / COLOPHON         │    │ ARCHIVE / FEEDS   │
│ RIGHTS / ACCESSIBILITY / VERSION  │    │ RIGHTS / VERSION  │
└───────────────────────────────────┘    └───────────────────┘
```

**Copy:** `CHRIS HAY`; `LONDON`; `YOUTUBE / LINKEDIN / GITHUB / IBM`.

**HAUSE intent:** portrait performance, then citation identifying author, publication and external identities. Separate the author’s own work from third-party productions in credits.

**Media:** `closing-portrait` — owned 10-second portrait film, subtle movement, seated or standing, a distinct setup from Scene 00. Desktop 16:9 with Chris placed deliberately in the landscape; separate 9:16 mobile take. Poster must work as a complete portrait.

**Actions:** verified external profiles, release-ready archive indexes, `/rss.xml`, `/feed.json`, `/sitemap.xml`, `/colophon`, `/accessibility`, and rights information. Every footer destination must exist before being displayed. A simple rights section on the colophon is sufficient for Release 1.

**Transition / scroll:** play once and hold; the footer follows in document flow, never as tiny type over a moving face. End without a sales CTA. Include publication version and revision history link; avoid implying the homepage revision is the version of every linked record.

## Media production handoff

The companion [production manifest](../content/homepage-media.production.json) lists required assets by stable production ID. Every entry is `required` or `source-selection-required`; none implies a file already exists. Proposed filenames are delivery targets. Public media IDs should be assigned at ingestion and remain independent of replaceable filenames.

**Motion delivery convention:** `{stem}-desktop-v01.webm`, `{stem}-desktop-v01.mp4`, `{stem}-mobile-v01.webm`, `{stem}-mobile-v01.mp4`; corresponding `{stem}-{desktop|mobile}-poster-v01.{avif,webp,jpg}`. Prefer AV1 where supported and encoding quality is acceptable, with H.264 fallback. WebM is a container, not a guarantee of AV1 encoding. Keep a high-quality archival master outside the public asset directory.

**Still delivery convention:** `{stem}-{desktop|mobile}-w{width}-v01.{avif,webp,jpg}` at appropriate 480/768/1200/1600/2400 widths, never upscaled. Export only useful dimensions for each composition. Approved art-directed sources take precedence over an automatic crop. Preserve the uncropped original outside the public delivery tree.

**Technical fallback:** `{stem}-static-v01.svg` plus a plain-language description of the mechanism and source reference. If SVG is unsuitable, use responsive raster diagrams with the same text content. A system film is tracked separately from photography in the area budget.

Every ingested asset needs creator, source, capture date if known, publication date, rights and permitted uses, alt text, caption, aspect ratio, focal region, subjects, related records, original reference and derivative metadata. Rights must distinguish original linking, embedding, still reuse, editing/cropping and excerpt reuse. A missing capture date is nullable; never substitute publication date without labelling it.

Shoot coverage follows the brief: 2 hero/portrait edits; 8–12 portraits; 20 work/details photographs; 10–15 notebook macros; 10 London images; 10–15 object details; 10 ambient loops. The homepage selects from this library; it does not use the full shoot. Record wide and portrait footage as separate compositions while on location.

## Motion, loading and static behaviour

One page-level coordinator owns **all** motion: hero/ambient video, contact-sheet previews, system films and the HAUSE demonstration. A request to play never bypasses it.

1. First render is server HTML, reserved image dimensions, text, header and hero poster. Only the hero poster receives high fetch priority.
2. Load hero motion after the poster has painted and initial interaction is ready. Keep the poster until the video has a decoded frame; failed or blocked autoplay leaves the poster and a Play control.
3. Attach below-fold video sources only when within approximately one viewport and eligible to play. Do not download each film merely because its wrapper is observed. Image lazy loading remains independent.
4. Choose at most one eligible motion owner by visible media area, with hysteresis to prevent toggling at scene boundaries. Require meaningful visibility (initial tuning: 50%). Stop the previous owner before starting the next. The same rule applies during a partial overlap of two scenes.
5. Explicit preview interaction has priority while visible. User pause disables automatic playback for the page session until explicitly resumed; provide one discoverable `Pause motion` / `Resume motion` control and local controls on films. A manual replay plays only the selected source.
6. Pause on document hide, route changes, menu/dialog entry and leaving the relevant viewport. Release media resources when well outside the active region. Never resume motion after a deliberate pause simply because the user scrolls.
7. Reduced-motion starts with stills and the static system sequences. A user may explicitly play a chosen film. Save-data where detectable also starts with stills; provide a manual still-only preference because browser data-preference detection is incomplete.
8. Muted ambient playback always stays muted. Sound is a deliberate action on a film page. No-JS visitors get posters, complete copy, functioning links, transcripts and citation sections.

Pause and play are keyboard-operable labelled buttons, at least 44 × 44 CSS pixels as a design target. Focus is visible against every surface. Ambient loops have descriptive text equivalents; editorial film pages have captions and transcripts where authorised, or a clearly attributed synopsis and original source where transcript rights are unavailable.

## Proposed performance budgets

These are acceptance targets for the future build, not measurements of a site that exists today.

| Resource / result | Mobile target | Desktop target |
| --- | --- | --- |
| Initial transfer before video | ≤700KB | ≤1MB |
| Compressed initial JavaScript | ≤150KB | ≤150KB |
| Hero poster | ≤220KB | ≤400KB |
| Identity film delivery | ≤3MB | ≤6MB |
| Other individual motion derivative | ≤2.5MB | ≤5MB |
| Full homepage traversal, default motion, cache cold | ≤25MB | ≤45MB |
| LCP / INP / CLS | ≤2.5s / ≤200ms / ≤0.1 | Same |

Encode to content quality as well as byte limits. Exceeding a budget triggers a shorter edit, lower appropriate resolution or a still-first explicit Play treatment, not unreadable footage. Optional full editorial films load on their own pages and are measured separately. No third-party embed, player library or complete media catalogue in the opening request path.

Use responsive `picture` sources for independent mobile compositions and `srcset` within each. Reserve intrinsic dimensions. Verify the browser fetches only the chosen film derivative; hiding duplicate desktop/mobile video elements in CSS is insufficient. Font loading must preserve readable fallback text and stable layout.

## Record and HAUSE contract

The CMS stores intent and relationships; the editorial renderer owns composition. The production board is a layout specification, not a proposed `BigImageWithText` CMS field.

Integration sequence:

1. Consume the inspected HAUSE package at a pinned revision; use its manifest, TSX prop types, typography and tokens. Implement the site-owned semantic record schema and adapter, which the package does not supply.
2. Map every act in the cut table to its real form or declared exhibition extension. Validate existing-form props with HAUSE’s TypeScript types and validate the site record schema at ingestion. Photography and coordinated Film playback require the concrete extensions in the integration handoff.
3. Represent each scene as semantic content referencing real records and media IDs. Keep breakpoint art direction, text position and crop decisions in the renderer/media derivatives.
4. Render the substantive text, links, figure captions and relationships on the server. JavaScript enhances motion and composition; it does not become the only record of the page’s meaning.
5. Demonstrate a real record rendering in at least two HAUSE forms, and a versioned citation resolving to its source. Scene 10 then truthfully states how the site was composed.

The header identity resolves to a Person record. Work, films, notebook entries and research records retain their own canonical URLs, creators, publication states and versions. Film source rights and research claim statuses are separate concepts and must not share one overloaded field.

For substantive publication, derive abstracts, citations, social metadata and structured data from the same record revision. Plain/APA/BibTeX/CSL-JSON must agree on author, title, identifier, date, version and canonical URL. Archive material revisions at permanent version URLs, keep aliases stable, and show superseded/successor relationships without erasing the older record. Compute content hashes from a documented deterministic representation; store the algorithm and source revision. Never invent a commit when none exists.

The homepage is a curated sequence with its own version. It links to the research record’s evidence; it is not a replacement for that record. Machine text must match what visitors can read. Do not add invisible promotional abstracts for crawlers. The concise opening introduction and record summaries supply the early semantic meaning without an essay over the film.

Release 1 includes structured data appropriate to each real entity, sitemap, RSS, JSON Feed and robots policy. Public record and citation endpoints can be added against the same published-record store; unpublished drafts must not appear in feeds, APIs or metadata. `/ask`, standalone images/concepts/threads and advanced corpus querying remain later releases.

## Visual area budget

Photography/filmed footage and system visuals have separate accounting. Rendered tensors, blank space and typography do not count as photography. A film poster counts as a photographic surface when it is a photographic frame. Do not depend on autoplay to pass the visual criterion.

The following planning estimates use each scene’s target height multiplied by its photographic/filmed surface fraction. This diagnostic includes negative space in the denominator. The actual acceptance metric follows the brief: photograph/filmed area divided by meaningful visual area, excluding blank negative space. Both values must be reported separately. These are layout estimates to be replaced by measured screenshots.

| Scene | Desktop photo/film fraction | Mobile photo/film fraction |
| --- | --- | --- |
| 00 | 100% | 100% |
| 01 | 65% | 75% |
| 02 | 90% | 85% |
| 03 | 100% | 100% |
| 04 | 90% | 85% |
| 05 | 0% — system visual | 0% — system visual |
| 06 | 80% | 80% |
| 07 | 65% | 65% |
| 08 | 75% | 75% |
| 09 | 60% | 55% |
| 10 | 0% — live composition | 0% — live composition |
| 11 | 90% | 90% |
| 12 | 0% — typography | 0% — typography |
| 13 | 100% before footer | 100% before footer |

Height-weighted full-canvas estimates: **66.1% desktop / 64.4% mobile**, excluding the archival footer and before subtracting text overlays. These are not acceptance results: the meaningful-area denominator, final overlays and footer still need to be measured. In review, capture the entire homepage including the footer, mask only blank negative space, subtract text/control overlays from photographic surfaces, and require **65–80% photography or filmed footage among meaningful surfaces** at both reference widths. Report the raw full-canvas percentage too. If the measured ratio falls below 65%, increase the real portrait/notebook/film framing or shorten explanatory copy; do not relabel system graphics as photography or add meaningless images. Mobile photograph height must be protected when the text stacks beneath it.

Photographic sequences: 01 portrait, 03 London, 04 notebook, 06 film stills, 07 objects, 08 personal images, 09 notebook. Owned filmed moments: 00, 11, 13; 02 is additional if licensed. Chris appears in 00, 01 and 13. Non-work environmental moments appear in 03 and 08. System explanations appear in 05 and 07. Scene 10 is an additional live semantic demonstration.

## Build and editorial acceptance

| Check | Review procedure | Pass condition |
| --- | --- | --- |
| Publication identity | Review screenshots with the name removed | Photography, film and editorial pacing remain dominant; no project card grid, SaaS hero or technology-logo strip |
| Area | Measure full-page screenshots at 1440 and 390 widths, including footer | 65–80% photo/film among meaningful surfaces; exclude only blank negative space; separately report full-canvas and system-visual ratios |
| Scene rhythm | Review every scene and adjacent boundary | One primary idea per viewport; never more than two consecutive text-dominant screens |
| Film moments | Use the actual final media manifest | Three substantial playable moments even if IBM footage cannot be reused |
| Person / place | Inspect the final edit | Chris in at least two scenes; two distinct non-work environmental moments |
| Media authenticity | Resolve asset IDs to originals and permissions | No stock or synthetic substitute for Chris, his notebooks or his personal record; all crops/excerpts permitted |
| Research honesty | Resolve every displayed claim to a record/version | Scope, status and citation agree; unsupported and refuted remain distinct; no illustrative dates or IDs ship as facts |
| HAUSE | Type-check adapters against the real package and validate site records | Every scene maps to actual forms or documented exhibition extensions; source/version documented |
| One motion owner | Rapid scroll, hover adjacent previews, open menu, switch tabs | At most one video/animation runs; explicit pause persists; no unexpected sound |
| Static story | Disable JS/video; enable reduced motion and still-only mode | Full proposition, figures, mechanisms, records and navigation remain understandable and usable |
| Mobile edit | Compare chosen sources and network requests | Separate intentional compositions; only the selected derivative downloads; no horizontal overflow |
| Input and reading | Keyboard, screen reader, 200% text zoom, 320px width | Logical reading/focus order, visible focus, labelled controls, no clipped copy or hover-only access |
| Contrast | Inspect text over every final frame or use opaque backing | At least 4.5:1 normal text / 3:1 large text; labels communicate statuses independently of colour |
| Destinations | Crawl all published links and citation downloads | Every internal route exists; canonical external profiles verified; no placeholder routes |
| Performance | Cold-load and full-scroll traces on representative mobile/desktop | Resource budgets met; posters retain space; initial interaction is not blocked by video |
| Provenance | Publish a material revision in a staging record | Previous version stays reachable; aliases, citations, feeds and structured data agree |

Initial implementation needs meaningful checks for motion arbitration, record/version resolution, citation output and link integrity. Visual layout and media ratios need rendered review with the final assets. Do not claim these acceptance checks passed while only the production board exists.

## Production dependencies and order

1. **HAUSE integration:** source inspection is complete. Implement the documented site adapter, photography forms, Film controls/source selection, no-JS visibility and exact status handling. Pin the dependency for deployment. The source checkout has not been modified by this handoff.
2. **Record selection:** select the real notebook, question, finding, four films and project dossier sources. Confirm final identities, dates, statuses and external URLs.
3. **Owned shoot:** capture desktop and mobile identity/closing films, interaction film, portraits, notebook pages, London, personal images and objects. Select and colour grade as one publication while preserving differences between scenes.
4. **Third-party media:** establish allowed use for the selected IBM/YouTube/talk assets. Where footage is unavailable, complete the poster/link composition and retain the owned-film minimum.
5. **Mechanism production:** create VINDEX3 and LARQL explanations from verified examples, with static equivalents and accurate source references.
6. **Build:** establish records, media derivatives, server rendering, actual HAUSE integration, citations and version storage; compose the scenes using approved assets; add the single motion coordinator.
7. **Review:** complete mobile art direction, contrast, static, keyboard, semantic, network and full-page visual checks. Replace any unverified editorial examples before release.

No public launch with placeholder portraits, borrowed campaign photography, fabricated notebooks or unsupported experimental claims. Internal layout work may use clearly labelled geometry until the real media arrives; it does not pass the visual launch criteria.

## Reference handling

Art direction here derives from the user-supplied brief. Its luxury references are inspiration, not a source of reusable media. No campaign image has been downloaded or incorporated into the project. The following links are retained as references supplied in that brief; their current campaign contents were not independently verified for this board:

- [Burberry — A Good Sport](https://uk.burberry.com/c/burberry-world/campaigns/a-good-sport/)
- [Dior — Fall 2026 women’s campaign](https://www.dior.com/en_gb/fashion/news-savoir-faire/folder-news-and-events/fall-2026-womens-campaign)
- [Saint Laurent Productions](https://saintlaurentproductions.ysl.com/)

Research findings remain source dependencies. HAUSE’s implementation was verified against the local source and revision cited above; no web source substitutes for that inspection.
