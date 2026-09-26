import { Analytics } from "@chrishayuk/hause/components/Analytics";
import { HOUSE } from "@/lib/house";
import { modeScript } from "@chrishayuk/hause/mode";
import { JsonLd } from "@chrishayuk/hause/components/JsonLd";
import { webSiteLd, publicationMetadata } from "@chrishayuk/hause/seo";
import type { Metadata } from "next";
import { Newsreader, Archivo, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import { INDEXABLE, feedAlternates } from "@/lib/metadata";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MotionProvider } from "@/components/Motion";
import { SITE, socials } from "@/lib/records";
import { pageTransitionScript } from "@/lib/page-transitions";
import "./globals.css";
import "@chrishayuk/hause/notebook-material.css";
import "./notebook-palette.css";
import "./notebook-scene.css";
import "@chrishayuk/hause/exhibition.css";
import "./notebook-visuals.css";
import "./notebook-studies.css";
import "./address-build.css";
import "./social-editions.css";
import "./cell80.css";
import "./machine-exhibitions.css";
import "./machine-visit-notebook.css";
import "./machine-programme.css";
import "./machine-field.css";
import "./publication-index.css";
import "./typography.css";
import "./collection-edition.css";
import "./film-journey.css";
import "./notebook-journey.css";
const display = Newsreader({ variable: "--font-newsreader", subsets: ["latin"], weight: "variable", style: ["normal", "italic"], axes: ["opsz"], display: "swap" });
const text = Archivo({ variable: "--font-archivo", subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], display: "swap" });
const record = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });
export async function generateMetadata(): Promise<Metadata> {
 const h = await headers(); const host = h.get("host") || "chrishayuk.com";
 const origin = INDEXABLE ? SITE : `${host.startsWith("localhost") ? "http" : "https"}://${host}`;
 const shared = publicationMetadata({title:`Chris Hay — ${HOUSE.descriptor}`,description:`${HOUSE.descriptor}. ${HOUSE.proposition}`,url:SITE,siteName:"Chris Hay",indexable:INDEXABLE,image:`${origin}/og-after-hours.png`});
 return { ...shared, metadataBase: new URL(origin), title: { default: `Chris Hay — ${HOUSE.descriptor}`, template: "%s — Chris Hay" }, description: `${HOUSE.descriptor}. ${HOUSE.proposition}`, robots: { index: INDEXABLE, follow: INDEXABLE }, openGraph: { ...shared.openGraph, title: `Chris Hay — ${HOUSE.descriptor}`, description: `${HOUSE.descriptor}. ${HOUSE.description}`, type: "website", siteName: "Chris Hay", images: [{ url: `${origin}/og-after-hours.png`, width: 1536, height: 1024, alt: "Chris Hay. A house for ideas, systems and objects. Building things to find out how they work." }] }, twitter: { ...shared.twitter, card: "summary_large_image", images: [`${origin}/og-after-hours.png`] }, icons: { icon: "/favicon.svg" }, alternates: { canonical: SITE, types: feedAlternates } };
}
export default async function RootLayout({ children }: { children: React.ReactNode }) {
 const host = (await headers()).get("host");
 const configuredId = process.env.GOOGLE_ANALYTICS_ID;
 const analyticsId = INDEXABLE && host === "chrishayuk.com" && /^G-[A-Z0-9]+$/.test(configuredId || "") ? configuredId : undefined;
 const person = { "@context": "https://schema.org", "@type": "Person", "@id": `${SITE}/#person`, name: "Chris Hay", description: HOUSE.description, url: SITE, sameAs: Object.values(socials) };
 return <html lang="en" data-mode="light" suppressHydrationWarning className={`${display.variable} ${text.variable} ${record.variable}`}><head><script dangerouslySetInnerHTML={{__html:modeScript("light")}}/><script dangerouslySetInnerHTML={{__html:pageTransitionScript}}/></head><body id="top"><Analytics id={analyticsId}/><JsonLd data={[person,webSiteLd({name:"Chris Hay",url:SITE,description:`${HOUSE.descriptor}. ${HOUSE.description}`})]}/><MotionProvider><Header/>{children}<Footer/></MotionProvider></body></html>;
}
