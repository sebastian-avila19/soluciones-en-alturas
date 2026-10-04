import glob, os, re
from PIL import Image
SRC = r'C:\Users\Janus\.copilot\workspaces\b0ca1fa6-3d3d-416d-9711-6c6e8e7685dd\attachments'
OUT = 'assets/navidad'
os.makedirs(OUT, exist_ok=True)
items = [
 ('WhatsApp Image 2026-03-18 at 9.53.34 PM (7).jpeg', 'centro-comercial-noche', 'Fachada de centro comercial', 'Fachada y entrada de un centro comercial iluminadas con cortinas de luces cálidas de noche'),
 ('20251008_173211.jpg', 'marquesina-luces', 'Marquesina iluminada', 'Marquesina de entrada de un centro comercial decorada con luces tipo cascada mientras un operario trabaja en escalera'),
 ('20251008_173224.jpg', 'fachada-local-luces', 'Fachada comercial', 'Frente de un local comercial con filas de luces navideñas en los bordes y la fachada'),
 ('20251008_173247.jpg', 'fachada-plaza', 'Fachada de plaza comercial', 'Fachada de una plaza comercial decorada con luces cálidas sobre los accesos'),
 ('IMG_20181120_215353.jpg', 'centro-comercial-fachada', 'Centro comercial iluminado', 'Fachada de un centro comercial con luces navideñas sobre la marquesina y el borde superior'),
 ('IMG_20181121_235913.jpg', 'arbol-espiral-regalos', 'Escenografía navideña', 'Escenografía con árbol espiral de esferas doradas, regalos gigantes y personajes en un centro comercial'),
 ('IMG_20181122_070818.jpg', 'luces-colgantes-atrio', 'Luces colgantes en atrio', 'Cortinas de luces y estrellas luminosas colgando en el atrio de un centro comercial'),
 ('IMG_20181123_070849.jpg', 'figura-gimnasta', 'Decoración en atrio', 'Atrio de centro comercial con cortinas de luces, copos luminosos y una figura gigante suspendida'),
 ('20240114_013829.jpg', 'arbol-estructura', 'Estructura de árbol', 'Operario en plataforma elevadora armando la estructura metálica de un árbol navideño gigante de noche'),
 ('20220109_203902.jpg', 'arbol-rojo-interior', 'Árbol navideño monumental', 'Árbol navideño gigante con flores rojas, luces y balcones decorativos en el interior de un centro comercial'),
 ('20231111_132407.jpg', 'oso-biplano', 'Escenografía infantil', 'Oso de peluche gigante en una caja roja con avión decorativo y dos árboles nevados'),
 ('20231111_132248.jpg', 'oso-baston', 'Escenografía de juguetes', 'Escenografía navideña con oso gigante, bastón de caramelo, muñecos de nieve y árbol nevado'),
 ('20241109_050609.jpg', 'edificio-cortinas', 'Fachada con cortinas de luces', 'Edificio comercial de noche con tres grandes cortinas de luces verticales y luces en el borde superior'),
 ('20221010_053052.jpg', 'fachada-curva', 'Fachada curva iluminada', 'Fachada curva de un edificio con cortina de luces y perfiles luminosos alrededor de las ventanas'),
 ('20231111_130245.jpg', 'atrio-arco', 'Zona navideña en atrio', 'Atrio de centro comercial con arco decorativo, árboles nevados y gran árbol central'),
 ('20221010_053439.jpg', 'edificio-atardecer', 'Edificio al atardecer', 'Edificio curvo al atardecer decorado con luces tipo cascada en los bordes y la fachada'),
]
files = {os.path.basename(f)[37:]: f for f in glob.glob(SRC + '/*')}
rows = []
for name, slug, title, alt in items:
    im = Image.open(files[name]).convert('RGB')
    for suffix, side, q in (('', 1200, 78), ('-sm', 480, 72)):
        c = im.copy(); c.thumbnail((side, side)); c.save(f'{OUT}/{slug}{suffix}.webp', quality=q, method=6)
    w, h = Image.open(f'{OUT}/{slug}-sm.webp').size
    rows.append((slug, title, alt, w, h))
html = ''
for slug, title, alt, w, h in rows:
    html += f'          <article class="holiday-card">\n            <div class="media-frame"><img src="{OUT}/{slug}-sm.webp" srcset="{OUT}/{slug}-sm.webp 480w, {OUT}/{slug}.webp 1200w" sizes="(min-width:1024px) 25vw,(min-width:600px) 50vw,100vw" alt="{alt}" loading="lazy" decoding="async" width="{w}" height="{h}" /></div>\n            <h3>{title}</h3>\n          </article>\n'
p = 'index.html'
s = open(p, encoding='utf-8', newline='').read().replace('\r\n', '\n')
a = s.index('<div class="container holiday-gallery">') + len('<div class="container holiday-gallery">\n')
b = s.index('        </div>\n      </section>', a)
s = s[:a] + html + s[b:]
s = re.sub(r'<!-- NAVIDAD\. FOTOS reales.*?-->', '<!-- NAVIDAD. FOTOS reales en assets/navidad/ (WebP: -sm 480 px y completa 1200 px). Para añadir otra, duplicar un <article class="holiday-card">. -->', s, flags=re.S)
open(p, 'w', encoding='utf-8', newline='').write(s)
print(len(rows))
