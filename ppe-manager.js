import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { CSS2DRenderer, CSS2DObject } from "three/addons/renderers/CSS2DRenderer.js";

/**
 * Technical metadata and configuration for height-safety PPE items.
 * Complies with Colombian Resolution 4272 of 2021 and ANSI/EN standards.
 */
export const DEFAULT_PPE_ITEMS = [
  {
    id: "helmet",
    index: "01",
    name: "Casco de seguridad con barbuquejo",
    category: "Protecci?n Craneal",
    standard: "ANSI Z89.1 Tipo II / EN 397 (Clase E/G)",
    shortDesc: "Protecci?n diel?ctrica contra impactos verticales y laterales con barbuquejo de 4 puntos.",
    description: "Casco diel?ctrico de alta resistencia para absorci?n de impactos y resistencia a perforaci?n. Equipado obligatoriamente con barbuquejo de 4 puntos de anclaje para prevenir desprendimiento en caso de oscilaci?n o ca?da libre.",
    specifications: [
      "Casquete en polietileno de alta densidad / ABS con protecci?n UV",
      "Aislamiento diel?ctrico: Clase E (ensayado hasta 20.000 V)",
      "Barbuquejo de 4 puntos con mentonera ergon?mica no conductora",
      "Suspensi?n textil de 6 puntos con ratchet de ajuste r?pido"
    ],
    inspectionPoints: [
      "Verificar ausencia de fisuras, grietas, decoloraci?n por rayos UV o deformaciones.",
      "Asegurar integridad de la suspensi?n textil y mecanismo ratchet.",
      "Confirmar que el barbuquejo ajuste firmemente bajo la mand?bula sin estrangular."
    ],
    url: "assets/models/ppe/helmet.glb",
    side: "left",
    repeated: false,
    alignment: {
      position: [0, 1.74, 0.04],
      rotation: [0, 0, 0],
      scale: [2.5, 2.5, 2.5],
      targetHeight: 0.58
    },
    focus: {
      target: [0, 1.72, 0.04],
      distance: 1.75,
      elevation: 0.08
    },
    markerOffset: [0, 1.96, 0.05]
  },
  {
    id: "harness",
    index: "02",
    name: "Arn?s de cuerpo entero",
    category: "Detenci?n de Ca?das",
    standard: "ANSI Z359.11 / EN 361 / Res. 4272 de 2021",
    shortDesc: "Arn?s ergon?mico multiprop?sito de 4 puntos con argolla dorsal en D para detenci?n de ca?das.",
    description: "Elemento estructural de cuerpo entero dise?ado para distribuir uniformemente las fuerzas de impacto generadas durante la detenci?n de una ca?da sobre muslos, pelvis, pecho y hombros, manteniendo al trabajador en posici?n vertical.",
    specifications: [
      "Capacidad nominal de carga: 140 kg (usuario + indumentaria + herramientas)",
      "Herrajes en acero forjado templado con resistencia m?nima de 5.000 lb (22.2 kN)",
      "Reata en poli?ster de alta tenacidad con indicadores de impacto integrados",
      "Argollas: Dorsal (detenci?n), Esternal (rescate/ascenso) y Laterales (posicionamiento)"
    ],
    inspectionPoints: [
      "Comprobar que no existan cortes, quemaduras qu?micas, deshilachados o fibras rotas.",
      "Revisar que las argollas en D y hebillas no presenten corrosi?n, deformaciones o fisuras.",
      "Verificar que los testigos de impacto no hayan sido activados previamente."
    ],
    url: "assets/models/ppe/harness.glb",
    side: "left",
    repeated: false,
    alignment: {
      position: [0, 0.45, 0.02],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      targetHeight: 1.45
    },
    focus: {
      target: [0, 0.45, 0.02],
      distance: 2.35,
      elevation: 0.06
    },
    markerOffset: [0, 0.62, 0.16]
  },
  {
    id: "lanyard",
    index: "03",
    name: "Conector de anclaje / Eslinga con absorbedor",
    category: "L?nea de Conexi?n y Disipaci?n",
    standard: "ANSI Z359.13 / EN 355 / OSHA 1926.502",
    shortDesc: "Eslinga de conexi?n con sistema de absorci?n de choque para limitar fuerzas bajo 4 kN.",
    description: "Componente de enlace entre el arn?s del trabajador y el punto de anclaje certificado. Integra un disipador de energ?a por desgarro progresivo que amortigua la deceleraci?n limitando el impacto sobre el cuerpo humano a menos de 4 kN (900 lb).",
    specifications: [
      "Mosquetones en acero forjado con doble seguro autom?tico (apertura 3/4 pulg)",
      "Absorbedor de impacto textil con despliegue controlado hasta 1.2 m",
      "Resistencia a la rotura: 22.2 kN (5.000 lb) en todos los herrajes y costuras",
      "Longitud m?xima de la l?nea de trabajo: 1.80 m"
    ],
    inspectionPoints: [
      "Verificar que el empaque termorretr?ctil del absorbedor no est? roto ni desplegado.",
      "Inspeccionar el seguro autom?tico de los mosquetones asegurando cierre perfecto.",
      "Comprobar etiqueta de fabricaci?n, fecha de vencimiento y serial de certificaci?n."
    ],
    url: "assets/models/ppe/lanyard.glb",
    side: "left",
    repeated: false,
    alignment: {
      position: [0.18, 0.68, -0.16],
      rotation: [0, Math.PI * 0.25, 0],
      scale: [1, 1, 1],
      targetHeight: 1.15
    },
    focus: {
      target: [0.18, 0.68, -0.12],
      distance: 2.1,
      elevation: 0.08
    },
    markerOffset: [0.38, 0.78, -0.12]
  },
  {
    id: "gloves",
    index: "04",
    name: "Guantes diel?ctricos y de maniobra",
    category: "Protecci?n Manual",
    standard: "EN 388 (4X43D) / ASTM D120 / EN 407",
    shortDesc: "Guantes de cuero hidrofugado y kevlar con resistencia mec?nica y agarre seguro en cuerdas.",
    description: "Guantes t?cnicos dise?ados espec?ficamente para el control de descensos, fricci?n con cuerdas est?ticas y din?micas, manipulaci?n de mosquetones y maniobras en estructuras con bordes filosos o exposici?n a la intemperie.",
    specifications: [
      "Palma reforzada con doble capa de cuero sint?tico antideslizante",
      "Costuras cosidas con hilo de Kevlar antiabrasivo de alta resistencia",
      "Dorso transpirable con protecciones termopl?sticas de nudillos (TPR)",
      "Pu?o con ajuste por velcro de alta fijaci?n y orificio para mosquet?n de transporte"
    ],
    inspectionPoints: [
      "Inspeccionar desgaste excesivo en las palmas y zonas de contacto con la cuerda.",
      "Verificar costuras intactas en uni?n de dedos y palma.",
      "Asegurar ajuste firme en mu?ecas para evitar deslizamientos involuntarios."
    ],
    url: "assets/models/ppe/gloves.glb",
    side: "right",
    repeated: true,
    alignment: {
      left: {
        position: [0.66, 0.46, 0.02],
        rotation: [0, 0, -Math.PI * 0.08],
        scale: [1, 1, 1]
      },
      right: {
        position: [-0.66, 0.46, 0.02],
        rotation: [0, 0, Math.PI * 0.08],
        scale: [-1, 1, 1]
      },
      targetHeight: 0.44
    },
    focus: {
      target: [0.55, 0.48, 0.04],
      distance: 1.85,
      elevation: 0.05
    },
    markerOffset: [0.68, 0.65, 0.06]
  },
  {
    id: "boots",
    index: "05",
    name: "Botas diel?ctricas de seguridad",
    category: "Protecci?n Podal",
    standard: "ASTM F2413 / EN ISO 20345 (S3 SRC)",
    shortDesc: "Calzado de seguridad diel?ctrico con suela antideslizante y puntera no met?lica.",
    description: "Calzado t?cnico ergon?mico con suela de doble densidad de poliuretano/caucho, dibujo autolimpiante de alto coeficiente de fricci?n para superficies h?medas, y puntera de composite ligera resistente a 200 Joules.",
    specifications: [
      "Puntera de seguridad en fibra de carbono / composite (100% no met?lica)",
      "Resistencia diel?ctrica hasta 18 kV a 60 Hz durante 1 minuto sin fugas",
      "Plantilla anti-perforaci?n de aramida resistente a 1.100 N",
      "Suela con tecnolog?a antideslizante SRC resistente a hidrocarburos y aceites"
    ],
    inspectionPoints: [
      "Revisar desgaste de la huella de la suela y p?rdida de tracci?n.",
      "Comprobar ausencia de objetos incrustados conductores o clavos.",
      "Verificar integridad del cuero, ca?a y sistema de amarre seguro."
    ],
    url: "assets/models/ppe/boots.glb",
    side: "right",
    repeated: true,
    alignment: {
      left: {
        position: [0.22, -1.74, 0.06],
        rotation: [0, 0, 0],
        scale: [1, 1, 1]
      },
      right: {
        position: [-0.22, -1.74, 0.06],
        rotation: [0, 0, 0],
        scale: [-1, 1, 1]
      },
      targetHeight: 0.46
    },
    focus: {
      target: [0, -1.62, 0.1],
      distance: 2.1,
      elevation: 0.08
    },
    markerOffset: [0.26, -1.48, 0.12]
  }
];

export class PPEManager {
  constructor(options = {}) {
    this.scene = options.scene;
    this.camera = options.camera;
    this.renderer = options.renderer;
    this.controls = options.controls;
    this.container = options.container;
    this.itemsConfig = options.items || DEFAULT_PPE_ITEMS;
    this.onSelectionChange = options.onSelectionChange || null;

    this.group = new THREE.Group();
    this.group.name = "PPE_Equipment_Group";
    if (this.scene) {
      this.scene.add(this.group);
    }

    this.loadedItems = new Map();
    this.css2dObjects = new Map();
    this.interactiveMeshes = [];
    this.loader = new GLTFLoader();

    this.selectedItemId = null;
    this.hoveredItemId = null;
    this.tourActive = false;
    this.tourIndex = -1;
    this.tourTimer = null;

    this.initialCameraPosition = this.camera ? this.camera.position.clone() : new THREE.Vector3(0, 0, 4.5);
    this.initialControlsTarget = this.controls && this.controls.target ? this.controls.target.clone() : new THREE.Vector3(0, 0, 0);

    this.targetCameraPos = null;
    this.targetControlsTarget = null;
    this.isCameraLerping = false;

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.initCSS2DRenderer();
    this.setupInteraction();
    this.setupDOMBindings();
    this.loadAllPPE();
  }

  initCSS2DRenderer() {
    if (!this.container) return;
    this.labelRenderer = new CSS2DRenderer();
    this.labelRenderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.labelRenderer.domElement.className = "ppe-css2d-container";
    this.labelRenderer.domElement.style.position = "absolute";
    this.labelRenderer.domElement.style.top = "0";
    this.labelRenderer.domElement.style.left = "0";
    this.labelRenderer.domElement.style.width = "100%";
    this.labelRenderer.domElement.style.height = "100%";
    this.labelRenderer.domElement.style.pointerEvents = "none";
    this.labelRenderer.domElement.style.zIndex = "10";
    this.container.appendChild(this.labelRenderer.domElement);
  }

  setupDOMBindings() {
    this.cards = document.querySelectorAll(".ppe-card[data-ppe-id]");
    this.cards.forEach((card) => {
      const ppeId = card.getAttribute("data-ppe-id");
      card.addEventListener("click", () => this.selectItem(ppeId, { source: "card" }));
      card.addEventListener("mouseenter", () => this.hoverItem(ppeId));
      card.addEventListener("mouseleave", () => this.hoverItem(null));
    });

    const resetBtn = document.getElementById("ppe-reset-camera");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => this.resetCamera());
    }

    const tourBtn = document.getElementById("ppe-start-tour");
    if (tourBtn) {
      tourBtn.addEventListener("click", () => this.toggleGuidedTour());
    }
  }

  setupInteraction() {
    if (!this.renderer || !this.renderer.domElement) return;
    const canvas = this.renderer.domElement;

    this._onPointerMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      this.checkRaycastHover();
    };

    this._onPointerClick = (event) => {
      const rect = canvas.getBoundingClientRect();
      this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      this.checkRaycastClick();
    };

    canvas.addEventListener("pointermove", this._onPointerMove);
    canvas.addEventListener("click", this._onPointerClick);
  }
  async loadAllPPE() {
    const loadPromises = this.itemsConfig.map((itemConfig) => this.loadSinglePPE(itemConfig));
    await Promise.allSettled(loadPromises);
    this.updateMissingBadges();
  }

  async loadSinglePPE(item) {
    return new Promise((resolve) => {
      this.loader.load(
        item.url,
        (gltf) => {
          const root = gltf.scene;
          root.name = `PPE_${item.id}`;
          this.applyMaterialTreatment(root, item);

          const itemGroup = new THREE.Group();
          itemGroup.name = `PPE_Group_${item.id}`;

          if (item.repeated && item.alignment.left && item.alignment.right) {
            const leftInstance = this.normalizeAndPosition(root.clone(), item.alignment.left, item.alignment.targetHeight);
            const rightInstance = this.normalizeAndPosition(root.clone(), item.alignment.right, item.alignment.targetHeight);
            leftInstance.name = `${item.id}_left`;
            rightInstance.name = `${item.id}_right`;
            itemGroup.add(leftInstance);
            itemGroup.add(rightInstance);
          } else {
            const singleInstance = this.normalizeAndPosition(root, item.alignment, item.alignment.targetHeight);
            singleInstance.name = `${item.id}_single`;
            itemGroup.add(singleInstance);
          }

          this.group.add(itemGroup);

          itemGroup.traverse((child) => {
            if (child.isMesh) {
              child.userData = { ppeId: item.id, itemConfig: item };
              this.interactiveMeshes.push(child);
            }
          });

          this.createCSS2DMarker(item);
          this.loadedItems.set(item.id, { config: item, object3D: itemGroup, loaded: true, error: null });
          resolve({ id: item.id, success: true });
        },
        undefined,
        (err) => {
          console.warn(`[PPEManager] Asset not found or failed to load for ${item.id}:`, item.url, err);
          this.loadedItems.set(item.id, { config: item, object3D: null, loaded: false, error: err });
          resolve({ id: item.id, success: false });
        }
      );
    });
  }

  normalizeAndPosition(object3D, alignment, targetHeight) {
    const box = new THREE.Box3().setFromObject(object3D);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);

    if (maxDim > 0.0001 && targetHeight) {
      const scaleFactor = targetHeight / maxDim;
      object3D.scale.set(scaleFactor, scaleFactor, scaleFactor);
    }

    if (alignment.scale) {
      object3D.scale.x *= alignment.scale[0];
      object3D.scale.y *= alignment.scale[1];
      object3D.scale.z *= alignment.scale[2];
    }

    if (alignment.rotation) {
      object3D.rotation.set(alignment.rotation[0], alignment.rotation[1], alignment.rotation[2]);
    }

    if (alignment.position) {
      object3D.position.set(alignment.position[0], alignment.position[1], alignment.position[2]);
    }

    return object3D;
  }

  applyMaterialTreatment(object3D, item) {
    object3D.traverse((child) => {
      if (child.isMesh && child.material) {
        const mat = child.material;
        mat.transparent = false;
        mat.opacity = 1.0;
        mat.depthWrite = true;
        mat.depthTest = true;
        mat.roughness = Math.min(0.85, Math.max(0.2, mat.roughness ?? 0.5));
        mat.metalness = Math.min(0.9, Math.max(0.05, mat.metalness ?? 0.2));
        if (mat.emissive) {
          mat.emissive.setHex(0x000000);
        }
      }
    });
  }

  createCSS2DMarker(item) {
    if (!this.labelRenderer) return;

    const markerDiv = document.createElement("div");
    markerDiv.className = "ppe-marker-dot";
    markerDiv.setAttribute("data-ppe-id", item.id);
    markerDiv.setAttribute("title", item.name);
    markerDiv.innerHTML = `
      <span class="marker-pulse"></span>
      <span class="marker-core">${item.index}</span>
      <span class="marker-tooltip">${item.name}</span>
    `;

    markerDiv.style.pointerEvents = "auto";
    markerDiv.addEventListener("click", (e) => {
      e.stopPropagation();
      this.selectItem(item.id, { source: "marker" });
    });

    const cssObject = new CSS2DObject(markerDiv);
    const offset = item.markerOffset || [0, 0, 0];
    cssObject.position.set(offset[0], offset[1], offset[2]);

    this.group.add(cssObject);
    this.css2dObjects.set(item.id, { element: markerDiv, object2D: cssObject });
  }

  checkRaycastHover() {
    if (!this.camera || this.interactiveMeshes.length === 0) return;
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.interactiveMeshes, true);

    if (intersects.length > 0) {
      const topMesh = intersects[0].object;
      const ppeId = topMesh.userData?.ppeId;
      if (ppeId && ppeId !== this.hoveredItemId) {
        this.hoverItem(ppeId);
      }
    } else if (this.hoveredItemId !== null) {
      this.hoverItem(null);
    }
  }

  checkRaycastClick() {
    if (!this.camera || this.interactiveMeshes.length === 0) return;
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.interactiveMeshes, true);

    if (intersects.length > 0) {
      const topMesh = intersects[0].object;
      const ppeId = topMesh.userData?.ppeId;
      if (ppeId) {
        this.selectItem(ppeId, { source: "raycast" });
      }
    }
  }

  hoverItem(ppeId) {
    this.hoveredItemId = ppeId;
    document.querySelectorAll(".ppe-card").forEach((c) => {
      if (c.getAttribute("data-ppe-id") === ppeId) {
        c.classList.add("ppe-card--hovered");
      } else {
        c.classList.remove("ppe-card--hovered");
      }
    });

    this.css2dObjects.forEach((entry, id) => {
      if (id === ppeId) {
        entry.element.classList.add("marker--hovered");
      } else {
        entry.element.classList.remove("marker--hovered");
      }
    });
  }

  selectItem(ppeId, options = {}) {
    if (this.selectedItemId === ppeId && options.source !== "tour") {
      this.resetCamera();
      return;
    }

    this.selectedItemId = ppeId;
    const itemData = this.itemsConfig.find((i) => i.id === ppeId);
    if (!itemData) return;

    document.querySelectorAll(".ppe-card").forEach((c) => {
      const id = c.getAttribute("data-ppe-id");
      if (id === ppeId) {
        c.classList.add("ppe-card--active");
        c.setAttribute("aria-selected", "true");
      } else {
        c.classList.remove("ppe-card--active");
        c.setAttribute("aria-selected", "false");
      }
    });

    this.css2dObjects.forEach((entry, id) => {
      if (id === ppeId) {
        entry.element.classList.add("marker--active");
      } else {
        entry.element.classList.remove("marker--active");
      }
    });

    this.updateDetailsHUD(itemData);
    this.focusCameraOnItem(itemData);

    if (this.onSelectionChange) {
      this.onSelectionChange(itemData, this.loadedItems.get(ppeId));
    }
  }

  updateDetailsHUD(item) {
    const panel = document.getElementById("ppe-inspection-panel");
    if (!panel) return;

    const itemStatus = this.loadedItems.get(item.id);
    const isModelMissing = itemStatus && !itemStatus.loaded;

    const missingNotice = isModelMissing
      ? `<div class="ppe-missing-banner"><i class="fas fa-file-alt"></i> <span><strong>Ficha T?cnica Normativa:</strong> Modelo 3D en calibraci?n de digitalizaci?n. Especificaciones oficiales vigentes.</span></div>`
      : "";

    panel.innerHTML = `
      <div class="ppe-hud-header">
        <span class="ppe-hud-code">ITEM ${item.index} // ${item.category.toUpperCase()}</span>
        <button class="ppe-hud-close" id="ppe-hud-close-btn" aria-label="Cerrar panel"><i class="fas fa-times"></i></button>
      </div>
      <h3 class="ppe-hud-title">${item.name}</h3>
      <div class="ppe-hud-standard"><i class="fas fa-certificate"></i> ${item.standard}</div>
      ${missingNotice}
      <p class="ppe-hud-desc">${item.description}</p>
      
      <div class="ppe-hud-section">
        <h4><i class="fas fa-microchip"></i> Especificaciones de Ingenier?a</h4>
        <ul class="ppe-hud-specs">
          ${item.specifications.map((s) => `<li><i class="fas fa-chevron-right"></i> ${s}</li>`).join("")}
        </ul>
      </div>

      <div class="ppe-hud-section">
        <h4><i class="fas fa-clipboard-check"></i> Criterios de Inspecci?n Pre-Uso (Res. 4272)</h4>
        <ul class="ppe-hud-inspection">
          ${item.inspectionPoints.map((p) => `<li><i class="fas fa-shield-alt"></i> ${p}</li>`).join("")}
        </ul>
      </div>
    `;

    panel.classList.add("ppe-panel--visible");

    const closeBtn = document.getElementById("ppe-hud-close-btn");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.resetCamera());
    }
  }

  updateMissingBadges() {
    this.itemsConfig.forEach((item) => {
      const status = this.loadedItems.get(item.id);
      if (status && !status.loaded) {
        const card = document.querySelector(`.ppe-card[data-ppe-id="${item.id}"]`);
        if (card) {
          const badge = card.querySelector(".ppe-card-badge");
          if (badge) {
            badge.textContent = "Ficha Normativa";
            badge.classList.add("badge--missing");
          }
        }
      }
    });
  }

  focusCameraOnItem(item) {
    if (!this.camera || !this.controls) return;

    const focusCfg = item.focus;
    const targetPos = focusCfg.target;

    this.targetControlsTarget = new THREE.Vector3(targetPos[0], targetPos[1], targetPos[2]);
    this.targetCameraPos = new THREE.Vector3(
      targetPos[0] * 0.5,
      targetPos[1] + (focusCfg.elevation || 0),
      focusCfg.distance || 2.2
    );

    this.isCameraLerping = true;
  }

  resetCamera() {
    this.selectedItemId = null;
    this.stopGuidedTour();

    document.querySelectorAll(".ppe-card").forEach((c) => {
      c.classList.remove("ppe-card--active");
      c.setAttribute("aria-selected", "false");
    });

    this.css2dObjects.forEach((entry) => {
      entry.element.classList.remove("marker--active");
    });

    const panel = document.getElementById("ppe-inspection-panel");
    if (panel) {
      panel.classList.remove("ppe-panel--visible");
    }

    if (this.camera && this.controls) {
      this.targetCameraPos = this.initialCameraPosition.clone();
      this.targetControlsTarget = this.initialControlsTarget.clone();
      this.isCameraLerping = true;
    }

    if (this.onSelectionChange) {
      this.onSelectionChange(null, null);
    }
  }

  toggleGuidedTour() {
    if (this.tourActive) {
      this.stopGuidedTour();
    } else {
      this.startGuidedTour();
    }
  }

  startGuidedTour() {
    this.tourActive = true;
    this.tourIndex = 0;
    const tourBtn = document.getElementById("ppe-start-tour");
    if (tourBtn) {
      tourBtn.classList.add("btn-active");
      tourBtn.innerHTML = '<i class="fas fa-pause"></i> <span>Pausar Recorrido</span>';
    }
    this.runTourStep();
  }

  runTourStep() {
    if (!this.tourActive) return;
    const item = this.itemsConfig[this.tourIndex];
    if (item) {
      this.selectItem(item.id, { source: "tour" });
    }

    this.tourTimer = setTimeout(() => {
      if (!this.tourActive) return;
      this.tourIndex = (this.tourIndex + 1) % this.itemsConfig.length;
      this.runTourStep();
    }, 6000);
  }

  stopGuidedTour() {
    this.tourActive = false;
    if (this.tourTimer) {
      clearTimeout(this.tourTimer);
      this.tourTimer = null;
    }
    const tourBtn = document.getElementById("ppe-start-tour");
    if (tourBtn) {
      tourBtn.classList.remove("btn-active");
      tourBtn.innerHTML = '<i class="fas fa-play"></i> <span>Recorrido Guiado</span>';
    }
  }

  update(deltaTime = 0.016) {
    if (this.isCameraLerping && this.camera && this.controls && this.targetCameraPos && this.targetControlsTarget) {
      const lerpSpeed = 0.08;
      this.camera.position.lerp(this.targetCameraPos, lerpSpeed);
      this.controls.target.lerp(this.targetControlsTarget, lerpSpeed);
      this.controls.update();

      if (
        this.camera.position.distanceTo(this.targetCameraPos) < 0.01 &&
        this.controls.target.distanceTo(this.targetControlsTarget) < 0.01
      ) {
        this.camera.position.copy(this.targetCameraPos);
        this.controls.target.copy(this.targetControlsTarget);
        this.isCameraLerping = false;
      }
    }
  }

  render(scene, camera) {
    if (this.labelRenderer) {
      this.labelRenderer.render(scene || this.scene, camera || this.camera);
    }
  }

  onResize(width, height) {
    if (this.labelRenderer) {
      this.labelRenderer.setSize(width, height);
    }
  }

  destroy() {
    this.stopGuidedTour();
    if (this.labelRenderer && this.labelRenderer.domElement && this.labelRenderer.domElement.parentNode) {
      this.labelRenderer.domElement.parentNode.removeChild(this.labelRenderer.domElement);
    }
  }
}
