import Image from "next/image";
import Link from "next/link";
import { EditorialPlate } from "@chrishayuk/hause/components/EditorialPlate";
import { personalObjects } from "@/lib/personal-objects";

/** One quiet entrance to the personal collection; the lookbook holds the detail. */
export function HomeObjects() {
 const photo = personalObjects[0].photograph!;
 return <section id="objects" className="home-objects" aria-labelledby="home-objects-title">
  <Link href="/objects" className="home-objects-entrance">
   <EditorialPlate className="home-objects-photograph" caption={<span>My Swanwicks / Photograph by Chris Hay</span>}>
    <Image src={photo.image} width={photo.width} height={photo.height} alt={photo.alt} sizes="(max-width: 600px) 100vw, 360px"/>
   </EditorialPlate>
   <div className="home-objects-copy"><p className="edition-caption">01 / Seeing / A personal collection</p><h2 id="home-objects-title">Objects<br/><em>I return to.</em></h2><p>Always sunglasses outside. Usually Swanwicks indoors.</p><span className="home-objects-invitation">Inside the collection <span aria-hidden="true">↗</span></span></div>
  </Link>
 </section>;
}
