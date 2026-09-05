# HAUSE integration handoff

05 September 2026 · Source inspection for the homepage production board

## Inspected baseline

Source: `/Users/christopherhay/chris-source/hause-design/hause`.

Package: `@chrishayuk/hause` 0.1.0. Git revision: `a93fb729c7d9ba02f7c1b2c369394526f9a3d158`; worktree clean at inspection. No edits were made to this checkout.

Source-of-truth files inspected: `manifest.ts`, `types.ts`, `tokens.css`, `cite.ts`, `seo.ts`, `figure.ts`, `components/Reveal.tsx` and the relevant files under `components/forms/`. The README explains consumption but does not override those sources.

HAUSE ships raw React/TSX forms, tokens, a semantic form manifest and publishing helpers. There is no generic CMS, record store, `HauseComposition` type, JSON composition validator or universal composition renderer in this package. The site owns those layers and imports real forms through documented subpaths.

## What can be reused

| Source | Actual contract | Homepage application |
| --- | --- | --- |
| `Hero.tsx` | `{ kicker, title, dek }`; one H1 per page | Scene 00, with an editorial layout extension for the media overlay |
| `Statement.tsx` | `{ text }`; editorial sentence | Project propositions and notebook quotation |
| `Observation.tsx` | `{ label?, text }`; system-voice observation | Person/practice labels and short mechanism descriptions |
| `Question.tsx` | `{ text, status: Status, detail? }` | FFN question and notebook’s open question |
| `Claim.tsx` | `{ text, status: Status, detail? }`; assertion answerable to evidence | Formal claims in source records; avoid assigning a research status to brand copy |
| `Evidence.tsx` | `{ items: { label, status: Status, detail }[] }` | Verified supported results |
| `Refusal.tsx` | `{ kicker?, title, lines: string[], principle }`; also exports `RefusalReadout` | Declining to claim block-response reproduction |
| `Film.tsx` | `{ title, description, src?, poster?, captions? }` | Film baseline; production extensions below are necessary |
| `Comparison.tsx` | `{ kicker, objectLabel, blockLabels, left, right }`, sides contain label/properties | Same pieces under two interpretations in Scene 10; not a general split layout |
| `Transformation.tsx` | `{ kicker, objectLabel, blockLabels, from, to }` | Performed two-interpretation model, when appropriate to verified VINDEX3 content |
| `Citation.tsx` | `{ record: CitationRecord, id?, kicker?, note? }` | Plain-first citation plus selectable export formats |
| `Provenance.tsx` | Publication provenance form backed by citation record | Reuse for records; inspect full props when wiring history |
| `cite.ts` | `CitationRecord`, formatters, `citationMeta()` | Single source for page citations, exports and metadata |
| `seo.ts` | WebSite, TechArticle, breadcrumbs, DefinedTerm, SoftwareApplication, QA, citation builders | Reuse supported entities; add site-specific entity projections |
| `figure.ts` | Hatch material, reduced-motion helper, enter-once visibility hook | Technical figure vocabulary; not a page playback coordinator |

The manifest contains 35 forms: 12 statements, 15 instruments, 8 performances. `Film` is implemented but marked `exhibited: false`. `performance` is a mode, not an exported `Performance` component. No `Sequence`, `Photograph` or photographic contact-sheet form exists in the inspected manifest.

## Required extensions, grounded in these scenes

### Photography

The publication needs two proposed exhibition-local semantic forms:

- `Photograph`: one authored still observation, with media reference, alt text, optional true caption and attribution. Renders `figure`, responsive `picture` and `figcaption`; no mandatory headline, research status or autoplay.
- `PhotographicSequence`: an authored ordered relationship between stills, optionally linked to film/image records. Owns reading order and context. The exhibition renderer chooses scale, placement and responsive crop. Film previews remain Film performances controlled by the same page coordinator.

These are proposed additions, not imports that already compile. Build them around the real portrait, place, notebook and personal-image scenes. Record their semantic need and use HAUSE voices/tokens. Keep them local until there is evidence for library promotion; the package’s admission rule does not require pretending a first-use form is already shared. The static observation mode and final API must be documented alongside the implementation.

### Film and all page motion

The existing Film is a 16:9 bordered chapter block wrapped in Reveal. It accepts one source and one poster, sets `preload="metadata"`, plays muted once on its first intersection, disconnects the observer, and offers Play after blocked autoplay/reduced motion or Replay after completion. It does not pause on departure, coordinate with another film, expose a running Pause button, provide an independent mobile source, handle save-data, or wait to attach below-fold sources.

Required implementation:

1. Add a backwards-compatible controlled playback path to HAUSE Film, or an explicitly maintained local extension derived from it. Expose the necessary playback, pause, ended/error events and element control cleanly; do not attach fragile query-selector hacks around the original component.
2. Separate full-bleed editorial layout from the player, retaining the semantic title/description. Support art-directed sources/posters and appropriate aspect ratios. Consume only the selected responsive source; retain codec fallback. A single `src` prop cannot represent the entire production media record.
3. Use one site-level owner for film and system motion. Film’s original automatic observer must be disabled in controlled mode. Start, pause, manual replay, document visibility, menu entry and offscreen suspension must follow the board’s shared rules.
4. Start with a separately visible poster. Replace it only after a decoded frame is available, with no black flash; keep it on failure. Below-fold video sources attach on demand.
5. Provide persistent, labelled Pause/Play controls, and a page still-only preference. Respect reduced-motion and save-data, but let a visitor explicitly enter a chosen film.
6. Adapt any reused `Transformation` or other autonomous performance to the same ownership rule. Its existing enter-once timer sequence is not coordinated by `figure.useInView`. Disable uncoordinated reveals/pulses over an active film to meet the strongest single-motion interpretation.

The source permits placeholder Film frames for development. The user’s launch requirement is stricter: **no placeholders on the published homepage**.

### No-JS and static visibility

`Reveal.tsx` server-renders `data-visible="false"`. `tokens.css` gives `.reveal` opacity zero unless JavaScript changes visibility or the visitor prefers reduced motion. Therefore DOM presence alone does not make the normal no-JS view visibly complete.

For this publication, make visibility the base state and opt into reveals only after enhancement is ready, or add a no-JS visibility override before rendering. Scene 00 must never wait on Reveal. Disable decorative reveals while another dominant motion source owns the page. Test JavaScript disabled with ordinary motion preference, not only reduced motion. This is a requirement discovered from the source, not a claim that HAUSE already passes the homepage acceptance check.

### Exact status semantics

The existing `Status` type is:

```ts
"OPEN" | "ONGOING" | "SUPPORTED" | "REFUTED" | "SUPERSEDED"
```

The publication’s requested vocabulary additionally distinguishes `PROPOSED`, `TESTING`, `PARTIALLY SUPPORTED`, `NOT SUPPORTED` and `ARCHIVED`. Preserve the full domain status in the record. Render the five shared statuses through HAUSE directly; render the other exact labels through a documented publication extension until the shared vocabulary is expanded deliberately. Do not cast unsupported strings to `Status` or silently coerce them.

In particular, `TESTING` is not a reason to discard the source wording in favour of `ONGOING`; `NOT SUPPORTED` does not mean `REFUTED`; and `ARCHIVED` is not `SUPERSEDED`. A missing study is not a negative result. Record publication state (draft/published), media permissions and claim status independently.

Scene 12 can reuse an `Evidence` row with `SUPPORTED` and a `Refusal` stating why reproduction cannot be asserted, alongside the exact domain label `NOT SUPPORTED`. Refusal’s use of the refuted-colour token does not change the record’s status. Add an explicit status extension if a formal not-supported Evidence row is required.

### Citations, provenance and structured entities

`CitationRecord` supports title, authors, first published date, revised date, version, canonical URL, publisher, abstract, part-of relationship, identifiers and other optional publication fields. Dates are strings here, not JavaScript Date objects. `published` is required, so unpublished research examples cannot become public citation records by supplying invented dates.

`CitationKind` is `specification | research-note | article | software | dataset | page`. It does not currently model `film` or `image` as citation kinds. For initial media dossier pages, `page` may accurately cite the authored page, clearly distinguished from citing the original film or photograph. To cite those works as audiovisual/image objects with proper creator roles, extend the kind/formatter/metadata mappings explicitly. Do not label Chris as author of an IBM production merely because he participates.

Reuse `citationFormats()` for Plain, BibTeX, APA and CSL-JSON. Existing Citation switches formats on the client; add server-addressable exports if all formats must remain available without JS. Existing Provenance/Citation forms do not themselves implement immutable version storage, content hashing or a history database. Those remain site responsibilities.

The package provides useful SEO builders but does not cover every requested entity. The site must add Person, ProfilePage, VideoObject and ImageObject projections where appropriate and extend relationships from its own record graph. Derive those from real records rather than a parallel marketing document.

The existing sound helpers use saved global opt-in state. This homepage requires ambient films and composition demonstrations to stay silent regardless of a previously saved HAUSE sound preference; ensure the extension does not invoke synthesised sounds automatically. Explicit sound entry belongs on a film page.

## Consumer wiring

Use a dependency pinned to the inspected repository revision for reproducibility; a local absolute file dependency is useful for development but unsuitable for a portable deploy. The package is private and not published to a registry. Its README documents consumption from `github:chrishayuk/hause`.

If using the documented Next.js consumer path, the inspected package declares peers Next `^16`, React `^19`, React DOM `^19`; add `@chrishayuk/hause` to `transpilePackages`. These are local package requirements, not a recommendation inferred from current external release information.

Import real forms by subpath, e.g.:

```tsx
import { Question } from "@chrishayuk/hause/components/forms/Question";
import { Citation } from "@chrishayuk/hause/components/forms/Citation";
import type { CitationRecord } from "@chrishayuk/hause/cite";
```

Import `@chrishayuk/hause/tokens.css` and ensure the consumer’s Tailwind v4 source scanning includes the package. Load fonts in the consumer and place their CSS variables on `<html>`. Scene-specific art direction can override surface/grid values while preserving voices and semantic form behaviour. There is no requirement to copy the specimen site’s layout, navigation density or default theme controls.

The site’s record adapter should validate an allowlist of semantic intents, look up related published records/media, derive the correct typed props, and dispatch to the real form or explicit extension. A production inventory is not accepted as public record content. Unknown intents or missing evidence should fail validation with a useful authoring error; never substitute a generic card.

## Review evidence and remaining work

Completed: source inspection, exact form mapping, token/font identification, citation/status analysis and concrete extension requirements. The board now distinguishes the existing library from the publication’s renderer and record storage.

Not yet implemented: the consumer application, the local semantic extensions, shared playback controls, media ingestion, semantic-record validation and runtime tests. No HAUSE code or deployment has been changed. Implement these against the board and final media, then verify static visibility, playback exclusivity, status fidelity, citation/version resolution and rendered composition.
