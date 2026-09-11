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
| 4 | parity | incidental | | | |
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
