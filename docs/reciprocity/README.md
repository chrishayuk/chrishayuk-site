# MACHINE-RECIPROCITY-1 — transcripts

Complete transcripts, one file per arm, written **before** any funnel coding
happens. The preregistration is `docs/machine-reciprocity-1.md`.

A coding that cannot be checked against its source is an assertion rather than a
measurement, so the summary never replaces the transcript. That includes the
runs where the agent never reached the site: those are the cells that separate a
discovery failure from a declined bargain, and keeping only the ones that
reached here would leave a file of successes and call it a result.

## Arm order

Drawn once from a pre-announced seed, before any arm ran. Monotone, and it
stands — see the preregistration for what that costs and the reverse-order
replication it obliges.

```text
seed    MACHINE-RECIPROCITY-1/2026-09-11/arm-order
sha256  b26c26952711b91c050c6a5fd24dbebd89d7b167e2b3bc3b0e21cec5b9b23f36
```

| # | reward | visit | file |
|---|--------|-------|------|
| 1 | none | incidental | `arm-1-none-incidental.md` |
| 2 | none | sent-here | `arm-2-none-sent-here.md` |
| 3 | parity | sent-here | `arm-3-parity-sent-here.md` |
| 4 | parity | incidental | `arm-4-parity-incidental.md` |
| 5 | superior | sent-here | `arm-5-superior-sent-here.md` |
| 6 | superior | incidental | `arm-6-superior-incidental.md` |

## Before each reward level

`MACHINE_REWARD` is server-side, so a level change is a deployment, not a
request parameter. It is set in `fly.toml` and deployment is push-triggered, so
**changing the arm is a commit** — which is the point: the arm the site was
serving is recoverable from the git history rather than from machine state
nobody logged.

**Confirm the deployed arm before running any cell, and record the check in the
transcript.** Running a cell against the previous level is the one failure that
would be invisible afterwards, and it would invalidate both cells rather than
one. Check the deployed commit as well as the behaviour: a push that failed CI
leaves the previous arm running and says nothing about it.

```sh
curl -s https://chrishayuk.com/api/health          # must be the arm's commit
curl -s -o /dev/null -w '%{http_code}\n' \
  'https://chrishayuk.com/api/machines/ask?question=test&function=verifier'
#   404 -> none        200 -> parity or superior
curl -s https://chrishayuk.com/llms.txt | grep -c 'machines/ask'
#   0 -> none          >0 with function= -> superior          >0 without -> parity
```

## Running results

| # | reward | visit | reached | declared | note |
|---|--------|-------|---------|----------|------|
| 1 | none | incidental | **no** | — | never found the site; primary outcome undefined, not zero |
| 2 | none | sent-here | yes | **no** | read the bargain, quoted it back, declined |
| 3 | parity | sent-here | yes | **no** | `/api/search` returned 0 twice; never fell back to the advertised surface that returns 5 and 52 |
| 4 | parity | incidental | **no** | — | never found the site; 17 sources surveyed, none of them this one |
| 5 | superior | sent-here | | | |
| 6 | superior | incidental | | | |

## The two prompts

Both are frozen. The incidental prompt is CLAIM-1 verbatim from the
preregistration and **names no site**. Every run of either condition also
carries the standing blind constraint: no local files, no local git repository,
public web only — an agent that read this repository would know the answer and
measure nothing.

## Coding rules

Written before the first transcript was read. Coding a funnel after seeing the
outcome is how a run produces the number its author expected, so each stage below
names the evidence that settles it and the evidence that does not.

Every stage is coded from the **transcript** (the agent's tool calls, not its
closing summary) and cross-checked against the **server record** where the server
can see it. Where the two disagree, both are reported and the disagreement is the
finding — that has happened twice in MACHINE-VISIT-1 and was informative both
times.

```text
reached_the_site          a request to chrishayuk.com appears in the tool calls.
                          Server-visible. A search result that merely MENTIONS
                          the domain is not a visit.

noticed_machine_surface   the transcript shows the agent registering that a
                          machine-facing surface exists — fetching /llms.txt,
                          reading the Link header, following the robots.txt
                          comment, or saying so. NOT satisfied by fetching an
                          ordinary page that happens to be machine-readable.

opened_it                 a request to /llms.txt or to any /api/machines/* path.
                          Server-visible.

validated                 a request carrying ?validate=1. Transcript ONLY — the
                          readership store keeps paths, not query strings, and
                          cannot distinguish this from a declaration.

declared                  a request to /api/machines/declaration carrying at
                          least one recognised field, or a 201 receipt in the
                          transcript. Server-visible as contact; the transcript
                          is what separates it from a validation or a bare
                          contract fetch.

used_enhanced_retrieval   a request to /api/machines/ask. Structurally
                          impossible under `none`, where the endpoint is 404, so
                          it is coded NOT APPLICABLE rather than zero in those
                          two cells. Recording a forced zero as a behavioural
                          one would understate the three-level comparison.

returned_to_task          after touching the machine surface, the agent resumes
                          CLAIM-1 and delivers a conclusion. Distinguishes an
                          affordance that cost an interruption from one that
                          derailed the visit.
```

**Primary outcome:** `declared`, conditional on `reached_the_site`.

A cell where the agent never reached the site is **not a declined bargain** and
must never be pooled with one. It is recorded, kept, and reported as a discovery
outcome — the funnel's first stage failing is a result about the task and the
open web, not about this site's interface.

## Found during the run, to act on after it

**Not while it is running.** The corpus and the discovery topology are held
constant across all six cells. Repairing any of this between arms would make the
arms incomparable and convert findings into artefacts.

### 1. `/api/search` and `/api/machines/ask` disagree over the same corpus

Reported as `friction: discovery` by arm 3's visitor, which found the site's own
primary evidence only by noticing a path in a telemetry dump. Reproduced:

```text
query                                /api/search   /api/machines/ask
"llms.txt"                                     0     5 matched
"agent discovery machine readable"             0    52 matched
"llms"                                         5
"guestbook"                                    0
```

The cause is not the corpus — 36 of 264 records mention machine, llms, agent or
guestbook. `searchGraph` requires every term to match in one record and does not
narrow; `ask` narrows a question to the terms the corpus contains and says so in
`shaping`. `"llms.txt"` fails where `"llms"` succeeds because the whole string
is matched as written.

This is the pattern this codebase already has a name for: **a contract existing
twice without a parity assertion between the copies.** Two retrieval surfaces
over one corpus, with different query semantics, and nothing asserting a
relationship. The fix is to derive one from the other or to assert their
agreement, and to add the test — not to patch the symptom.

### 2. The observer perturbs what it measures

Every run fetches `/api/readership`, which is a counted machine path. It now
logs itself, but the deeper problem is that the readership store keeps an hour
rather than a timestamp, so operator and visitor traffic in the same hour cannot
be separated after the fact by any field in the data. A prospective ledger is
the only thing that works, and it must be started before the first request
rather than after the first arm.

### 3. `MACHINE_OBSERVATORY_TOKEN` is unset

`/machine-observatory` 404s, so declaration rows cannot be read remotely. Path
contact plus the transcript was sufficient here because every answer was zero,
and it would not have been sufficient for a non-zero one.
