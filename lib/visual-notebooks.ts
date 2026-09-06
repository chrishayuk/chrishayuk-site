import type { PublicationRecord } from "./types.ts";

// Authored preview records. Research dates belong to the sources; these notes
// were composed on 6 September. No publication date or historical ID is inferred.
const draft = { kind: "notebook" as const, publication: "draft" as const, version: "0.1", created: "2026-09-06", authors: ["Chris Hay"], status: "OPEN" as const };
export const visualNotebooks: PublicationRecord[] = [
  {
    ...draft,
    "id": "N-MAP",
    "slug": "what-is-the-map",
    "title": "What is the map actually a map of?",
    "dek": "Follow a question through the model. Then change the state it is following.",
    "abstract": "The map is a three-dimensional view of a transformer’s evolving residual state, shown relative to selected answer-token directions. The film follows Japan towards Tokyo, then swaps France’s state into an Australia prompt. Reading the demonstration alongside its code makes the next questions precise: what is being plotted, which state changes, and what does the model know how to read?",
    "concepts": [
        "residual-stream",
        "ffn",
        "model-representation",
        "model-memory"
    ],
    "media": [
        "notebook-map",
        "notebook-address"
    ],
    "related": [
        "N-STATE",
        "N-ADDRESS",
        "Q-FFN",
        "W-LARQL",
        "YT-HJlWDSyDcD4"
    ],
    "body": [
        {
            "kind": "film",
            "youtubeId": "HJlWDSyDcD4",
            "start": 120,
            "caption": "Start with “The capital of Japan is”. Watch the state move through the layers towards Tokyo. The next generated token starts another journey through those layers."
        },
        {
            "kind": "observation",
            "label": "01 / WHAT IS MOVING?",
            "text": "A transformer starts with tokens: pieces of the words in a prompt. It gives each position a vector of numbers, then repeatedly updates those vectors. This changing working state is the residual stream. In the Gemma 3 4B demonstration, each position has 2,560 numbers and passes through 34 layers. The learned weights stay fixed while the state changes. Attention lets a position read information from earlier positions; the feed-forward network, or FFN, applies a learned transformation at that position."
        },
        {
            "kind": "film",
            "media": "notebook-map"
        },
        {
            "kind": "observation",
            "label": "A VISUAL STUDY / DIRECTIONS ADDED TOGETHER",
            "text": "In this constructed animation from The Mechanism, capital, currency and language directions add into one packed vector. It makes a basic operation visible: several contributions can coexist in the same list of numbers. These are hand-built six-dimensional vectors, rather than the measured Gemma trajectory in the opening film. The next question is what a particular reader can recover from a combined state.",
            "references": [
                {
                    "label": "Animation source",
                    "url": "https://github.com/chrishayuk/the-mechanism/blob/main/visuals/v1_spot_in_space.py"
                }
            ]
        },
        {
            "kind": "observation",
            "label": "02 / HOW TO READ THE PICTURE",
            "text": "The dot follows the residual at the last token position, where the next-token prediction is read. Tokyo, Paris and the other landmarks come from the model’s output directions for selected tokens. The plotting code chooses three axes from those directions and projects the much larger state onto them. It also normalises the projected points onto a sphere. That gives us a useful view of a route, but leaves most dimensions out of sight. Apparent distance in this picture is not the model’s answer probability.",
            "references": [
                {
                    "label": "Read the projection code",
                    "url": "https://github.com/chrishayuk/chuk-mlx/blob/main/examples/inference/nav_map_extract.py"
                }
            ]
        },
        {
            "kind": "observation",
            "label": "LAYERS AND TOKENS ARE TWO DIFFERENT CLOCKS",
            "text": "For “The capital of Japan is”, the picture moves towards Tokyo as we advance through the layers of one prediction. After Tokyo is generated, the input has changed: the model now has another token to work with. It runs through the layers again to predict what follows, perhaps punctuation. The dot can therefore move away from Tokyo without the model having forgotten Japan’s capital. We are watching successive computations, each with its own trajectory."
        },
        {
            "kind": "observation",
            "label": "03 / WHY SYDNEY APPEARS BEFORE CANBERRA",
            "text": "The terminal view asks a related question: if we tried to read an answer here, before the model finished, what would it be? It applies the final normalisation and output reader to intermediate residuals—a logit lens. In the Australia example, Sydney appears around layer 24; Canberra appears by layer 26 and remains the final answer. The model has not printed Sydney and then corrected its sentence. These are provisional readouts from inside a single prediction.",
            "references": [
                {
                    "label": "Watch the layer readouts",
                    "url": "/film/youtube/HJlWDSyDcD4?t=240"
                },
                {
                    "label": "Read the swap script",
                    "url": "https://github.com/chrishayuk/chuk-mlx/blob/main/examples/map/01_the_map.py"
                }
            ]
        },
        {
            "kind": "film",
            "youtubeId": "HJlWDSyDcD4",
            "start": 240,
            "caption": "The Australia → France swap. First establish the Australia answer; then insert the donor state from the France prompt, early and late in the computation."
        },
        {
            "kind": "observation",
            "label": "04 / CHANGE THE STATE, CHANGE THE ANSWER",
            "text": "The baseline prompt is “The capital of Australia is”. A separate pass computes the state for “The capital of France is”. The demonstration places that France state into the Australia computation and lets the remaining layers run. The answer becomes Paris. An early swap and a later swap near layer 26 both make the point: the remaining computation responds to the state it receives, even when the prompt displayed above it still says Australia."
        },
        {
            "kind": "observation",
            "label": "THE SIZE OF THE INTERVENTION MATTERS",
            "text": "The script replaces all token positions at the chosen boundary, not just the final position’s 2,560 numbers. That is essential context for the claim. Later attention can still read other positions, so changing one vector and changing the whole sequence are different experiments. The follow-up full-sequence transplant records the donor’s next-token distribution exactly in three tested conditions at layers 14 and 26. This supports a statement about those forward passes. It does not establish that one small vector retains an entire conversation through future generation.",
            "references": [
                {
                    "label": "Full-sequence experiment",
                    "url": "#source-4"
                },
                {
                    "label": "Continue: What has to survive?",
                    "url": "/notebook/what-has-to-survive"
                }
            ]
        },
        {
            "kind": "connection",
            "demonstration": "addressed-memory",
            "text": "Try a memory you can inspect yourself. This small, constructed FFN lets you choose an address, follow its key matches and change the calculation by switching off a neuron.",
            "links": [{ "href": "/demos/addressed-memory", "label": "Try the mechanism — interactive memory study" }]
        },
        {
            "kind": "observation",
            "label": "05 / WHAT WROTE THE ANSWER INTO THE STATE?",
            "text": "The map shows a route. KV Anatomist lets us inspect contributions to it. Its layer-by-head heatmap uses direct logit attribution: it scores how an attention head’s output points towards a chosen answer token. Selecting a head exposes its output projections, and the injection view compares a modified run with the original. This is more specific than asking where attention looked. A large attribution is a clue to investigate; changing or removing the head is a separate intervention.",
            "references": [
                {
                    "label": "Explore chuk-kv-anatomist on GitHub",
                    "url": "https://github.com/chrishayuk/chuk-kv-anatomist"
                },
                {
                    "label": "Watch the attention inspection",
                    "url": "/film/youtube/HJlWDSyDcD4?t=420"
                }
            ]
        },
        {
            "kind": "film",
            "youtubeId": "HJlWDSyDcD4",
            "start": 420,
            "caption": "Inside KV Anatomist. Move from the trajectory to a layer-by-head view of contributions towards an answer. The inspection gives us a candidate mechanism to test."
        },
        {
            "kind": "observation",
            "label": "KNOWLEDGE IN THE WEIGHTS; INFORMATION IN THE PROMPT",
            "text": "A familiar capital-city question can draw on associations learned during training. The film then supplies an invented fact in a document: Zarkov Industries was founded in Voltara. Now the answer can come from the supplied text. The demonstration traces a strong answer contribution to a late attention head. This gives us two concrete situations to compare—recalling a familiar fact and using new context—without assuming every fact always belongs to one isolated head or pathway."
        },
        {
            "kind": "observation",
            "label": "06 / WHAT DOES THE EIGHT-BYTE INJECTION CONTAIN?",
            "text": "The injection script makes the intervention unusually small: an answer-token ID and a coefficient. It already specifies “Volt”, derives a signal from the document-conditioned run and strengthens it for the injection. The model can then be steered towards that answer without receiving the whole document in the recipient prompt. The interesting result is that a small, correctly placed signal can change the readout. It is not an eight-byte encoding from which arbitrary facts in an unknown document have been recovered.",
            "references": [
                {
                    "label": "Read the injection script",
                    "url": "https://github.com/chrishayuk/chuk-mlx/blob/main/examples/map/02_the_injection.py"
                },
                {
                    "label": "Watch the injection",
                    "url": "/film/youtube/HJlWDSyDcD4?t=760"
                }
            ]
        },
        {
            "kind": "film",
            "youtubeId": "HJlWDSyDcD4",
            "start": 1170,
            "caption": "The Apollo document demonstration. Follow the selected window back to the passage that supplies the answer, then ask which information the system had to retain."
        },
        {
            "kind": "observation",
            "label": "AND THE 370,000-TOKEN DOCUMENT?",
            "text": "Later in the film, the Apollo example asks who won a porridge-eating contest. The system selects a stored window, loads its retained state and tokens, reads the relevant passage, and answers John Coyle with 23 bowls. The useful sequence is route → load → read → answer. The passage is still part of the mechanism. This connects the map to a practical memory system: how do we find the right place to resume reading, and what must that place retain?",
            "references": [
                {
                    "label": "Watch the document read",
                    "url": "/film/youtube/HJlWDSyDcD4?t=1170"
                },
                {
                    "label": "Follow the state question",
                    "url": "/notebook/what-has-to-survive"
                }
            ]
        },
        {
            "kind": "observation",
            "label": "07 / DOES A COORDINATE HAVE A MEANING OF ITS OWN?",
            "text": "MAP-1 tests a simple way of getting this wrong. Reorder the hidden coordinates but leave the FFN weights untouched, and the calculation changes. Reorder the coordinates and the matching weights together, and the standalone output returns, within numerical precision. Think of rearranging spreadsheet columns while updating every formula that reads them. The useful relationship survives the relabelling. A numbered coordinate does not acquire a universal meaning independently of the operations that consume it.",
            "references": [
                {
                    "label": "MAP-1 / experiment record",
                    "url": "#source-5"
                }
            ]
        },
        {
            "kind": "evidence",
            "items": [
                {
                    "label": "MAP-1 / State and reader relabelled together",
                    "status": "SUPPORTED",
                    "detail": "The recorded standalone FFN test restores its output to relative L2 ≈ 3.4 × 10⁻⁷. MAP-2b later identifies missing normalisation in that hand-rolled path. The coordinate calculation holds; whole-model behavioural parity was not established by this test."
                }
            ]
        },
        {
            "kind": "observation",
            "label": "CAN A NEIGHBOURING LAYER READ THE SAME MAP?",
            "text": "That is a harder question than renaming coordinates. MAP-2b substitutes a neighbouring layer’s FFN at the real model boundary. First it fixes the earlier baseline so putting the original FFN back is bit-identical to the unmodified run. Across eight prompts, matched random perturbation performs better than the neighbouring-layer swap on six, worse on one, and ties on one. The sample is small (two-sided sign test p = 0.125). It gives us no dependable rule that nearby layers are interchangeable readers.",
            "references": [
                {
                    "label": "MAP-2b / corrected experiment",
                    "url": "#source-6"
                }
            ]
        },
        {
            "kind": "film",
            "media": "notebook-address"
        },
        {
            "kind": "observation",
            "label": "08 / FROM A PICTURE TO A MECHANISM",
            "text": "The Mechanism continues the investigation with something we can build and inspect. Its small FFN plants six address–value pairs by hand: a query activates key directions, and their activations combine value directions into an output. The saved example recovers all six answers. This constructed memory makes the operation tangible. The repository also contains separate native-model experiments; the toy’s clean addresses are not themselves evidence that a trained model organises every fact this way.",
            "references": [
                {
                    "label": "Open The Mechanism on GitHub",
                    "url": "https://github.com/chrishayuk/the-mechanism"
                },
                {
                    "label": "Read the six-fact FFN",
                    "url": "https://github.com/chrishayuk/the-mechanism/blob/main/ffn.py"
                },
                {
                    "label": "Try the addressed-memory demo",
                    "url": "/demos/addressed-memory"
                },
                {
                    "label": "Continue: Reading by address",
                    "url": "/notebook/reading-by-address"
                }
            ]
        },
        {
            "kind": "question",
            "text": "Can the map tell us which operation belongs here?",
            "status": "OPEN",
            "detail": "Choose an unseen prompt and a real layer boundary. Can the state predict which reader will work, before we try the substitution? A useful follow-up would compare that prediction with matched controls, preserve a working baseline and measure the resulting answer distribution. The picture becomes operational when it helps us choose an intervention that succeeds."
        }
    ],
    "sources": [
        {
            "title": "Film / 370,000 tokens loaded in Context in 2.8MB, on a MacBook.",
            "url": "https://www.youtube.com/watch?v=HJlWDSyDcD4",
            "note": "Chris Hay, 24 March 2026. Selected automatic captions reviewed at 02:00, 04:00, 07:00, 12:40 and 19:30. Explanations paraphrase the film and cross-check technical terms and intervention scope against source code."
        },
        {
            "title": "CHUK MLX / map extraction, state swap and injection scripts",
            "url": "https://github.com/chrishayuk/chuk-mlx/blob/main/examples/map/01_the_map.py",
            "note": "Also reviewed examples/inference/nav_map_extract.py and examples/map/02_the_injection.py. Local source inspected 6 September 2026; code inspection is not an independent reproduction of the film. Public branch links may change."
        },
        {
            "title": "CHUK KV Anatomist / interactive inspection interface",
            "url": "https://github.com/chrishayuk/chuk-kv-anatomist",
            "note": "Reviewed DLAHeatmap, ContentProjection, InjectionTest, result types and MCP client. The interface requires a connected model inspection server; it is not a standalone hosted inference service."
        },
        {
            "title": "Full-sequence cross-task state transplant",
            "note": "Experiment EXP-20260718-002201-00277; run RUN-20260718-002202-00293. MI01 Markov write-up also reviewed. Three all-position next-token tests; registry ingestion date is not asserted as experiment date. Private source summarised for this draft."
        },
        {
            "title": "MAP-1 / coordinate-chart conjugacy",
            "note": "Experiment EXP-20260802-102358-00636; run RUN-20260802-102519-00560. Private research register reviewed 6 September 2026. Scoped summary above; raw records are not republished."
        },
        {
            "title": "MAP-2b / exact-boundary tile swap",
            "note": "Experiment EXP-20260802-114243-00642; run RUN-20260802-114306-00564. Includes baseline correction, eight-prompt comparison and normalisation caveat for the earlier hand-rolled path."
        },
        {
            "title": "The Mechanism / code and recorded demonstrations",
            "url": "https://github.com/chrishayuk/the-mechanism",
            "note": "ffn.py and ffn.json define the constructed six-fact example. Its browser adaptation links back to the source and exposes the key matches and value readout. Native-model demonstrations in the repository are separate evidence."
        }
    ]
  },
  {
    ...draft, id: "N-STATE", slug: "what-has-to-survive", title: "What has to survive?",
    dek: "The next word. The rest of the conversation.",
    abstract: "What state must a model retain to continue? This notebook distinguishes all-position residual state, a single token’s residual and persistent decode state. Full-sequence transplantation and MAP-5 test different boundaries; neither justifies compressing every conversation into one vector.",
    concepts: ["residual-stream", "model-memory", "context-engineering"], media: ["notebook-state"],
    related: ["N-MAP", "N-ADDRESS", "N-CONTEXT", "Q-RESIDUAL", "W-LARQL", "YT-TYgCRPCAFhE", "YT-HJlWDSyDcD4"],
    body: [
      { kind: "film", youtubeId: "HJlWDSyDcD4", start: 240, caption: "Swapping the residual stream. In the 370,000-token film, a donor state changes the answer to a capital-city question. This is the starting point for asking which state was transferred—and what survives into a later continuation." },
      { kind: "statement", text: "What can be rebuilt is different from what can be forgotten." },
      { kind: "observation", label: "01 / KEEPING THE STATE", text: "A cache keeps work we would otherwise repeat. If its contents can be reconstructed, we can choose another way to retain the conversation. But we still owe an account of what remains: which positions, which layer boundaries, which tokens and which metadata." },
      { kind: "comparison", objectLabel: "Two different interventions", blockLabels: ["Prompt", "Positions", "Residuals", "Continuation"], left: { label: "One position", properties: ["Replace the current token’s residual", "Earlier positions remain available to attention", "A changed next word need not persist"] }, right: { label: "The full sequence", properties: ["Replace all positions at a defined boundary", "Transfer the tested donor computation", "A different claim from persistent decode state"] } },
      { kind: "evidence", items: [{ label: "Full-sequence transplant / three conditions", status: "SUPPORTED", detail: "The recorded all-position transplant produces the donor’s next-token distribution with KL = 0 in three tested conditions at L14/L26 on Gemma 3 4B. An earlier register entry lacked an all-position patch tool; the later transplant records the completed test. The result concerns these full-sequence forward-pass interventions." }] },
      { kind: "observation", label: "02 / AFTER THE FIRST WORD", text: "MAP-5 asks whether a donor state can control a later branch. In its planets test, repeated patches work at L24 and L28 but fail at L20. That brackets the tested transition between L20 and L24. It does not establish that a universal thought appears at layer 24." },
      { kind: "refusal", title: "PERSISTENCE WAS NOT MEASURED HERE", lines: ["MAP-5’s one-shot continuation used stateless, full recomputation between calls.", "That harness does not retain the patched hidden state across decode steps.", "Bounded hot memory is not constant total memory: the documented engine also retains a growing cold tier."], principle: "Name the state before calling it sufficient." },
      { kind: "film", youtubeId: "TYgCRPCAFhE", start: 800, caption: "The residual as retained state; K/V as a hot cache. This passage discusses rebuilding attention state. The film’s memory and timing figures describe its original setup, not a new benchmark established by this notebook." },
      { kind: "question", text: "What changes when the patched state really persists?", status: "OPEN", detail: "The recorded follow-up compares residual-only, token-only and residual-plus-K/V interventions in incremental decoding. The K/V intervention work was explicitly deferred. This remains a research question, not a claim that the test has run." },
    ],
    sources: [
      { title: "Film / swapping the residual stream · 04:00", url: "https://www.youtube.com/watch?v=HJlWDSyDcD4&t=240", note: "Chris Hay, 24 March 2026. Main film for this note; chapter and selected automatic captions reviewed." },
      { title: "Film / We Don’t Need KV Cache Anymore? · 13:20", url: "https://www.youtube.com/watch?v=TYgCRPCAFhE&t=800", note: "Chris Hay, 10 March 2026. Selected automatic English captions reviewed." },
      { title: "Full-sequence cross-task state transplant", note: "Experiment EXP-20260718-002201-00277; run RUN-20260718-002202-00293. Registry ingestion date is not asserted as the experiment date." },
      { title: "MAP-5 / waypoint teleportation", note: "Experiment EXP-20260802-102422-00640; write-up v7. Distinguishes immediate-token control, later branch control and unmeasured persistence." },
      { title: "LARQL / MarkovResidualEngine specification", url: "https://github.com/chrishayuk/larql/blob/main/crates/larql-inference/docs/specs/markov-residual-engine.md", note: "Working specification reviewed 6 September 2026. Architectural preconditions and cold-tier growth matter; the live source may change." },
    ],
  },
  {
    ...draft, id: "N-ADDRESS", slug: "reading-by-address", title: "Reading by address.",
    dek: "Does memory have to be unpacked before it can be read?",
    abstract: "A visual notebook on addressed memory: a constructed six-fact FFN, native-model writing examples and the limits of relation and entity decoding. These demonstrations motivate the FFN-as-graph question; they do not establish unrestricted model editing or perfect semantic addressing.",
    concepts: ["ffn", "model-as-database", "model-memory"], media: ["notebook-address"],
    related: ["N-MAP", "N-STATE", "Q-FFN", "W-LARQL", "W-VINDEX3", "YT-g58j6DrLOZ0", "YT-8Ppw8254nLI"],
    body: [
      { kind: "film", media: "notebook-address" },
      { kind: "observation", label: "01 / AN ADDRESS, THEN A VALUE", text: "An address is useful because it lets us ask for one thing without first laying everything out. The relation narrows the question. The entity narrows it again. A value can then be written into the state that the rest of the model reads." },
      { kind: "film", youtubeId: "g58j6DrLOZ0", start: 1030, caption: "Progressive addressing. The film follows a capital-city question through the model, then explores relation generalisation and a hand-built FFN. The constructed example and the native-model captures are different kinds of evidence." },
      { kind: "observation", label: "TRY THE MECHANISM", text: "Choose one of six planted addresses, inspect the key activations and see which answer the combined output produces. The browser study uses the same vectors as the repository’s constructed FFN; switching off the matching neuron lets you try a further intervention.", references: [{ label: "Open the interactive study", url: "/demos/addressed-memory" }, { label: "The Mechanism / source code", url: "https://github.com/chrishayuk/the-mechanism" }] },
      { kind: "question", text: "What if the act of reading is choosing where to look?", status: "OPEN", detail: "The question joins representation to execution: not just whether we can draw a graph, but what a query or a write can reliably do." },
      { kind: "evidence", items: [
        { label: "Constructed example / 6 facts · 24 dimensions", status: "SUPPORTED", detail: "The hand-built FFN source records six successful reads from six planted key/value pairs. It is a small synthetic demonstration with input and output projections, not a measurement of all knowledge in Gemma." },
        { label: "Native-model demonstration / L26", status: "SUPPORTED", detail: "The saved native experiment reports three successful writes and six retention checks. This is a bounded demonstration; it does not establish arbitrary factual editing, unlimited capacity or general non-interference." },
      ] },
      { kind: "comparison", objectLabel: "Two parts of an address", blockLabels: ["Relation", "Entity", "Address", "Value"], left: { label: "Which relation?", properties: ["Capital, currency, language", "A layer-10 probe across 15 entities", "Six tested synonym variants decoded correctly"] }, right: { label: "Which entity?", properties: ["A less exact shortlist", "At L26: 0.66 paraphrase top-1", "About 0.51 cross-relation top-1"] } },
      { kind: "refusal", title: "READABLE IS NOT YET RELIABLE", lines: ["The relation probe and entity retrieval have different error profiles.", "A successful readback does not prove that a written fact will support a later chain of reasoning."], principle: "The graph has to work beyond the first answer." },
      { kind: "question", text: "Can a written fact become a step in another answer?", status: "OPEN", detail: "A useful follow-up would combine held-out entities, new relation phrasings, collision checks and multi-step use after a write. The evidence should record what operation succeeded, not just whether the model repeated the new value." },
      { kind: "film", youtubeId: "8Ppw8254nLI", start: 1290, caption: "Continue with INSERT: writing new knowledge in the LARQL film. This is the earlier software demonstration that leads into the question above." },
    ],
    sources: [
      { title: "Film / The Model Doesn’t Unpack Its Memory · 17:10", url: "https://www.youtube.com/watch?v=g58j6DrLOZ0&t=1030", note: "Chris Hay, 10 June 2026. Chapters and selected automatic captions reviewed." },
      { title: "The Mechanism / source and recorded demonstrations", url: "https://github.com/chrishayuk/the-mechanism", note: "ffn.py, ffn.json, native.json, address.json and route_sweep.json reviewed 6 September 2026. The original conveyor visual is explanatory; it is not a new measured trace." },
      { title: "Film / LLMs Are Databases — So Query Them · 21:30", url: "https://www.youtube.com/watch?v=8Ppw8254nLI&t=1290", note: "Chris Hay, 13 April 2026. The April demonstration and June mechanism film remain separate records." },
    ],
  },
];
