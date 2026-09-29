# Tribea Website

The public website of Tribea, a political communication agency in Switzerland, in German, French, Italian and English. It serves parties, candidates, committees and administrations, and it is built to prove what the agency promises its clients: nothing loads from third parties, no cookie is set, and no consent banner is needed.

**Before changing anything, read this file, `../docs/BRAND_GUIDELINES.md` and `../docs/GOTCHAS.md`.** Every rule below was decided with the client on 28 September 2026, most of them after a first version got it wrong. Changing one of them needs the client's explicit approval.

---

## Run It

```bash
npm install
npm run preview    # builds for local addresses and serves http://localhost:4321/ (redirects to fr., de., it., en.)
npm run build      # production build: one folder per subdomain in dist/
```

The build runs four steps: it builds WOFF2 fonts from `../fonts` and copies the colour tokens from `../styles` (`scripts/sync-brand.mjs`, needs Python with `fontTools` and `brotli`), builds the site with Astro, marks any unfilled `[PLACEHOLDER]` in visible text (`scripts/mark-placeholders.mjs`, the count must stay at 0), and splits the output into one site per subdomain with its own sitemap (`scripts/split-subdomains.mjs`). Server setup is in `../docs/DEPLOYMENT.md`, which also covers the public preview on GitHub Pages (`TRIBEA_MODE=path`, `TRIBEA_BASE=/tribea`).

| Path | What it holds |
|---|---|
| `src/content/{fr,de,it,en}.json` | All copy, one file per language, identical structure. Bold is written `**…**` |
| `src/i18n.ts` | Page addresses in every language, breadcrumb parents, subdomain logic |
| `src/components/Sections.astro` | Every section type a page is built from |
| `src/components/LanguagePicker.astro`, `Icon.astro`, `Logo.astro`, `Mark.astro` | The language picker, the three drawn icons, the wordmark and the symbol |
| `src/layouts/Base.astro` | Header, footer, hreflang, canonical |
| `src/site.ts` | The only JavaScript: services opening, focus on steps, header compaction |
| `src/styles/site.css` | The design system on top of the tokens |
| `scripts/build-hero.py` | Rebuilds the hero photograph from `assets/hero-source-lucerne.jpg` |

---

## Locked Decisions

### Structure

- **One subdomain per language:** `de.tribea.ch`, `fr.tribea.ch`, `it.tribea.ch`, `en.tribea.ch`, always listed in that order. The bare domain redirects to the browser language, German by default. There is no language chooser page.
- **Navigation:** Services, Méthode, À propos, Contact, then the main button, then the language code at the far right. In the other languages the second item is Arbeitsweise, Metodo and Method.
- **Services** lists Profil, Campagne, Confiance and Secteur public. **Méthode** (`/methode/`) explains how we work (the six steps), the three services, the confidentiality rules of every mandate and the list of published rules; the technology policy, privacy in plain language, the privacy policy and accessibility sit one level below it. The former Politique page was removed on 28 September 2026 and its content moved into Méthode. **Analyses** is reached from the home page and the footer, not the navigation.
- **Every page ends with a real contact form** (name, email, message), never a lone button.

### Look

- **Colours on the website:** Black, White, light grey `#F3F4F5` and Blue Slate `#4C5F6B`. Nothing else. Intense Cherry and Rosewood are never used on the website.
- **Header and footer are Black** with the wordmark in White. Every other section is White or light grey.
- **Logo:** wordmark only in the header and footer. The round symbol is the favicon, White on a Black square.
- **Fonts:** Newsreader 500 for headings, Lato for everything else.
- **Text:** headings Black; all body text Lato 17px on 1.65 in Blue Slate; only the hero introduction is larger; bold passages in Black.
- **Hero (home page):** full height, text left and centred vertically, headline on two lines in every language ("Une tribune améliorée pour vos idées" and its three localizations, since 29 September 2026). Beside the text, built like the inner page headers only larger, a monochrome watercolour of a candidate in a dark blazer and tie in a lively, friendly exchange with residents on a Swiss market square, painted with an irregular wash border rather than a straight edge, at full opacity, in the flow of the page (7 of 12 columns on desktop, below the text on phones) so the untouched paper of the painting sits under the headline, no gradient, no fade. The Lucerne photograph was retired on 29 September 2026; its files remain in `public/images` until removed.
- **Header illustrations (every content page):** a loose monochrome watercolour, indigo washes on white paper with a few ink lines, recoloured to a Blue Slate duotone by `scripts/build-illustrations.py` from `assets/illustrations/{page}-source.png`, shown beside the heading at full opacity, no gradient, smaller than the hero one, below the text on phones. The first line-drawing set was rejected the same day as too plain and is kept in `assets/illustrations/line-v1/` for reference only. Each scene is modern, set in present-day Switzerland, and shows the page's subject through the agency's values: people talking, documents checked before use, data handed back, no flags, no deepfake imagery, no crowd. The legal notice, privacy policy, accessibility statement and articles have none. The list of pages with a drawing is `ART` in `src/components/Sections.astro`.
- **Sharp corners everywhere.** No rounded buttons, boxes or fields.
- **Buttons:** the primary is Black and a White fill wipes in from the left on hover; the secondary is White with no outline and a Black fill wipes in on hover. Either one turns Blue Slate when clicked. Both lean up to 6px towards the pointer. The header button keeps a Blue Slate hover because it sits on Black.
- **Pointer ring:** a thin Cool Steel ring trails the native cursor, widens in Blue Slate over links and fields, and steps aside over buttons. Fine pointers only, off for reduced motion.
- **Language picker:** the code only ("FR"), no frame; a straight Black panel drops down, opening to the right, away from the button.
- **Forms:** one 1px Black line per field, never a box, never a colour or weight change; square choice boxes; the list of topics ends with « Autre ».
- **Lines:** separators only between items, never above the first or below the last. Rows in two columns share their lines.
- **The three guarantees** follow one after another, each with its drawn icon, title and text, a line between each. The icon's drawn top aligns with the title's cap height.
- **Icons:** custom, 48 unit grid, 1.25 stroke, the real object (sealed envelope, classical column, document handed back).
- **Step numbers:** small (16px) Newsreader in Blue Slate, beside each step title.

### Behaviour

- Services open one at a time; the open one grows in Black, the others turn Blue Slate.
- Clicking a method step brings it forward and sets the others back in Blue Slate until it is clicked again, Escape is pressed or the visitor clicks elsewhere.
- The header compacts on scroll. The hero headline rises word by word on load.
- No animation on scroll, no carousel, no auto-rotating content. Everything stops for reduced motion.

### Words

- **Tangible sentences only.** Name what the reader can point to. Every language went through the `communication-swiss-localization` skill, which now includes a tangibility rule written after this project.
- **Neutral and precise:** no promise of winning, no unsourced claim, no contrast framing, no em dash, formal address (vous, Sie, lei).
- **Languages are not listed as a selling point.** The site speaks of local and multilingual work from the commune to the Confederation.
- **Response time is 3 days** in every language.
- **No placeholder.** Missing facts are written around, never invented. The legal notice currently reads "Tribea, Switzerland" and refers to the contact form.

---

## Mistakes Not to Repeat

Each of these shipped in an earlier version on 28 September 2026 and was rejected.

| Rejected | Why | Instead |
|---|---|---|
| Colours invented beyond the palette, dark mode, dark sections | Off-brand, heavy | The four website colours, two dark bands only |
| Cherry or Rosewood on step numbers, buttons or rules | The website is Black, White, grey, Blue Slate | Blue Slate |
| A language chooser page at `/`, then boxed language pills, then arrows | Friction, visual noise | Subdomain redirect, code-only picker, straight panel |
| Eyebrows, accent bars under headings, the line under the hero buttons | Generated-design tells | Headings carry their own weight |
| Flat stock-style scene illustrations, bento grids, stats bands, watermark symbol, frame rails | Template look | Since 29 September 2026, one commissioned-style line drawing per page header in Blue Slate, drawn icons, typographic sections |
| Scroll-triggered fades on every section, the rotating guarantees carousel | Motion without a reason | Interaction-only motion |
| The same photograph in every page header | Repetitive | One drawing per page, each showing that page's subject |
| Boxed form fields, round radios, a hint under the message field | Heavy, cluttered | Single-line fields, square choices |
| Lines above the first and below the last item | Frames a list that needs no frame | Lines between items only |
| Mixed paragraph sizes (15, 16, 18px) and mixed colours | Looked unfinished | One body style |
| "Des canaux qui vous appartiennent", "gagner la votation", "bilan de confiance", listing three languages | Abstract, promissory or false read literally | Concrete wording |
| Placeholders such as `[NAME]` or `[DATE]` in visible text | Unfinished | Sentences that need no missing fact |
| Kameron, Work Sans, Quattrocento Sans, Schibsted Grotesk | Replaced by the client | Newsreader and Lato |

---

## Quality Bar

Measured on 28 September 2026: Lighthouse performance 96 to 99, accessibility 100, best practices 100, SEO 100; zero third-party requests; zero cookies. The layout gate of `design-layout-humanizer` passes on all pages at 1440, 768 and 390px, except three known readings on elements that are hidden or animating when measured (the closed mobile menu, the hero headline mid-animation, the two deliberate columns of the statement section).

## Before Launch

- Add the company name and postal address to the legal notice, which Swiss law requires.
- Connect `/api/contact` and `/api/newsletter` to a server-side handler hosted in Switzerland, with double opt-in for the newsletter.
- Have a native writer in each region read the copy, and a lawyer read the privacy policy, the legal notice and the technology policy.
- Commission the external accessibility audit named on the accessibility page.
