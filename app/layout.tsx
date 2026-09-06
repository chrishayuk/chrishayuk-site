import { Analytics } from "@chrishayuk/hause/components/Analytics";
import { HOUSE } from "@/lib/house";
import { modeScript } from "@chrishayuk/hause/mode";
import { JsonLd } from "@chrishayuk/hause/components/JsonLd";
import { webSiteLd, publicationMetadata } from "@chrishayuk/hause/seo";
import type { Metadata } from "next";
import { Fraunces, Inter, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import { INDEXABLE } from "@/lib/metadata";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MotionProvider } from "@/components/Motion";
import { SITE, socials } from "@/lib/records";
import "./globals.css";
const display = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], weight: ["400", "500"], style: ["normal", "italic"], display: "swap" });
const text = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const record = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });
export async function generateMetadata(): Promise<Metadata> {
 const h = await headers(); const host = h.get("host") || "chrishayuk.com";
 const origin = INDEXABLE ? SITE : `${host.startsWith("localhost") ? "http" : "https"}://${host}`;
 const shared = publicationMetadata({title:`Chris Hay — ${HOUSE.descriptor}`,description:`${HOUSE.descriptor}. ${HOUSE.proposition}`,url:SITE,siteName:"Chris Hay",indexable:INDEXABLE,image:`${origin}/og-house.png`});
 return { ...shared, metadataBase: new URL(origin), title: { default: `Chris Hay — ${HOUSE.descriptor}`, template: "%s — Chris Hay" }, description: `${HOUSE.descriptor}. ${HOUSE.proposition}`, robots: { index: INDEXABLE, follow: INDEXABLE }, openGraph: { ...shared.openGraph, title: `Chris Hay — ${HOUSE.descriptor}`, description: `${HOUSE.descriptor}. ${HOUSE.description}`, type: "website", siteName: "Chris Hay", images: [{ url: `${origin}/og-house.png`, width: 1536, height: 1024, alt: "Chris Hay. A house for ideas, systems and objects. Building things to find out how they work." }] }, twitter: { ...shared.twitter, card: "summary_large_image", images: [`${origin}/og-house.png`] }, icons: { icon: "/favicon.svg" }, alternates: { canonical: SITE, types: { "application/rss+xml": "/rss.xml", "application/feed+json": "/feed.json" } } };
}
export default async function RootLayout({ children }: { children: React.ReactNode }) {
 const host = (await headers()).get("host");
 const configuredId = process.env.GOOGLE_ANALYTICS_ID;
 const analyticsId = INDEXABLE && host === "chrishayuk.com" && /^G-[A-Z0-9]+$/.test(configuredId || "") ? configuredId : undefined;
 const person = { "@context": "https://schema.org", "@type": "Person", "@id": `${SITE}/#person`, name: "Chris Hay", description: HOUSE.description, url: SITE, sameAs: Object.values(socials) };
 return <html lang="en" data-mode="light" suppressHydrationWarning className={`${display.variable} ${text.variable} ${record.variable}`}><head><script dangerouslySetInnerHTML={{__html:modeScript("light")}}/></head><body id="top"><Analytics id={analyticsId}/><JsonLd data={[person,webSiteLd({name:"Chris Hay",url:SITE,description:`${HOUSE.descriptor}. ${HOUSE.description}`})]}/><MotionProvider><Header/>{children}<Footer/></MotionProvider></body></html>;
}
