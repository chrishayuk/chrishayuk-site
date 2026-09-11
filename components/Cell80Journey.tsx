import Link from "next/link";
import { getRecord, isListed, recordPath } from "@/lib/records";
import { cell80Journey } from "@/lib/cell80-journey";

export function Cell80Journey({ id, expanded = false }: { id?: string; expanded?: boolean }) {
  return <nav className="cell80-journey" data-expanded={expanded} aria-label="Cell80 experiment journey">
    <div className="cell80-journey-heading record-voice"><Link href="/thread/cell80">ONE QUESTION LEADS TO ANOTHER ↗</Link><span>{expanded ? "READING ORDER / DIFFERENT EXPERIMENTS" : "EXPLORE THE SIX NOTES"}</span></div>
    <ol>{cell80Journey.map((step, i) => {
      const record = getRecord(step.id);
      if (!record || !isListed(record)) return null;
      return <li key={step.id}><Link href={recordPath(record)} aria-current={id === step.id ? "page" : undefined}>
        <span className="record-voice">0{i + 1}<span aria-hidden="true">{i === cell80Journey.length - 1 ? "↗" : "→"}</span></span>
        <strong>{step.short}</strong>{expanded && <><small className="record-voice">{step.experiment}</small><h2>{step.question}</h2><p>{step.finding}</p></>}
      </Link></li>;
    })}</ol>
  </nav>;
}

export function Cell80Connection({ id }: { id: string }) {
  const index = cell80Journey.findIndex(step => step.id === id);
  if (index < 0) return null;
  const step = cell80Journey[index];
  const next = getRecord(cell80Journey[index + 1]?.id ?? "");
  return <aside className="cell80-connection" data-hause-act="connection">
    <span className="record-voice">{next ? "WHAT THIS MAKES US ASK NEXT" : "THE QUESTION LEFT OPEN"}</span>
    <p>{step.bridge}</p>
    {next && isListed(next) ? <Link className="text-link" href={recordPath(next)}>{next.title} →</Link> : <Link className="text-link" href="/thread/cell80">RETURN TO THE EXPERIMENTS ↗</Link>}
  </aside>;
}
