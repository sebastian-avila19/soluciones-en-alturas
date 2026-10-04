const WHATSAPP_NUMBER = "573336449110";
// Analítica: reemplazar por el ID real de GA4 (formato G-XXXXXXXXXX). Mientras diga [COMPLETAR] no se carga nada.
const GA4_ID = "[COMPLETAR]";

const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const whatsappUrl = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

/* ---------- Analítica (GA4 opcional) ---------- */
const analyticsEnabled = Boolean(GA4_ID) && !GA4_ID.includes("COMPLETAR");
window.dataLayer = window.dataLayer || [];
window.gtag = function gtag() {
  window.dataLayer.push(arguments);
};

if (analyticsEnabled) {
  const gaScript = document.createElement("script");
  gaScript.async = true;
  gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
  document.head.appendChild(gaScript);
  window.gtag("js", new Date());
  window.gtag("config", GA4_ID);
}

const trackEvent = (name, params = {}) => {
  if (analyticsEnabled) window.gtag("event", name, params);
};

document.addEventListener("click", (event) => {
  const link = event.target instanceof Element ? event.target.closest('a[href^="https://wa.me/"]') : null;
  if (!link) return;
  trackEvent("whatsapp_click", {
    location: link.hasAttribute("data-wa-float") ? "floating_button" : "page_link",
  });
});

/* ---------- Encabezado y menú ---------- */
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

/* ---------- Galería de proyectos ---------- */
// Reemplazar cada "src" por fotos reales (WebP) y ajustar título/alt cuando estén disponibles.
const photo = (src, alt, title, text) => ({ src, alt, title, text });
const FACHADAS = "assets/galeria/fachadas-pintura/";
const ELECTRICOS = "assets/galeria/electricos/";

const projectCategories = {
  fachadas: {
    summary: "Lavado, limpieza y mantenimiento de fachadas con acceso por cuerdas.",
    items: [
      photo(`${FACHADAS}fachada-073.webp`, "Operario lavando una fachada con acceso por cuerdas", "Lavado de fachada", "Limpieza de superficies exteriores sin andamios."),
      photo(`${FACHADAS}fachada-018.webp`, "Operario realizando mantenimiento sobre la fachada de un edificio", "Mantenimiento de fachada", "Intervención vertical controlada."),
      photo(`${FACHADAS}fachada-144.webp`, "Trabajo de mantenimiento sobre fachada con cuerdas", "Trabajo en frente elevado", "Desarrollo ordenado de tareas en altura."),
      photo("assets/proyectos/proyecto-fachada.png", "Mantenimiento de fachada y estructura exterior", "Conservación de superficies", "Limpieza y conservación de superficies exteriores."),
    ],
  },
  pintura: {
    summary: "Pintura y renovación de fachadas y estructuras con acabados duraderos.",
    items: [
      photo(`${FACHADAS}fachada-095.webp`, "Trabajo de pintura sobre una fachada", "Pintura de fachada", "Renovación de fachadas con acceso controlado."),
      photo(`${FACHADAS}fachada-256.webp`, "Intervención de pintura sobre estructura exterior", "Pintura exterior", "Preparación de superficie y aplicación."),
      photo(`${FACHADAS}fachada-340.webp`, "Fachada pintada terminada", "Acabado final", "Resultado visible en edificios y comercios."),
      photo("assets/proyectos/proyecto-estructura.png", "Pintura de estructura en altura", "Estructuras", "Pintura en estructuras de difícil acceso."),
    ],
  },
  cupulas: {
    summary: "Limpieza y mantenimiento de cúpulas y cubiertas de difícil acceso.",
    items: [
      photo(`${FACHADAS}fachada-188.webp`, "Operario realizando mantenimiento en la parte alta de una estructura", "Limpieza de cúpula", "Mantenimiento de zonas elevadas."),
      photo(`${FACHADAS}fachada-312.webp`, "Trabajo de mantenimiento en cubierta con acceso por cuerdas", "Mantenimiento de cubierta", "Intervención con acceso especializado."),
    ],
  },
  decoracion: {
    summary: "Decoración navideña y corporativa: iluminación, estructuras y motivos instalados en altura.",
    items: [
      photo(`${ELECTRICOS}electrico-101.webp`, "Montaje de iluminación con acceso en altura", "Montaje de iluminación", "Instalación segura de luminarias."),
      photo("assets/proyectos/navidad-centros-comerciales.svg", "Imagen de referencia de decoración para centros comerciales", "Centros comerciales", "Imagen de referencia."),
      photo("assets/proyectos/navidad-arboles.svg", "Imagen de referencia de árboles navideños", "Árboles navideños", "Imagen de referencia."),
    ],
  },
  electricos: {
    summary: "Instalación y mantenimiento de componentes eléctricos en fachadas y cubiertas.",
    items: [
      photo(`${ELECTRICOS}electrico-012.webp`, "Mantenimiento con equipos eléctricos", "Mantenimiento eléctrico", "Trabajo técnico en altura."),
      photo(`${ELECTRICOS}electrico-093.webp`, "Operario realizando instalación eléctrica en altura", "Instalación eléctrica", "Montaje de componentes en altura."),
      photo(`${ELECTRICOS}electrico-140.webp`, "Intervención eléctrica en espacio técnico", "Revisión técnica", "Instalaciones con acceso restringido."),
      photo(`${ELECTRICOS}electrico-171.webp`, "Trabajo eléctrico especializado", "Soporte técnico", "Revisión y apoyo en altura."),
    ],
  },
  vallas: {
    summary: "Montaje y mantenimiento de vallas publicitarias y estructuras en altura.",
    items: [
      photo(`${FACHADAS}fachada-278.webp`, "Montaje de valla publicitaria en altura", "Montaje de valla", "Instalación segura en altura."),
      photo(`${FACHADAS}fachada-221.webp`, "Montaje técnico sobre fachada para valla publicitaria", "Instalación controlada", "Apoyo operativo en frentes visibles."),
      photo(`${ELECTRICOS}electrico-082.webp`, "Componentes y estructura de una valla", "Ajuste de estructura", "Coordinación de accesorios en altura."),
      photo(`${ELECTRICOS}electrico-031.webp`, "Montaje de elementos publicitarios", "Proyecto publicitario", "Ejecución en un mismo frente."),
    ],
  },
};

const projectButtons = Array.from(document.querySelectorAll("[data-project-filter]"));
const projectGrid = document.querySelector("[data-project-grid]");
const projectSummary = document.querySelector("[data-project-summary]");
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxCaption = document.querySelector("[data-lightbox-caption]");
const lightboxClose = document.querySelector("[data-lightbox-close]");
let activeProjectList = [];
let activeProjectIndex = 0;
let lightboxTrigger = null;

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

    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.setAttribute("aria-label", `Ampliar imagen: ${item.title}`);

    const frame = document.createElement("div");
    frame.className = "media-frame";
    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.alt;
    img.loading = "lazy";
    img.decoding = "async";
    img.width = 800;
    img.height = 600;
    frame.appendChild(img);

    const content = document.createElement("div");
    content.className = "project-card-content";
    const title = document.createElement("h3");
    title.textContent = item.title;
    const text = document.createElement("p");
    text.textContent = item.text;
    content.append(title, text);

    trigger.append(frame, content);
    trigger.addEventListener("click", () => openLightbox(index, trigger));
    card.appendChild(trigger);
    projectGrid.appendChild(card);
  });
};

projectButtons.forEach((button) => {
  button.addEventListener("click", () => renderProjects(button.dataset.projectFilter));
});

const showLightboxItem = (index) => {
  const item = activeProjectList[index];
  if (!item || !lightboxImage) return;
  activeProjectIndex = index;
  lightboxImage.src = item.src;
  lightboxImage.alt = item.alt;
  if (lightboxCaption) lightboxCaption.textContent = item.title;
};

const openLightbox = (index, trigger) => {
  if (!lightbox) return;
  lightboxTrigger = trigger || document.activeElement;
  showLightboxItem(index);
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");
  lightboxClose?.focus();
};

const closeLightbox = () => {
  if (!lightbox) return;
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");
  if (lightboxTrigger instanceof HTMLElement) lightboxTrigger.focus();
  lightboxTrigger = null;
};

const moveLightbox = (direction) => {
  if (!activeProjectList.length) return;
  showLightboxItem((activeProjectIndex + direction + activeProjectList.length) % activeProjectList.length);
};

lightboxClose?.addEventListener("click", closeLightbox);
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
  if (event.key === "Tab") {
    const focusable = Array.from(lightbox.querySelectorAll("button"));
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});

renderProjects("fachadas");

/* ---------- Preguntas frecuentes ---------- */
const faqItems = Array.from(document.querySelectorAll("[data-faq-list] details"));
faqItems.forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;
    faqItems.forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});

/* ---------- Botón flotante de WhatsApp: mensaje según la sección visible ---------- */
const waFloat = document.querySelector("[data-wa-float]");
if (waFloat) {
  const messages = {
    servicio: "Hola S.E.A., quiero cotizar un servicio en alturas.",
    navidad: "Hola S.E.A., quiero cotizar un proyecto de decoración navideña.",
    general: "Hola S.E.A., quiero información sobre sus servicios.",
  };
  const sectionTopics = { inicio: "servicio", servicios: "servicio", navidad: "navidad" };

  const setTopic = (topic) => {
    waFloat.href = whatsappUrl(messages[topic] || messages.general);
  };
  setTopic("general");

  if ("IntersectionObserver" in window) {
    const topicObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setTopic(sectionTopics[entry.target.id] || "general");
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    document.querySelectorAll("main > section[id]").forEach((section) => topicObserver.observe(section));
  }

  // Entrada suave tras la primera carga (respeta prefers-reduced-motion vía CSS).
  requestAnimationFrame(() => waFloat.classList.add("is-visible"));
}

/* ---------- Formulario ---------- */
const form = document.querySelector("[data-contact-form]");
const formFeedback = document.querySelector("[data-form-feedback]");
const whatsappFormButton = document.querySelector("[data-form-whatsapp]");

const setFeedback = (message, state) => {
  if (!formFeedback) return;
  formFeedback.textContent = message;
  formFeedback.dataset.state = state || "";
};

const validators = {
  nombre: (value) => (value.trim().length >= 2 ? "" : "Escribe tu nombre o el de tu empresa."),
  correo: (value) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? "" : "Escribe un correo válido, por ejemplo nombre@empresa.com."),
  mensaje: (value) => (value.trim().length >= 10 ? "" : "Cuéntanos brevemente tu proyecto (mínimo 10 caracteres)."),
};

const validateForm = () => {
  if (!form) return false;
  const data = new FormData(form);
  let firstInvalid = null;
  let valid = true;

  const setError = (name, message) => {
    const field = form.elements[name];
    const errorEl = form.querySelector(`[data-error-for="${name}"]`);
    if (errorEl) errorEl.textContent = message;
    field?.setAttribute("aria-invalid", message ? "true" : "false");
    if (message) {
      valid = false;
      firstInvalid = firstInvalid || field;
    }
  };

  Object.entries(validators).forEach(([name, check]) => setError(name, check(String(data.get(name) || ""))));
  setError("consentimiento", data.get("consentimiento") ? "" : "Debes autorizar el tratamiento de datos para continuar.");

  firstInvalid?.focus();
  return valid;
};

const buildFormMessage = () => {
  const data = new FormData(form);
  return [
    "Hola S.E.A., quiero solicitar una cotización.",
    `Nombre o empresa: ${data.get("nombre")}`,
    `Correo: ${data.get("correo")}`,
    `Servicio: ${data.get("servicio")}`,
    `Proyecto: ${data.get("mensaje")}`,
  ].join("\n");
};

form?.addEventListener("input", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement) || !target.getAttribute("aria-invalid")) return;
  const errorEl = form.querySelector(`[data-error-for="${target.getAttribute("name")}"]`);
  if (errorEl) errorEl.textContent = "";
  target.setAttribute("aria-invalid", "false");
});

whatsappFormButton?.addEventListener("click", () => {
  if (!validateForm()) {
    setFeedback("Revisa los campos marcados.", "error");
    return;
  }
  trackEvent("form_submit", { method: "whatsapp" });
  window.open(whatsappUrl(buildFormMessage()), "_blank", "noopener,noreferrer");
  setFeedback("Abrimos WhatsApp con tu solicitud para que la envíes.", "success");
});

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!validateForm()) {
    setFeedback("Revisa los campos marcados.", "error");
    return;
  }

  const endpoint = form.dataset.endpoint || "";
  const submitButton = form.querySelector('button[type="submit"]');

  if (!endpoint || endpoint.includes("COMPLETAR")) {
    setFeedback("El envío por correo aún no está activo. Usa el botón «Enviar por WhatsApp» o escríbenos a solucionesenalturas@gmail.com.", "error");
    return;
  }

  submitButton?.setAttribute("disabled", "");
  setFeedback("Enviando solicitud…", "pending");

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(form),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    trackEvent("form_submit", { method: "email" });
    form.reset();
    setFeedback("¡Gracias! Recibimos tu solicitud y te responderemos pronto.", "success");
  } catch (error) {
    setFeedback("No pudimos enviar el formulario. Inténtalo de nuevo o escríbenos por WhatsApp.", "error");
  } finally {
    submitButton?.removeAttribute("disabled");
  }
});

document.querySelector("[data-current-year]")?.append(String(new Date().getFullYear()));

/* ---------- Partículas de nieve (sección Navidad) ---------- */
const holidayCanvas = document.querySelector("[data-holiday-canvas]");
if (holidayCanvas && !reducedMotion) {
  const context = holidayCanvas.getContext("2d");
  const particles = [];
  let width = 0;
  let height = 0;
  let holidayVisible = false;

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
    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          holidayVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.1 },
    ).observe(holidaySection);
  }
}
