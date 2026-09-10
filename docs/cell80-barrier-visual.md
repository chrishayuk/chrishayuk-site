# EX-11: a visual history for the fourth note

The opening now plays the experiment's recorded population counts: all 3,000
steps in each of 40 worlds. Readers can pause, scrub, jump to the first capable
birth, change experimental conditions, and choose an individual world. A second
figure compares appearance and retention across all 40 worlds; the original
numeric table remains in a disclosure.

The 256 marks represent population counts grouped by capability, not recorded
positions, patches, or persistent organism identities. Grey marks are incapable
organisms, amber marks are capable organisms with low intake, and white squares
are capable organisms with high intake. Empty places remain in the denominator.
The trace shows total alive, total capable (including high intake), and capable
with high intake, on a common 0–256 scale.

The initial selection is explicitly full evolution, offset +5, at tick 1975:
one capable organism among 126 living organisms. It is one of two retained full
worlds, not a representative success rate. All failures remain selectable.
Full +7 has one capable birth at tick 475 but no capable organisms in any
end-of-step count. Its appearance is taken from the mutation log, independently
of the population trace, and the viewer explains this distinction.

`scripts/export-cell80-barrier.py` takes the original EX-11 JSONL as its argument.
It preserves every population frame, exact string seeds, discovery metadata and
history hashes, exports separate downloads for each world, and keeps a gzip copy
of the original raw file. The index pins both raw and compressed source hashes,
as well as each downloaded world's hash. No world or position is synthesized.

Validation compares all 120,000 exported frames with the original source, checks
population bounds and grouping, verifies all hashes and confirms the reported
appearance/retention totals: 3/2, 2/1, 3/0, 0/0. The new test also preserves the
fleeting birth that population counts alone miss. TypeScript, changed-file lint,
and the production build pass. Playback pauses when the page is hidden and
starts only on request. Browser interaction testing remains unavailable.
