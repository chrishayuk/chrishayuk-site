import { HouseEntrances } from "@/components/HouseCollections";
import { HOUSE } from "@/lib/house";
import { MoeScene } from "@/components/MoeCollection";
import { FilmSelection, YouTubeScene } from "@/components/YouTubeCollection";
import Link from "next/link";
import { Media } from "@/components/Media";
import { SystemStudy } from "@/components/SystemStudy";
import { HauseStudy } from "@/components/HauseStudy";
import { Acts } from "@/components/Acts";
import { getRecord, recordPath } from "@/lib/records";
const Kicker = ({ children }: { children: React.ReactNode }) => <p className="kicker record-voice">{children}</p>;
const TextLink = ({ href, children }: { href: string; children: React.ReactNode }) => <Link className="text-link" href={href}>{children}<span aria-hidden="true">↗</span></Link>;
export default function Home() {
 const notebook = getRecord("N-MAP")!;
 const notebookPath = recordPath(notebook);
 return <main id="main" className="homepage">
  <section className="scene identity" data-scene="00" aria-labelledby="proposition"><Media id="hero-identity" priority className="scene-background"/><div className="hero-overline record-voice"><span>CHRIS HAY</span><span>LONDON · 2026</span></div><div className="identity-copy"><h1 id="proposition">A house for<br/><em>ideas, systems</em><br/>and objects.</h1><p className="hero-philosophy">{HOUSE.proposition}</p></div><div className="scene-bottom record-voice"><span>RESEARCH · ENGINEERING · DESIGN · FILM</span><a href="#the-work">ENTER THE WORK ↓</a></div></section>
  <div className="opening-caption"><span className="record-voice">IDEA → SYSTEM → OBJECT</span><p>{HOUSE.description}</p><span className="record-voice">EST. IN CURIOSITY</span></div>
  <HouseEntrances/>
  <section id="latest-youtube" className="scene youtube-home" data-scene="01-youtube" aria-labelledby="latest-youtube-heading"><YouTubeScene/></section>
  <section id="latest-mixture-of-experts" className="scene moe-scene moe-home dark-scene" data-scene="02"><MoeScene/></section>
  <section id="the-work" className="scene larql-scene" data-scene="07"><div className="larql-photo"><Media id="youtube-larql"/></div><div className="larql-copy"><Kicker>SYSTEMS · LARQL</Kicker><h2>Models are<br/>places<br/><em>you can go.</em></h2><p>Querying learned systems.</p><TextLink href="/work/larql">VIEW THE WORK</TextLink></div><div className="larql-system"><SystemStudy variant="query"/></div></section>
  <section className="scene vindex-scene dark-scene" data-scene="05"><div className="project-intro"><Kicker>SYSTEMS · VINDEX3</Kicker><h2>The model<br/><em>is the database.</em></h2><div className="inline-links"><TextLink href="/work/vindex3">VIEW THE WORK</TextLink><a className="text-link" href="https://vindex3.org/">VINDEX3.ORG ↗</a></div></div><SystemStudy/></section>
  <section className="scene interlude" data-scene="03" aria-label="London photograph"><Media id="london-night" className="scene-background"/><div className="scene-bottom record-voice"><span>LONDON</span><span>BETWEEN THINGS</span></div></section>
  <section className="scene question-scene" data-scene="04"><div className="question-media"><Media id="ffn-notebook"/></div><div className="question-copy"><Kicker>CURRENT QUESTION · FFN</Kicker><span className="status-label">● OPEN</span><h2>What if<br/>the FFN<br/><em>is a graph?</em></h2><TextLink href="/research/ffn-as-graph">FOLLOW THE THREAD</TextLink></div></section>
  <section className="scene hause-scene" data-scene="10"><Kicker>THE LANGUAGE OF THE RECORD</Kicker><HauseStudy/><div className="hause-bottom"><p>THIS SITE IS COMPOSED WITH HAUSE.</p><a className="text-link" href="https://hause.design/">EXPLORE HAUSE.DESIGN ↗</a></div></section>
  <section className="scene personal-scene" data-scene="08" aria-label="Personal photographs"><div className="personal-caption record-voice">THE WORLD AROUND THE WORK</div><Media id="personal-architecture" caption/><Media id="personal-books" caption/><Media id="personal-journey" caption/></section>
  <section id="from-the-notebook" className="scene notebook-scene notebook-feature" data-scene="09" data-hause-act="connection" aria-labelledby="notebook-feature-heading">
    <div className="notebook-feature-visual"><Media id="notebook-map-trajectory"/><p className="record-voice">FROM THE FILM / A QUESTION MOVES THROUGH THE MODEL</p></div>
    <div className="notebook-copy"><Kicker>FROM THE NOTEBOOK</Kicker><div className="note-meta record-voice"><span>{notebook.id}</span><span>WORKING NOTE · {notebook.status}</span></div><h2 id="notebook-feature-heading"><Link href={notebookPath}>{notebook.title}</Link></h2><p className="notebook-feature-dek">Follow a question through the model. Change the state. Then try a memory you can inspect yourself.</p><div className="inline-links"><TextLink href={notebookPath}>EXPLORE THE NOTE</TextLink><TextLink href="/notebook">ALL NOTES</TextLink></div><p className="record-voice notebook-footnote">FILM → EXPLANATION → INTERACTIVE STUDY</p></div>
  </section>
  <section className="scene mcp-scene dark-scene" data-scene="11"><Media id="mcp-interaction" className="scene-background"/><div className="scene-copy"><Kicker>SYSTEM · MCP</Kicker><h2>Machines<br/><em>using machines.</em></h2><div className="inline-links"><TextLink href="/work/mcp-cli">MCP-CLI</TextLink><TextLink href="/work/mcp-cli#chuk">CHUK</TextLink></div></div></section>
  <section id="person" className="scene person-scene" data-scene="01"><Media id="portrait-editorial" className="portrait"/><div className="person-copy"><Kicker>THE PERSON</Kicker><h2>Chris<br/><em>Hay.</em></h2><p className="practice">{HOUSE.personLine}</p><div className="inline-links"><TextLink href="/about">ABOUT</TextLink><a className="text-link" href="https://www.linkedin.com/in/chrishayuk/">LINKEDIN ↗</a></div></div></section>
  <section className="scene contact-scene" data-scene="06"><div className="section-heading"><Kicker>SELECTED FILMS</Kicker><h2>Watch<span className="amber">.</span></h2><TextLink href="/film">ALL FILMS</TextLink></div><FilmSelection/></section>
  <section className="scene finding-scene" data-scene="12"><Kicker>THE BOUNDARY OF WHAT WE KNOW</Kicker><div className="finding-heading"><span className="record-voice">OPEN QUESTION / RESIDUAL GEOMETRY</span><h2>Present.<br/><em>But predictive?</em></h2></div><Acts acts={[{ kind: "refusal", title: "PREDICTIVE LOCALITY IS NOT ESTABLISHED", lines: ["Working note: expert co-activation observed", "Untested: useful working-set prediction"], principle: "An observation is the beginning of an experiment." }]}/><TextLink href="/research/residual-geometry">READ THE QUESTION</TextLink></section>
  <section className="scene closing-scene dark-scene" data-scene="13"><Media id="closing-portrait" className="scene-background"/><div className="closing-copy"><Kicker>STILL CURIOUS</Kicker><h2>Chris Hay.</h2><p className="record-voice">IDEAS · SYSTEMS · OBJECTS · LONDON</p></div></section>
 </main>;
}
