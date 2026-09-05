"use client";
import { useState } from "react";
import { Statement } from "@chrishayuk/hause/components/forms/Statement";
import { Question } from "@chrishayuk/hause/components/forms/Question";
import { Refusal } from "@chrishayuk/hause/components/forms/Refusal";
const forms = ["Statement", "Question", "Refusal"] as const;
export function HauseStudy() {
  const [form,setForm] = useState<(typeof forms)[number]>("Statement");
  return <div className="hause-study"><div className="form-select" aria-label="Choose a semantic form">{forms.map((name,i) => <button key={name} aria-pressed={form===name} onClick={() => setForm(name)}><span className="record-voice">0{i+1}</span> {name}</button>)}</div><div className="form-stage">{form === "Statement" ? <Statement text="A model can be something you return to."/> : form === "Question" ? <Question text="What makes a model worth returning to?" status="OPEN" detail="The same line of inquiry, expressed as a question rather than an assertion."/> : <Refusal title="A MEASUREMENT IS REQUIRED" lines={["Proposition: returning to model state may be useful", "Result: no measured saving asserted here"]} principle="The form must know what the record can support."/>}</div><p className="record-voice form-note">LIVE HAUSE FORMS · ONE LINE OF INQUIRY</p><noscript><p>The statement opens a question: what makes a model worth returning to? No measured saving is asserted without evidence.</p></noscript></div>;
}
