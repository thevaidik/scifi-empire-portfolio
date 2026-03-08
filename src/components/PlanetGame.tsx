import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';

interface Building {
  id: string;
  name: string;
  theta: number;
  phi: number;
  color: number;
  glowColor: number;
}

interface PlanetGameProps {
  onBuildingProximity: (buildingId: string | null) => void;
}

const PLANET_RADIUS = 5;
const MOVE_SPEED = 0.015;
const TURN_SPEED = 0.03;
const CAMERA_DISTANCE = 3.0;
const CAMERA_HEIGHT_OFFSET = 1.0;
const PROXIMITY_THRESHOLD = 1.8;
const DRONE_HOVER = 0.35;

const BUILDINGS: Building[] = [
  { id: 'hero', name: 'HQ TOWER', theta: 0, phi: Math.PI / 3, color: 0xff6b4a, glowColor: 0xff9e7a },
  { id: 'apps', name: 'APP STORE', theta: Math.PI / 3, phi: Math.PI / 2.5, color: 0x4ac8ff, glowColor: 0x7adcff },
  { id: 'opensource', name: 'OPEN SOURCE LAB', theta: (2 * Math.PI) / 3, phi: Math.PI / 2, color: 0xff4a6b, glowColor: 0xff7a9e },
  { id: 'connect', name: 'CONNECT HUB', theta: Math.PI, phi: Math.PI / 3, color: 0x4affdc, glowColor: 0x7affea },
  { id: 'interests', name: 'INTEREST DOME', theta: (4 * Math.PI) / 3, phi: Math.PI / 2.2, color: 0xffdc4a, glowColor: 0xffea7a },
  { id: 'collab', name: 'COLLAB CENTER', theta: (5 * Math.PI) / 3, phi: Math.PI / 2.8, color: 0xdc4aff, glowColor: 0xea7aff },
];

function sphericalToCartesian(theta: number, phi: number, r: number): THREE.Vector3 {
  return new THREE.Vector3(
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

// Helper: place object on planet surface
function placeOnSurface(obj: THREE.Object3D, theta: number, phi: number, radius: number, heightOffset = 0) {
  const pos = sphericalToCartesian(theta, phi, radius);
  const up = pos.clone().normalize();
  obj.position.copy(pos.clone().add(up.clone().multiplyScalar(heightOffset)));
  obj.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), up);
}

// Create a Japanese-style pagoda building
function createPagoda(height: number, width: number, floors: number, roofColor: number, wallColor: number): THREE.Group {
  const group = new THREE.Group();

  const floorHeight = height / floors;
  for (let f = 0; f < floors; f++) {
    const floorScale = 1 - f * 0.12;
    const w = width * floorScale;
    const h = floorHeight * 0.7;

    // Wall
    const wallGeo = new THREE.BoxGeometry(w, h, w);
    const wallMat = new THREE.MeshStandardMaterial({
      color: wallColor,
      roughness: 0.7,
      metalness: 0.1,
    });
    const wall = new THREE.Mesh(wallGeo, wallMat);
    wall.position.y = f * floorHeight + h / 2;
    group.add(wall);

    // Windows - glowing
    const windowRows = 2;
    const windowCols = Math.max(2, Math.floor(w / 0.08));
    for (let side = 0; side < 4; side++) {
      for (let wr = 0; wr < windowRows; wr++) {
        for (let wc = 0; wc < windowCols; wc++) {
          const wGeo = new THREE.PlaneGeometry(w * 0.08, h * 0.2);
          const warmth = Math.random();
          const wColor = warmth > 0.5 ? 0xffe4a0 : warmth > 0.3 ? 0xffc86e : 0x80c8ff;
          const wMat = new THREE.MeshBasicMaterial({
            color: wColor,
            transparent: true,
            opacity: 0.6 + Math.random() * 0.3,
            side: THREE.DoubleSide,
          });
          const windowMesh = new THREE.Mesh(wGeo, wMat);
          const xOff = (wc / (windowCols - 1) - 0.5) * w * 0.7;
          const yOff = f * floorHeight + h * 0.3 + wr * h * 0.35;

          if (side === 0) { windowMesh.position.set(xOff, yOff, w / 2 + 0.005); }
          else if (side === 1) { windowMesh.position.set(xOff, yOff, -w / 2 - 0.005); windowMesh.rotation.y = Math.PI; }
          else if (side === 2) { windowMesh.position.set(w / 2 + 0.005, yOff, xOff); windowMesh.rotation.y = Math.PI / 2; }
          else { windowMesh.position.set(-w / 2 - 0.005, yOff, xOff); windowMesh.rotation.y = -Math.PI / 2; }
          group.add(windowMesh);
        }
      }
    }

    // Roof overhang (curved pagoda style)
    const roofW = w * 1.3;
    const roofGeo = new THREE.BoxGeometry(roofW, 0.03, roofW);
    const roofMat = new THREE.MeshStandardMaterial({ color: roofColor, roughness: 0.5, metalness: 0.2 });
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.y = f * floorHeight + h;
    group.add(roof);

    // Roof edge trim (angled tips)
    const edgeGeo = new THREE.BoxGeometry(roofW * 0.1, 0.02, 0.02);
    const edgeMat = new THREE.MeshStandardMaterial({ color: roofColor, roughness: 0.4 });
    [[-1, -1], [-1, 1], [1, -1], [1, 1]].forEach(([sx, sz]) => {
      const edge = new THREE.Mesh(edgeGeo, edgeMat);
      edge.position.set(sx * roofW / 2, f * floorHeight + h + 0.02, sz * roofW / 2);
      edge.rotation.y = Math.atan2(sz, sx);
      edge.rotation.z = -sx * 0.3;
      group.add(edge);
    });
  }

  // Top ornament (spire)
  const spireGeo = new THREE.ConeGeometry(0.02, 0.12, 6);
  const spireMat = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.8, roughness: 0.2 });
  const spire = new THREE.Mesh(spireGeo, spireMat);
  spire.position.y = height + 0.06;
  group.add(spire);

  return group;
}

// Create a shop/storefront building
function createShop(width: number, depth: number, height: number, color: number, awningColor: number): THREE.Group {
  const group = new THREE.Group();

  // Main structure
  const bodyGeo = new THREE.BoxGeometry(width, height, depth);
  const bodyMat = new THREE.MeshStandardMaterial({ color, roughness: 0.65, metalness: 0.05 });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.position.y = height / 2;
  group.add(body);

  // Awning
  const awningGeo = new THREE.BoxGeometry(width * 1.15, 0.02, depth * 0.4);
  const awningMat = new THREE.MeshStandardMaterial({ color: awningColor, roughness: 0.8, side: THREE.DoubleSide });
  const awning = new THREE.Mesh(awningGeo, awningMat);
  awning.position.set(0, height * 0.55, depth / 2 + depth * 0.15);
  awning.rotation.x = -0.2;
  group.add(awning);

  // Shop window (big glass front)
  const glassGeo = new THREE.PlaneGeometry(width * 0.8, height * 0.5);
  const glassMat = new THREE.MeshBasicMaterial({ color: 0xffe4a0, transparent: true, opacity: 0.7, side: THREE.DoubleSide });
  const glass = new THREE.Mesh(glassGeo, glassMat);
  glass.position.set(0, height * 0.35, depth / 2 + 0.005);
  group.add(glass);

  // Door
  const doorGeo = new THREE.PlaneGeometry(width * 0.25, height * 0.45);
  const doorMat = new THREE.MeshStandardMaterial({ color: 0x4a3528, roughness: 0.9, side: THREE.DoubleSide });
  const door = new THREE.Mesh(doorGeo, doorMat);
  door.position.set(width * 0.25, height * 0.225, depth / 2 + 0.006);
  group.add(door);

  // Sign board
  const signGeo = new THREE.BoxGeometry(width * 0.7, 0.06, 0.01);
  const signMat = new THREE.MeshStandardMaterial({ color: 0x2a1a0e, roughness: 0.8 });
  const sign = new THREE.Mesh(signGeo, signMat);
  sign.position.set(0, height * 0.8, depth / 2 + 0.01);
  group.add(sign);

  return group;
}

// Create apartment/tall building
function createApartment(width: number, height: number, floors: number, wallColor: number): THREE.Group {
  const group = new THREE.Group();

  const bodyGeo = new THREE.BoxGeometry(width, height, width * 0.8);
  const bodyMat = new THREE.MeshStandardMaterial({ color: wallColor, roughness: 0.6, metalness: 0.15 });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.position.y = height / 2;
  group.add(body);

  // Windows grid
  const floorH = height / floors;
  for (let f = 0; f < floors; f++) {
    for (let w = 0; w < 3; w++) {
      const wGeo = new THREE.PlaneGeometry(width * 0.18, floorH * 0.5);
      const lit = Math.random() > 0.3;
      const wColor = lit ? (Math.random() > 0.5 ? 0xffe4a0 : 0xffc86e) : 0x334455;
      const wMat = new THREE.MeshBasicMaterial({ color: wColor, transparent: true, opacity: lit ? 0.8 : 0.3, side: THREE.DoubleSide });
      const windowMesh = new THREE.Mesh(wGeo, wMat);
      const xOff = (w - 1) * width * 0.25;
      const yOff = f * floorH + floorH * 0.5;
      windowMesh.position.set(xOff, yOff, width * 0.4 + 0.005);
      group.add(windowMesh);

      // Back windows
      const backWindow = windowMesh.clone();
      backWindow.position.z = -width * 0.4 - 0.005;
      group.add(backWindow);
    }
  }

  // Rooftop details
  const acGeo = new THREE.BoxGeometry(width * 0.2, 0.04, width * 0.15);
  const acMat = new THREE.MeshStandardMaterial({ color: 0x999999, roughness: 0.5, metalness: 0.5 });
  for (let i = 0; i < 2; i++) {
    const ac = new THREE.Mesh(acGeo, acMat);
    ac.position.set((i - 0.5) * width * 0.4, height + 0.02, 0);
    group.add(ac);
  }

  // Antenna
  const antennaGeo = new THREE.CylinderGeometry(0.005, 0.005, 0.15, 4);
  const antennaMat = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.8 });
  const antenna = new THREE.Mesh(antennaGeo, antennaMat);
  antenna.position.set(0, height + 0.075, 0);
  group.add(antenna);

  // Antenna light
  const antLightGeo = new THREE.SphereGeometry(0.01, 6, 6);
  const antLightMat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const antLight = new THREE.Mesh(antLightGeo, antLightMat);
  antLight.position.set(0, height + 0.15, 0);
  group.add(antLight);

  return group;
}

// Create a street lamp
function createStreetLamp(): THREE.Group {
  const group = new THREE.Group();
  const poleGeo = new THREE.CylinderGeometry(0.008, 0.01, 0.35, 6);
  const poleMat = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.7, roughness: 0.3 });
  const pole = new THREE.Mesh(poleGeo, poleMat);
  pole.position.y = 0.175;
  group.add(pole);

  // Arm
  const armGeo = new THREE.CylinderGeometry(0.005, 0.005, 0.08, 4);
  const arm = new THREE.Mesh(armGeo, poleMat);
  arm.position.set(0.04, 0.35, 0);
  arm.rotation.z = -Math.PI / 2.5;
  group.add(arm);

  // Lamp
  const lampGeo = new THREE.SphereGeometry(0.02, 8, 6);
  const lampMat = new THREE.MeshBasicMaterial({ color: 0xffeebb });
  const lamp = new THREE.Mesh(lampGeo, lampMat);
  lamp.position.set(0.06, 0.37, 0);
  group.add(lamp);

  // Point light
  const light = new THREE.PointLight(0xffeebb, 0.3, 1.0);
  light.position.set(0.06, 0.37, 0);
  group.add(light);

  return group;
}

// Create power/telephone pole
function createPowerPole(): THREE.Group {
  const group = new THREE.Group();
  const poleGeo = new THREE.CylinderGeometry(0.01, 0.012, 0.5, 6);
  const poleMat = new THREE.MeshStandardMaterial({ color: 0x5a4a3a, roughness: 0.9 });
  const pole = new THREE.Mesh(poleGeo, poleMat);
  pole.position.y = 0.25;
  group.add(pole);

  // Cross arm
  const crossGeo = new THREE.CylinderGeometry(0.005, 0.005, 0.2, 4);
  const cross = new THREE.Mesh(crossGeo, poleMat);
  cross.position.set(0, 0.45, 0);
  cross.rotation.z = Math.PI / 2;
  group.add(cross);

  // Insulators
  for (let i = -2; i <= 2; i++) {
    const insGeo = new THREE.CylinderGeometry(0.008, 0.005, 0.02, 6);
    const insMat = new THREE.MeshStandardMaterial({ color: 0x88bbdd, roughness: 0.3, metalness: 0.1 });
    const ins = new THREE.Mesh(insGeo, insMat);
    ins.position.set(i * 0.04, 0.46, 0);
    group.add(ins);
  }

  return group;
}

// Create a miniature train
function createTrain(color: number): THREE.Group {
  const train = new THREE.Group();

  // Locomotive
  const locoGeo = new THREE.BoxGeometry(0.12, 0.06, 0.06);
  const locoMat = new THREE.MeshStandardMaterial({ color, roughness: 0.4, metalness: 0.3 });
  const loco = new THREE.Mesh(locoGeo, locoMat);
  loco.position.y = 0.03;
  train.add(loco);

  // Roof
  const roofGeo = new THREE.BoxGeometry(0.13, 0.015, 0.065);
  const roofMat = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.5 });
  const roof = new THREE.Mesh(roofGeo, roofMat);
  roof.position.y = 0.065;
  train.add(roof);

  // Windows
  for (let i = -1; i <= 1; i++) {
    const winGeo = new THREE.PlaneGeometry(0.025, 0.025);
    const winMat = new THREE.MeshBasicMaterial({ color: 0xffe4a0, transparent: true, opacity: 0.8, side: THREE.DoubleSide });
    const win = new THREE.Mesh(winGeo, winMat);
    win.position.set(i * 0.035, 0.04, 0.031);
    train.add(win);
    const winBack = win.clone();
    winBack.position.z = -0.031;
    train.add(winBack);
  }

  // Wheels (simple cylinders)
  const wheelGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.065, 8);
  const wheelMat = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.8 });
  for (let i = -1; i <= 1; i += 2) {
    const wheel = new THREE.Mesh(wheelGeo, wheelMat);
    wheel.position.set(i * 0.035, 0.0, 0);
    wheel.rotation.x = Math.PI / 2;
    train.add(wheel);
  }

  // Headlight
  const headGeo = new THREE.SphereGeometry(0.008, 6, 6);
  const headMat = new THREE.MeshBasicMaterial({ color: 0xffffcc });
  const headlight = new THREE.Mesh(headGeo, headMat);
  headlight.position.set(0.065, 0.035, 0);
  train.add(headlight);

  // Add 2 carriages
  for (let c = 1; c <= 2; c++) {
    const carGeo = new THREE.BoxGeometry(0.1, 0.055, 0.055);
    const carMat = new THREE.MeshStandardMaterial({
      color: c === 1 ? 0xccbb88 : 0x88aa77,
      roughness: 0.5, metalness: 0.2
    });
    const car = new THREE.Mesh(carGeo, carMat);
    car.position.set(-c * 0.13, 0.0275, 0);
    train.add(car);

    // Carriage roof
    const cRoof = new THREE.Mesh(
      new THREE.BoxGeometry(0.105, 0.01, 0.06),
      new THREE.MeshStandardMaterial({ color: 0x444444, roughness: 0.5 })
    );
    cRoof.position.set(-c * 0.13, 0.058, 0);
    train.add(cRoof);

    // Carriage windows
    for (let w = -1; w <= 1; w++) {
      const cwGeo = new THREE.PlaneGeometry(0.02, 0.02);
      const cwMat = new THREE.MeshBasicMaterial({ color: 0xffe4a0, transparent: true, opacity: 0.7, side: THREE.DoubleSide });
      const cw = new THREE.Mesh(cwGeo, cwMat);
      cw.position.set(-c * 0.13 + w * 0.03, 0.035, 0.0285);
      train.add(cw);
      const cwBack = cw.clone();
      cwBack.position.z = -0.0285;
      train.add(cwBack);
    }
  }

  return train;
}

const PlanetGame = ({ onBuildingProximity }: PlanetGameProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const keysRef = useRef<Set<string>>(new Set());
  const charThetaRef = useRef(Math.PI / 6);
  const charPhiRef = useRef(Math.PI / 2.5);
  const headingRef = useRef(0);
  const activeBuildingRef = useRef<string | null>(null);
  const joystickRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const joystickActiveRef = useRef(false);
  const joystickTouchIdRef = useRef<number | null>(null);
  const prevEastRef = useRef<THREE.Vector3 | null>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    keysRef.current.add(e.key.toLowerCase());
  }, []);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    keysRef.current.delete(e.key.toLowerCase());
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Renderer with shadows
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a2e);
    scene.fog = new THREE.FogExp2(0x1a1a2e, 0.015);

    // Camera
    const camera = new THREE.PerspectiveCamera(55, container.clientWidth / container.clientHeight, 0.1, 200);

    // Lights - warm evening atmosphere
    const ambientLight = new THREE.AmbientLight(0x6677aa, 0.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffeedd, 0.8);
    dirLight.position.set(10, 15, 10);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 50;
    dirLight.shadow.camera.left = -10;
    dirLight.shadow.camera.right = 10;
    dirLight.shadow.camera.top = 10;
    dirLight.shadow.camera.bottom = -10;
    scene.add(dirLight);

    // Warm fill light from below
    const fillLight = new THREE.DirectionalLight(0xff8844, 0.3);
    fillLight.position.set(-5, -3, 8);
    scene.add(fillLight);

    scene.add(new THREE.HemisphereLight(0x8899cc, 0x443322, 0.5));

    // ====== PLANET ======
    const planetGeo = new THREE.SphereGeometry(PLANET_RADIUS, 64, 64);
    // Create a richer ground texture
    const grassCanvas = document.createElement('canvas');
    grassCanvas.width = 1024;
    grassCanvas.height = 1024;
    const gCtx = grassCanvas.getContext('2d')!;

    // Base - warm earth tones (city ground)
    const gradient = gCtx.createRadialGradient(512, 512, 0, 512, 512, 720);
    gradient.addColorStop(0, '#5a7a4f');
    gradient.addColorStop(0.3, '#4a6a3f');
    gradient.addColorStop(0.6, '#3d5d35');
    gradient.addColorStop(1, '#2d4d28');
    gCtx.fillStyle = gradient;
    gCtx.fillRect(0, 0, 1024, 1024);

    // Add paths/roads texture
    gCtx.strokeStyle = 'rgba(80, 70, 60, 0.3)';
    gCtx.lineWidth = 6;
    for (let i = 0; i < 12; i++) {
      gCtx.beginPath();
      const startX = Math.random() * 1024;
      const startY = Math.random() * 1024;
      gCtx.moveTo(startX, startY);
      gCtx.lineTo(startX + (Math.random() - 0.5) * 400, startY + (Math.random() - 0.5) * 400);
      gCtx.stroke();
    }

    // Grass detail
    for (let i = 0; i < 15000; i++) {
      const x = Math.random() * 1024;
      const y = Math.random() * 1024;
      gCtx.fillStyle = `rgba(${50 + Math.random() * 50}, ${100 + Math.random() * 70}, ${30 + Math.random() * 40}, ${0.15 + Math.random() * 0.25})`;
      gCtx.fillRect(x, y, 1 + Math.random() * 2, 1 + Math.random() * 3);
    }

    // Small cobblestone-like spots
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * 1024;
      const y = Math.random() * 1024;
      gCtx.fillStyle = `rgba(${70 + Math.random() * 40}, ${60 + Math.random() * 30}, ${40 + Math.random() * 20}, 0.15)`;
      gCtx.beginPath();
      gCtx.arc(x, y, 2 + Math.random() * 5, 0, Math.PI * 2);
      gCtx.fill();
    }

    const grassTex = new THREE.CanvasTexture(grassCanvas);
    grassTex.wrapS = THREE.RepeatWrapping;
    grassTex.wrapT = THREE.RepeatWrapping;
    const planetMat = new THREE.MeshStandardMaterial({
      map: grassTex,
      roughness: 0.85,
      metalness: 0.05,
      bumpMap: grassTex,
      bumpScale: 0.02,
    });
    const planet = new THREE.Mesh(planetGeo, planetMat);
    planet.receiveShadow = true;
    scene.add(planet);

    // ====== DETAILED BUILDINGS (Tokyo-style) ======
    const buildingMeshes: { mesh: THREE.Group; id: string; position: THREE.Vector3 }[] = [];

    // Building configs - varied Japanese architecture
    const buildingConfigs = [
      { type: 'pagoda', floors: 4, height: 0.8, width: 0.35, roofColor: 0xcc4422, wallColor: 0xf5e6d0 },
      { type: 'shop', height: 0.4, width: 0.35, depth: 0.3, color: 0xe8d5b8, awningColor: 0x2255aa },
      { type: 'apartment', floors: 6, height: 0.9, width: 0.3, wallColor: 0xd4c5a9 },
      { type: 'pagoda', floors: 3, height: 0.65, width: 0.3, roofColor: 0x228844, wallColor: 0xf0dcc0 },
      { type: 'shop', height: 0.35, width: 0.3, depth: 0.25, color: 0xc8b898, awningColor: 0xcc3333 },
      { type: 'apartment', floors: 5, height: 0.75, width: 0.28, wallColor: 0xbfb09a },
    ];

    BUILDINGS.forEach((b, i) => {
      const pos = sphericalToCartesian(b.theta, b.phi, PLANET_RADIUS);
      const up = pos.clone().normalize();
      const outerGroup = new THREE.Group();
      outerGroup.position.copy(pos);
      outerGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), up);

      const config = buildingConfigs[i];
      let buildingGroup: THREE.Group;

      if (config.type === 'pagoda') {
        buildingGroup = createPagoda(config.height!, config.width!, config.floors!, config.roofColor!, config.wallColor!);
      } else if (config.type === 'shop') {
        buildingGroup = createShop(config.width!, config.depth!, config.height!, config.color!, config.awningColor!);
      } else {
        buildingGroup = createApartment(config.width!, config.height!, config.floors!, config.wallColor!);
      }

      buildingGroup.castShadow = true;
      outerGroup.add(buildingGroup);

      // Point light for warmth
      const pointLight = new THREE.PointLight(b.glowColor, 0.6, 2.5);
      pointLight.position.y = (config.height || 0.5) + 0.15;
      outerGroup.add(pointLight);

      // Floating label
      const canvas = document.createElement('canvas');
      canvas.width = 256; canvas.height = 64;
      const ctx = canvas.getContext('2d')!;
      ctx.clearRect(0, 0, 256, 64);
      ctx.font = 'bold 18px Orbitron, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#ffe4a0';
      ctx.shadowColor = '#ff8844';
      ctx.shadowBlur = 8;
      ctx.fillText(b.name, 128, 40);
      const tex = new THREE.CanvasTexture(canvas);
      const spriteMat = new THREE.SpriteMaterial({ map: tex, transparent: true, opacity: 0.85 });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.scale.set(1.2, 0.35, 1);
      sprite.position.y = (config.height || 0.5) + 0.45;
      outerGroup.add(sprite);

      // Surrounding mini structures (shops, kiosks)
      const surroundCount = 3 + Math.floor(Math.random() * 3);
      for (let s = 0; s < surroundCount; s++) {
        const angle = (s / surroundCount) * Math.PI * 2 + Math.random() * 0.5;
        const dist = 0.3 + Math.random() * 0.2;
        const miniH = 0.15 + Math.random() * 0.2;
        const miniW = 0.08 + Math.random() * 0.08;

        const miniGeo = new THREE.BoxGeometry(miniW, miniH, miniW);
        const miniMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color().setHSL(0.08 + Math.random() * 0.05, 0.3 + Math.random() * 0.2, 0.6 + Math.random() * 0.2),
          roughness: 0.7,
        });
        const mini = new THREE.Mesh(miniGeo, miniMat);
        mini.position.set(Math.cos(angle) * dist, miniH / 2, Math.sin(angle) * dist);
        mini.castShadow = true;
        outerGroup.add(mini);

        // Mini building windows
        if (Math.random() > 0.3) {
          const mwGeo = new THREE.PlaneGeometry(miniW * 0.6, miniH * 0.3);
          const mwMat = new THREE.MeshBasicMaterial({ color: 0xffe4a0, transparent: true, opacity: 0.5, side: THREE.DoubleSide });
          const mw = new THREE.Mesh(mwGeo, mwMat);
          mw.position.set(Math.cos(angle) * dist, miniH * 0.4, Math.sin(angle) * dist + miniW / 2 + 0.003);
          outerGroup.add(mw);
        }

        // Mini roof
        const mrGeo = new THREE.BoxGeometry(miniW * 1.2, 0.015, miniW * 1.2);
        const mrMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color().setHSL(0, 0, 0.3 + Math.random() * 0.2), roughness: 0.6
        });
        const mr = new THREE.Mesh(mrGeo, mrMat);
        mr.position.set(Math.cos(angle) * dist, miniH, Math.sin(angle) * dist);
        outerGroup.add(mr);
      }

      scene.add(outerGroup);
      buildingMeshes.push({ mesh: outerGroup, id: b.id, position: pos.clone() });
    });

    // ====== STREET LAMPS scattered around planet ======
    for (let i = 0; i < 30; i++) {
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      const pos = sphericalToCartesian(t, p, PLANET_RADIUS);

      // Don't place too close to buildings
      let tooClose = false;
      for (const b of BUILDINGS) {
        const bPos = sphericalToCartesian(b.theta, b.phi, PLANET_RADIUS);
        if (pos.distanceTo(bPos) < 0.8) { tooClose = true; break; }
      }
      if (tooClose) continue;

      const lamp = createStreetLamp();
      placeOnSurface(lamp, t, p, PLANET_RADIUS);
      lamp.rotation.y = Math.random() * Math.PI * 2;
      scene.add(lamp);
    }

    // ====== POWER POLES ======
    for (let i = 0; i < 12; i++) {
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      const pole = createPowerPole();
      placeOnSurface(pole, t, p, PLANET_RADIUS);
      scene.add(pole);
    }

    // ====== TREES (cherry blossom style) ======
    const trunkGeo = new THREE.CylinderGeometry(0.02, 0.03, 0.2, 6);
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5a3a28, roughness: 0.9 });
    const cherryColors = [0xff88aa, 0xff99bb, 0xffaacc, 0x44aa55, 0x338844, 0x55bb66];

    for (let i = 0; i < 35; i++) {
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      const pos = sphericalToCartesian(t, p, PLANET_RADIUS);

      let tooClose = false;
      for (const b of BUILDINGS) {
        const bPos = sphericalToCartesian(b.theta, b.phi, PLANET_RADIUS);
        if (pos.distanceTo(bPos) < 0.9) { tooClose = true; break; }
      }
      if (tooClose) continue;

      const treeGroup = new THREE.Group();
      placeOnSurface(treeGroup, t, p, PLANET_RADIUS);

      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.y = 0.1;
      treeGroup.add(trunk);

      // Fluffy canopy (multiple spheres for volume)
      const isCherryBlossom = Math.random() > 0.4;
      const canopyColor = isCherryBlossom
        ? cherryColors[Math.floor(Math.random() * 3)]
        : cherryColors[3 + Math.floor(Math.random() * 3)];

      for (let c = 0; c < 3; c++) {
        const canopyGeo = new THREE.SphereGeometry(0.08 + Math.random() * 0.06, 8, 6);
        const canopyMat = new THREE.MeshStandardMaterial({
          color: canopyColor,
          roughness: 0.8,
          transparent: isCherryBlossom,
          opacity: isCherryBlossom ? 0.85 : 1.0,
        });
        const canopy = new THREE.Mesh(canopyGeo, canopyMat);
        canopy.position.set(
          (Math.random() - 0.5) * 0.06,
          0.22 + c * 0.04,
          (Math.random() - 0.5) * 0.06
        );
        canopy.castShadow = true;
        treeGroup.add(canopy);
      }

      scene.add(treeGroup);
    }

    // ====== TRAIN TRACKS (ring around planet equator) ======
    const TRACK_PHI = Math.PI / 2; // equator
    const TRACK_SEGMENTS = 120;
    const TRACK_RADIUS = PLANET_RADIUS + 0.01;

    // Create rail track
    const trackPoints: THREE.Vector3[] = [];
    for (let i = 0; i <= TRACK_SEGMENTS; i++) {
      const t = (i / TRACK_SEGMENTS) * Math.PI * 2;
      trackPoints.push(sphericalToCartesian(t, TRACK_PHI, TRACK_RADIUS));
    }

    // Rail ties (sleepers)
    const tieGeo = new THREE.BoxGeometry(0.06, 0.005, 0.01);
    const tieMat = new THREE.MeshStandardMaterial({ color: 0x5a4a3a, roughness: 0.9 });
    for (let i = 0; i < TRACK_SEGMENTS; i++) {
      const t = (i / TRACK_SEGMENTS) * Math.PI * 2;
      const pos = sphericalToCartesian(t, TRACK_PHI, TRACK_RADIUS);
      const up = pos.clone().normalize();
      const tie = new THREE.Mesh(tieGeo, tieMat);
      tie.position.copy(pos);
      tie.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), up);
      scene.add(tie);
    }

    // Rails (thin tubes)
    const railGeo = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(trackPoints, true),
      200, 0.004, 4, true
    );
    const railMat = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.8, roughness: 0.2 });
    scene.add(new THREE.Mesh(railGeo, railMat));

    // Second rail (offset)
    const trackPoints2: THREE.Vector3[] = [];
    for (let i = 0; i <= TRACK_SEGMENTS; i++) {
      const t = (i / TRACK_SEGMENTS) * Math.PI * 2;
      const p = sphericalToCartesian(t, TRACK_PHI, TRACK_RADIUS);
      const up = p.clone().normalize();
      // Offset perpendicular to track direction on surface
      const nextT = ((i + 1) / TRACK_SEGMENTS) * Math.PI * 2;
      const nextP = sphericalToCartesian(nextT, TRACK_PHI, TRACK_RADIUS);
      const fwd = nextP.clone().sub(p).normalize();
      const right = new THREE.Vector3().crossVectors(up, fwd).normalize();
      trackPoints2.push(p.clone().add(right.multiplyScalar(0.025)));
    }
    const rail2Geo = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(trackPoints2, true),
      200, 0.004, 4, true
    );
    scene.add(new THREE.Mesh(rail2Geo, railMat));

    // ====== TRAINS (2 trains going around) ======
    const train1 = createTrain(0x336655); // green tram
    const train2 = createTrain(0xcc6633); // orange tram
    scene.add(train1);
    scene.add(train2);

    // ====== DECORATIVE ELEMENTS ======
    // Small signs/billboards near buildings
    BUILDINGS.forEach((b) => {
      const signTheta = b.theta + 0.08;
      const signPhi = b.phi + 0.05;
      const signGroup = new THREE.Group();
      placeOnSurface(signGroup, signTheta, signPhi, PLANET_RADIUS);

      const boardGeo = new THREE.BoxGeometry(0.12, 0.08, 0.005);
      const boardMat = new THREE.MeshStandardMaterial({ color: 0xeeeeee, roughness: 0.5 });
      const board = new THREE.Mesh(boardGeo, boardMat);
      board.position.y = 0.2;
      signGroup.add(board);

      // Neon frame
      const frameGeo = new THREE.BoxGeometry(0.13, 0.09, 0.002);
      const frameMat = new THREE.MeshBasicMaterial({ color: b.glowColor, transparent: true, opacity: 0.4 });
      const frame = new THREE.Mesh(frameGeo, frameMat);
      frame.position.y = 0.2;
      frame.position.z = 0.004;
      signGroup.add(frame);

      const poleGeo2 = new THREE.CylinderGeometry(0.005, 0.005, 0.2, 4);
      const poleMat2 = new THREE.MeshStandardMaterial({ color: 0x555555 });
      const pole = new THREE.Mesh(poleGeo2, poleMat2);
      pole.position.y = 0.1;
      signGroup.add(pole);

      scene.add(signGroup);
    });

    // Red postbox-style objects and vending machines
    for (let i = 0; i < 8; i++) {
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      const itemGroup = new THREE.Group();
      placeOnSurface(itemGroup, t, p, PLANET_RADIUS);

      if (i % 2 === 0) {
        // Postbox
        const postGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.06, 8);
        const postMat = new THREE.MeshStandardMaterial({ color: 0xcc2222, roughness: 0.5 });
        const post = new THREE.Mesh(postGeo, postMat);
        post.position.y = 0.03;
        itemGroup.add(post);
        const topGeo = new THREE.SphereGeometry(0.022, 8, 4, 0, Math.PI * 2, 0, Math.PI / 2);
        const top = new THREE.Mesh(topGeo, postMat);
        top.position.y = 0.06;
        itemGroup.add(top);
      } else {
        // Vending machine
        const vmGeo = new THREE.BoxGeometry(0.04, 0.07, 0.03);
        const vmMat = new THREE.MeshStandardMaterial({ color: 0x2244aa, roughness: 0.3, metalness: 0.4 });
        const vm = new THREE.Mesh(vmGeo, vmMat);
        vm.position.y = 0.035;
        itemGroup.add(vm);

        // Screen glow
        const screenGeo = new THREE.PlaneGeometry(0.03, 0.04);
        const screenMat = new THREE.MeshBasicMaterial({ color: 0x88ddff, transparent: true, opacity: 0.6, side: THREE.DoubleSide });
        const screen = new THREE.Mesh(screenGeo, screenMat);
        screen.position.set(0, 0.04, 0.016);
        itemGroup.add(screen);
      }

      scene.add(itemGroup);
    }

    // Grass blades (less of them, planet is more urban)
    const grassBladeGeo = new THREE.ConeGeometry(0.015, 0.1, 4);
    const grassBladeMat = new THREE.MeshStandardMaterial({ color: 0x5aaa4a, roughness: 0.8 });
    const grassCount = 800;
    const grassInstanced = new THREE.InstancedMesh(grassBladeGeo, grassBladeMat, grassCount);
    const dummy = new THREE.Object3D();
    for (let i = 0; i < grassCount; i++) {
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      const surfacePos = sphericalToCartesian(t, p, PLANET_RADIUS);
      const normal = surfacePos.clone().normalize();
      dummy.position.copy(surfacePos.clone().add(normal.clone().multiplyScalar(0.02)));
      dummy.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
      dummy.rotateX((Math.random() - 0.5) * 0.3);
      dummy.scale.set(0.5 + Math.random() * 0.7, 0.4 + Math.random() * 0.8, 0.5 + Math.random() * 0.7);
      dummy.updateMatrix();
      grassInstanced.setMatrixAt(i, dummy.matrix);
      grassInstanced.setColorAt(i, new THREE.Color().setHSL(0.28 + Math.random() * 0.08, 0.4 + Math.random() * 0.3, 0.25 + Math.random() * 0.2));
    }
    grassInstanced.instanceColor!.needsUpdate = true;
    scene.add(grassInstanced);

    // Atmosphere glow - warmer
    const glowGeo = new THREE.SphereGeometry(PLANET_RADIUS * 1.04, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({ color: 0xffaa77, transparent: true, opacity: 0.04, side: THREE.BackSide });
    scene.add(new THREE.Mesh(glowGeo, glowMat));

    const glowGeo2 = new THREE.SphereGeometry(PLANET_RADIUS * 1.08, 32, 32);
    const glowMat2 = new THREE.MeshBasicMaterial({ color: 0x4488cc, transparent: true, opacity: 0.03, side: THREE.BackSide });
    scene.add(new THREE.Mesh(glowGeo2, glowMat2));

    // ====== DRONE CHARACTER ======
    const droneGroup = new THREE.Group();

    const bodyGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.06, 16);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.3, metalness: 0.8 });
    const droneBody = new THREE.Mesh(bodyGeo, bodyMat);
    droneGroup.add(droneBody);

    const domeGeo = new THREE.SphereGeometry(0.08, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2);
    const domeMat = new THREE.MeshStandardMaterial({ color: 0x00d9ff, emissive: 0x00d9ff, emissiveIntensity: 0.4, roughness: 0.1, metalness: 0.9 });
    const dome = new THREE.Mesh(domeGeo, domeMat);
    dome.position.y = 0.03;
    droneGroup.add(dome);

    const frontGeo = new THREE.BoxGeometry(0.04, 0.02, 0.06);
    const frontMat = new THREE.MeshStandardMaterial({ color: 0xff0033, emissive: 0xff0033, emissiveIntensity: 0.6 });
    const frontIndicator = new THREE.Mesh(frontGeo, frontMat);
    frontIndicator.position.set(0, 0, 0.18);
    droneGroup.add(frontIndicator);

    const armGeo = new THREE.BoxGeometry(0.03, 0.02, 0.2);
    const armMat = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.4, metalness: 0.7 });
    const propGeo = new THREE.BoxGeometry(0.15, 0.005, 0.02);
    const propMat = new THREE.MeshStandardMaterial({ color: 0x666666, roughness: 0.3, metalness: 0.5 });

    const propellers: THREE.Mesh[] = [];
    const armAngles = [Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4];
    const armLength = 0.22;

    armAngles.forEach((angle) => {
      const arm = new THREE.Mesh(armGeo, armMat);
      arm.position.set(Math.sin(angle) * armLength * 0.5, 0, Math.cos(angle) * armLength * 0.5);
      arm.rotation.y = -angle;
      droneGroup.add(arm);

      const hubGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.03, 8);
      const hubMat = new THREE.MeshStandardMaterial({ color: 0x444444, metalness: 0.8 });
      const hub = new THREE.Mesh(hubGeo, hubMat);
      hub.position.set(Math.sin(angle) * armLength, 0.02, Math.cos(angle) * armLength);
      droneGroup.add(hub);

      const prop = new THREE.Mesh(propGeo, propMat);
      prop.position.set(Math.sin(angle) * armLength, 0.04, Math.cos(angle) * armLength);
      droneGroup.add(prop);
      propellers.push(prop);
    });

    const droneLight = new THREE.PointLight(0x00d9ff, 0.5, 2.5);
    droneLight.position.y = -0.1;
    droneGroup.add(droneLight);

    const skidGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.12, 6);
    const skidMat = new THREE.MeshStandardMaterial({ color: 0x444444 });
    [-1, 1].forEach(side => {
      const skid = new THREE.Mesh(skidGeo, skidMat);
      skid.position.set(side * 0.1, -0.06, 0);
      droneGroup.add(skid);
    });

    scene.add(droneGroup);

    // Starfield
    const starCount = 2000;
    const starGeo2 = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const r = 40 + Math.random() * 80;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      starPositions[i * 3] = r * Math.sin(p) * Math.cos(t);
      starPositions[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
      starPositions[i * 3 + 2] = r * Math.cos(p);
      // Warm-cool star color variation
      const warmth = Math.random();
      if (warmth > 0.7) {
        starColors[i * 3] = 1; starColors[i * 3 + 1] = 0.9; starColors[i * 3 + 2] = 0.7;
      } else if (warmth > 0.4) {
        starColors[i * 3] = 0.8; starColors[i * 3 + 1] = 0.85; starColors[i * 3 + 2] = 1;
      } else {
        starColors[i * 3] = 1; starColors[i * 3 + 1] = 1; starColors[i * 3 + 2] = 1;
      }
    }
    starGeo2.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo2.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    const starMat2 = new THREE.PointsMaterial({ size: 0.15, transparent: true, opacity: 0.7, vertexColors: true });
    scene.add(new THREE.Points(starGeo2, starMat2));

    // ====== ANIMATION LOOP ======
    const clock = new THREE.Clock();
    let animId: number;
    const camPosSmooth = new THREE.Vector3();
    let camInitialized = false;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // --- Input ---
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

      // --- Robust tangent basis ---
      const getTangentBasis = (pos: THREE.Vector3) => {
        const up = pos.clone().normalize();
        let east: THREE.Vector3;
        if (prevEastRef.current) {
          east = prevEastRef.current.clone()
            .sub(up.clone().multiplyScalar(prevEastRef.current.dot(up)))
            .normalize();
          if (east.lengthSq() < 0.001) {
            const ref = Math.abs(up.y) < 0.99 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0);
            east = new THREE.Vector3().crossVectors(up, ref).normalize();
          }
        } else {
          const ref = Math.abs(up.y) < 0.99 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0);
          east = new THREE.Vector3().crossVectors(up, ref).normalize();
        }
        prevEastRef.current = east.clone();
        const north = new THREE.Vector3().crossVectors(east, up).normalize();
        return { up, east, north };
      };

      // --- Move character ---
      if (Math.abs(moveForward) > 0.01) {
        const currentPos = sphericalToCartesian(charThetaRef.current, charPhiRef.current, PLANET_RADIUS);
        const { east, north } = getTangentBasis(currentPos);
        const forward = new THREE.Vector3()
          .addScaledVector(north, Math.cos(headingRef.current))
          .addScaledVector(east, Math.sin(headingRef.current))
          .normalize();
        const newPos = currentPos.clone().addScaledVector(forward, moveForward * MOVE_SPEED);
        newPos.normalize().multiplyScalar(PLANET_RADIUS);
        charPhiRef.current = Math.acos(Math.max(-1, Math.min(1, newPos.y / PLANET_RADIUS)));
        charThetaRef.current = Math.atan2(newPos.z, newPos.x);
      }

      // --- Position drone ---
      const charPos = sphericalToCartesian(charThetaRef.current, charPhiRef.current, PLANET_RADIUS);
      const up = charPos.clone().normalize();
      const hoverOffset = DRONE_HOVER + Math.sin(time * 3) * 0.03;
      droneGroup.position.copy(charPos.clone().add(up.clone().multiplyScalar(hoverOffset)));

      const baseQuat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), up);
      const headingQuat = new THREE.Quaternion().setFromAxisAngle(up, -headingRef.current);
      droneGroup.quaternion.copy(headingQuat.multiply(baseQuat));

      if (Math.abs(moveForward) > 0.01 || Math.abs(turnInput) > 0.01) {
        const tiltQuat = new THREE.Quaternion().setFromEuler(new THREE.Euler(moveForward * 0.15, 0, -turnInput * 0.1));
        droneGroup.quaternion.multiply(tiltQuat);
      }

      propellers.forEach((prop, i) => {
        prop.rotation.y = time * 30 + i * Math.PI / 2;
      });

      // --- Camera ---
      const camBasis = getTangentBasis(charPos);
      const facingDir = new THREE.Vector3()
        .addScaledVector(camBasis.north, Math.cos(headingRef.current))
        .addScaledVector(camBasis.east, Math.sin(headingRef.current))
        .normalize();
      const behindDir = facingDir.clone().negate();
      const targetCamPos = charPos.clone()
        .add(up.clone().multiplyScalar(CAMERA_HEIGHT_OFFSET))
        .add(behindDir.multiplyScalar(CAMERA_DISTANCE));

      if (!camInitialized) {
        camPosSmooth.copy(targetCamPos);
        camInitialized = true;
      } else {
        camPosSmooth.lerp(targetCamPos, 0.9);
      }
      camera.position.copy(camPosSmooth);
      camera.lookAt(charPos.clone().add(up.clone().multiplyScalar(0.3)));

      // --- Animate trains ---
      const trainSpeed1 = 0.15;
      const trainSpeed2 = 0.12;
      const trainAngle1 = time * trainSpeed1;
      const trainAngle2 = time * trainSpeed2 + Math.PI; // opposite side

      [{ train: train1, angle: trainAngle1 }, { train: train2, angle: trainAngle2 }].forEach(({ train, angle }) => {
        const tPos = sphericalToCartesian(angle, TRACK_PHI, TRACK_RADIUS + 0.015);
        const tUp = tPos.clone().normalize();
        train.position.copy(tPos);
        train.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), tUp);
        // Face direction of travel
        const nextPos = sphericalToCartesian(angle + 0.05, TRACK_PHI, TRACK_RADIUS + 0.015);
        const tFwd = nextPos.sub(tPos).normalize();
        const tRight = new THREE.Vector3().crossVectors(tUp, tFwd).normalize();
        const tFwdCorrected = new THREE.Vector3().crossVectors(tRight, tUp).normalize();
        const lookTarget = tPos.clone().add(tFwdCorrected);
        const lookMatrix = new THREE.Matrix4().lookAt(tPos, lookTarget, tUp);
        train.quaternion.setFromRotationMatrix(lookMatrix);
      });

      // --- Proximity check ---
      let closestBuilding: string | null = null;
      let closestDist = PROXIMITY_THRESHOLD;
      for (const b of buildingMeshes) {
        const dist = charPos.distanceTo(b.position);
        if (dist < closestDist) {
          closestDist = dist;
          closestBuilding = b.id;
        }
      }
      if (closestBuilding !== activeBuildingRef.current) {
        activeBuildingRef.current = closestBuilding;
        onBuildingProximity(closestBuilding);
      }

      // Animate building lights
      buildingMeshes.forEach((b, i) => {
        b.mesh.children.forEach(c => {
          if (c instanceof THREE.PointLight) {
            c.intensity = 0.5 + Math.sin(time * 2 + i * 1.2) * 0.2;
          }
        });
      });

      droneLight.intensity = 0.4 + Math.sin(time * 3) * 0.15;

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
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
          else obj.material.dispose();
        }
      });
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [handleKeyDown, handleKeyUp, onBuildingProximity]);

  // ====== MOBILE JOYSTICK ======
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
    if (joystickKnobRef.current) {
      joystickKnobRef.current.style.transform = `translate(${dx}px, ${dy}px)`;
    }
  }, []);

  const handleJoystickEnd = useCallback(() => {
    joystickActiveRef.current = false;
    joystickTouchIdRef.current = null;
    joystickRef.current = { x: 0, y: 0 };
    if (joystickKnobRef.current) {
      joystickKnobRef.current.style.transform = `translate(0px, 0px)`;
    }
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
          position: 'absolute',
          bottom: '24px',
          left: '24px',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'hsla(190, 100%, 50%, 0.08)',
          border: '2px solid hsla(190, 100%, 50%, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          touchAction: 'none',
          zIndex: 20,
        }}
      >
        <div
          ref={joystickKnobRef}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'hsla(190, 100%, 50%, 0.3)',
            border: '2px solid hsla(190, 100%, 50%, 0.5)',
            transition: 'transform 0.05s ease-out',
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  );
};

export default PlanetGame;
