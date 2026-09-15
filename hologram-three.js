import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

const viewport = document.querySelector("[data-hologram]");
const canvas = document.querySelector("[data-hologram-canvas]");
const binaryLayer = document.querySelector("[data-hologram-binary]");
const placeholder = document.querySelector("[data-hologram-placeholder]");

if (viewport && canvas) {
  let ppeManager = null;
  let lastWidth = 0;
  let lastHeight = 0;
  const settings = {
    bloomStrength: 0.175,
    bloomRadius: 0.084,
    bloomThreshold: 0.65,
    opacity: 0.024,
    fresnel: 0.7,
    wireframeOpacity: 0.06,
    scanIntensity: 0.04,
    autoRotateSpeed: 0.35,
  };

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.01, 100);
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  // Scene lighting for realistic standard PBR materials (PPE equipment)
  // Human hologram utilizes custom unlit ShaderMaterial, unaffected by scene lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.35);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
  keyLight.position.set(4, 5, 5);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0x40c4ff, 1.4);
  fillLight.position.set(-4, -2, -3);
  scene.add(fillLight);

  const rimLight = new THREE.DirectionalLight(0x00e5ff, 1.6);
  rimLight.position.set(0, 4, -5);
  scene.add(rimLight);

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), settings.bloomStrength, settings.bloomRadius, settings.bloomThreshold);
  composer.addPass(bloom);

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.enableZoom = true;
  controls.minDistance = 1.2;
  controls.maxDistance = 9;
  controls.minPolarAngle = Math.PI * 0.25;
  controls.maxPolarAngle = Math.PI * 0.75;
  controls.autoRotate = true;
  controls.autoRotateSpeed = settings.autoRotateSpeed;
  controls.target.set(0, 0, 0);

  const hologram = new THREE.Group();
  scene.add(hologram);
  let mixer = null;
  const uniforms = {
    uTime: { value: 0 },
    uOpacity: { value: settings.opacity },
    uFresnel: { value: settings.fresnel },
    uScan: { value: settings.scanIntensity },
  };
  const edgeMaterials = [];

  const vertexShader = `
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -viewPosition.xyz;
      gl_Position = projectionMatrix * viewPosition;
    }
  `;
  const fragmentShader = `
    uniform float uTime;
    uniform float uOpacity;
    uniform float uFresnel;
    uniform float uScan;
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    void main() {
      vec3 viewDirection = normalize(vViewPosition);
      float facing = abs(dot(normalize(vNormal), viewDirection));
      float rim = 1.0 - smoothstep(0.42, 0.92, facing);
      float scan = 1.0 - uScan * (0.5 + 0.5 * sin(vViewPosition.y * 14.0 - uTime * 3.0));
      float pulse = 0.98 + 0.02 * sin(uTime * 2.0 + vViewPosition.y * 2.0);
      vec3 surface = vec3(0.0002, 0.0035, 0.008);
      gl_FragColor = vec4(surface, uOpacity * scan * pulse * (0.55 + rim * 0.45));
    }
  `;
  const fresnelFragmentShader = `
    uniform float uTime;
    uniform float uFresnel;
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    void main() {
      vec3 viewDirection = normalize(vViewPosition);
      float facing = abs(dot(normalize(vNormal), viewDirection));
      float rim = 1.0 - smoothstep(0.42, 0.92, facing);
      float fresnel = pow(rim, 2.8) * uFresnel;
      float pulse = 0.98 + 0.02 * sin(uTime * 2.0 + vViewPosition.y * 2.0);
      gl_FragColor = vec4(vec3(0.01, 0.62, 0.86) * fresnel, fresnel * pulse * 0.72);
    }
  `;

  const surfaceMaterial = () => new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.NormalBlending,
  });
  const fresnelMaterial = () => new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader: fresnelFragmentShader,
    transparent: true,
    side: THREE.BackSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const edgeMaterial = () => {
    const material = new THREE.LineBasicMaterial({
    color: "#3bdfff",
    transparent: true,
    opacity: settings.wireframeOpacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    });
    edgeMaterials.push(material);
    return material;
  };
  const normalizeModel = (model) => {
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const scale = 4.05 / Math.max(size.y, 0.001);
    model.scale.setScalar(scale);
    model.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
  };
  new GLTFLoader().load("assets/models/human.glb", (gltf) => {
    hologram.clear();
    const meshes = [];
    gltf.scene.traverse((object) => {
      if (object.isMesh) meshes.push(object);
    });
    meshes.forEach((object) => {
      object.material = surfaceMaterial();
      const outer = new THREE.Mesh(object.geometry, fresnelMaterial());
      outer.scale.setScalar(1.01);
      object.add(outer);
      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(object.geometry, 30), edgeMaterial());
      object.add(edges);
    });
    normalizeModel(gltf.scene);
    hologram.add(gltf.scene);
    if (gltf.animations.length) {
      mixer = new THREE.AnimationMixer(gltf.scene);
      mixer.clipAction(gltf.animations[0]).play();
    }
    frameModel(gltf.scene);
    viewport.dataset.hologramStatus = "loaded";
    placeholder?.remove();
  }, undefined, () => {
    if (placeholder) placeholder.textContent = "Modelo hologr?fico pendiente";
    viewport.dataset.hologramStatus = "missing";
  });

  function frameModel(model) {
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const height = Math.max(size.y, 0.1);
    const fov = THREE.MathUtils.degToRad(camera.fov);
    camera.position.set(0, center.y, Math.max(height / (2 * Math.tan(fov / 2)) * 1.16, 3.8));
    camera.near = Math.max(0.01, height / 100);
    camera.far = Math.max(50, height * 8);
    camera.updateProjectionMatrix();
    controls.target.copy(center);
    controls.minDistance = height * 0.35;
    controls.maxDistance = height * 2.1;
    controls.update();

    if (ppeManager) {
      ppeManager.initialCameraPosition = camera.position.clone();
      ppeManager.initialControlsTarget = controls.target.clone();
    }
  }
  frameModel(hologram);

  // Initialize PPEManager via dynamic import to prevent any loading error from blocking the human hologram
  import("./ppe-manager.js").then(({ PPEManager }) => {
    ppeManager = new PPEManager({
      scene,
      camera,
      renderer,
      controls,
      container: viewport,
      onSelectionChange: (item, status) => {
        controls.autoRotate = !item;
      }
    });
    if (lastWidth && lastHeight) {
      ppeManager.onResize(lastWidth, lastHeight);
    }
  }).catch((err) => {
    console.warn("[Hologram] PPEManager dynamic load fallback:", err);
  });

  const particles = new THREE.BufferGeometry();
  const positions = new Float32Array(360 * 3);
  for (let i = 0; i < positions.length; i += 3) {
    positions[i] = (Math.random() - 0.5) * 7;
    positions[i + 1] = Math.random() * 5 - 0.8;
    positions[i + 2] = (Math.random() - 0.5) * 3;
  }
  particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  scene.add(new THREE.Points(particles, new THREE.PointsMaterial({ color: "#2bdcff", size: 0.015, transparent: true, opacity: 0.45, blending: THREE.AdditiveBlending })));

  if (binaryLayer) {
    binaryLayer.innerHTML = Array.from({ length: 18 }, (_, index) =>
      `<span style="--column:${index};--delay:${(Math.random() * -8).toFixed(2)}s">${Array.from({ length: 8 }, () => Math.round(Math.random())).join("<br>")}</span>`
    ).join("");
  }

  const resize = () => {
    const { width, height } = viewport.getBoundingClientRect();
    renderer.setSize(width, height, false);
    composer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    lastWidth = width;
    lastHeight = height;
    ppeManager?.onResize(width, height);
  };
  new ResizeObserver(resize).observe(viewport);
  resize();

  const clock = new THREE.Clock();
  const animate = () => {
    const delta = clock.getDelta();
    uniforms.uTime.value += delta;
    mixer?.update(delta);
    controls.update();
    ppeManager?.update(delta);

    const cameraDistance = camera.position.distanceTo(controls.target);
    const wireframeVisibility = THREE.MathUtils.smoothstep(
      cameraDistance,
      controls.minDistance * 1.08,
      controls.maxDistance * 0.72,
    );
    edgeMaterials.forEach((material) => {
      material.opacity = settings.wireframeOpacity * (1 - wireframeVisibility);
    });

    composer.render();
    ppeManager?.render(scene, camera);

    requestAnimationFrame(animate);
  };
  animate();
  viewport.dataset.hologramReady = "true";
}
