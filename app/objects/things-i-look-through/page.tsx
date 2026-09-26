import { SeeingLookbook } from "@/components/PersonalObjects";
import { seeingCollection, objectsFilm } from "@/lib/personal-objects";
import { pageMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/records";

export const metadata = pageMetadata(seeingCollection.title, seeingCollection.description, seeingCollection.path, `${SITE}${objectsFilm.image}`, undefined, {image:{width:1600,height:900,alt:objectsFilm.alt}});
export default function Page() { return <SeeingLookbook/>; }
