import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';

interface Building {
  id: string;
  name: string;
  x: number;
  z: number;
  color: number;
  glowColor: number;
}

interface PlanetGameProps {
  onBuildingProximity: (buildingId: string | null) => void;
}

const MOVE_SPEED = 0.06;
const TURN_SPEED = 0.04;
const CAMERA_DISTANCE = 4;
const CAMERA_HEIGHT = 3;
const PROXIMITY_THRESHOLD = 2.5;
const GROUND_SIZE = 16;

const BUILDINGS: Building[] = [
  { id: 'hero', name: 'HQ TOWER', x: -3, z: -3, color: 0xff6b4a, glowColor: 0xff9e7a },
  { id: 'apps', name: 'APP STORE', x: 3, z: -2, color: 0x4ac8ff, glowColor: 0x7adcff },
  { id: 'opensource', name: 'OPEN SOURCE LAB', x: -4, z: 3, color: 0xff4a6b, glowColor: 0xff7a9e },
  { id: 'connect', name: 'CONNECT HUB', x: 4, z: 4, color: 0x4affdc, glowColor: 0x7affea },
  { id: 'interests', name: 'INTEREST DOME', x: 0, z: -5, color: 0xffdc4a, glowColor: 0xffea7a },
  { id: 'collab', name: 'COLLAB CENTER', x: -1, z: 5, color: 0xdc4aff, glowColor: 0xea7aff },
];

// ====== MERGED BUILDING (single geometry approach) ======
function createMergedBuilding(w: number, h: number, d: number, color: number, hasWindows: boolean): THREE.Group {
  const g = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(w, h, d),
    new THREE.MeshStandardMaterial({ color, roughness: 0.4, metalness: 0.2 })
  );
  body.position.y = h / 2;
  body.castShadow = true;
  g.add(body);

  if (hasWindows) {
    // Use a single texture-like approach: one plane per side with emissive window pattern
    const windowCanvas = document.createElement('canvas');
    windowCanvas.width = 64;
    windowCanvas.height = 128;
    const ctx = windowCanvas.getContext('2d')!;
    ctx.fillStyle = '#1a1a2a';
    ctx.fillRect(0, 0, 64, 128);
    const floors = Math.floor(h / 0.2);
    const cols = Math.max(2, Math.floor(w / 0.15));
    for (let f = 0; f < Math.min(floors, 12); f++) {
      for (let c = 0; c < Math.min(cols, 6); c++) {
        const lit = Math.random() > 0.25;
        ctx.fillStyle = lit ? (Math.random() > 0.5 ? '#ffe4a0' : '#80c8ff') : '#111122';
        const wx = (c / cols) * 56 + 4;
        const wy = (f / floors) * 118 + 5;
        ctx.fillRect(wx, wy, 56 / cols - 2, 118 / floors - 3);
      }
    }
    const winTex = new THREE.CanvasTexture(windowCanvas);
    winTex.magFilter = THREE.NearestFilter;
    const winMat = new THREE.MeshBasicMaterial({ map: winTex, transparent: true, opacity: 0.85 });

    // Front & back
    const frontPlane = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.95, h * 0.9), winMat);
    frontPlane.position.set(0, h / 2, d / 2 + 0.003);
    g.add(frontPlane);
    const backPlane = frontPlane.clone();
    backPlane.position.z = -d / 2 - 0.003;
    backPlane.rotation.y = Math.PI;
    g.add(backPlane);
  }

  // Roof
  const roof = new THREE.Mesh(
    new THREE.BoxGeometry(w * 1.05, 0.02, d * 1.05),
    new THREE.MeshStandardMaterial({ color: 0x444444 })
  );
  roof.position.y = h;
  g.add(roof);

  return g;
}

// ====== TOKYO TOWER (simplified) ======
function createTokyoTower(height: number): THREE.Group {
  const g = new THREE.Group();
  const legMat = new THREE.MeshStandardMaterial({ color: 0xff3311, roughness: 0.35, metalness: 0.3 });

  // 4 tapered legs as single cones
  for (let leg = 0; leg < 4; leg++) {
    const angle = (leg / 4) * Math.PI * 2 + Math.PI / 4;
    const legMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.02, 0.06, height, 6),
      legMat
    );
    legMesh.position.set(Math.cos(angle) * 0.25, height / 2, Math.sin(angle) * 0.25);
    // Tilt inward
    const tilt = 0.12;
    legMesh.rotation.z = Math.cos(angle) * tilt;
    legMesh.rotation.x = -Math.sin(angle) * tilt;
    g.add(legMesh);
  }

  // 3 horizontal rings
  [0.25, 0.45, 0.7].forEach(frac => {
    const r = 0.5 * (1 - frac) + 0.05 * frac;
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(r, 0.015, 4, 10),
      new THREE.MeshStandardMaterial({ color: 0xee2200, roughness: 0.4 })
    );
    ring.position.y = frac * height;
    ring.rotation.x = Math.PI / 2;
    g.add(ring);
  });

  // 2 observation decks
  [0.4, 0.65].forEach(frac => {
    const r = 0.5 * (1 - frac) + 0.05 * frac;
    const deck = new THREE.Mesh(
      new THREE.CylinderGeometry(r * 2, r * 1.6, 0.08, 12),
      new THREE.MeshStandardMaterial({ color: 0xdddddd, roughness: 0.3, metalness: 0.5 })
    );
    deck.position.y = frac * height;
    g.add(deck);
  });

  // Spire
  const spire = new THREE.Mesh(
    new THREE.CylinderGeometry(0.008, 0.025, height * 0.35, 6),
    new THREE.MeshStandardMaterial({ color: 0xeeeeee, metalness: 0.8 })
  );
  spire.position.y = height + height * 0.175;
  g.add(spire);

  // Blinking red bulb (no point light - use emissive only)
  const bulb = new THREE.Mesh(
    new THREE.SphereGeometry(0.03, 6, 6),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
  );
  bulb.position.y = height + height * 0.35;
  g.add(bulb);

  return g;
}

// ====== PLAYER CAR ======
function createPlayerCar(): THREE.Group {
  const car = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(0.4, 0.12, 0.2),
    new THREE.MeshStandardMaterial({ color: 0xeeeeee, roughness: 0.15, metalness: 0.6 })
  );
  body.position.y = 0.08;
  body.castShadow = true;
  car.add(body);

  const cabin = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 0.1, 0.17),
    new THREE.MeshStandardMaterial({ color: 0x88ccee, roughness: 0.05, metalness: 0.3, transparent: true, opacity: 0.6 })
  );
  cabin.position.set(-0.02, 0.19, 0);
  car.add(cabin);

  // 4 wheels as one instanced call would be overkill, just 4 meshes
  const wheelGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.04, 8);
  const wheelMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.7 });
  [[-0.12, -0.12], [-0.12, 0.12], [0.12, -0.12], [0.12, 0.12]].forEach(([x, z]) => {
    const w = new THREE.Mesh(wheelGeo, wheelMat);
    w.position.set(x, 0.04, z);
    w.rotation.x = Math.PI / 2;
    car.add(w);
  });

  // Headlights (emissive, no point light)
  const hlGeo = new THREE.SphereGeometry(0.02, 4, 4);
  const hlMat = new THREE.MeshBasicMaterial({ color: 0xffffcc });
  [-1, 1].forEach(z => {
    const hl = new THREE.Mesh(hlGeo, hlMat);
    hl.position.set(0.21, 0.08, z * 0.07);
    car.add(hl);
  });

  // Taillights
  const tlMat = new THREE.MeshBasicMaterial({ color: 0xff2200 });
  [-1, 1].forEach(z => {
    const tl = new THREE.Mesh(new THREE.SphereGeometry(0.015, 4, 4), tlMat);
    tl.position.set(-0.21, 0.08, z * 0.07);
    car.add(tl);
  });

  return car;
}

const PlanetGame = ({ onBuildingProximity }: PlanetGameProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const keysRef = useRef<Set<string>>(new Set());
  const charPosRef = useRef(new THREE.Vector3(0, 0, 0));
  const headingRef = useRef(0);
  const activeBuildingRef = useRef<string | null>(null);
  const joystickRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const joystickActiveRef = useRef(false);
  const joystickTouchIdRef = useRef<number | null>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent) => { keysRef.current.add(e.key.toLowerCase()); }, []);
  const handleKeyUp = useCallback((e: KeyboardEvent) => { keysRef.current.delete(e.key.toLowerCase()); }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ====== RENDERER ======
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // Cap pixel ratio for perf
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0e1a);
    scene.fog = new THREE.Fog(0x0a0e1a, 20, 60);

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);

    // ====== LIGHTING — only 4 lights total (huge perf gain) ======
    scene.add(new THREE.AmbientLight(0x445577, 0.5));

    const sunLight = new THREE.DirectionalLight(0xffcc88, 1.4);
    sunLight.position.set(8, 12, 5);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.set(2048, 2048);
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 40;
    sunLight.shadow.camera.left = -12;
    sunLight.shadow.camera.right = 12;
    sunLight.shadow.camera.top = 12;
    sunLight.shadow.camera.bottom = -12;
    sunLight.shadow.bias = -0.002;
    scene.add(sunLight);

    const warmFill = new THREE.DirectionalLight(0xff6633, 0.35);
    warmFill.position.set(-6, 3, 10);
    scene.add(warmFill);

    scene.add(new THREE.HemisphereLight(0x7788bb, 0x553322, 0.5));

    // ====== GROUND (floating island) ======
    const islandGeo = new THREE.CylinderGeometry(GROUND_SIZE / 2, GROUND_SIZE / 2 - 0.5, 2, 32);
    const groundCanvas = document.createElement('canvas');
    groundCanvas.width = 1024; // Lower res for perf
    groundCanvas.height = 1024;
    const gCtx = groundCanvas.getContext('2d')!;

    // Green base
    const grad = gCtx.createRadialGradient(512, 512, 0, 512, 512, 512);
    grad.addColorStop(0, '#4a7a3f');
    grad.addColorStop(0.6, '#3a6830');
    grad.addColorStop(1, '#1d4518');
    gCtx.fillStyle = grad;
    gCtx.fillRect(0, 0, 1024, 1024);

    // Roads
    gCtx.strokeStyle = '#444444';
    gCtx.lineWidth = 16;
    gCtx.beginPath(); gCtx.moveTo(50, 512); gCtx.lineTo(974, 512); gCtx.stroke();
    gCtx.beginPath(); gCtx.moveTo(512, 50); gCtx.lineTo(512, 974); gCtx.stroke();
    gCtx.beginPath(); gCtx.arc(512, 512, 280, 0, Math.PI * 2); gCtx.stroke();

    // Road markings
    gCtx.strokeStyle = '#888855';
    gCtx.lineWidth = 1;
    gCtx.setLineDash([6, 8]);
    gCtx.beginPath(); gCtx.moveTo(50, 512); gCtx.lineTo(974, 512); gCtx.stroke();
    gCtx.beginPath(); gCtx.moveTo(512, 50); gCtx.lineTo(512, 974); gCtx.stroke();
    gCtx.setLineDash([]);

    // Grass noise
    for (let i = 0; i < 8000; i++) {
      const x = Math.random() * 1024;
      const y = Math.random() * 1024;
      gCtx.fillStyle = `rgba(${30 + Math.random() * 40}, ${70 + Math.random() * 50}, ${20 + Math.random() * 20}, 0.1)`;
      gCtx.fillRect(x, y, 1, 2);
    }

    const groundTex = new THREE.CanvasTexture(groundCanvas);
    const island = new THREE.Mesh(islandGeo, new THREE.MeshStandardMaterial({
      map: groundTex, roughness: 0.85, metalness: 0.05,
    }));
    island.position.y = -1;
    island.receiveShadow = true;
    scene.add(island);

    // Hanging rocks under island (instanced)
    const rockGeo = new THREE.ConeGeometry(0.5, 1.5, 5);
    const rockMat = new THREE.MeshStandardMaterial({ color: 0x5a4a3a, roughness: 0.9 });
    const rockInstanced = new THREE.InstancedMesh(rockGeo, rockMat, 12);
    const dummy = new THREE.Object3D();
    for (let i = 0; i < 12; i++) {
      const rx = (Math.random() - 0.5) * GROUND_SIZE * 0.7;
      const rz = (Math.random() - 0.5) * GROUND_SIZE * 0.7;
      if (Math.sqrt(rx * rx + rz * rz) > GROUND_SIZE / 2 - 1) continue;
      const rh = 0.5 + Math.random() * 1.5;
      dummy.position.set(rx, -2 - rh / 2, rz);
      dummy.rotation.set(Math.PI, 0, 0);
      dummy.scale.set(0.3 + Math.random() * 0.5, 0.5 + Math.random(), 0.3 + Math.random() * 0.5);
      dummy.updateMatrix();
      rockInstanced.setMatrixAt(i, dummy.matrix);
    }
    scene.add(rockInstanced);

    // ====== RIVER (single tube) ======
    const riverPoints: THREE.Vector3[] = [];
    for (let i = 0; i <= 30; i++) {
      const t = i / 30;
      riverPoints.push(new THREE.Vector3(-6 + t * 12, 0.01, Math.sin(t * Math.PI * 2.5) * 1.5 + 1));
    }
    const river = new THREE.Mesh(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(riverPoints), 60, 0.3, 6, false),
      new THREE.MeshStandardMaterial({ color: 0x1177aa, roughness: 0.05, metalness: 0.4, transparent: true, opacity: 0.7 })
    );
    scene.add(river);

    // ====== BRIDGES (3, simple) ======
    const bridgeMat = new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.4, metalness: 0.4 });
    const railMat = new THREE.MeshStandardMaterial({ color: 0xcc2211, metalness: 0.5 });
    [{ x: -3, z: 1.2, rot: 0.3 }, { x: 0, z: 1, rot: 0 }, { x: 3, z: 0.5, rot: -0.2 }].forEach(({ x, z, rot }) => {
      const bg = new THREE.Group();
      bg.position.set(x, 0.08, z);
      bg.rotation.y = rot;
      bg.add(new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.04, 0.6), bridgeMat));
      // Simple railings - just 2 rails per side
      [-1, 1].forEach(side => {
        const rail = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.005, 0.005), railMat);
        rail.position.set(0, 0.12, side * 0.27);
        bg.add(rail);
      });
      scene.add(bg);
    });

    // ====== TOKYO TOWER ======
    const tokyoTower = createTokyoTower(4);
    tokyoTower.position.set(2, 0, -5);
    scene.add(tokyoTower);

    // ====== MAIN BUILDINGS (6 resume sections) ======
    const buildingMeshes: { id: string; position: THREE.Vector3 }[] = [];

    BUILDINGS.forEach((b) => {
      const heights = { hero: 2.5, apps: 0.9, opensource: 2, connect: 1.8, interests: 0.7, collab: 1.5 };
      const h = heights[b.id as keyof typeof heights] || 1.5;
      const building = createMergedBuilding(0.8, h, 0.6, b.color, true);
      building.position.set(b.x, 0, b.z);
      scene.add(building);

      // Label sprite
      const canvas = document.createElement('canvas');
      canvas.width = 256; canvas.height = 64;
      const ctx = canvas.getContext('2d')!;
      ctx.font = 'bold 18px monospace';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#ffe4a0';
      ctx.shadowColor = '#ff6622';
      ctx.shadowBlur = 10;
      ctx.fillText(b.name, 128, 40);
      const spriteMat = new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(canvas), transparent: true, opacity: 0.9 });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.scale.set(1.5, 0.45, 1);
      sprite.position.set(b.x, h + 0.6, b.z);
      scene.add(sprite);

      buildingMeshes.push({ id: b.id, position: new THREE.Vector3(b.x, 0, b.z) });
    });

    // ====== FILLER BUILDINGS — INSTANCED (single draw call!) ======
    const fillerCount = 60;
    const fillerGeo = new THREE.BoxGeometry(1, 1, 1); // Unit cube, scaled per instance
    const fillerMat = new THREE.MeshStandardMaterial({ color: 0x887766, roughness: 0.5, metalness: 0.15 });
    const fillerInstanced = new THREE.InstancedMesh(fillerGeo, fillerMat, fillerCount);
    fillerInstanced.castShadow = true;
    fillerInstanced.receiveShadow = true;

    // Window texture for filler buildings (one shared canvas)
    const winCanvas = document.createElement('canvas');
    winCanvas.width = 32;
    winCanvas.height = 64;
    const wCtx = winCanvas.getContext('2d')!;
    wCtx.fillStyle = '#2a2a3a';
    wCtx.fillRect(0, 0, 32, 64);
    for (let f = 0; f < 8; f++) {
      for (let c = 0; c < 3; c++) {
        const lit = Math.random() > 0.3;
        wCtx.fillStyle = lit ? (Math.random() > 0.5 ? '#ffe4a0' : '#80c8ff') : '#111118';
        wCtx.fillRect(c * 10 + 2, f * 8 + 1, 7, 5);
      }
    }
    const winTex = new THREE.CanvasTexture(winCanvas);
    winTex.magFilter = THREE.NearestFilter;

    // Window planes instanced too
    const winPlaneGeo = new THREE.PlaneGeometry(1, 1);
    const winPlaneMat = new THREE.MeshBasicMaterial({ map: winTex, transparent: true, opacity: 0.85 });
    const winFrontInstanced = new THREE.InstancedMesh(winPlaneGeo, winPlaneMat, fillerCount);
    const winBackInstanced = new THREE.InstancedMesh(winPlaneGeo, winPlaneMat, fillerCount);

    let fillerIdx = 0;
    for (let i = 0; i < 120 && fillerIdx < fillerCount; i++) {
      const x = (Math.random() - 0.5) * (GROUND_SIZE - 3);
      const z = (Math.random() - 0.5) * (GROUND_SIZE - 3);
      if (Math.sqrt(x * x + z * z) > GROUND_SIZE / 2 - 1.5) continue;

      let skip = false;
      for (const b of BUILDINGS) {
        if (Math.hypot(x - b.x, z - b.z) < 1.5) { skip = true; break; }
      }
      if (Math.abs(z - Math.sin(((x + 6) / 12) * Math.PI * 2.5) * 1.5 - 1) < 0.6) skip = true;
      if (skip) continue;

      const h = 0.3 + Math.random() * 1.2;
      const w = 0.2 + Math.random() * 0.4;
      const d = 0.2 + Math.random() * 0.3;

      dummy.position.set(x, h / 2, z);
      dummy.scale.set(w, h, d);
      dummy.rotation.set(0, Math.random() * 0.3, 0);
      dummy.updateMatrix();
      fillerInstanced.setMatrixAt(fillerIdx, dummy.matrix);
      fillerInstanced.setColorAt(fillerIdx, new THREE.Color().setHSL(
        0.06 + Math.random() * 0.08, 0.15 + Math.random() * 0.2, 0.4 + Math.random() * 0.25
      ));

      // Window front plane
      dummy.position.set(x, h / 2, z + d / 2 + 0.003);
      dummy.scale.set(w * 0.9, h * 0.85, 1);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      winFrontInstanced.setMatrixAt(fillerIdx, dummy.matrix);

      // Window back plane
      dummy.position.set(x, h / 2, z - d / 2 - 0.003);
      dummy.rotation.set(0, Math.PI, 0);
      dummy.updateMatrix();
      winBackInstanced.setMatrixAt(fillerIdx, dummy.matrix);

      fillerIdx++;
    }
    fillerInstanced.count = fillerIdx;
    winFrontInstanced.count = fillerIdx;
    winBackInstanced.count = fillerIdx;
    if (fillerInstanced.instanceColor) fillerInstanced.instanceColor.needsUpdate = true;
    scene.add(fillerInstanced);
    scene.add(winFrontInstanced);
    scene.add(winBackInstanced);

    // ====== STREET LAMPS — instanced (no point lights!) ======
    const lampPoleGeo = new THREE.CylinderGeometry(0.02, 0.025, 0.8, 4);
    const lampPoleMat = new THREE.MeshStandardMaterial({ color: 0x444444, metalness: 0.7 });
    const lampPoleInstanced = new THREE.InstancedMesh(lampPoleGeo, lampPoleMat, 25);
    const lampHeadGeo = new THREE.SphereGeometry(0.04, 6, 4);
    const lampHeadMat = new THREE.MeshBasicMaterial({ color: 0xffeebb }); // Emissive, no point light
    const lampHeadInstanced = new THREE.InstancedMesh(lampHeadGeo, lampHeadMat, 25);

    let lampIdx = 0;
    for (let i = 0; i < 60 && lampIdx < 25; i++) {
      const x = (Math.random() - 0.5) * (GROUND_SIZE - 3);
      const z = (Math.random() - 0.5) * (GROUND_SIZE - 3);
      if (Math.sqrt(x * x + z * z) > GROUND_SIZE / 2 - 1.5) continue;

      dummy.position.set(x, 0.4, z);
      dummy.scale.set(1, 1, 1);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      lampPoleInstanced.setMatrixAt(lampIdx, dummy.matrix);

      dummy.position.set(x, 0.82, z);
      dummy.updateMatrix();
      lampHeadInstanced.setMatrixAt(lampIdx, dummy.matrix);

      lampIdx++;
    }
    lampPoleInstanced.count = lampIdx;
    lampHeadInstanced.count = lampIdx;
    scene.add(lampPoleInstanced);
    scene.add(lampHeadInstanced);

    // ====== CHERRY BLOSSOM TREES — instanced trunks + canopies ======
    const trunkGeo = new THREE.CylinderGeometry(0.04, 0.06, 0.5, 5);
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5a3828, roughness: 0.9 });
    const trunkInstanced = new THREE.InstancedMesh(trunkGeo, trunkMat, 20);
    const canopyGeo = new THREE.SphereGeometry(0.2, 6, 4);
    const canopyMat = new THREE.MeshStandardMaterial({ color: 0xff99bb, roughness: 0.8, transparent: true, opacity: 0.8 });
    const canopyInstanced = new THREE.InstancedMesh(canopyGeo, canopyMat, 40);

    let treeIdx = 0;
    let canopyIdx = 0;
    for (let i = 0; i < 50 && treeIdx < 20; i++) {
      const x = (Math.random() - 0.5) * (GROUND_SIZE - 4);
      const z = (Math.random() - 0.5) * (GROUND_SIZE - 4);
      if (Math.sqrt(x * x + z * z) > GROUND_SIZE / 2 - 2) continue;
      let skip = false;
      for (const b of BUILDINGS) {
        if (Math.hypot(x - b.x, z - b.z) < 1.5) { skip = true; break; }
      }
      if (skip) continue;

      dummy.position.set(x, 0.25, z);
      dummy.scale.set(1, 1, 1);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      trunkInstanced.setMatrixAt(treeIdx, dummy.matrix);

      // 2 canopy blobs per tree
      for (let c = 0; c < 2 && canopyIdx < 40; c++) {
        dummy.position.set(x + (Math.random() - 0.5) * 0.1, 0.55 + c * 0.12, z + (Math.random() - 0.5) * 0.1);
        dummy.scale.set(0.8 + Math.random() * 0.4, 0.7 + Math.random() * 0.3, 0.8 + Math.random() * 0.4);
        dummy.updateMatrix();
        canopyInstanced.setMatrixAt(canopyIdx, dummy.matrix);
        const isCherryBlossom = Math.random() > 0.3;
        canopyInstanced.setColorAt(canopyIdx, new THREE.Color(
          isCherryBlossom ? [0xff88aa, 0xff99bb, 0xffaacc][Math.floor(Math.random() * 3)] : 0x44aa55
        ));
        canopyIdx++;
      }
      treeIdx++;
    }
    trunkInstanced.count = treeIdx;
    canopyInstanced.count = canopyIdx;
    if (canopyInstanced.instanceColor) canopyInstanced.instanceColor.needsUpdate = true;
    canopyInstanced.castShadow = true;
    scene.add(trunkInstanced);
    scene.add(canopyInstanced);

    // ====== ELEVATED TRAIN TRACK ======
    const trackRadius = 5.5;
    const trackHeight = 0.6;
    const trackSegs = 80;

    // Pillars (instanced)
    const pillarGeo = new THREE.CylinderGeometry(0.04, 0.05, trackHeight, 5);
    const pillarMat = new THREE.MeshStandardMaterial({ color: 0x777777, metalness: 0.5 });
    const pillarInstanced = new THREE.InstancedMesh(pillarGeo, pillarMat, 20);
    for (let i = 0; i < 20; i++) {
      const angle = (i / 20) * Math.PI * 2;
      dummy.position.set(Math.cos(angle) * trackRadius, trackHeight / 2, Math.sin(angle) * trackRadius);
      dummy.scale.set(1, 1, 1);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      pillarInstanced.setMatrixAt(i, dummy.matrix);
    }
    pillarInstanced.castShadow = true;
    scene.add(pillarInstanced);

    // Track bed (single tube)
    const trackPoints: THREE.Vector3[] = [];
    for (let i = 0; i <= trackSegs; i++) {
      const angle = (i / trackSegs) * Math.PI * 2;
      trackPoints.push(new THREE.Vector3(Math.cos(angle) * trackRadius, trackHeight, Math.sin(angle) * trackRadius));
    }
    const trackBed = new THREE.Mesh(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(trackPoints, true), 150, 0.1, 5, true),
      new THREE.MeshStandardMaterial({ color: 0x666666, roughness: 0.5, metalness: 0.4 })
    );
    scene.add(trackBed);

    // ====== TRAINS (simple: just a colored box + cabin per car) ======
    const createSimpleTrain = (color: number, cars: number) => {
      const train = new THREE.Group();
      for (let i = 0; i < cars; i++) {
        const carMesh = new THREE.Mesh(
          new THREE.BoxGeometry(0.5, 0.16, 0.16),
          new THREE.MeshStandardMaterial({ color: i === 0 ? color : new THREE.Color(color).offsetHSL(0, -0.05, 0.03).getHex(), roughness: 0.3, metalness: 0.4 })
        );
        carMesh.position.set(-i * 0.52, 0.08, 0);
        carMesh.castShadow = true;
        train.add(carMesh);

        // Window stripe (single mesh)
        const winStripe = new THREE.Mesh(
          new THREE.BoxGeometry(0.48, 0.06, 0.165),
          new THREE.MeshBasicMaterial({ color: 0xddeeff, transparent: true, opacity: 0.4 })
        );
        winStripe.position.set(-i * 0.52, 0.1, 0);
        train.add(winStripe);
      }
      return train;
    };

    const train1 = createSimpleTrain(0x226644, 4);
    const train2 = createSimpleTrain(0xcc3311, 3);
    scene.add(train1);
    scene.add(train2);

    // ====== NPC CARS — instanced ======
    const npcCount = 8;
    const npcGeo = new THREE.BoxGeometry(0.3, 0.1, 0.14);
    const npcMat = new THREE.MeshStandardMaterial({ color: 0xcc4444, roughness: 0.3, metalness: 0.4 });
    const npcInstanced = new THREE.InstancedMesh(npcGeo, npcMat, npcCount);
    npcInstanced.castShadow = true;
    const npcData: { radius: number; speed: number; offset: number }[] = [];
    const carColors = [0xcc2222, 0x2255cc, 0xffcc00, 0x22cc44, 0xffffff, 0x222222, 0xff6600, 0xdd44aa];
    for (let i = 0; i < npcCount; i++) {
      npcData.push({
        radius: 2 + Math.random() * 4,
        speed: 0.15 + Math.random() * 0.25,
        offset: Math.random() * Math.PI * 2,
      });
      npcInstanced.setColorAt(i, new THREE.Color(carColors[i % carColors.length]));
    }
    if (npcInstanced.instanceColor) npcInstanced.instanceColor.needsUpdate = true;
    scene.add(npcInstanced);

    // ====== PLAYER CAR ======
    const playerCar = createPlayerCar();
    scene.add(playerCar);

    // ====== CHERRY BLOSSOM PETALS (points) ======
    const petalCount = 400;
    const petalPositions = new Float32Array(petalCount * 3);
    const petalVels: Float32Array = new Float32Array(petalCount * 3);
    for (let i = 0; i < petalCount; i++) {
      petalPositions[i * 3] = (Math.random() - 0.5) * GROUND_SIZE;
      petalPositions[i * 3 + 1] = 1 + Math.random() * 5;
      petalPositions[i * 3 + 2] = (Math.random() - 0.5) * GROUND_SIZE;
      petalVels[i * 3] = (Math.random() - 0.5) * 0.005;
      petalVels[i * 3 + 1] = -0.003 - Math.random() * 0.003;
      petalVels[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }
    const petalGeo = new THREE.BufferGeometry();
    petalGeo.setAttribute('position', new THREE.BufferAttribute(petalPositions, 3));
    const petals = new THREE.Points(petalGeo, new THREE.PointsMaterial({
      size: 0.05, color: 0xffaacc, transparent: true, opacity: 0.5
    }));
    scene.add(petals);

    // ====== CLOUDS (few simple spheres, no separate meshes) ======
    const cloudGeo = new THREE.SphereGeometry(0.8, 6, 4);
    const cloudMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.15, depthWrite: false });
    const cloudInstanced = new THREE.InstancedMesh(cloudGeo, cloudMat, 10);
    const cloudAngles: number[] = [];
    for (let i = 0; i < 10; i++) {
      dummy.position.set(
        (Math.random() - 0.5) * GROUND_SIZE * 1.3,
        4 + Math.random() * 3,
        (Math.random() - 0.5) * GROUND_SIZE * 1.3
      );
      dummy.scale.set(1 + Math.random(), 0.3 + Math.random() * 0.2, 0.6 + Math.random() * 0.4);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      cloudInstanced.setMatrixAt(i, dummy.matrix);
      cloudAngles.push(Math.random() * Math.PI * 2);
    }
    scene.add(cloudInstanced);

    // ====== STARFIELD ======
    const starCount = 2000;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const r = 50 + Math.random() * 80;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      starPositions[i * 3] = r * Math.sin(p) * Math.cos(t);
      starPositions[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
      starPositions[i * 3 + 2] = r * Math.cos(p);
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ size: 0.1, color: 0xccccff, transparent: true, opacity: 0.6 })));

    // ====== ANIMATION ======
    const clock = new THREE.Clock();
    let animId: number;
    const camPosSmooth = new THREE.Vector3(0, CAMERA_HEIGHT, CAMERA_DISTANCE);
    let camInitialized = false;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Input
      const keys = keysRef.current;
      let moveForward = 0;
      let turnInput = 0;
      if (keys.has('w') || keys.has('arrowup')) moveForward += 1;
      if (keys.has('s') || keys.has('arrowdown')) moveForward -= 1;
      if (keys.has('a') || keys.has('arrowleft')) turnInput -= 1;
      if (keys.has('d') || keys.has('arrowright')) turnInput += 1;

      if (joystickActiveRef.current) {
        moveForward += -joystickRef.current.y;
        turnInput += joystickRef.current.x;
      }
      moveForward = Math.max(-1, Math.min(1, moveForward));
      turnInput = Math.max(-1, Math.min(1, turnInput));
      headingRef.current += turnInput * TURN_SPEED;

      // Move car
      if (Math.abs(moveForward) > 0.01) {
        const dir = new THREE.Vector3(Math.sin(headingRef.current), 0, Math.cos(headingRef.current));
        charPosRef.current.addScaledVector(dir, moveForward * MOVE_SPEED);
        const dist = Math.sqrt(charPosRef.current.x ** 2 + charPosRef.current.z ** 2);
        if (dist > GROUND_SIZE / 2 - 0.5) {
          charPosRef.current.x *= (GROUND_SIZE / 2 - 0.5) / dist;
          charPosRef.current.z *= (GROUND_SIZE / 2 - 0.5) / dist;
        }
      }

      playerCar.position.set(charPosRef.current.x, 0.02, charPosRef.current.z);
      playerCar.rotation.y = -headingRef.current;
      playerCar.rotation.z = -turnInput * 0.05;

      // Camera
      const camDir = new THREE.Vector3(-Math.sin(headingRef.current), 0, -Math.cos(headingRef.current));
      const targetCam = new THREE.Vector3(
        charPosRef.current.x + camDir.x * CAMERA_DISTANCE,
        CAMERA_HEIGHT,
        charPosRef.current.z + camDir.z * CAMERA_DISTANCE
      );
      if (!camInitialized) { camPosSmooth.copy(targetCam); camInitialized = true; }
      else camPosSmooth.lerp(targetCam, 0.08);
      camera.position.copy(camPosSmooth);
      camera.lookAt(charPosRef.current.x, 0.3, charPosRef.current.z);

      // Trains
      [{ train: train1, speed: 0.2, offset: 0 }, { train: train2, speed: 0.15, offset: Math.PI }].forEach(({ train, speed, offset }) => {
        const angle = time * speed + offset;
        train.position.set(Math.cos(angle) * trackRadius, trackHeight + 0.1, Math.sin(angle) * trackRadius);
        const na = angle + 0.05;
        train.lookAt(Math.cos(na) * trackRadius, trackHeight + 0.1, Math.sin(na) * trackRadius);
      });

      // NPC cars (update instanced matrices)
      for (let i = 0; i < npcCount; i++) {
        const { radius, speed, offset } = npcData[i];
        const angle = time * speed + offset;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const na = angle + 0.05;
        dummy.position.set(x, 0.05, z);
        dummy.scale.set(1, 1, 1);
        dummy.lookAt(Math.cos(na) * radius, 0.05, Math.sin(na) * radius);
        dummy.updateMatrix();
        npcInstanced.setMatrixAt(i, dummy.matrix);
      }
      npcInstanced.instanceMatrix.needsUpdate = true;

      // Petals
      const pAttr = petals.geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < petalCount; i++) {
        let px = pAttr.getX(i) + petalVels[i * 3];
        let py = pAttr.getY(i) + petalVels[i * 3 + 1];
        let pz = pAttr.getZ(i) + petalVels[i * 3 + 2];
        px += Math.sin(time * 0.5 + i * 0.1) * 0.001;
        if (py < 0) {
          px = (Math.random() - 0.5) * GROUND_SIZE;
          py = 4 + Math.random() * 3;
          pz = (Math.random() - 0.5) * GROUND_SIZE;
        }
        pAttr.setXYZ(i, px, py, pz);
      }
      pAttr.needsUpdate = true;

      // Building proximity
      let closestBuilding: string | null = null;
      let closestDist = PROXIMITY_THRESHOLD;
      for (const b of buildingMeshes) {
        const d = Math.hypot(charPosRef.current.x - b.position.x, charPosRef.current.z - b.position.z);
        if (d < closestDist) { closestDist = d; closestBuilding = b.id; }
      }
      if (closestBuilding !== activeBuildingRef.current) {
        activeBuildingRef.current = closestBuilding;
        onBuildingProximity(closestBuilding);
      }

      renderer.render(scene, camera);
    };

    animate();

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('resize', handleResize);
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.InstancedMesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
          else obj.material.dispose();
        }
      });
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, [handleKeyDown, handleKeyUp, onBuildingProximity]);

  // Mobile joystick
  const joystickBaseRef = useRef<HTMLDivElement>(null);
  const joystickKnobRef = useRef<HTMLDivElement>(null);
  const joystickCenterRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleJoystickStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (!joystickBaseRef.current) return;
    const rect = joystickBaseRef.current.getBoundingClientRect();
    joystickCenterRef.current = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    joystickTouchIdRef.current = touch.identifier;
    joystickActiveRef.current = true;
  }, []);

  const handleJoystickMove = useCallback((e: React.TouchEvent) => {
    if (joystickTouchIdRef.current === null) return;
    const touch = Array.from(e.touches).find(t => t.identifier === joystickTouchIdRef.current);
    if (!touch) return;
    const center = joystickCenterRef.current;
    const maxR = 35;
    let dx = touch.clientX - center.x;
    let dy = touch.clientY - center.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > maxR) { dx = (dx / dist) * maxR; dy = (dy / dist) * maxR; }
    joystickRef.current = { x: dx / maxR, y: dy / maxR };
    if (joystickKnobRef.current) joystickKnobRef.current.style.transform = `translate(${dx}px, ${dy}px)`;
  }, []);

  const handleJoystickEnd = useCallback(() => {
    joystickActiveRef.current = false;
    joystickTouchIdRef.current = null;
    joystickRef.current = { x: 0, y: 0 };
    if (joystickKnobRef.current) joystickKnobRef.current.style.transform = `translate(0px, 0px)`;
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div ref={containerRef} className="planet-game-canvas" />
      <div
        ref={joystickBaseRef}
        onTouchStart={handleJoystickStart}
        onTouchMove={handleJoystickMove}
        onTouchEnd={handleJoystickEnd}
        onTouchCancel={handleJoystickEnd}
        style={{
          position: 'absolute', bottom: '24px', left: '24px',
          width: '100px', height: '100px', borderRadius: '50%',
          background: 'hsla(190, 100%, 50%, 0.08)',
          border: '2px solid hsla(190, 100%, 50%, 0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          touchAction: 'none', zIndex: 20,
        }}
      >
        <div
          ref={joystickKnobRef}
          style={{
            width: '36px', height: '36px', borderRadius: '50%',
            background: 'hsla(190, 100%, 50%, 0.3)',
            border: '2px solid hsla(190, 100%, 50%, 0.5)',
            transition: 'transform 0.05s ease-out', pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  );
};

export default PlanetGame;
