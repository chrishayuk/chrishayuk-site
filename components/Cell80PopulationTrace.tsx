"use client";

import { useEffect, useRef } from "react";

export function Cell80PopulationTrace({history, tick, label}:{history:{frames:number[][]}; tick:number; label:string}) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const draw = () => {
      const width = canvas.clientWidth, height = 150, ratio = window.devicePixelRatio || 1;
      canvas.width = width * ratio; canvas.height = height * ratio;
      const ctx = canvas.getContext("2d"); if (!ctx) return;
      ctx.scale(ratio,ratio); ctx.clearRect(0,0,width,height);
      const first = history.frames[0][0], last = history.frames.at(-1)![0];
      const x = (t:number) => 2 + (t-first) / (last-first) * (width - 4);
      const y = (n:number) => height - 3 - n / 256 * (height - 6);
      ctx.strokeStyle = "#d4d9c13d"; ctx.lineWidth = 1;
      for (const n of [0,128,256]) {ctx.beginPath();ctx.moveTo(0,y(n));ctx.lineTo(width,y(n));ctx.stroke();}
      for (const [field, color] of [[1,"#8c9185"],[2,"#e3b56b"],[3,"#f1eee5"]] as const) {
        ctx.beginPath();ctx.strokeStyle=color;ctx.lineWidth=1.5;
        history.frames.forEach((f,i)=>{if(i===0)ctx.moveTo(x(f[0]),y(f[field]));else ctx.lineTo(x(f[0]),y(f[field]));});ctx.stroke();
      }
      ctx.beginPath();ctx.strokeStyle="#f1eee5";ctx.setLineDash([3,4]);ctx.moveTo(x(tick),0);ctx.lineTo(x(tick),height);ctx.stroke();
    };
    draw();const observer = new ResizeObserver(draw);observer.observe(canvas);return()=>observer.disconnect();
  },[history,tick]);
  return <div className="cell80-barrier-trace"><div className="record-voice"><span>POPULATION / 0–256</span><span>ALL {history.frames.length.toLocaleString("en-GB")} RECORDED STEPS</span></div><canvas ref={ref} role="img" aria-label={label}/><div className="record-voice"><span>{history.frames[0][0].toLocaleString("en-GB")}</span><span>{Math.round((history.frames[0][0]+history.frames.at(-1)![0])/2).toLocaleString("en-GB")}</span><span>{history.frames.at(-1)![0].toLocaleString("en-GB")}</span></div></div>;
}
