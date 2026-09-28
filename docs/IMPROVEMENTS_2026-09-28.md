# Improvements, 28 September 2026

- Built the full website in French, German, Italian and English from the Tribea website brief, with the visual identity from `docs/BRAND_GUIDELINES.md` (Kameron, Work Sans, Quattrocento Sans; Dark Amaranth, Alice Blue, Blue Slate), on light backgrounds only.
- Localized the copy through `communication-swiss-localization`: Swiss Standard German with ss, Swiss French and Ticino Italian, formal address, official legal and institutional names (DSG/LPD, BPR/LDP, EFK/CDF, EDÖB/PFPDT/IFPDT), gender-fair forms per Federal Chancellery practice.
- Vectorised the wordmark (v1, then v2) and the round symbol into `/logo`, and used them in the header, footer, hero and favicon.
- Subset the fonts to WOFF2 (from about 1 MB to 140 KB) and defined the logo shapes once per page, which halved page weight and brought Lighthouse performance from 72 to 99 and 100.
- Renamed the section "Insights" from the brief to "Analysis", since "insights" is on the banned-words list.
- Open points: the placeholders, the form endpoints, the booking link, a native review of each language, a legal review, and the official title of the Federal Chancellery's code of conduct for signature collection, which no localizer could verify.
- Correction the same day: removed every colour outside the brand palette (the derived dark shades and the light amaranth), the dark mode and all dark backgrounds, so the site uses only Dark Amaranth, Alice Blue, Blue Slate and white. Removed the large symbol from the hero and made the symbol in the header 10 percent smaller.

- New brand palette in ranked order: Egyptian Blue (primary, `#29339B`), Tea Green (secondary, `#C8E9A0`), Black, Cool Steel (`#94A0AA`) and Blue Slate (`#4C5F6B`), replacing Dark Amaranth and Alice Blue. Updated `docs/BRAND_GUIDELINES.md` and both copies of `tokens.css`; the logo stays in Blue Slate, which remains in the palette.
- Second round the same day, after the client review:
  - Rewrote every abstract or unverifiable sentence in the source (for example "channels you own", "win the vote", "trust review") into concrete wording, stopped listing the national languages as a selling point, and added the section "From the commune to the Confederation". The three languages were relocalized against the new tangibility rule, which was also added to the `communication-swiss-localization` skill (`references/abstract-calques-and-tangibility.md`).
  - Moved each language to its own subdomain (`fr.tribea.ch` and so on) with a language picker in the header, the mobile menu and the footer, one sitemap per subdomain, and a redirect of the bare domain to the browser language (see `docs/DEPLOYMENT.md`). The language chooser page is gone.
  - Applied the new five-colour palette from `docs/BRAND_GUIDELINES.md`, sharp corners throughout, a light hero built from the Lucerne photograph (Diana Shturm, Unsplash) as a Blue Slate duotone, flat colour-blocked illustrations in the palette, a feature grid for the three services, statistic cells, a hairline frame down the page, the brand symbol as a watermark in closing sections, and quiet entrance animations that switch off for reduced motion.
  - Response time set to 3 days in all languages.
  - Checks on 28 September 2026: layout gate zero findings on all 68 pages at 1440, 768 and 390 px; Lighthouse 98 to 99 performance and 100 in accessibility, best practices and SEO; no third-party request.
- Third round, after the review against the design gotchas:
  - Applied the palette Intense Cherry, Rosewood, Black, Cool Steel and Blue Slate, with an 8 percent Rosewood tint for alternate sections (`styles/tokens.css`, `docs/BRAND_GUIDELINES.md`).
  - Removed the tells the review found: the line of text under the hero buttons, the accent bar under section headings, the hand-drawn SVG illustrations, the three-card feature grid, the large-number stats band, the hairline frame rails, the symbol watermark, the scroll-triggered fade on every section, and the generic link labels.
  - Replaced the website figures section with three client guarantees: a confidential mandate with minimal data, every step within the law, and data returned or deleted at the end of the mandate.
  - Kept motion to interactions only, between 120 and 220 ms: the language picker and the mobile menu opening, link underlines, button press, row hover and field borders, all switched off for reduced motion.
  - Checks: layout gate zero findings on all 68 pages at three widths; Lighthouse 99 to 100 performance and 100 elsewhere.
- Fourth round, Harvey as the reference for restraint and finish:
  - Typography: Kameron headings at weight 560, Schibsted Grotesk (designed for the Schibsted news group) for all other text. Work Sans and Quattrocento Sans archived in `99_Archive/Tribea/fonts/`.
  - Page background moved to a 4 percent Rosewood tint for a paper tone; navigation aligned beside the logo; hero photograph taller and at 80 percent opacity behind the text.
  - Language picker redesigned: the language code in the header, a panel listing each language in its own spelling with its code, the current one marked in Intense Cherry.
  - The three services are an exclusive disclosure list (HTML `details` with a shared `name`, no JavaScript) beside a close crop of the Lucerne photograph that changes with the open service.
  - Checks: layout gate zero findings on all 68 pages at three widths; Lighthouse 99 performance and 100 elsewhere.
- Fifth round: removed the chevron from the language picker and the plus and cross marks from the service list, removed the photograph crops beside the services, enlarged the hero headline, turned "From the commune to the Confederation" into a full-width statement section, and set the header in Black with the logo in White, like the footer. Layout gate zero findings; Lighthouse 99 and 100.
