# I7 — faithful transmission preserves an injected error

**The registered error-propagation primary passed.** Qwen executed **29 renewals
of corrupted records**, preserving every entry of the injected table each time.
All four corrupted lineages retained live descendants at generation6, with two
correct and two incorrect composed routes per table. Eight incorrect routes followed
the injected wrong destinations through actual renewed descendants. Generations3–6
earned **42 resources versus 69** with intact records, a contrast of **−27**.

No entry-changing, function-changing, function-improving or fully repairing renewal
occurred. This is error persistence with a measured aggregate cost under the current
interface. It is not selection among competing variants or evidence that agents
cannot repair errors when given identifying information.

## Prospective record and inherited provenance

Canonical [I7](https://chuk-experiments-server.fly.dev/#/experiments/ecology-inheritance-i7),
`EXP-20260913-143802-00833`, run `RUN-20260913-144529-00925`, programme
`cell-native-architectures`. Registration commit
`c5e01fc0a5358023786550f685c95fd4e2f12a51` was uploaded and verified at
2026-09-13T14:46:04.486236Z, before world gates completed at 14:46:43.406491Z.
All 24 passing gates were uploaded and verified at 14:47:32.027623Z, before inference
started at 14:48:25.787409Z. Inference ended at 14:55:38.097753Z; the frozen audit
passed all 12 checks at 14:56:03.742767Z.

Starting states are all four actual I6 `write_seeded` generation3 states, after two
historical generations of Qwen writing. They come from completed source run
`RUN-20260913-132239-00914`, full-result SHA256
`a1ef383c7c6513be137a0fefb4c73d8765b947e2dcde837b2b20da47de1a145d`.
The historical producer remains GPT-5.5 from I4, `RUN-20260913-113222-00890`.
Neither the producer nor the first two generations was rerun or represented as a
newly sampled action. Prior agents' histories and private state were not supplied.

## Intervention and information available

Each actual starting state was cloned into two branches. `intact` was unchanged.
`corrupt` swapped stage2's destinations at r0 and r1, leaving stage1, the other two
stage2 entries, id, expiry, next-id counter and scoring calibration unchanged.
The swap is schema-valid and changes two of four composed destinations. It was
applied once before generation3, without an intervention label in the model input.

The writing system, observation format, objective, action costs, expiry and model
settings are exactly I6's. A valid wrong rewrite executes without truth checking
or repair. The full current table remains visible and preservation is explicitly
instructed. The true world stays fixed and scores correct ROUTE actions at 3, wrong
ones at 0. A renewal consumes a job opportunity and keeps the new record live through
the end of the next generation. Repeated renewals do not compound that lifetime.

There are four measured generations, **g3–g6**, with two sequential fresh agents
and two opportunities per agent per branch: **128 calls**. Each fresh agent starts
with empty OWN; only its own first-action receipt appears at its second decision.
The receipt exposes the raw action and earned resources but not the correct answer
or the previous job signal as a separate field. Successors see no earlier agents'
task feedback unless reflected in a rewritten table. No forced test, shared diagnostic
log, competing variant or truth oracle is supplied to the live model.

## Results

| Measure | Intact | Corrupt |
|---|---:|---:|
| Calls / parsed / executed | 64 / 64 / 64 | 64 / 64 / 64 |
| Resources, g3–g6 | **69** | **42** |
| Correct routes / route requests | 23 / 32 | 14 / 32 |
| Successful full-table renewals | 27 | **29** |
| Unchanged-parent renewals | 27 | **29** |
| Needed renewals at action time | 15 | 16 |
| Entry or function-changing renewals | 0 | **0** |
| Function-improving / full-repair renewals | 0 / 0 | **0 / 0** |
| Live lineages at start of g6 | 4 | **4** |
| Fully functional lineages at start of g6 | 4 | 0 |
| Exact injected descendants at start of g6 | 0 | **4** |
| Wrong routes following injected descendants after renewal | 0 | **8** |
| Failed route followed by renewal in the same life | 9 | **18** |
| Changed payload after those failed routes | 0 | **0** |
| Generated tokens | 1,762 | 1,879 |

Every corrupted record retained six correct entries out of eight and two correct
composed routes out of four. Across the four lineages, available correct composed
routes at each generation start stayed at **8/16**, versus **16/16** in intact.
The original supplied record id does not count as a new descendant: exact injected
descendant counts were 0,4,4,4 at starts of g3,g4,g5,g6. All 29 subsequent written
payloads were normalized-entry-identical to the injected table. The error neither
expanded nor repaired itself; it was faithfully transmitted.

| Generation | Intact resources | Corrupt resources | Corrupt − intact |
|---|---:|---:|---:|
| 3 | 18 | 12 | −6 |
| 4 | 18 | 9 | −9 |
| 5 | 18 | 12 | −6 |
| 6 | 15 | 9 | −6 |

| Map | Intact resources | Corrupt resources | Corrupt − intact |
|---|---:|---:|---:|
| 0 | 18 | 12 | −6 |
| 1 | 15 | 18 | **+3** |
| 2 | 12 | 0 | −12 |
| 3 | 24 | 12 | −12 |

The aggregate loss is not a loss on every map. Map1 improved by 3 despite its table
having fewer correct entries. In a descriptive comparison of matched routing slots,
ten correct intact decisions became incorrect, one incorrect intact decision became
correct, thirteen were correct in both and eight incorrect in both. This compares
realised trajectories: after their first decision the branches may also differ in
their own-action receipts, record ids and later actions. It is not a repeated set
of independent single-field interventions.

The intact anchor remained functional, and **all 64 requests and all 64 replies
matched the corresponding I6 suffix exactly**. Each arm had 64 unique requests.
There was no infrastructure failure, malformed action or execution refusal in I7.

## What continued copying after failure means

Eighteen corrupted-branch agents saw their own ROUTE earn zero and then renewed the
same table without changing an entry. That is an observed response to a receipt,
not proof that they had enough evidence to identify the wrong entry or its replacement.
Zero reward does not supply a correct destination, and a wrong route can also come
from misusing an otherwise correct table: the intact branch itself had nine such
failed-route→unchanged-renewal sequences. The assay therefore cannot conclude that
the model knowingly preserved false information or failed to learn a uniquely
identified correction.

The eight descendant-following wrong routes are a narrower count than all eighteen
wrong routes in the corrupted branch. They require an originally affected signal,
a destination matching both the current descendant and the injected table, and
disagreement with the unchanged world. The other ten wrong routes do not satisfy
that attribution rule; they are not silently counted as following the injected error.

Corrupt renewals were 8,7,8,6 by map, versus 7,7,8,5 intact. Thirteen corrupted
renewals were redundant within their generation, versus twelve intact. Corrupt
made six renewals in the final generation and intact four, despite no subsequent
payoff within the measured horizon. Both maintained their records through g6;
extinction times are right-censored, not estimates of indefinite survival.

## Interpretation and validation

I6 showed faithful transmission of useful visible information. I7 shows that the
same writing behaviour can faithfully transmit a valid but less accurate table,
with descendants later directing some incorrect actions and reducing aggregate
reward. Fidelity is therefore distinct from functional correctness in this assay.

No competition or fitness-weighted reproduction occurs. The harness retains one
record per branch; lower reward does not itself remove that record. The observed
absence of repair or extinction is not a demonstration of selection failing, nor
of cultural evolution already occurring. It establishes a variation-and-transmission
primitive and measures its consequences. General repair ability, informative shared
feedback, partial visibility, multiple variants and spontaneous institution creation
remain outside this panel.

All **24 world gates** and **12 frozen audit checks** passed. A scripted preserving
policy scored 156 intact versus 78 corrupted; a truth-informed scripted repair policy
restored all four lineages and scored 144 in either branch. Those are mechanical
controls with access to truth, not agents given the live model's information. A
consumer-only control lost its records at g4 without being counted as repair.
The audit independently rebuilt the intervention, requests, payloads, actions,
expiry, rewards and primary before checking metric replay, metadata and chronology.

**128 local calls, 3,641 generated tokens, 432.310 seconds, no retries or hidden
thinking.** All registered bounds held. Full-result SHA256:
`e850edd6b205d7de4b110c1bdba8bece9ff709ed8da68b1b369b93861549c14e`.
Canonical results include named numeric metrics, this write-up, conclusion, frozen
registration/source, gates, full result and durable raw-call/audit evidence. The local
`server.json` records the verified server identifiers, hashes and completed lifecycle.

I7 is closed. A subsequent repair experiment should separately define what reliable
diagnostic evidence agents receive and how it persists across identities, before
inference. No feedback mechanism, competing variant or extra generation is added to
this completed registration.
