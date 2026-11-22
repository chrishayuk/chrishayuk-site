"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The machine room of Turing's ACE: a job as a deck of cards in the reader's
 * hopper, a starting switch, the mercury delay lines, the control's lamps,
 * the punch and the listing. Closed, the switch starts an empty machine on
 * the order of zeros the report describes, which reads the first card.
 *
 * The console is public/demos/turing-ace/console.js, copied from the
 * turing-ace repository's web/ folder with worker.js, wasi.js and ace.wasm
 * beside it. It has no framework; this component loads it and gives it an
 * element. Rebuild it there and copy it across, rather than editing it here.
 */

type Job = { name: string; program: string; input?: string };
type Machine = { load: (job: Job) => Promise<boolean>; start: () => void; destroy: () => void };
type Module = { mountConsole: (host: HTMLElement, options: object) => Machine };

const MODULE = "/demos/turing-ace/console.js";

export function AceMachine({ job = "answer", compact = false, chooser = false, title }: {
  /** The name of a job in examples.json to put in the hopper. */
  job?: string;
  compact?: boolean;
  /** Offer every job in examples.json. */
  chooser?: boolean;
  title?: string;
}) {
  const host = useRef<HTMLDivElement | null>(null);
  const machine = useRef<Machine | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [chosen, setChosen] = useState(job);

  useEffect(() => {
    let gone = false;
    const address = new URL(MODULE, window.location.origin).href;
    Promise.all([
      import(/* webpackIgnore: true */ /* @vite-ignore */ address) as Promise<Module>,
      fetch("/demos/turing-ace/examples.json").then(response => response.json() as Promise<Job[]>),
    ]).then(([module, list]) => {
      if (gone || !host.current) return;
      setJobs(list);
      const speed = new URLSearchParams(window.location.search).get("speed") ?? "watch";
      machine.current = module.mountConsole(host.current, { compact, speed, title });
      const first = list.find(candidate => candidate.name === job) ?? list[0];
      if (first) void machine.current.load(first);
    }).catch(() => {
      if (host.current) host.current.textContent = "The machine could not be loaded.";
    });
    return () => { gone = true; machine.current?.destroy(); machine.current = null; };
  }, [job, compact, title]);

  const choose = (name: string) => {
    setChosen(name);
    const next = jobs.find(candidate => candidate.name === name);
    if (next && machine.current) void machine.current.load(next);
  };

  return <div className="ace-machine" data-ace-machine>
    {chooser && jobs.length > 0 && <label className="ace-machine-choose record-voice">THE DECK IN THE HOPPER
      <select value={chosen} onChange={event => choose(event.target.value)}>
        {jobs.map(candidate => <option key={candidate.name}>{candidate.name}</option>)}
      </select></label>}
    <div ref={host}/>
  </div>;
}
