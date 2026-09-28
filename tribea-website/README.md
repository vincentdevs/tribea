# Tribea Website

The public website of Tribea, a political communication agency in Switzerland, in French, German, Italian and English. It serves parties, candidates, committees and administrations, and it is built to prove what the agency promises its clients: nothing loads from third parties, no cookie is set, and no consent banner is needed.

**Before changing anything, read this file and `../docs/BRAND_GUIDELINES.md`.** Every rule below was decided with the client on 28 September 2026, most of them after a first version got it wrong. Changing one of them needs the client's explicit approval.

---

## Run It

```bash
npm install
npm run preview    # builds for local addresses and serves http://localhost:4321/ (redirects to fr., de., it., en.)
npm run build      # production build: one folder per subdomain in dist/
```

The build runs four steps: it builds WOFF2 fonts from `../fonts` and copies the colour tokens from `../styles` (`scripts/sync-brand.mjs`, needs Python with `fontTools` and `brotli`), builds the site with Astro, marks any unfilled `[PLACEHOLDER]` in visible text (`scripts/mark-placeholders.mjs`, the count must stay at 0), and splits the output into one site per subdomain with its own sitemap (`scripts/split-subdomains.mjs`). Server setup is in `../docs/DEPLOYMENT.md`.

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

- **One subdomain per language:** `fr.tribea.ch`, `de.tribea.ch`, `it.tribea.ch`, `en.tribea.ch`. The bare domain redirects to the browser language, French by default. There is no language chooser page.
- **Navigation:** Services, Politique (singular), À propos, Contact, then the main button, then the language code at the far right.
- **Services** lists Profil, Campagne, Confiance and Secteur public. **Politique** gathers the method, the technology policy, privacy in plain language, the privacy policy, accessibility and the conflicts policy. **Analyses** is reached from the home page and the footer, not the navigation.
- **Every page ends with a real contact form** (name, email, message), never a lone button.

### Look

- **Colours on the website:** Black, White, light grey `#F3F4F5` and Blue Slate `#4C5F6B`. Nothing else. Intense Cherry and Rosewood are never used on the website.
- **Header and footer are Black** with the wordmark in White. Every other section is White or light grey.
- **Logo:** wordmark only in the header and footer. The round symbol is the favicon, White on a Black square.
- **Fonts:** Newsreader 500 for headings, Lato for everything else.
- **Text:** headings Black; all body text Lato 17px on 1.65 in Blue Slate; only the hero introduction is larger; bold passages in Black.
- **Hero (home page only):** full height, text left and centred vertically, headline on two lines in every language, the Lucerne photograph (Diana Shturm, Unsplash, credited in the legal notice) as a Blue Slate duotone at 85 percent opacity under a 70 percent White layer. Inner pages have no photograph.
- **Sharp corners everywhere.** No rounded buttons, boxes or fields.
- **Buttons:** Black or White with a Black border; on hover a Blue Slate fill slides in from the left.
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
| Hand-drawn scene illustrations, bento grids, stats bands, watermark symbol, frame rails | Template look | Photography on the home hero, drawn icons, typographic sections |
| Scroll-triggered fades on every section, the rotating guarantees carousel | Motion without a reason | Interaction-only motion |
| Photograph in every page header | Repetitive | Home hero only |
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
