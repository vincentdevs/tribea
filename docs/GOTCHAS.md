# Tribea Gotchas

The must-not-do list for anything Tribea builds next: a new page on the website, a landing page, a deck, a social post, a PDF or a document. Every rule below comes from something that shipped in an earlier version of the website on 28 September 2026 and was rejected by the client, or from a measure that raised the quality bar. Read it before you start and check the finished work against it before you hand it over.

It sits beside three files and never replaces them. `docs/BRAND_GUIDELINES.md` holds the palette, the type and the components. `tribea-website/README.md` records the decisions locked with the client. The personal gotcha files in `05_Skills/` (copy, design, UX) still apply on top.

---

## Section 0: One Hit Is a Hold

1. **No colour outside the palette.** On the website, only Black, White, light grey `#F3F4F5` and Blue Slate `#4C5F6B`, with Cool Steel for lines. Intense Cherry and Rosewood exist for print, social and slides only, and a single cherry step number on the website counts as a hit.
2. **No dark band other than the header and the footer.** No dark mode, no dark hero, no coloured section.
3. **No placeholder in visible text.** The build counts every `[PLACEHOLDER]` and the count must be 0. If a fact is missing, rewrite the sentence so it no longer needs it.
4. **No abstract or promissory sentence.** "Des canaux qui vous appartiennent", "gagner la votation" and "bilan de confiance" were all rejected. Name what the reader can point to, and never promise an electoral result.
5. **No third-party request and no cookie.** The site proves the agency's privacy promise, so no Google Fonts, no analytics, no embedded map or video, no CDN. The server's Content-Security-Policy blocks them in any case.
6. **No retired typeface.** Kameron, Work Sans, Quattrocento Sans and Schibsted Grotesk are archived. Headings use Newsreader, everything else uses Lato.
7. **No em dash and no contrast framing,** in any of the four languages.

---

## Look

**The generated-design tells, all removed once already.** These are eyebrows above headings, an accent bar under a heading, a line of small text under the hero buttons, three-card feature grids, bento grids, bands of large statistics, frame rails down the page, the logo symbol as a watermark and hand-drawn scene illustrations. Each of them made the site look like a template. What replaced them was typographic sections, the custom icons and a single photograph on the home page hero.

**One body style.** Every paragraph, list item, note and date is Lato 17px on 1.65 in Blue Slate. Mixing 15, 16 and 18px made an earlier version look unfinished. Only the hero introduction is larger, headings are Black, and bold passages are Black at weight 700, one per block at most.

**Sharp corners everywhere.** That covers buttons, fields, panels and the language picker panel. A rounded corner anywhere breaks the system.

**Every section introduction gets room.** A heading followed by an intro sits 48 to 72px above what comes next, and items in a separated list get at least 22px above and below. The two-column list on the home page once had 14px between items and 40px between columns, and it read as one dense block.

**Lines go between items only.** A line above the first or below the last item frames a list that needs no frame. In two-column rows, the two columns share their lines.

**One watercolour per page header, never the same one twice.** Since 29 September 2026 every content page opens with a loose monochrome watercolour of its own subject, indigo washes on white paper, recoloured to Blue Slate by `scripts/build-illustrations.py`, with no gradient or fade. Inner pages show theirs at full opacity; the home hero uses the same build as the inner pages, text beside the painting at full opacity, only with a larger painting. The home scene is warm and animated, people leaning in and smiling, since it is the first thing a visitor sees. Clean line drawings in the willow-plate manner were tried first and rejected as plain, so the style is painterly with soft edges and untouched paper, never a coloured-in outline. The home page drawing covers the whole hero, the inner ones sit smaller beside the heading. Each scene is modern and set in present-day Switzerland, and it shows the values rather than symbols of them: people talking, a document checked before use, data handed back. No flags, no mountains as a shortcut for Switzerland, no crowd, no padlock or shield. The Lucerne photograph and the earlier flat illustrations were both retired. Read every generated drawing at full size before it ships, and regenerate any with a wrong hand, a garbled object or text inside the image.

**Icons are drawn for Tribea.** They sit on a 48 unit grid with a 1.25 stroke and show the real object: a sealed envelope, a classical column, a document handed back. A generic padlock, shield, rocket or sparkle is a hit. The drawn top of the icon aligns with the cap height of the title beside it, not with the top of its box.

**Logo.** Use the wordmark alone in the header and footer, White on Black. The round symbol serves only as the favicon, White on a Black square. Both are inlined with `currentColor` through `Logo.astro` and `Mark.astro`, and loaded once per page through `BrandSprite.astro`.

## Components

**Forms.** Every page ends with a real contact form (name, email, message), never a lone button. Each field is one 1px Black line that never changes weight or colour, never a box. Choices are small squares, never round radios. There is no hint text under the message field, and the list of topics ends with « Autre ».

**Buttons.** The primary is Black with White text and a White fill that wipes in from the left on hover. The secondary is White with no outline and a Black fill on hover. Both turn Blue Slate when pressed and lean up to 6px towards the pointer. They are 54px high (44px in the header), and every label sits in a `.button-label` span so it can slide 3px on hover.

**Pointer ring.** A thin ring trails the native cursor, which always stays visible. It widens over links and fields and disappears over buttons, it hides while a text field has focus so it never sits over what is being typed, and it only runs for a mouse on a device that can hover, never under reduced motion. Never hide the system cursor or use a blend mode, which produces colours outside the palette.

**Language picker.** Show the current code only ("FR"), with no frame, pill or arrow. A straight Black panel drops down and opens to the right, away from the call to action. The languages always appear in the order German, French, Italian, English, and German is the default. There is no language chooser page, because the bare domain redirects by browser language, and to German when the browser asks for none of the four.

**Services and steps.** Services open one at a time through `details` elements sharing a `name`, so the list works without JavaScript. The script only adds the height transition. Plus and cross marks and photograph crops beside the services were removed.

## Motion

Motion runs on interaction only, between 120 and 260 ms: buttons, the picker, the services opening, the focused step, and the header compacting on scroll. The one load animation is the hero headline rising word by word. Scroll-triggered fades on every section and the rotating guarantees carousel were both rejected as motion without a reason. Every effect stops under `prefers-reduced-motion`, and the page must work with the script switched off.

## Words

- **Tangible over abstract.** Each sentence names something the reader can see or check, such as a website, a newsletter or contact lists they manage themselves.
- **Neutral, precise, calm,** with formal address (vous, Sie, lei), no unsourced claim about voters or competitors, and no promise of an outcome.
- **Languages are not a selling point.** Write about local and multilingual work "from the commune to the Confederation", never a list of French, German and Italian.
- **Official names are exact** in every language: DSG/LPD, BPR/LDP, EFK/CDF, EDÖB/PFPDT/IFPDT, with Swiss Standard German (ss, never ß) and gender-fair forms per Federal Chancellery practice.
- **The response time is 3 days** in every language. A figure that appears on one page must match on all of them.
- **"Insights" became "Analysis"**, and any word on the banned list gets the same treatment, a concrete replacement rather than a synonym.
- Every language goes through the `communication-swiss-localization` skill, which carries the tangibility rule written after this project. Do not translate from English and ship.

---

## Adding a Page to the Website

1. **Write the job first.** Decide who lands on the page, what they need to decide there, and which step follows. Every page ends on the contact form.
2. **Add the route** in `src/i18n.ts` under `ROUTES`, with a native slug in each language (`oeffentliche-hand`, not `public-sector` on the German site), and add it to `PARENT` if it sits one level down, so the breadcrumb follows.
3. **Add the copy to all four files** in `src/content/`, with the same structure in each. A key missing from one language breaks that build.
4. **Build from existing section types** in `src/components/Sections.astro` (`pageHead`, `prose`, `rows`, `rules`, `split`, `steps`, `table`, `cta` and the rest). Add a new type only when none of them can carry the content, and check it against the tells above before you use it.
5. **Place the page in the navigation or the footer** according to the locked structure: Services, Méthode, À propos, Contact in the header, with Analyses reached from the home page and the footer only.
6. **Run the checks below** before handing it over.

## Performance, Privacy and SEO

These are the measures behind the quality bar. Keep them when anything changes.

- **Fonts are self-hosted and subset.** `scripts/build-fonts.py` keeps only the characters the four languages need, trims Newsreader to weights 450 to 560 at optical size 36, and writes WOFF2. This took the fonts from about 1 MB to 140 KB and moved Lighthouse performance from 72 to 99. Add a glyph to `UNICODES` rather than loading a full font file. Only Newsreader and Lato Regular are preloaded.
- **The brand files stay the single source.** `scripts/sync-brand.mjs` rebuilds the fonts from `/fonts` and copies `styles/tokens.css` into the site on every build. Edit the root files, never the copies inside `tribea-website/`.
- **Minimal JavaScript.** `src/site.ts` is the only script, it handles four interactions and uses no library. A new feature that needs a framework is a decision for the client, not a default.
- **One subdomain per language.** Each page carries its canonical, its `hreflang` links to the three other languages and an `x-default`, and each subdomain gets its own `sitemap.xml` and `robots.txt` from `scripts/split-subdomains.mjs`.
- **Security headers live on the server** (see `docs/DEPLOYMENT.md`): a Content-Security-Policy allowing only the site's own origin, `Referrer-Policy` and `nosniff`.

## Checks Before Handing Over

1. `npm run build` passes, and the log shows `Placeholders marked: 0`.
2. The layout gate of `design-layout-humanizer` passes on every page at 1440, 768 and 390px. Three readings are known and accepted: the closed mobile menu, the hero headline mid-animation, and the two deliberate columns of the statement section.
3. Lighthouse on mobile scores at least 96 in performance and 100 in accessibility, best practices and SEO, with a Cumulative Layout Shift of 0.
4. The network panel shows zero requests to another domain and zero cookies.
5. Every language has been read on the rendered page, not only in the JSON file, and the same figures appear in all four.

## Beyond the Website

For print, social posts and slides, the full palette applies. Intense Cherry marks the one element to act on and covers roughly 10 percent of the surface at most, Rosewood serves large figures and fine rules, and body text stays Black or Blue Slate. The rules above on words, icons, sharp corners, the logo and the absence of placeholders apply unchanged, and any PDF or DOCX also passes the Document Layout Guard.

---

When a new mistake is rejected or a new measure raises the bar, add it here the same day with the reason, so the next page starts from everything the last one learned.
