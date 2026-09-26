"use client";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useMotion } from "./Motion";

/** One visible explanatory sequence owns motion; it stops offscreen or hidden. */
export function useFigureSequence(last: number, interval = 2600) {
  const element = useRef<HTMLElement>(null);
  const played = useRef(false);
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);
  const id = useId();
  const { register, request } = useMotion();
  useEffect(() => {
    if (!element.current) return;
    const unregister = register({ id, element: element.current,
      start: () => {
        if (played.current || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        played.current = true; setStep(0); setRunning(true);
      }, stop: () => setRunning(false),
    });
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const changed = () => { if (preference.matches) setRunning(false); };
    preference.addEventListener("change", changed);
    return () => { unregister(); preference.removeEventListener("change", changed); };
  }, [id, register]);
  useEffect(() => {
    if (!running || step === last) return;
    const timer = setTimeout(() => setStep(value => value + 1), interval);
    return () => clearTimeout(timer);
  }, [running, step, last, interval]);
  const select = useCallback((value: number) => { played.current = true; setRunning(false); setStep(value); }, []);
  const play = () => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { select(last); return; }
    played.current = false; request(id);
  };
  return { element, step, animate: running, running: running && step < last, select, play, pause: () => setRunning(false) };
}
