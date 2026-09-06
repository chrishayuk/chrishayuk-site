import data from "./data/addressed-memory.json" with { type: "json" };

export const addressedMemory = data;
const dot = (a: number[], b: number[]) => a.reduce((sum, x, i) => sum + x * b[i], 0);

/** Browser execution of the constructed FFN in the-mechanism/ffn.py. */
export function readAddress(index: number, suppressed: number | null = null) {
  if (!Number.isInteger(index) || index < 0 || index >= data.keys.length) throw new RangeError("Unknown address");
  const input = data.keys[index];
  const matches = data.keys.map(key => dot(key, input));
  const activations = matches.map((match, i) => i === suppressed ? 0 : Math.max(0, match));
  const output = Array.from({ length: data.dimensions }, (_, d) =>
    activations.reduce((sum, activation, i) => sum + activation * data.values[i][d], 0));
  const scores = data.readers.map(reader => dot(output, reader));
  const winner = scores.indexOf(Math.max(...scores));
  return { matches, activations, scores, answer: data.vocab[winner] };
}
