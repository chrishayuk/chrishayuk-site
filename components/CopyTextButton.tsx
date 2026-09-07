"use client";

import {useId,useState} from "react";

export function CopyTextButton({label,text}:{label:string;text:string}){
 const id=useId();
 const [copied,setCopied]=useState(false);
 async function copy(){
  try{await navigator.clipboard.writeText(text);setCopied(true);window.setTimeout(()=>setCopied(false),1800);}
  catch{const field=document.getElementById(id) as HTMLTextAreaElement|null;field?.focus();field?.select();}
 }
 return <div className="social-copy-block">
  <div className="social-copy-heading"><label htmlFor={id}>{label}</label><button type="button" onClick={copy}>{copied?"COPIED ✓":"COPY"}</button></div>
  <textarea id={id} readOnly value={text} rows={Math.min(7,Math.max(3,text.split("\n").length+1))}/>
  <span className="sr-only" role="status" aria-live="polite">{copied?`${label} copied`:""}</span>
 </div>;
}
