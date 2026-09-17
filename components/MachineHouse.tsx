import { recentKey, type Room } from "@/lib/machine/live";
import { sharpnessClass, type Shown } from "./MachineOrbit";

type HouseRoom = "home" | "notebook" | "research" | "work" | "film";
const ROOM: Record<HouseRoom, { x: number; y: number; w: number; h: number; label: string; sub?: string }> = {
 home: { x: 70, y: 190, w: 250, h: 190, label: "HOME", sub: "the entrance" },
 notebook: { x: 440, y: 60, w: 260, h: 160, label: "NOTEBOOK" },
 research: { x: 770, y: 60, w: 260, h: 160, label: "RESEARCH" },
 work: { x: 780, y: 290, w: 220, h: 150, label: "WORK" },
 film: { x: 440, y: 290, w: 260, h: 150, label: "FILM" },
};
const HOUSE_ROOMS = Object.keys(ROOM) as HouseRoom[];
const isHouseRoom = (room: Room): room is HouseRoom => room in ROOM;
const center = (r: { x: number; y: number; w: number; h: number }) => ({ x: r.x + r.w / 2, y: r.y + r.h / 2 });

/** Falls straight in from above the room it's headed for — the floor plan
 * has no natural "outward" direction the way the orbit's rings do, so every
 * arrival drops in from outside the frame rather than from one fixed
 * corner (which only ever made sense for whichever room a scripted mock
 * had picked). */
function arrivalGeometry(room: HouseRoom) {
 const target = center(ROOM[room]);
 return { origin: { x: target.x, y: -30 }, target };
}

/** The house: the whole topology drawn plainly, always visible — this is
 * the explanatory view, not the one that conceals its own shape. */
export function MachineHouse({ shown, home }: { shown: Shown; home: number }) {
 const activeRoom = shown.kind === "event" && shown.row.purpose !== "automation" && isHouseRoom(shown.room) ? shown.room : null;
 const isAutomation = shown.kind === "event" && shown.row.purpose === "automation";
 const machOpacity = isAutomation || (shown.kind === "event" && shown.room === "machines") ? .65 : .18;

 const arrivalRoom = shown.kind === "event" && shown.row.purpose === "ai_user" && isHouseRoom(shown.room) ? shown.room : null;
 const arrivalGeom = arrivalRoom ? arrivalGeometry(arrivalRoom) : null;
 const sweepRoom = shown.kind === "event" && shown.row.purpose === "ai_search" && isHouseRoom(shown.room) ? shown.room : null;
 const washRoom = shown.kind === "event" && shown.row.purpose === "ai_training" && isHouseRoom(shown.room) ? shown.room : null;
 const sharp = shown.kind === "event" ? sharpnessClass(shown.row.confidence) : "";

 return <svg viewBox="0 0 1280 590" width="100%" height="590" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Floor plan of the site, drawn as rooms. Machines has no doorway from Home in this drawing because it is a declared interface, not a room a person visits.">
  <defs>
   {/* Same ids as MachineField's own defs — safe, since the two views are
       never mounted at once, and it's what lets the shared ml-soft /
       ml-atmospheric CSS classes (which hardcode url(#ml-glow) etc.) work
       in both views without a second copy of those rules. */}
   <filter id="ml-glow" x="-160%" y="-160%" width="420%" height="420%"><feGaussianBlur stdDeviation="6"/></filter>
   <filter id="ml-glow-soft" x="-200%" y="-200%" width="500%" height="500%"><feGaussianBlur stdDeviation="10"/></filter>
   <radialGradient id="ml-home-glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#e3b56b" stopOpacity="0.5"/><stop offset="100%" stopColor="#e3b56b" stopOpacity="0"/></radialGradient>
   <radialGradient id="ml-wash-grad" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#e3b56b" stopOpacity="0.5"/><stop offset="100%" stopColor="#e3b56b" stopOpacity="0"/></radialGradient>
  </defs>

  {/* corridors: solid = a doorway that exists in the site's own navigation */}
  <g stroke="#31352a" strokeWidth="9" strokeLinecap="round">
   <line x1="320" y1="280" x2="440" y2="150"/>
   <line x1="320" y1="330" x2="440" y2="380"/>
   <line x1="700" y1="150" x2="770" y2="150"/>
   <line x1="900" y1="230" x2="900" y2="290"/>
   <line x1="700" y1="380" x2="780" y2="380"/>
   <line x1="170" y1="420" x2="170" y2="450"/>
  </g>

  {/* readership: a decorative booth, not a room this view routes through — RECORD is a real link out, not this */}
  <g opacity=".5">
   <rect x="80" y="450" width="180" height="110" rx="4" fill="#14160f" stroke="#414637" strokeDasharray="4,4"/>
   <text x="98" y="480" fontFamily="var(--me-mono)" fontSize="11" letterSpacing=".08em" fill="#8f9285">READERSHIP</text>
   <text x="98" y="497" fontFamily="var(--me-mono)" fontSize="9" fill="#5c5f52">the observation booth</text>
  </g>

  {/* the one thread to MACHINES: no doorway, a dotted thread to a plain-text file — it isn't hard to find (it's in the footer and the sitemap), this is what kind of encounter it is */}
  <g className="ml-fade" style={{ opacity: machOpacity }}>
   <path d="M1040,505 C 880,560 760,560 700,585" stroke="#5c5f52" strokeWidth="2" strokeDasharray="1,6" strokeLinecap="round" fill="none"/>
   <path d="M700,585 L 690,600" stroke="#5c5f52" strokeWidth="2" strokeDasharray="1,6" strokeLinecap="round" fill="none"/>
   <text x="705" y="612" fontFamily="var(--me-mono)" fontSize="11" letterSpacing=".06em" fill="#6b6e60">llms.txt →</text>
   <rect x="1030" y="455" width="200" height="115" rx="4" fill="none" stroke="#6b6e60" strokeDasharray="4,4"/>
   <text x="1048" y="486" fontFamily="var(--me-mono)" fontSize="11" letterSpacing=".08em" fill="#8f9285">MACHINES</text>
   <text x="1048" y="503" fontFamily="var(--me-mono)" fontSize="9" fill="#5c5f52">a declared interface, not a content page</text>
  </g>

  {isAutomation && <circle cx="1130" cy="512" r="13" fill="#8f9285" filter="url(#ml-glow-soft)" className="ml-flicker"/>}

  {washRoom && shown.kind === "event" && <ellipse cx={center(ROOM[washRoom]).x} cy={center(ROOM[washRoom]).y} rx="260" ry="200" fill="url(#ml-wash-grad)" className={`ml-wash ${sharp}`}/>}

  {/* rooms */}
  {HOUSE_ROOMS.map(key => {
   const r = ROOM[key];
   const active = activeRoom === key;
   return <g key={key} className="ml-fade">
    {key === "home" && <rect x={r.x - 20} y={r.y - 20} width={r.w + 40} height={r.h + 40} rx="12" fill="url(#ml-home-glow)" style={{ opacity: home }}/>}
    <rect x={r.x} y={r.y} width={r.w} height={r.h} rx="4" fill="#171a13" stroke={active ? "#e3b56b" : "#414637"} strokeWidth={active ? 2 : 1} className="ml-room"/>
    <text x={r.x + 20} y={r.y + 32} fontFamily="var(--me-mono)" fontSize="12" letterSpacing=".08em" fill="#f1eee5">{r.label}</text>
    {r.sub && <text x={r.x + 20} y={r.y + 50} fontFamily="var(--me-mono)" fontSize="10" fill="#8f9285">{r.sub}</text>}
   </g>;
  })}

  {arrivalGeom && shown.kind === "event" && <g key={recentKey(shown.row)} className={sharp}>
   <path d={`M${arrivalGeom.origin.x},${arrivalGeom.origin.y} L${arrivalGeom.target.x},${arrivalGeom.target.y}`} stroke="#e3b56b" strokeWidth="1.2" fill="none" pathLength={100} className="ml-line-user"/>
   <path d="M-6,0 L0,-6 L6,0 L0,6 Z" fill="#e3b56b" transform={`translate(${arrivalGeom.origin.x},${arrivalGeom.origin.y})`} className="ml-arrive-user"/>
   <circle cx={arrivalGeom.target.x} cy={arrivalGeom.target.y} r="16" fill="none" stroke="#e3b56b" strokeWidth="1.4" className="ml-land-user"/>
  </g>}
  {sweepRoom && shown.kind === "event" && <rect key={recentKey(shown.row)} x={ROOM[sweepRoom].x} y={ROOM[sweepRoom].y} width={ROOM[sweepRoom].w} height={ROOM[sweepRoom].h} rx="4" fill="none" stroke="#e3b56b" strokeWidth="2.5" pathLength={100} filter="url(#ml-glow)" className={`ml-sweep-arc ${sharp}`}/>}
 </svg>;
}
