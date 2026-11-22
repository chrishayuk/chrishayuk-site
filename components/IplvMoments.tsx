"use client";

import { useCallback, useEffect, useState } from "react";
import { FILES, Iplv, type Example, type State, type Structure } from "@/lib/iplv-machine";
import { Tree } from "./IplvMachine";

/**
 * One of the playground's decks, run in the note to a few chosen moments,
 * with the list structure the moment is about drawn as the playground draws
 * it. Nothing is recorded: each moment loads the deck and runs it that many
 * instructions, in the same WebAssembly machine as /demos/ipl-v.
 */
export type Moment = { label: string; steps: number; show: string; note: string };

type Seen = { s: State; tree: Structure | null; printed: string };

/** Load the deck in a fresh machine and run it to the moment. */
async function reach(example: Example, moment: Moment): Promise<Seen> {
  const m = await Iplv.create();
  m.load(example.deck, example.input);
  if (moment.steps > 0) m.advance(moment.steps, 0);
  const s = m.state();
  const root = moment.show ? m.resolve(moment.show) : s.h0.items[0].a;
  return { s, tree: root >= 0 ? m.structure(root, 60) : null, printed: m.output() };
}

export function IplvMoments({ label, deck, moments }: { label: string; deck: string; moments: Moment[] }) {
  const [example, setExample] = useState<Example | null>(null);
  const [at, setAt] = useState(0);
  const [seen, setSeen] = useState<Seen | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`${FILES}/examples.json`).then(r => r.json() as Promise<Example[]>).then(async list => {
      const found = list.find(e => e.name === deck) ?? null;
      if (cancelled || !found) return;
      setExample(found);
      const first = await reach(found, moments[0]);
      if (!cancelled) setSeen(first);
    });
    return () => { cancelled = true; };
  }, [deck, moments]);

  const show = useCallback(async (n: number) => {
    if (!example) return;
    setSeen(await reach(example, moments[n]));
    setAt(n);
  }, [example, moments]);

  const s = seen?.s;
  return <figure className="iplv-moments iplv-lab">
    <figcaption className="record-voice">{label}</figcaption>
    <ol className="iplv-moments-steps">{moments.map((moment, n) =>
      <li key={moment.label}><button type="button" aria-pressed={at === n} onClick={() => void show(n)}>{`${n + 1}. ${moment.label}`}</button></li>)}
    </ol>
    <p className="iplv-moments-note">{moments[at].note}</p>
    {seen?.tree ? <Tree tree={seen.tree} changed={new Set()} onPick={() => {}}/> : <p className="iplv-t">{example ? "" : "Loading the machine…"}</p>}
    {s && <p className="record-voice iplv-moments-facts">
      {s.halted ? "HALTED" : `${moments[at].steps} INSTRUCTIONS IN`} · AVAILABLE SPACE {s.free.toLocaleString()} OF {s.space.toLocaleString()} CELLS
      {seen?.printed ? ` · PRINTED ${seen.printed.trim().split("\n").join(" / ")}` : ""}
    </p>}
    <p className="iplv-moments-link record-voice"><a className="text-link" href={`/demos/ipl-v?deck=${deck}&steps=${moments[at].steps}&show=${encodeURIComponent(moments[at].show)}`}>STEP IT FROM HERE IN THE MACHINE ↗</a></p>
  </figure>;
}
