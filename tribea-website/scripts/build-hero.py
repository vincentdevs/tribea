"""Build the hero photographs from the approved source picture.

The photo is turned into a Blue Slate to white duotone and shown as its own band
below the hero text, fading into the page background along its top edge.
Source: Diana Shturm on Unsplash, Lucerne from the lake (credited in the legal notice).
"""
import sys
from pathlib import Path
import numpy as np
from PIL import Image, ImageEnhance

SRC = Path(sys.argv[1] if len(sys.argv) > 1 else str(Path(__file__).resolve().parents[1] / "assets" / "hero-source-lucerne.jpg"))
OUT = Path(__file__).resolve().parents[1] / "public" / "images"
SLATE = np.array([76, 95, 107], float)   # Blue Slate
WHITE = np.array([255, 255, 255], float)
PAGE = WHITE                             # --bg

def duotone(img, solid, end, amax=0.96):
    g = 0.18 + 0.82 * (np.asarray(img, float) / 255.0)
    rgb = SLATE * (1 - g[..., None]) + WHITE * g[..., None]
    y = np.linspace(0, 1, g.shape[0])
    if end <= solid:
        a = np.zeros_like(y)
    else:
        a = np.where(y < solid, amax, np.clip(amax * (end - y) / (end - solid), 0, amax))
    return Image.fromarray((rgb * (1 - a[:, None, None]) + PAGE * a[:, None, None]).clip(0, 255).astype("uint8"))

src = ImageEnhance.Contrast(Image.open(SRC).convert("L")).enhance(1.06)
W, H = src.size
OUT.mkdir(parents=True, exist_ok=True)

x0 = int(0.22 * W); cw = W - x0; ch = int(cw / 2.0); y0 = max(0, int(0.70 * H) - ch)
wide = src.crop((x0, y0, x0 + cw, y0 + ch))
for w in (2400, 1600, 1100):
    duotone(wide.resize((w, round(ch * w / cw)), Image.LANCZOS), 0.0, 0.30).save(OUT / f"hero-wide-{w}.webp", "WEBP", quality=72, method=6)

x0 = int(0.40 * W); cw = int(0.60 * W); ch = int(cw * 0.66); y0 = max(0, int(0.66 * H) - ch)
narrow = src.crop((x0, y0, x0 + cw, y0 + ch))
for w in (900, 600):
    duotone(narrow.resize((w, round(ch * w / cw)), Image.LANCZOS), 0.0, 0.26).save(OUT / f"hero-narrow-{w}.webp", "WEBP", quality=70, method=6)

print("Hero images written to", OUT)

