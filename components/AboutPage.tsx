import Image from "next/image";
import Link from "next/link";
import { EditorialPlate } from "@chrishayuk/hause/components/EditorialPlate";
import { JsonLd } from "@chrishayuk/hause/components/JsonLd";
import { HOUSE_WORK } from "@/lib/house";
import { personalObjects, seeingCollection } from "@/lib/personal-objects";
import { SITE, socials } from "@/lib/records";
import "@/app/about.css";

export function AboutPage() {
 const swanwick = personalObjects[0].photograph!;
 return <main id="main" className="about-edition">
  <JsonLd data={{"@context":"https://schema.org","@type":"ProfilePage",url:`${SITE}/about`,mainEntity:{"@id":`${SITE}/#person`}}}/>
  <header className="about-opening">
   <div className="about-opening-copy">
    <p className="record-voice">Chris Hay / London</p>
    <h1>A life<br/>in <em>questions.</em></h1>
    <p className="about-introduction">I build things to find out<br/>how they work.</p>
    <p>Research, engineering, design and film. Different ways of exploring how intelligent systems are represented, executed, understood and experienced.</p>
    <a className="text-link" href="#the-house">Inside the practice <span aria-hidden="true">↓</span></a>
   </div>
   <EditorialPlate className="about-portrait" caption={<><span>Chris Hay / In the studio</span><Link href="/film/youtube/UvogrjCgaJQ">From the film MCP Apps ↗</Link></>}>
    <Image src="/media/youtube/portrait.webp" width={864} height={1080} alt="Chris Hay seated at his studio desk in blue light, leaning forward with his hands together." priority unoptimized/>
   </EditorialPlate>
  </header>
  <section id="the-house" className="about-practice" aria-labelledby="about-practice-title">
   <div className="about-section-label"><span className="record-voice">01 / The practice</span><span className="record-voice">Ideas → Systems → Objects</span></div>
   <div className="about-practice-opening"><h2 id="about-practice-title">Thought about.<br/>Given structure.<br/><em>Made real.</em></h2><div><p>A question becomes something I can build. Building it gives me something to inspect. The experiment, the software and the way the work is presented belong to the same practice.</p><p>This site keeps those things together: the work itself, the questions behind it, and the record of what happened.</p><p className="about-systems-line">Systems I’m building: {HOUSE_WORK.map((work,index)=><span key={work.id}>{index > 0 && " · "}<Link href={work.path}>{work.name}</Link></span>)}.</p></div></div>
   <div className="about-practice-paths">
    <Link href="/notebook"><span className="record-voice">The thinking</span><h3>Keep a notebook. <span aria-hidden="true">↗</span></h3><p>Experiments, observations and questions still open. A place to follow the investigation as it develops.</p></Link>
    <Link href="/research"><span className="record-voice">The evidence</span><h3>Keep the record. <span aria-hidden="true">↗</span></h3><p>Findings with their scope, sources and limitations. Failed predictions remain part of the work.</p></Link>
    <Link href="/film"><span className="record-voice">The conversation</span><h3>Think on film. <span aria-hidden="true">↗</span></h3><p>Another way to explore an idea: explain it, demonstrate it, or work through it in public.</p></Link>
   </div>
  </section>
  <section className="about-personal" aria-labelledby="about-personal-title">
   <div className="about-personal-copy"><p className="record-voice">02 / A personal detail</p><h2 id="about-personal-title">Things I<br/><em>look through.</em></h2><p>I’m sensitive to light. I always wear sunglasses outside and usually wear Swanwicks indoors—the pair you see in my videos.</p><p>Some pairs belong to everyday life. My old Oakley Juliets come out for special occasions and formal events: metallic and classy, formal but casual.</p><Link href={seeingCollection.path} className="text-link">My glasses, in a lookbook <span aria-hidden="true">↗</span></Link></div>
   <EditorialPlate className="about-object" caption={<><span>My Swanwicks / Usually indoors</span><span>Photograph by Chris Hay</span></>}><Image src={swanwick.image} width={swanwick.width} height={swanwick.height} alt={swanwick.alt} sizes="(max-width: 767px) 100vw, 55vw"/></EditorialPlate>
  </section>
  <section className="about-principle" aria-labelledby="about-principle-title"><p className="record-voice">03 / A principle of the work</p><h2 id="about-principle-title">Publish the uncertainty<br/><em>as well as the result.</em></h2><p>Open questions remain open. A result earns its status through evidence. Revisions keep their earlier records, including the ideas that did not hold up.</p><Link href="/record" className="text-link">Explore the connected record <span aria-hidden="true">↗</span></Link></section>
  <section className="about-elsewhere" aria-labelledby="about-elsewhere-title"><div><p className="record-voice">Elsewhere / In conversation</p><h2 id="about-elsewhere-title">Find me<br/><em>in the work.</em></h2><p>I’m a regular panelist on IBM’s <Link href="/film/mixture-of-experts">Mixture of Experts</Link>. The conversations live here alongside my own films, with their original production credits.</p></div><nav aria-label="Chris Hay elsewhere">{Object.entries(socials).map(([label,url])=><a href={url} key={label}><span>{label === "IBM" ? "Mixture of Experts / IBM" : label}</span><span aria-hidden="true">↗</span></a>)}</nav></section>
 </main>;
}
