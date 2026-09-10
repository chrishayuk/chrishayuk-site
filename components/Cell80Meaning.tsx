"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from "react";

const meanings = {
  tick: "One time step in the digital world. It is a simulation step, not a second of playback.",
  seed: "A number that fixes the random choices in a run. Reuse it with the same setup to replay the same history.",
  lineage: "An organism and its descendants: its family through time. A program can also exist in unrelated families.",
  threshold: "The inherited setting used by an organism’s reproduction program. Changing the setting can change when it reproduces.",
  plurality: "The largest single group. It can still contain fewer than half the population.",
  swap: "Replacing an inherited program with another at birth. The percentage is the chance for each eligible program.",
  composition: "A program made by combining existing programs. Different code can still produce the same behaviour.",
  primitive: "One of the existing, uncombined programs in the tested library: a building block for larger programs.",
  uptake: "How much of the nutrient an organism takes in. In this experiment, higher uptake also carries an energy cost.",
  future: "Two versions of the same setup run with matching future randomness, so their outcomes can be compared.",
  interaction: "How much the first change adds to the second change’s benefit. Here, it is measured by comparing birth counts.",
  gate: "A pass condition written down before the experiment ran. Seeing an interesting result does not change that condition.",
} as const;

/** Local exhibition annotations. The main explanation must stand without them. */
export function Cell80Meaning({term, children}:{term:keyof typeof meanings; children:ReactNode}) {
  const id = useId();
  const root = useRef<HTMLSpanElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const tip = useRef<HTMLSpanElement>(null);
  const leave = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const open = !dismissed && (hovered || focused || pinned);

  useLayoutEffect(() => {
    if (!open) return;
    const place = () => {
      if (!trigger.current || !tip.current) return;
      const anchor = trigger.current.getBoundingClientRect();
      const box = tip.current.getBoundingClientRect();
      const left = Math.max(12, Math.min(anchor.left, window.innerWidth - box.width - 12));
      const below = anchor.bottom + 6;
      const top = below + box.height <= window.innerHeight - 12 ? below : Math.max(12, anchor.top - box.height - 6);
      Object.assign(tip.current.style, {left:`${left}px`, top:`${top}px`, visibility:"visible"});
    };
    place();
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, true);
    return () => {window.removeEventListener("resize", place); window.removeEventListener("scroll", place, true);};
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const dismiss = () => {setDismissed(true); setPinned(false);};
    const outside = (event:PointerEvent) => {if (!root.current?.contains(event.target as Node)) dismiss();};
    const escape = (event:KeyboardEvent) => {if (event.key === "Escape") dismiss();};
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {document.removeEventListener("pointerdown", outside); document.removeEventListener("keydown", escape);};
  }, [open]);
  useEffect(() => () => {if (leave.current) clearTimeout(leave.current);}, []);

  return <span ref={root} className="cell80-meaning"
    onPointerEnter={event => {if (event.pointerType === "touch") return; if (leave.current) clearTimeout(leave.current); setHovered(true); setDismissed(false);}}
    onPointerLeave={() => {leave.current = setTimeout(() => setHovered(false), 160);}}>
    <button ref={trigger} type="button" aria-expanded={open} aria-controls={open ? id : undefined} aria-describedby={open ? id : undefined}
      onFocus={() => {setFocused(true); setDismissed(false);}}
      onBlur={() => {setFocused(false); setPinned(false);}}
      onClick={() => {setPinned(!pinned); setDismissed(pinned);}}>{children}</button>
    {open && <span ref={tip} id={id} role="tooltip" className="cell80-meaning-note" style={{visibility:"hidden"}}>{meanings[term]}</span>}
  </span>;
}
