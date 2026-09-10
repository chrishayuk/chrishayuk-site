import Link from "next/link";
import preview from "@/lib/data/cell80-home-preview.json";

/** Lightweight recorded stills; the complete replay loads inside the Notebook. */
export function Cell80HomePreview({ href }: { href: string }) {
  return <Link href={`${href}#cell80-study`} className="cell80-home-preview" aria-label="Replay the two Cell80 worlds and explore the birth that changed their history">
    <div className="cell80-home-preview-heading record-voice"><span>ONE BIRTH / TWO HISTORIES</span><span>TICK {preview.tick.toLocaleString("en-GB")}</span></div>
    <div className="cell80-home-worlds">{preview.histories.map(history=><figure key={history.label}>
      <figcaption className="record-voice">{history.label}</figcaption>
      <img src={history.image} alt={`Recorded 32 by 32 world: ${history.population} organisms, ${history.share} carrying program 33.`} width={768} height={768} loading="lazy"/>
      <p><strong>{history.share}</strong><span className="record-voice">CARRY PROGRAM 33</span></p>
    </figure>)}</div>
    <p className="cell80-home-preview-explanation">Same starting world. Undo one inherited program change. Follow what happens next.</p>
    <div className="cell80-home-preview-footer record-voice"><span>RECORDED STATES / EX-4</span><span>REPLAY THE WORLD ↗</span></div>
  </Link>;
}
