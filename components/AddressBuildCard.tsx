"use client";
import { useEffect, useId, useRef, useState } from "react";
import { useMotion } from "./Motion";
import { components, format, readability } from "@/lib/address-build";

const depths = [8, 16, 20, 24, 28] as const;
/** All measurements remain visible in the still; motion only traces depth. */
export function AddressBuildCard({ compact = false }: { compact?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const [active, setActive] = useState(false);
  const { register, request, setPaused } = useMotion();
  useEffect(() => {
    if (compact || !ref.current) return;
    return register({ id, element: ref.current, start: () => setActive(true), stop: () => setActive(false) });
  }, [compact, id, register]);
  return <div ref={ref} className="address-teaser" data-running={active} data-compact={compact}>
    <div className="address-teaser-heading record-voice"><span>ADDRESS-BUILD-1</span><span>GEMMA 3 4B IT</span></div>
    <p className="address-teaser-proposition">Relation first.<br /><em>Entity later.</em></p>
    <div className="address-teaser-grid" role="table" aria-label="Recorded same-layer reader accuracy at five depths">
      <div className="address-teaser-row record-voice" role="row"><span role="columnheader">DEPTH</span>{depths.map(layer => <span role="columnheader" key={layer}>L{layer}{layer === 28 ? "*" : ""}</span>)}</div>
      {components.map(component => <div className="address-teaser-row" data-component={component} role="row" key={component}><span className="record-voice" role="rowheader">{component.toUpperCase()}</span>{depths.map(layer => <span role="cell" key={layer} data-endpoint={layer === 28}><i aria-hidden="true" style={{ height: `${readability(layer, component) * 28}px` }}/>{format(readability(layer, component))}</span>)}</div>)}
      <span className="address-teaser-sweep" aria-hidden="true"/>
    </div>
    <p className="address-teaser-scope">Measured reader accuracy. *L28 may already decode the answer token.<br />Capital vs language · final-position residual.</p>
    {!compact && <div className="address-teaser-footer record-voice"><span>EXPLORE THE DEPTH →</span><button onClick={() => active ? setPaused(true) : request(id)}>{active ? "PAUSE Ⅱ" : "PLAY ▷"}</button></div>}
  </div>;
}
