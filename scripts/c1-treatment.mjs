import assert from "node:assert/strict";
import { classify } from "../lib/readership/classify.ts";

/**
 * THE C1 GATE — the condition that replaced C0.
 *
 * C0 ended when /api/machines/declaration answered. scripts/c0-treatment.mjs
 * now fails against production by design, and its failure is the boundary.
 * This asserts what is true instead:
 *
 *   TOPOLOGY      unchanged. /llms.txt is still the only route to
 *                 /machines, and /machines is still out of the sitemap.
 *                 Participation moved; discoverability did not.
 *
 *   TREATMENT     the endpoint is mounted and the admission contract
 *                 holds at the edge, not just in tests.
 *
 *   NO RELAY      nothing reads declarations back out. There is no
 *                 endpoint that returns what anyone declared.
 *
 * IT WRITES NOTHING. Every request below is a refusal — a wrong method,
 * a wrong content type, an oversized body — and a refusal is never
 * stored. That is deliberate: posting a valid declaration from here
 * would contaminate the experiment's NUMERATOR, which is worse than the
 * denominator, because there are so few of them that one operator row
 * could be most of the result. Proving the 201 path is a test's job and
 * is done in tests/machine-admission.test.ts.
 *
 * A GET returning 405 rather than 404 is what proves the route exists:
 * mounted, and refusing, without a row.
 *
 *   node scripts/c1-treatment.mjs                      (production)
 *   node scripts/c1-treatment.mjs http://localhost:3000
 */

const origin = process.argv[2] || "https://chrishayuk.com";
const AGENT = "curl/8.7.1 (chrishayuk-c1-treatment-gate)";
let machineProbes = 0;

const get = async (path) => {
 const response = await fetch(new URL(path, origin), { headers: { "User-Agent": AGENT } });
 return { status: response.status, body: await response.text() };
};
const send = (path, { method = "POST", type = "application/json", body = "{}" } = {}) =>
 fetch(new URL(path, origin), {
  method,
  headers: { "User-Agent": AGENT, ...(type ? { "Content-Type": type } : {}) },
  ...(method === "GET" ? {} : { body }),
 });

// TOPOLOGY — the half that must not have moved.
const llms = await get("/llms.txt");
assert.equal(llms.status, 200);
assert.match(llms.body, /\]\(https:\/\/chrishayuk\.com\/machines\)/, "/llms.txt must still advertise /machines");

const sitemap = await get("/sitemap.xml");
assert.doesNotMatch(sitemap.body, /chrishayuk\.com\/machines</, "/machines must stay out of the sitemap");
// And the index itself must be reachable by something that follows links, or
// nothing discovers the machine surface at all — which is how a day passed
// with 929 AI requests and zero arrivals.
assert.match(sitemap.body, /chrishayuk\.com\/llms\.txt</, "/llms.txt must be in the sitemap");
const home = await get("/");
assert.match(home.body, /href="\/llms\.txt"/, "an anchor to the machine index must exist on ordinary pages");

machineProbes++;
const machines = await get("/machines");
assert.equal(machines.status, 200);
assert.match(machines.body, /\/api\/machines\/declaration/, "/machines must name the endpoint it offers");

// TREATMENT — mounted, and refusing correctly, without writing anything.
// GET self-describes. It returns this site's own contract — generated from the
// same vocabulary the parser uses — and never anything anyone declared.
const mounted = await send("/api/machines/declaration", { method: "GET" });
assert.equal(mounted.status, 200, "GET must return the contract, not a refusal");
const described = JSON.parse(await mounted.clone().text());
assert.equal(described.declare.method, "POST");
assert.ok(Array.isArray(described.fields.role.enum) && described.fields.role.enum.includes("verifier"));
assert.ok(Array.isArray(described.provenance.enum) && described.provenance.enum.includes("unrecognised"),
 "the contract must document the distinction a visitor would otherwise find by probing");
for (const key of ["receipt", "recorded", "visit_id", "declarations"]) {
 assert.ok(!Object.keys(described).includes(key), `the contract leaked ${key}: it must describe, never report`);
}

const wrongType = await send("/api/machines/declaration", { type: "text/plain" });
assert.equal(wrongType.status, 415, "the content-type contract holds at the edge");
assert.equal(JSON.parse(await wrongType.clone().text()).see, "/api/machines/declaration",
 "a refusal must say where the rules are");

// A REAL oversized body, not a lying Content-Length. Claiming a large body and
// sending a short one makes the server wait for bytes that never arrive and
// time out (408) before the handler is ever reached — which tests the socket,
// not the ceiling. Sending the bytes is the honest probe.
const tooLarge = await send("/api/machines/declaration", {
 body: JSON.stringify({ role: "verifier", padding: "x".repeat(4096) }),
});
assert.equal(tooLarge.status, 413, "the body ceiling holds at the edge");

for (const response of [wrongType, tooLarge]) {
 const text = await response.clone().text();
 assert.ok(text.length < 120, "a refusal is a handful of bytes and cannot amplify");
}

// NO RELAY — nothing hands declarations back out.
for (const path of [
 "/api/machines/declarations",
 "/api/machines/guestbook", "/api/machines", "/api/machines/collaboration",
]) {
 const response = await get(path);
 assert.ok(response.status === 404 || response.status === 405,
  `${path} answered ${response.status}; nothing may read declarations back out`);
}

// The exhibit agrees, and still adds no second route to the machine surface.
const guestbook = await get("/machine-guestbook");
assert.equal(guestbook.status, 200);
assert.doesNotMatch(guestbook.body, /href="\/machines"/, "/machine-guestbook must not link to /machines");
// React writes comment markers between adjacent text nodes, so match the
// rendered text rather than the source string.
const rendered = guestbook.body.replace(/<!--[\s\S]*?-->/g, "");
assert.match(rendered, /DECLARATION\s*OPEN/, "the exhibit must say the endpoint is open");

const cell = classify({ pathname: "/machines", userAgent: AGENT });
const hour = new Date().toISOString().slice(0, 13) + ":00Z";

console.log(`C1 CONDITION HOLDS at ${origin}`);
console.log("  topology unchanged: /llms.txt is still the only route to /machines");
console.log("  declaration endpoint mounted; GET self-describes; type and size contracts hold at the edge");
console.log("  nothing reads declarations back out");
console.log("");
console.log("contamination:");
console.log(`  hour:            ${hour}`);
console.log(`  /machines:       ${machineProbes}  cell (${cell.surface}, ${cell.purpose}, ${cell.provider}, ${cell.agent}, ${cell.confidence}, ${cell.referral})`);
console.log("  declarations:    0  — this gate writes nothing, by design");
console.log("  Record the run in docs/machine-guestbook-mg2.md §5.");
