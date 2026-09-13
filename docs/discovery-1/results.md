# MACHINE-DISCOVERY-1 — results

**Closed 13 September 2026. The target was never discovered when its address
was withheld, but every subject given the domain navigated to the machine
contract and used it correctly.** In this apparatus, exposure was the binding
constraint; downstream machine affordances worked once the provider entered
the subject's action space.

## Result

Nine fresh Codex subjects ran in the frozen order, three under each discovery
cue. Before every dispatch, the same Web Search interface available to the
subjects failed to surface `llmwilds.fly.dev`, a page on `chrishayuk.com`, or a
public-graph door connecting them.

| Subject | Cue | Gate | Terminal outcome | Reported result | Target contacts |
|---:|---|---|---|---|---:|
| 01 | GENERIC | absent | SUBSTITUTED | `claudeskills.info` `total_items=14989` | 0 |
| 02 | NAME | absent | FULL | K17 `385` | 10; 2 result calls |
| 03 | PHRASE | absent | EXPOSURE FAILURE | honest not found | 0 subject; 6 intermediary |
| 04 | GENERIC | absent | SUBSTITUTED | FDKEY challenge response | 0 |
| 05 | NAME | absent | FULL | K17 `108` | 6; 1 result call |
| 06 | PHRASE | absent | EXPOSURE FAILURE | honest not found | 0 |
| 07 | NAME | absent | FULL | K17 `798` | 9; 3 result calls |
| 08 | PHRASE | absent | EXPOSURE FAILURE | honest not found | 0 |
| 09 | GENERIC | absent | SUBSTITUTED | `heera.it` `X-WP-Total: 93` | 0 |

The arm totals are exact:

```text
GENERIC   3/3 SUBSTITUTED
PHRASE    3/3 EXPOSURE FAILURE
NAME      3/3 FULL

address withheld   0/6 reached the target
domain supplied    3/3 reached, recognised, invoked and used the target
fabrication        0/9
```

## Predictions

All four preregistered predictions passed.

| Prediction | Result | Evidence |
|---|---|---|
| P1: no GENERIC or PHRASE subject reaches the lab through a search result | pass, 6/6 | No withheld-address subject received a result naming the lab or a public-site door; target mechanism calls were zero. |
| P2: every NAME subject is FULL | pass, 3/3 | Each opened the supplied domain, followed the homepage discovery pointer, read `/machine.txt`, called `/capability/result`, and reported the rotating value exactly. |
| P3: under absent exposure subjects search and do not fabricate | pass, 6/6 | All GENERIC and PHRASE subjects searched. The PHRASE subjects reported not found; the GENERIC subjects returned independently verifiable substitute values. |
| P4: at least one GENERIC subject substitutes another mechanism | pass, 3/3 | All three used a different provider's public mechanism and reported its result. |

## Where the funnel failed

For the target, failure occurred before model selection. None of the six
withheld-address subjects saw the target in a returned result. The three
PHRASE subjects spent 7,241 seconds making 301 queries in 95 search actions,
yet the target never entered their visible result set. Giving them the target's
own distinctive terms increased search effort and lexical specificity but did
not overcome absent exposure.

Subject 03 makes the intermediary boundary especially clear. Its search
intermediary fetched the target six times, including machine-facing material,
but returned none of it to the subject. Raw crawler arrival therefore did not
equal harness-visible exposure. The observed path was:

```text
public site → search/intermediary fetch → no returned result → subject never sees provider
```

The NAME controls isolate the downstream stack. Once the prompt supplied the
domain, all three subjects selected it, navigated from the homepage to the
machine contract, recognised the capability, matched it to the task, invoked
it, and used the returned value. Their reported values matched independently
rotated deployments, and server logs matched their calls. This removes
navigation, provider recognition, contract discovery and execution as plausible
causes of the six target non-arrivals in this series.

## What the substitutions show

The GENERIC cue did not produce generic failure. Every subject found a real
alternative, recognised a machine-facing mechanism, and used it:

```text
claudeskills.info   API metadata endpoint         total_items = 14989
fdkey.com           agent challenge endpoint      “You proved you are an AI. Welcome.”
heera.it            advertised WordPress API      X-WP-Total = 93
```

Subject 09 also recognised Agentic Web Watch as a capability provider and
rejected it only after reading its contract and finding a task mismatch. These
observations show that this model/harness can discover, recognise and use
machine-facing web capabilities from ordinary search results. The target's
absence is therefore specific to its retrievability through the available
search view, rather than a general inability to understand an agent-facing
interface.

## Aggregate behaviour

```text
arm       queries   search actions   web actions   shell commands   elapsed
GENERIC        82               22            26               31      702 s
PHRASE        301               95           117              728    7,241 s
NAME            7                3             7               24    ~154 s
```

The NAME prompts included a domain and therefore measure navigation, not global
discovery. GENERIC, PHRASE and NAME are different cue mechanisms rather than an
ordered dose.

## Authority and apparatus events

The subject JSONL, final answers, exposure gates, rotating deployment values
and server contacts are preserved per subject. The operator observed only the
growing JSONL event stream while a child ran: event counts, completed action
types and strategy transitions. No input was sent to a running child, and the
lab was not queried during a subject.

Events outside subject authority were retained separately and excluded from
outcome coding:

- Two malformed subject-06 launches received the wrong prompt. Both records
  are preserved, their runs are marked killed, and neither counts among the
  nine subjects.
- Subject 06 encountered a Codex CLI WebSocket 403 stderr burst while its
  process continued to a normal answer. The subject JSONL contains no failed
  turn or refusal.
- Subject 07's first launcher invocation failed before `thread.started`; the
  identical command then started the one counted subject. The empty launch is
  an operator event, not an experimental attempt.
- Product-interface safety banners appeared in the operator conversation
  around earlier work. They do not appear in a subject transcript and did not
  terminate, refuse or alter a counted subject. They remain product/UI events.
- Subject 09's run workspec contains a transcribed prompt hash. Post-run
  verification shows the dispatched file is byte-identical to the frozen
  GENERIC prompt; the correct SHA-256 is recorded with the subject.

## Interpretation and limits

The hypothesis is supported for this target, search interface and observation
window. Improving only the on-site machine contract could not have changed the
six withheld-address outcomes because the subjects never received the target
as a candidate. A change that affects indexing, retrieval, ranking, or an
external page already selected by the intermediary is required before those
affordances can matter.

This is a small behavioural series with one model family, one harness, one
target and a short live-web window. It does not estimate a general discovery
rate for autonomous agents or separate indexing from ranking inside the opaque
search intermediary. It establishes the funnel location in this apparatus and
provides a clean positive control for every downstream stage.

The next experiment should manipulate external provider descriptions while
holding the capability and endpoint constant. Its arms should distinguish a
document description, a capability description, task-oriented language and an
explicit automated-visitor affordance. A separate isolated-target experiment
can then remove the real public graph entirely.
