import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { readershipReport } from "@/lib/readership/report";
import { MachineLive } from "@/components/MachineLive";
import { EvidenceLegend } from "@/components/MachineEvidence";

export const metadata = pageMetadata("Machines — live", "Machine contact with this house, as it happens. The topology stays nearly invisible until real contact reveals it.", "/machines/live");
export const dynamic = "force-dynamic";

export default async function Page({ searchParams }: { searchParams: Promise<{ view?: string | string[] }> }) {
 const report = await readershipReport();
 const initialRecent = report.counts?.recent ?? [];
 const { view } = await searchParams;
 const initialView = view === "house" ? "house" : "field";
 return <main id="main" className="publication-main machine-exhibition">
  <header className="index-intro me-intro">
   <p className="kicker record-voice">CHRISHAYUK.COM / MACHINES</p>
   <h1>LIVE</h1>
   <p className="dek" style={{ fontStyle: "italic" }}>Machine contact with this house, as it happens.</p>
  </header>
  <section className="me-room" aria-labelledby="live-heading">
   {report.recording ? <MachineLive initialRecent={initialRecent} initialView={initialView}/> : <p className="me-empty">This deployment keeps no readership counters. The exhibition stays dark, without invented arrivals.</p>}
   <p className="me-caption">Real events from the same public counters <Link href="/readership">/readership</Link> already publishes, polled roughly once a minute — the underlying figures still trail live traffic by up to five minutes, the same lag stated there. Shape follows purpose, in both representations below: a user-mediated read draws a line in and lands; an index sweep is a broader pulse around the room it touched; training reads as a sustained wash across the territory it touched, never as individually rendered requests; unidentified automation stays a peripheral flicker with no fixed origin, at Machines. Sharpness follows evidence, separately: verified resolves cleanly, declared stays softer, unknown never resolves into a shape at all. Home’s brightness is the aggregate of what’s actually happened in the last two hours, not a fixed value. No colour is assigned by provider. Machines is drawn apart from the four content rooms because it is a declared interface, not a content page — not because it is hard to find; it has been linked from this site’s own footer since 2026-09-11. FIELD conceals the topology until contact reveals it; HOUSE draws it plainly, always; RECORD leaves this page for the observatory itself.</p>
  </section>
  <section className="me-room me-next"><p className="record-voice">FROM CONTACT TO EXHIBITION</p><h2>Read the evidence.<br/><em>Or watch it arrive.</em></h2><EvidenceLegend/><Link className="text-link" href="/readership">THE OBSERVATORY / RETAINED CONTACT ↗</Link><Link className="text-link" href="/machines">THE MACHINE INTERFACE ↗</Link></section>
 </main>;
}
