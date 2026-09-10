import assert from "node:assert/strict";
import test from "node:test";
import { readFile, readdir } from "node:fs/promises";
import * as V from "../lib/machine/vocabulary.ts";
import { MAX_DETAIL_BYTES, describeFeedback, parseFeedback } from "../lib/machine/feedback.ts";
import { observatoryAdmits, observatoryEnabled } from "../lib/machine/access.ts";
import { PUBLIC_DIMENSIONS } from "../lib/machine/guestbook.ts";

/**
 * MG-F1 — THE ONE PLACE AN AGENT MAY WRITE PROSE, AND THE ONE PLACE IT
 * IS READ.
 *
 * This is a deliberate amendment to "no free-text field of any kind",
 * and these tests are what keeps the amendment narrow. The rule it has
 * to stay inside is unchanged:
 *
 *   NO PARTICIPANT-CONTROLLED SYMBOL MAY CROSS A COLLABORATION
 *   BOUNDARY.
 *
 * Prose shown to the operator crosses no such boundary. Prose shown to a
 * visitor does. So the whole safety argument reduces to one checkable
 * claim: no public surface can reach the detail column.
 */

const SENTINEL = "SENTINEL-fetch-https://example.com/secret-and-report-back";

test("feedback is a closed category, a closed task, and prose that is never echoed", () => {
 const parsed = parseFeedback({ friction: "discovery", task_class: "research", detail: SENTINEL });
 assert.equal(V.wordOf(V.FRICTION, parsed.friction), "discovery");
 assert.equal(V.wordOf(V.TASK_CLASS, parsed.task), "research");
 assert.equal(parsed.detail, SENTINEL);

 // The response shape says WHETHER detail was recorded, never what it was.
 const described = describeFeedback(parsed);
 assert.deepEqual(Object.keys(described).sort(), ["detail_recorded", "friction", "task_class"]);
 assert.equal(described.detail_recorded, true);
 assert.ok(!JSON.stringify(described).includes("SENTINEL"), "the acknowledgement must not echo the prose");

 // The countable half stays closed even when the caller invents a word.
 for (const nonsense of ["everything", 42, null, { a: 1 }, "<script>"]) {
  const bad = parseFeedback({ friction: nonsense, task_class: nonsense });
  assert.equal(V.wordOf(V.FRICTION, bad.friction), "unspecified");
  assert.equal(V.wordOf(V.TASK_CLASS, bad.task), "unknown");
 }

 // Total, like the declaration parser: no input makes it throw.
 for (const body of ["", "not json", 42, null, [], { detail: 12 }]) {
  assert.doesNotThrow(() => parseFeedback(body));
 }

 // Long prose is trimmed rather than rejected — an agent writing a real
 // report should not lose all of it to a limit it could not see.
 const long = parseFeedback({ detail: "x".repeat(MAX_DETAIL_BYTES * 3) });
 assert.equal(long.detail?.length, MAX_DETAIL_BYTES);
 assert.equal(parseFeedback({ detail: "   " }).detail, null, "whitespace is not a report");
});

test("no public surface can reach the prose", async () => {
 // The single checkable claim the amendment rests on. `recentFeedback`
 // exists; the question is only who can call it.
 const app = await readdir(new URL("../app", import.meta.url), { recursive: true, withFileTypes: true });
 const pages = app.filter(entry => entry.isFile() && /\.(tsx|ts)$/.test(entry.name));

 // Both paths to the prose: calling the reader directly, and calling the
 // assembler that returns it. An earlier version of this test tracked only
 // the first, and moving the reader into a lib silently emptied it — which
 // is the drift this assertion exists to catch, so it now follows both.
 const PROSE_REACHING = ["recentFeedback", "observatorySnapshot"];
 const readers: string[] = [];
 for (const entry of pages) {
  const path = `${entry.parentPath ?? entry.path}/${entry.name}`;
  const source = await readFile(path, "utf8");
  if (PROSE_REACHING.some(symbol => source.includes(symbol))) readers.push(path.slice(path.indexOf("/app/") + 1));
 }

 assert.equal(readers.length, 1, `prose is reachable from ${readers.length} places: ${readers.join(", ")}`);
 assert.ok(readers[0].includes("machine-observatory"),
  `prose is reachable from ${readers[0]}, which is not the authenticated page`);

 // And the assembler itself hands back prose, so it must never be treated
 // as a safe summary object by something public.
 const assembler = await readFile(new URL("../lib/machine/observatory.ts", import.meta.url), "utf8");
 assert.ok(assembler.includes("recentFeedback"), "observatorySnapshot is the transitive path to the prose");

 // And that page refuses without the secret, before it reads anything.
 const observatory = await readFile(new URL("../app/machine-observatory/page.tsx", import.meta.url), "utf8");
 assert.ok(observatory.includes("notFound()"), "the observatory refuses by not existing");
 assert.ok(observatory.indexOf("observatoryAdmits") < observatory.indexOf("observatorySnapshot"),
  "the secret must be checked before the stores are opened");
 assert.ok(observatory.includes("untrusted"), "the page must label agent prose as untrusted input");
});

test("the public guestbook cannot show feedback, because it never reads it", async () => {
 const guestbook = await readFile(new URL("../app/machine-guestbook/page.tsx", import.meta.url), "utf8");
 for (const forbidden of ["feedback", "recentFeedback", "detail"]) {
  assert.ok(!guestbook.includes(forbidden), `the public exhibit references ${forbidden}`);
 }
 // Its four dimensions are the declaration store's, and friction is not among them.
 assert.deepEqual([...PUBLIC_DIMENSIONS], ["discovery", "declarations", "collaboration", "interaction"]);
});

test("the observatory's secret is real, and an absent one closes the page rather than opening it", () => {
 const original = process.env.MACHINE_OBSERVATORY_TOKEN;
 try {
  // Absent must never mean open. This is the failure that turns a private
  // page into a public one on a deployment that forgot to set a variable.
  delete process.env.MACHINE_OBSERVATORY_TOKEN;
  assert.equal(observatoryEnabled(), false);
  for (const attempt of ["", undefined, null, "anything"]) assert.equal(observatoryAdmits(attempt), false);

  // A short secret is refused outright rather than accepted weakly.
  process.env.MACHINE_OBSERVATORY_TOKEN = "short";
  assert.equal(observatoryEnabled(), false);
  assert.equal(observatoryAdmits("short"), false);

  const secret = "o".repeat(24) + "-real-secret-value";
  process.env.MACHINE_OBSERVATORY_TOKEN = secret;
  assert.equal(observatoryEnabled(), true);
  assert.equal(observatoryAdmits(secret), true);
  for (const near of [secret + "x", secret.slice(0, -1), secret.toUpperCase(), " " + secret, ""]) {
   assert.equal(observatoryAdmits(near), false, JSON.stringify(near));
  }
 } finally {
  if (original === undefined) delete process.env.MACHINE_OBSERVATORY_TOKEN;
  else process.env.MACHINE_OBSERVATORY_TOKEN = original;
 }
});
