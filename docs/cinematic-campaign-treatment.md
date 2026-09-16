# A house after hours

Photographic treatment · 17 September 2026 · First homepage edit implemented

**Scientific instrument × gallery exhibition × fashion film.**

The house has been occupied. Someone has worked here, left instructions, moved a component, switched off a screen. We arrive between one action and the next. Each programme explores a different scale of this same place: Machines at its boundaries, Agent Ecology at its workstations, Cell80 beneath its instruments, Learned Systems inside its architecture.

This is a twelve-image library, including three existing studies. The first homepage edit selects three images in total: Threshold, Inheritance and The Interior. That means two additional image moments and one new master image. The other nine belong to programme pages or later editorial selections. They are not twelve new homepage sections.

This document specifies the campaign and its first implementation. Threshold and Inheritance are reused; The Interior has now been generated and integrated into the homepage, alongside the screening-room presentation and two typographic pauses. A matching social card is in `public/og-after-hours.png`; prompts and provenance are in `docs/cinematic-campaign-generation.json`. The eight other proposed images remain the subsequent campaign library. Placement was grounded in the local `app/page.tsx`; the live homepage could not be retrieved through the research browser during preparation. Existing and generated images were inspected directly.

## The photographic grammar

- **Materials:** used aluminium, smoked optical glass, charcoal concrete, worn black leather, off-white paper. Small scratches and handling marks give objects a history. Avoid making every surface wet or reflective.
- **Light:** one credible source per composition, with restrained ambient fill. A warm task lamp, reflected daylight, a narrow inspection light. Cool shadows remain neutral enough to reveal material. Reserve amber for a local reflection or working light, rather than bathing every image in orange and blue.
- **Colour:** soot, stone, tobacco, warm paper and tarnished silver. The same restrained grade holds the library together; each programme can have a different exposure and temperature.
- **Camera:** human-scale, rectilinear architecture; natural perspective; deliberate depth of field. Lens descriptions below are creative targets, not claims about photographic capture.
- **Composition:** one point of attention and substantial unoccupied space. A frame can withhold most of an object. Alternate wide room, close object and material detail so scale changes as the visitor moves.
- **Human presence:** the existing film carries Chris. These studies carry traces of activity: chair position, cable, paper curl, disturbed dust. Empty rooms must feel recently used, not generically abandoned.
- **Image integrity:** plausible physical objects, without robots, holograms, luminous brains, floating interfaces or decorative circuit patterns. No generated lettering, measurements or invented experimental screenshots. Add labels in HTML.
- **Classification:** retain the site's visible “VISUAL STUDY · AI-GENERATED / NOT EXPERIMENTAL EVIDENCE” caption. These are imagined environments. The charts, controls and recorded outputs remain the evidence.

## The twelve masters

The ratios distinguish the landscape master from its intended desktop presentation and mobile companion. Compose mobile deliberately; do not assume a wide room survives a centre crop.

| ID / programme | Shot | Subject, framing and lighting | Master / presentation / mobile | Exact placement |
| --- | --- | --- | --- | --- |
| M01 · Machines | **The Threshold** · existing | Closed metal door and a small message outside it. Architectural wide; keep both door and message readable. Cool floor spill and a thin warm seam. Reduce the importance of the distant exterior through the selected crop. | Existing 16:9 / approximately 16:10 / separate 4:5 framing if the message becomes too small | **Homepage:** after `#current-programmes`, before `#film`. Retain the existing use after the intro on `/thread/machines`. |
| M02 · Machines | **The Receipt** · new | A single paper strip curling from an idle printer on a scratched counter. Extreme close view at counter height; mechanism mostly outside frame. Warm raking light reveals paper fibres; background falls away. The visible strip is blank. | 3:2 / 3:2 / 4:5 | Library reserve for `/thread/machines`, between the reading sequence and `#instruments`; select instead of a second full-page room image. **No first-edit homepage slot.** |
| M03 · Machines | **The Visitor** · new | An empty terminal seen indirectly in a dark window. Screen itself stays out of shot; only its pale reflection touches an unoccupied chair. Eye-level, oblique, 50mm feel; very low neutral screen light. | 16:9 / 16:9 / 4:5 | Alternative to M01 in the **same homepage gap between programmes and film**, for a later edit. Never show both there. Also a reserve for the Machines introduction. |
| E01 · Agent Ecology | **The Inheritance** · existing | Preserve the current workshop: illuminated glass plate, empty chair, black monitor and disconnected cable. The task lamp motivates the warmth; a second station remains in cool shadow. | Existing 16:9 / 16:9 / art-directed 4:5 companion retaining plate and chair | **Homepage:** retain immediately after `#film`, before `#selected-results`. Keep its existing Agent Ecology introduction placement. |
| E02 · Agent Ecology | **The Descendant** · existing | Glass plates receding across a bench, each carrying the repeated mark. Low oblique view, cool glass edges and warm reflection. More diagrammatic than Inheritance: use sparingly and away from measured results. | Existing 16:9 / 16:9 / 4:5 companion with at least three plates | Programme library for `/thread/agent-ecology`, after its reading sequence and before the closing question. **No first-edit homepage slot.** Do not use it as proof of successful inheritance. |
| E03 · Agent Ecology | **The Next Station** · new | Two workstations seen through a narrow partition. Near desk empty except for the same kind of glass record; far desk has an unoccupied chair pulled out. A lamp is on only at the far station. 35mm view; quiet middle-distance depth. | 3:2 / 3:2 / 4:5 | Later alternative to E01 in the **existing post-film study slot**. Programme-page alternative to the introductory Inheritance image, not an additional image beside it. |
| C01 · Cell80 | **Under Glass** · new | A tiny assembled metal lattice on a ceramic base under a low rectangular glass cover. Most of the surrounding instrument table is empty. 85mm close view; neutral inspection light, a soft warm reflection at one edge. Engineered, delicate, visibly small. | 3:2 / 3:2 / 4:5 | `/thread/cell80`: after its introductory header and before the existing lead content. Optional later **replacement** for L01 after homepage results; not a fourth full-height homepage image. |
| C02 · Cell80 | **One Changed Joint** · new | Macro fragment of a lattice: several repeated joints and one interrupted connection, with the structure continuing outside the frame. Shallow but sufficient focus to read the interruption. Hard lateral light; ceramic and metal retain natural colour. | 3:2 / 1:1 extreme crop / 4:5 | Reserve for the transition between the first three and later notes on `/thread/cell80`. **No first-edit homepage slot.** It is a material metaphor, not a rendered Cell80 state. |
| C03 · Cell80 | **The Empty Position** · new | A tray of small machined components; one vacant recess, displaced part lying nearby. Overhead, slightly off-axis, 50mm feel. Diffuse pale light makes this the brightest study in the library. Tiny shadows convey scale. | 4:3 / 4:3 / 4:5 | Alternative Cell80 entrance image or closing image before its final question. **No first-edit homepage slot.** Avoid pairing it with a result as though it depicts a control condition. |
| L01 · Learned Systems | **The Interior** · new | Inside a large physical assembly, repeated metal partitions recede into darkness. Camera is close to one imperfect edge; a narrow working light reveals one passage, while other cavities remain dark. 35mm perspective, no impossible vanishing point or glowing tunnel. | 16:9 / approximately 16:10 / separate 4:5 composition | **Homepage:** immediately after `#selected-results`, before `#systems`. This single image is both the release from evidence and the entrance to Systems. Programme use: `/thread/the-map`, after its introduction. |
| L02 · Learned Systems | **The Address** · new | An unmarked index tab catches light inside a dense rack of worn metal dividers. Extreme oblique crop, rack continues beyond frame. 85mm feel; focused white light, warm reflected edge. Physical depth rather than a science-fiction archive. | 3:2 / 1:1 crop / 4:5 | Reserve for `/thread/the-map`, between its reading sequence and closing question. **No first-edit homepage slot.** A metaphor for selection; it does not imply one fact occupies one literal model compartment. |
| L03 · Learned Systems | **The Removed Layer** · new | A thin panel partly withdrawn from an assembly, leaving a narrow cavity. Close enough to show the cut edge and fasteners, wide enough to retain the surrounding structure. Broad side light and a dark interior; no self-luminous material. | 3:2 / 3:2 / 4:5 | Later alternative to L01 in the **post-results / pre-Systems homepage slot**; reserve for `/thread/the-map`. Select one of L01, L03 or C01 for that slot. |

The three existing masters live in `public/images/studies/`, with original PNGs and recorded prompts in `docs/visual-studies-originals/` and `docs/visual-studies-prompts.json`. Preserve their provenance. Existing exports are 1672 × 941; they are useful reference images, but new wide exports should be judged at the actual intended display size.

## The homepage edit

Keep navigation, typefaces, programme order and result order. Use the following sequence without introducing a separate gallery route or new navigation concept.

| Existing anchor / insertion | Proposed treatment | Pacing target |
| --- | --- | --- |
| Identity | Retain current film and proposition. | Existing opening. |
| `#current-programmes` | Retain the four entrances and their questions. | Current reading pace. |
| **Insert M01: Threshold** | One large frame. Caption: `MACHINES / THE THRESHOLD`; existing sentence “A message at the threshold.” Small programme link below. | Image around 80–90svh desktop; natural caption below. Mobile 4:5, not a compulsory full screen. |
| `#film` | A black screening field, large existing poster/player, compact “LATEST FILM” label. Actual title immediately beneath the player; description and date follow in a quieter column. | The player is the dominant object. Preserve 16:9 playback; black surround supplies scale without cropping the film. |
| **Before E01, within its composition** | Near-empty dark field carrying `AGENT ECOLOGY / THE INHERITANCE`, small editorial index `02`, and the existing sentence. Then the image. Move the sentence here instead of repeating it below. | About 35–45svh desktop, 24–30svh mobile. Text can expand. No delayed reveal or forced dwell. |
| Existing E01: Inheritance | Retain the original scene and notebook destination. Put source classification and the notebook link beneath the image. | A still counterpoint to film; no parallax. |
| `#selected-results`, first half | Machines / Favour, then Agent Ecology / inheritance, preserving their evidence and links. | Existing instruments remain usable. |
| **Insert a typographic pause inside results** | A generous paper field between Agent Ecology and Cell80: `CELL80 / LEARNED SYSTEMS`, small editorial index `03`. No new scientific claim or introductory paragraph. | Around 30–40svh desktop, 18–25svh mobile. This breaks the dense run where it actually occurs. |
| `#selected-results`, second half | Cell80, then Learned Systems / Address Build. Same records, same order. | Evidence resumes. |
| **Insert L01: The Interior** | Full-width frame; tiny `LEARNED SYSTEMS / THE INTERIOR` caption, classification and one programme link beneath. Let the image provide the transition. | Image around 85–95svh desktop with a deliberate crop; 4:5 mobile companion. |
| `#systems` | Retain systems links. Give the heading and links space after the image. | A short room after the long view. |
| `#latest` / Notebook | Retain compact working-archive treatment. | Return to reading. |
| `#appearances` | Retain the distinct conversation module and actual episode information. | Existing close to the homepage. |

The `02` and `03` marks are editorial sequence labels, not experimental IDs. They do not imply an omitted on-page table of contents. Omit them if they read as navigation controls in the composition.

These are framing targets, not fixed-height text containers. The first edit adds approximately two large image surfaces and two shorter pauses. It should remain quick to scroll. On a phone, image ratio and readable captions take priority over viewport occupancy.

## Film as a screening room

The existing `FilmPlayer` already supplies a real poster or still and the established player behaviour. Retain it. Give its surrounding section a dark, uninterrupted field; remove the feeling of a bordered content card through spacing and scale.

Keep playback controls immediately visible and keyboard accessible. The film title is always present in HTML and the player has its accessible name from first render. “Appearing after” means the title's position in the composition, not withholding it until a scroll or animation event. Keep description, date and duration below the title; do not overlay a paragraph on the poster. Use actual footage or approved stills, not a generated imitation of the film. On mobile, keep the full 16:9 frame rather than losing the apparatus or speaker to a portrait crop.

## Production briefs for the first two new masters

Use Inheritance as the material and lighting reference. It is the continuity anchor, not a layout to duplicate. Produce L01 first for the homepage and C01 second to establish Cell80's distinct scale. The other proposed shots are the subsequent campaign library.

**L01 / The Interior**

> Cinematic photographic visual study of the interior of a large, physically plausible engineered assembly in the same world as the supplied Inheritance reference. Repeated worn aluminium partitions, deep narrow cavities, a close imperfect metal edge in the foreground, one restrained inspection lamp illuminating a passage partway into the structure. Human-scale 35mm perspective, material wear, credible fasteners, quiet fine grain. The light has a physical source and falls off naturally. Charcoal and tarnished silver, slight warmth only in reflected light. Strong unoccupied shadow, readable depth, no central glowing portal. Landscape 16:9, with the illuminated passage composed so a separate portrait view can be developed. No people, text, labels, graphs, symbols, holograms, neon, circuit patterns or floating objects. This is an imagined environment, not a scientific visualisation.

For the mobile companion, move closer to the foreground edge and retain one illuminated passage with at least two receding partitions. The portrait should feel like another view into the same structure. Do not compress or stretch the landscape.

**C01 / Under Glass**

> Cinematic photographic visual study of a tiny engineered metal lattice on a small off-white ceramic base beneath a low rectangular glass instrument cover. A used dark aluminium workbench extends into quiet negative space. The object is delicate and visibly small; believable joints and tool marks, no futuristic ornament. Close 85mm perspective, clear focus on the lattice and nearest glass edge, background gently unresolved. Neutral inspection light from above and one faint warm reflection in the glass. Restrained charcoal, ceramic white and silver palette, natural optical imperfections, fine grain. Landscape 3:2. No people, lettering, numbered scales, biological creatures, glowing circuitry, magical energy or holograms. The assembly is a material metaphor for a computational programme, not an actual Cell80 organism or measured state.

For mobile, use a 4:5 companion with enough workbench visible to establish scale. Avoid turning the cover into a giant museum vitrine through a low camera angle.

## Implementation and selection notes

`app/page.tsx` owns the two new image insertions and the film surround. `components/VisualStudy.tsx` already separates authored atmosphere from evidence; extend its existing catalogue and caption behaviour rather than creating a parallel content system. Make the chapter prelude an optional homepage presentation so existing notebook and thread embeds do not all gain large empty spaces.

`SelectedExperiments` in `components/PublicationIndex.tsx` currently receives all four programmes together. Add an explicit presentation break after Agent Ecology, preserving the containing results section, heading and programme order. A pause should not duplicate cards, alter their IDs or detach their links from the underlying records. Keep programme-level imagery a later editorial selection, not an automatic addition to every notebook article.

For new assets, retain the original, prompt, reference image, generation date, dimensions, classification and checksum in the existing provenance pattern. Export responsive 800, 1600 and, where supported by the original, 2400-pixel widths. Retain real dimensions, use lazy loading for these below-fold studies, and reserve their layout space. Select separate mobile sources where a crop loses the subject. Review compressed shadows for banding and muddy material detail. A suggested delivery budget is 350 KB per large WebP and 150 KB per mobile image; preserve quality where necessary and measure the actual delivered result.

Review the selected homepage sequence at 390 × 844 and 1440 × 900, plus narrow screens and increased text size. The acceptance question is whether each image changes scale or pace while its subject remains legible. Inheritance must keep its empty chair and record; Threshold must keep its message; Interior must retain depth. Normal scrolling, reduced-motion mode and images-disabled reading should preserve all navigation and research content.

Reject a proposed image if it looks like a luxury server-room stock photograph, depends on self-luminous objects to be interesting, invents legible experimental output, or repeats the previous shot's scale and composition. If L01 is weak, revise that image before filling the homepage with additional studies.

## Reference roles

The user's reference triangle guides the treatment without supplying borrowed assets. The useful lesson from the [Burberry Winter 2026 campaign reference](https://www.burberryplc.com/news/brand/2026/burberry-unveils-winter-2026-campaign-starring-fka-twigs-and-romeo-beckham) is the brief's emphasis on a coherent photographic world. This treatment does not depend on verifying the quoted campaign wording.

[Dior's Summer 2026 presentation](https://www.dior.com/en_gb/fashion/mens-fashion/shows/summer-2026-show) explicitly describes its Gemäldegalerie-inspired setting and separates looks, behind-the-scenes material, savoir-faire and the set. The design inference here is that one body of work can be staged through different kinds of encounter.

[Mason Wong's site](https://www.mason-wong.com/) uses multilingual introductions and prominently staged identity text. The interpretation adopted from the user's brief is to treat typography and unoccupied space as compositional material. This is not a claim that its motion behaviour was tested here.
