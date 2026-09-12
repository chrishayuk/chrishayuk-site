# A1B12 — external artefact elicits repeated POST with own-action memory cleared

The registered first-step external-artefact pattern was **supported**. Both artefact-present
cells chose valid POST t1:h; both artefact-absent cells chose WORK t0, whether the original
three-POST own-action history was retained or cleared. The mean first-step external
contrast was +1, memory contrast 0 and interaction 0.

Across three steps, the artefact-present cells posted throughout. Memory-only produced
WORK, WORK, POST. Clearing both records produced WORK throughout. Thus own-action history
was not required for repeated elicitation by this external artefact on the frozen panel.

Canonical experiment: `ecology-culture-a1b12` / `EXP-20260912-223132-00794`.
Run: `RUN-20260912-223622-00822`. Programme: `cell-native-architectures`.
Prospective source commit: `8fafe13a05728166c245a8e073e0b84b4880912e`.

## Complete 2×2 results

Each branch starts from a fork of A1B11's actual three-POST history, with the designated
records retained or removed. Every step has the same current world observation.

| External artefact | Own-action memory | Step 1 | Step 2 | Step 3 | Valid POST |
|---|---|---|---|---|---|
| Present | Retained | POST | POST | POST | 3/3 |
| Present | Cleared each step | POST | POST | POST | 3/3 |
| Absent | Retained | WORK | WORK | POST | 1/3 |
| Absent | Cleared each step | WORK | WORK | WORK | 0/3 |

All POST responses were POST t1:h; all WORK responses were WORK t0. Every whole response
parsed and executed. Both registered exact first-step reference responses reproduced.

## First-step factorial

| Contrast in valid-POST indicator | Value |
|---|---|
| External artefact, memory retained | +1 |
| External artefact, memory cleared | +1 |
| Own memory, artefact present | 0 |
| Own memory, artefact absent | 0 |
| Mean external effect | +1 |
| Mean memory effect | 0 |
| External × memory interaction | 0 |

At the first step these are exact single-factor input comparisons: artefact presence
changes only the ARCHIVE section, and memory presence changes only OWN_ACTIONS contents.
The specified artefact intervention changed the action with and without supplied own
history. The own-history intervention did not change the first action at either level
of artefact presence. This is a local text-input effect, not an isolated model-internal
mechanism or a general claim that autobiographical memory is irrelevant.

## Three-step continuation and its limits

Artefact-only repeated POST with OWN_ACTIONS=[] every time. The reset baseline repeated
WORK with the same empty history and no ARCHIVE. Each of those conditions repeated one
identical complete request three times. Their consistency establishes repeat elicitation
on these inputs; it is not learning, three independent behavioural samples, or evidence
that the model maintained an artefact autonomously.

The artefact-plus-memory branch also kept posting while its actual action history grew.
The memory-only branch reproduced WORK/WORK/POST; a post-run comparison confirmed that
its three realized requests and responses exactly match A1B11 B_repeated d4–6. Only its
first step was a registered reference check; the full trajectory match is descriptive.

The three-step mean contrasts were external-at-retained-memory +2/3, external-at-cleared-memory
+1, memory-at-present-artefact 0, and memory-at-absent-artefact +1/3. Their means were
external +5/6 and memory +1/6, interaction −1/3. These are finite continuation summaries,
not population effect sizes. Later retained histories depend on earlier outputs, so the
first-step controlled comparison remains distinct from the window summaries.

The memory-only POST at step 3 matters: the artefact is not necessary for **every** POST.
Own-action memory can accompany recurrence even when it did not preserve uninterrupted
posting. Conversely, artefact-only POST shows that own-action history is not necessary
for repeated elicitation in this panel. Neither observation establishes permanent
internalisation or a learned change to model weights.

## What carries the effect here

The stronger supported claim is specific: keeping this externally supplied peer-action
artefact available was sufficient to elicit POST on all three tested steps, including
when the actual own-action history was cleared on every call. The no-record comparison
chose WORK. This supports an external behavioural cue in this interface, without requiring
the agent to retain its prior actions.

Both experimental memory channels are supplied in the prompt. “Own-action memory” is
not biological or parameter-level internal memory, and “external artefact” is not a live
autonomously maintained institution. A harness decided what to show, copied records,
reset the worlds and kept the artefact present. No agent produced or maintained the
shared record during this experiment; its content remained the supplied scripted peer
POST from the previous design. No horizontal transmission, consensus or norm emergence
is established.

The reset baseline clears these two records but retains common system instructions,
the resource objective, action grammar and initial inert board. It is not context-free.
The source history is one actual A1B11 continuation state. Two initial requests had
known prior outcomes, openly registered as such. Generalisation to other histories,
wording, models, longer horizons or real shared files remains untested.

## Verification and provenance

- Design registered on the server at 2026-09-12 22:31:32 UTC.
- Frozen source/config and actual source-history provenance uploaded and verified at
  22:36:55 UTC, before new world checks.
- **15/15 zero-inference gates** passed; upload verified at 22:38:11 UTC.
- Inference ran 22:39:38–22:39:53 UTC: **12 calls, 55 generated tokens, 14.69 seconds**.
- Model qwen3.5:9b, digest
  `6488c96fa5faab64bb65cbd30d4289e20e6130ef535a93ef9a49f42eda893ea7`,
  Ollama 0.33.3, temperature 0, think false; metadata unchanged before/after.
- **12/12 parsed and executed**, no errors, retries, thinking or truncation; maximum
  response 9 UTF-8 bytes, maximum individual call 4.77 seconds.
- **15/15 post-run audit checks** passed: full calls, source hashes and chronology,
  exact clearing/retention, artefact removal, no extra user state, world replay,
  independently recomputed primary/contrasts, reference identity and repeated-input agreement.
- Eight distinct complete requests occurred across twelve calls. Repeated requests
  always produced identical responses in this run.

Result SHA256: `f5989f67588121f51c0432dec441f35423c99637159de06be13a235ffe54e0a5`.
Raw-call SHA256: `5a33f7e6ea9d04580218f4058802c202b2b0568379439064fd6aea6eb7330979`.
Canonical storage includes source/config and prior history, gates, complete requests
and responses, action traces, audit, numeric metrics, conclusion and this write-up,
with verified artifact hashes. Local receipt: `a1b12_server.json`.

## Closure

A1B12 closes with the first-step primary supported and repeated external elicitation
observed through the three-step window. It separates these two supplied record channels
under the exact interface; it does not demonstrate autonomous cultural persistence.
No new model, artefact variant or longer run is included. Any successor must register
its own intervention and provenance before inference.


Downloadable evidence:

- [a1b12-preregistration](https://drive.google.com/file/d/1P_eJBz7K-12VqQDFGWSGlFaM-VLIeEpp/view)
- [a1b12-frozen-source](https://drive.google.com/file/d/1tcrvBChe75FH-mXTf_4YWxUY60c7yeoF/view)
- [a1b12-gates](https://drive.google.com/file/d/1BCL_oeuZC5ZOJL5lCx9UBPRDUWnlWsnj/view)
- [a1b12-detailed-result](https://drive.google.com/file/d/1S-i0bJ6uDhAsOi96_yE8LJeKWZGmxDLU/view)
- [a1b12-results-note](https://drive.google.com/file/d/1X6Em92Ioa-yxoLq85aASOpnpmhSArZ7P/view)
- [a1b12-evidence-bundle](https://drive.google.com/file/d/1CckwfBZQhiIHA_NgymjKS-FjhF-QKeQG/view)
