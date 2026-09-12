# Agent ecology / working notebook thread

Three draft records, written 13 September 2026 from chuk-experiments records A1B3–A1B12:

1. **The message board did not create a culture.** A1B3 reading requests, A1B4 scripted return, A1B5 discovery and supplied experience.
2. **A successful behaviour is not necessarily contagious.** A1B8 action reminder, A1B9 transfer, A1B10 representation, A1B11 withdrawal. A1B6–7 provide the earlier representation controls in the evidence.
3. **The world can remember for the agent.** A1B12 separates the externally supplied artefact from actual own-action history.

`/thread/agent-ecology` supplies the reading order. Home and Notebook link to it; records and membership project into the graph, Ask, sitemap, structured data and llms.txt. The notes are explicitly drafts, not immutable published snapshots. No publication dates or completed autonomous-maintenance result are manufactured.

## Evidence boundaries

- A1B3: offline READ requests, not demonstrated useful consumption. The server import is retrospective; original inputs were frozen before inference.
- A1B4: scripts only, no model. A1B5: one model with a scripted recipient. Without POST there was no exposure to the delayed return.
- A1B6 used explicitly counterfactual summaries; it does not show indifference to genuine reward. A1B7's checker failure and amendment remain in its source report.
- A1B8: first-action reminder effect at fixed genuine scripted payoff; no identified internal imitation mechanism.
- A1B9: no eligible natural POST predecessor in the replacement channel. The conditional transmission rate is unobserved, not zero. Retaining the seed also changes record count.
- A1B10: self/peer wording separates prose responses only. The stronger cross-format prediction failed.
- A1B11: withdrawal yielded a later POST in every arm, not total extinction. The registered repeated-exposure advantage was absent. Cross-experiment interface changes do not isolate one enabling change.
- A1B12: own memory means supplied action records, not weights. Two first inputs are known anchors. The artefact-only branch repeats an identical complete request. The harness maintains the artefact; autonomous maintenance remains untested.

## Replays

`EcologyReplay` uses the same reader controls as the Cell80 histories: Play/Pause, Step, Back, Reset and a labelled scrubber. Playback starts paused, stops at the endpoint and pauses when hidden or outside the viewport. Paired conditions share the playback position; changing a condition pauses at that position for comparison.

- A1B5: 72 saved world events across four sessions. Each lane shows the donor, scripted recipient, board, known-hint state and resources. Episode resets are visible; layout depicts roles, not coordinates.
- A1B9: compare replacement with seed retention, starting from POST or WORK. Six decisions per lane.
- A1B11: compare one exposure with three, then removal. Actual own-history records remain inspectable.
- A1B12: compare artefact present/absent with own history cleared/retained. Three decisions per lane.

Decision replays have an input boundary and a recorded-action boundary, with no interpolated internal reasoning. Exact user records and complete request hashes are inspectable. Outcome tables remain available without playing. The A1B8 reminder selector is a four-input comparison, not a time series.

`public/data/ecology/evidence.json` preserves selected registry metrics and source references. Ten local detailed results were SHA-256 matched to registered artifacts. Source report files preserve exact latest write-up text (A1B3 v2; A1B4–12 v1) retrieved through MCP. Drive artifacts were not downloaded again.

Rebuild the replay projection from the original evidence directory:

```sh
python3 scripts/build-ecology-replays.py /path/to/ecology-culture-results
```

The exporter rejects changed source hashes and copies observed boundaries only. `tests/ecology.test.ts` checks report hashes, replay-source hashes, world continuity/reset, counts against registry metrics, memory clearing, withdrawal, the late memory-only POST, unobserved transmission denominators and graph/Ask membership.

The browser integration reported no available browser during implementation. Markup, data, compilation and deployment checks can run; visual and click-based browser QA remain unverified.
