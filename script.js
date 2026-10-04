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
const ELECTRICOS = "assets/galeria/electricos/"; // solo fotos de iluminación decorativa

const projectCategories = {
  fachadas: {
    summary: "Lavado, limpieza y mantenimiento de fachadas con acceso por cuerdas.",
    items: [
      photo(FACHADAS + "fachada-004.webp", "Operario descendiendo con cuerdas por el costado de un edificio", "Descenso por fachada", "Acceso por cuerdas sin andamios."),
      photo(FACHADAS + "fachada-006.webp", "Operario con casco trabajando suspendido en la fachada de un edificio", "Lavado en altura", "Intervención vertical controlada."),
      photo(FACHADAS + "fachada-007.webp", "Operario suspendido junto al borde superior de una fachada", "Revisión de fachada", "Inspección previa a la limpieza."),
      photo(FACHADAS + "fachada-008.webp", "Operario con arnés y cuerdas en el borde de un edificio", "Trabajo en borde de edificio", "Doble línea de anclaje."),
      photo(FACHADAS + "fachada-027.webp", "Operarios con casco verde trabajando en el vacío de un centro comercial", "Patio de centro comercial", "Limpieza en vacíos y patios interiores."),
      photo(FACHADAS + "fachada-030.webp", "Operario suspendido con cuerdas en un patio interior", "Limpieza en vacíos", "Acceso a zonas sin plataforma."),
      photo(FACHADAS + "fachada-034.webp", "Operarios trabajando en altura dentro de un patio de edificio", "Mantenimiento interior", "Trabajo coordinado en equipo."),
      photo(FACHADAS + "fachada-123.webp", "Operarios trabajando en la fachada de un centro comercial en horario nocturno", "Fachada nocturna", "Intervención fuera de horario comercial."),
      photo(FACHADAS + "fachada-222.webp", "Operario limpiando una fachada de vidrio curva", "Limpieza de vidrio", "Fachadas de vidrio y muro cortina."),
      photo(FACHADAS + "fachada-230.webp", "Operario sobre cuerdas limpiando vidrio en un edificio", "Fachada de vidrio", "Acabado limpio en superficies de vidrio."),
      photo(FACHADAS + "fachada-237.webp", "Operarios en la fachada de vidrio de un edificio", "Edificio con vidrio", "Cobertura de grandes superficies."),
      photo(FACHADAS + "fachada-018.webp", "Vista desde arriba de un operario suspendido sobre la calle", "Mantenimiento de fachada", "Intervención vertical en edificio."),
    ],
  },
  pintura: {
    summary: "Pintura y renovación de fachadas y estructuras con acabados duraderos.",
    items: [
      photo(FACHADAS + "fachada-145.webp", "Operarios con cuerdas pintando un muro blanco", "Pintura de muro", "Preparación y aplicación en altura."),
      photo(FACHADAS + "fachada-148.webp", "Operario aplicando pintura sobre un muro exterior", "Pintura en altura", "Aplicación pareja en superficies altas."),
      photo(FACHADAS + "fachada-150.webp", "Operario suspendido renovando un muro blanco", "Renovación de muro", "Renovación de fachadas."),
      photo(FACHADAS + "fachada-153.webp", "Operarios pintando un muro con tarro de pintura roja", "Trabajo con cuerdas", "Equipo y materiales en altura."),
      photo(FACHADAS + "fachada-156.webp", "Operario terminando el acabado de un muro exterior", "Acabado en muro", "Cuidado del detalle."),
      photo(FACHADAS + "fachada-165.webp", "Operarios pintando una marca sobre una fachada", "Pintura de logotipo", "Pintura de gráficos en fachada."),
      photo(FACHADAS + "fachada-168.webp", "Muro blanco pintado con equipo de acceso en altura", "Muro con canasta", "Equipos de acceso para grandes superficies."),
      photo(FACHADAS + "fachada-245.webp", "Fachada con acabado verde y blanco y operario en altura", "Acabado verde y blanco", "Acabados duraderos."),
      photo(FACHADAS + "fachada-209.webp", "Fachada de vidrio verde curva terminada", "Fachada terminada", "Resultado final de la intervención."),
      photo(FACHADAS + "fachada-215.webp", "Fachada curva de edificio con acabado limpio", "Fachada curva", "Acabado uniforme."),
    ],
  },
  cupulas: {
    summary: "Limpieza y mantenimiento de cúpulas y cubiertas de difícil acceso.",
    items: [
      photo(FACHADAS + "fachada-017.webp", "Claraboya piramidal de vidrio sobre una cubierta", "Claraboya piramidal", "Limpieza de vidrio en cubierta."),
      photo(FACHADAS + "fachada-095.webp", "Cúpula de vidrio con marcos rojos", "Cúpula de vidrio", "Mantenimiento de cúpulas."),
      photo(FACHADAS + "fachada-096.webp", "Detalle de cúpula de vidrio con estructura roja", "Marcos y vidrios", "Limpieza de marcos y vidrios."),
      photo(FACHADAS + "fachada-100.webp", "Cúpula de vidrio sobre cubierta de edificio", "Cúpula en cubierta", "Acceso a zonas altas."),
      photo(FACHADAS + "fachada-101.webp", "Claraboyas de vidrio con marcos rojos", "Claraboya de vidrio", "Limpieza de vidrios de difícil acceso."),
      photo(FACHADAS + "fachada-107.webp", "Cúpula arqueada de vidrio sobre un edificio", "Cúpula arqueada", "Mantenimiento de estructuras curvas."),
      photo(FACHADAS + "fachada-112.webp", "Operario sobre una cúpula de vidrio", "Trabajo sobre vidrio", "Intervención segura en cubierta."),
      photo(FACHADAS + "fachada-197.webp", "Cubierta metálica limpia", "Cubierta metálica", "Lavado de cubiertas."),
      photo(FACHADAS + "fachada-293.webp", "Operario limpiando una cubierta con cepillo", "Limpieza de cubierta", "Limpieza manual de superficies."),
      photo(FACHADAS + "fachada-201.webp", "Operario en la estructura metálica de una cubierta", "Estructura de cubierta", "Trabajo en cerchas y estructuras."),
    ],
  },
  decoracion: {
    summary: "Decoración navideña y corporativa: iluminación, estructuras y motivos instalados en altura.",
    items: [
      photo(ELECTRICOS + "electrico-003.webp", "Salón con cortinas de luces blancas colgantes sobre las mesas", "Salón iluminado", "Decoración corporativa y de eventos."),
      photo(ELECTRICOS + "electrico-004.webp", "Columnas forradas con cadenas de luces en un patio", "Columnas iluminadas", "Iluminación de columnas."),
      photo(ELECTRICOS + "electrico-006.webp", "Aro de luces con cortinas colgantes en un salón", "Aros de luces", "Estructuras luminosas suspendidas."),
      photo(ELECTRICOS + "electrico-008.webp", "Esferas y cortinas de luces en un salón de eventos", "Salón de eventos", "Ambientación de espacios corporativos."),
      photo(ELECTRICOS + "electrico-025.webp", "Estrella luminosa armada con luces cálidas", "Estrella luminosa", "Motivos navideños de gran formato."),
      photo(ELECTRICOS + "electrico-029.webp", "Operario preparando cortinas de luces para instalar", "Preparación de luces", "Armado previo al montaje."),
      photo(ELECTRICOS + "electrico-034.webp", "Técnico armando una estructura de luces en bodega", "Elaboración de motivos", "Fabricación de estructuras navideñas."),
      photo(ELECTRICOS + "electrico-038.webp", "Operarios armando un árbol de luces", "Árbol de luces", "Árboles navideños de gran formato."),
      photo(ELECTRICOS + "electrico-040.webp", "Manguera de luces cálidas desenrollada para montaje", "Manguera luminosa", "Material para iluminación decorativa."),
      photo(FACHADAS + "fachada-044.webp", "Cadena de luces colgando por una fachada interior mientras un operario trabaja", "Luces en fachada", "Instalación de luces en altura."),
      photo(FACHADAS + "fachada-301.webp", "Valla publicitaria con motivos navideños iluminada de noche", "Valla navideña iluminada", "Iluminación de vallas y rótulos."),
      photo(FACHADAS + "fachada-312.webp", "Rollo de manguera de luces encendido", "Manguera luminosa", "Pruebas de iluminación previas al montaje."),
    ],
  },
};

const INITIAL_VISIBLE = 6;

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
let currentCategory = "fachadas";

const projectMore = document.querySelector("[data-project-more]");
let visibleCount = INITIAL_VISIBLE;

const renderProjects = (categoryKey, keepCount) => {
  const category = projectCategories[categoryKey];
  if (!category || !projectGrid || !projectSummary) return;

  if (!keepCount) visibleCount = INITIAL_VISIBLE;
  currentCategory = categoryKey;
  activeProjectList = category.items.slice(0, visibleCount);
  activeProjectIndex = 0;
  projectSummary.textContent = category.summary;
  projectGrid.replaceChildren();

  projectButtons.forEach((button) => {
    const isActive = button.dataset.projectFilter === categoryKey;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  activeProjectList.forEach((item, index) => {
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

  if (projectMore) projectMore.hidden = category.items.length <= visibleCount;
};

projectMore?.addEventListener("click", () => {
  visibleCount = Math.min(projectCategories[currentCategory].items.length, visibleCount + 6);
  renderProjects(currentCategory, true);
});

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
  telefono: (value) => (value.replace(/\D/g, "").length >= 7 ? "" : "Escribe un teléfono válido con al menos 7 dígitos."),
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
    `Teléfono: ${data.get("telefono")}`,
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


// Preselecciona el servicio al pulsar "Cotizar este servicio"
document.querySelectorAll("[data-service]").forEach((link) => {
  link.addEventListener("click", () => {
    const select = form?.elements["servicio"];
    if (!select) return;
    const option = Array.from(select.options).find((o) => o.value === link.dataset.service || o.textContent.trim() === link.dataset.service);
    if (option) select.value = option.value;
  });
});

// Resalta el enlace activo del menú según la sección visible
const navLinks = Array.from(document.querySelectorAll("#site-nav a[href^='#']"));
if ("IntersectionObserver" in window && navLinks.length) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((a) => {
        const on = a.getAttribute("href") === `#${entry.target.id}`;
        a.classList.toggle("is-active", on);
        if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  navLinks.forEach((a) => { const t = document.querySelector(a.getAttribute("href")); if (t) navObserver.observe(t); });
}

// Aparición suave al hacer scroll (respeta prefers-reduced-motion)
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-visible"); obs.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll(".service-card, .case-card, .process-steps li, .holiday-card").forEach((el) => {
    el.classList.add("reveal");
    revealObserver.observe(el);
  });
}