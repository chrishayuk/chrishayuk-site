# Notebook collection review — 26 September 2026

Reviewed all 30 current entries with the shared HAUSE notebook template, plus
seven preserved notebook routes. The current collection has 180 authored spreads
and 26 mounted-film renderings (including repeated readings in manuscripts).

The production HTTP audit passes for every page: one H1, unique IDs, complete
manuscript text, citation anchors and fragment destinations, controls inside the
paper above the folios, and content sizing. These are semantic checks; browser
layout, page-turn interaction and responsive visual checks remain unverified
because no browser connection was available. The supplied clipping screenshot
motivated content-growing paper; page controls now stay on the paper while reading.

The homepage audit also passes: its open spread selects the latest published
notebook in the graph, and its three featured articles are distinct published
records. Latest at review: **N-ECOLOGY-RECOVERY**. Publishing a newer note
updates this selection through the ordinary content/deployment workflow, without
editing homepage JSX. Tests cover draft-to-published transitions and prevent
creation, revision or retrieval dates from displacing publication chronology.

| Notebook | Spreads | Film mounts | Semantic audit |
| --- | ---: | ---: | --- |
| [The repairer left. The mechanism kept working.](/notebook/the-repairer-left-the-mechanism-kept-working) | 7 | 0 | Pass |
| [A result can look relevant without looking usable.](/notebook/a-result-can-look-relevant-without-looking-usable) | 8 | 0 | Pass |
| [The site was there. The agent never saw it.](/notebook/the-site-was-there-the-agent-never-saw-it) | 6 | 0 | Pass |
| [The page couldn’t authorise. The peer said go.](/notebook/the-page-couldnt-authorise-the-peer-said-go) | 9 | 0 | Pass |
| [The message board did not create a culture.](/notebook/the-message-board-did-not-create-a-culture) | 4 | 0 | Pass |
| [A successful behaviour is not necessarily contagious.](/notebook/a-successful-behaviour-is-not-necessarily-contagious) | 4 | 0 | Pass |
| [The world can remember for the agent.](/notebook/the-world-can-remember-for-the-agent) | 4 | 0 | Pass |
| [The stronger agent left something behind.](/notebook/the-stronger-agent-left-something-behind) | 6 | 0 | Pass |
| [The AI left. Its knowledge didn’t.](/notebook/the-ai-left-its-knowledge-didnt) | 6 | 0 | Pass |
| [The tool was not the problem.](/notebook/the-tool-was-not-the-problem) | 5 | 0 | Pass |
| [The page could ask for a favour.](/notebook/the-page-could-ask-for-a-favour) | 6 | 0 | Pass |
| [The page could ask. It couldn’t authorise.](/notebook/the-page-could-ask-it-couldnt-authorise) | 8 | 0 | Pass |
| [The subject read the experiment.](/notebook/the-subject-read-the-experiment) | 6 | 0 | Pass |
| [Does an invitation count as permission?](/notebook/does-an-invitation-count-as-permission) | 8 | 0 | Pass |
| [Can a machine use an invitation?](/notebook/can-a-machine-use-an-invitation) | 8 | 0 | Pass |
| [Can you name the mutation that changed a world?](/notebook/can-you-name-the-mutation-that-changed-a-world) | 5 | 0 | Pass |
| [What keeps an evolving world alive?](/notebook/what-keeps-an-evolving-world-alive) | 6 | 0 | Pass |
| [When does improvement become invention?](/notebook/when-does-improvement-become-invention) | 6 | 0 | Pass |
| [Give invention something to unlock.](/notebook/give-invention-something-to-unlock) | 4 | 0 | Pass |
| [An advantage needs a chance to become history.](/notebook/an-advantage-needs-a-chance-to-become-history) | 6 | 0 | Pass |
| [Can something evolve that makes the next invention possible?](/notebook/can-something-evolve-that-makes-the-next-invention-possible) | 4 | 0 | Pass |
| [I wanted a website to behave like an exhibition.](/notebook/i-wanted-a-website-to-behave-like-an-exhibition) | 6 | 0 | Pass |
| [My CI has to undo my coding agent.](/notebook/my-ci-has-to-undo-my-coding-agent) | 5 | 0 | Pass |
| [The address is built through depth.](/notebook/the-address-is-built-through-depth) | 5 | 0 | Pass |
| [What is the map actually a map of?](/notebook/what-is-the-map) | 9 | 12 | Pass |
| [What has to survive?](/notebook/what-has-to-survive) | 6 | 4 | Pass |
| [Reading by address.](/notebook/reading-by-address) | 10 | 8 | Pass |
| [Which source wins?](/notebook/which-source-wins) | 9 | 2 | Pass |
| [Context should be abundant.](/notebook/context-should-be-abundant) | 2 | 0 | Pass |
| [The operator and the model.](/notebook/the-operator-and-the-model) | 2 | 0 | Pass |

## Shared implementation

HAUSE owns NotebookTemplate, NotebookNote, NotebookFilm, NotebookPreview and
Codex navigation. Both consumers pin `60b0dcf3b0bb2f7e3fa9b1b93e720b8706c951a9`
and verify all 123 shared source files. The design site has specimens and generated
API/Ask documentation for the same revision. Future notebooks have a default
shared-template renderer as well as the option to author their own chapters.

Existing notebook controls, source records and preserved manuscripts remain
intact. The earlier six-movement recovery reading source was reconciled from
main and retained; the later notebook composition remains the current edition.
The paper, diagrams and film framing do not introduce research findings.

The later Cell80 screenshot exposed an inherited black exhibition wrapper around
a statement. Shared room-style statements now use notebook-sized, left-aligned
ink with a rust continuation. Thresholds in Cell80, State and the short notes,
plus the Exhibition and Authority narrative wrappers, inherit the paper palette.

The full production deployment contract also passes: homepage/graph selection,
canonical redirects, indexing, films and media, feeds, generated social cards,
readership classification, citations, all 30 notebook Ask routes, all four thread
headings and metadata, source downloads and programme links. Thread pages now
render the same title held in their graph record; the existing displayed questions
are the source titles. The Agent Ecology-to-Machines field-map link is restored.
Run this suite with a fresh local readership database, as CI does.

The homepage preview now sits in a dark, directionally lit desk scene, with a
gentle perspective and layered paper edges. Mobile and print flatten the spread.
The shared HAUSE preview still renders live text selected from the publication
graph. Its title, reading link and outer “Open notebook” link all lead directly
to `#open-notebook`, a stable destination on the first folio of every current
entry. The rendering audit checks this across all 30 notebooks and verifies the
homepage destination. The production build, four selection tests and all 37
rendered-page checks pass; browser visual verification remains unavailable.

The notebook index now exposes all 30 listed notes in five complete collections,
with collection shortcuts and search. Each note has one cover, explicit publication
status and a first-page link. Notes without an authored programme membership fall
into Working notes, so future publications cannot disappear from the index.

Collection entrances use native document navigation and share the selected cover
with the destination paper. The first-page fragment is styled before hydration,
avoiding a cover flash while Codex adopts the folio state. Transition names are
cleared after completion for history restoration; pause and reduced-motion
preferences bypass animation. The event lifecycle follows the
[Chrome cross-document transition guidance](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document).
Fifteen transition/selection tests, the production build and the full deployment
contract pass. Browser geometry and animation appearance still require visual review.

Screenshot follow-up: Recognition-1 still carried an independently styled dark
instrument panel. Current folios now adapt recognition, selection, peer sequences,
discovery/capability route diagrams, ecology/inheritance diagrams, address studies,
authority gates and agent-machine instruments to paper and ink. Recognition controls
use an underlined active state, smaller measures and column-aware responsive layout.
World Remembers outcome colours retain contrast on paper in either site mode.
The index covers now use the reader's 20px squared stock, margin line, centre crease
and paper edges instead of ruled stock and coloured spines. These are scoped CSS
changes; study data, media pixels, control handlers and preserved editions are intact.
Production compilation and the 11 legibility contract tests pass. The screenshot
provides the observed defect; browser visual verification remains unavailable.

The collection previews now follow an exhibition composition: a large opening
spread for each collection, followed by pairs of quieter objects. Ivory squared
paper, restrained perspective, directional light and layered edges give the
notebooks physical presence. Each preview includes a small SVG concept drawing
appropriate to its note or collection; these illustrate relationships, not measured
outcomes. Narrow previews stack the drawing and remove the crease; mobile flattens
the paper. The graph still supplies every entry and its first-page destination.
The production build, 26 selection/transition/legibility tests and HAUSE source
parity pass. Local servers remain stopped; appearance needs browser visual review.

Collection and edition filters now render on the server using shareable query
parameters. They work without JavaScript, intersect both choices, retain chronology,
omit empty collections and provide a clear empty state and reset link. Filtered
views retain the canonical notebook URL and are excluded from indexing. Eighteen
gallery, graph-selection and navigation tests and the production build pass.

The exhibition alternates broad spreads, portrait compositions and diagram studies,
with restrained ivory/linen stock, opposing angles and asymmetric spacing. Small
screens use a single column and flat paper. The supplied screenshot confirms the
previous composition; the latest visual variations still need browser review.
