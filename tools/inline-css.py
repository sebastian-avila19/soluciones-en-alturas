"""Inserta styles.css + overrides.css minificados dentro de index.html (CSS en linea, sin bloqueo de render).
Uso: python tools/inline-css.py   (ejecutar tras editar styles.css u overrides.css)"""
import re
def mini(c):
    c = re.sub(r'/\*.*?\*/', '', c, flags=re.S)
    c = re.sub(r'\s+', ' ', c)
    return re.sub(r'\s*([{};,>])\s*', r'\1', c).replace(';}', '}').strip()
css = mini(open('styles.css', encoding='utf-8').read()) + mini(open('overrides.css', encoding='utf-8').read())
html = open('index.html', encoding='utf-8', newline='').read()
block = '<!-- inline-css:start (generado por tools/inline-css.py; editar styles.css/overrides.css) -->\n    <style>' + css + '</style>\n    <!-- inline-css:end -->'
if 'inline-css:start' in html:
    html = re.sub(r'<!-- inline-css:start.*?inline-css:end -->', lambda m: block, html, flags=re.S)
else:
    html = re.sub(r'[ ]*<link rel="preload" as="style" href="styles.css" />\r?\n[ ]*<link rel="preload" as="style" href="overrides.css" />\r?\n[ ]*<link rel="stylesheet" href="styles.css" />\r?\n[ ]*<link rel="stylesheet" href="overrides.css" />', lambda m: '    ' + block, html)
open('index.html', 'w', encoding='utf-8', newline='').write(html)
print('ok', len(css))
