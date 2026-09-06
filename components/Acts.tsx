import { actAnchor } from "@/lib/record-knowledge";
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
import { FilmPlayer } from "./FilmPlayer";
import { getVideo } from "@/lib/youtube";
import { Connection } from "@chrishayuk/hause/components/forms/Connection";
import { DemoConnection } from "./DemoConnection";
const isHauseStatus = (s: Status): s is HauseStatus => (STATUSES as readonly string[]).includes(s);
export function Acts({ acts, anchored = false, offset = 0, priority = false }: { acts: Act[]; anchored?: boolean; offset?: number; priority?: boolean }) {
  return <div className="acts">{acts.map((act,i) => {
    const rendered = (() => { switch (act.kind) {
      case "statement": return <Statement key={i} text={act.text}/>;
      case "connection": return act.demonstration ? <DemoConnection key={i} text={act.text} links={act.links}/> : <Connection key={i} text={act.text} links={act.links}/>;
      case "observation": return <div key={i} className="sourced-observation"><Observation label={act.label} text={act.text}/>{act.references?.length ? <p className="act-references record-voice">{act.references.map(ref => <a key={ref.url} href={ref.url}>{ref.label} ↗</a>)}</p> : null}</div>;
      case "question": case "claim": {
        if (!isHauseStatus(act.status)) return <section key={i} className="domain-act"><p className="record-voice">{act.status}</p><h2>{act.text}</h2><p>{act.detail}</p></section>;
        return act.kind === "question" ? <Question key={i} {...act} status={act.status}/> : <Claim key={i} {...act} status={act.status}/>;
      }
      case "evidence": return <section key={i}>{act.items.map((item,j) => isHauseStatus(item.status) ? <Evidence key={j} items={[{ ...item, status: item.status }]}/> : <div className="domain-act" key={j}><p className="record-voice">{item.status}</p><h3>{item.label}</h3><p>{item.detail}</p></div>)}</section>;
      case "refusal": return <Refusal key={i} {...act}/>;
      case "comparison": return <div className="comparison-wrap" key={i}><Comparison kicker="ONE OBJECT · TWO INTERPRETATIONS" {...act}/></div>;
      case "film": {
        if ("media" in act) return <Media key={i} id={act.media} caption priority={priority}/>;
        const video = getVideo(act.youtubeId);
        return video ? <figure key={i} className="notebook-screening"><FilmPlayer video={video} start={act.start} priority={priority}/><figcaption><span className="record-voice">FROM THE FILM / {Math.floor(act.start/60)}:{String(act.start%60).padStart(2,"0")}</span><p>{act.caption}</p><a className="text-link" href={`/film/youtube/${act.youtubeId}?t=${act.start}`}>FILM & SOURCE RECORD ↗</a></figcaption></figure> : null;
      }
      case "photograph": return <Media key={i} id={act.media} caption priority={priority}/>;
      default: { const never: never = act; throw new Error(`Unknown semantic act: ${JSON.stringify(never)}`); }
    } })();
    return anchored ? <section key={i} id={actAnchor(i + offset)} className="act-anchor">{rendered}</section> : rendered;
  })}</div>;
}
