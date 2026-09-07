/**
 * WHO IS READING, AND HOW MUCH OF THAT IS ACTUALLY KNOWN.
 *
 * Google Analytics is a script. Every agent in the table below fetches
 * this site without running one, so the existing measurement is
 * structurally blind to all of them. This module is the other half: a
 * pure function from the headers of one request to a classification,
 * with no I/O, no state and no clock, so it can be tested exhaustively
 * and audited by a reader who wants to know what the published numbers
 * are counting.
 *
 * Two things it deliberately does NOT do.
 *
 * It does not turn a fetch into a person. A single question asked of an
 * assistant can cause several retrievals — the answer page, a redirect,
 * a retry, a supporting document. `ai_user` counts REQUESTS MADE BY
 * USER-FETCH AGENTS. It is the closest thing to evidence that someone
 * caused a machine to come here, and it is not a headcount.
 *
 * It does not treat a name as an identity. Everything here reads a
 * header the client chose to send, which is why the result carries a
 * confidence alongside it and why ranges.ts exists.
 */

/** What the request appears to be FOR. The distinction providers themselves now draw. */
export type Purpose =
 | "ai_user"       // a person asked an assistant something and it came here
 | "ai_search"     // indexing for AI answers and citation surfaces
 | "ai_training"   // corpus acquisition
 | "search_bot"    // conventional web search indexing
 | "feed_reader"   // a subscription, polling on someone's behalf
 | "link_preview"  // a card being built for a shared link
 | "automation"    // machine-shaped, and none of the above
 | "human";        // an ordinary browser

/** How much the classification is worth. */
export type Confidence =
 | "verified"    // declared agent, and the address is one its provider publishes
 | "declared"    // declared agent, provider publishes no list to check it against
 | "refuted"     // declared agent, and its provider's published list excludes this address
 | "inferred"    // nothing declared; classified from the shape of the request
 | "none";       // ordinary browser traffic, nothing claimed and nothing checked

/** What KIND of document was fetched — the question a conventional analytics tool never asks. */
export type Surface = "page" | "feed" | "agent_document" | "api" | "asset" | "other";

/** Where a browser came from, so a retrieval can be told apart from a click-through. */
export type Referral = "chatgpt" | "claude" | "perplexity" | "copilot" | "search" | "social" | "site" | "none";

export type Classification = { purpose: Purpose; provider: string; agent: string; confidence: Confidence; surface: Surface; referral: Referral; path: string };

/**
 * The declared agents this site recognises, most specific first.
 *
 * Only agents whose operator documents them are listed. `Google-Extended`
 * and `Applebot-Extended` are absent on purpose: they are robots.txt
 * opt-out tokens, not user agents, and no request ever arrives carrying
 * one. Counting them would be inventing a reader.
 */
export const AGENTS: readonly { pattern: RegExp; agent: string; provider: string; purpose: Purpose }[] = [
 // A person asked; the assistant fetched.
 { pattern: /ChatGPT-User/i, agent: "ChatGPT-User", provider: "openai", purpose: "ai_user" },
 { pattern: /Claude-User/i, agent: "Claude-User", provider: "anthropic", purpose: "ai_user" },
 { pattern: /Perplexity-User/i, agent: "Perplexity-User", provider: "perplexity", purpose: "ai_user" },
 { pattern: /MistralAI-User/i, agent: "MistralAI-User", provider: "mistral", purpose: "ai_user" },
 { pattern: /Meta-ExternalFetcher/i, agent: "Meta-ExternalFetcher", provider: "meta", purpose: "ai_user" },
 // Indexing for answers and citations.
 { pattern: /OAI-SearchBot/i, agent: "OAI-SearchBot", provider: "openai", purpose: "ai_search" },
 { pattern: /Claude-SearchBot/i, agent: "Claude-SearchBot", provider: "anthropic", purpose: "ai_search" },
 { pattern: /PerplexityBot/i, agent: "PerplexityBot", provider: "perplexity", purpose: "ai_search" },
 { pattern: /DuckAssistBot/i, agent: "DuckAssistBot", provider: "duckduckgo", purpose: "ai_search" },
 // Corpus acquisition.
 { pattern: /GPTBot/i, agent: "GPTBot", provider: "openai", purpose: "ai_training" },
 { pattern: /ClaudeBot/i, agent: "ClaudeBot", provider: "anthropic", purpose: "ai_training" },
 { pattern: /Claude-Web|anthropic-ai/i, agent: "Claude-Web", provider: "anthropic", purpose: "ai_training" },
 { pattern: /CCBot/i, agent: "CCBot", provider: "common-crawl", purpose: "ai_training" },
 { pattern: /Meta-ExternalAgent|FacebookBot/i, agent: "Meta-ExternalAgent", provider: "meta", purpose: "ai_training" },
 { pattern: /Bytespider/i, agent: "Bytespider", provider: "bytedance", purpose: "ai_training" },
 { pattern: /Ai2Bot|AI2Bot-Dolma/i, agent: "Ai2Bot", provider: "allen-ai", purpose: "ai_training" },
 { pattern: /cohere-ai|cohere-training-data-crawler/i, agent: "cohere-ai", provider: "cohere", purpose: "ai_training" },
 { pattern: /Diffbot/i, agent: "Diffbot", provider: "diffbot", purpose: "ai_training" },
 { pattern: /omgili(bot)?/i, agent: "omgilibot", provider: "webz", purpose: "ai_training" },
 { pattern: /ImagesiftBot/i, agent: "ImagesiftBot", provider: "hive", purpose: "ai_training" },
 { pattern: /PanguBot/i, agent: "PanguBot", provider: "huawei", purpose: "ai_training" },
 { pattern: /Timpibot/i, agent: "Timpibot", provider: "timpi", purpose: "ai_training" },
 // Conventional search indexing.
 { pattern: /Googlebot(?!-)|Googlebot-(News|Image|Video)|Google-InspectionTool/i, agent: "Googlebot", provider: "google", purpose: "search_bot" },
 { pattern: /bingbot|adidxbot|BingPreview/i, agent: "bingbot", provider: "microsoft", purpose: "search_bot" },
 { pattern: /Applebot/i, agent: "Applebot", provider: "apple", purpose: "search_bot" },
 { pattern: /DuckDuckBot|DuckDuckGo-Favicons-Bot/i, agent: "DuckDuckBot", provider: "duckduckgo", purpose: "search_bot" },
 { pattern: /YandexBot/i, agent: "YandexBot", provider: "yandex", purpose: "search_bot" },
 { pattern: /Baiduspider/i, agent: "Baiduspider", provider: "baidu", purpose: "search_bot" },
 { pattern: /Amazonbot/i, agent: "Amazonbot", provider: "amazon", purpose: "search_bot" },
 { pattern: /Slurp/i, agent: "Slurp", provider: "yahoo", purpose: "search_bot" },
 // Someone subscribed.
 { pattern: /Feedly|Feedbin|Inoreader|NewsBlur|FreshRSS|Tiny ?Tiny ?RSS|miniflux|NetNewsWire|Reeder|Feedspot|Liferea|Akregator|RSSOwl|feedparser|Feedfetcher|Superfeedr|granary|\bRSS\b/i, agent: "feed reader", provider: "other", purpose: "feed_reader" },
 // A link was shared and a card is being built.
 { pattern: /facebookexternalhit|Twitterbot|LinkedInBot|Slackbot|Slack-ImgProxy|Discordbot|WhatsApp|TelegramBot|Pinterest|redditbot|Mastodon|Iframely|Embedly|SkypeUriPreview|vkShare/i, agent: "link preview", provider: "other", purpose: "link_preview" },
];

/** Named client libraries and headless browsers: machine-shaped without claiming to be anyone. */
const CLIENT = /^(?:curl|Wget|libcurl|python-requests|python-urllib|Python-urllib|httpx|aiohttp|Go-http-client|Java|okhttp|axios|node-fetch|undici|got|reqwest|libwww-perl|lwp-request|Apache-HttpClient|PostmanRuntime|insomnia|Scrapy|GuzzleHttp|Faraday|http\.rb|HTTPie|Deno|Bun)\b/i;
const HEADLESS = /HeadlessChrome|PhantomJS|Puppeteer|Playwright|SlimerJS|Electron\//i;
/** A self-named bot this site does not recognise. The delimiter keeps device names like CUBOT_NOTE out. */
const UNKNOWN_BOT = /(?:^|[\s(;,/])[a-z0-9._-]*(?:bot|crawler|spider|scraper)[/\s;),]/i;
const BROWSER = /Mozilla\/5\.0|AppleWebKit|Gecko\/|Trident\/|Safari\//i;

const FEED = /^\/(?:rss\.xml|feed\.json|(?:record|notebook)\/feed\.(?:xml|json))$/;
const AGENT_DOCUMENT = /^\/(?:robots\.txt|sitemap\.xml|llms(?:-full)?\.txt|ai\.txt|follow\.json|\.well-known\/.*)$/;
const ASSET = /\.(?:png|jpe?g|webp|avif|gif|svg|ico|mp4|webm|woff2?|ttf|css|js|map|txt|pdf)$/i;
/**
 * The shape a path must have before it is recorded at all.
 *
 * The readership page is public, and a path is attacker-controlled
 * text. Anything outside this shape is counted as one bucket rather
 * than echoed, so a request for a crafted URL cannot write a string
 * onto a published page or inflate the cardinality of the store.
 */
const SAFE_PATH = /^\/[A-Za-z0-9/_.@-]{0,119}$/;
export const UNRECOGNISED = "/(unrecognised)";

export function normalisePath(pathname: string): string {
 const path = pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
 return SAFE_PATH.test(path) && !path.includes("..") ? path : UNRECOGNISED;
}

export function surfaceOf(path: string): Surface {
 if (FEED.test(path)) return "feed";
 if (AGENT_DOCUMENT.test(path)) return "agent_document";
 if (path.startsWith("/api/")) return "api";
 if (path.startsWith("/_next/") || path.startsWith("/_vinext/") || path.startsWith("/media/") || ASSET.test(path)) return "asset";
 if (path === UNRECOGNISED) return "other";
 return "page";
}

const REFERRERS: readonly [RegExp, Referral][] = [
 [/(?:^|\.)chatgpt\.com$|(?:^|\.)chat\.openai\.com$/i, "chatgpt"],
 [/(?:^|\.)claude\.ai$|(?:^|\.)claude\.com$/i, "claude"],
 [/(?:^|\.)perplexity\.ai$/i, "perplexity"],
 [/copilot\.microsoft\.com$|(?:^|\.)copilot\.cloud\.microsoft$/i, "copilot"],
 [/(?:^|\.)(?:google|bing|duckduckgo|ecosia|brave|startpage|yandex|baidu)\.[a-z.]+$/i, "search"],
 [/(?:^|\.)(?:x|twitter|t)\.co(?:m)?$|(?:^|\.)(?:linkedin|facebook|reddit|news\.ycombinator|bsky|threads|mastodon|substack|youtube)\.[a-z.]+$/i, "social"],
];

/**
 * Where a browser came from. `utm_source` is checked first because
 * ChatGPT stamps its citation links with `utm_source=chatgpt.com`,
 * which is the one signal that separates "a machine retrieved the
 * page" from "a person followed the citation to it".
 */
export function referralOf(referer: string | null, utmSource: string | null, host: string | null): Referral {
 const source = utmSource?.trim().toLowerCase();
 if (source) for (const [pattern, referral] of REFERRERS) if (pattern.test(source.replace(/^https?:\/\//, "").split("/")[0])) return referral;
 if (!referer) return "none";
 let hostname: string;
 try { hostname = new URL(referer).hostname.toLowerCase(); } catch { return "none"; }
 if (host && hostname === host.toLowerCase().split(":")[0]) return "site";
 for (const [pattern, referral] of REFERRERS) if (pattern.test(hostname)) return referral;
 return "none";
}

export type RequestFacts = { pathname: string; userAgent: string | null; referer?: string | null; utmSource?: string | null; host?: string | null };

/**
 * Classify one request. Pure: same headers in, same answer out, for
 * every reader who wants to check what a published figure counted.
 *
 * Confidence is left at `declared` here. Testing a claim needs the
 * caller's address, which this function is never given and which is
 * never stored — the store asks ranges.ts for that verdict and keeps
 * the verdict, not the address.
 */
export function classify(facts: RequestFacts): Classification {
 const path = normalisePath(facts.pathname);
 const surface = surfaceOf(path);
 const referral = referralOf(facts.referer ?? null, facts.utmSource ?? null, facts.host ?? null);
 const ua = facts.userAgent?.trim() ?? "";
 const base = { surface, referral, path };

 for (const entry of AGENTS) if (entry.pattern.test(ua)) return { ...base, purpose: entry.purpose, provider: entry.provider, agent: entry.agent, confidence: "declared" };
 if (!ua) return { ...base, purpose: "automation", provider: "unknown", agent: "no user agent", confidence: "inferred" };
 if (CLIENT.test(ua)) return { ...base, purpose: "automation", provider: "unknown", agent: ua.split(/[/\s]/)[0].toLowerCase(), confidence: "inferred" };
 if (HEADLESS.test(ua)) return { ...base, purpose: "automation", provider: "unknown", agent: "headless browser", confidence: "inferred" };
 if (UNKNOWN_BOT.test(ua)) return { ...base, purpose: "automation", provider: "unknown", agent: "unrecognised bot", confidence: "inferred" };
 if (BROWSER.test(ua)) return { ...base, purpose: "human", provider: "none", agent: "browser", confidence: "none" };
 return { ...base, purpose: "automation", provider: "unknown", agent: "unrecognised client", confidence: "inferred" };
}
