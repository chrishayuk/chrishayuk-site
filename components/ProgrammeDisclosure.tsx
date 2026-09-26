import type { ReactNode } from "react";
import { AnchoredDisclosure } from "@chrishayuk/hause/components/AnchoredDisclosure";

export function ProgrammeDisclosure({children,label}:{children:ReactNode;label:string}) {
 return <AnchoredDisclosure className="programme-context programme-disclosure" label={label}>{children}</AnchoredDisclosure>;
}
