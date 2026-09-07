import { FEEDS } from "@/lib/feeds";
import { SITE } from "@/lib/records";
/** The default RSS follows the public Notebook, retaining each entry's draft label. */
export const GET = () => Response.redirect(`${SITE}${FEEDS.notebook.path}`, 308);
