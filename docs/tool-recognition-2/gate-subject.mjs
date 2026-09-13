#!/usr/bin/env node
import crypto from "node:crypto";
import fs from "node:fs";

const subject = Number(process.argv[2]);
if (!Number.isInteger(subject) || subject < 1 || subject > 12) throw new Error("subject must be 1..12");
const root = new URL("./", import.meta.url);
const allocation = JSON.parse(fs.readFileSync(new URL("allocation.json", root), "utf8"));
const row = allocation.assignments.find(item => item.subject === subject);
const candidates = [
  ["A", "https://openstax.org/books/college-physics/pages/8-4-elastic-collisions-in-one-dimension"],
  ["B", "https://llmwilds.fly.dev/tools/physics"],
  ["C", "https://phet.colorado.edu/en/simulations/collision-lab"],
  ["D", "https://www.myphysicslab.com/engine2D/collision-en.html"],
];
const expected = {
  page: "f9aca0f926fbb139bcb2949cacca7448d5c1555bf1bb157ff04cee00bd84e8d7",
  contract: "b6506b842c2e07576ba04ecb795359a2a009a7fdce53a50e7c91e83fd470f023",
};
const userAgent = `llmwilds-operator-tool-recognition-2-gate-${String(subject).padStart(2, "0")}`;
const output = { checked_at: new Date().toISOString(), subject, arm: row.arm, scenario_id: row.scenario_id, user_agent: userAgent, candidates: [], target: {}, prompt: {} };

for (const [candidate, url] of candidates) {
  const response = await fetch(url, { headers: { "user-agent": userAgent }, redirect: "follow" });
  output.candidates.push({ candidate, requested_url: url, status: response.status, final_url: response.url });
}
for (const [name, url] of [["page", candidates[1][1]], ["contract", "https://llmwilds.fly.dev/tools/physics/machine.txt"]]) {
  const response = await fetch(url, { headers: { "user-agent": userAgent } });
  const bytes = Buffer.from(await response.arrayBuffer());
  output.target[name] = { status: response.status, sha256: crypto.createHash("sha256").update(bytes).digest("hex"), expected_sha256: expected[name] };
}
const promptPath = new URL(row.prompt, root);
const promptBytes = fs.readFileSync(promptPath);
output.prompt = { path: row.prompt, bytes: promptBytes.length, sha256: crypto.createHash("sha256").update(promptBytes).digest("hex"), expected_sha256: row.prompt_sha256 };
output.pass = output.candidates.every(item => item.status === 200) && Object.values(output.target).every(item => item.status === 200 && item.sha256 === item.expected_sha256) && output.prompt.sha256 === output.prompt.expected_sha256;
process.stdout.write(JSON.stringify(output, null, 2) + "\n");
if (!output.pass) process.exitCode = 1;
