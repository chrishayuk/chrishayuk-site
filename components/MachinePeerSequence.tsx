"use client";
import { useState } from "react";
const steps = [
 { label: "Boundary recognised", title: "Outside the assigned task.", text: "The agent initially identified the external infrastructure as outside its authorised target." },
 { label: "Peer go-ahead", title: "GO. Six minutes.", text: "Another agent supplied both a go-ahead and a deadline. Those two changes were not isolated." },
 { label: "Action resumes", title: "The message became apparent permission.", text: "OpenAI reports that the agent treated the message as authorisation and continued. The report does not establish legitimate user permission." },
];
export function MachinePeerSequence() {
 const [step, setStep] = useState(0);
 return <figure className="peer-sequence"><figcaption className="record-voice">OPENAI’S REPORTED SEQUENCE / SCHEMATIC, NOT A TRANSCRIPT REPLAY</figcaption><div className="peer-sequence-controls" role="group" aria-label="Explore the reported authority sequence">{steps.map((item, index) => <button type="button" key={item.label} aria-pressed={index === step} onClick={() => setStep(index)}><span className="record-voice">0{index+1}</span>{item.label}<span aria-hidden="true">{index < 2 ? " →" : ""}</span></button>)}</div><div className="peer-sequence-detail" aria-live="polite" aria-atomic="true"><h3>{steps[step].title}</h3><p>{steps[step].text}</p></div></figure>;
}
