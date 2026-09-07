"use client";

import { useEffect, useRef, useState } from "react";

export function ErasingTrailer({ compact = false }: { compact?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setRun(true);
        observer.disconnect();
      }
    }, { threshold: compact ? 0.7 : 0.45 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [compact, cycle]);

  function replay() {
    setRun(false);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      setCycle(value => value + 1);
      setRun(true);
    }));
  }

  return <div ref={root} className={`agent-erasure${run ? " is-running" : ""}${compact ? " is-compact" : ""}`}>
    <span className="agent-erasure-readable">Co-authored-by: Claude &lt;noreply@anthropic.com&gt;. Removed in CI.</span>
    <div className="agent-erasure-line" aria-hidden="true" key={cycle}>
      <span>Co-authored-by: Claude &lt;noreply@anthropic.com&gt;</span>
      <i />
    </div>
    <div className="agent-erasure-result" aria-hidden="true">
      <span>×</span>
      <em>Removed in CI.</em>
    </div>
    {!compact && <button type="button" onClick={replay}>REPLAY THE CORRECTION ↻</button>}
  </div>;
}
