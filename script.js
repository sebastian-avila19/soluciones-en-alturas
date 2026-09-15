const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");

window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 20);
});

menuToggle?.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

mainNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const galleryGrid = document.querySelector("[data-gallery-grid]");
const galleryStatus = document.querySelector("[data-gallery-status]");
const galleryMore = document.querySelector("[data-gallery-more]");
const galleryTabs = document.querySelectorAll("[data-gallery-tab]");
const galleryContext = document.querySelector("[data-gallery-context]");
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxCaption = document.querySelector("[data-lightbox-caption]");
const hologramViewport = document.querySelector("[data-hologram]");
const mannequinStage = document.querySelector("[data-mannequin-stage]");
const hologramFigure = document.querySelector("[data-mannequin]");
const mannequinSprite = document.querySelector("[data-mannequin-sprite]");
let galleryManifest = [];
let activeGallery = "fachadas";
let activeImages = [];
let activeImageIndex = 0;
let visibleImageCount = 6;

if (hologramViewport && hologramFigure && mannequinStage) {
  let rotationY = 0;
  let pointerId = null;
  let startX = 0;
  let userInteracting = false;
  let lastInteraction = 0;

  const updateHologram = () => {
    hologramFigure.style.transform = `rotateY(${rotationY}deg)`;
  };

  const animateHologram = (time) => {
    if (!userInteracting && time - lastInteraction > 1200) {
      rotationY += 0.16;
      updateHologram();
    }

    requestAnimationFrame(animateHologram);
  };
  requestAnimationFrame(animateHologram);

  hologramViewport.addEventListener("pointerdown", (event) => {
    pointerId = event.pointerId;
    userInteracting = true;
    lastInteraction = performance.now();
    startX = event.clientX;
    hologramViewport.setPointerCapture(pointerId);
  });

  hologramViewport.addEventListener("pointermove", (event) => {
    if (pointerId !== event.pointerId) return;
    rotationY += (event.clientX - startX) * 0.45;
    startX = event.clientX;
    updateHologram();
    lastInteraction = performance.now();
  });

  hologramViewport.addEventListener("pointerup", (event) => {
    if (pointerId === event.pointerId) {
      pointerId = null;
      userInteracting = false;
      lastInteraction = performance.now();
    }
  });

  hologramViewport.addEventListener("pointercancel", () => {
    pointerId = null;
    userInteracting = false;
    lastInteraction = performance.now();
  });

  mannequinStage.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    rotationY += event.key === "ArrowRight" ? 12 : -12;
    userInteracting = true;
    lastInteraction = performance.now();
    updateHologram();
  });
  mannequinStage.tabIndex = 0;
}

if (hologramViewport && mannequinSprite) {
  const frameCount = 36;
  let frame = 0;
  let pointerId = null;
  let startX = 0;
  let lastFrameTime = 0;

  const setFrame = (nextFrame) => {
    frame = (nextFrame + frameCount) % frameCount;
    mannequinSprite.src = `assets/proyectos/holograma-frames/frame-${String(frame + 1).padStart(2, "0")}.png`;
  };

  const animateSprite = (time) => {
    if (time - lastFrameTime > 90 && pointerId === null) {
      setFrame(frame + 1);
      lastFrameTime = time;
    }
    requestAnimationFrame(animateSprite);
  };
  requestAnimationFrame(animateSprite);

  hologramViewport.addEventListener("pointerdown", (event) => {
    pointerId = event.pointerId;
    startX = event.clientX;
    hologramViewport.setPointerCapture(pointerId);
  });
  hologramViewport.addEventListener("pointermove", (event) => {
    if (pointerId !== event.pointerId) return;
    const delta = event.clientX - startX;
    if (Math.abs(delta) >= 3) {
      setFrame(frame + Math.round(delta / 7));
      startX = event.clientX;
    }
  });
  hologramViewport.addEventListener("pointerup", () => { pointerId = null; });
  hologramViewport.addEventListener("pointercancel", () => { pointerId = null; });
}

const galleryConfig = {
  fachadas: {
    title: "Limpieza, pintura y mantenimiento de fachadas",
    description: "Intervenciones para conservar la imagen, protección y vida útil de fachadas y estructuras.",
  },
  electricos: {
    title: "Mantenimiento e instalación eléctrica",
    description: "Registro de trabajos de instalación, mantenimiento de plantas eléctricas, reflectores y soluciones de iluminación.",
  },
};

const curatedGalleries = {
  cupulas: [
    { file: "assets/trabajos/trabajo-04.jpeg", alt: "Limpieza e impermeabilización de cúpulas en altura" },
    { file: "assets/proyectos/proyecto-fachada.png", alt: "Limpieza y mantenimiento de superficies de fachada" },
    { file: "assets/trabajos/trabajo-01.jpeg", alt: "Limpieza de vidrios y superficies en altura" },
  ],
  navidenos: [
    { file: "assets/proyectos/proyecto-iluminacion.png", alt: "Diseño e instalación de iluminación decorativa y navideña" },
    { file: "assets/trabajos/trabajo-03.jpeg", alt: "Instalación de iluminación sobre estructura" },
  ],
  vallas: [
    { file: "assets/proyectos/proyecto-estructura.png", alt: "Instalación de vallas y estructuras en altura" },
    { file: "assets/trabajos/trabajo-05.jpeg", alt: "Montaje de estructuras y elementos publicitarios" },
  ],
};

galleryConfig.cupulas = {
  title: "Limpieza de cúpulas y vidrios",
  description: "Trabajos de limpieza e impermeabilización de cúpulas y limpieza de vidrios exteriores e interiores.",
};
galleryConfig.navidenos = {
  title: "Decoraciones e iluminación navideña",
  description: "Una selección de proyectos de iluminación, estructuras decorativas y soluciones LED.",
};
galleryConfig.vallas = {
  title: "Vallas, estructuras y decoraciones",
  description: "Montaje de estructuras en altura, vallas publicitarias, lonas, cajas de luz y elementos decorativos.",
};

const renderGallery = (category, reset = true) => {
  activeGallery = category;
  if (reset) visibleImageCount = 6;
  activeImages = category === "fachadas"
    ? galleryManifest.filter((item) => item.category === "fachadas")
    : category === "electricos"
      ? galleryManifest.filter((item) => item.category === "electricos")
      : curatedGalleries[category] || [];
  if (activeImages.length > 6) {
    const step = Math.max(1, Math.floor(activeImages.length / 6));
    activeImages = [0, 1, 2, 3, 4, 5].map((position) => activeImages[Math.min(position * step, activeImages.length - 1)]);
  }
  const context = galleryConfig[category];
  if (galleryContext && context) {
    galleryContext.innerHTML = `<strong>${context.title}</strong><span>${context.description}</span>`;
  }
  galleryGrid.replaceChildren();
  activeImages.slice(0, visibleImageCount).forEach((item, index) => {
    const figure = document.createElement("figure");
    figure.className = "gallery-tile";
    figure.innerHTML = `<button type="button" aria-label="Ampliar imagen ${index + 1}"><img loading="lazy" src="${item.file}" alt="${item.alt}" /><span>Ampliar ↗</span></button>`;
    figure.querySelector("button").addEventListener("click", () => openLightbox(index));
    galleryGrid.appendChild(figure);
  });
  galleryStatus.textContent = `${activeImages.length} imágenes seleccionadas para esta categoría`;
  galleryMore.hidden = activeImages.length <= visibleImageCount;
};

galleryMore?.addEventListener("click", () => {
  visibleImageCount += 6;
  renderGallery(activeGallery, false);
});

const openLightbox = (index) => {
  activeImageIndex = index;
  const item = activeImages[index];
  if (!item) return;
  lightboxImage.src = item.file;
  lightboxImage.alt = item.alt;
  lightboxCaption.textContent = galleryConfig[activeGallery]?.title || activeGallery;
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");
  document.querySelector("[data-lightbox-close]")?.focus();
};

const closeLightbox = () => {
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");
};

const moveLightbox = (direction) => {
  if (!activeImages.length) return;
  activeImageIndex = (activeImageIndex + direction + activeImages.length) % activeImages.length;
  openLightbox(activeImageIndex);
};

document.querySelector("[data-quote-form]")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const message = `Hola S.E.A., soy ${form.get("name")}. Quiero cotizar: ${form.get("service")}. Detalles: ${form.get("message")}`;
  window.open(`https://wa.me/573336449110?text=${encodeURIComponent(message)}`, "_blank", "noopener");
  document.querySelector("[data-form-note]").textContent = "Abrimos WhatsApp para continuar tu solicitud.";
});

galleryTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    galleryTabs.forEach((item) => {
      item.classList.toggle("is-active", item === tab);
      item.setAttribute("aria-selected", String(item === tab));
    });
    renderGallery(tab.dataset.galleryTab);
  });
});

document.querySelector("[data-lightbox-close]")?.addEventListener("click", closeLightbox);
document.querySelector("[data-lightbox-prev]")?.addEventListener("click", () => moveLightbox(-1));
document.querySelector("[data-lightbox-next]")?.addEventListener("click", () => moveLightbox(1));
lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (event) => {
  if (lightbox?.getAttribute("aria-hidden") !== "false") return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") moveLightbox(-1);
  if (event.key === "ArrowRight") moveLightbox(1);
});

fetch("assets/galeria-manifest.json")
  .then((response) => response.json())
  .then((items) => {
    galleryManifest = items;
    renderGallery("fachadas");
  })
  .catch(() => {
    galleryStatus.textContent = "No se pudieron cargar los proyectos. Intenta nuevamente.";
  });
