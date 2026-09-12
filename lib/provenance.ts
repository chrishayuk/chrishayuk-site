import entries from "../content/publication-provenance.json" with { type: "json" };
import { getRecord, isListed, publicationSnapshots, recordPath, SITE } from "./records.ts";
import { compareVersions, type Provenance, type EvidenceReference } from "../vendor/hause/provenance.ts";

export const publicationProvenance = entries as Provenance[];
export const provenanceFor = (id: string, version: string) => publicationProvenance.find(entry => entry.id === id && entry.version === version);
export const versionUrl = (id: string, version: string) => `${SITE}/records/${id}/${version}`;
export function publicationHistory(id: string) {
 const current = getRecord(id);
 if (!current || !isListed(current)) return undefined;
 const versions = publicationSnapshots.filter(snapshot => snapshot.record.id === current.id)
  .sort((a, b) => compareVersions(a.record.version, b.record.version))
  .map((snapshot, index, snapshots) => {
   const { record } = snapshot, provenance = provenanceFor(record.id, record.version);
   return {
    version: record.version, url: versionUrl(record.id, record.version),
    published: record.published, revised: record.revised,
    publication: record.publication, scientificStatus: record.status,
    experiments: record.experiments,
    supersedes: record.supersedes?.map(reference => ({ ...reference, url: versionUrl(reference.id, reference.version) })),
    supersededBy: publicationSnapshots.flatMap(candidate => (candidate.record.supersedes || []).filter(reference => reference.id === record.id && reference.version === record.version).map(reference => ({ id: candidate.record.id, version: candidate.record.version, reason: reference.reason, url: versionUrl(candidate.record.id, candidate.record.version) }))),
    hash: snapshot.hash, algorithm: snapshot.algorithm,
    revision: provenance?.revision,
    previous: snapshots[index - 1] ? versionUrl(record.id, snapshots[index - 1].record.version) : undefined,
    next: snapshots[index + 1] ? versionUrl(record.id, snapshots[index + 1].record.version) : undefined,
    sources: (provenance?.sources || record.sources) as EvidenceReference[],
    manuscript: `${SITE}/api/record/${record.id}?version=${record.version}`,
    citations: `${SITE}/api/citations/${record.id}?version=${record.version}`,
   };
  });
 return { id: current.id, url: `${SITE}${recordPath(current)}`, currentVersion: current.version, publication: current.publication, scientificStatus: current.status, versions };
}
