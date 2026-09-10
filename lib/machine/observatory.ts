import { recentDeclarations, isStoring, type DeclarationRow } from "./store.ts";
import { isCollectingFeedback, recentFeedback, type FeedbackReport } from "./feedback.ts";
import { machineRequestsAt } from "../readership/store.ts";

/**
 * Everything the private page shows, assembled here so the page stays
 * presentational and the clock stays out of a render.
 *
 * Immediate on purpose. The public guestbook is coarse and a day late
 * because anyone can read it; this is read by one person, crosses no
 * participant boundary, and so the delay would cost the only reader the
 * thing they need and buy nothing.
 */
const HOUR = 3_600_000;

export type ObservatorySnapshot = {
 storing: boolean;
 collectingFeedback: boolean;
 declarations: DeclarationRow[] | null;
 feedback: FeedbackReport[] | null;
 arrivalsToday: number | null;
 arrivalsWeek: number | null;
};

export async function observatorySnapshot(now = Date.now()): Promise<ObservatorySnapshot> {
 const hour = Math.floor(now / HOUR);
 const [declarations, feedback, arrivalsToday, arrivalsWeek] = await Promise.all([
  recentDeclarations(200),
  recentFeedback(100),
  machineRequestsAt("/machines", hour - 24, hour + 1),
  machineRequestsAt("/machines", hour - 168, hour + 1),
 ]);
 return {
  storing: isStoring(),
  collectingFeedback: isCollectingFeedback(),
  declarations, feedback, arrivalsToday, arrivalsWeek,
 };
}

export const hourLabel = (hour: number) =>
 new Date(hour * HOUR).toISOString().slice(0, 16).replace("T", " ") + "Z";
