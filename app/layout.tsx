import { modeScript } from "@chrishayuk/hause/mode";
import { JsonLd } from "@chrishayuk/hause/components/JsonLd";
import { webSiteLd } from "@chrishayuk/hause/seo";
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
 return { metadataBase: new URL(origin), title: { default: "Chris Hay — A research house", template: "%s — Chris Hay" }, description: "Building things to find out how they work. A film, photography and research record by Chris Hay.", robots: { index: INDEXABLE, follow: INDEXABLE }, openGraph: { title: "Chris Hay — Building things to find out how they work.", description: "A research house. Film, photography, engineering and the ideas along the way.", type: "website", siteName: "Chris Hay", images: [{ url: `${origin}/og.png`, width: 1536, height: 1024, alt: "Chris Hay. Building things to find out how they work." }] }, twitter: { card: "summary_large_image", images: [`${origin}/og.png`] }, icons: { icon: "/favicon.svg" }, alternates: { canonical: SITE, types: { "application/rss+xml": "/rss.xml", "application/feed+json": "/feed.json" } } };
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
 const person = { "@context": "https://schema.org", "@type": "Person", "@id": `${SITE}/#person`, name: "Chris Hay", description: "Technologist, Futurist and Disruptor.", url: SITE, sameAs: Object.values(socials) };
 return <html lang="en" data-mode="light" suppressHydrationWarning className={`${display.variable} ${text.variable} ${record.variable}`}><head><script dangerouslySetInnerHTML={{__html:modeScript("light")}}/></head><body id="top"><JsonLd data={[person,webSiteLd({name:"Chris Hay",url:SITE,description:"A film, photography and research record by Chris Hay."})]}/><MotionProvider><Header/>{children}<Footer/></MotionProvider></body></html>;
}
