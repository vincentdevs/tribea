"""Build web fonts from the approved brand files in /fonts.

Subsets each face to the characters French, German, Italian and English need,
trims each variable face to the weights the site uses, and writes WOFF2 into public/fonts.
The TTF files in /fonts stay the source of truth.
"""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.subset import Options, Subsetter
from fontTools.varLib.instancer import instantiateVariableFont

ROOT = Path(__file__).resolve().parents[2]
SRC = ROOT / "fonts"
OUT = ROOT / "tribea-website" / "public" / "fonts"
OUT.mkdir(parents=True, exist_ok=True)

# Basic Latin, Latin-1, Latin Extended-A, typographic punctuation, euro, arrows.
UNICODES = (
    list(range(0x20, 0x7F))
    + list(range(0xA0, 0x180))
    + [0x2013, 0x2014, 0x2018, 0x2019, 0x201A, 0x201C, 0x201D, 0x201E, 0x2022,
       0x2026, 0x2039, 0x203A, 0x20AC, 0x2122, 0x2192, 0x202F]
)

FACES = [
    ("Newsreader/Newsreader[opsz,wght].ttf", "newsreader.woff2", {"wght": (450, 560), "opsz": 36}),
    ("Lato/Lato-Regular.ttf", "lato-regular.woff2", None),
    ("Lato/Lato-Italic.ttf", "lato-italic.woff2", None),
    ("Lato/Lato-SemiBold.ttf", "lato-semibold.woff2", None),
    ("Lato/Lato-Bold.ttf", "lato-bold.woff2", None),
]

for src, out, weights in FACES:
    font = TTFont(SRC / src)
    if weights:
        font = instantiateVariableFont(font, weights)
    options = Options()
    options.flavor = "woff2"
    options.layout_features = ["kern", "liga", "calt", "ccmp", "locl", "mark", "mkmk"]
    options.name_IDs = ["*"]
    subsetter = Subsetter(options)
    subsetter.populate(unicodes=UNICODES)
    subsetter.subset(font)
    font.flavor = "woff2"
    font.save(OUT / out)
    print(f"{out}: {(OUT / out).stat().st_size // 1024} KB")
