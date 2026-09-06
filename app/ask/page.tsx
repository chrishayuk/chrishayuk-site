import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import {searchGraph, recordGraph, type GraphScope, type SearchResult} from "@/lib/graph";
import {durationLabel} from "@/lib/youtube";
export const metadata=pageMetadata('Ask the work','Search Chris Hay’s systems, notebook, questions, film chapters and indexed transcript passages. Every result returns to its source.','/ask');
const first=(v:string|string[]|undefined)=>Array.isArray(v)?v[0]:v;
function sourceLabel(r:SearchResult){
 if(r.basis==="draft-record")return `EDITORIAL DRAFT${r.actKind?` / ${r.actKind.toUpperCase()}`:""}`;
 if(r.basis==="automatic-caption")return `AUTOMATIC CAPTIONS / ${durationLabel(r.start!)}`;
 if(r.basis==="source-chapter")return `SOURCE CHAPTER / ${durationLabel(r.start!)} · TITLE, NOT TRANSCRIPT`;
 return ({"curated-thread":"CURATED THREAD / WORKING EDITION","constructed-example":"INTERACTIVE STUDY / CONSTRUCTED EXAMPLE","verified-appearance-register":"VERIFIED APPEARANCE REGISTER","catalogue-index":"CATALOGUE INDEX","author-description":"THE PRACTICE / AUTHOR DESCRIPTION","published-record":"PUBLISHED RECORD","record-associations":"CONCEPT / DISCOVERY ASSOCIATIONS","title-only":"TITLE MATCH / TRANSCRIPT NOT INDEXED","title-and-description":"TITLE & DESCRIPTION"} as Record<string,string>)[r.basis]||r.basis;
}
export default async function Page({searchParams}:{searchParams:Promise<{[key:string]:string|string[]|undefined}>}){
 const params=await searchParams;const q=(first(params.q)||"").slice(0,500);
 const scope=(["records","films","concepts"].includes(first(params.scope)||"")?first(params.scope):"all") as GraphScope;
 const includeDrafts=first(params.drafts)!=="exclude";const results=searchGraph(q,{scope,includeDrafts});const coverage=recordGraph().coverage;
 return <main id="main" className="ask-page"><p className="kicker record-voice">THE CONNECTED RECORD</p><h1>Ask<br/><em>the work.</em></h1><p className="dek">Find the question. Follow the work. Return to the source.</p>
  <form action="/ask" className="ask-form"><label htmlFor="ask-query" className="record-voice">SEARCH THE WORK</label><div><input id="ask-query" type="search" name="q" defaultValue={q} placeholder="What would distinguish a trajectory from computation?" required maxLength={500}/><button type="submit" aria-label="Search the work">↗</button></div><fieldset className="ask-filters"><legend className="sr-only">Search scope</legend><label htmlFor="ask-scope">LOOK IN <select id="ask-scope" name="scope" defaultValue={scope}><option value="all">The whole record</option><option value="records">Authored records</option><option value="films">Films, chapters & transcripts</option><option value="concepts">Concepts</option></select></label><label><input type="checkbox" name="drafts" value="exclude" defaultChecked={!includeDrafts}/> Exclude editorial drafts</label></fieldset></form>
  <div className="ask-prompts">{["map memory","LARQL","FFN graph","operator knows","predictive locality","context reconstructing","MCP","How many episodes?"].map(s=><Link key={s} href={`/ask?q=${encodeURIComponent(s)}`}>{s} ↗</Link>)}</div>
  <p className="ask-coverage record-voice">{coverage.threads} THREAD · {coverage.systems} SYSTEMS · {coverage.notebook} NOTEBOOK ENTRIES · {coverage.questions} QUESTIONS · {coverage.films} FILMS · {coverage.chapters} CHAPTERS</p>
  <p className="ask-explanation">Search the authored text, its questions and refusals, and the films around it. Drafts keep their status. Chapters identify a topic and a time; only the {coverage.transcripts} indexed transcripts provide spoken passages, and their automatic captions are unreviewed. This edition retrieves sources rather than generating an answer. <Link href="/knowledge">Explore what is connected ↗</Link></p>
  {q&&<section className="ask-results" aria-label="Search results"><p className="record-voice">{results.length} RESULTS FOR “{q}”</p>{results.map(r=><article key={r.id}><p className="record-voice">{sourceLabel(r)}{r.status&&` · ${r.status}`}{r.version&&` · V${r.version}`}</p><Link href={r.url}><h2>{r.title} ↗</h2></Link><p className="source-excerpt">{r.text}</p><a className="text-link" href={r.sourceUrl}>{r.basis==="draft-record"?"READ THIS DRAFT":r.basis==="source-chapter"?"OPEN CHAPTER AT SOURCE":r.basis==="record-associations"?"VIEW ASSOCIATED RECORDS":"ORIGINAL SOURCE"} ↗</a>{r.related.length>0&&<div className="ask-related"><p className="record-voice">CONNECTED RECORDS</p>{r.related.map(link=><Link href={link.url} key={link.url}>{link.title} ↗ <span>{link.basis==="metadata-inferred"?"FROM METADATA":"EDITORIAL LINK"}</span></Link>)}</div>}</article>)}{results.length===0&&<p>No matching source found in this scope. Try a shorter phrase or a project name.</p>}</section>}
 </main>;
}
