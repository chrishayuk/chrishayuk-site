"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { EvidenceMark } from "./MachineEvidence";
import { MachineOrbit, type Shown } from "./MachineOrbit";
import { MachineHouse } from "./MachineHouse";
import {
 activityInHours, homeBrightness, hourBucket, newSince, quietTicker,
 recentKey, roomOf, tickerFor, type RecentRow,
} from "@/lib/machine/live";

const POLL_MS = 60_000;
const TICK_MS = 4300;
const PEAK_HOME: Record<string, number> = { ai_user: .55, ai_search: .6, ai_training: .95, automation: .35 };

export type View = "field" | "house";

const HEADING: Record<View, { title: string; sub: string }> = {
 field: { title: "The orbit.", sub: "HOME IS THE CENTRE · MACHINES SITS OUTSIDE EVERY RING" },
 house: { title: "The house.", sub: "THE WHOLE TOPOLOGY, ALWAYS VISIBLE · MACHINES HAS NO DOORWAY IN THIS DRAWING" },
};

/**
 * THE ROOMS ARE NEARLY INVISIBLE UNTIL SOMETHING TOUCHES THEM — in FIELD.
 *
 * This is the orchestrator: it owns the live-data state (the same polling,
 * diffing and ticking this page has always used) and lends it to whichever
 * of the two presentation components — MachineField (the orbit) or
 * MachineHouse (the floor plan) — is currently selected. Switching views is
 * a state change, not a navigation: the same `shown` value renders in both,
 * so an event showing in FIELD is still showing, in the same room, if you
 * switch to HOUSE mid-animation. RECORD is not a third view rendered here —
 * it's a real link out to /readership, which stays exactly as it is.
 */
export function MachineLive({ initialRecent, initialView }: { initialRecent: RecentRow[]; initialView: View }) {
 const router = useRouter();
 const pathname = usePathname();
 const [view, setView] = useState<View>(initialView);

 const seen = useRef(new Set(initialRecent.map(recentKey)));
 const queue = useRef<RecentRow[]>([]);
 const lastEventAt = useRef<number | null>(null);
 const [recent, setRecent] = useState(initialRecent);
 const [shown, setShown] = useState<Shown>({ kind: "quiet", ticker: "" });

 useEffect(() => {
  lastEventAt.current = mostRecentHourMs(initialRecent) ?? Date.now();
  setShown({ kind: "quiet", ticker: quietTicker(minutesSince(lastEventAt.current)) });

  let cancelled = false;
  const poll = async () => {
   try {
    const response = await fetch("/api/readership", { cache: "no-store" });
    if (!response.ok || cancelled) return;
    const data = await response.json() as { counts?: { recent?: RecentRow[] } };
    const rows: RecentRow[] = data.counts?.recent ?? [];
    if (rows.length === 0) return;
    setRecent(rows);
    const arrivals = newSince(rows, seen.current);
    for (const row of arrivals) seen.current.add(recentKey(row));
    queue.current.push(...arrivals);
   } catch {
    // A failed poll leaves the last known state on screen rather than
    // inventing a gap — the same choice lib/readership/store.ts makes
    // when a write fails: never throw, never fabricate a zero.
   }
  };
  poll();
  const pollId = setInterval(poll, POLL_MS);

  const tick = () => {
   const next = queue.current.shift();
   if (next) {
    lastEventAt.current = Date.now();
    setShown({ kind: "event", row: next, ticker: tickerFor(next), room: roomOf(next.path) });
   } else {
    setShown({ kind: "quiet", ticker: quietTicker(minutesSince(lastEventAt.current ?? Date.now())) });
   }
  };
  const tickId = setInterval(tick, TICK_MS);

  return () => { cancelled = true; clearInterval(pollId); clearInterval(tickId); };
  // initialRecent seeds this exactly once, at mount, by design.
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, []);

 const now = new Date();
 const baseline = homeBrightness(activityInHours(recent, [hourBucket(now), hourBucket(new Date(now.getTime() - 3_600_000))]));
 const home = shown.kind === "event" ? (PEAK_HOME[shown.row.purpose] ?? baseline) : baseline;

 const switchTo = (next: View) => {
  setView(next);
  router.replace(next === "field" ? pathname : `${pathname}?view=${next}`, { scroll: false });
 };

 return <>
  <div role="tablist" aria-label="Representation" className="ml-tabs">
   <button type="button" role="tab" aria-selected={view === "field"} className="ml-tab" onClick={() => switchTo("field")}>FIELD</button>
   <button type="button" role="tab" aria-selected={view === "house"} className="ml-tab" onClick={() => switchTo("house")}>HOUSE</button>
   <Link href="/readership" className="ml-tab ml-tab-out">RECORD ↗</Link>
  </div>

  <div className="me-section-head"><h2 id="live-heading">{HEADING[view].title}</h2><p className="record-voice">{HEADING[view].sub}</p></div>

  <div className="ml-stage">
   {view === "field" ? <MachineOrbit shown={shown} home={home}/> : <MachineHouse shown={shown} home={home}/>}
  </div>

  <div className="ml-ticker"><span aria-hidden="true">→ </span>{shown.ticker}</div>

  <div className="ml-legend-row">
   <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
    <span style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 10, letterSpacing: ".07em", color: "#8f9285" }}><EvidenceMark confidence="verified"/>VERIFIED</span>
    <span style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 10, letterSpacing: ".07em", color: "#8f9285" }}><EvidenceMark confidence="declared"/>CLAIMED</span>
    <span style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 10, letterSpacing: ".07em", color: "#8f9285" }}><EvidenceMark confidence="inferred"/>INTERPRETED</span>
    <span style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 10, letterSpacing: ".07em", color: "#8f9285" }}><EvidenceMark confidence="none"/>UNKNOWN</span>
   </div>
  </div>
 </>;
}

function mostRecentHourMs(rows: RecentRow[]): number | null {
 if (rows.length === 0) return null;
 // "YYYY-MM-DD HH:00Z" — the same shape lib/readership/store.ts's iso() writes.
 const ms = rows.map(row => Date.parse(row.hour.replace(" ", "T")));
 return Math.max(...ms);
}

function minutesSince(atMs: number): number {
 return (Date.now() - atMs) / 60_000;
}
