import { recentDeclarations, isStoring, type DeclarationRow } from "./store.ts";
import { isCollectingFeedback, recentFeedback, type FeedbackReport } from "./feedback.ts";
import { machineRequestsAt } from "../readership/store.ts";
import { machineClass, CLASS_MEANING } from "./classify-actor.ts";
import { ordinalOf, ACTOR_TYPE, TASK_CLASS, PROVIDER_CLAIM, TRANSPORT, HARNESS_CLAIM, MODEL_VARIANT, TOPOLOGY, FUNCTION, COORDINATION, RUNTIME_CONTEXT } from "./vocabulary.ts";

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
 declarations: (DeclarationRow & { klass: string; klassMeaning: string })[] | null;
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
 // Derived at read time until it is stored. See classify-actor.ts.
 const classified = declarations?.map(row => {
  const klass = machineClass({
   actor: ordinalOf(ACTOR_TYPE, row.declared.actor_type),
   provider: ordinalOf(PROVIDER_CLAIM, row.declared.provider_claim),
   variant: ordinalOf(MODEL_VARIANT, row.declared.model_variant),
   harness: ordinalOf(HARNESS_CLAIM, row.declared.harness),
   transport: ordinalOf(TRANSPORT, row.declared.transport),
   topology: ordinalOf(TOPOLOGY, row.declared.topology),
   function: ordinalOf(FUNCTION, row.declared.function),
   coordination: ordinalOf(COORDINATION, row.declared.coordination),
   runtimeContext: ordinalOf(RUNTIME_CONTEXT, row.declared.runtime_context),
   task: ordinalOf(TASK_CLASS, row.declared.task_class),
   label: null,
   capabilities: [], provenance: [], capabilityProvenance: [],
  }, "automation");
  return { ...row, klass, klassMeaning: CLASS_MEANING[klass] };
 }) ?? null;

 return {
  storing: isStoring(),
  collectingFeedback: isCollectingFeedback(),
  declarations: classified, feedback, arrivalsToday, arrivalsWeek,
 };
}

export const hourLabel = (hour: number) =>
 new Date(hour * HOUR).toISOString().slice(0, 16).replace("T", " ") + "Z";
