# Tribea Logo

The Tribea logo has two parts, vectorised from the approved artwork: the wordmark, set in capitals in a bold serif, and the symbol, a round emblem showing a megaphone and sound waves, the voice from the tribune. They are used together in the website header, and the symbol works alone as the favicon and wherever space is square.

The current version is v2, a higher-contrast serif drawing of the same wordmark. v1 is kept for reference only.

| File | Use |
|---|---|
| `Logo_Tribea-Wordmark_v2.svg` | Current. Blue Slate `#4C5F6B`, for white and Alice Blue backgrounds |
| `Logo_Tribea-Wordmark-Light_v2.svg` | Current. Alice Blue `#DCE1E9`, for Slate Night and other dark backgrounds |
| `Logo_Tribea-Wordmark_v1.svg`, `Logo_Tribea-Wordmark-Light_v1.svg` | Superseded first drawing |
| `Logo_Tribea-Mark_v1.svg` | The symbol in Blue Slate, for light backgrounds |
| `Logo_Tribea-Mark-Light_v1.svg` | The symbol in Alice Blue, for dark backgrounds |

On the website the same shape is inlined through `tribea-website/src/components/Logo.astro` and `Mark.astro` with `fill="currentColor"`, so it follows the light and dark tokens. Keep clear space around the logo at least equal to the height of the letter T, never recolour it outside the brand palette, and never place it on Dark Amaranth.
