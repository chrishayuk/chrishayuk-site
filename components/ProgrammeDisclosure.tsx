'use client';
import {useEffect,useRef,type ReactNode} from 'react';

/** Preserve incoming links to the field map and its individual questions. */
export function ProgrammeDisclosure({children,label}:{children:ReactNode;label:string}) {
 const root=useRef<HTMLDetailsElement>(null);
 useEffect(()=>{
  const reveal=()=>{
   let id:string;try{id=decodeURIComponent(location.hash.slice(1));}catch{return;}
   const target=id?document.getElementById(id):null;
   if(!target||!root.current?.contains(target))return;
   root.current.open=true;
   target.scrollIntoView({behavior:'instant',block:'start'});
  };
  reveal();window.addEventListener('hashchange',reveal);
  return()=>window.removeEventListener('hashchange',reveal);
 },[]);
 return <details ref={root} className="programme-context programme-disclosure"><summary>{label}</summary>{children}</details>;
}
