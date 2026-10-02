const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (header) {
  const updateHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 18);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

menuToggle?.addEventListener("click", () => {
  const isOpen = siteNav?.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

siteNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const projectCategories = {
  "trabajos-alturas": {
    summary:
      "Selección visual de intervenciones con acceso controlado, planeación y aseguramiento para maniobras en altura.",
    items: [
      { src: "assets/proyectos/proyecto-trabajo-altura.png", alt: "Trabajo técnico en alturas con acceso controlado", title: "Aseguramiento inicial", text: "Planeación visual para maniobras seguras en altura." },
      { src: "assets/galeria/fachadas-pintura/fachada-018.webp", alt: "Operario realizando intervención en altura sobre estructura", title: "Intervención vertical", text: "Trabajo real del repositorio para montaje y acceso seguro." },
      { src: "assets/galeria/fachadas-pintura/fachada-144.webp", alt: "Trabajo especializado sobre fachada con acceso por cuerdas", title: "Control de desplazamiento", text: "Desarrollo ordenado de tareas en fachada y frentes elevados." },
      { src: "assets/galeria/electricos/electrico-041.webp", alt: "Trabajo técnico con aseguramiento y apoyo eléctrico en altura", title: "Conexión y revisión", text: "Acompañamiento técnico en escenarios de mantenimiento." },
    ],
  },
  "mantenimiento-fachadas": {
    summary:
      "Muestra de proyectos de mantenimiento, limpieza y conservación de fachadas, cubiertas y cúpulas en altura.",
    items: [
      { src: "assets/proyectos/proyecto-fachada.png", alt: "Mantenimiento de fachada y estructura exterior", title: "Mantenimiento de fachadas", text: "Limpieza y conservación de superficies exteriores en altura." },
      { src: "assets/galeria/fachadas-pintura/fachada-073.webp", alt: "Trabajo real de mantenimiento sobre fachada", title: "Limpieza de superficies", text: "Atención de fachadas, cubiertas y áreas expuestas." },
      { src: "assets/galeria/fachadas-pintura/fachada-188.webp", alt: "Operario ejecutando mantenimiento en parte alta de estructura", title: "Conservación de cúpulas", text: "Mantenimiento y limpieza de cúpulas y zonas elevadas." },
      { src: "assets/galeria/fachadas-pintura/fachada-312.webp", alt: "Trabajo de mantenimiento en cubierta con operación vertical", title: "Intervención en cubiertas", text: "Mantenimiento exterior con acceso especializado en altura." },
    ],
  },
  pintura: {
    summary:
      "Galería de proyectos de pintura de fachadas y estructuras, con acabados prolijos y acceso seguro en altura.",
    items: [
      { src: "assets/proyectos/proyecto-estructura.png", alt: "Pintura de estructura en altura", title: "Pintura de estructuras", text: "Acabados de calidad en estructuras de difícil acceso." },
      { src: "assets/galeria/fachadas-pintura/fachada-095.webp", alt: "Trabajo de pintura sobre fachada", title: "Pintura de fachadas", text: "Renovación estética de fachadas con acceso controlado." },
      { src: "assets/galeria/fachadas-pintura/fachada-256.webp", alt: "Intervención de pintura sobre estructura exterior", title: "Proyecto de pintura", text: "Presentación impecable para espacios corporativos y comerciales." },
      { src: "assets/galeria/fachadas-pintura/fachada-340.webp", alt: "Proyecto real de fachada pintada", title: "Acabado final", text: "Resultados visibles para centros comerciales y corporativos." },
    ],
  },
  electricos: {
    summary:
      "Curaduría de proyectos de instalación y mantenimiento eléctrico ejecutados con acceso especializado en altura.",
    items: [
      { src: "assets/galeria/electricos/electrico-012.webp", alt: "Trabajo de mantenimiento con equipos eléctricos", title: "Mantenimiento eléctrico", text: "Operación real con equipos del archivo fotográfico." },
      { src: "assets/galeria/electricos/electrico-093.webp", alt: "Operario desarrollando instalación eléctrica en altura", title: "Instalación especializada", text: "Montaje y revisión de componentes eléctricos en altura." },
      { src: "assets/galeria/electricos/electrico-140.webp", alt: "Intervención eléctrica en espacio técnico", title: "Revisión técnica", text: "Acompañamiento para instalaciones con restricciones de acceso." },
      { src: "assets/galeria/electricos/electrico-171.webp", alt: "Trabajo eléctrico especializado con componentes técnicos", title: "Supervisión eléctrica", text: "Revisión y apoyo técnico para instalaciones en altura." },
    ],
  },
  "montajes-vallas": {
    summary:
      "Selección visual para montaje de vallas publicitarias y estructuras que requieren precisión y presentación de marca.",
    items: [
      { src: "assets/galeria/fachadas-pintura/fachada-278.webp", alt: "Montaje de valla publicitaria en altura", title: "Montaje de vallas", text: "Instalación segura de elementos publicitarios en altura." },
      { src: "assets/galeria/fachadas-pintura/fachada-221.webp", alt: "Montaje técnico sobre fachada para valla publicitaria", title: "Instalación controlada", text: "Apoyo operativo en intervenciones de alto impacto visual." },
      { src: "assets/galeria/electricos/electrico-082.webp", alt: "Trabajo real con componentes técnicos y estructura de valla", title: "Ajuste fino", text: "Coordinación para estructuras y accesorios en altura." },
      { src: "assets/galeria/electricos/electrico-031.webp", alt: "Intervención técnica para montaje de elementos publicitarios", title: "Proyecto visible", text: "Marca, seguridad y ejecución en un mismo frente." },
    ],
  },
  decoracion: {
    summary:
      "Proyectos visuales, decorativos y de iluminación navideña que combinan montaje en altura con puesta en escena corporativa.",
    items: [
      { src: "assets/proyectos/proyecto-iluminacion.png", alt: "Proyecto de iluminación decorativa navideña y montaje especial", title: "Iluminación navideña", text: "Trabajo premium para experiencias memorables." },
      { src: "assets/galeria/electricos/electrico-101.webp", alt: "Intervención real de iluminación y soporte técnico", title: "Montaje de iluminación", text: "Integración de estética, seguridad y operación." },
      { src: "assets/proyectos/navidad-centros-comerciales.svg", alt: "Decoración navideña en centro comercial", title: "Decoración corporativa", text: "Soluciones visibles para centros comerciales y corporativos." },
      { src: "assets/proyectos/navidad-arboles.svg", alt: "Árboles y estructuras navideñas", title: "Estructuras navideñas", text: "Diseño e instalación de motivos y árboles navideños." },
    ],
  },
};

const projectButtons = Array.from(document.querySelectorAll("[data-project-filter]"));
const projectGrid = document.querySelector("[data-project-grid]");
const projectSummary = document.querySelector("[data-project-summary]");
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxCaption = document.querySelector("[data-lightbox-caption]");
let activeProjectList = [];
let activeProjectIndex = 0;

const renderProjects = (categoryKey) => {
  const category = projectCategories[categoryKey];
  if (!category || !projectGrid || !projectSummary) return;

  activeProjectList = category.items;
  activeProjectIndex = 0;
  projectSummary.textContent = category.summary;
  projectGrid.replaceChildren();

  projectButtons.forEach((button) => {
    const isActive = button.dataset.projectFilter === categoryKey;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  category.items.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = "project-card";
    card.innerHTML = `
      <button type="button" aria-label="Ampliar proyecto: ${item.title}">
        <div class="media-frame">
          <img src="${item.src}" alt="${item.alt}" loading="lazy" decoding="async" />
        </div>
        <div class="project-card-content">
          <h3>${item.title}</h3>
          <p>${item.text}</p>
        </div>
      </button>
    `;

    card.querySelector("button")?.addEventListener("click", () => openLightbox(index));
    projectGrid.appendChild(card);
  });
};

projectButtons.forEach((button) => {
  button.addEventListener("click", () => {
    renderProjects(button.dataset.projectFilter);
  });
});

const openLightbox = (index) => {
  const item = activeProjectList[index];
  if (!item || !lightbox) return;

  activeProjectIndex = index;
  lightboxImage.src = item.src;
  lightboxImage.alt = item.alt;
  lightboxCaption.textContent = item.title;
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");
};

const closeLightbox = () => {
  if (!lightbox) return;
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");
};

const moveLightbox = (direction) => {
  if (!activeProjectList.length) return;
  activeProjectIndex = (activeProjectIndex + direction + activeProjectList.length) % activeProjectList.length;
  openLightbox(activeProjectIndex);
};

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

renderProjects("trabajos-alturas");

const counters = document.querySelectorAll("[data-counter-target]");

const animateCounter = (element) => {
  const target = Number(element.dataset.counterTarget);
  const duration = reducedMotion ? 0 : 1200;
  const formatter = new Intl.NumberFormat("es-CO");

  if (!duration) {
    element.textContent = formatter.format(target);
    return;
  }

  const start = performance.now();
  const step = (timestamp) => {
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = formatter.format(Math.round(target * eased));
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
};

if (counters.length) {
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.45 });

  counters.forEach((counter) => counterObserver.observe(counter));
}

const testimonialsTrack = document.querySelector("[data-testimonials-track]");
document.querySelectorAll("[data-testimonial-nav]").forEach((button) => {
  button.addEventListener("click", () => {
    if (!testimonialsTrack) return;
    const cardWidth = testimonialsTrack.firstElementChild?.getBoundingClientRect().width || 320;
    const offset = button.dataset.testimonialNav === "next" ? cardWidth + 16 : -(cardWidth + 16);
    testimonialsTrack.scrollBy({ left: offset, behavior: reducedMotion ? "auto" : "smooth" });
  });
});

const faqItems = Array.from(document.querySelectorAll("[data-faq-list] details"));
faqItems.forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;
    faqItems.forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});

const form = document.querySelector("[data-contact-form]");
const formFeedback = document.querySelector("[data-form-feedback]");

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const message = [
    "Hola S.E.A., quiero solicitar información.",
    `Nombre o empresa: ${data.get("nombre")}`,
    `Correo: ${data.get("correo")}`,
    `Servicio: ${data.get("servicio")}`,
    `Detalle: ${data.get("mensaje")}`,
  ].join("\\n");

  window.open(`https://wa.me/573336449110?text=${encodeURIComponent(message)}`, "_blank", "noopener");
  if (formFeedback) {
    formFeedback.textContent = "Abrimos WhatsApp para continuar tu solicitud con el contexto diligenciado.";
  }
});

document.querySelector("[data-current-year]")?.append(String(new Date().getFullYear()));

const holidayCanvas = document.querySelector("[data-holiday-canvas]");
if (holidayCanvas && !reducedMotion) {
  const context = holidayCanvas.getContext("2d");
  const particles = [];
  let width = 0;
  let height = 0;
  let holidayVisible = true;

  const resizeCanvas = () => {
    const ratio = window.devicePixelRatio || 1;
    width = holidayCanvas.offsetWidth;
    height = holidayCanvas.offsetHeight;
    holidayCanvas.width = Math.floor(width * ratio);
    holidayCanvas.height = Math.floor(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  };

  const createParticles = () => {
    particles.length = 0;
    for (let index = 0; index < 55; index += 1) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.4 + 0.8,
        speedY: Math.random() * 0.8 + 0.35,
        drift: Math.random() * 0.8 - 0.4,
        alpha: Math.random() * 0.6 + 0.2,
      });
    }
  };

  const drawParticles = () => {
    context.clearRect(0, 0, width, height);
    particles.forEach((particle) => {
      particle.y += particle.speedY;
      particle.x += Math.sin(particle.y * 0.01) * particle.drift;
      if (particle.y > height + 10) {
        particle.y = -10;
        particle.x = Math.random() * width;
      }

      context.beginPath();
      context.fillStyle = `rgba(255,255,255,${particle.alpha})`;
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fill();
    });
  };

  const loop = () => {
    if (holidayVisible) drawParticles();
    requestAnimationFrame(loop);
  };

  resizeCanvas();
  createParticles();
  loop();

  window.addEventListener("resize", () => {
    resizeCanvas();
    createParticles();
  });

  const holidaySection = document.querySelector("#navidad");
  if (holidaySection) {
    const visibilityObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        holidayVisible = entry.isIntersecting;
      });
    }, { threshold: 0.1 });

    visibilityObserver.observe(holidaySection);
  }
}
