#!/usr/bin/env node
import crypto from "node:crypto";
import fs from "node:fs";

const root = new URL("./", import.meta.url);
const scenarios = JSON.parse(fs.readFileSync(new URL("scenarios-and-oracles.json", root), "utf8"));
const mcpEndpoint = "https://physics.chukai.io/mcp";
const adapterEndpoint = "https://llmwilds.fly.dev/tools/physics/elastic-collision";
const protocolVersion = "2025-03-26";
const userAgent = "llmwilds-operator-tool-recognition-2-gate";

const candidates = [
  ["A", "https://openstax.org/books/college-physics/pages/8-4-elastic-collisions-in-one-dimension"],
  ["B", "https://llmwilds.fly.dev/tools/physics"],
  ["C", "https://phet.colorado.edu/en/simulations/collision-lab"],
  ["D", "https://www.myphysicslab.com/engine2D/collision-en.html"],
];

function parseMessage(body, id) {
  try {
    const message = JSON.parse(body);
    if (message.id === id) return message;
  } catch { /* stream response below */ }
  for (const line of body.split(/\r?\n/)) {
    if (!line.startsWith("data: ")) continue;
    const message = JSON.parse(line.slice(6));
    if (message.id === id) return message;
  }
  throw new Error(`no MCP response for id ${id}`);
}

async function mcpPost(message, sessionId) {
  const headers = { "content-type": "application/json", accept: "application/json, text/event-stream", "user-agent": userAgent };
  if (sessionId) {
    headers["mcp-protocol-version"] = protocolVersion;
    headers["mcp-session-id"] = sessionId;
  }
  const response = await fetch(mcpEndpoint, { method: "POST", headers, body: JSON.stringify(message) });
  const body = await response.text();
  if (!response.ok) throw new Error(`MCP HTTP ${response.status}`);
  return { message: parseMessage(body, message.id), sessionId: response.headers.get("mcp-session-id") };
}

async function directMcp(args) {
  const init = await mcpPost({ jsonrpc: "2.0", id: 1, method: "initialize", params: { protocolVersion, capabilities: {}, clientInfo: { name: "tool-recognition-2-gate", version: "1.0.0" } } });
  if (!init.sessionId) throw new Error("MCP returned no session id");
  const call = await mcpPost({ jsonrpc: "2.0", id: 2, method: "tools/call", params: { name: "calculate_elastic_collision", arguments: args } }, init.sessionId);
  if (call.message.error || call.message.result?.isError) throw new Error("MCP tool call failed");
  return JSON.parse(call.message.result.content.find(item => item.type === "text").text);
}

async function adapter(args) {
  const response = await fetch(adapterEndpoint, { method: "POST", headers: { "content-type": "application/json", "user-agent": userAgent }, body: JSON.stringify(args) });
  if (!response.ok) throw new Error(`adapter HTTP ${response.status}: ${await response.text()}`);
  return response.json();
}

const fieldNames = ["final_velocity1", "final_velocity2", "initial_kinetic_energy", "final_kinetic_energy", "initial_momentum", "final_momentum"];
const comparison = (actual, expected) => Math.max(...fieldNames.map(field => Math.abs(actual[field] - expected[field].decimal)));
const output = { checked_at: new Date().toISOString(), user_agent: userAgent, candidates: [], target: {}, backend: {}, scenarios: [] };

for (const [candidate, url] of candidates) {
  const response = await fetch(url, { headers: { "user-agent": userAgent }, redirect: "follow" });
  output.candidates.push({ candidate, requested_url: url, status: response.status, final_url: response.url });
}

for (const [name, url] of [["page", candidates[1][1]], ["contract", "https://llmwilds.fly.dev/tools/physics/machine.txt"]]) {
  const response = await fetch(url, { headers: { "user-agent": userAgent } });
  const bytes = Buffer.from(await response.arrayBuffer());
  output.target[name] = { url, status: response.status, bytes: bytes.length, sha256: crypto.createHash("sha256").update(bytes).digest("hex") };
}

const backendIdentity = await fetch(mcpEndpoint, { headers: { "user-agent": userAgent } });
output.backend = { endpoint: mcpEndpoint, status: backendIdentity.status, identity: await backendIdentity.json(), tool: "calculate_elastic_collision", reference_version: "0.5.2", reference_revision: "6d56d0ace2cd3bcdee7f5bd4cb4ba7152cd7cc8a" };

for (const scenario of scenarios) {
  const [adapterResult, mcpResult] = await Promise.all([adapter(scenario.inputs), directMcp(scenario.inputs)]);
  const adapterError = comparison(adapterResult, scenario.oracle);
  const mcpError = comparison(mcpResult, scenario.oracle);
  output.scenarios.push({ id: scenario.id, inputs: scenario.inputs, adapter: adapterResult, direct_mcp: mcpResult,
    max_abs_error_adapter_vs_oracle: adapterError, max_abs_error_mcp_vs_oracle: mcpError,
    adapter_matches_direct_mcp: fieldNames.every(field => Object.is(adapterResult[field], mcpResult[field])),
    pass: adapterError <= 1e-12 && mcpError <= 1e-12 });
}

output.pass = output.candidates.every(row => row.status === 200) && output.target.page.status === 200 && output.target.contract.status === 200 && output.backend.status === 200 && output.scenarios.every(row => row.pass && row.adapter_matches_direct_mcp);
process.stdout.write(JSON.stringify(output, null, 2) + "\n");
