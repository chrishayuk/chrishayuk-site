# I2 — does useful inheritance extend to another recipient family?

Prospective replication, programme `cell-native-architectures`, canonical slug
`ecology-inheritance-i2`. I1 is completed and known before this design. Its first
Qwen successor earned 7 versus 3 resources and did not renew the record. Those
historical observations motivate this experiment and are not new replications.

## Question and scope

A fresh `gemma4:e4b` recipient will acquire and use the same Sol-maintained record,
earning more resources than its matched record-removal control. This tests another
recipient family while retaining the producer, task, interface and economics.
The locally installed Gemma checkpoint was selected before any I2 model calls;
its reported parameter size is 8.0B, despite the e4b tag. It is not selected using
performance on this maintenance world. Its old A1B constant-READ result is known.

Also repeat `qwen3.5:9b` as a contemporaneous anchor. This is one paired lineage
per recipient, not an independent-world replication, model-size experiment,
second producer test or test of a general training-class effect. Model family and
weights are not independently manipulated; serving metadata is recorded. A separate task-world
replication remains a separate design; changing both here would obscure attribution.

## Exact intervention

Reuse I1's historical Sol source: SOL1 none, A1B14 necessary-arm generation1,
run `RUN-20260913-082940-00857`, full-result SHA256
`7077246bdd7f673622ccd374d616aa11ce093bd97d978ba487142f80a515706f`.
Sol actually executed READ n0, REFRESH n0, WORK t0 and created n1. The record copies
the supplied founder text; it is not Sol-invented content. No new Sol inference.

Use I1's unchanged dynamic decision stream and A1B14 physics, parser, system text,
resource values and four-generation objective. Fork at generation2: retain live n1
or remove only n1, preserving next_id=2. No founder remains. Fresh private state,
KEY, tasks, resources and own history at generations2,3,4. Three actions each.
Only genuinely renewed records survive into successors. No record replenishment,
automatic key grants, label hints, forced actions or producer history. Transport
model name is the only request field changed for Gemma. The installed models report
the same chat-template hash and quantization label; their weights differ. No model
identity is added to prompt messages.

Fixed order: all 18 Qwen decisions, then all 18 Gemma decisions. Within each panel,
generation ascending, turn ascending, inherit before removed, exactly as I1.
This avoids repeated loading; order is not randomized and may confound a cross-model
comparison if the serving environment drifts. Verify metadata before and after.
Never omit Gemma because the Qwen anchor differs, or select an alternative model.

## Outcomes frozen before inference

Primary: Gemma's inherited generation2 acquires k0, executes at least one gated
WORK t0 and ends with strictly more resources than its removed control. Report
all three components and the resource contrast, regardless of outcome. The Qwen
anchor has the same separate criterion. If the anchor fails, report its divergence
and qualify cross-run interpretation; do not turn it into a reason to suppress data.

Secondary for each model: exact actions; parse and actual execution counts;
capability acquisitions; gated work; requested/executed REFRESH; recipient-created
descendants and live records at each generation start; resources and retain-minus-
remove contrasts at each generation and in total. Recipient-maintained survival
requires executed REFRESH in generations2 and3 and recipient-created descendants
at the start of generations3 and4. Sustained useful inheritance additionally
requires gated work in both later generations. Terminal-generation REFRESH does
not demonstrate persistence. Measure exact Qwen action and analysis agreement
against I1 without requiring it for inclusion.

These are finite deterministic panels. Generations and repeated identical inputs
are not independent replicates. Report no population probabilities, significance
tests or inferred internal mechanisms. A primary failure with poor parsing is
reported as interface-limited; a parsed refusal is not infrastructure failure.
Successful inheritance and unsuccessful renewal can coexist.

## Execution and evidence contract

Pin both installed digests and model/template metadata in i2_config.json before
any world gate or inference. Ollama 0.33.3, think:false, temperature0, stream:false,
same request settings as I1. Whole replies go to the unchanged parser, with no
salvage, explanatory suffix removal or retries. No API keys or paid calls required.
At most 36 requests, 1200 seconds total and 600 seconds per model, at most120 seconds
per request including loading. Maximum64 UTF-8 visible bytes; empty responses,
hidden thinking, truncation, transport/model mismatch, metadata drift or exceeded
limits stop the entire run as infrastructure/cost failure. Keep all attempted
requests and available raw responses. Short malformed actions remain observations.
No replacement candidates, adaptive prompts or selective reruns.

Use pinned binary SHA256
`f904de2064947861595fb0d20222b732153dbae0bb6c0668d34323e371540752`.
Commit/upload frozen design, config and all imported source dependencies, preserving
I1 and SOL1 provenance and registration chronology. Verify canonical source hashes.
Before inference run and upload zero-inference gates: exact historical source and
I1 replay; matched initial requests; only model transport field differs; historical
first inputs match; founder expiry; reset of private histories; removal prevents
key acquisition; scripted consumption versus maintenance scorers; full-response
parsing. Freeze an independent post-run auditor with the source. Audit raw calls,
every request/world transition, scores, model identity and execution chronology.

Upload named numeric metrics, raw responses, traces, audit, write-up and conclusion
to chuk-experiments. Verify artifact hashes, write-up and completed lifecycle states.
Local evidence and Git are working copies; unrelated work is excluded.
