import Link from 'next/link';
import type {ReactNode} from 'react';
import {resolveThreadStep, type ThreadStep} from '@/lib/threads';
import '@/app/programme-edition.css';

export function ProgrammeIntro({name,question,children}:{name:string;question:string;children:ReactNode}) {
 return <header className="programme-intro"><nav aria-label="Breadcrumb"><Link href="/research">Research</Link><span aria-hidden="true"> / </span><span>{name}</span></nav><h1>{question}</h1><div className="programme-intro-copy">{children}</div><a className="programme-link" href="#reading-order">Browse the reading order ↓</a></header>;
}

/** Stable step anchors retain existing links while the index stays compact. */
export function ProgrammeSequence({steps,label,stepAnchors={}}:{steps:ThreadStep[];label:string;stepAnchors?:Record<number,string>}) {
 return <section className="programme-reading" id="reading-order" aria-labelledby="reading-order-heading"><h2 id="reading-order-heading">Reading order</h2><ol aria-label={label}>{steps.map((raw,index)=>{
  const step=resolveThreadStep(raw);
  return <li id={`step-${index+1}`} key={step.id} data-hause-act="connection"><span id={stepAnchors[index+1]} className="programme-step">{String(index+1).padStart(2,'0')}</span><div><h3><Link href={step.url}>{step.title}</Link></h3><p>{step.text}</p><span className="programme-status">{step.status}</span></div></li>;
 })}</ol></section>;
}

export function ProgrammeContext({abstract,context}:{abstract:string;context:string}) {
 return <details className="programme-context"><summary>About this programme</summary><p>{abstract}</p><p>{context}</p></details>;
}
