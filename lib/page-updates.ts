import { ecologySeriesUpdates } from "./ecology-series-updates.ts";
import { machineBriefs } from "./machine-field.ts";
import { getRecord, recordPath } from "./records.ts";

/** Significant changes to the current web presentation, recorded in git.
 * These dates do not revise an immutable manuscript or its citation. Unknown
 * page dates are omitted; a deployment or request never refreshes this clock.
 */
export const pageUpdates: Record<string, { date: string; reason: string }> = {
 "/notebook/the-repairer-left-the-mechanism-kept-working": { date: "2026-09-25", reason: "Opt-in HAUSE codex prototype with operable folios, linear manuscript and actual publication history; preserved editions and results unchanged." },
 ...Object.fromEntries(Object.keys(machineBriefs).map(id => [recordPath(getRecord(id)!), { date: "2026-09-13", reason: "Visible question and bounded result; link to the field-experiment map." }])),
 ...Object.fromEntries(Object.keys(ecologySeriesUpdates).map(id => [recordPath(getRecord(id)!), { date: "2026-09-14", reason: "Dated later-results context, preserving the original manuscript and snapshot." }])),
 "/notebook/the-ai-left-its-knowledge-didnt": { date: "2026-09-25", reason: "Reading edition simplifies recorded routing figures, groups supporting methods and uses shared HAUSE figure motion; manuscript and evidence unchanged." },
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
 "/": { date: "2026-09-26", reason: "An open notebook features the graph’s latest published entry; featured articles resolve from the same publication graph." },
 // Notebook reading surfaces reviewed together on 26 September; manuscript dates are unchanged.
 ...Object.fromEntries([
  "/notebook/the-repairer-left-the-mechanism-kept-working",
  "/notebook/a-result-can-look-relevant-without-looking-usable",
  "/notebook/the-site-was-there-the-agent-never-saw-it",
  "/notebook/the-page-couldnt-authorise-the-peer-said-go",
  "/notebook/the-message-board-did-not-create-a-culture",
  "/notebook/a-successful-behaviour-is-not-necessarily-contagious",
  "/notebook/the-world-can-remember-for-the-agent",
  "/notebook/the-stronger-agent-left-something-behind",
  "/notebook/the-ai-left-its-knowledge-didnt",
  "/notebook/the-tool-was-not-the-problem",
  "/notebook/the-page-could-ask-for-a-favour",
  "/notebook/the-page-could-ask-it-couldnt-authorise",
  "/notebook/the-subject-read-the-experiment",
  "/notebook/does-an-invitation-count-as-permission",
  "/notebook/can-a-machine-use-an-invitation",
  "/notebook/can-you-name-the-mutation-that-changed-a-world",
  "/notebook/what-keeps-an-evolving-world-alive",
  "/notebook/when-does-improvement-become-invention",
  "/notebook/give-invention-something-to-unlock",
  "/notebook/an-advantage-needs-a-chance-to-become-history",
  "/notebook/can-something-evolve-that-makes-the-next-invention-possible",
  "/notebook/i-wanted-a-website-to-behave-like-an-exhibition",
  "/notebook/my-ci-has-to-undo-my-coding-agent",
  "/notebook/the-address-is-built-through-depth",
  "/notebook/what-is-the-map",
  "/notebook/what-has-to-survive",
  "/notebook/reading-by-address",
  "/notebook/which-source-wins",
  "/notebook/context-should-be-abundant",
  "/notebook/the-operator-and-the-model",
 ].map(path => [path, { date: "2026-09-26", reason: "Shared HAUSE squared-paper notebook with authored spreads, mounted films, complete manuscript and page controls on the paper." }])),

};
export function pageLastModified(path: string, manuscriptRevised?: string): string | undefined {
 return [pageUpdates[path]?.date, manuscriptRevised].filter((date): date is string => Boolean(date)).sort().at(-1);
}
