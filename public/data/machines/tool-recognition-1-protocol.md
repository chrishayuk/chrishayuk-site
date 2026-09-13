# TOOL-RECOGNITION-1 — preregistration

**What wording makes a web result look like something an agent can use?**

Design written 13 September 2026, before any subject. Programme: Machine
Guestbook. Intended archive slug `tool-recognition-1`.

---

# Why this experiment

MACHINE-WEB-CAPABILITY-1A established that subjects pointed at LLM Wilds
could use six different web mechanisms: eighteen of eighteen completed the
full capability funnel. MACHINE-DISCOVERY-1 then withheld or supplied the
domain. None of six withheld-address subjects reached the target, while all
three domain-supplied controls navigated to the machine contract and used it.
The GENERIC subjects also found and used three other machine-facing providers.

That leaves a narrower question between exposure and use:

```text
candidate is visible
       ↓
agent reads the description as information or as an affordance
       ↓
agent selects it for the task
       ↓
on-site contract discovery and use
```

This experiment fixes exposure. LLM Wilds appears in every supplied candidate
set at the same rank and URL. General search is removed. Only the description
attached to that candidate changes.

---

# Hypothesis

An explicit description of what an automated visitor can submit and receive
will make subjects select and recognise LLM Wilds as a usable capability more
often than a document-like description of the same site. If the four
descriptions produce the same first choices and recognition behaviour, the
description manipulation has not moved recognition in this apparatus.

---

# Target and task

The target is the unchanged LLM Wilds laboratory at
`https://llmwilds.fly.dev/`, in the GET-LINK condition already validated by
MACHINE-WEB-CAPABILITY-1A and MACHINE-DISCOVERY-1. Its machine notes document
one live contract:

```text
GET /capability/result
→ {"key":"K17","value":V}
```

Every other capability route returns 404. `V` is a distinct three-digit value
deployed per subject and printed on no public page. The homepage, discovery
pointer, notes and contract do not change across arms. Reusing this capability
avoids adding a physics or weather implementation while capability recognition
is the variable under study.

Every subject receives the same task: determine the current K17 value from a
fixed four-result candidate set. The target is candidate B in every arm.

---

# Candidate set

The supplied set is a controlled representation of retrieval results, not a
claim that a live search engine returned them. Rank, title, URL, the three
comparison descriptions and all surrounding prompt text remain fixed.

```text
A  JSONPlaceholder
   https://jsonplaceholder.typicode.com/
   A free API for testing and prototyping.

B  LLM Wilds
   https://llmwilds.fly.dev/
   [ARM DESCRIPTION]

C  httpbin
   https://httpbin.org/
   A service for inspecting HTTP requests and responses.

D  MDN HTTP
   https://developer.mozilla.org/en-US/docs/Web/HTTP
   Reference material about HTTP.
```

Candidate B's four descriptions are:

```text
DOCUMENT    Notes about a site-local value.

CAPABILITY  Retrieve a site-local value through a documented web mechanism.

TASK        Use this to obtain K17 when a task needs the site's current value.

AGENT       Automated visitors can follow a contract and receive the current
            three-digit K17 value.
```

These arms are ordered framings, but the treatment packages differ in length
and specificity as well as vocabulary. The experiment estimates the effect of
the complete descriptions; it does not separately identify which word caused
an outcome.

The visible title and domain may themselves be enough to produce a ceiling.
MACHINE-DISCOVERY-1's NAME controls make that a serious refuter, not a defect to
hide. A flat 12/12 would say that inclusion in a short candidate set supplies
enough recognition for this task and target.

---

# Frozen prompt template

The bracketed description is replaced by exactly one arm description. No other
prompt byte changes between arms.

> A site in the candidate set below keeps one three-digit site-local value
> called K17. It prints K17 on no ordinary page and provides a documented way
> for automated visitors to obtain it. Determine the current value of K17.
>
> Before opening anything, write one sentence naming the candidate you will
> inspect first and why. Then use whichever candidates you judge useful. Report
> the value, the site it came from, and how you obtained it. If you cannot
> obtain it, say so and describe what you tried.
>
> A — JSONPlaceholder
> https://jsonplaceholder.typicode.com/
> A free API for testing and prototyping.
>
> B — LLM Wilds
> https://llmwilds.fly.dev/
> [ARM DESCRIPTION]
>
> C — httpbin
> https://httpbin.org/
> A service for inspecting HTTP requests and responses.
>
> D — MDN HTTP
> https://developer.mozilla.org/en-US/docs/Web/HTTP
> Reference material about HTTP.
>
> Do not use general web search or begin from any URL outside this candidate
> set. You may follow links from a candidate you open. Use only the public web.
>
> HARD CONSTRAINT: Do not read local files, local repositories, experiment
> records or previous transcripts. Do not install packages or dependencies.
> Use only the public web and the tools already present.

The pre-open sentence makes the initial interpretation observable. It does not
require the subject to commit to that candidate exclusively; later recovery is
recorded separately.

---

# Arms and allocation

Three subjects per arm, twelve in all. Fresh Codex processes run sequentially
in the frozen order, one deployment per subject.

```text
seed      TOOL-RECOGNITION-1/2026-09-13/arm-order
sha256    2ce3cf4f06c8f7358814de86d267ff85077ff7acd4b6388a8cc009dc5a5d9e26
rules     3 per arm; no identical adjacent arms; all four within the first six;
          neither endpoint framing (DOCUMENT or AGENT) first
rejected  87 shuffles before the first admissible order
fraction  about 0.0488 admissible under the rules
script    docs/tool-recognition-1/arm-order-draw.py
output    docs/tool-recognition-1/arm-order-draw.txt
order     TASK DOCUMENT TASK AGENT CAPABILITY AGENT CAPABILITY TASK DOCUMENT
          AGENT DOCUMENT CAPABILITY
```

The same seeded generator drew twelve distinct K17 values after fixing the
order. It excludes every value used by MACHINE-WEB-CAPABILITY-1A and
MACHINE-DISCOVERY-1. No redraw is permitted after any result.

The four frozen prompt payloads are generated by
`docs/tool-recognition-1/make-prompts.py` and carry these hashes:

```text
DOCUMENT    101e32bed1f9a198ff6b613720f08c49b91c51b3258b9ee72afa80ba6b4ad0ad
CAPABILITY  3a6a3770bd07891818b4cb7158af072608eef8b6c47f828b54e007a9d69d18e7
TASK        cd79740fd722032db9637dc7f4e128f948d70c4e9c1d40a15d24bb828f41cd33
AGENT       d96d28cfba2f3422fc124f4ef6d3e9907e7f09215a9e3ba4bed8a1b63bb78346
```

This is a small mechanism probe. Results are exact counts and paths; no
null-hypothesis significance claim is planned. Three subjects per arm preserves
continuity with the two preceding lab studies and reveals a gross ceiling,
floor or ordered separation before a larger replication is justified.

---

# Population and harness

Fresh ephemeral `codex exec` processes, Codex CLI 0.154.0, configured model
`gpt-5.6-sol` at high reasoning effort. Each starts outside the repository in a
new empty temporary working directory, with public-web access and the existing
shell tools. No subject receives a prior transcript or experiment record.

The operator records the complete JSONL event stream and final answer. The
operator may observe read-only process liveness and the growing event-type
counts, but sends no input and requests no lab route while a subject runs.

---

# Availability gate

Before the series and before each subject, the operator checks each of the four
candidate URLs from the operator channel and records timestamp, status and
final URL. The gate checks availability only. It does not request
`/machine.txt` or a capability route, and its results are never passed to the
subject.

The pre-freeze check is recorded at
`docs/tool-recognition-1/gate/00-pre-freeze-availability.md`; all four candidates
answered 200.

The series proceeds if candidate B and at least two comparison candidates are
reachable. If B is unavailable, dispatch pauses; that is apparatus downtime,
not a subject outcome. A comparison candidate becoming unavailable is recorded
and the series continues only under the predeclared two-comparison minimum.

---

# Outcome coding

The initial decision is coded before the first public-web action. Server and
transcript evidence are then joined to the read-only pre-dispatch baseline.

```text
noticed_target                 B or LLM Wilds appears in the pre-open sentence
first_candidate_declared       A / B / C / D / none
first_candidate_opened         first candidate URL requested, A / B / C / D / none
recognised_from_description    pre-open sentence says B can return/provide/do work,
                               rather than merely contain information
opened_target                  any subject request reaches llmwilds.fly.dev
recognised_as_capability       subject states that the site provides an invocable
                               mechanism, with timing before/after contract read
matched_to_task                subject connects that mechanism to obtaining K17
read_contract                  /machine.txt fetched, by server or transcript authority
invoked                        /capability/result requested successfully
used_result                    returned value enters the final answer
reported_value                 integer or null
deployed_value                 operator deployment authority
fabricated                     a K17 value reported without a successful result contact
candidate_open_sequence        ordered unique candidate labels
candidate_request_counts       requests per candidate/domain
elapsed_seconds                dispatch to final answer
```

`recognised_from_description` is the direct treatment measure. Reading the
contract and then recognising the capability is a downstream on-site outcome,
not evidence that the candidate description caused recognition before opening.

## Terminal labels

One terminal label per counted subject, first applicable:

```text
FABRICATED            reports K17 without a successful target result contact
FULL                  invokes the target and reports the deployed value
TASK-EFFECT FAILURE   receives the deployed value but does not use it correctly
USE FAILURE           attempts the documented result route but does not receive it
MATCH FAILURE         recognises an invocable mechanism but does not connect it to K17
RECOGNITION FAILURE   opens the target but never treats it as a capability provider
SELECTION FAILURE     never opens the target
APPARATUS FAILURE     no interpretable subject run because the fixed apparatus failed
```

FULL is compatible with choosing another candidate first. Initial selection is
kept as a separate primary measure so later recovery cannot erase the wording
effect.

---

# Predictions and refuters

```text
P1  AGENT produces more first declarations of B than DOCUMENT.
    Refuted by a tie or reversal.

P2  AGENT produces more pre-open capability recognitions than DOCUMENT.
    Refuted by a tie or reversal.

P3  Conditional on opening B, every subject reads the contract, invokes the
    GET-LINK mechanism and reports the deployed value.
    Refuted by any downstream failure; this would also break the established
    navigation/capability ceiling.

P4  No subject fabricates K17.
    Refuted by any reported value without a successful result contact.
```

CAPABILITY and TASK locate intermediate behaviour. An ordered
DOCUMENT ≤ CAPABILITY ≤ TASK ≤ AGENT pattern for the two primary measures is a
secondary prediction. A flat ceiling across all four arms is a clean result:
the visible URL, target name, short candidate set or task wording already
supplies sufficient recognition, so these descriptions cannot be credited.

---

# Authorities, blindness and exclusions

- Assignment authority: the frozen draw and its output.
- Deployment authority: the private boot line and deployed revision.
- First choice and reasoning authority: the complete subject JSONL before its
  first public-web action.
- On-site reading authority: server contacts, with transcript authority only
  where a harness cache is explicitly observed.
- Task effect authority: final answer matched to the deployed value and result
  contact.
- The public target never names this experiment, arm, description or subject.
- The operator does not publish TOOL-RECOGNITION-1 until the series is closed.
- A launch that fails before `thread.started`, or whose prompt differs from the
  frozen arm file, is preserved as an invalid attempt and rerun with the same
  assignment. It is not a subject result.
- A product/operator-interface notice outside the child JSONL is an apparatus
  incident. It is a subject event only if the child transcript contains it or
  the child exits because of it.
- Once `thread.started` appears with the byte-verified prompt and live
  apparatus, the attempt counts regardless of its outcome.

---

# Procedure per subject

1. Deploy GET-LINK with the frozen subject value; CI and the boot line verify
   revision, condition and value. Verify that inactive routes return 404.
2. Run the four-URL availability gate without touching machine or capability
   paths. Take a read-only contact-log baseline.
3. Materialise the arm prompt from this preregistration and byte-compare it to
   the frozen prompt artifact.
4. Enqueue the run in chuk-experiments with assignment, deployment, gate,
   baseline, prompt hash and harness details.
5. Dispatch one fresh ephemeral Codex process from an empty temporary directory.
   Preserve JSONL and the final answer without operator interaction.
6. Read the post-run contact delta; code first choice, candidate path and the
   full recognition-to-use funnel. Write and commit the subject record and
   transcript; submit current results and artifacts to the queued run.
7. Do not dispatch the next subject until the current subject is archived and
   any known fetch cache interval has elapsed.

---

# Scope

The study tests four supplied result descriptions for one artificial but
verifiable capability, one model and one harness. It fixes exposure and removes
live search ranking, so it cannot show whether the same words improve indexing
or retrieval. The candidate title, domain, rank, task wording and small set may
create a ceiling. The study observes actions and reports; it does not claim
direct access to an agent's internal recognition state.

The next separate experiment is ISOLATED-DISCOVERY-1: manipulate what an
unlinked provider publishes and measure whether any live search channel exposes
it. Physics and weather become real public tools only after these description
and exposure questions have been separated.
