# I10 — Sol repairs three eligible maps; complete-panel competence remains unsupported

**Mixed result: the registered four-map component primary failed, while every
eligible assembly succeeded.** Sol produced correct patch values on all four maps,
but diagnosis and protected-entry identification were exact on three. The same
fourth map failed both set tasks and was excluded from assembly. On the three
eligible maps, Sol assembled exact corrected records with zero collateral changes.

Canonical: [I10](https://chuk-experiments-server.fly.dev/#/experiments/ecology-inheritance-i10).
Experiment `EXP-20260913-215046-00841`; run `RUN-20260913-215623-00943`.
Prospective source commit `0d44c634472c54d9acc22510a864dfd7162c2c69`.

## Results against the frozen Qwen comparison

| Task | Sol exact | Qwen I9 exact | Sol correct entries | Qwen correct entries |
|---|---:|---:|---:|---:|
| Diagnosis: wrong relay keys | 3/4 | 0/4 | 15/16 classifications | 8/16 |
| Patch values with verified target keys | 4/4 | 1/4 | 8/8 values | 3/8 |
| Preservation: already-correct relay keys | 3/4 | 0/4 | 15/16 classifications | 8/16 |
| Conditional full-record assembly | 3/3 eligible | Unmeasured | 24/24 entries | Unmeasured |

All fifteen Sol replies were valid whole-response JSON. Joint component competence
was **3/4**, below the registered 4/4 criterion. End-to-end four-map success was
therefore false. The conditional assembly secondary was positive: three exact
assemblies, six corrected target values, zero collateral changes to stage1 or
protected stage2, and zero component-success/assembly-failure cases. This is a
selected three-map result, not four-map assembly reliability. Map 2 assembly was
unmeasured; Qwen I9 admitted no maps, so no Qwen-versus-Sol assembly accuracy
contrast exists.

Relative to historical Qwen I9, Sol produced three additional exact answers in
each component task. Per-entry gains were seven classification decisions for
diagnosis, five destination values for patches and seven classifications for
preservation. Both models obeyed the supplied patch key boundary on 4/4 maps.
Sol improved the values inside that boundary to 8/8, with zero collateral assignments.

## The remaining error: overdiagnosis of a correct entry

All four source records had incorrect r0/r1 values and correct r2/r3 values.
Maps 0, 1, 3 passed every component. On map 2:

* Diagnosis returned `["r0","r1","r2"]`; expected `["r0","r1"]`.
* Preservation returned `["r3"]`; expected `["r2","r3"]`.
* Patch returned `{"r0":"d1","r1":"d0"}`, exactly correct.

The live source's `r2:d3` entry was already correct. The diagnosis falsely included
r2 and the independent preservation answer omitted it. These are complementary
errors in separate fresh tasks, not evidence that one answer contaminated another.
The two target values were supplied under mechanically verified target keys, so
correct patch values do not rescue localization. No patch value for r2 was requested,
and no map 2 assembly was made. Thus this is an observed false positive about what
needs repair, not an observed destructive edit. An unvalidated defender could be
exposed to that risk, but no such downstream outcome was executed here.

## What ran

I10 preserved I9's exact system and user message bytes, damaged records, stage1
mappings, public sixteen-row diagnostic grids, task ordering and scoring. Twelve
fresh component requests used `gpt-5.6-sol` with reasoning none through Responses.
No tools, structured-output forcing, private answers or previous responses were
added. Patch requests alone received verified TARGET_KEYS. Historical Qwen was
not rerun. The hosted transport omitted temperature as in the earlier Sol battery;
Qwen used Ollama temperature0. This is a model/transport comparison, not an isolated
scale, training or sampling intervention. Every returned model id was `gpt-5.6-sol`;
the hosted alias is not a pinned weight digest.

After all twelve component calls, the independent public-evidence scorer verified
the raw responses and scores. The component results and five-check audit were
persisted before deriving eligibility. Only maps 0, 1, 3 entered assembly. Each received
the original damaged record and its actual correct Sol CHANGE_KEYS/PATCH/KEEP_KEYS
outputs. No diagnostic grid, oracle substitution or revised component answer was
supplied at assembly. The resulting three complete JSON records exactly matched
publicly reconstructible truth.

## What this establishes

Sol demonstrates localized correction-value competence on all four cases, and
successful diagnosis, protection identification and assisted assembly on three.
This materially improves on Qwen's component results in the same text interface,
but does not meet the registered complete-panel competence bar. The remaining
false-positive localization matters for a defender: knowing replacement values
for verified targets is different from reliably deciding every field that should
be edited or protected.

The source error locations were fixed at r0/r1, and each cell was sampled once.
Do not generalize these counts into a population reliability estimate. Separate
fresh-task success does not prove internal knowledge availability in I8's live
maintenance decisions. This assay did not execute writeback into a shared world,
quarantine, defender removal, successor inheritance or population reward. It is
not yet a demonstrated strong-defender/weak-population architecture. Nor would
failure by another model alone establish an interface cause.

## Verification, cost and provenance

All 14 prospective gates passed before inference. The component audit passed 5/5;
the final frozen raw audit passed 12/12. It checked exact messages, independent
public-evidence scores, eligibility, actual supplied answers, chronology, identity,
usage and cost. No model retries, prompt changes, hidden reasoning or output salvage.

**15 calls, 336 output tokens, zero reasoning tokens.** API usage reported 7,286 input
tokens. Estimated cost was **$0.035864**; conservative metered cost **$0.04315**,
within the registered $1 ceiling. Wall time was 27.393419 seconds. Token totals by
task: diagnosis 47, patch 68, preservation 41, assembly 180. Pricing estimates use
the frozen rates from the [official Sol model page](https://developers.openai.com/api/docs/models/gpt-5.6-sol);
they are not a billing receipt.

The model-access wait is preserved honestly: registration/gates were complete
before the temporary credential became available. Source upload was verified at
2026-09-13T21:57:01.759426Z; gates passed 21:57:12.834550Z and were uploaded/verified
21:58:19.272432Z. The read-only access check returned HTTP 200 at 22:21:46.928598Z.
Inference ran 22:21:51.609739Z–22:22:19.003172Z. The component audit completed
22:22:13.876766Z, with derived assembly requests persisted at 22:22:13.876915Z.
The final audit completed 22:22:19.009194Z. No credential was written to experiment
files; evidence was checked for credential markers before upload.

The canonical record stores numeric results, this write-up, conclusion, completed
lifecycle and six durable artifacts: preregistration, frozen source, gates, full
result, results note and evidence bundle. The bundle includes raw requests/replies,
access report, component outputs/audit, derived assembly inputs, final audit and
historical readiness note. Local `server.json` retains artifact hashes and server ids.
I9 parent run `RUN-20260913-212813-00940`, result SHA256
`f3ae878f3ec85713945dd13314043a3fb5560c2488acf2a32a9c66851d7fd3f4`.

## Next boundary

A later live defender test should separately validate edit scope and values before
writeback and then measure whether fresh Qwen successors use and preserve the
actual corrected descendant. The present result warrants testing that controlled
handoff, while retaining the map 2 false-positive boundary. No failed component is
retried and no ineligible map is rescued inside I10. Live correction and inheritance
remain separate, unexecuted questions.
