# TOOL-RECOGNITION-2 — result

**Supported in this apparatus: describing the same provider as an operative
capability changed both how the agent represented it and which provider it
selected.** CAPABILITY was 6/6 for pre-open recognition, first declaration of
B and first request of B. DOCUMENT was 0/6 on all three outcomes; every subject
selected A, OpenStax. All six paired scenarios changed in the predicted
direction, and all twelve subjects returned the correct velocities.

```text
                         CAPABILITY    DOCUMENT
recognised B pre-open       6/6           0/6
declared B first            6/6           0/6
requested B first           6/6           0/6
TARGET FULL                 4/6           0/6
SUBSTITUTE FULL             2/6           6/6
correct answer              6/6           6/6
```

The treatment changed only B's supplied description:

```text
DOCUMENT    Notes on one-dimensional elastic collisions.
CAPABILITY  Run a one-dimensional elastic-collision calculation.
```

The title, URL, rank, target, endpoint, task and three competitors were held
fixed. Each of six numeric scenarios appeared once in each arm.

## Primary result

Every CAPABILITY subject described B before opening anything as something that
could perform the calculation, then declared B first and requested its URL
first. Every DOCUMENT subject described A as the source of equations, declared
A first and requested A first without mentioning B.

The frozen four-state coding therefore has only two occupied cells:

```text
CAPABILITY   6  RECOGNISED + SELECTED B
DOCUMENT     6  NEITHER
```

The unpaired two-sided Fisher exact check for either primary count is
`2 / choose(12, 6) = 0.0021645`. More appropriately for the frozen scenario
pairs, all six pairs were discordant in the predicted direction; the two-sided
exact paired check is `2 × 0.5^6 = 0.03125`. These are descriptive uncertainty
checks for a small mechanism probe, not population estimates.

## Paired paths

| Scenario | CAPABILITY path | DOCUMENT path |
| --- | --- | --- |
| S1 | 02: B recognised → B requested → B used | 07: A declared → A used |
| S2 | 01: B recognised → B requested → fetch blocked → A used | 12: A declared → A used |
| S3 | 04: B recognised → B requested → B used | 08: A declared → A used |
| S4 | 06: B recognised → B requested → B used | 11: A declared → A used |
| S5 | 10: B recognised → B requested → B used | 05: A declared → A used |
| S6 | 09: B recognised → B requested → fetch blocked → A used | 03: A declared → A used |

All six scenario pairs changed both recognition and first choice from B under
CAPABILITY to A under DOCUMENT. No subject recognised B but selected another
candidate, and no subject selected B without recognising it.

## Downstream control and apparatus event

The product web fetcher rejected B as unsafe in all six CAPABILITY subjects.
This happened after each subject had written its protected pre-open sentence
and requested B. The frozen `first_candidate_opened` rule is the first candidate
URL requested, so the event does not change either primary count. It does mean
that “first open” here must not be read as “first successful page load.”

Four subjects recovered through the already-installed command-line HTTP client.
Each reached the target page, followed its machine contract, invoked the hosted
physics operation and used the returned values. The server independently
records exactly twelve subject-attributable contacts: four page requests, four
contract requests and four successful operation calls. Those four subjects are
`TARGET FULL`.

Subjects 01 and 09 instead opened A after B was rejected and used OpenStax to
answer correctly. They are `SUBSTITUTE FULL`; no target request reached the
server. The six DOCUMENT subjects also used A and are `SUBSTITUTE FULL`.

Prediction P3 is supported for the population it conditions on: every subject
whose request actually reached the target completed the full target funnel,
4/4. The safety block prevents interpreting downstream provider use or elapsed
time as a clean arm comparison. Prediction P4 is supported: 12/12 answers named
the provider actually used, all were correct, and no target result was credited
without a successful operation in the server record.

The per-subject gate exposed an apparatus gap. Its shell-level fetch returned
200 with the frozen target hashes before every dispatch, while the subject's
product web fetcher rejected the same URL. The gate verified public reachability
but did not reproduce the product fetcher's safety transformation. This is a
systematic harness event, not a model refusal or evidence that the provider was
unavailable on the public web.

## What the result establishes

P1 is supported: CAPABILITY exceeded DOCUMENT on both protected primary
outcomes, 6/6 versus 0/6. P2 is also supported, 6/6 versus 0/6. The earlier
semantic representation effect now has a behavioural counterpart under a more
competitive supplied candidate set:

> Document-like wording made the target look like material about the task;
> operative wording made it look like a way to perform the task, and that
> changed which provider the agents chose first.

This design does not separately identify recognition as a mediator. The same
description treatment caused the observed recognition and selection changes,
and the two outcomes co-occurred perfectly. It also estimates behaviour at one
fixed rank in a supplied candidate list, with one model and harness. It does not
show how live search would rank the page, which particular word caused the
effect, or whether the result generalises to other tasks and agents.

The practical design implication is narrow and actionable: describe a web
capability with a verb and the work it performs. For example, “Run a rigid-body
simulation and receive collision timings” exposes an affordance more clearly
than “Notes on rigid-body simulation.” A later replication should use another
model and a product-fetch-compatible target or a gate that exercises the exact
subject fetch channel.

## Provenance

The protocol and generated inputs were frozen at
`chrishayuk/chrishayuk-site@825c22ed8ead6572689841b81bd98ac7fd81ce42`.
The target adapter was fixed at
`chrishayuk/llmwilds@edb034a976f81f128598897a976e0ac74a253777`.
Each subject has its verbatim Codex JSONL, final answer, read-only contact slice,
gate, baseline and coded record under `docs/tool-recognition-2/`. The final
server audit is `docs/tool-recognition-2/gate/15-final-server-audit.json`.
