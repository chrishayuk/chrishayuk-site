# Notebook social editions

25 September 2026 — branch review

The previous output put the title, full standfirst and lineage on a framed cream sheet in both ratios. The surrounding cream panels inherited light text in dark mode, making captions difficult to read.

## Composition

- Newsreader and Archivo match the publication. Local static font instances keep the PNG renderer independent of remote font requests.
- Remove the bronze edge, technical record ID and lineage from the common layout. Keep author, publication, date and URL quiet.
- The recovery edition uses the I12R B/C results directly from the figure evidence JSON. Both counts and twelve per-world marks come from that source.
- Portrait places the title above the comparison. Landscape and link previews put the title beside it. These are different compositions for the same material.
- Keep the outcome definition and conditions on the image: original record plus fresh task, equal starting state, identical damage, fixed interface, protected machinery. The two arms are a comparison, not a before/after sequence.
- Other editions retain their existing subject-specific diagrams; the plain fallback carries the title and standfirst without an invented visual.

## Sharing section

Unframed previews display the complete exported image. Caption and link fields sit inside native disclosures, with explicit theme foreground/background tokens. Downloads, editable selection, copy buttons, canonical follow-up links and machine export remain available.

The asset revision enters URL hashes, so existing cached artwork is replaced after the design changes. Files remain PNGs; motion belongs to the live note and is not implied by these exports.

## Verification

Rendered and inspected recovery portrait, landscape and link preview PNGs, plus attribution and plain fallback portrait editions. Publication/recovery tests (54), TypeScript and the Vite production build passed. The separate Next build stalled at compilation in the restricted environment and was stopped. Browser UI inspection is unavailable in this session; the returned page markup and theme rules were checked, but the sharing panel still needs a visual browser review.
