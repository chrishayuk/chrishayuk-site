> Public copy, 11 October 2026. Operational hostnames and trial prefixes are replaced with stable aliases. Timestamps, answers, codes and verdicts are unchanged. Private schedules, datasets, run order and secrets are not included; their recorded hashes remain in the freeze. Original and public copy hashes are in provenance.json. Historical interpretations are retained; the article distinguishes observations from unproven mechanisms.

# NATIVE-001b Phase 0b verdict: FAIL (0/2 PASS, 2/2 FAIL)

Under both trials, consumer ChatGPT (Thinking Medium, memory off):
- retrieved the supplied index page (ChatGPT-User/1.0);
- read the instruction and **constructed the correct absolute URL** for `code/heron/`;
- reported it inaccessible. **No request reached the server.**
- The URL was independently verified reachable within ~40 s each time.
- **No code was invented.** Both answers asked the user to paste the page.

**Gate:** per the frozen protocol, the consumer arm stops. **The 16 main trials don't run** as designed.

**Interpretation (a hypothesis consistent with all observations so far, not yet tested directly):** the consumer
browsing tool opens URLs supplied by the user, appearing in search results, or **linked** on a fetched page, and
refuses URLs the model constructs. Every sub-page fetched in NATIVE-001 was hyperlinked; `code/heron/` here was
plain text. A direct test (the same page with `code/heron/` as a hyperlink) would confirm or refute this, and needs
a versioned amendment.

**Implication if confirmed:** for consumer ChatGPT, an agent-native web service must be **link-complete**. Every
result must be reachable by following links (or supplied by the user). Parameterised URL patterns alone aren't usable.

**Separate observation (once per new host, here and in NATIVE-001):** OAI-SearchBot fetched `/robots.txt` within ~12 s of the
first ChatGPT-User fetch to a new host.
