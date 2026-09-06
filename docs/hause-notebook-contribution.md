# Visual notebook / HAUSE contribution review

6 September 2026. Implemented locally on N-AUTHORITY and N-MAP; no upstream
contribution or deployment is claimed.

## The semantic record stays the source

`AuthorityNotebook` and `MapNotebook` are exhibition-local compositions, wired
through `RecordPage`. They retain the authored acts, source references, draft
status and original `act-N` anchors. The synopsis becomes a native disclosure.
All original research remains server-rendered in native field-note disclosures;
the visible surface carries diagrams, concise interpretations and boundaries.
The Apollo-to-authority branch is also declared in N-MAP's related records and
contextual references.

The figures use the publication's HAUSE editorial/system/evidence voices, theme
tokens and existing film/motion ownership. They introduce no automatic animation,
sound, inference endpoint or generated evidence. Each constructed diagram says
what it represents. The measured layer matrix reads `gateArm`; the supply panel
reads `promotionArm`; the measured/unknown counter derives from the data. The
founding promotion table transcribes the existing authored experiment, keeping
correct, corrupted and padding controls distinct. The separate 5824 retirement
comparison remains explicitly cross-run.

## Static modes and accessibility

- `AuthorityScene` is an instrument. Its server-rendered baseline shows all eight
  reads open, and its always-present caption states both recorded outcomes. The
  static matrix also exposes both outcomes. Its one keyboard-operable button
  toggles only `[]` and `[29]`, with `aria-pressed` and a polite answer readout.
  There is no invented outcome for an unmeasured arm. Reduced motion removes the
  switch transition; all labels and results remain.
- `MapNotebook`'s diagrams and the remaining authority figures are static evidence
  objects. Labels, numbers, captions and field notes carry their meaning without
  colour or motion. The map retains its original films and animations through the
  existing motion coordinator.
- `NotebookFieldNotes` enhances native `details` by opening a cited passage's
  disclosure on initial `#act-N` navigation and subsequent hash changes. The
  disclosures themselves work without JavaScript, with visible focus styling.
- `NotebookRefusal` is an explicitly local static rendering of the existing
  `RefusalProps` contract. Title, every line and principle are rendered once in
  normal document flow, without Reveal or pulse dependencies. It is selected only
  by these two notebook compositions. It does not conceal a fallback with CSS.
- `vendor/hause/components/forms/Refusal.tsx` remains unchanged. The original
  staged form and its fallback are preserved for other consumers.

## Candidates for HAUSE

1. **A static mode for Refusal.** This is a mode of an existing semantic form,
   not a new card primitive. A backwards-compatible `presentation="static"`
   option could render the complete refusal as the resting state once, while
   leaving the existing default unchanged. The duplicated flattened paragraph
   should not be removed from the staged mode as a side effect. Port the local
   behaviour with explicit no-JS and reduced-motion specimens.
2. **Citable evidence disclosure.** Both notes need a diagram above detailed
   evidence, while keeping direct citations readable. The native disclosure and
   anchor enhancement are the reusable behaviour. Review this against HAUSE's
   existing Lens and Provenance contracts before admitting another form; an
   arbitrary accordion component would not express the semantic need.
3. **Recorded-arm instruments.** The existing authority study and the notebook
   scene share a strict measured-arm lookup contract. If another experiment
   consumes it, extract selection/readout behaviour with an explicit unmeasured
   state and mandatory plain-language resting record. Keep experimental values,
   layer geometry and presentation in the consumer.

The chapter sequencing, Apollo imagery, token-distance diagrams, retirement
matrix, state/readout flow and experiment-specific typography remain publication
art direction. The two notes are two exhibits in one consumer; this is evidence
for reuse, not a claim that another site has adopted a new library form.

Any accepted generic implementation should be applied to the authoritative
HAUSE checkout and mirrored from that revision into the vendor, following
`docs/hause-publication-contribution.md`. This task changes neither upstream
HAUSE nor its manifest and does not invent an upstream release.

## Validation

TypeScript, focused ESLint, the 30 publication tests and the production build
passed. Local HTTP checks found all 28 authority and 23 map act anchors exactly
once, with six authority chapters, thirteen map evidence sections and native
disclosures containing the authored research. The connected browser runtime
reported no available browser; interactive, visual and browser accessibility QA
remain unverified. Native markup and responsive CSS alone are not a claim of a
completed browser audit.
