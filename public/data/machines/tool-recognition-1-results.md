# TOOL-RECOGNITION-1 — results

**Closed 13 September 2026. Description wording did not change which candidate
the subjects selected, but it completely changed whether their pre-open
explanation represented that candidate as an operative capability.** All twelve
subjects selected LLM Wilds first and completed the task. Pre-open capability
recognition was 0/3 under DOCUMENT and 9/9 across CAPABILITY, TASK and AGENT.

## Result

Twelve fresh Codex subjects ran in the frozen order, three under each external
description. LLM Wilds remained candidate B at the same rank, title and URL;
only its one-line description changed. Every pre-dispatch gate found all four
candidates available.

| Description | First declared B | First opened B | Pre-open capability recognition | FULL |
|---|---:|---:|---:|---:|
| DOCUMENT | 3/3 | 3/3 | 0/3 | 3/3 |
| CAPABILITY | 3/3 | 3/3 | 3/3 | 3/3 |
| TASK | 3/3 | 3/3 | 3/3 | 3/3 |
| AGENT | 3/3 | 3/3 | 3/3 | 3/3 |
| **All subjects** | **12/12** | **12/12** | **9/12** | **12/12** |

Every FULL subject opened the target, followed the homepage discovery pointer,
read `/machine.txt`, invoked `GET /capability/result`, and reported the
independently deployed rotating value. No subject fabricated a value.

## The distinction the manipulation exposed

The descriptions produced two observable pre-open representations of the same
candidate.

DOCUMENT subjects selected B because it mentioned a site-local value. Their
sentences described it as a relevant place to inspect or the likely source of
K17:

```text
“its description specifically mentions a site-local value”
“making it the most likely source of K17”
```

None said, before opening, that B could return, provide or do work. All three
recognised the invocable capability only after reading the site.

CAPABILITY, TASK and AGENT subjects selected the same candidate but described
it as already actionable:

```text
CAPABILITY  “a documented web mechanism for retrieving a site-local value”
TASK        “it provides the site's current K17 value”
AGENT       “a contract for automated visitors to obtain K17”
```

The operative descriptions therefore changed the reason given for the click,
not the click itself. In this fixed candidate set, DOCUMENT made B look like
something relevant to read; the other three framings made it look like
something the subject could use.

## Predictions

The preregistered hypothesis had separate selection and recognition claims, so
the verdict is mixed.

| Prediction | Result | Evidence |
|---|---|---|
| P1: AGENT produces more first declarations of B than DOCUMENT | refuted | Both were 3/3; selection was at ceiling in every arm. |
| P2: AGENT produces more pre-open capability recognitions than DOCUMENT | supported | AGENT was 3/3 and DOCUMENT was 0/3 under the frozen behavioural rule. |
| P3: every subject opening B completes the downstream chain | supported, 12/12 | All read the contract, invoked the result route and reported the deployed value. |
| P4: no subject fabricates K17 | supported, 12/12 | Every reported value matched a successful server contact and the private deployment authority. |

The secondary ordered prediction was uninformative for selection because all
four arms were 3/3. Recognition showed a step rather than a graded series:
`DOCUMENT 0/3`, then `CAPABILITY = TASK = AGENT = 3/3`. This experiment does
not identify a benefit from task wording over capability wording, or from
automated-visitor wording over either one.

## Interpretation

The result does not show that wording is irrelevant to selection in general.
The task itself said that one candidate held K17, and even the DOCUMENT
description contained the unusually diagnostic phrase “site-local value.” In
a four-result set whose other descriptions were plainly unrelated, that
lexical match was enough to make B the first choice every time. The fixed rank,
visible provider name and small set may also have contributed to the ceiling.

What the experiment does establish in this apparatus is narrower: a candidate
can be selected as relevant without first being represented as a capability.
One-line capability, task and automated-visitor descriptions caused every
subject to state the operative affordance before paying the cost of opening the
site; document wording did not do so once in three trials.

That distinction matters at the search-result boundary, where an agent must
plan from titles and snippets before it has read a provider's contract. A less
ceilinged follow-up can test whether this pre-open representation changes
selection when several candidates are plausibly relevant.

## Authority and apparatus events

The frozen prompts, complete subject JSONL, exact final answers, availability
gates, rotating deployment values and server contacts are preserved for every
subject. The behavioural code uses only the required sentence emitted before
the first public-web action; it is evidence about the subject's stated
representation, not direct access to an internal mental state.

Two mistyped Chuk queue records were cancelled before dispatch and remain in
the archive as operator metadata incidents. One local launcher typo and the
initial incompatible launcher invocation for subject 01 also failed before a
counted process began. Several counted subjects had a first curl fail at local
DNS resolution and then retried without intervention; all completed normally.
Incidental crawler contacts were separated from subject contacts by the
transcripts and server log. None of these events changed an assignment, prompt,
counted outcome or terminal label.

## Scope and next experiment

This is a small mechanism probe with one model, one harness, one artificial
capability and three subjects per description. It fixes exposure and removes
live search ranking, so it does not show whether these descriptions improve
indexing, retrieval or ranking on the public web.

The clean next test is a less obvious candidate set in which multiple results
are lexically relevant and the target's descriptions vary along the same
document-to-affordance dimension. Selection can then move. The separate
ISOLATED-DISCOVERY-1 should still test what makes an unlinked provider appear
in a real harness-visible search result at all.
