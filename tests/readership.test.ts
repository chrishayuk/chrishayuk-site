import assert from "node:assert/strict";
import test from "node:test";
import { classify, normalisePath, referralOf, surfaceOf, UNRECOGNISED } from "../lib/readership/classify.ts";
import { isVerifiable, parseIp, rangeSnapshot, verify } from "../lib/readership/ranges.ts";
import { confidenceFor } from "../lib/readership/store.ts";
import { visiblePaths } from "../lib/readership/visible.ts";
import { allRecords, isListed, recordPath } from "../lib/records.ts";
import ranges from "../content/agent-ranges.json" with { type: "json" };

const ua = (value: string, pathname = "/notebook/which-source-wins") => classify({ pathname, userAgent: value });

test("the three things a provider's agents are for are never confused with each other", () => {
 const cases: [string, string, string, string][] = [
  ["Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot", "ai_user", "openai", "ChatGPT-User"],
  ["Mozilla/5.0 (compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot)", "ai_search", "openai", "OAI-SearchBot"],
  ["Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.2; +https://openai.com/gptbot", "ai_training", "openai", "GPTBot"],
  ["Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Claude-User/1.0; +Claude-User@anthropic.com", "ai_user", "anthropic", "Claude-User"],
  ["Mozilla/5.0 (compatible; Claude-SearchBot/1.0; +Claude-SearchBot@anthropic.com)", "ai_search", "anthropic", "Claude-SearchBot"],
  ["Mozilla/5.0 (compatible; ClaudeBot/1.0; +claudebot@anthropic.com)", "ai_training", "anthropic", "ClaudeBot"],
  ["Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Perplexity-User/1.0; +https://perplexity.ai/perplexity-user", "ai_user", "perplexity", "Perplexity-User"],
  ["Mozilla/5.0 (compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)", "ai_search", "perplexity", "PerplexityBot"],
  ["Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)", "search_bot", "google", "Googlebot"],
  ["Mozilla/5.0 (compatible; CCBot/2.0; +https://commoncrawl.org/faq/)", "ai_training", "common-crawl", "CCBot"],
  ["Feedly/1.0 (+http://www.feedly.com/fetcher.html; like FeedFetcher-Google)", "feed_reader", "other", "feed reader"],
  ["facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)", "link_preview", "other", "link preview"],
 ];
 for (const [value, purpose, provider, agent] of cases) {
  const result = ua(value);
  assert.equal(result.purpose, purpose, value);
  assert.equal(result.provider, provider, value);
  assert.equal(result.agent, agent, value);
  assert.equal(result.confidence, "declared", value);
 }
});

test("an ordinary browser is a reader, and a phone that happens to spell bot is not a crawler", () => {
 for (const value of [
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Mobile/15E148 Safari/604.1",
  "Mozilla/5.0 (Linux; Android 13; CUBOT_NOTE_20) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
 ]) {
  const result = ua(value);
  assert.equal(result.purpose, "human", value);
  assert.equal(result.confidence, "none", value);
 }
 for (const [value, agent] of [["curl/8.7.1", "curl"], ["python-requests/2.32.3", "python-requests"], ["", "no user agent"], ["SomeUnknownBot/1.0 (+https://example.com)", "unrecognised bot"]] as const) {
  const result = ua(value);
  assert.equal(result.purpose, "automation", value);
  assert.equal(result.confidence, "inferred", value);
  assert.equal(result.agent, agent, value);
 }
});

test("a crafted path is counted once and never echoed, and the site's own documents keep their kind", () => {
 assert.equal(normalisePath("/notebook/which-source-wins/"), "/notebook/which-source-wins");
 for (const crafted of ["/<script>alert(1)</script>", "/../../etc/passwd", `/${"x".repeat(200)}`, "/notebook?q=1", "/a b"]) assert.equal(normalisePath(crafted), UNRECOGNISED);
 assert.equal(surfaceOf(UNRECOGNISED), "other");
 for (const [path, surface] of [["/notebook/feed.xml", "feed"], ["/feed.json", "feed"], ["/rss.xml", "feed"], ["/robots.txt", "agent_document"], ["/follow.json", "agent_document"], ["/sitemap.xml", "agent_document"], ["/llms.txt", "agent_document"], ["/api/records", "api"], ["/og-house.png", "asset"], ["/notebook", "page"]] as const) assert.equal(surfaceOf(path), surface, path);
});

test("a retrieval is told apart from a citation someone followed", () => {
 assert.equal(referralOf(null, "chatgpt.com", "chrishayuk.com"), "chatgpt");
 assert.equal(referralOf("https://chatgpt.com/", null, "chrishayuk.com"), "chatgpt");
 assert.equal(referralOf("https://www.perplexity.ai/search/x", null, "chrishayuk.com"), "perplexity");
 assert.equal(referralOf("https://claude.ai/chat/1", null, "chrishayuk.com"), "claude");
 assert.equal(referralOf("https://www.google.com/", null, "chrishayuk.com"), "search");
 assert.equal(referralOf("https://chrishayuk.com/notebook", null, "chrishayuk.com"), "site");
 assert.equal(referralOf("not a url", null, "chrishayuk.com"), "none");
 assert.equal(referralOf(null, null, "chrishayuk.com"), "none");
});

test("addresses parse the way their families are actually written", () => {
 assert.deepEqual(parseIp("216.73.216.1")?.bytes, [216, 73, 216, 1]);
 assert.equal(parseIp("2001:4860:4801:10::1")?.family, 6);
 assert.deepEqual(parseIp("::ffff:216.73.216.1"), { family: 4, bytes: [216, 73, 216, 1] });
 assert.deepEqual(parseIp("2001:db8::1")?.bytes.length, 16);
 assert.equal(parseIp("[2001:db8::1]:443")?.family, undefined);
 for (const bad of ["", "256.1.1.1", "1.2.3", "not-an-address", "1:2:3::4::5", "2001:db8:::1"]) assert.equal(parseIp(bad), null, bad);
});

test("a declared agent is checked against its own provider's published addresses, and a mismatch is refuted rather than counted", () => {
 assert.ok(rangeSnapshot.prefixes > 100, "the published-range snapshot is present");
 for (const source of rangeSnapshot.sources) assert.ok(source.prefixes > 0, source.id);

 // Every published prefix contains its own network address; the address that documentation reserves is in nobody's list.
 for (const source of ranges.sources) {
  const network = source.prefixes.find(prefix => !prefix.includes(":"))?.split("/")[0];
  if (!network) continue;
  for (const agent of source.agents) {
   assert.equal(verify(agent, network), "verified", `${agent} at ${network}`);
   assert.equal(verify(agent, "203.0.113.7"), "refuted", agent);
  }
 }

 // Anthropic publishes one list for all three of its agents; Apple publishes none, so an Applebot claim can only ever be declared.
 assert.ok(isVerifiable("Claude-User") && isVerifiable("ClaudeBot") && isVerifiable("Claude-SearchBot"));
 assert.equal(isVerifiable("Applebot"), false);
 assert.equal(verify("Applebot", "17.241.75.1"), "unpublished");
 assert.equal(verify("ChatGPT-User", null), "unpublished");
});

test("verification decides the confidence, and only a declared claim is ever tested", () => {
 const claim = classify({ pathname: "/notebook", userAgent: "Mozilla/5.0 (compatible; ClaudeBot/1.0; +claudebot@anthropic.com)" });
 assert.equal(confidenceFor(claim, "203.0.113.7"), "refuted");
 assert.equal(confidenceFor(claim, null), "declared");
 const human = classify({ pathname: "/notebook", userAgent: "Mozilla/5.0 (Macintosh) AppleWebKit/605.1.15 Safari/605.1.15" });
 assert.equal(confidenceFor(human, "203.0.113.7"), "none");
 const unknown = classify({ pathname: "/notebook", userAgent: "curl/8.7.1" });
 assert.equal(confidenceFor(unknown, "203.0.113.7"), "inferred");
});

test("the public page will name only paths this publication already publishes", () => {
 const visible = visiblePaths();
 assert.ok(visible.has("/notebook") && visible.has("/follow.json") && visible.has("/record/feed.xml") && visible.has("/readership"));
 assert.equal(visible.has(UNRECOGNISED), false);
 for (const record of allRecords.filter(record => !isListed(record))) assert.equal(visible.has(recordPath(record)), false, `unlisted preview ${record.id} must not be named`);
});

// The exhibition must not turn hourly counters into imagined visitor journeys.
test("contact field preserves evidence and purpose, hides unpublished paths and uses a bounded hourly window", async () => {
 const { contactExhibit } = await import("../lib/readership/exhibit.ts");
 const base = { hour: 1000, path: "/readership", surface: "page", purpose: "ai_user", provider: "openai", agent: "ChatGPT-User", confidence: "verified", referral: "none", n: 2 };
 const visible = new Set(["/readership", "/machines"]);
 const field = contactExhibit([
  base, { ...base, referral: "site", n: 3 },
  { ...base, confidence: "declared", n: 7 },
  { ...base, purpose: "ai_search", n: 11 },
  { ...base, hour: 952, n: 13 }, // retained in map; outside 48 hourly buckets
  { ...base, hour: 1001, n: 100 },
  { ...base, hour: 800, n: 100 },
  { ...base, path: "/visitor-chosen-secret", n: 100 },
  { ...base, surface: "asset", n: 100 },
  { ...base, purpose: "human", n: 100 },
  { ...base, confidence: "refuted", n: 100 },
  { ...base, path: "/machines", purpose: "automation", provider: "unknown", agent: "curl", confidence: "inferred", n: 1 },
 ], visible, 1000, 900);
 assert.equal(field.to - field.from, 48);
 assert.equal(field.cells.length, 4);
 assert.equal(field.cells.find(cell => cell.confidence === "verified" && cell.purpose === "ai_user")?.n, 5);
 assert.equal(field.cells.find(cell => cell.confidence === "declared")?.n, 7);
 assert.equal(field.contacts.find(cell => cell.path === "/readership" && cell.confidence === "verified")?.n, 29);
 assert.ok(field.cells.some(cell => cell.agent === "curl"));
 assert.ok(!JSON.stringify(field).includes("visitor-chosen-secret"));
 assert.ok(field.cells.every(cell => !("referral" in cell) && !("session" in cell) && !("revision" in cell)));
});

test("operator reconciliation subtracts only known matching cells and never invents a zero", async () => {
 const { contactExhibit, REQUEST_CORRECTIONS } = await import("../lib/readership/exhibit.ts");
 const correction = REQUEST_CORRECTIONS[0];
 const base = { hour: correction.hour, path: "/machines", surface: "page", purpose: "automation", provider: "unknown", agent: "curl", confidence: "inferred", referral: "none", n: 12 };
 const visible = new Set(["/machines"]);
 const field = contactExhibit([base, { ...base, referral: "site", n: 100 }, { ...base, path: "/", n: 100 }], visible, base.hour + 36, base.hour - 24);
 assert.equal(field.corrections[0].observed, 12);
 assert.equal(field.corrections[0].remaining, 3);
 assert.equal(field.corrections[1].remaining, null);
 assert.equal(contactExhibit([{ ...base, n: 8 }], visible, base.hour + 36, base.hour - 24).corrections[0].remaining, null);
 assert.equal(contactExhibit([base], visible, base.hour + 48, base.hour + 1).corrections[0].observed, null);
 assert.equal(REQUEST_CORRECTIONS.reduce((n, row) => n + row.n, 0), 11);
});

test("the timeline reports its cap while the contact map retains the complete cross-tabulation", async () => {
 const { contactExhibit } = await import("../lib/readership/exhibit.ts");
 const rows = Array.from({ length: 1205 }, (_, i) => ({ hour: 1000, path: `/published/${i}`, surface: "page", purpose: "search_bot", provider: "google", agent: "Googlebot", confidence: "verified", referral: "none", n: 1 }));
 const field = contactExhibit(rows, new Set(rows.map(row => row.path)), 1000, 900);
 assert.equal(field.cells.length, 1200);
 assert.equal(field.totalCells, 1205);
 assert.equal(field.contacts.length, 1205);
});

test("the public blind-run record matches its frozen source and keeps unrecorded measures unknown", async () => {
 const { readFile } = await import("node:fs/promises");
 const { VISITS, VISIT_PROTOCOL_PATH } = await import("../lib/machine/visits.ts");
 const source = await readFile(new URL("../docs/machine-visit-protocol.md", import.meta.url), "utf8");
 const published = await readFile(new URL("../public/data/machines/machine-visit-protocol.md", import.meta.url), "utf8");
 assert.equal(published, source);
 assert.equal(VISITS.length, 4);
 for (const visit of VISITS) {
  assert.ok(source.includes(visit.revision));
  assert.equal(visit.validatedFirst, visit.run === 4 ? true : null);
  assert.equal(visit.verb, null);
  assert.equal(visit.exactUrlSequence, null);
 }
 assert.equal(VISITS[1].feedbackState, "lost");
 assert.equal(VISITS[2].feedbackState, "kept");
 assert.ok(visiblePaths().has(VISIT_PROTOCOL_PATH));
});
