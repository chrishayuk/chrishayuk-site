/**
 * The Link header advertising the machine index, as one value.
 *
 * It lives here rather than inline in proxy.ts so a test can assert the
 * exact string the proxy appends. Asserting on proxy.ts's SOURCE would
 * be testing a rendering of the property instead of the property, which
 * is the failure mode this codebase has hit six times.
 *
 * `describedby`, not `alternate`. llms.txt v2 separates them: `alternate`
 * means the same page in another format, and /llms.txt is not an
 * alternate form of any page — it is a document about the whole site.
 * v2 reserves `rel="alternate" type="text/markdown"` for a page's own
 * Markdown representation, which this site does not yet serve.
 *
 * Two of the four MACHINE-VISIT-1 runs reached the machine surface via a
 * header or a robots.txt comment rather than by guessing a conventional
 * path, so this is a discovery route rather than decoration.
 *
 * Relative on purpose: a preview or the Fly hostname must point at its
 * own machine index, not at production's.
 */
export const MACHINE_INDEX_LINK = '</llms.txt>; rel="describedby"; type="text/plain"; title="machine index"';
