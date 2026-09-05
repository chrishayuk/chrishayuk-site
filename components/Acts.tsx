import { Statement } from "@chrishayuk/hause/components/forms/Statement";
import { Observation } from "@chrishayuk/hause/components/forms/Observation";
import { Question } from "@chrishayuk/hause/components/forms/Question";
import { Claim } from "@chrishayuk/hause/components/forms/Claim";
import { Evidence } from "@chrishayuk/hause/components/forms/Evidence";
import { Refusal } from "@chrishayuk/hause/components/forms/Refusal";
import { Comparison } from "@chrishayuk/hause/components/forms/Comparison";
import { STATUSES, type Status as HauseStatus } from "@chrishayuk/hause/types";
import type { Act, Status } from "@/lib/types";
import { Media } from "./Media";
const isHauseStatus = (s: Status): s is HauseStatus => (STATUSES as readonly string[]).includes(s);
export function Acts({ acts }: { acts: Act[] }) {
  return <div className="acts">{acts.map((act,i) => {
    switch (act.kind) {
      case "statement": return <Statement key={i} text={act.text}/>;
      case "observation": return <Observation key={i} label={act.label} text={act.text}/>;
      case "question": case "claim": {
        if (!isHauseStatus(act.status)) return <section key={i} className="domain-act"><p className="record-voice">{act.status}</p><h2>{act.text}</h2><p>{act.detail}</p></section>;
        return act.kind === "question" ? <Question key={i} {...act} status={act.status}/> : <Claim key={i} {...act} status={act.status}/>;
      }
      case "evidence": return <section key={i}>{act.items.map((item,j) => isHauseStatus(item.status) ? <Evidence key={j} items={[{ ...item, status: item.status }]}/> : <div className="domain-act" key={j}><p className="record-voice">{item.status}</p><h3>{item.label}</h3><p>{item.detail}</p></div>)}</section>;
      case "refusal": return <Refusal key={i} {...act}/>;
      case "comparison": return <div className="comparison-wrap" key={i}><Comparison kicker="ONE OBJECT · TWO INTERPRETATIONS" {...act}/></div>;
      case "film": case "photograph": return <Media key={i} id={act.media} caption/>;
      default: { const never: never = act; throw new Error(`Unknown semantic act: ${JSON.stringify(never)}`); }
    }
  })}</div>;
}
