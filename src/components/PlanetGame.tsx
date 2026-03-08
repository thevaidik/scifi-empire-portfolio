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

// ======= BUILDING GENERATORS =======

function createSkyscraper(w: number, h: number, d: number, color: number): THREE.Group {
  const g = new THREE.Group();

  // Main body with slight bevel feel
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(w, h, d),
    new THREE.MeshStandardMaterial({ color, roughness: 0.35, metalness: 0.25 })
  );
  body.position.y = h / 2;
  body.castShadow = true;
  body.receiveShadow = true;
  g.add(body);

  // Glass curtain wall overlay
  const glassMat = new THREE.MeshStandardMaterial({
    color: 0x88bbdd, roughness: 0.05, metalness: 0.8,
    transparent: true, opacity: 0.3,
  });
  const glass = new THREE.Mesh(new THREE.BoxGeometry(w * 1.005, h * 1.005, d * 1.005), glassMat);
  glass.position.y = h / 2;
  g.add(glass);

  // Window grid
  const floors = Math.floor(h / 0.18);
  const cols = Math.max(2, Math.floor(w / 0.15));
  for (let side = 0; side < 4; side++) {
    for (let f = 0; f < floors; f++) {
      for (let c = 0; c < cols; c++) {
        const lit = Math.random() > 0.2;
        const wColor = lit
          ? (Math.random() > 0.6 ? 0xffe4a0 : Math.random() > 0.3 ? 0xffc86e : 0x80c8ff)
          : 0x1a2030;
        const wGeo = new THREE.PlaneGeometry(w * 0.12, 0.1);
        const wMat = new THREE.MeshBasicMaterial({
          color: wColor, transparent: true,
          opacity: lit ? 0.85 : 0.15, side: THREE.DoubleSide
        });
        const win = new THREE.Mesh(wGeo, wMat);
        const xOff = ((c / Math.max(1, cols - 1)) - 0.5) * w * 0.8;
        const yOff = f * 0.18 + 0.15;

        if (side === 0) win.position.set(xOff, yOff, d / 2 + 0.005);
        else if (side === 1) { win.position.set(xOff, yOff, -d / 2 - 0.005); win.rotation.y = Math.PI; }
        else if (side === 2) { win.position.set(w / 2 + 0.005, yOff, xOff); win.rotation.y = Math.PI / 2; }
        else { win.position.set(-w / 2 - 0.005, yOff, xOff); win.rotation.y = -Math.PI / 2; }
        g.add(win);
      }
    }
  }

  // Rooftop details
  for (let i = 0; i < 3; i++) {
    const ac = new THREE.Mesh(
      new THREE.BoxGeometry(w * 0.15, 0.06, d * 0.12),
      new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.5, roughness: 0.4 })
    );
    ac.position.set((i - 1) * w * 0.3, h + 0.03, 0);
    g.add(ac);
  }

  // Antenna
  const antenna = new THREE.Mesh(
    new THREE.CylinderGeometry(0.01, 0.01, h * 0.15, 4),
    new THREE.MeshStandardMaterial({ color: 0xaaaaaa, metalness: 0.8 })
  );
  antenna.position.y = h + h * 0.075;
  g.add(antenna);

  return g;
}

function createTokyoTower(height: number): THREE.Group {
  const g = new THREE.Group();
  const legMat = new THREE.MeshStandardMaterial({ color: 0xff3311, roughness: 0.35, metalness: 0.3 });

  // 4 legs
  for (let leg = 0; leg < 4; leg++) {
    const angle = (leg / 4) * Math.PI * 2 + Math.PI / 4;
    const baseR = 0.5;
    const topR = 0.05;
    const segs = 15;
    for (let s = 0; s < segs; s++) {
      const t0 = s / segs;
      const t1 = (s + 1) / segs;
      const r = (baseR * (1 - (t0 + t1) / 2) + topR * ((t0 + t1) / 2));
      const segH = height / segs;
      const bar = new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.02, segH * 1.1, 4),
        legMat
      );
      bar.position.set(Math.cos(angle) * r, s * segH + segH / 2, Math.sin(angle) * r);
      const tiltAngle = Math.atan2(baseR - topR, height) * 0.85;
      bar.rotation.z = Math.cos(angle) * tiltAngle;
      bar.rotation.x = -Math.sin(angle) * tiltAngle;
      g.add(bar);
    }
  }

  // Horizontal rings
  for (let level = 0; level < 8; level++) {
    const y = (level / 8) * height * 0.75;
    const t = level / 8;
    const r = baseRAt(t);
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(r, 0.012, 4, 12),
      new THREE.MeshStandardMaterial({ color: 0xee2200, roughness: 0.4, metalness: 0.2 })
    );
    ring.position.y = y;
    ring.rotation.x = Math.PI / 2;
    g.add(ring);
  }

  function baseRAt(t: number) { return 0.5 * (1 - t) + 0.05 * t; }

  // Observation decks
  [0.4, 0.65].forEach(frac => {
    const r = baseRAt(frac);
    const deck = new THREE.Mesh(
      new THREE.CylinderGeometry(r * 2.2, r * 1.8, 0.08, 16),
      new THREE.MeshStandardMaterial({ color: 0xdddddd, roughness: 0.3, metalness: 0.5 })
    );
    deck.position.y = frac * height;
    g.add(deck);

    for (let w = 0; w < 16; w++) {
      const wa = (w / 16) * Math.PI * 2;
      const win = new THREE.Mesh(
        new THREE.PlaneGeometry(0.04, 0.05),
        new THREE.MeshBasicMaterial({ color: 0xffe4a0, transparent: true, opacity: 0.7, side: THREE.DoubleSide })
      );
      win.position.set(Math.cos(wa) * r * 2, frac * height, Math.sin(wa) * r * 2);
      win.lookAt(new THREE.Vector3(0, frac * height, 0));
      g.add(win);
    }
  });

  // Spire
  const spire = new THREE.Mesh(
    new THREE.CylinderGeometry(0.008, 0.025, height * 0.35, 6),
    new THREE.MeshStandardMaterial({ color: 0xeeeeee, metalness: 0.8, roughness: 0.2 })
  );
  spire.position.y = height + height * 0.175;
  g.add(spire);

  // Blinking top light
  const topBulb = new THREE.Mesh(
    new THREE.SphereGeometry(0.03, 8, 8),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
  );
  topBulb.position.y = height + height * 0.35;
  g.add(topBulb);
  const topLight = new THREE.PointLight(0xff0000, 1, 5);
  topLight.position.y = height + height * 0.35;
  g.add(topLight);

  return g;
}

function createJapaneseShop(w: number, h: number, d: number, wallColor: number, roofColor: number, neonColor: number): THREE.Group {
  const g = new THREE.Group();

  const body = new THREE.Mesh(
    new THREE.BoxGeometry(w, h, d),
    new THREE.MeshStandardMaterial({ color: wallColor, roughness: 0.7 })
  );
  body.position.y = h / 2;
  body.castShadow = true;
  body.receiveShadow = true;
  g.add(body);

  // Tiled roof (sloped)
  const roofGeo = new THREE.BoxGeometry(w * 1.25, 0.04, d * 1.25);
  const roof = new THREE.Mesh(roofGeo, new THREE.MeshStandardMaterial({ color: roofColor, roughness: 0.5 }));
  roof.position.y = h + 0.02;
  g.add(roof);

  // Noren curtain strips
  for (let i = 0; i < 5; i++) {
    const curtain = new THREE.Mesh(
      new THREE.PlaneGeometry(w * 0.12, h * 0.35),
      new THREE.MeshStandardMaterial({ color: 0x1a2266, side: THREE.DoubleSide, transparent: true, opacity: 0.85 })
    );
    curtain.position.set((i - 2) * w * 0.15, h * 0.65, d / 2 + 0.005);
    g.add(curtain);
  }

  // Red lanterns
  [-1, 1].forEach(side => {
    const lantern = new THREE.Mesh(
      new THREE.SphereGeometry(0.05, 8, 6),
      new THREE.MeshBasicMaterial({ color: 0xff3322, transparent: true, opacity: 0.85 })
    );
    lantern.position.set(side * (w / 2 + 0.06), h * 0.55, d / 2 + 0.03);
    g.add(lantern);
    const lanternLight = new THREE.PointLight(0xff4422, 0.3, 1.5);
    lanternLight.position.copy(lantern.position);
    g.add(lanternLight);
  });

  // Neon sign
  const sign = new THREE.Mesh(
    new THREE.BoxGeometry(w * 0.7, 0.08, 0.01),
    new THREE.MeshBasicMaterial({ color: neonColor, transparent: true, opacity: 0.9 })
  );
  sign.position.set(0, h * 0.88, d / 2 + 0.01);
  g.add(sign);

  // Neon glow
  const neonGlow = new THREE.PointLight(neonColor, 0.5, 2);
  neonGlow.position.set(0, h * 0.88, d / 2 + 0.15);
  g.add(neonGlow);

  // Shop window glow
  const glass = new THREE.Mesh(
    new THREE.PlaneGeometry(w * 0.8, h * 0.45),
    new THREE.MeshBasicMaterial({ color: 0xffe4a0, transparent: true, opacity: 0.55, side: THREE.DoubleSide })
  );
  glass.position.set(0, h * 0.3, d / 2 + 0.005);
  g.add(glass);

  return g;
}

function createPagoda(height: number, baseW: number, floors: number, roofColor: number): THREE.Group {
  const g = new THREE.Group();
  const floorH = height / floors;

  for (let f = 0; f < floors; f++) {
    const scale = 1 - f * 0.1;
    const w = baseW * scale;
    const h = floorH * 0.65;

    // Wall
    const wall = new THREE.Mesh(
      new THREE.BoxGeometry(w, h, w),
      new THREE.MeshStandardMaterial({ color: 0xf5e6d0, roughness: 0.7 })
    );
    wall.position.y = f * floorH + h / 2;
    wall.castShadow = true;
    g.add(wall);

    // Windows
    for (let side = 0; side < 4; side++) {
      const winCount = Math.max(2, Math.floor(w / 0.2));
      for (let wc = 0; wc < winCount; wc++) {
        const lit = Math.random() > 0.3;
        const win = new THREE.Mesh(
          new THREE.PlaneGeometry(w * 0.1, h * 0.3),
          new THREE.MeshBasicMaterial({
            color: lit ? 0xffe4a0 : 0x333344,
            transparent: true, opacity: lit ? 0.7 : 0.2, side: THREE.DoubleSide
          })
        );
        const xOff = ((wc / (winCount - 1)) - 0.5) * w * 0.75;
        const yOff = f * floorH + h * 0.4;

        if (side === 0) win.position.set(xOff, yOff, w / 2 + 0.005);
        else if (side === 1) { win.position.set(xOff, yOff, -w / 2 - 0.005); win.rotation.y = Math.PI; }
        else if (side === 2) { win.position.set(w / 2 + 0.005, yOff, xOff); win.rotation.y = Math.PI / 2; }
        else { win.position.set(-w / 2 - 0.005, yOff, xOff); win.rotation.y = -Math.PI / 2; }
        g.add(win);
      }
    }

    // Curved roof overhang
    const roofW = w * 1.35;
    const roof = new THREE.Mesh(
      new THREE.BoxGeometry(roofW, 0.04, roofW),
      new THREE.MeshStandardMaterial({ color: roofColor, roughness: 0.45, metalness: 0.15 })
    );
    roof.position.y = f * floorH + h;
    g.add(roof);

    // Curved roof edges
    [[-1, -1], [-1, 1], [1, -1], [1, 1]].forEach(([sx, sz]) => {
      const edge = new THREE.Mesh(
        new THREE.BoxGeometry(roofW * 0.08, 0.03, 0.03),
        new THREE.MeshStandardMaterial({ color: roofColor, roughness: 0.4 })
      );
      edge.position.set(sx * roofW / 2, f * floorH + h + 0.03, sz * roofW / 2);
      edge.rotation.y = Math.atan2(sz, sx);
      edge.rotation.z = -sx * 0.35;
      g.add(edge);
    });
  }

  // Gold spire
  const spire = new THREE.Mesh(
    new THREE.ConeGeometry(0.04, 0.3, 6),
    new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.8, roughness: 0.2 })
  );
  spire.position.y = height + 0.15;
  g.add(spire);

  return g;
}

// ====== DETAILED TRAIN ======
function createTrain(color: number, carriages: number): THREE.Group {
  const train = new THREE.Group();

  const makeCar = (c: number, isLoco: boolean): THREE.Group => {
    const car = new THREE.Group();
    const bodyL = 0.5;
    const bodyH = 0.18;
    const bodyW = 0.18;

    const body = new THREE.Mesh(
      new THREE.BoxGeometry(bodyL, bodyH, bodyW),
      new THREE.MeshStandardMaterial({ color: c, roughness: 0.25, metalness: 0.4 })
    );
    body.position.y = bodyH / 2 + 0.05;
    body.castShadow = true;
    car.add(body);

    // White stripe
    const stripe = new THREE.Mesh(
      new THREE.BoxGeometry(bodyL * 1.01, 0.025, bodyW * 1.01),
      new THREE.MeshStandardMaterial({ color: 0xeeeeee, roughness: 0.3 })
    );
    stripe.position.y = bodyH / 2 + 0.05 + 0.02;
    car.add(stripe);

    // Roof
    const roof = new THREE.Mesh(
      new THREE.BoxGeometry(bodyL, 0.02, bodyW * 0.9),
      new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.35, metalness: 0.3 })
    );
    roof.position.y = bodyH + 0.06;
    car.add(roof);

    // Windows (both sides)
    for (let w = -3; w <= 3; w++) {
      const winGeo = new THREE.PlaneGeometry(0.05, 0.08);
      const winMat = new THREE.MeshBasicMaterial({ color: 0xddeeff, transparent: true, opacity: 0.7, side: THREE.DoubleSide });
      const win = new THREE.Mesh(winGeo, winMat);
      win.position.set(w * 0.065, bodyH / 2 + 0.06, bodyW / 2 + 0.002);
      car.add(win);
      const winB = win.clone();
      winB.position.z = -bodyW / 2 - 0.002;
      car.add(winB);
    }

    // Interior warm glow
    const intLight = new THREE.PointLight(0xffe4a0, 0.2, 0.8);
    intLight.position.set(0, bodyH / 2 + 0.05, 0);
    car.add(intLight);

    // Wheels (bogies)
    const wheelGeo = new THREE.CylinderGeometry(0.035, 0.035, bodyW * 1.1, 8);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.8 });
    [-1, 1].forEach(s => {
      const wheel = new THREE.Mesh(wheelGeo, wheelMat);
      wheel.position.set(s * bodyL * 0.3, 0.035, 0);
      wheel.rotation.x = Math.PI / 2;
      car.add(wheel);
    });

    if (isLoco) {
      const hl = new THREE.Mesh(
        new THREE.SphereGeometry(0.025, 6, 6),
        new THREE.MeshBasicMaterial({ color: 0xffffcc })
      );
      hl.position.set(bodyL / 2 + 0.01, bodyH / 2 + 0.05, 0);
      car.add(hl);
      const hlL = new THREE.PointLight(0xffffcc, 0.5, 3);
      hlL.position.set(bodyL / 2 + 0.05, bodyH / 2 + 0.05, 0);
      car.add(hlL);
    }

    return car;
  };

  const loco = makeCar(color, true);
  train.add(loco);
  for (let i = 1; i <= carriages; i++) {
    const car = makeCar(
      new THREE.Color(color).offsetHSL(0, -0.05 * i, 0.02 * i).getHex(),
      false
    );
    car.position.x = -i * 0.55;
    train.add(car);
  }

  return train;
}

// ====== PLAYER CAR ======
function createPlayerCar(): THREE.Group {
  const car = new THREE.Group();

  // Body
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(0.4, 0.12, 0.2),
    new THREE.MeshStandardMaterial({ color: 0xeeeeee, roughness: 0.15, metalness: 0.6 })
  );
  body.position.y = 0.08;
  body.castShadow = true;
  car.add(body);

  // Cabin
  const cabin = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 0.1, 0.17),
    new THREE.MeshStandardMaterial({ color: 0x88ccee, roughness: 0.05, metalness: 0.3, transparent: true, opacity: 0.6 })
  );
  cabin.position.set(-0.02, 0.19, 0);
  car.add(cabin);

  // Wheels
  const wheelGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.04, 10);
  const wheelMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.7, metalness: 0.3 });
  [[-0.12, -0.12], [-0.12, 0.12], [0.12, -0.12], [0.12, 0.12]].forEach(([x, z]) => {
    const w = new THREE.Mesh(wheelGeo, wheelMat);
    w.position.set(x, 0.04, z);
    w.rotation.x = Math.PI / 2;
    car.add(w);
  });

  // Headlights
  [-1, 1].forEach(z => {
    const hl = new THREE.Mesh(
      new THREE.SphereGeometry(0.02, 6, 6),
      new THREE.MeshBasicMaterial({ color: 0xffffcc })
    );
    hl.position.set(0.21, 0.08, z * 0.07);
    car.add(hl);
  });

  // Headlight beam
  const beam = new THREE.SpotLight(0xffffcc, 1, 4, Math.PI / 5, 0.5);
  beam.position.set(0.22, 0.1, 0);
  beam.target.position.set(2, 0, 0);
  car.add(beam);
  car.add(beam.target);

  // Taillights
  [-1, 1].forEach(z => {
    const tl = new THREE.Mesh(
      new THREE.SphereGeometry(0.015, 6, 6),
      new THREE.MeshBasicMaterial({ color: 0xff2200 })
    );
    tl.position.set(-0.21, 0.08, z * 0.07);
    car.add(tl);
  });

  return car;
}

// ====== NPC CAR ======
function createNPCCar(color: number): THREE.Group {
  const g = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.08, 0.14),
    new THREE.MeshStandardMaterial({ color, roughness: 0.3, metalness: 0.4 })
  );
  body.position.y = 0.06;
  body.castShadow = true;
  g.add(body);

  const cab = new THREE.Mesh(
    new THREE.BoxGeometry(0.12, 0.06, 0.12),
    new THREE.MeshStandardMaterial({ color: 0x88bbdd, transparent: true, opacity: 0.5, roughness: 0.1 })
  );
  cab.position.set(-0.02, 0.14, 0);
  g.add(cab);

  // Wheels
  [[-0.1, -1], [-0.1, 1], [0.1, -1], [0.1, 1]].forEach(([x, z]) => {
    const w = new THREE.Mesh(
      new THREE.CylinderGeometry(0.025, 0.025, 0.03, 8),
      new THREE.MeshStandardMaterial({ color: 0x222222 })
    );
    w.position.set(x, 0.025, (z as number) * 0.075);
    w.rotation.x = Math.PI / 2;
    g.add(w);
  });

  // Headlights
  const hl = new THREE.Mesh(new THREE.SphereGeometry(0.012, 4, 4), new THREE.MeshBasicMaterial({ color: 0xffffcc }));
  hl.position.set(0.16, 0.06, 0);
  g.add(hl);

  return g;
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
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0e1a);
    scene.fog = new THREE.FogExp2(0x0a0e1a, 0.02);

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 200);

    // ====== LIGHTING — warm Tokyo evening ======
    scene.add(new THREE.AmbientLight(0x3344667, 0.4));

    const sunLight = new THREE.DirectionalLight(0xffcc88, 1.2);
    sunLight.position.set(8, 15, 5);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.set(4096, 4096);
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 60;
    sunLight.shadow.camera.left = -15;
    sunLight.shadow.camera.right = 15;
    sunLight.shadow.camera.top = 15;
    sunLight.shadow.camera.bottom = -15;
    sunLight.shadow.bias = -0.001;
    scene.add(sunLight);

    const warmFill = new THREE.DirectionalLight(0xff6633, 0.5);
    warmFill.position.set(-8, 3, 12);
    scene.add(warmFill);

    const coolRim = new THREE.DirectionalLight(0x4488cc, 0.3);
    coolRim.position.set(6, -4, -10);
    scene.add(coolRim);

    scene.add(new THREE.HemisphereLight(0x7788bb, 0x553322, 0.45));

    // ====== GROUND (floating island) ======
    // Main island body — a thick rounded disk
    const islandGeo = new THREE.CylinderGeometry(GROUND_SIZE / 2, GROUND_SIZE / 2 - 0.5, 2, 64, 1);
    const groundCanvas = document.createElement('canvas');
    groundCanvas.width = 2048;
    groundCanvas.height = 2048;
    const gCtx = groundCanvas.getContext('2d')!;

    // Rich green base
    const grad = gCtx.createRadialGradient(1024, 1024, 0, 1024, 1024, 1024);
    grad.addColorStop(0, '#4a7a3f');
    grad.addColorStop(0.5, '#3a6830');
    grad.addColorStop(0.8, '#2d5525');
    grad.addColorStop(1, '#1d4518');
    gCtx.fillStyle = grad;
    gCtx.fillRect(0, 0, 2048, 2048);

    // Road network
    gCtx.strokeStyle = '#444444';
    gCtx.lineWidth = 28;
    // Main ring road
    gCtx.beginPath();
    gCtx.arc(1024, 1024, 500, 0, Math.PI * 2);
    gCtx.stroke();
    // Cross streets
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      gCtx.beginPath();
      gCtx.moveTo(1024 + Math.cos(angle) * 180, 1024 + Math.sin(angle) * 180);
      gCtx.lineTo(1024 + Math.cos(angle) * 850, 1024 + Math.sin(angle) * 850);
      gCtx.stroke();
    }
    // Horizontal + vertical main roads
    gCtx.lineWidth = 32;
    gCtx.beginPath(); gCtx.moveTo(100, 1024); gCtx.lineTo(1948, 1024); gCtx.stroke();
    gCtx.beginPath(); gCtx.moveTo(1024, 100); gCtx.lineTo(1024, 1948); gCtx.stroke();

    // Road markings
    gCtx.strokeStyle = '#888855';
    gCtx.lineWidth = 2;
    gCtx.setLineDash([10, 15]);
    gCtx.beginPath(); gCtx.moveTo(100, 1024); gCtx.lineTo(1948, 1024); gCtx.stroke();
    gCtx.beginPath(); gCtx.moveTo(1024, 100); gCtx.lineTo(1024, 1948); gCtx.stroke();
    gCtx.setLineDash([]);

    // Sidewalks
    gCtx.strokeStyle = '#666655';
    gCtx.lineWidth = 40;
    gCtx.globalAlpha = 0.2;
    gCtx.beginPath(); gCtx.moveTo(100, 1024); gCtx.lineTo(1948, 1024); gCtx.stroke();
    gCtx.beginPath(); gCtx.moveTo(1024, 100); gCtx.lineTo(1024, 1948); gCtx.stroke();
    gCtx.globalAlpha = 1;

    // Grass texture detail
    for (let i = 0; i < 40000; i++) {
      const x = Math.random() * 2048;
      const y = Math.random() * 2048;
      gCtx.fillStyle = `rgba(${30 + Math.random() * 40}, ${70 + Math.random() * 60}, ${20 + Math.random() * 25}, ${0.08 + Math.random() * 0.1})`;
      gCtx.fillRect(x, y, 1, 1 + Math.random() * 2);
    }

    const groundTex = new THREE.CanvasTexture(groundCanvas);
    const islandMat = new THREE.MeshStandardMaterial({
      map: groundTex, roughness: 0.85, metalness: 0.05,
      bumpMap: groundTex, bumpScale: 0.01,
    });
    const island = new THREE.Mesh(islandGeo, islandMat);
    island.position.y = -1;
    island.receiveShadow = true;
    scene.add(island);

    // Island underside (dirt/rock)
    const undersideMat = new THREE.MeshStandardMaterial({ color: 0x5a4a3a, roughness: 0.9, metalness: 0.05 });
    // Hanging rock formations under island
    for (let i = 0; i < 20; i++) {
      const rx = (Math.random() - 0.5) * GROUND_SIZE * 0.8;
      const rz = (Math.random() - 0.5) * GROUND_SIZE * 0.8;
      const dist = Math.sqrt(rx * rx + rz * rz);
      if (dist > GROUND_SIZE / 2 - 1) continue;
      const rockH = 0.5 + Math.random() * 2;
      const rockW = 0.3 + Math.random() * 0.8;
      const rock = new THREE.Mesh(
        new THREE.ConeGeometry(rockW, rockH, 6),
        new THREE.MeshStandardMaterial({
          color: new THREE.Color().setHSL(0.08, 0.3 + Math.random() * 0.2, 0.25 + Math.random() * 0.15),
          roughness: 0.9,
        })
      );
      rock.position.set(rx, -2 - rockH / 2, rz);
      rock.rotation.x = Math.PI; // point downward
      scene.add(rock);
    }

    // ====== RIVER ======
    const riverPoints: THREE.Vector3[] = [];
    for (let i = 0; i <= 40; i++) {
      const t = i / 40;
      const x = -6 + t * 12;
      const z = Math.sin(t * Math.PI * 2.5) * 1.5 + 1;
      riverPoints.push(new THREE.Vector3(x, 0.01, z));
    }
    const riverCurve = new THREE.CatmullRomCurve3(riverPoints);
    const riverGeo = new THREE.TubeGeometry(riverCurve, 100, 0.3, 8, false);
    const riverMat = new THREE.MeshStandardMaterial({
      color: 0x1177aa, roughness: 0.05, metalness: 0.4,
      transparent: true, opacity: 0.7,
    });
    const river = new THREE.Mesh(riverGeo, riverMat);
    scene.add(river);

    // River banks
    const bankGeo = new THREE.TubeGeometry(riverCurve, 100, 0.4, 8, false);
    const bank = new THREE.Mesh(bankGeo, new THREE.MeshStandardMaterial({
      color: 0x556644, roughness: 0.9, transparent: true, opacity: 0.4,
    }));
    scene.add(bank);

    // ====== BRIDGES over river ======
    const bridgePositions = [
      { x: -3, z: 1.2, rot: 0.3 },
      { x: 0, z: 1, rot: 0 },
      { x: 3, z: 0.5, rot: -0.2 },
    ];
    bridgePositions.forEach(({ x, z, rot }) => {
      const bg = new THREE.Group();
      bg.position.set(x, 0.08, z);
      bg.rotation.y = rot;

      // Deck
      const deck = new THREE.Mesh(
        new THREE.BoxGeometry(1.2, 0.04, 0.6),
        new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.4, metalness: 0.4 })
      );
      bg.add(deck);

      // Red railings
      [-1, 1].forEach(side => {
        for (let p = 0; p < 8; p++) {
          const post = new THREE.Mesh(
            new THREE.CylinderGeometry(0.01, 0.01, 0.12, 4),
            new THREE.MeshStandardMaterial({ color: 0xcc2211, metalness: 0.5 })
          );
          post.position.set((p / 7 - 0.5) * 1, 0.08, side * 0.27);
          bg.add(post);
        }
        const rail = new THREE.Mesh(
          new THREE.CylinderGeometry(0.008, 0.008, 1, 4),
          new THREE.MeshStandardMaterial({ color: 0xcc2211, metalness: 0.5 })
        );
        rail.position.set(0, 0.14, side * 0.27);
        rail.rotation.z = Math.PI / 2;
        bg.add(rail);
      });

      scene.add(bg);
    });

    // ====== TOKYO TOWER ======
    const tokyoTower = createTokyoTower(4);
    tokyoTower.position.set(2, 0, -5);
    scene.add(tokyoTower);

    // ====== MAIN BUILDINGS (resume sections) ======
    const buildingMeshes: { mesh: THREE.Group; id: string; position: THREE.Vector3 }[] = [];

    BUILDINGS.forEach((b, i) => {
      let building: THREE.Group;
      if (i === 0) {
        building = createSkyscraper(0.8, 2.5, 0.7, b.color);
      } else if (i === 1) {
        building = createJapaneseShop(0.9, 0.9, 0.7, 0xf0dcc0, b.color, b.glowColor);
      } else if (i === 2) {
        building = createPagoda(2, 0.8, 4, b.color);
      } else if (i === 3) {
        building = createSkyscraper(0.6, 1.8, 0.5, 0xbbaa88);
      } else if (i === 4) {
        building = createJapaneseShop(0.8, 0.7, 0.6, 0xe0ccaa, b.color, b.glowColor);
      } else {
        building = createPagoda(1.5, 0.7, 3, b.color);
      }

      building.position.set(b.x, 0, b.z);
      scene.add(building);

      // Warm glow
      const pLight = new THREE.PointLight(b.glowColor, 0.6, 4);
      pLight.position.set(b.x, 1.5, b.z);
      scene.add(pLight);

      // Label sprite
      const canvas = document.createElement('canvas');
      canvas.width = 256; canvas.height = 64;
      const ctx = canvas.getContext('2d')!;
      ctx.clearRect(0, 0, 256, 64);
      ctx.font = 'bold 18px monospace';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#ffe4a0';
      ctx.shadowColor = '#ff6622';
      ctx.shadowBlur = 10;
      ctx.fillText(b.name, 128, 40);
      const tex = new THREE.CanvasTexture(canvas);
      const spriteMat = new THREE.SpriteMaterial({ map: tex, transparent: true, opacity: 0.9 });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.scale.set(1.5, 0.45, 1);
      sprite.position.set(b.x, 3, b.z);
      scene.add(sprite);

      buildingMeshes.push({ mesh: building, id: b.id, position: new THREE.Vector3(b.x, 0, b.z) });
    });

    // ====== FILLER BUILDINGS (dense city) ======
    const fillerPositions: THREE.Vector3[] = [];
    for (let i = 0; i < 80; i++) {
      const x = (Math.random() - 0.5) * (GROUND_SIZE - 2);
      const z = (Math.random() - 0.5) * (GROUND_SIZE - 2);
      const pos = new THREE.Vector3(x, 0, z);
      const dist = Math.sqrt(x * x + z * z);
      if (dist > GROUND_SIZE / 2 - 1.5) continue;

      // Don't overlap with main buildings or river
      let skip = false;
      for (const b of BUILDINGS) {
        if (pos.distanceTo(new THREE.Vector3(b.x, 0, b.z)) < 1.5) { skip = true; break; }
      }
      // Avoid river zone
      if (Math.abs(z - Math.sin((x / 12 + 0.5) * Math.PI * 2.5) * 1.5 - 1) < 0.8) skip = true;
      if (skip) continue;

      fillerPositions.push(pos);
      const h = 0.3 + Math.random() * 1.2;
      const w = 0.2 + Math.random() * 0.4;
      const d = 0.2 + Math.random() * 0.3;

      const bMesh = new THREE.Mesh(
        new THREE.BoxGeometry(w, h, d),
        new THREE.MeshStandardMaterial({
          color: new THREE.Color().setHSL(0.06 + Math.random() * 0.08, 0.15 + Math.random() * 0.25, 0.4 + Math.random() * 0.3),
          roughness: 0.5, metalness: 0.2,
        })
      );
      bMesh.position.set(x, h / 2, z);
      bMesh.castShadow = true;
      bMesh.receiveShadow = true;
      scene.add(bMesh);

      // Windows
      const winFloors = Math.floor(h / 0.2);
      for (let f = 0; f < winFloors; f++) {
        const lit = Math.random() > 0.25;
        const win = new THREE.Mesh(
          new THREE.PlaneGeometry(w * 0.35, 0.08),
          new THREE.MeshBasicMaterial({
            color: lit ? (Math.random() > 0.5 ? 0xffe4a0 : 0x80c8ff) : 0x1a2030,
            transparent: true, opacity: lit ? 0.7 : 0.1, side: THREE.DoubleSide
          })
        );
        win.position.set(x, f * 0.2 + 0.15, z + d / 2 + 0.003);
        scene.add(win);
      }

      // Rooftop
      const roofMesh = new THREE.Mesh(
        new THREE.BoxGeometry(w * 1.05, 0.02, d * 1.05),
        new THREE.MeshStandardMaterial({ color: 0x444444 })
      );
      roofMesh.position.set(x, h, z);
      scene.add(roofMesh);
    }

    // ====== STREET LAMPS ======
    for (let i = 0; i < 40; i++) {
      const x = (Math.random() - 0.5) * (GROUND_SIZE - 2);
      const z = (Math.random() - 0.5) * (GROUND_SIZE - 2);
      if (Math.sqrt(x * x + z * z) > GROUND_SIZE / 2 - 1) continue;

      const lampG = new THREE.Group();
      lampG.position.set(x, 0, z);

      const pole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.025, 0.8, 6),
        new THREE.MeshStandardMaterial({ color: 0x444444, metalness: 0.7 })
      );
      pole.position.y = 0.4;
      lampG.add(pole);

      const lampHead = new THREE.Mesh(
        new THREE.SphereGeometry(0.04, 8, 6),
        new THREE.MeshBasicMaterial({ color: 0xffeebb })
      );
      lampHead.position.y = 0.82;
      lampG.add(lampHead);

      const light = new THREE.PointLight(0xffeebb, 0.35, 2);
      light.position.y = 0.82;
      lampG.add(light);

      scene.add(lampG);
    }

    // ====== CHERRY BLOSSOM TREES ======
    for (let i = 0; i < 25; i++) {
      const x = (Math.random() - 0.5) * (GROUND_SIZE - 3);
      const z = (Math.random() - 0.5) * (GROUND_SIZE - 3);
      if (Math.sqrt(x * x + z * z) > GROUND_SIZE / 2 - 2) continue;

      let skip = false;
      for (const b of BUILDINGS) {
        if (new THREE.Vector3(x, 0, z).distanceTo(new THREE.Vector3(b.x, 0, b.z)) < 1.5) { skip = true; break; }
      }
      if (skip) continue;

      const tree = new THREE.Group();
      tree.position.set(x, 0, z);

      const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.06, 0.5, 6),
        new THREE.MeshStandardMaterial({ color: 0x5a3828, roughness: 0.9 })
      );
      trunk.position.y = 0.25;
      tree.add(trunk);

      const isCherryBlossom = Math.random() > 0.3;
      const color = isCherryBlossom
        ? [0xff88aa, 0xff99bb, 0xffaacc][Math.floor(Math.random() * 3)]
        : [0x44aa55, 0x338844][Math.floor(Math.random() * 2)];

      for (let c = 0; c < 4; c++) {
        const canopy = new THREE.Mesh(
          new THREE.SphereGeometry(0.15 + Math.random() * 0.12, 8, 6),
          new THREE.MeshStandardMaterial({
            color, roughness: 0.8,
            transparent: isCherryBlossom, opacity: isCherryBlossom ? 0.8 : 1,
          })
        );
        canopy.position.set(
          (Math.random() - 0.5) * 0.12,
          0.55 + c * 0.08,
          (Math.random() - 0.5) * 0.12
        );
        canopy.castShadow = true;
        tree.add(canopy);
      }

      scene.add(tree);
    }

    // ====== ELEVATED TRAIN TRACK (ring around city) ======
    const trackRadius = 5.5;
    const trackHeight = 0.6;
    const trackSegs = 120;

    // Track pillars
    for (let i = 0; i < trackSegs; i += 4) {
      const angle = (i / trackSegs) * Math.PI * 2;
      const x = Math.cos(angle) * trackRadius;
      const z = Math.sin(angle) * trackRadius;
      const pillar = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.05, trackHeight, 6),
        new THREE.MeshStandardMaterial({ color: 0x777777, metalness: 0.5, roughness: 0.4 })
      );
      pillar.position.set(x, trackHeight / 2, z);
      pillar.castShadow = true;
      scene.add(pillar);
    }

    // Track rail ring
    const trackPoints: THREE.Vector3[] = [];
    for (let i = 0; i <= trackSegs; i++) {
      const angle = (i / trackSegs) * Math.PI * 2;
      trackPoints.push(new THREE.Vector3(
        Math.cos(angle) * trackRadius,
        trackHeight,
        Math.sin(angle) * trackRadius
      ));
    }
    const trackCurve = new THREE.CatmullRomCurve3(trackPoints, true);
    // Track bed
    const trackBedGeo = new THREE.TubeGeometry(trackCurve, 300, 0.12, 6, true);
    const trackBed = new THREE.Mesh(trackBedGeo, new THREE.MeshStandardMaterial({
      color: 0x666666, roughness: 0.5, metalness: 0.4,
    }));
    scene.add(trackBed);

    // Rails on top
    [-0.06, 0.06].forEach(offset => {
      const railPoints: THREE.Vector3[] = [];
      for (let i = 0; i <= trackSegs; i++) {
        const angle = (i / trackSegs) * Math.PI * 2;
        const x = Math.cos(angle) * (trackRadius + offset);
        const z = Math.sin(angle) * (trackRadius + offset);
        railPoints.push(new THREE.Vector3(x, trackHeight + 0.12, z));
      }
      const railCurve = new THREE.CatmullRomCurve3(railPoints, true);
      const rail = new THREE.Mesh(
        new THREE.TubeGeometry(railCurve, 300, 0.01, 4, true),
        new THREE.MeshStandardMaterial({ color: 0xaaaaaa, metalness: 0.8, roughness: 0.2 })
      );
      scene.add(rail);
    });

    // ====== TRAINS ======
    const train1 = createTrain(0x226644, 3);
    const train2 = createTrain(0xcc3311, 2);
    scene.add(train1);
    scene.add(train2);

    // ====== NPC CARS ======
    const npcCars: { mesh: THREE.Group; radius: number; speed: number; offset: number }[] = [];
    const carColors = [0xcc2222, 0x2255cc, 0xffcc00, 0x22cc44, 0xffffff, 0x222222, 0xff6600, 0xdd44aa];
    for (let i = 0; i < 10; i++) {
      const npc = createNPCCar(carColors[i % carColors.length]);
      scene.add(npc);
      npcCars.push({
        mesh: npc,
        radius: 2 + Math.random() * 4,
        speed: 0.15 + Math.random() * 0.3,
        offset: Math.random() * Math.PI * 2,
      });
    }

    // ====== PLAYER CAR ======
    const playerCar = createPlayerCar();
    scene.add(playerCar);

    // ====== CHERRY BLOSSOM PETALS ======
    const petalCount = 600;
    const petalGeo = new THREE.BufferGeometry();
    const petalPos = new Float32Array(petalCount * 3);
    const petalCol = new Float32Array(petalCount * 3);
    const petalVels: THREE.Vector3[] = [];
    for (let i = 0; i < petalCount; i++) {
      petalPos[i * 3] = (Math.random() - 0.5) * GROUND_SIZE;
      petalPos[i * 3 + 1] = 1 + Math.random() * 5;
      petalPos[i * 3 + 2] = (Math.random() - 0.5) * GROUND_SIZE;
      petalCol[i * 3] = 1;
      petalCol[i * 3 + 1] = 0.6 + Math.random() * 0.3;
      petalCol[i * 3 + 2] = 0.7 + Math.random() * 0.2;
      petalVels.push(new THREE.Vector3(
        (Math.random() - 0.5) * 0.005,
        -0.002 - Math.random() * 0.003,
        (Math.random() - 0.5) * 0.005
      ));
    }
    petalGeo.setAttribute('position', new THREE.BufferAttribute(petalPos, 3));
    petalGeo.setAttribute('color', new THREE.BufferAttribute(petalCol, 3));
    const petals = new THREE.Points(petalGeo, new THREE.PointsMaterial({
      size: 0.06, transparent: true, opacity: 0.6, vertexColors: true
    }));
    scene.add(petals);

    // ====== CLOUDS ======
    const cloudMat = new THREE.MeshStandardMaterial({
      color: 0xffffff, transparent: true, opacity: 0.2, roughness: 1, depthWrite: false,
    });
    const cloudGroups: THREE.Group[] = [];
    for (let i = 0; i < 8; i++) {
      const cg = new THREE.Group();
      for (let b = 0; b < 4; b++) {
        const blob = new THREE.Mesh(
          new THREE.SphereGeometry(0.3 + Math.random() * 0.5, 8, 6),
          cloudMat
        );
        blob.position.set((Math.random() - 0.5) * 1.2, (Math.random() - 0.5) * 0.15, (Math.random() - 0.5) * 0.6);
        blob.scale.y = 0.35;
        cg.add(blob);
      }
      cg.position.set(
        (Math.random() - 0.5) * GROUND_SIZE * 1.2,
        4 + Math.random() * 3,
        (Math.random() - 0.5) * GROUND_SIZE * 1.2
      );
      scene.add(cg);
      cloudGroups.push(cg);
    }

    // ====== STARFIELD ======
    const starCount = 3000;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const r = 60 + Math.random() * 100;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      starPositions[i * 3] = r * Math.sin(p) * Math.cos(t);
      starPositions[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
      starPositions[i * 3 + 2] = r * Math.cos(p);
      const w = Math.random();
      starColors[i * 3] = w > 0.7 ? 1 : 0.8;
      starColors[i * 3 + 1] = w > 0.7 ? 0.9 : 0.85;
      starColors[i * 3 + 2] = w > 0.4 ? 1 : 0.7;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({
      size: 0.12, transparent: true, opacity: 0.7, vertexColors: true
    })));

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

      // Move car on flat ground
      if (Math.abs(moveForward) > 0.01) {
        const dir = new THREE.Vector3(
          Math.sin(headingRef.current),
          0,
          Math.cos(headingRef.current)
        );
        charPosRef.current.addScaledVector(dir, moveForward * MOVE_SPEED);
        // Clamp to island
        const dist = Math.sqrt(charPosRef.current.x ** 2 + charPosRef.current.z ** 2);
        if (dist > GROUND_SIZE / 2 - 0.5) {
          charPosRef.current.x *= (GROUND_SIZE / 2 - 0.5) / dist;
          charPosRef.current.z *= (GROUND_SIZE / 2 - 0.5) / dist;
        }
      }

      // Position player car
      playerCar.position.set(charPosRef.current.x, 0.02, charPosRef.current.z);
      playerCar.rotation.y = -headingRef.current;

      // Slight body roll when turning
      playerCar.rotation.z = -turnInput * 0.06;

      // Camera - third person behind car
      const camDir = new THREE.Vector3(
        -Math.sin(headingRef.current),
        0,
        -Math.cos(headingRef.current)
      );
      const targetCamPos = new THREE.Vector3(
        charPosRef.current.x + camDir.x * CAMERA_DISTANCE,
        CAMERA_HEIGHT,
        charPosRef.current.z + camDir.z * CAMERA_DISTANCE
      );

      if (!camInitialized) {
        camPosSmooth.copy(targetCamPos);
        camInitialized = true;
      } else {
        camPosSmooth.lerp(targetCamPos, 0.08);
      }
      camera.position.copy(camPosSmooth);
      camera.lookAt(charPosRef.current.x, 0.3, charPosRef.current.z);

      // Trains on elevated track
      [
        { train: train1, speed: 0.2, offset: 0 },
        { train: train2, speed: 0.15, offset: Math.PI },
      ].forEach(({ train, speed, offset }) => {
        const angle = time * speed + offset;
        const x = Math.cos(angle) * trackRadius;
        const z = Math.sin(angle) * trackRadius;
        train.position.set(x, trackHeight + 0.12, z);
        // Face direction of travel
        const nextAngle = angle + 0.05;
        const nx = Math.cos(nextAngle) * trackRadius;
        const nz = Math.sin(nextAngle) * trackRadius;
        train.lookAt(nx, trackHeight + 0.12, nz);
      });

      // NPC cars circling
      npcCars.forEach(({ mesh, radius, speed, offset }) => {
        const angle = time * speed + offset;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        mesh.position.set(x, 0.01, z);
        const na = angle + 0.05;
        mesh.lookAt(Math.cos(na) * radius, 0.01, Math.sin(na) * radius);
      });

      // Petals falling
      const petalPosAttr = petals.geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < petalCount; i++) {
        let px = petalPosAttr.getX(i) + petalVels[i].x;
        let py = petalPosAttr.getY(i) + petalVels[i].y;
        let pz = petalPosAttr.getZ(i) + petalVels[i].z;
        // Wind
        px += Math.sin(time * 0.5 + i * 0.1) * 0.002;
        if (py < 0) {
          px = (Math.random() - 0.5) * GROUND_SIZE;
          py = 4 + Math.random() * 4;
          pz = (Math.random() - 0.5) * GROUND_SIZE;
        }
        petalPosAttr.setXYZ(i, px, py, pz);
      }
      petalPosAttr.needsUpdate = true;

      // Clouds drift
      cloudGroups.forEach((cg, i) => {
        cg.position.x += Math.sin(time * 0.05 + i) * 0.002;
        cg.position.z += Math.cos(time * 0.03 + i) * 0.001;
      });

      // Building proximity
      let closestBuilding: string | null = null;
      let closestDist = PROXIMITY_THRESHOLD;
      for (const b of buildingMeshes) {
        const d = new THREE.Vector2(
          charPosRef.current.x - b.position.x,
          charPosRef.current.z - b.position.z
        ).length();
        if (d < closestDist) { closestDist = d; closestBuilding = b.id; }
      }
      if (closestBuilding !== activeBuildingRef.current) {
        activeBuildingRef.current = closestBuilding;
        onBuildingProximity(closestBuilding);
      }

      // Tokyo tower blinking
      tokyoTower.traverse(c => {
        if (c instanceof THREE.PointLight && c.color.r > 0.9 && c.color.g < 0.2) {
          c.intensity = Math.sin(time * 4) > 0 ? 1 : 0.1;
        }
      });

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
