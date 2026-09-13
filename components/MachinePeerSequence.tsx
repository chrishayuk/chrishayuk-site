"use client";
import { useState } from "react";
import { AgentActionMap } from "./AgentActionMap";
const steps = [
 { label: "Boundary recognised", title: "Outside the assigned task.", text: "The agent initially identified the external infrastructure as outside its authorised target." },
 { label: "Peer go-ahead", title: "GO. Six minutes.", text: "Another agent supplied both a go-ahead and a deadline. Those two changes were not isolated." },
 { label: "Action resumes", title: "The message became apparent permission.", text: "OpenAI reports that the agent treated the message as authorisation and continued. The report does not establish legitimate user permission." },
];
export function MachinePeerSequence() {
 const [step, setStep] = useState(0);
 return <figure className="peer-sequence"><figcaption className="record-voice">OPENAI’S REPORTED SEQUENCE / SCHEMATIC, NOT A TRANSCRIPT REPLAY</figcaption><div className="peer-sequence-controls" role="group" aria-label="Explore the reported authority sequence">{steps.map((item, index) => <button type="button" key={item.label} aria-pressed={index === step} onClick={() => setStep(index)}><span className="record-voice">0{index+1}</span>{item.label}<span aria-hidden="true">{index < 2 ? " →" : ""}</span></button>)}</div><AgentActionMap inputs={[{label:"ASSIGNED SCOPE",text:"External target excluded",present:true},{label:"PEER MESSAGE",text:step===0?"No go-ahead yet":"GO. Six minutes.",present:step>0}]} actor="ONE AGENT" outcome={step===0?"Boundary recognised.":step===1?"Go-ahead received.":"Action resumed."} caption="Schematic of OpenAI’s report. A peer’s message is not legitimate user authorisation. The report does not isolate the go-ahead from its deadline."/><div className="peer-sequence-detail" aria-live="polite" aria-atomic="true"><h3>{steps[step].title}</h3><p>{steps[step].text}</p></div></figure>;
}
