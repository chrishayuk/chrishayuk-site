import { permanentRedirect } from "next/navigation";
import { VISIT_NOTE_PATH } from "@/lib/machine/visits";

/** Keep already-shared links working; the study belongs to the notebook. */
export default function Page() {
 permanentRedirect(VISIT_NOTE_PATH);
}
