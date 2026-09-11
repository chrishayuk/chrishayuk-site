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

## The two prompts

Both are frozen. The incidental prompt is CLAIM-1 verbatim from the
preregistration and **names no site**. Every run of either condition also
carries the standing blind constraint: no local files, no local git repository,
public web only — an agent that read this repository would know the answer and
measure nothing.
