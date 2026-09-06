import Link from "next/link";
import { threadPosition } from "@/lib/threads";

export function ThreadNavigation({ id }: { id: string }) {
  const position = threadPosition(id);
  if (!position) return null;
  const { thread, index, previous, next } = position;
  return <aside className="thread-navigation" data-hause-act="connection" aria-label="Follow this thread">
    <div className="thread-navigation-heading"><p className="record-voice">FOLLOW THE THREAD / {index + 1} OF {thread.steps.length}</p><Link href={`${thread.path}#step-${index+1}`}>{thread.title} ↗</Link></div>
    <nav aria-label="Continue the reading journey">
      {previous && <Link href={previous.url}><span className="record-voice">← PREVIOUS</span><span>{previous.title}</span></Link>}
      {next ? <Link href={next.url}><span className="record-voice">NEXT / {next.label} →</span><span>{next.title}</span></Link> : <Link href="/research/ffn-as-graph"><span className="record-voice">THE QUESTION REMAINS OPEN →</span><span>What if the FFN is a graph?</span></Link>}
    </nav>
  </aside>;
}
