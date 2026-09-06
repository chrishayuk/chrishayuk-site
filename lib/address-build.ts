import causal from "../public/data/address-build-1/causal.json" with { type: "json" };
import reader from "../public/data/address-build-1/reader.json" with { type: "json" };

// Exact aggregates from the registered source commit, not reconstructed curves.
export { causal, reader };
export const layers = [8, 12, 16, 20, 24, 28, 30] as const;
export type Layer = typeof layers[number];
export type Component = "relation" | "entity" | "binding";
export const components: Component[] = ["relation", "entity", "binding"];
export const arms = ["T1_same_binding", "T2_diff_entity", "T3_diff_relation", "T4_unrelated"] as const;
export const armNames = ["Same binding / new wording", "Different entity / same relation", "Same entity / different relation", "Unrelated donor"];
export const sourceCommit = "f97a470644df1c38498030896f8f6cfffe7689b1";
export const sourceRoot = `https://github.com/chrishayuk/larql/tree/${sourceCommit}/bench/native-record/selector-dev`;
export const format = (value: number) => value.toFixed(2);
export const percent = (value: number) => `${Math.round(value * 100)}%`;
export const readability = (layer: Layer, component: Component) => reader.same_layer_readability[component][`L${layer}`];
export const transplant = <A extends typeof arms[number] = "T2_diff_entity">(layer: Layer, arm: A = "T2_diff_entity" as A) => causal.summary[`L${layer}`][arm];
export const stageNotes: Record<Layer, { title: string; text: string }> = {
  8: { title: "The relation is already there.", text: "Capital or language is readable, and changing the relation is already causally consequential. Entity and binding readers remain weak." },
  12: { title: "The reader needs new coordinates.", text: "Across L8 → L12, raw relation transfer falls to .39. Orthogonal alignment restores .90. Rescaling alone changes nothing." },
  16: { title: "The wording can change. So can the country.", text: "Same-binding and wrong-entity swaps both retain the recipient answer in 46 of 48 cases. This is relation-frame convergence, not binding convergence." },
  20: { title: "A different country still cannot take over.", text: "Wrong-entity donors preserve 46 of 48 recipient answers and impose their own answer zero times. Earlier prompt positions still carry the recipient’s entity." },
  24: { title: "Entity binding begins to rise.", text: "Entity readability reaches .30; binding reaches .45. A wrong-entity donor now supplies 6 of 48 answers. The relation reader has changed coordinates again." },
  28: { title: "Now the donor supplies the answer.", text: "Wrong-entity donors win all 48 cases. Perfect entity and binding readability may decode the answer token itself. This is an endpoint, not clean address geometry." },
  30: { title: "The answer is explicit.", text: "Donor-answer rate remains 100%. This endpoint band cannot distinguish a constructed address from direct answer-token transport." },
};
