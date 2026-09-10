/** Spatial snapshots exported by the original Rust engine. Coordinates name tiles. */
export type ReplayOrganism = [id: number, tile: number, energy: number, species: number, program: number, threshold: number, descendant: number];
export type ReplayFrame = { tick: number; food: string; organisms: ReplayOrganism[]; births: number; deaths: number; kills: number };
export type ReplayHistory = { label: string; hash: string; frames: ReplayFrame[] };
export type WorldReplay = { version: number; kind: "lineage" | "ecology"; width: number; height: number; seed: string; promoters: string[]; histories: ReplayHistory[] };
export function foodAt(frame: ReplayFrame, tile: number): boolean {
  return (parseInt(frame.food[Math.floor(tile / 4)] ?? "0", 16) & (1 << (tile % 4))) !== 0;
}
/** Seek to the most recent recorded state, never invent an intermediate position. */
export function replayIndex(frames: ReplayFrame[], tick: number): number {
  let lo = 0, hi = frames.length - 1;
  while (lo < hi) { const mid = Math.ceil((lo + hi) / 2); if (frames[mid].tick <= tick) lo = mid; else hi = mid - 1; }
  return lo;
}
export function frameCounts(frame: ReplayFrame) {
  let predators = 0, program33 = 0, descendants = 0;
  for (const o of frame.organisms) { predators += o[3]; program33 += Number(o[4] === 33); descendants += o[6]; }
  return { population: frame.organisms.length, predators, grazers: frame.organisms.length - predators, program33, descendants };
}
export async function decodeReplay(bytes: ArrayBuffer): Promise<WorldReplay> {
  const magic = new Uint8Array(bytes, 0, Math.min(2, bytes.byteLength));
  // A host may already decode Content-Encoding. Accept both wire representations.
  const response = magic[0] === 0x1f && magic[1] === 0x8b
    ? new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream("gzip")))
    : new Response(bytes);
  const data = await response.json() as WorldReplay;
  if (data.version !== 1 || !data.histories?.[0]?.frames?.length || !data.width || !data.height) throw new Error("Invalid replay");
  return data;
}
