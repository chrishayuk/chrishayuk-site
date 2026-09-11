/**
 * MACHINE-RECIPROCITY-1 — the half of the funnel the visitor does not report.
 *
 * A blind agent's own account of what it did is an explanation, not a
 * measurement. It is reconstructed after the fact, it is generous about
 * intentions, and in four MACHINE-VISIT-1 runs it has twice disagreed
 * with what the server actually received.
 *
 * This reads the site's own readership record instead — path, hour and
 * classification, kept by the proxy for every request including the ones
 * that never run JavaScript. It is independent of the transcript, it was
 * already there before this experiment, and it cannot be revised by
 * something that would rather have been more thorough.
 *
 * WHAT IT CANNOT DO, stated here so a reading of it is not overclaimed:
 *
 *  - The store keeps a path, not a query string, so a declaration and a
 *    `?validate=1` dry run are the same row. Whether a visitor validated
 *    before declaring can only come from the transcript.
 *  - It can only see the machine endpoints from 11 September 2026, when
 *    they were added to the visible path set. Before that every request
 *    to them was counted as "other paths", so this reads nothing about
 *    the four MACHINE-VISIT-1 runs and must not be pointed at them.
 *  - It has no addresses, by design, so two visitors in one hour cannot
 *    be told apart. Attribution rests on the arm being the only thing
 *    running in that window, which is an operating discipline rather
 *    than a property of the data.
 *  - The operator's own checks land in it. Every curl against a machine
 *    path while an arm is open is contamination, and `--since` exists so
 *    the window can start after them.
 *
 * Usage: node --experimental-strip-types scripts/reciprocity-observe.ts [--since <ISO>]
 */
const MACHINE_PATHS = ["/llms.txt", "/api/machines/declaration", "/api/machines/ask", "/api/machines/feedback", "/machines", "/machine-guestbook", "/robots.txt"];

type Cell = { hour: number; path: string; agent: string; provider: string; confidence: string; purpose: string; n: number };

const sinceArg = process.argv.indexOf("--since");
const since = sinceArg > -1 ? new Date(process.argv[sinceArg + 1]) : new Date(Date.now() - 3600_000);
const sinceHour = Math.floor(since.getTime() / 3_600_000);

const report = await (await fetch("https://chrishayuk.com/api/readership", { cache: "no-store" })).json();
const cells: Cell[] = report.counts.exhibit.cells;

const window = cells.filter(cell => cell.hour >= sinceHour);
const machine = window.filter(cell => MACHINE_PATHS.some(path => cell.path === path || cell.path.startsWith(path + "?")));

const stamp = (hour: number) => new Date(hour * 3_600_000).toISOString().slice(0, 13) + ":00Z";

console.log(`window from ${stamp(sinceHour)} (hour ${sinceHour}), ${window.length} cells, ${machine.length} on machine paths\n`);

if (!machine.length) console.log("  no contact with any machine surface in this window");
for (const cell of machine.sort((a, b) => a.hour - b.hour || a.path.localeCompare(b.path))) {
 console.log(`  ${stamp(cell.hour)}  ${cell.path.padEnd(34)} ${String(cell.n).padStart(3)}  ${cell.agent} (${cell.provider}/${cell.confidence}/${cell.purpose})`);
}

// The funnel, as far as a path can carry it. `declared` is deliberately
// absent: this store cannot distinguish it from a validation, and inventing
// the distinction here is how a measurement becomes a claim.
const hit = (path: string) => machine.filter(cell => cell.path.startsWith(path)).reduce((sum, cell) => sum + cell.n, 0);
console.log(`\nfunnel, server side only:
  reached_the_site         ${window.length > 0 ? "yes" : "no"}  (${window.reduce((s, c) => s + c.n, 0)} requests, any path)
  opened_the_machine_index ${hit("/llms.txt")} fetches of /llms.txt
  touched_declaration      ${hit("/api/machines/declaration")}  (validate and declare are indistinguishable here)
  touched_ask              ${hit("/api/machines/ask")}
  touched_feedback         ${hit("/api/machines/feedback")}`);

const agents = [...new Set(machine.map(cell => cell.agent))];
if (agents.length) console.log(`\n  agents on machine paths: ${agents.join(", ")}`);
