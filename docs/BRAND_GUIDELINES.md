# Tribea Brand Guidelines

This file governs every branded Tribea output: the website, content, social posts, slides, designs, apps, invoices and any document a client, a journalist or a partner will see. Read it before building or reworking any of them. If a typeface, a colour or a pattern is not listed here, it does not belong in a Tribea artifact.

The implementation files sit next to it:

- `fonts/` holds the two approved typefaces and their licences, nothing else.
- `styles/fonts.css` declares the `@font-face` rules and the `--font-*` variables.
- `styles/tokens.css` declares the colour variables.
- `logo/` holds the wordmark and the symbol as SVG.
- `docs/GOTCHAS.md` lists what must not be repeated and the checks every new page or artifact passes.
- `tribea-website/README.md` records every decision locked for the website and the mistakes not to repeat.

In code, import both stylesheets and use the variables rather than hard-coded font names or hex values.

Last revised on 28 September 2026, after the website build.

---

## Logo

The logo has two parts, both in `logo/`: the wordmark, "TRIBEA" set in capitals in a bold serif (`Logo_Tribea-Wordmark_v2.svg`), and the symbol, a round emblem showing a megaphone and sound waves (`Logo_Tribea-Mark_v1.svg`).

1. **The wordmark stands alone** in the website header and footer. The symbol is not placed beside it.
2. **The symbol is used on its own** as the favicon, app icon and social avatar: White on a Black square.
3. **Colour:** White on the Black header and footer, Black on light backgrounds. On the website both are drawn with `currentColor`.
4. **Never** recolour the logo outside the palette, add an effect, place it on a photograph without a solid ground, or crowd it: keep clear space at least equal to the height of the letter T.

---

## Typography

Tribea uses two typefaces. Newsreader, a serif drawn by Production Type for reading on screen, gives headings the tone of a well-edited newspaper. Lato, a humanist sans, carries body text, navigation, buttons and forms with the neutral clarity of software.

| Role | Typeface | Weight | Variable | File |
|---|---|---|---|---|
| Headings (H1 to H3), service names, guarantee titles, step numbers | **Newsreader** | 500 (web build instanced from 450 to 560, optical size fixed at 36) | `--font-heading` | `fonts/Newsreader/Newsreader[opsz,wght].ttf` |
| Body, intros, labels, buttons, navigation, forms | **Lato** | 400 for text, 600 for labels, buttons and navigation, 700 for bold passages | `--font-body` | `fonts/Lato/` |

Both are under the SIL Open Font License, with `OFL.txt` in each folder. Kameron, Schibsted Grotesk, Work Sans and Quattrocento Sans were used and retired on 28 September 2026; they are archived in `99_Archive/Tribea/fonts/` and must not come back.

### Type Scale (website)

| Element | Size | Line height | Colour |
|---|---|---|---|
| Hero H1 | 28 to 84px, fluid | 1.06 | Black |
| Page H1 | 24 to 48px | 1.1 | Black |
| H2 (every section heading) | 24 to 36px | 1.2 | Black |
| Statement H2 | 30 to 61px | 1.08 | Black |
| H3, service names, guarantee titles | 20 to 30px | 1.2 to 1.3 | Black |
| Hero introduction (the one larger paragraph) | 18 to 21px | 1.55 | Blue Slate |
| **All other text**: intros, paragraphs, lists, table cells, notes, dates | **17px** | **1.65** | **Blue Slate** |
| Bold passages | 17px, weight 700 | 1.65 | Black |
| Buttons, navigation, labels | 15 to 16px, weight 600 | 1.0 to 1.2 | per component |

### Typography Rules

1. **One body style everywhere.** Every paragraph, list item, note and date is Lato 17px on 1.65 in Blue Slate. Only the hero introduction is larger.
2. **Headings are Black, text is Blue Slate.** Hierarchy comes from typeface, size and colour together.
3. **Bold marks the one idea per block the reader must keep**, never a whole sentence stack. Write it in the content as `**…**`.
4. **Measure** stays between 60 and 75 characters for body text.
5. **Sentence case, no full stop on a heading,** no heading under eight words on three lines, no single word alone on the last line of a paragraph.
6. **Tracking tightens only on large headings** (above 900px viewport); small headings keep 0.
7. **Fallbacks:** Georgia for headings, Arial for everything else.

---

## Colour

### The Brand Palette

| Name | Hex | RGB | CMYK | Use |
|---|---|---|---|---|
| Black | `#000000` | 0, 0, 0 | 0, 0, 0, 100 | Headings, bold text, primary buttons, header and footer |
| White | `#FFFFFF` | 255, 255, 255 | 0, 0, 0, 0 | Page background, text and logo on Black |
| Blue Slate | `#4C5F6B` | 76, 95, 107 | 29, 11, 0, 58 | Body text, step numbers, every hover state, the duotone photography |
| Light grey | `#F3F4F5` | Blue Slate at 6 percent on White | | Alternate sections |
| Cool Steel | `#94A0AA` | 148, 160, 170 | 13, 6, 0, 33 | Dividers and hairlines only, secondary text on Black |
| Intense Cherry | `#AD343E` | 173, 52, 62 | 0, 70, 64, 32 | Print, social media, presentations only |
| Rosewood | `#A76571` | 167, 101, 113 | 0, 40, 32, 35 | Print, social media, presentations only |

### The Website Interface: Black, White, Light Grey and Blue Slate

The website uses four colours and nothing else. **Intense Cherry and Rosewood never appear on the website**, not in a button, a number, a rule or a hover. They are kept for print and social material, where colour carries the brand without competing with an interface.

| Token | Value | Use |
|---|---|---|
| `--bg` | White | Page background |
| `--surface` | Light grey `#F3F4F5` | Alternate sections |
| `--text` | Black | Headings, bold passages, form text |
| `--text-muted` | Blue Slate | All body text |
| `--accent` | Black | Primary button fill, focus outline |
| `--accent-hover` | Blue Slate | Hover of buttons, links, service names |
| `--on-accent` | White | Text on a Black button |
| `--border` | Cool Steel | Dividers, never text |

### Contrast, Checked (WCAG 2.1)

| Text on background | Ratio | Result |
|---|---|---|
| Black on White | 21:1 | AAA |
| White on Black | 21:1 | AAA |
| Cool Steel on Black | 7.87:1 | AAA |
| Blue Slate on White | 6.65:1 | AA |
| White on Blue Slate | 6.65:1 | AA |
| Blue Slate on light grey | 6.04:1 | AA |

Ruled out for text: Cool Steel on White (2.67:1).

### Colour Rules

1. **Two dark surfaces only:** the header and the footer, in Black. Every other section is White or light grey, never a dark or coloured band.
2. **Photography is a Blue Slate duotone** under a 70 percent White layer, on the home page hero only.
3. **No colour outside this file.** Status colours (success, warning, error) must be added here, contrast-checked, before any use.
4. **Print and social:** Intense Cherry marks the one element to act on (roughly 10 percent of the surface at most); Rosewood serves large figures and fine rules; body text stays Black or Blue Slate.

### Formats for Tools

```json
{"Black":"000000","White":"ffffff","Blue Slate":"4c5f6b","Light grey":"f3f4f5","Cool Steel":"94a0aa","Intense Cherry":"ad343e","Rosewood":"a76571"}
```

---

## Components (website)

1. **Buttons:** sharp corners, 54px high (44px in the header). Primary is Black with White text, and a White fill wipes in from the left on hover. Secondary is White with no outline, and a Black fill wipes in on hover. Any button turns Blue Slate when pressed. The header button is White on Black with a Blue Slate hover.
2. **Links:** Blue Slate with a Cool Steel underline that tightens and darkens on hover.
3. **Language picker:** the current language code only (for example "FR"), no frame, underlined on hover. On click, a straight Black panel drops down, opening to the right of the code and away from the call to action, listing the four languages by their own name.
4. **Forms:** no boxes. Each field is a single 1px Black line that never changes weight or colour; the label turns Black with a small square beside it when the field is active. Choices are small squares that fill with Black.
5. **Lists and stacks:** separator lines only between items, never above the first or below the last.
6. **Icons:** drawn for Tribea on a 48 unit grid with a 1.25 stroke, showing the real object (sealed envelope, classical column, document handed back). Never a generic padlock, shield, rocket or sparkle. The drawn top of an icon aligns with the cap height of the text beside it.
7. **Motion:** only on load of the home hero (words rise in turn), on interaction (buttons, picker, services opening, focused step) and never on scroll. Everything stops for reduced motion.

---

## Words

1. **Tangible over abstract.** Every sentence names what the reader can point to. "Des canaux qui vous appartiennent" is banned; "un site, une newsletter et des listes de contacts que vous gérez vous-même" is right.
2. **Neutral, precise, calm.** No promise of an outcome (no "win the vote"), no unsourced claim about voters or competitors, no contrast framing, no em dash.
3. **Languages are not a selling point.** Say local and multilingual work, from the commune to the Confederation, instead of listing French, German and Italian.
4. **No placeholder ever ships.** If a fact is missing, rewrite the sentence so it does not need it.
5. **Localization** runs through the `communication-swiss-localization` skill and its tangibility rule.
