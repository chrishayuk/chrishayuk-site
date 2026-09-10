import evidence from "./data/cell80.json" with { type: "json" };

export const cell80 = evidence;
export const cell80Ids = ["N-CELL80-01", "N-CELL80-02", "N-CELL80-03"];
export const cell80Part = (id: string) => cell80Ids.indexOf(id) + 1;
export const signed = (value: number) => `${value > 0 ? "+" : value < 0 ? "−" : ""}${Math.abs(value).toLocaleString("en-GB")}`;

/** Whole-founder-population births, not the original focal-child endpoint. */
export function factorialAt(candidate: number, world: number) {
  const entry = evidence.interactions[candidate];
  const difference = entry?.differences[world];
  if (!entry || !difference) throw new RangeError("Unknown recorded candidate or world");
  const origin = Number(entry.candidate[1]);
  const rows = evidence.factorials.filter(row => row.origin === origin && row.seed === difference.seed);
  const births = (movement: boolean, numeric: boolean) => {
    const row = rows.find(row => row.movementNew === movement && row.numericNew === numeric);
    if (!row) throw new Error("Missing recorded genotype");
    return row.births;
  };
  const values = [births(false, false), births(false, true), births(true, false), births(true, true)];
  const oldBenefit = values[1] - values[0];
  const newBenefit = values[3] - values[2];
  return { values, oldBenefit, newBenefit, interaction: newBenefit - oldBenefit, seed: difference.seed };
}

export function dependenceGate(candidate: number) {
  const entry = evidence.interactions[candidate];
  if (!entry) throw new RangeError("Unknown recorded candidate");
  const interactions = entry.differences.map((_, index) => factorialAt(candidate, index).interaction);
  const positive = interactions.filter(value => value > 0).length;
  const mean = interactions.reduce((a, b) => a + b, 0) / interactions.length;
  return { positive, mean, passes: positive >= 4 && mean > 0 };
}
