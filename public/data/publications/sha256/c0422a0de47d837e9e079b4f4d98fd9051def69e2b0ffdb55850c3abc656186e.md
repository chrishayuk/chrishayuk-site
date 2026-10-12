> Public copy, 11 October 2026. Operational hostnames and trial prefixes are replaced with stable aliases. Timestamps, answers, codes and verdicts are unchanged. Private schedules, datasets, run order and secrets are not included; their recorded hashes remain in the freeze. Original and public copy hashes are in provenance.json. Historical interpretations are retained; the article distinguishes observations from unproven mechanisms.

# NATIVE-001b amendment v1.1: link vs constructed URL (2026-10-11, user decision after Phase 0b FAIL)

**v1.0 is preserved unchanged** (`FREEZE.json`, `private/trials.v1.0.json`). The Phase 0b result stays **FAIL (0/2)**.
**The 16 main trials stay suspended whatever v1.1 shows.** A hyperlink PASS does not retroactively pass Phase 0b;
any redesign of the main trials is a separate decision.

## Question
Did P0b fail because `code/heron/` was presented as **text** (a URL ChatGPT had to construct) rather than a **hyperlink**?

## Single change (one variable)

| Arm | Index page | Trials |
| --- | --- | --- |
| A, frozen baseline (P0b) | "…open `code/heron/` (relative to this page)" as plain text | P0b-1, P0b-2: FAIL 2/2 (kept) |
| B, amendment (P0c) | **Identical wording**, with `code/heron/` as `<a href="code/heron/">`. That is the only difference (verified by diff) | P0c-1, P0c-2: **fresh unguessable prefixes** |

Everything else is identical:
- the server (only change: the existing code route also answers P0c prefixes);
- the code rule: HMAC of the prefix plus "heron", computed per request;
- the prompt (the same P0b text from `prompts.v1.json`);
- the session setup (fresh ChatGPT chat, Thinking Medium, memory off, operator doesn't open the links);
- the scoring rule.

**PASS:** the exact code **and** a server-log GET of that trial's `code/heron/`.
**FAIL:** no code and no request for that path, while the URL was independently verified reachable (±10 min).
**INCONCLUSIVE:** anything else, which gets investigated, not reinterpreted.

## Interpretation (fixed now)
- **P0c 2/2 PASS:** strong preliminary evidence that **link availability**, not server capability, caused the P0b failure.
- **P0c fails too:** investigate other restrictions (URL provenance, a host-level block, the tool) before any redesign.
- **Mixed:** reported as mixed. No conclusion about the mechanism.

## Local validation before freezing
- The P0b and P0c pages differ only by the hyperlink.
- The code is correct on `code/heron/` for all four prefixes and absent from every index page.
- The main-task routes are unchanged.
