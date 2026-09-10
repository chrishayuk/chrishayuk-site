import assert from "node:assert/strict";
import { classify } from "../lib/readership/classify.ts";

/**
 * THE TREATMENT-EQUIVALENCE GATE.
 *
 * C0 is a CONDITION, not a revision. The experiment's boundary is what
 * the deployed site offers a machine, and revisions may land during C0 —
 * unrelated work, a docs line, a parser that no endpoint calls — without
 * ending it, provided the condition holds.
 *
 * This proves it holds, mechanically, against a running origin. Run it
 * after any deployment made during C0. It asserts two things and only
 * two:
 *
 *   TOPOLOGY      /llms.txt still advertises /machines, and /machines is
 *                 still absent from the sitemap. Discoverability must
 *                 not move while participation is the variable.
 *
 *   NO TREATMENT  /machines offers no participation mechanism, and no
 *                 declaration endpoint answers under any of its names.
 *
 * When MG-2 deploys, this gate FAILS. That failure is the signal that
 * C0 has ended, and the deployment timestamp of the revision that fails
 * it is C1's start.
 *
 *   node scripts/c0-treatment.mjs                      (production)
 *   node scripts/c0-treatment.mjs http://localhost:3000
 *
 * NOTE ON CONTAMINATION. Every request below is counted by the
 * readership proxy like any other. Exactly one hits /machines, which is
 * MG-2's frozen denominator.
 *
 * That is corrected by SUBTRACTION, not by exclusion. Throwing away the
 * whole hour would discard fifty-nine minutes of genuine observation to
 * remove one known probe, and repeated runs would eventually punch holes
 * through the experiment. This gate knows deterministically what it did,
 * so it prints the aggregate cell its /machines request lands in and the
 * count to subtract from it. If the observed cell holds n = genuine + 1,
 * subtracting recovers genuine — it does not matter that real traffic
 * may share the cell.
 *
 * The tuple is computed by calling the site's own classifier rather than
 * asserted here, so it cannot drift from what the store actually writes.
 */

const origin = process.argv[2] || "https://chrishayuk.com";
/**
 * Identifies as curl on purpose. The readership store keeps only the
 * MAPPED agent name, never the user-agent string as sent, so operator
 * traffic can only be excluded later by a label the store actually
 * holds. `curl` is that label, it is what the earlier manual probes
 * already recorded, and one exclusion rule therefore covers both.
 */
const AGENT = "curl/8.7.1 (chrishayuk-c0-treatment-gate)";
const get = async (path) => {
 const response = await fetch(new URL(path, origin), { redirect: "follow", headers: { "User-Agent": AGENT } });
 return { status: response.status, body: await response.text() };
};

let probes = 0;
const probe = async (path) => { probes++; return get(path); };

// TOPOLOGY — /llms.txt is the only inbound link to /machines anywhere on the site.
const llms = await probe("/llms.txt");
assert.equal(llms.status, 200, "/llms.txt must be served");
assert.match(llms.body, /\]\(https:\/\/chrishayuk\.com\/machines\)/, "/llms.txt must still advertise /machines");

const sitemap = await probe("/sitemap.xml");
assert.equal(sitemap.status, 200);
assert.doesNotMatch(sitemap.body, /chrishayuk\.com\/machines/, "/machines must stay out of the sitemap: discoverability is held constant");

// NO TREATMENT — the surface exists and offers nothing to do.
const machines = await probe("/machines");
assert.equal(machines.status, 200, "/machines must be served");
for (const mechanism of ["<form", "<input", "<textarea", "<select"]) {
 assert.ok(!machines.body.includes(mechanism), `/machines carries ${mechanism}: the C0 condition has ended`);
}
assert.match(machines.body, /There is no declaration endpoint on this deployment/, "/machines must still say so in its own words");

// No declaration endpoint answers, under the agreed name or the one MG-1 §8 first proposed.
for (const path of [
 "/api/machines/declaration", "/api/machines/challenge", "/api/machines/collaboration",
 "/api/machine/declare",
]) {
 probes++;
 const response = await fetch(new URL(path, origin), {
  method: "POST", headers: { "Content-Type": "application/json", "User-Agent": AGENT }, body: "{}",
 });
 assert.ok(response.status === 404 || response.status === 405,
  `${path} answered ${response.status}; during C0 no declaration endpoint may exist`);
}

console.log(`C0 CONDITION HOLDS at ${origin}`);
console.log(`  /llms.txt advertises /machines; /machines absent from sitemap`);
console.log(`  /machines offers no participation mechanism; no declaration endpoint answers`);
// The aggregate cell this run's /machines request lands in, from the site's
// own classifier — the same function the proxy calls on the way in.
const cell = classify({ pathname: "/machines", userAgent: AGENT });
const hour = new Date().toISOString().slice(0, 13) + ":00Z";

console.log(`  ${probes} requests made by this run; 1 of them to /machines`);
console.log("");
console.log("contamination:");
console.log(`  hour:       ${hour}`);
console.log(`  path:       ${cell.path}`);
console.log(`  requests:   1`);
console.log(`  reason:     c0-treatment-equivalence`);
console.log("  cell:");
for (const key of ["surface", "purpose", "provider", "agent", "confidence", "referral"]) {
 console.log(`    ${key.padEnd(11)}${cell[key]}`);
}
console.log("");
console.log("  Subtract 1 from that cell. Record the run in docs/machine-guestbook-mg2.md §5.");
