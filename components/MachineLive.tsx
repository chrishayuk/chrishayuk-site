"use client";

import { useEffect, useRef, useState } from "react";
import { EvidenceMark } from "./MachineEvidence";
import {
 activityInHours, homeBrightness, hourBucket, newSince, quietTicker,
 recentKey, roomOf, tickerFor, type RecentRow, type Room,
} from "@/lib/machine/live";

const POLL_MS = 60_000;
const TICK_MS = 4300;
const PEAK_HOME: Record<string, number> = { ai_user: .55, ai_search: .6, ai_training: .95, automation: .35 };
const CENTER = { x: 560, y: 300 };

type RingRoom = "notebook" | "research" | "work" | "film";
const NODE: Record<RingRoom, { x: number; y: number; r: number; lx: number; ly: number; label: string }> = {
 notebook: { x: 614, y: 238, r: 85, lx: 628, ly: 228, label: "NOTEBOOK" },
 research: { x: 700, y: 255, r: 145, lx: 714, ly: 245, label: "RESEARCH" },
 work: { x: 700, y: 430, r: 205, lx: 714, ly: 450, label: "WORK" },
 film: { x: 370, y: 480, r: 265, lx: 290, ly: 500, label: "FILM" },
};
const RING_ROOMS = Object.keys(NODE) as RingRoom[];
const isRingRoom = (room: Room): room is RingRoom => room in NODE;

const angleTo = (p: { x: number; y: number }) => Math.atan2(p.y - CENTER.y, p.x - CENTER.x);
const pointAt = (radius: number, angle: number) => ({ x: CENTER.x + radius * Math.cos(angle), y: CENTER.y + radius * Math.sin(angle) });

/** Where a "someone read this" arrival draws from and lands — the same
 * direction as the room's own position, extended past the outer instrument
 * ring, so it always arrives "from beyond the boundary" whichever room it's
 * actually headed for, rather than a fixed line that only ever made sense
 * for the one room the design spike scripted. */
function arrivalGeometry(room: RingRoom) {
 const angle = angleTo(NODE[room]);
 return { origin: pointAt(335, angle), target: NODE[room] };
}

/** A short arc on the room's own ring, centred on its actual position. */
function sweepArc(room: RingRoom): string {
 const node = NODE[room];
 const angle = angleTo(node);
 const p1 = pointAt(node.r, angle - 0.26), p2 = pointAt(node.r, angle + 0.26);
 return `M${p1.x.toFixed(1)},${p1.y.toFixed(1)} A${node.r},${node.r} 0 0,1 ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
}

/** Evidence, not purpose, decides how resolved a shape looks — kept as a
 * separate axis exactly as the approved design spike drew it. */
function sharpnessClass(confidence: string): string {
 if (confidence === "verified") return "";
 if (confidence === "declared") return "ml-soft";
 return "ml-atmospheric"; // inferred, none
}

type Shown = { kind: "quiet"; ticker: string } | { kind: "event"; row: RecentRow; ticker: string; room: Room };

/**
 * THE ROOMS ARE NEARLY INVISIBLE UNTIL SOMETHING TOUCHES THEM.
 *
 * A client component for the same reason components/MachineEvidence.tsx is
 * one: it needs a clock and an interval, and nothing else on this page does.
 * Every number here that becomes a shape comes from lib/machine/live.ts,
 * which has no clock and no fetch of its own — this file supplies both.
 *
 * Every event shown here already happened; polling can only discover it
 * late, never invent one. `initialRecent` — server-rendered, the same data
 * /api/readership already serves publicly — seeds the "already seen" set so
 * the first paint never plays a burst of stale arrivals as if they just
 * happened.
 */
export function MachineLive({ initialRecent }: { initialRecent: RecentRow[] }) {
 const seen = useRef(new Set(initialRecent.map(recentKey)));
 const queue = useRef<RecentRow[]>([]);
 // Refs must not be read during render (only in effects/handlers), so the
 // clock-dependent "when did something last happen" value lives here and is
 // only ever set inside the mount effect and tick(), never read until then.
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
 const activeRing = shown.kind === "event" ? shown.row.purpose !== "automation" && isRingRoom(shown.room) ? shown.room : null : null;
 const isAutomation = shown.kind === "event" && shown.row.purpose === "automation";
 const machOpacity = isAutomation || (shown.kind === "event" && shown.room === "machines") ? .65 : .18;

 const arrival = shown.kind === "event" && shown.row.purpose === "ai_user" && isRingRoom(shown.room) ? arrivalGeometry(shown.room) : null;
 const sweepD = shown.kind === "event" && shown.row.purpose === "ai_search" && isRingRoom(shown.room) ? sweepArc(shown.room) : null;
 const sharp = shown.kind === "event" ? sharpnessClass(shown.row.confidence) : "";

 return <>
  <div className="ml-stage">
   <svg viewBox="0 0 1280 590" width="100%" height="590" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Orbital map of the site. Rings stay faint until real machine contact reveals part of the house.">
    <defs>
     <filter id="ml-glow" x="-160%" y="-160%" width="420%" height="420%"><feGaussianBlur stdDeviation="6"/></filter>
     <filter id="ml-glow-soft" x="-200%" y="-200%" width="500%" height="500%"><feGaussianBlur stdDeviation="10"/></filter>
     <radialGradient id="ml-home-glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#e3b56b" stopOpacity="0.55"/><stop offset="100%" stopColor="#e3b56b" stopOpacity="0"/></radialGradient>
     <radialGradient id="ml-wash-grad" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#e3b56b" stopOpacity="0.5"/><stop offset="100%" stopColor="#e3b56b" stopOpacity="0"/></radialGradient>
    </defs>

    <circle cx={CENTER.x} cy={CENTER.y} r="322" fill="none" stroke="#2a2d22" strokeWidth="1" strokeDasharray="1,7"/>
    <text x="238" y="66" fontFamily="var(--me-mono)" fontSize="10" letterSpacing=".08em" fill="#4a4d40">READERSHIP — THE INSTRUMENT</text>

    {RING_ROOMS.map(room => <circle key={room} className="ml-fade" cx={CENTER.x} cy={CENTER.y} r={NODE[room].r} fill="none" stroke="#e3b56b" strokeWidth="1" style={{ opacity: activeRing === room ? .5 : .05 }}/>)}

    {shown.kind === "event" && shown.row.purpose === "ai_training" && <ellipse cx="660" cy="310" rx="260" ry="200" fill="url(#ml-wash-grad)" className={`ml-wash ${sharp}`}/>}

    <g className="ml-fade" style={{ opacity: machOpacity }}>
     <path d="M1150,470 C 1000,540 900,545 862,540" stroke="#5c5f52" strokeWidth="2" strokeDasharray="1,6" strokeLinecap="round" fill="none"/>
     <text x="835" y="560" fontFamily="var(--me-mono)" fontSize="11" letterSpacing=".06em" fill="#6b6e60" textAnchor="end">llms.txt →</text>
     <circle cx="1150" cy="470" r="16" fill="none" stroke="#6b6e60" strokeDasharray="3,3"/>
     <text x="1150" y="500" fontFamily="var(--me-mono)" fontSize="11" letterSpacing=".08em" fill="#8f9285" textAnchor="middle">MACHINES</text>
     <text x="1150" y="514" fontFamily="var(--me-mono)" fontSize="9" fill="#5c5f52" textAnchor="middle">a declared interface, not a content page</text>
    </g>

    {isAutomation && <circle cx="1150" cy="470" r="13" fill="#8f9285" filter="url(#ml-glow-soft)" className="ml-flicker"/>}

    <circle cx={CENTER.x} cy={CENTER.y} r="50" fill="url(#ml-home-glow)" className="ml-fade" style={{ opacity: home }}/>
    <circle cx={CENTER.x} cy={CENTER.y} r="8" fill="#e3b56b" className="ml-sun ml-fade" style={{ opacity: home }}/>
    <text x={CENTER.x} y={CENTER.y + 32} fontFamily="var(--me-mono)" fontSize="11" letterSpacing=".08em" fill="#8f9285" textAnchor="middle">HOME</text>

    <g fontFamily="var(--me-mono)" fontSize="11" letterSpacing=".08em" fill="#8f9285">
     {RING_ROOMS.map(room => <g key={room}><circle cx={NODE[room].x} cy={NODE[room].y} r="3.5" fill="#8f9285"/><text x={NODE[room].lx} y={NODE[room].ly}>{NODE[room].label}</text></g>)}
    </g>

    {arrival && shown.kind === "event" && <g key={recentKey(shown.row)} className={sharp}>
     <path d={`M${arrival.origin.x.toFixed(1)},${arrival.origin.y.toFixed(1)} L${arrival.target.x},${arrival.target.y}`} stroke="#e3b56b" strokeWidth="1.2" fill="none" pathLength={100} className="ml-line-user"/>
     <path d="M-6,0 L0,-6 L6,0 L0,6 Z" fill="#e3b56b" transform={`translate(${arrival.origin.x.toFixed(1)},${arrival.origin.y.toFixed(1)})`} className="ml-arrive-user"/>
     <circle cx={arrival.target.x} cy={arrival.target.y} r="14" fill="none" stroke="#e3b56b" strokeWidth="1.4" className="ml-land-user"/>
    </g>}
    {sweepD && shown.kind === "event" && <path key={recentKey(shown.row)} d={sweepD} stroke="#e3b56b" strokeWidth="3" fill="none" pathLength={100} strokeLinecap="round" filter="url(#ml-glow)" className={`ml-sweep-arc ${sharp}`}/>}
   </svg>
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
