import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import ledger from "../public/data/ecology/evidence.json" with { type: "json" };
import replay from "../public/data/ecology/replays.json" with { type: "json" };
import { ecologyMetric, memoryConditions, withdrawalConditions } from "../lib/ecology-evidence.ts";
import { ecologyRecords } from "../lib/ecology-records.ts";
import { agentEcologyThread } from "../lib/threads.ts";
import { recordGraph, retrieveGraph } from "../lib/graph.ts";

test("ecology source reports and replay provenance match the verified registry ledger", () => {
 for (const entry of ledger.experiments) {
  const bytes = readFileSync(new URL(`../public${entry.report}`, import.meta.url));
  assert.equal(createHash("sha256").update(bytes).digest("hex"), entry.reportSha256);
 }
 for (const [number, source] of Object.entries(replay.sources)) {
  const entry = ledger.experiments.find(entry => entry.number === Number(number))!;
  assert.equal(source.sha256, entry.verifiedResult.sha256);
  assert.equal(source.run, entry.run);
 }
});

test("the world replay preserves actual state changes and matches recorded contribution counts", () => {
 for (const [condition, { frames }] of Object.entries(replay.worlds)) {
  assert.equal(frames.length, 18);
  let posts = 0;
  for (const [index, frame] of frames.entries()) {
   assert.equal(frame.executed, true);
   assert.equal(frame.actor, index % 2);
   if (index % 6 === 0) {
    assert.deepEqual(frame.before.resources, [0, 0]);
    assert.deepEqual(frame.before.board.map(message => message.payload), ["seed"]);
   } else assert.deepEqual(frame.before, frames[index - 1].after);
   if (frame.actor === 0 && frame.action.startsWith("POST")) {
    posts++;
    assert.equal(frame.after.board.length, frame.before.board.length + 1);
   }
  }
  assert.equal(posts, ecologyMetric(5, `${condition}_timely_valid_posts`));
 }
});

test("decision replays agree with registry trajectories and preserve memory interventions", () => {
 for (const row of memoryConditions) {
  const frames = replay.decisions["12"][row.id as keyof typeof replay.decisions["12"]];
  assert.deepEqual(frames.map(frame => frame.action.split(" ")[0]), row.actions);
  frames.forEach((frame, index) => {
   assert.equal(frame.external, row.external);
   assert.equal(frame.ownActions.length, row.memory ? 3 + index : 0);
   assert.deepEqual(frame.before.resources, [0, 0]);
   assert.equal(frame.before.board.length, 1);
  });
  if (!row.memory) assert.equal(new Set(frames.map(frame => frame.requestSha256)).size, 1);
 }
 for (const condition of withdrawalConditions) {
  const frames = replay.decisions["11"][condition.id as keyof typeof replay.decisions["11"]];
  assert.deepEqual(frames.map(frame => frame.action.split(" ")[0]), condition.actions);
  frames.forEach((frame, i) => assert.equal(frame.external, i < condition.exposed));
 }
 assert.deepEqual(memoryConditions.find(row => row.id === "E0_M1")!.actions, ["WORK", "WORK", "POST"]);
 const transition = ecologyMetric<{ POST: { count: number; post_frequency: null } }>(9, "actual_predecessor_transition_counts");
 assert.equal(transition.POST.count, 0);
 assert.equal(transition.POST.post_frequency, null);
});

test("ecology manuscripts are connected and discoverable while published snapshots stay separate", () => {
 const graph = recordGraph();
 assert.deepEqual(agentEcologyThread.steps.map(step => step.id), [...ecologyRecords.map(record => record.id), "N-ECOLOGY-RECOVERY"]);
 for (const record of ecologyRecords) {
  assert.equal(record.publication, "draft");
  assert.equal(record.published, undefined);
  assert.ok(graph.edges.some(edge => edge.from === record.id && edge.to === agentEcologyThread.id && edge.kind === "in-thread"));
  assert.ok(retrieveGraph(record.title, { scope: "records" }).results.some(result => result.id === record.id || result.recordId === record.id));
 }
 assert.ok(retrieveGraph("AI agent ecology shared artefacts behavioural persistence", { scope: "records" }).results.some(result => result.id === agentEcologyThread.id));
});
