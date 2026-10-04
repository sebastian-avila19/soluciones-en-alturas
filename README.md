# S.E.A. · Soluciones en Alturas

Landing page responsive para Soluciones en Alturas, construida con HTML, CSS y JavaScript vanilla para mantenerla rápida, accesible y fácil de desplegar en cualquier hosting estático.

## Vista local

Desde la raíz del proyecto:

```bash
python -m http.server 4173
```

Después abre <http://localhost:4173>.

## Estructura

- `index.html`: contenido semántico, navegación y secciones de la landing.
- `styles.css`: identidad visual, layout responsive y estados de accesibilidad.
- `script.js`: menú móvil y comportamiento del encabezado.
- `hologram-three.js`: visor Three.js del holograma humano cargado desde `assets/models/human.glb`, con materiales separados para superficie interior oscura, contorno Fresnel y edges cian tenues, bloom reducido, partículas, binarios, rotación automática y OrbitControls. Si el modelo no está disponible, muestra un placeholder discreto.
- `assets/models/human.glb`: modelo humano GLB utilizado por el visor; mientras no exista, la sección muestra únicamente el placeholder “Modelo holográfico pendiente”.
- `assets/logo.png`: logo oficial de S.E.A.
- `assets/trabajos/`: fotografías de operaciones y trabajos en alturas tomadas de la página temporal de la empresa.
- `assets/proyectos/`: imágenes aportadas para mostrar infraestructura, fachadas, iluminación y trabajos en altura.
- `assets/galeria/`: versiones WebP optimizadas de las carpetas de trabajos entregadas.
- `assets/galeria-manifest.json`: catálogo sectorizado usado por la galería interactiva.

## Versión empresarial: cómo probar y qué completar

**Probar en local:** `python -m http.server 4173` y abrir http://127.0.0.1:4173/

**Pendientes `[COMPLETAR]`:** endpoint de Formspree (`data-endpoint` del formulario) · ID de GA4 (`GA4_ID` en `script.js`) · entidad certificadora, norma, ARL/póliza y condiciones de pago (sección «Cómo trabajamos» y FAQ) · casos de estudio, cifras (`#cifras`) y testimonios (`#testimonios`, ocultos con `hidden`) · NIT, dirección y fecha en `privacidad.html`.

**Fotos reales a subir (WebP):** hero 1920×1080 (`overrides.css`, `.hero-photo`), 4 fotos de servicios 800×600 (tarjetas en `#servicios`), galería de Navidad y antes/después de casos. Cada espacio tiene un comentario HTML indicando qué foto va.

**Dominio propio:** cambiar canonical, og:url, og:image, JSON-LD, `sitemap.xml` y `robots.txt`.