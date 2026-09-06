# Visual notebook preview

Three draft records are composed in `lib/visual-notebooks.ts`:

- `N-MAP` — `/notebook/what-is-the-map`
- `N-STATE` — `/notebook/what-has-to-survive`
- `N-ADDRESS` — `/notebook/reading-by-address`

They enter the existing catalogue and Ask graph as editorial drafts. They do not enter publication feeds or the published citation endpoint. The page's reference controls retain unpublished-draft wording. The new `film` act carries a YouTube identity, starting timestamp and authored caption; its caption is indexed as editorial text, never as an automatic transcript. A `discusses-film` edge links the act to the existing film record. Film pages show the explicitly connected notebook entries.

The opening media act is presented in the notebook header. The map and state notes lead with the actual 370,000-token film at 02:00 and 04:00 respectively, including on the index. The map note retains both original animations beside their explanations, and has further film passages at 04:00, 07:00 and 19:30. The constructed illustrations and measured model demonstrations are labelled separately. Its `act-1` anchor is retained; subsequent body acts use their original offsets, so graph citations continue to resolve within this draft.

Original assets in `public/media/notebook/`:

| Local asset | Original source | Treatment |
|---|---|---|
| `map.mp4`, `map.png` | `the-mechanism/visuals/out/v1_spot_in_space.mp4`, `v1_spot_4.png` | Copied unchanged; constructed vector-addition illustration |
| `address.mp4`, `address.png` | `the-mechanism/visuals/out/v3_conveyor.mp4`, `v3_conveyor_3.png` | Copied unchanged; explanatory address conveyor |
| `state.jpg` | Original YouTube poster, `TYgCRPCAFhE/maxresdefault.jpg` | Copied unchanged |

Both diagrams retain their full landscape composition on mobile; no independent portrait edit is claimed. Still posters and text alternatives remain available with motion disabled. Local animations use the existing HAUSE motion coordinator through `Media`; external films require explicit playback through HAUSE `YouTubeFilm`.

The research summaries derive from the 6 September editorial review. Experiment identities, scope and qualifications are included on each page; private database dumps and local paths are not shipped. There are no new E25 findings in this preview. Its separate E26 correction remains a candidate for the next notebook batch.

This edition is deployed as publicly accessible working notes. They retain their draft record status; deployment does not assert that their research claims are established. Formal publication requires the existing explicit snapshot transition with a real publication date.

## Code and interactive study

Observation acts can carry contextual reference links. The map note links the actual CHUK MLX projection/swap/injection scripts, CHUK KV Anatomist, The Mechanism, experiment source entries and follow-up notebooks.

The map also contains a visual HAUSE Connection to the interactive memory study, after the residual-swap explanation. Its preview calculates the actual baseline key activations and Paris readout from the demo data. The prominent entrance and the explanatory link lead to the same study. Connection text enters Ask with the notebook's draft status.

The homepage’s latest notebook feature presents N-MAP at `/#from-the-notebook`. Its title and destination derive from the record. A muted five-second excerpt from the original residual-map demonstration (02:35–02:40) supplies the visual, using the existing HAUSE motion coordinator and a still poster. Mobile retains the full landscape frame. The feature follows the latest YouTube film and latest verified MoE appearance, then leads into the note, and labels the entry as a working note. The operator note remains in the notebook archive.

Notebook passages use individually selected film frames through `lib/film-stills.ts`, resolved by YouTube ID and exact playback start in the shared `FilmPlayer`. This applies to both note pages and the notebook index. The original full-video poster remains the fallback for other screenings. The still's capture time is separate from the playback time; selecting a representative image never moves the start of the film passage. Stills are registered as owned image assets with original timestamped source URLs in `lib/media.ts`. Each is an inspected source frame, resized to 1600 × 900 WebP without retouching or grading. Short downloaded source excerpts remain under ignored `work/media-ingest`.

| Passage | Playback entry | Selected frame |
|---|---|---|
| Residual map · HJlWDSyDcD4 | 02:00 | 02:36 |
| Residual swap · HJlWDSyDcD4 | 04:00 | 04:46 |
| Attention inspection · HJlWDSyDcD4 | 07:00 | 07:14 |
| Apollo query · HJlWDSyDcD4 | 19:30 | 20:22 |
| Residual/cache explanation · TYgCRPCAFhE | 13:20 | 13:31 |
| Progressive addressing · g58j6DrLOZ0 | 17:10 | 17:26 |
| LARQL knowledge writing · 8Ppw8254nLI | 21:30 | 21:46 |

`/demos/addressed-memory` runs the six-fact constructed FFN in the browser. `scripts/export-addressed-memory.py` reads the reviewed `the-mechanism/ffn.py`, exports its seed-0 vectors and independent NumPy reference calculations, and checks answers against `ffn.json`. Source revision and file hash are shipped with the data. The TypeScript calculation is checked against all six numerical reference readouts. The neuron-suppression control is a browser extension; its results are not presented as a saved original experiment. This draft demo uses HAUSE page metadata and semantic explanatory acts, and remains noindex.

## Fly hosting assessment

The addressed-memory study is a normal site route shipped through the existing Fly site deployment. It has no inference backend or new service requirement.

`chuk-kv-anatomist` is a Vite interface whose MCP client defaults to `http://localhost:8765`; it currently has no recorded-data mode. Deploying the frontend alone would leave visitors without a working inspection server. A public edition needs either reviewed capture data and an explicitly labelled replay mode, or a separately hosted compatible inference backend. Do not point a public browser at the author's local server. The source UI also exposes model loading, so a future live service needs a constrained public API rather than publishing the research MCP endpoint unchanged.

The Mechanism's native model scripts and KV Anatomist's live backend are separate from the browser toy. Hosting the toy does not imply those experiments run on Fly. For a later standalone visual-demo site, Fly supports a static Docker deployment: https://fly.io/docs/languages-and-frameworks/static/.

## Reading by address / draft v0.2

The expanded note follows query → key match → activation → value sum → answer reader, with a prominent HAUSE Connection to the browser study. Both original animations remain beside their explanations, followed by the existing timestamped June mechanism and April LARQL films with their passage-specific stills. The added prose is indexed in Ask through the existing authored-act path.

The review distinguishes a selected stored key from natural-language encoding; positive cross-activations from an exact isolated lookup; top-five retrieval from top-one accuracy; and held-out phrasing from held-out entities. Layer 26 leads paraphrase top-five in `route_sweep.json`, while layer 28 has higher top-one scores. Native retention means six original argmax tokens retained, not universal non-interference. The note stays an explicitly referenced draft.
