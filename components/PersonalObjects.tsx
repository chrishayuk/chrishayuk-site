import Link from "next/link";
import Image from "next/image";
import { EditorialPlate } from "@chrishayuk/hause/components/EditorialPlate";
import { JsonLd } from "@chrishayuk/hause/components/JsonLd";
import { objectsFilm, personalObjects, seeingCollection } from "@/lib/personal-objects";
import { SITE } from "@/lib/records";
import { Media } from "./Media";
import "@/app/personal-objects.css";

function SwanwickPhotograph({ priority = false }: { priority?: boolean }) {
 const photo = personalObjects[0].photograph!;
 return <EditorialPlate className="objects-photograph objects-owned-photograph" caption={<><span>{photo.caption}</span><span>Photograph by {photo.credit}</span></>}>
  <Image src={photo.image} alt={photo.alt} width={photo.width} height={photo.height} sizes="(max-width: 767px) 100vw, 60vw" priority={priority}/>
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
   <SwanwickPhotograph priority/>
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
   <div className="seeing-opening"><h1>Things I<br/><em>look through.</em></h1><SwanwickPhotograph priority/></div>
   <div className="seeing-intro-bottom"><p>I’m sensitive to light.<br/>Always sunglasses outside.<br/>Usually Swanwicks indoors.</p><nav aria-label="Lookbook chapters"><a href="#swanwick">01 Indoors</a><a href="#collection">02 Outside</a></nav></div>
  </header>
  <section id="swanwick" className="object-study object-swanwick" aria-labelledby="swanwick-title">
   <header><p className="record-voice">01 / {swanwick.occasion}</p><h2 id="swanwick-title">{swanwick.name}<span>.</span></h2></header>
   <div className="swanwick-in-use"><div className="object-note"><h3>{swanwick.title}</h3><p>{swanwick.note}</p><Link href={objectsFilm.path} className="text-link">Watch the film <span aria-hidden="true">↗</span></Link></div><Media id={objectsFilm.mediaId} caption/></div>
  </section>
  <section id="collection" className="seeing-collection" aria-labelledby="seeing-collection-title"><header><p className="record-voice">02 / Outside / The wider collection</p><h2 id="seeing-collection-title">A few ways<br/><em>of looking.</em></h2><p>My Swanwicks, Ray-Bans and Frogskins are photographed here. The other images are labelled reference pairs; their colours and finishes may differ from mine.</p></header>
   <div className="objects-reference-gallery">{personalObjects.slice(1).map((object, index)=>object.photograph && <article id={object.slug} key={object.id} className={index === 0 ? "reference-juliet" : ""}>
    <div className="reference-heading"><p className="record-voice">{String(index + 2).padStart(2,"0")} / {object.maker}</p><h3>{object.name}</h3></div>
    <EditorialPlate className="reference-photograph" caption={<><span>{object.photograph.kind === "reference" ? "Reference pair · " : ""}{object.photograph.caption}</span>{object.photograph.source ? <a href={object.photograph.source}>{object.photograph.credit} ↗</a> : <span>Photograph by {object.photograph.credit}</span>}</>}><Image src={object.photograph.image} width={object.photograph.width} height={object.photograph.height} alt={object.photograph.alt} sizes="(max-width: 767px) 100vw, 50vw" loading="lazy" unoptimized={object.photograph.kind === "reference"}/></EditorialPlate>
    {object.note && <div className="reference-personal-note"><p className="record-voice">My pair / {object.occasion}</p><p>{object.note}</p></div>}
   </article>)}</div>
  </section>
  <footer className="lookbook-colophon"><p>Personal notes by Chris Hay · September 2026</p><p>Swanwick, Ray-Ban and Frogskins: photographs of my own pairs. Swanwick also appears in my own film. The remaining reference photographs are labelled and credited beside each image.</p><Link className="text-link" href="/objects">Objects I return to <span aria-hidden="true">↖</span></Link></footer>
 </main>;
}
