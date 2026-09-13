import Link from "next/link";
import { agentEcologyThread as thread, resolveThreadStep } from "@/lib/threads";
import { getRecord, recordPath } from "@/lib/records";
import { EcologyCard } from "./EcologyCard";
import "@/app/machine-peer.css";

/** Home and the thread use the same summary, members and replay destination. */
export function EcologyHomeFeature() {
 const steps = thread.steps.map(resolveThreadStep);
 const replay = getRecord(thread.replay.record)!;
 const replayPath = `${recordPath(replay)}#${thread.replay.anchor}`;
 return <section id="agent-ecology" className="home-ecology-feature" aria-labelledby="ecology-home-heading" data-hause-act="connection"><div><p className="kicker record-voice">AGENT ECOLOGY / {steps.length} CONNECTED NOTES</p><h2 id="ecology-home-heading"><Link href={thread.path}>{thread.title}</Link></h2><p>{thread.abstract}</p><div className="inline-links"><Link className="text-link" href={thread.path}>FOLLOW THE THREAD ↗</Link><Link className="text-link" href={replayPath}>{thread.replay.label} ↗</Link></div><ol className="home-ecology-notes" aria-label="Agent ecology reading order">{steps.map((step, index) => <li key={step.id}><Link href={step.url}><span className="record-voice">0{index+1} / </span>{step.title}</Link></li>)}</ol></div><Link href={replayPath} aria-label={`Replay ${replay.title}`}><EcologyCard id={replay.id}/></Link></section>;
}
