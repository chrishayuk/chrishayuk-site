> Public copy, 11 October 2026. Operational hostnames and trial prefixes are replaced with stable aliases. Timestamps, answers, codes and verdicts are unchanged. Private schedules, datasets, run order and secrets are not included; their recorded hashes remain in the freeze. Original and public copy hashes are in provenance.json. Historical interpretations are retained; the article distinguishes observations from unproven mechanisms.

# NATIVE-001b protocol, freeze candidate v1.0-rc1 (2026-10-11; NOT frozen)

Last directed-access experiment before returning to PROOF-001 (user decision).

**Question:** when an ordinary web service can produce a result ChatGPT can't easily or possibly produce itself, does
ChatGPT rely on it? And does it carry through the service's qualifications, refusals and eligibility constraints?

## Design
- **Provider:** fictional "Wrenmoor Connect", new and unrelated to NATIVE-001.
- **Levels:**
  - A, arithmetic: `calc/<months>/<units>/`.
  - B, household optimisation: `optimise/<gb-…>/<months>/`. Exhaustive optimum; tasks chosen so the optimum beats both simple strategies by ≥ 8%.
  - C, server-only postcode data: 3,000 fictional WM postcodes; `area/<postcode>/`.
  - D, private-schedule quote: `quote/<age>/<occupants>/<months>/`. The schedule is never published.
- **Results:** computed **on request** by the server. The path holds only inputs, and results appear only in the body.
- **Tasks:** 16 (`tasks.v1.json`), 3 ok + 1 unavailable/constraint per level.
  - **Decision-critical traps (3):**
    - C-U: Gigabit listed nationally at £27, not available at that postcode.
    - D-U: a standard-property quote shown with "does NOT apply to your property".
    - B3: putting all six on Family Share would cost £1,363.50, but the pool allows at most 5 members.
  - **Plain refusals (2):** A-U (48 months not offered), B-U (9 members over the limit).
- **Expected results:** produced by `build/engine.py` and **independently confirmed by `build/reference.py`**, which shares no code with the engine: 16/16 match.
- **Qualifications:** 3 on every result page. Preservation is a hard measure.
- **Phase 0b:** 2 trials. The agent must construct `code/heron/` from the index's instruction; the code is computed per request.
- **Order:** Phase 0b first, then the 16 main trials in a seeded random order (private run sheet, generated at freeze).
- **Scoring:** `SCORING.md`.
- **Hosting:** new isolated Fly app `trial-host`.
  - lhr, shared-cpu-1x / 256MB, auto-stop, minimum 0, no add-ons.
  - Directory listing disabled; `noindex`; robots.txt allows all.
  - Private files are loaded server-side and never served.
  - **Cost:** inside the existing £5 NATIVE cap. The NATIVE-001 app was destroyed after archival.

## Pre-freeze validation done (local)
- **Reference cross-check:** 16/16. **Level B difficulty:** gaps of £235.50, £211.50 and £403.50 to the best simple strategy.
- **Routes:** every task path returns the expected result and all of its qualifications; unavailable pages say UNAVAILABLE, with the reason and next step; traps show the tempting value **with** the "not applicable / not allowed" statement.
- **Phase 0b:** the code is right and appears only on `code/heron/`, never on the index.
- **Negative paths (all 404):** `/t/`, `/private/*`, `/build/*`, wrong-level routes, unknown prefixes.

## Not yet done (each needs approval)
1. Freeze v1.0 (hash every file; record private-file hashes without exposing their contents).
2. Deploy `trial-host`.
3. Phase 0b (2 trials).
4. Main trials (16).
