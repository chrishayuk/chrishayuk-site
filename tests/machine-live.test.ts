import assert from "node:assert/strict";
import test from "node:test";
import { activityInHours, homeBrightness, hourBucket, newSince, quietTicker, recentKey, roomOf, tickerFor, type RecentRow } from "../lib/machine/live.ts";

const row = (over: Partial<RecentRow> = {}): RecentRow => ({
 hour: "2026-09-17 08:00Z", purpose: "ai_user", provider: "openai", agent: "ChatGPT-User", confidence: "verified", path: "/notebook", n: 1, ...over,
});

test("a path is one room, chosen from this site's own fixed prefixes", () => {
 assert.equal(roomOf("/"), "home");
 assert.equal(roomOf("/notebook/which-source-wins"), "notebook");
 assert.equal(roomOf("/research/ffn-as-graph"), "research");
 assert.equal(roomOf("/work/larql"), "work");
 assert.equal(roomOf("/film/youtube/abc"), "film");
 assert.equal(roomOf("/machines"), "machines");
 assert.equal(roomOf("/api/machines/declaration"), "machines");
 assert.equal(roomOf("/llms.txt"), "machines");
 assert.equal(roomOf("/machine-guestbook"), "machines");
 assert.equal(roomOf("/systems"), "other");
 assert.equal(roomOf("/ideas"), "other");
});

test("the ticker names an agent and a room for AI purposes, and neither for automation", () => {
 assert.equal(tickerFor(row()), "ChatGPT-User is reading Notebook.");
 assert.equal(tickerFor(row({ purpose: "ai_search", agent: "OAI-SearchBot", path: "/research/ffn-as-graph" })), "OAI-SearchBot is indexing Research.");
 assert.equal(tickerFor(row({ purpose: "ai_training", agent: "Meta-ExternalAgent", path: "/work/larql" })), "Meta-ExternalAgent is collecting across Work.");
 assert.equal(tickerFor(row({ purpose: "automation", agent: "curl", path: "/machines" })), "an unidentified client has returned.");
});

test("quiet is stated plainly, with a genuine elapsed minute count and correct pluralisation", () => {
 assert.equal(quietTicker(12), "quiet for 12 minutes.");
 assert.equal(quietTicker(1), "quiet for 1 minute.");
 assert.equal(quietTicker(0.4), "quiet for 1 minute.");
 assert.equal(quietTicker(-5), "quiet for 1 minute.");
});

test("home's brightness tracks a real count, at rest by default and capped", () => {
 assert.equal(homeBrightness(0), 0.2);
 assert.ok(homeBrightness(3) > homeBrightness(0));
 assert.equal(homeBrightness(1000), 0.95);
});

test("the hour bucket matches the format lib/readership/store.ts already writes", () => {
 assert.equal(hourBucket(new Date("2026-09-17T08:41:12.000Z")), "2026-09-17 08:00Z");
 assert.equal(hourBucket(new Date("2026-01-01T00:00:00.000Z")), "2026-01-01 00:00Z");
});

test("activity sums only the named hour buckets, so a boundary request is never silently dropped", () => {
 const rows = [row({ hour: "2026-09-17 08:00Z", n: 3 }), row({ hour: "2026-09-17 07:00Z", n: 2 }), row({ hour: "2026-09-17 06:00Z", n: 100 })];
 assert.equal(activityInHours(rows, ["2026-09-17 08:00Z", "2026-09-17 07:00Z"]), 5);
 assert.equal(activityInHours(rows, ["2026-09-17 08:00Z"]), 3);
 assert.equal(activityInHours(rows, ["2026-09-17 09:00Z"]), 0);
});

test("a row that reappears unchanged is never queued twice, and one that genuinely changes is", () => {
 const seen = new Set([recentKey(row())]);
 assert.deepEqual(newSince([row()], seen), []);
 assert.deepEqual(newSince([row(), row({ path: "/research" })], seen), [row({ path: "/research" })]);
 // Confidence alone changing is not a new arrival — see recentKey's own note.
 assert.deepEqual(newSince([row({ confidence: "declared" })], seen), []);
});
