import { rangeSnapshot } from "./ranges.ts";
import { isRecording, RETENTION_DAYS, summary, type Summary } from "./store.ts";
import { visiblePaths } from "./visible.ts";

/**
 * THE PUBLIC SHAPE.
 *
 * One report, read by both /readership and /api/readership, so the page
 * and the machine-readable version can never drift into disagreeing
 * about what was counted.
 *
 * It carries its own caveats. A figure like "AI user retrievals" is
 * meaningless without the sentence that says it counts requests and not
 * people, and a verification split is meaningless without saying which
 * providers publish anything to check against. Those sentences travel
 * with the numbers rather than living only on a methodology page
 * nobody opens.
 */
export const WINDOW_DAYS = 30;

export const DEFINITIONS = {
 ai_user: "Requests by provider agents that fetch on a person's behalf — ChatGPT-User, Claude-User, Perplexity-User. Requests, not people: one question can cause several.",
 ai_search: "Requests by agents that index for AI answers and citations — OAI-SearchBot, Claude-SearchBot, PerplexityBot.",
 ai_training: "Requests by agents that collect text for model training — GPTBot, ClaudeBot, CCBot and others.",
 search_bot: "Conventional web search indexing — Googlebot, bingbot, Applebot and others.",
 feed_reader: "Feed clients polling on a subscriber's behalf.",
 link_preview: "Fetches that build a preview card for a shared link.",
 automation: "Machine-shaped requests that are none of the above, named or not.",
 human: "Requests from an ordinary browser.",
} as const;

export type Report = {
 site: string;
 recording: boolean;
 window: { days: number; from: string | null; to: string | null };
 counts: Summary | null;
 verification: { retrievedAt: string; prefixes: number; sources: typeof rangeSnapshot.sources };
 retentionDays: number;
 definitions: typeof DEFINITIONS;
 notes: string[];
};

export const NOTES = [
 "Counts are server-side HTTP requests. They are not people, sessions or visits.",
 "Agent identity is a header the client chose to send. Where a provider publishes the addresses its agents use, the claim is checked against that published list and reported as verified; where no list is published it is reported as declared and nothing more.",
 "A claim contradicted by its own provider's published addresses is recorded as refuted and excluded from every total on this page.",
 "No address, cookie, session, fingerprint or query string is stored. The finest record kept is an hourly count per path, agent and outcome.",
 "Paths this site does not publish are counted together as one line rather than named.",
 "Figures are recomputed at most once every five minutes, so they trail live traffic by up to that long.",
];

export async function readershipReport(days = WINDOW_DAYS): Promise<Report> {
 const counts = await summary(days, visiblePaths());
 return {
  site: "chrishayuk.com",
  recording: isRecording(),
  window: { days, from: counts?.from ?? null, to: counts?.to ?? null },
  counts,
  verification: { retrievedAt: rangeSnapshot.retrievedAt, prefixes: rangeSnapshot.prefixes, sources: rangeSnapshot.sources },
  retentionDays: RETENTION_DAYS,
  definitions: DEFINITIONS,
  notes: NOTES,
 };
}
