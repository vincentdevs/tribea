"""Turn the page header illustrations into Blue Slate duotones on white.

Each source in assets/illustrations/{page}-source.* is a two-tone blue line
illustration. It is mapped to a Blue Slate to White ramp so the drawing uses
only brand colour, the paper stays pure white, and the top edge fades into the
page so the text above it sits on white. Writes WebP into public/images.
"""
import sys
from pathlib import Path
import numpy as np
from PIL import Image, ImageEnhance

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "assets" / "illustrations"
OUT = ROOT / "public" / "images"
SLATE = np.array([76, 95, 107], float)
WHITE = np.array([255, 255, 255], float)

def duotone(img, fade_to=0.0):
    g = np.asarray(img, float) / 255.0
    # push the paper to pure white and keep the line at full Blue Slate
    g = np.clip((g - 0.06) / 0.92, 0, 1)
    rgb = SLATE * (1 - g[..., None]) + WHITE * g[..., None]
    if fade_to > 0:
        y = np.linspace(0, 1, g.shape[0])
        a = np.clip((fade_to - y) / fade_to, 0, 1)[:, None, None]
        rgb = rgb * (1 - a) + WHITE * a
    return Image.fromarray(rgb.clip(0, 255).astype("uint8"))

pages = sys.argv[1:] or sorted(p.name.split("-source")[0] for p in SRC.glob("*-source.*"))
for page in pages:
    src = next(SRC.glob(f"{page}-source.*"))
    im = ImageEnhance.Contrast(Image.open(src).convert("L")).enhance(1.05)
    W, H = im.size
    # wide: 2:1 crop from the bottom; narrow: 3:2 crop from the centre-bottom
    ch = W // 2
    wide = im.crop((0, H - ch, W, H)) if H >= ch else im
    for w in (2400, 1600, 1100):
        duotone(wide.resize((w, round(wide.height * w / wide.width)), Image.LANCZOS), 0.0).save(OUT / f"art-{page}-wide-{w}.webp", "WEBP", quality=74, method=6)
    cw = int(H * 1.5); x0 = (W - cw) // 2
    narrow = im.crop((x0, 0, x0 + cw, H))
    for w in (900, 600):
        duotone(narrow.resize((w, round(narrow.height * w / narrow.width)), Image.LANCZOS), 0.0).save(OUT / f"art-{page}-narrow-{w}.webp", "WEBP", quality=72, method=6)
    print(page, "written")
