"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useMotion } from "./Motion";
const links = ["work", "film", "notebook", "research", "about", "ask"];
export function Header() {
  const path = usePathname(); const dialog = useRef<HTMLDialogElement>(null); const opener = useRef<HTMLButtonElement>(null);
  const { paused, setPaused, suspend } = useMotion();
  function close() { dialog.current?.close(); }
  useEffect(() => { dialog.current?.close(); }, [path]);
  useEffect(() => () => { document.body.style.overflow = ""; suspend(false); }, [suspend]);
  return <><a href="#main" className="skip-link">Skip to the story</a><header className={`site-header ${path === "/" ? "over-film" : ""}`}><Link href="/" className="wordmark" aria-label="Chris Hay home">CHRIS HAY</Link><nav className="desktop-nav" aria-label="Primary">{links.map(link => <Link key={link} href={`/${link}`} aria-current={path.startsWith(`/${link}`) ? "page" : undefined}>{link}</Link>)}</nav><button className="motion-toggle" onClick={() => setPaused(!paused)} aria-label={paused ? "Resume automatic motion" : "Pause all motion"}>{paused ? "MOTION OFF" : "PAUSE MOTION"}</button><button className="menu-toggle" ref={opener} onClick={() => { dialog.current?.showModal(); document.body.style.overflow = "hidden"; suspend(true); }}>MENU <span>＋</span></button></header><dialog ref={dialog} className="nav-dialog" onClose={() => { document.body.style.overflow = ""; suspend(false); opener.current?.focus(); }}><div className="dialog-top"><Link href="/" onClick={close} className="wordmark">CHRIS HAY</Link><button onClick={close} autoFocus>CLOSE ×</button></div><nav aria-label="Mobile primary">{links.map((link,i) => <Link key={link} href={`/${link}`} onClick={close}><span className="record-voice">0{i+1}</span>{link}<span>↗</span></Link>)}</nav><p className="record-voice">A RESEARCH HOUSE · LONDON · 2026</p></dialog></>;
}
