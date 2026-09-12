import { createHash } from "node:crypto";
import type { Snapshot } from "./records.ts";
import type { PublicationRecord } from "./types.ts";
import { stableJson, validateRecord } from "./publication.ts";
import { auditContinuity, compareVersions, realDate, type Revision } from "../vendor/hause/provenance.ts";

/** Build without writing, so a release can be reviewed and tested before persistence. */
export function preparePublication(manuscript: PublicationRecord, snapshots: Snapshot[], version: string, date: string, revision: Revision): Snapshot {
 if (!realDate(date)) throw new Error("Supply a real publication date (YYYY-MM-DD).");
 const history = snapshots.filter(snapshot => snapshot.record.id === manuscript.id).sort((a, b) => compareVersions(a.record.version, b.record.version));
 const previous = history.at(-1)?.record;
 if (history.some(snapshot => compareVersions(snapshot.record.version, version) === 0)) throw new Error("This version is immutable. Choose a new version.");
 if (manuscript.visibility === "unlisted") throw new Error("Review the manuscript visibility before publishing; an unlisted preview is not a release.");
 const record = validateRecord({ ...manuscript, publication: "published", version, published: previous?.published || date, revised: previous ? date : undefined });
 if (previous && (record.slug !== previous.slug || record.kind !== previous.kind || record.created !== previous.created)) throw new Error("A revision must preserve the record's stable route and recorded date.");
 const issues = auditContinuity(record, revision, previous);
 if (issues.length) throw new Error(issues.map(issue => `${issue.message} ${issue.remedy}`).join("\n"));
 return { record, hash: createHash("sha256").update(stableJson(record)).digest("hex"), algorithm: "sha256" };
}
