> Public copy, 11 October 2026. Operational hostnames and trial prefixes are replaced with stable aliases. Timestamps, answers, codes and verdicts are unchanged. Private schedules, datasets, run order and secrets are not included; their recorded hashes remain in the freeze. Original and public copy hashes are in provenance.json. Historical interpretations are retained; the article distinguishes observations from unproven mechanisms.

# NATIVE-001b amendment v1.1 result: link vs constructed URL

| Arm | Destination presented as | Trials | Code correct | Server received the code-page request | Verdict |
| --- | --- | --- | --- | --- | --- |
| A, frozen Phase 0b | plain text `code/heron/` | P0b-1, P0b-2 | 0/2 (none invented; asked the user to paste) | **0/2** (ChatGPT reported "inaccessible"; the URL was independently reachable) | FAIL 2/2 |
| B, amendment | `<a href="code/heron/">` (only change) | P0c-1, P0c-2 | **2/2** exact | **2/2**, each 1.2 s after the index | PASS 2/2 |

**Pre-registered interpretation (v1.1):** both hyperlink trials passed, so there is **strong preliminary evidence that
link availability, not server capability, caused the Phase 0b failure.** In this setup (consumer ChatGPT, Thinking
Medium, memory off), the browsing tool followed a hyperlink on a fetched page to a server-computed page, and
refused the same destination when it had to construct the URL from text.

**Scope:**
- n = 2 per arm, one assistant, one mode, one host.
- Not tested: whether URLs that appear as plain text but are *complete absolute URLs* are allowed. Ours was a relative path that ChatGPT had to resolve.
- Not tested: search-result provenance.

**Unchanged:**
- Phase 0b's frozen verdict stays **FAIL**.
- **The 16 main trials stay suspended.** Redesigning them (e.g. link-complete input menus) is a separate decision.

**Design implication, if it generalises:** a web-native service for consumer ChatGPT should be **link-complete**: an
entry page plus browsable input-selection links leading to task-specific result pages, closer to a navigable
decision tree than an API with documented URL templates.
