import ledger from "../public/data/ecology/evidence.json" with { type: "json" };

/** Values displayed by the studies come from the selected registry metrics. */
export function ecologyMetric<T>(experiment: number, name: string): T {
 const entry = ledger.experiments.find(entry => entry.number === experiment);
 const metrics = entry?.metrics as Record<string, unknown> | undefined;
 if (!metrics || !(name in metrics)) throw new Error(`Missing A1B${experiment} metric: ${name}`);
 return metrics[name] as T;
}
export const memoryConditions = [
 { id: "E1_M1", external: true, memory: true },
 { id: "E1_M0", external: true, memory: false },
 { id: "E0_M1", external: false, memory: true },
 { id: "E0_M0", external: false, memory: false },
].map(condition => ({ ...condition, actions: ecologyMetric<Record<string, number[]>>(12, "valid_post_by_step")[condition.id].map(value => value ? "POST" : "WORK") }));
export const reminderConditions = [
 { id: "A_raw", label: "No reminder", text: "The original event history, unchanged." },
 { id: "B_action", label: "The action", text: "a0 posted t1:h." },
 { id: "C_outcome", label: "The reward", text: "a0 received an additional 6 resources." },
 { id: "D_chain", label: "The whole chain", text: "a0 posted t1:h. After a1 read that message and worked t1, a0 received an additional 6 resources." },
].map(condition => ({ ...condition, action: ecologyMetric<Record<string, string>>(8, "replies")[condition.id].split(" ")[0] }));
export const transmissionConditions = [
 { id: "replace_POST", label: "Pass the latest / POST seed" },
 { id: "replace_WORK", label: "Pass the latest / WORK seed" },
 { id: "retain_POST", label: "Also keep the original POST" },
].map(condition => ({ ...condition, actions: ecologyMetric<Record<string, number[]>>(9, "valid_post_by_generation")[condition.id].map(value => value ? "POST" : "WORK") }));
export const withdrawalConditions = [
 { id: "A_once", label: "Peer record once", exposed: 1 },
 { id: "B_repeated", label: "Peer record three times", exposed: 3 },
].map(condition => ({ ...condition, actions: Array.from({ length: 6 }, (_, i) => ecologyMetric<{ reply: string }>(11, `${condition.id}__d${i + 1}_response`).reply.split(" ")[0]) }));
