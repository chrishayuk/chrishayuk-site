# Component synchronization — 25 September 2026

Both hause.design and chrishayuk.com consume HAUSE revision
`43283a8e06ec33a3c23e9e24296dd99596ba1bb9` on review branches.

The book now imports exhibition capabilities directly from the package. Its old
35-form compatibility snapshot is retired. StagedTransition and TextCorrection
have authored studies, reusable specimens, selection grammar and room links.
The catalogue, source API documentation and Ask corpus cover all 37 forms.
Historical evaluation inputs and outcomes retain their original release scope.

FigureMotion, AnchoredDisclosure, legibility and revision-continuity helpers now
belong to the library. The publication room demonstrates the reading helpers;
capability records and contribution relationships identify their actual origin.

`npm run check:hause` verifies 111 source files and the exact dependency pin.
The HAUSE source-parity workflow independently checks out that upstream commit,
so changing both a local component and its checksum still fails CI.
See the library's SYNC.md for the update procedure.

Validation: library tests and typecheck, both consumer test suites and production
builds, and the book's generated-page coverage checks. Browser interaction and
visual comparison are not part of these source/build checks. These review
branches have not been deployed.

The application lint boundary excludes the verified HAUSE mirror. Existing
application-wide lint findings outside this synchronization remain separate
from the passing build, type and parity checks.
