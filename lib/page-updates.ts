import { machineBriefs } from "./machine-field.ts";
import { getRecord, recordPath } from "./records.ts";

/** Significant changes to the current web presentation, recorded in git.
 * These dates do not revise an immutable manuscript or its citation. Unknown
 * page dates are omitted; a deployment or request never refreshes this clock.
 */
export const pageUpdates: Record<string, { date: string; reason: string }> = {
 ...Object.fromEntries(Object.keys(machineBriefs).map(id => [recordPath(getRecord(id)!), { date: "2026-09-13", reason: "Visible question and bounded result; link to the field-experiment map." }])),
 "/notebook/a-result-can-look-relevant-without-looking-usable": { date: "2026-09-14", reason: "Combined Recognition-1 and Recognition-2 publication with interactive descriptions, matched pairs and fetch-channel paths." },
 "/thread/machines": { date: "2026-09-14", reason: "Added the combined recognition and provider-selection experiment." },
 "/thread/agent-ecology": { date: "2026-09-13", reason: "Connected to the permanent field-experiment map." },
 "/notebook": { date: "2026-09-14", reason: "Current threads, six latest notes and a searchable archive." },
 "/notebook/archive": { date: "2026-09-14", reason: "Complete notebook archive with programme and text filters." },
 "/research": { date: "2026-09-13", reason: "Programme map, recorded findings and standing open questions." },
 "/": { date: "2026-09-13", reason: "Cleaner programme invitations distinguish agent tasks from agent collaboration; Agent Ecology has an equal entrance. Film, selected results, systems, notebook and appearances retain their order." },
};
export function pageLastModified(path: string, manuscriptRevised?: string): string | undefined {
 return [pageUpdates[path]?.date, manuscriptRevised].filter((date): date is string => Boolean(date)).sort().at(-1);
}
