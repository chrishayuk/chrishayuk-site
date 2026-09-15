import { ecologySeriesUpdates } from "./ecology-series-updates.ts";
import { machineBriefs } from "./machine-field.ts";
import { getRecord, recordPath } from "./records.ts";

/** Significant changes to the current web presentation, recorded in git.
 * These dates do not revise an immutable manuscript or its citation. Unknown
 * page dates are omitted; a deployment or request never refreshes this clock.
 */
export const pageUpdates: Record<string, { date: string; reason: string }> = {
 ...Object.fromEntries(Object.keys(machineBriefs).map(id => [recordPath(getRecord(id)!), { date: "2026-09-13", reason: "Visible question and bounded result; link to the field-experiment map." }])),
 ...Object.fromEntries(Object.keys(ecologySeriesUpdates).map(id => [recordPath(getRecord(id)!), { date: "2026-09-14", reason: "Dated later-results context, preserving the original manuscript and snapshot." }])),
 "/notebook/the-ai-left-its-knowledge-didnt": { date: "2026-09-15", reason: "An inheritance opening plate and descendant visual pause frame the existing recorded evidence, without revising the manuscript." },
 "/thread/machines": { date: "2026-09-15", reason: "Eight experimental premises, a cinematic threshold study and distinct maintenance links to the key-world limit and routing-world persistence." },
 "/thread/agent-ecology": { date: "2026-09-15", reason: "Cinematic inheritance study and written-descendant preview; closing question now reflects population renewal and guarded repair." },
 "/notebook": { date: "2026-09-16", reason: "Agent Ecology entrance shares the programme’s persistence question." },
 "/notebook/archive": { date: "2026-09-15", reason: "Complete notebook archive with programme and text filters." },
 "/notebook/a-result-can-look-relevant-without-looking-usable": { date: "2026-09-15", reason: "Reading edition explains why recognition and competitive selection needed separate tests; published manuscript unchanged." },
 "/notebook/the-tool-was-not-the-problem": { date: "2026-09-15", reason: "Opening states the mechanism-competence question before the task details." },
 "/notebook/the-site-was-there-the-agent-never-saw-it": { date: "2026-09-15", reason: "Opening separates tool discovery from ability to use a supplied address." },
 "/notebook/the-page-could-ask-it-couldnt-authorise": { date: "2026-09-15", reason: "Opening states the competing sources of permission and task necessity." },
 "/notebook/does-an-invitation-count-as-permission": { date: "2026-09-15", reason: "Explains why later permission controls followed the original reward comparison." },
 "/research": { date: "2026-09-16", reason: "Shared programme framing and explicit open questions about selective preservation, uncertain repair and longer horizons." },
 "/": { date: "2026-09-16", reason: "Agent Ecology now asks the same persistence question as its programme page." },
};
export function pageLastModified(path: string, manuscriptRevised?: string): string | undefined {
 return [pageUpdates[path]?.date, manuscriptRevised].filter((date): date is string => Boolean(date)).sort().at(-1);
}
