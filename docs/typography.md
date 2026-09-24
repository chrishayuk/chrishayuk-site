# Typography experiment

Branch: `design/editorial-homepages`.

The publication uses Newsreader for editorial titles and Archivo for prose,
navigation and prose captions. Geist Mono carries recorded metadata, status,
dates, measurements, citations and code. The families load through `next/font`, with normal and italic faces;
Newsreader includes its optical-size axis.

| Role | Family | Size | Treatment |
| --- | --- | --- | --- |
| Featured film title | Newsreader | 34–56px | Regular, 1.12 line height, −0.015em tracking |
| Research / conversation title | Newsreader | 28–40px | Regular, 1.16 line height |
| Notebook title | Newsreader | 25–32px | Regular, 1.22 line height |
| Body | Archivo | 15–16px on homepage | 1.7–1.8 line height |
| Navigation / prose captions | Archivo | 13px | Near-normal tracking |
| Record metadata / dates / status | Geist Mono | 13px on collection surfaces | Tabular numerals, normal tracking |
| Wordmark | Archivo | 24px desktop / 20px narrow mobile | Medium, slight positive tracking |
| Code | Geist Mono | Context dependent | Tabular numerals, normal tracking |

Role tokens live in `app/typography.css`. The old family variables are compatibility
aliases for existing layouts and HAUSE forms. Homepage sizes are defined in
`app/home-edition.css`; individual scientific instruments keep their own scales.
Decorative italic emphasis is removed from headings, while prose emphasis retains
its normal semantic styling. Existing social-card font files remain separate.

Font sources: [Newsreader](https://github.com/google/fonts/tree/main/ofl/newsreader)
and [Archivo](https://github.com/google/fonts/tree/main/ofl/archivo).

Production compilation verifies loading and declarations. Rendered line breaks,
mobile wrapping and optical balance still require browser review.
