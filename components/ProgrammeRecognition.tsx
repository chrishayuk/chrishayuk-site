'use client';
import {useState} from 'react';
import {selectionDescriptions} from '@/lib/machine-recognition';
import evidence from '@/public/data/machines/tool-recognition-2-evidence.json';
import {useMotion} from './Motion';

export function ProgrammeRecognition() {
 const [arm,setArm]=useState<keyof typeof selectionDescriptions>('DOCUMENT');
 const {paused}=useMotion();
 const subjects=evidence.subjects.filter(subject=>subject.arm===arm);
 const choices=subjects.filter(subject=>subject.declared==='B').length;
 return <figure className="programme-recognition">
  <figcaption>Recognition-2 / the description shown to the agent</figcaption>
  <div className="programme-options" role="group" aria-label="Choose the recorded description">{(['DOCUMENT','CAPABILITY'] as const).map(value=><button type="button" key={value} aria-pressed={arm===value} onClick={()=>setArm(value)}>{value==='DOCUMENT'?'As a document':'As a capability'}</button>)}</div>
  <div aria-live="polite" aria-atomic="true" className="programme-recognition-result" data-motion={!paused}>
   <blockquote key={arm}>{selectionDescriptions[arm]}</blockquote>
   <div className="programme-choice"><span><strong>{choices}</strong> / {subjects.length}</span><p>chose this provider first</p></div>
  </div>
  <p className="programme-figure-caption">Six recorded subjects per description. Title, URL and rank stayed fixed. First choice precedes fetching; later fetch failures limited use.</p>
 </figure>;
}
