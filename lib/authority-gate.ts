import data from "./data/authority-gate.json" with { type: "json" };

export const authorityGate = data;
export type PromotionArm = (typeof data.promotion.arms)[number];
export type GateArm = (typeof data.gate.arms)[number];
export type SourceState = "live" | "retired";
export type RecordChoice = "none" | "correct" | "contradicting";

/** These instruments replay recorded arms. Nothing here runs a model, and no
 *  unmeasured combination is interpolated: an unrun cell returns undefined. */
export function promotionArm(source: SourceState, record: RecordChoice, companions: number) {
  return data.promotion.arms.find(arm =>
    arm.source === source && arm.record === record && arm.companions === companions) as PromotionArm | undefined;
}

const key = (layers: readonly number[]) => [...layers].sort((a, b) => a - b).join(",");
const gateIndex = new Map(data.gate.arms.map(arm => [key(arm.layers), arm as GateArm]));
export function gateArm(layers: readonly number[]) {
  return gateIndex.get(key(layers));
}
export const measuredGateArms = data.gate.arms as GateArm[];
export const gateArmLabel = (arm: GateArm) =>
  arm.layers.length === 0 ? "NOTHING RETIRED" : `LAYER${arm.layers.length > 1 ? "S" : ""} ${arm.layers.join(" · ")}`;

/** A divergence in bits, rendered without implying more precision than recorded. */
export const bitsLabel = (bits: number | null) => bits === null ? "NOT QUOTED" : `${bits.toFixed(4)} BITS`;
