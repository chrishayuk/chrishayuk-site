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
    ...draft, version: "0.2", id: "N-ADDRESS", slug: "reading-by-address", title: "Reading by address.",
    dek: "Give a memory a question. Watch what it writes back.",
    abstract: "An address is a pattern a reader can respond to. This notebook follows the operation from six hand-built key–value pairs to Gemma’s evolving state: match a query, combine value directions, then read an answer. The film, source code and saved experiments show both what works and where addressing remains approximate.",
    concepts: ["ffn", "model-as-database", "model-memory", "model-representation"], media: ["notebook-address", "notebook-map"],
    related: ["N-MAP", "N-STATE", "Q-FFN", "W-LARQL", "W-VINDEX3", "YT-g58j6DrLOZ0", "YT-8Ppw8254nLI"],
    body: [
      { kind: "film", media: "notebook-address" },
      { kind: "observation", label: "01 / WHAT IS AN ADDRESS?", text: "Ask for the capital of France. France identifies the entity; capital identifies the relation you want to read. Currency would ask something different about the same place. In the opening animation, that question arrives at an FFN and a Paris direction is written into the residual stream—the model’s changing working state. The conveyor is an explanatory drawing. The address in a model is a vector of numbers, and matching it need not isolate a single neuron or a single fact." },
      { kind: "observation", label: "A LOCATION THAT A READER RECOGNISES", text: "An address here is closer to a pattern recognised by a reader than a numbered drawer. The input pattern and the weights that respond to it belong together. That connects this note to the map: a point in a picture is only useful once we know which operation reads the underlying state. We can make that relationship concrete by building a memory whose keys and values we can inspect.", references: [{ label: "Begin with the map", url: "/notebook/what-is-the-map" }] },
      { kind: "observation", label: "02 / BUILD A MEMORY WITH SIX FACTS", text: "The Mechanism’s ffn.py plants capital, currency and language facts for two invented places. Atlantis has Paris, Euro and Latin; Zerivia has Cairo, Rand and Tamil. Each full question receives its own random, normalised 24-number key. Each answer receives a value direction. We put the six keys into the rows of an input matrix and the corresponding values into an output matrix. There is no training: we choose what this little memory contains.", references: [{ label: "Read ffn.py", url: "https://github.com/chrishayuk/the-mechanism/blob/main/ffn.py" }] },
      { kind: "observation", label: "03 / MATCH → ACTIVATE → WRITE → READ", text: "Choose capital of Atlantis. The demo supplies that address’s key vector as the input, compares it with all six keys using dot products, and clips negative matches to zero with ReLU. Each remaining activation scales its value direction; adding those contributions produces the output vector. Finally, the six answer readers score that output and the highest score supplies the displayed word. This is two matrix multiplications with a nonlinearity between them, followed by an answer readout. Nothing iteratively unpacks all six facts before answering this question." },
      { kind: "connection", demonstration: "addressed-memory", text: "Choose capital of Atlantis and follow the bars to Paris. Switch to currency of Atlantis, then suppress the matching neuron. The key matches, activations and answer scores all come from the calculation you are changing.", links: [{ href: "/demos/addressed-memory", label: "Try the mechanism — choose an address" }] },
      { kind: "observation", label: "WHAT TO NOTICE WHEN YOU SWITCH A NEURON OFF", text: "The matching key scores approximately one because the input is that key itself. Other randomly chosen keys can still have positive matches, so several values may contribute. Suppressing a neuron removes its contribution from the sum; it does not erase the entire output. Watch the answer scores as well as the winning word. The demo always names the largest score, even after a destructive intervention, so a displayed answer is not a guarantee of a confident or correct read." },
      { kind: "evidence", items: [{ label: "CONSTRUCTED MEMORY / SIX READS", status: "SUPPORTED", detail: "ffn.json records 6/6 intended answers for this set of planted keys and values. The browser adaptation uses the same seed-0 vectors and is checked against independent NumPy readouts. Neuron suppression is an interactive extension, not a result reported in that saved run." }] },
      { kind: "observation", label: "THE QUESTION IS ALREADY ENCODED IN THIS DEMO", text: "Selecting a label supplies a stored key directly. This small memory does not understand the English phrase, derive a new entity–relation combination, or learn from a document. Those jobs are precisely what a real system must add. Its six successful reads also do not establish unlimited capacity: non-orthogonal keys can activate together, and adding more entries can change the combined output." },
      { kind: "film", media: "notebook-map" },
      { kind: "observation", label: "04 / PACKING AND READING ARE DIFFERENT OPERATIONS", text: "The animation adds capital, currency and language directions into one vector. Recovering every ingredient of that mixture would be a different task from applying a reader that answers one question. The film’s memory argument makes that distinction useful: storing contributions together need not mean reconstructing a complete table of facts for every read. The illustration uses constructed six-dimensional vectors. The 24-dimensional FFN demo uses separate key and value matrices. They illustrate related operations, rather than two measurements of the same model.", references: [{ label: "Vector animation source", url: "https://github.com/chrishayuk/the-mechanism/blob/main/visuals/v1_spot_in_space.py" }] },
      { kind: "film", youtubeId: "g58j6DrLOZ0", start: 1030, caption: "Australia, Sydney and Canberra. The layer readouts change as the model computes an answer. Watch the transition before treating the address as something fixed from the start." },
      { kind: "observation", label: "05 / THE MODEL HAS TO BUILD THE QUERY", text: "The film asks for Australia’s capital. Sydney becomes prominent around layer 24; Canberra leads by layer 26 and the answer settles later. These are intermediate readouts during one prediction, rather than words the model has already printed. The state reaching each FFN changes as attention and earlier FFNs update it. Addressing is therefore a process across layers. This example motivates inspecting when a useful query becomes available; the picture alone does not prove an exact database lookup." },
      { kind: "comparison", objectLabel: "Two questions about the address", blockLabels: ["Relation", "Entity", "State", "Reader"], left: { label: "What are we asking for?", properties: ["Capital, currency or language", "A probe reads relation at layer 10", "Test different words for the same relation"] }, right: { label: "Which place are we asking about?", properties: ["One of 150 tested entities", "A learned router reads the state at later layers", "Test a new phrasing or a different relation"] } },
      { kind: "observation", label: "06 / A RELATION CAN SURVIVE A CHANGE OF WORDING", text: "In address.json, a logistic-regression probe trained on capital, currency and language is tested on seat, metropolis, money, cash, tongue and speech. Each tested synonym decodes to its intended relation for all 15 entities. This says something specific about information a trained probe can recover at layer 10. It does not mean the model has exposed a universal address format, or that an unseen entity will be routed correctly.", references: [{ label: "Relation probe and results", url: "https://github.com/chrishayuk/the-mechanism/blob/main/address.json" }] },
      { kind: "observation", label: "THE ENTITY IS A LESS EXACT READ", text: "route_sweep.py trains a separate entity router at each tested layer, using capital prompts for 150 places. It then changes the wording, or asks about currency instead. At layer 26, the right entity ranks first for 66% of paraphrases and about 50.7% of the cross-relation prompts. Allowing a shortlist of five raises those figures to 86% and 76%. The entities are already present in the router’s training set; this is a test of changed questions, not held-out places.", references: [{ label: "Router experiment", url: "https://github.com/chrishayuk/the-mechanism/blob/main/route_sweep.py" }, { label: "All layer results", url: "https://github.com/chrishayuk/the-mechanism/blob/main/route_sweep.json" }] },
      { kind: "observation", label: "A SHORTLIST STILL NEEDS A WAY TO CHOOSE", text: "Layer 26 is the best tested layer for paraphrase top-five retrieval in this saved run. It is not best on every metric: layer 28 has higher top-one scores. That distinction matters for a system such as LARQL. Retrieving several plausible places may be useful if another operation can inspect them and resolve the answer. It is not yet the same contract as looking up one guaranteed row." },
      { kind: "film", youtubeId: "8Ppw8254nLI", start: 1290, caption: "The earlier LARQL INSERT demonstration. Writing a new answer turns the address question into a practical test: will the model read what we placed there?" },
      { kind: "observation", label: "07 / WRITE WHERE THE MODEL CAN READ", text: "The separate native.py demonstration edits Gemma 3 4B at layer 26. It first captures the FFN input for each target question, removes directions shared with competing addresses, then alters a gate row, an up-projection row and a down-projection column. The gate and up rows respond to the selected address; the down column writes an answer direction. A subsequent ordinary forward pass reads the changed weights. This is a weight edit, unlike swapping the transient residual state in the map experiment.", references: [{ label: "Read the native-model write", url: "https://github.com/chrishayuk/the-mechanism/blob/main/native.py" }, { label: "Compare the residual swap", url: "/notebook/what-is-the-map" }] },
      { kind: "evidence", items: [{ label: "NATIVE WRITE / THREE TARGETS", status: "SUPPORTED", detail: "native.json records 3/3 successful target reads: capital of Zelandia → Oslo, currency of Qtaria → Yen, and language of Vornholt → Welsh. Six control prompts retain their original top-ranked next token. The controls check those six outputs; they do not establish that unrelated behaviour is unchanged everywhere." }] },
      { kind: "refusal", title: "A READBACK IS ONLY THE FIRST TEST", lines: ["Six planted reads do not measure the capacity of a trained model.", "Decoding a relation and identifying an entity are different tests.", "Three successful writes do not establish unrestricted editing or multi-step use."], principle: "Specify the question, the reader and the operation that actually succeeded." },
      { kind: "question", text: "Can a written fact become a step in another answer?", status: "OPEN", detail: "After writing a capital, ask a new question that requires using it. Compare an exact readback with paraphrases, held-out entities, competing facts and a second reasoning step. Record both target success and changes to control prompts. That would test whether an address supports a useful operation beyond repeating its stored value." },
      { kind: "connection", text: "The map follows the changing state. This note examines a reader of that state. LARQL asks how to turn those operations into something we can query; VINDEX3 asks how the model’s parts and relationships should be represented.", links: [{ href: "/work/larql", label: "LARQL / the work" }, { href: "/work/vindex3", label: "VINDEX3 / the representation" }, { href: "/notebook/what-has-to-survive", label: "Next question / what has to survive?" }] },
    ],
    sources: [
      { title: "Film / The Model Doesn’t Unpack Its Memory · 17:10", url: "https://www.youtube.com/watch?v=g58j6DrLOZ0&t=1030", note: "Chris Hay, 10 June 2026. Selected automatic English captions reviewed alongside the code and recorded outputs. The film supplies the explanation; saved runs define the numerical claims." },
      { title: "The Mechanism / constructed memory", url: "https://github.com/chrishayuk/the-mechanism/blob/main/ffn.py", note: "ffn.py and ffn.json reviewed 6 September 2026. Six keys, 24 dimensions, six successful reads. The browser study records its source revision and file hash." },
      { title: "Native-model writing / recorded result", url: "https://github.com/chrishayuk/the-mechanism/blob/main/native.json", note: "Read alongside native.py: Gemma 3 4B, L26, three target writes, six top-token retention checks. Separate from the constructed FFN and the earlier LARQL film." },
      { title: "Relation probe / saved results", url: "https://github.com/chrishayuk/the-mechanism/blob/main/address.json", note: "Layer 10, logistic regression, 15 entities and six tested synonym variants." },
      { title: "Entity routing / layer sweep", url: "https://github.com/chrishayuk/the-mechanism/blob/main/route_sweep.json", note: "150 entities; held-out phrasing and cross-relation tests on entities used in training. Layer 26 peaks on paraphrase top-five, not all metrics. Read alongside route_sweep.py." },
      { title: "Film / LLMs Are Databases — So Query Them · 21:30", url: "https://www.youtube.com/watch?v=8Ppw8254nLI&t=1290", note: "Chris Hay, 13 April 2026. The earlier software demonstration remains a separate source." },
      { title: "The Mechanism / original visual studies", url: "https://github.com/chrishayuk/the-mechanism/tree/main/visuals", note: "v1_spot_in_space.py and v3_conveyor.py. Constructed illustrations, not measured trajectories or native-model traces." },
    ],
  },
];
