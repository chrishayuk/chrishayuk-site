import Link from "next/link";
import Image from "next/image";
import { EditorialPlate } from "@chrishayuk/hause/components/EditorialPlate";
import { JsonLd } from "@chrishayuk/hause/components/JsonLd";
import { objectsFilm, personalObjects, seeingCollection } from "@/lib/personal-objects";
import { SITE } from "@/lib/records";
import { Media } from "./Media";
import "@/app/personal-objects.css";

function FilmPhotograph({ priority = false }: { priority?: boolean }) {
 return <EditorialPlate className="objects-photograph" caption={<><span>My Swanwicks, on film · Chris Hay</span><Link href={objectsFilm.path}>{objectsFilm.title} ↗</Link></>}>
  <Image src={objectsFilm.image} alt={objectsFilm.alt} width={1600} height={900} priority={priority} unoptimized/>
 </EditorialPlate>;
}

function MadeObjects() {
 return <nav className="objects-neighbours" aria-label="More from the house"><p className="record-voice">Elsewhere in the house</p><Link href="/systems">Things I make <span>Systems ↗</span></Link><Link href="/film">Thinking in public <span>Film ↗</span></Link><Link href="/notebook">The working record <span>Notebook ↗</span></Link></nav>;
}

export function PersonalObjects() {
 return <main id="main" className="personal-objects objects-entrance">
  <header className="objects-intro"><p className="record-voice">Chris Hay / Objects</p><h1>Objects<br/><em>I return to.</em></h1><p>Things I use, keep, notice and return to.</p></header>
  <section className="objects-feature" aria-labelledby="seeing-title">
   <div className="objects-feature-copy"><p className="record-voice">01 / Seeing / A personal lookbook</p><h2 id="seeing-title"><Link href={seeingCollection.path}>Things I<br/><em>look through.</em></Link></h2><p>I’m sensitive to light. I always wear sunglasses outside and usually wear Swanwicks indoors. These are the glasses I own and wear.</p><Link href={seeingCollection.path} className="text-link">Enter the lookbook <span aria-hidden="true">↗</span></Link></div>
   <FilmPhotograph priority/>
  </section>
  <nav className="objects-contents" aria-label="Inside the lookbook"><Link href={`${seeingCollection.path}#swanwick`}><span className="record-voice">01 / Indoors · My pair on film</span><span>Swanwick</span><span aria-hidden="true">↗</span></Link><Link href={`${seeingCollection.path}#collection`}><span className="record-voice">02 / Outside · The wider collection</span><span>Frames I return to</span><span aria-hidden="true">↗</span></Link></nav>
  <MadeObjects/>
 </main>;
}

export function SeeingLookbook() {
 const [swanwick] = personalObjects;
 return <main id="main" className="personal-objects seeing-lookbook">
  <JsonLd data={{"@context":"https://schema.org","@type":"CollectionPage",name:seeingCollection.title,description:seeingCollection.description,url:`${SITE}${seeingCollection.path}`,author:{"@id":`${SITE}/#person`},dateModified:seeingCollection.recorded,hasPart:personalObjects.map(object=>({"@type":"CreativeWork",name:`${object.maker === object.name ? "" : `${object.maker} `}${object.name}`,url:`${SITE}${seeingCollection.path}#${object.slug}`,...(object.note ? {text:object.note} : {})}))}}/>
  <header className="seeing-intro">
   <div className="seeing-register"><Link className="record-voice" href="/objects">Objects I return to ↖</Link><p className="record-voice">01 / Seeing</p></div>
   <div className="seeing-opening"><h1>Things I<br/><em>look through.</em></h1><FilmPhotograph priority/></div>
   <div className="seeing-intro-bottom"><p>I’m sensitive to light.<br/>Always sunglasses outside.<br/>Usually Swanwicks indoors.</p><nav aria-label="Lookbook chapters"><a href="#swanwick">01 Indoors</a><a href="#collection">02 Outside</a></nav></div>
  </header>
  <section id="swanwick" className="object-study object-swanwick" aria-labelledby="swanwick-title">
   <header><p className="record-voice">01 / {swanwick.occasion}</p><h2 id="swanwick-title">{swanwick.name}<span>.</span></h2></header>
   <div className="swanwick-in-use"><div className="object-note"><h3>{swanwick.title}</h3><p>{swanwick.note}</p><Link href={objectsFilm.path} className="text-link">Watch the film <span aria-hidden="true">↗</span></Link></div><Media id={objectsFilm.mediaId} caption/></div>
  </section>
  <section id="collection" className="seeing-collection" aria-labelledby="seeing-collection-title"><header><p className="record-voice">02 / Outside / The wider collection</p><h2 id="seeing-collection-title">A few ways<br/><em>of looking.</em></h2><p>Reference photographs show the frame styles. Colours and finishes may differ from my own pairs.</p></header>
   <div className="objects-reference-gallery">{personalObjects.slice(1).map((object, index)=>object.reference && <article id={object.slug} key={object.id} className={index === 0 ? "reference-juliet" : ""}>
    <div className="reference-heading"><p className="record-voice">{String(index + 2).padStart(2,"0")} / {object.maker}</p><h3>{object.name}</h3></div>
    <EditorialPlate className="reference-photograph" caption={<><span>Reference pair · {object.reference.caption}</span><a href={object.reference.source}>{object.reference.credit} ↗</a></>}><Image src={object.reference.image} width={object.reference.width} height={object.reference.height} alt={object.reference.alt} loading="lazy" unoptimized/></EditorialPlate>
    {object.note && <div className="reference-personal-note"><p className="record-voice">My pair / {object.occasion}</p><p>{object.note}</p></div>}
   </article>)}</div>
  </section>
  <footer className="lookbook-colophon"><p>Personal notes by Chris Hay · September 2026</p><p>Swanwick: my actual pair in my own film. The wider collection uses reference photographs, credited beside each image.</p><Link className="text-link" href="/objects">Objects I return to <span aria-hidden="true">↖</span></Link></footer>
 </main>;
}
