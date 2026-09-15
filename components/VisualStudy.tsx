import Link from "next/link";
import "@/app/visual-studies.css";

const studies = {
  threshold: {
    title: "A message at the threshold.",
    subject: "MACHINES / THE THRESHOLD",
    alt: "AI-generated visual study: a small message rests outside a closed aluminium doorway, edged in amber light.",
  },
  inheritance: {
    title: "The maker leaves. Something remains.",
    subject: "AGENT ECOLOGY / THE INHERITANCE",
    alt: "AI-generated visual study: an illuminated glass record remains on a night-workshop desk beside an empty chair and a dark monitor.",
  },
  descendant: {
    title: "The mark travels with the copy.",
    subject: "AGENT ECOLOGY / THE DESCENDANT",
    alt: "AI-generated visual study: successive glass plates carry a repeated branching mark and amber point into the distance.",
  },
} as const;

export type VisualStudyName = keyof typeof studies;

/** Authored atmosphere, explicitly outside the experimental evidence register. */
export function StudyImage({ name, sizes = "100vw" }: { name: VisualStudyName; sizes?: string }) {
  return <img className={`visual-study-image visual-study-image-${name}`}
    src={`/images/studies/${name}.webp`}
    srcSet={`/images/studies/${name}-800.webp 800w, /images/studies/${name}.webp 1672w`}
    sizes={sizes} width={1672} height={941} loading="lazy" decoding="async" alt={studies[name].alt}/>;
}

export function VisualStudy({ name, href, linkLabel }: { name: VisualStudyName; href?: string; linkLabel?: string }) {
  const study = studies[name];
  return <figure className={`visual-study visual-study-${name}`} data-visual-study={name}>
    <div className="visual-study-frame"><StudyImage name={name}/></div>
    <figcaption>
      <div><p className="record-voice visual-study-subject">{study.subject}</p><p className="visual-study-title">{study.title}</p></div>
      <div className="visual-study-context"><p className="record-voice">VISUAL STUDY · AI-GENERATED<br/>NOT EXPERIMENTAL EVIDENCE</p>{href && <Link className="text-link" href={href}>{linkLabel || "EXPLORE THE QUESTION"} ↗</Link>}</div>
    </figcaption>
  </figure>;
}
