"""Genera los recursos derivados del sitio (miniaturas, hero móvil, íconos y og-image).

Uso: python tools/build-assets.py
Requiere Pillow. Las fotos originales viven en assets/galeria/.
"""
import os
import re
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

# --- Miniaturas de galería (400 px de ancho) para todas las fotos que usa script.js ---
js = open("script.js", encoding="utf8").read()
paths = set()
for const, folder in (("FACHADAS", "fachadas-pintura"), ("ELECTRICOS", "electricos")):
    for name in re.findall(const + r' \+ "([^"]+\.webp)"', js):
        paths.add(f"assets/galeria/{folder}/{name}")

os.makedirs("assets/galeria/thumbs", exist_ok=True)
for p in sorted(paths):
    im = Image.open(p).convert("RGB")
    w = 400
    h = round(im.height * w / im.width)
    out = "assets/galeria/thumbs/" + os.path.basename(p)
    im.resize((w, h), Image.LANCZOS).save(out, "WEBP", quality=72, method=6)
print("miniaturas:", len(paths))

# --- Hero: versión móvil liviana (640x480) desde la foto del hero ---
HERO = "assets/galeria/fachadas-pintura/fachada-004.webp"
hero = Image.open(HERO).convert("RGB")
hero.resize((640, 480), Image.LANCZOS).save(
    "assets/galeria/fachadas-pintura/fachada-004-mobile.webp", "WEBP", quality=70, method=6
)

# --- Íconos / favicon: círculo del logo (sin texto) sobre blanco ---
logo = Image.open("assets/logo.png").convert("RGBA")
badge = logo.crop((0, 0, logo.width, int(logo.height * 0.88)))


def icon(size, bg=(255, 255, 255, 255), pad=0.08):
    canvas = Image.new("RGBA", (size, size), bg)
    inner = int(size * (1 - 2 * pad))
    b = badge.copy()
    b.thumbnail((inner, inner), Image.LANCZOS)
    canvas.paste(b, ((size - b.width) // 2, (size - b.height) // 2), b)
    return canvas.convert("RGB")


for size, name in ((32, "favicon-32.png"), (180, "apple-touch-icon.png"), (192, "icon-192.png"), (512, "icon-512.png")):
    icon(size).save("assets/" + name, optimize=True)

# --- og-image 1200x630 ---
W, H = 1200, 630
bg = hero.copy().resize((W, int(W * hero.height / hero.width)), Image.LANCZOS)
bg = bg.crop((0, (bg.height - H) // 2, W, (bg.height - H) // 2 + H)).filter(ImageFilter.GaussianBlur(2))
overlay = Image.new("RGB", (W, H), (10, 11, 13))
bg = Image.blend(bg, overlay, 0.82)
d = ImageDraw.Draw(bg)

tile = Image.new("RGBA", (300, 300), (255, 255, 255, 255))
mask = Image.new("L", (300, 300), 0)
ImageDraw.Draw(mask).rounded_rectangle((0, 0, 299, 299), 36, fill=255)
lg = Image.open("assets/logo-transparent.webp").convert("RGBA")
lg.thumbnail((260, 260), Image.LANCZOS)
tile.paste(lg, ((300 - lg.width) // 2, (300 - lg.height) // 2), lg)
bg.paste(tile.convert("RGB"), (70, 165), mask)


def font(size, bold=True):
    for f in ("C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf", "C:/Windows/Fonts/arialbd.ttf"):
        if os.path.exists(f):
            return ImageFont.truetype(f, size)
    return ImageFont.load_default()


x = 430
d.rectangle((x, 150, x + 90, 156), fill=(239, 68, 68))
for i, line in enumerate(("Fachadas, cúpulas y", "decoración navideña", "en Bogotá")):
    d.text((x, 180 + i * 78), line, font=font(66), fill=(255, 255, 255))
d.text((x, 432), "Acceso por cuerdas y protocolos de seguridad", font=font(30, False), fill=(207, 211, 216))
d.text((x, 500), "S.E.A. · Soluciones en Alturas", font=font(34), fill=(239, 68, 68))
bg.save("assets/og-image.jpg", quality=88, optimize=True)
print("ok")
