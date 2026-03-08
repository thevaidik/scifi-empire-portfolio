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
const MOVE_SPEED = 0.018;
const TURN_SPEED = 0.035;
const CAMERA_DISTANCE = 2.5;
const CAMERA_HEIGHT_OFFSET = 0.8;
const PROXIMITY_THRESHOLD = 1.8;
const CAR_HEIGHT = 0.08;

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

function placeOnSurface(obj: THREE.Object3D, theta: number, phi: number, radius: number, heightOffset = 0) {
  const pos = sphericalToCartesian(theta, phi, radius);
  const up = pos.clone().normalize();
  obj.position.copy(pos.clone().add(up.clone().multiplyScalar(heightOffset)));
  obj.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), up);
}

// ====== TOKYO TOWER ======
function createTokyoTower(height: number): THREE.Group {
  const g = new THREE.Group();
  const segments = 12;
  const legMat = new THREE.MeshStandardMaterial({ color: 0xff4422, roughness: 0.4, metalness: 0.3 });

  // Four legs tapering inward
  for (let leg = 0; leg < 4; leg++) {
    const angle = (leg / 4) * Math.PI * 2 + Math.PI / 4;
    const baseR = 0.15;
    const topR = 0.02;
    for (let s = 0; s < segments; s++) {
      const t0 = s / segments;
      const t1 = (s + 1) / segments;
      const r0 = baseR * (1 - t0) + topR * t0;
      const r1 = baseR * (1 - t1) + topR * t1;
      const segH = height / segments;
      const geo = new THREE.CylinderGeometry(0.008, 0.008, segH * 1.05, 4);
      const mesh = new THREE.Mesh(geo, legMat);
      mesh.position.set(
        Math.cos(angle) * (r0 + r1) / 2,
        s * segH + segH / 2,
        Math.sin(angle) * (r0 + r1) / 2
      );
      // Tilt toward center
      const tiltAngle = Math.atan2(baseR - topR, height) * 0.8;
      mesh.rotation.z = Math.cos(angle) * tiltAngle;
      mesh.rotation.x = -Math.sin(angle) * tiltAngle;
      g.add(mesh);
    }
  }

  // Cross braces
  const braceMat = new THREE.MeshStandardMaterial({ color: 0xee3311, roughness: 0.5, metalness: 0.2 });
  for (let level = 0; level < 6; level++) {
    const y = (level / 6) * height * 0.7;
    const t = level / 6;
    const r = 0.15 * (1 - t) + 0.02 * t;
    const ringGeo = new THREE.TorusGeometry(r, 0.004, 4, 8);
    const ring = new THREE.Mesh(ringGeo, braceMat);
    ring.position.y = y;
    ring.rotation.x = Math.PI / 2;
    g.add(ring);
  }

  // Observation decks
  [0.4, 0.65].forEach(frac => {
    const deckR = 0.15 * (1 - frac) + 0.02 * frac;
    const deckGeo = new THREE.CylinderGeometry(deckR * 1.8, deckR * 1.5, 0.03, 16);
    const deckMat = new THREE.MeshStandardMaterial({ color: 0xdddddd, roughness: 0.3, metalness: 0.5 });
    const deck = new THREE.Mesh(deckGeo, deckMat);
    deck.position.y = frac * height;
    g.add(deck);
    // Windows around deck
    for (let w = 0; w < 12; w++) {
      const wa = (w / 12) * Math.PI * 2;
      const wGeo = new THREE.PlaneGeometry(0.015, 0.02);
      const wMat = new THREE.MeshBasicMaterial({ color: 0xffe4a0, transparent: true, opacity: 0.7, side: THREE.DoubleSide });
      const wMesh = new THREE.Mesh(wGeo, wMat);
      wMesh.position.set(Math.cos(wa) * deckR * 1.65, frac * height, Math.sin(wa) * deckR * 1.65);
      wMesh.lookAt(new THREE.Vector3(0, frac * height, 0));
      g.add(wMesh);
    }
  });

  // Antenna spire
  const spireGeo = new THREE.CylinderGeometry(0.003, 0.008, height * 0.35, 6);
  const spireMat = new THREE.MeshStandardMaterial({ color: 0xeeeeee, metalness: 0.8, roughness: 0.2 });
  const spire = new THREE.Mesh(spireGeo, spireMat);
  spire.position.y = height + height * 0.175;
  g.add(spire);

  // Blinking red light at top
  const topLight = new THREE.PointLight(0xff0000, 0.8, 2);
  topLight.position.y = height + height * 0.35;
  g.add(topLight);
  const topBulb = new THREE.Mesh(new THREE.SphereGeometry(0.012, 6, 6), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
  topBulb.position.y = height + height * 0.35;
  g.add(topBulb);

  return g;
}

// ====== SKYSCRAPER ======
function createSkyscraper(width: number, height: number, depth: number, color: number, windowColor: number): THREE.Group {
  const g = new THREE.Group();
  const bodyGeo = new THREE.BoxGeometry(width, height, depth);
  const bodyMat = new THREE.MeshStandardMaterial({ color, roughness: 0.4, metalness: 0.3 });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.position.y = height / 2;
  body.castShadow = true;
  g.add(body);

  // Window grid all 4 sides
  const floors = Math.floor(height / 0.06);
  const cols = Math.max(2, Math.floor(width / 0.05));
  const winH = 0.035;
  const winW = 0.025;
  for (let side = 0; side < 4; side++) {
    for (let f = 0; f < floors; f++) {
      for (let c = 0; c < cols; c++) {
        const lit = Math.random() > 0.25;
        const wColor = lit ? (Math.random() > 0.5 ? windowColor : 0xffc86e) : 0x223344;
        const wGeo = new THREE.PlaneGeometry(winW, winH);
        const wMat = new THREE.MeshBasicMaterial({ color: wColor, transparent: true, opacity: lit ? 0.85 : 0.2, side: THREE.DoubleSide });
        const w = new THREE.Mesh(wGeo, wMat);
        const xOff = ((c / (cols - 1)) - 0.5) * width * 0.85;
        const yOff = f * 0.06 + 0.05;
        const sideW = side < 2 ? width : depth;
        const xO = side < 2 ? xOff : ((c / (cols - 1)) - 0.5) * depth * 0.85;

        if (side === 0) w.position.set(xOff, yOff, depth / 2 + 0.002);
        else if (side === 1) { w.position.set(xOff, yOff, -depth / 2 - 0.002); w.rotation.y = Math.PI; }
        else if (side === 2) { w.position.set(width / 2 + 0.002, yOff, xO); w.rotation.y = Math.PI / 2; }
        else { w.position.set(-width / 2 - 0.002, yOff, xO); w.rotation.y = -Math.PI / 2; }
        g.add(w);
      }
    }
  }

  // Rooftop AC units
  for (let i = 0; i < 3; i++) {
    const ac = new THREE.Mesh(
      new THREE.BoxGeometry(0.02, 0.015, 0.015),
      new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.5 })
    );
    ac.position.set((i - 1) * 0.04, height + 0.008, 0);
    g.add(ac);
  }

  return g;
}

// ====== JAPANESE SHOP ======
function createJapaneseShop(w: number, h: number, d: number, wallColor: number, roofColor: number, neonColor: number): THREE.Group {
  const g = new THREE.Group();

  // Walls
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(w, h, d),
    new THREE.MeshStandardMaterial({ color: wallColor, roughness: 0.7 })
  );
  body.position.y = h / 2;
  body.castShadow = true;
  g.add(body);

  // Sloped roof
  const roofGeo = new THREE.BoxGeometry(w * 1.2, 0.02, d * 1.2);
  const roof = new THREE.Mesh(roofGeo, new THREE.MeshStandardMaterial({ color: roofColor, roughness: 0.5 }));
  roof.position.y = h + 0.01;
  g.add(roof);

  // Noren (curtain strips) at entrance
  for (let i = 0; i < 4; i++) {
    const curtain = new THREE.Mesh(
      new THREE.PlaneGeometry(w * 0.15, h * 0.4),
      new THREE.MeshStandardMaterial({ color: 0x2244aa, side: THREE.DoubleSide, transparent: true, opacity: 0.8 })
    );
    curtain.position.set((i - 1.5) * w * 0.18, h * 0.7, d / 2 + 0.003);
    g.add(curtain);
  }

  // Lanterns on sides
  [-1, 1].forEach(side => {
    const lantern = new THREE.Mesh(
      new THREE.CylinderGeometry(0.015, 0.012, 0.04, 8),
      new THREE.MeshBasicMaterial({ color: 0xff4422, transparent: true, opacity: 0.8 })
    );
    lantern.position.set(side * w / 2 + side * 0.02, h * 0.6, d / 2);
    g.add(lantern);
  });

  // Neon sign
  const signGeo = new THREE.BoxGeometry(w * 0.6, 0.04, 0.005);
  const signMat = new THREE.MeshBasicMaterial({ color: neonColor, transparent: true, opacity: 0.9 });
  const sign = new THREE.Mesh(signGeo, signMat);
  sign.position.set(0, h * 0.85, d / 2 + 0.005);
  g.add(sign);

  // Neon glow light
  const neonLight = new THREE.PointLight(neonColor, 0.4, 0.8);
  neonLight.position.set(0, h * 0.85, d / 2 + 0.05);
  g.add(neonLight);

  // Window glow
  const glass = new THREE.Mesh(
    new THREE.PlaneGeometry(w * 0.7, h * 0.4),
    new THREE.MeshBasicMaterial({ color: 0xffe4a0, transparent: true, opacity: 0.6, side: THREE.DoubleSide })
  );
  glass.position.set(0, h * 0.35, d / 2 + 0.003);
  g.add(glass);

  return g;
}

// ====== CAR (player vehicle) ======
function createCar(): THREE.Group {
  const car = new THREE.Group();

  // Body
  const bodyGeo = new THREE.BoxGeometry(0.12, 0.04, 0.06);
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0xeeeeee, roughness: 0.2, metalness: 0.6 });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.position.y = 0.025;
  car.add(body);

  // Cabin
  const cabinGeo = new THREE.BoxGeometry(0.06, 0.03, 0.05);
  const cabinMat = new THREE.MeshStandardMaterial({ color: 0x88ccee, roughness: 0.1, metalness: 0.3, transparent: true, opacity: 0.7 });
  const cabin = new THREE.Mesh(cabinGeo, cabinMat);
  cabin.position.set(-0.005, 0.06, 0);
  car.add(cabin);

  // Wheels
  const wheelGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.015, 8);
  const wheelMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.8 });
  [[-0.04, -1], [-0.04, 1], [0.04, -1], [0.04, 1]].forEach(([x, z]) => {
    const wheel = new THREE.Mesh(wheelGeo, wheelMat);
    wheel.position.set(x, 0.008, (z as number) * 0.035);
    wheel.rotation.x = Math.PI / 2;
    car.add(wheel);
  });

  // Headlights
  const hlGeo = new THREE.SphereGeometry(0.006, 6, 6);
  const hlMat = new THREE.MeshBasicMaterial({ color: 0xffffcc });
  [-1, 1].forEach(z => {
    const hl = new THREE.Mesh(hlGeo, hlMat);
    hl.position.set(0.062, 0.025, z * 0.02);
    car.add(hl);
  });

  // Headlight beam
  const beamLight = new THREE.SpotLight(0xffffcc, 0.6, 1.5, Math.PI / 6, 0.5);
  beamLight.position.set(0.07, 0.03, 0);
  beamLight.target.position.set(0.5, 0, 0);
  car.add(beamLight);
  car.add(beamLight.target);

  // Taillights
  [-1, 1].forEach(z => {
    const tl = new THREE.Mesh(
      new THREE.SphereGeometry(0.005, 6, 6),
      new THREE.MeshBasicMaterial({ color: 0xff2200 })
    );
    tl.position.set(-0.062, 0.025, z * 0.02);
    car.add(tl);
  });

  // Underglow
  const underLight = new THREE.PointLight(0x4488ff, 0.3, 0.5);
  underLight.position.y = 0.005;
  car.add(underLight);

  return car;
}

// ====== TRAIN (detailed) ======
function createDetailedTrain(color: number, carriages: number): THREE.Group {
  const train = new THREE.Group();

  const createCar = (carColor: number, isLoco: boolean): THREE.Group => {
    const c = new THREE.Group();
    const bodyGeo = new THREE.BoxGeometry(0.14, 0.06, 0.06);
    const bodyMat = new THREE.MeshStandardMaterial({ color: carColor, roughness: 0.3, metalness: 0.4 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 0.035;
    c.add(body);

    // Stripe
    const stripe = new THREE.Mesh(
      new THREE.BoxGeometry(0.145, 0.008, 0.062),
      new THREE.MeshStandardMaterial({ color: 0xdddddd, roughness: 0.3 })
    );
    stripe.position.y = 0.04;
    c.add(stripe);

    // Roof
    const roof = new THREE.Mesh(
      new THREE.BoxGeometry(0.14, 0.008, 0.055),
      new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.4, metalness: 0.3 })
    );
    roof.position.y = 0.07;
    c.add(roof);

    // Windows
    for (let w = -2; w <= 2; w++) {
      const winGeo = new THREE.PlaneGeometry(0.02, 0.028);
      const winMat = new THREE.MeshBasicMaterial({ color: 0xddeeff, transparent: true, opacity: 0.7, side: THREE.DoubleSide });
      const win = new THREE.Mesh(winGeo, winMat);
      win.position.set(w * 0.025, 0.045, 0.031);
      c.add(win);
      const winB = win.clone();
      winB.position.z = -0.031;
      c.add(winB);
    }

    // Interior glow
    const intLight = new THREE.PointLight(0xffe4a0, 0.15, 0.3);
    intLight.position.y = 0.04;
    c.add(intLight);

    // Wheels
    const wGeo = new THREE.CylinderGeometry(0.01, 0.01, 0.065, 8);
    const wMat = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.8 });
    [-1, 1].forEach(s => {
      const wheel = new THREE.Mesh(wGeo, wMat);
      wheel.position.set(s * 0.04, 0.005, 0);
      wheel.rotation.x = Math.PI / 2;
      c.add(wheel);
    });

    if (isLoco) {
      // Headlight
      const hl = new THREE.Mesh(
        new THREE.SphereGeometry(0.008, 6, 6),
        new THREE.MeshBasicMaterial({ color: 0xffffcc })
      );
      hl.position.set(0.072, 0.04, 0);
      c.add(hl);
      const hlLight = new THREE.PointLight(0xffffcc, 0.3, 1);
      hlLight.position.set(0.08, 0.04, 0);
      c.add(hlLight);
    }

    return c;
  };

  // Locomotive
  const loco = createCar(color, true);
  train.add(loco);

  // Carriages
  for (let i = 1; i <= carriages; i++) {
    const carriage = createCar(
      i % 2 === 0 ? color : new THREE.Color(color).offsetHSL(0, -0.1, 0.05).getHex(),
      false
    );
    carriage.position.x = -i * 0.15;
    train.add(carriage);
  }

  return train;
}

// ====== RIVER (tube on surface) ======
function createRiver(scene: THREE.Scene, startTheta: number, startPhi: number, endTheta: number, endPhi: number, segments: number): THREE.Mesh[] {
  const meshes: THREE.Mesh[] = [];
  const points: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const theta = startTheta + (endTheta - startTheta) * t + Math.sin(t * Math.PI * 3) * 0.06;
    const phi = startPhi + (endPhi - startPhi) * t + Math.cos(t * Math.PI * 2) * 0.04;
    points.push(sphericalToCartesian(theta, phi, PLANET_RADIUS + 0.005));
  }

  const curve = new THREE.CatmullRomCurve3(points);
  const riverGeo = new THREE.TubeGeometry(curve, segments * 4, 0.04, 8, false);
  const riverMat = new THREE.MeshStandardMaterial({
    color: 0x2288bb,
    roughness: 0.1,
    metalness: 0.3,
    transparent: true,
    opacity: 0.75,
  });
  const river = new THREE.Mesh(riverGeo, riverMat);
  scene.add(river);
  meshes.push(river);

  // River banks
  const bankGeo = new THREE.TubeGeometry(curve, segments * 4, 0.055, 8, false);
  const bankMat = new THREE.MeshStandardMaterial({
    color: 0x556644,
    roughness: 0.9,
    transparent: true,
    opacity: 0.5,
  });
  const bank = new THREE.Mesh(bankGeo, bankMat);
  scene.add(bank);
  meshes.push(bank);

  return meshes;
}

// ====== BRIDGE ======
function createBridge(theta: number, phi: number, length: number, rotation: number): THREE.Group {
  const g = new THREE.Group();

  // Deck
  const deck = new THREE.Mesh(
    new THREE.BoxGeometry(length, 0.01, 0.1),
    new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.5, metalness: 0.4 })
  );
  deck.position.y = 0.02;
  g.add(deck);

  // Railings
  [-1, 1].forEach(side => {
    for (let i = 0; i < 6; i++) {
      const post = new THREE.Mesh(
        new THREE.CylinderGeometry(0.003, 0.003, 0.04, 4),
        new THREE.MeshStandardMaterial({ color: 0xcc3322, metalness: 0.5 })
      );
      post.position.set((i / 5 - 0.5) * length * 0.9, 0.04, side * 0.045);
      g.add(post);
    }
    // Top rail
    const rail = new THREE.Mesh(
      new THREE.CylinderGeometry(0.002, 0.002, length * 0.9, 4),
      new THREE.MeshStandardMaterial({ color: 0xcc3322, metalness: 0.5 })
    );
    rail.position.set(0, 0.06, side * 0.045);
    rail.rotation.z = Math.PI / 2;
    g.add(rail);
  });

  // Support arches
  for (let i = 0; i < 3; i++) {
    const arch = new THREE.Mesh(
      new THREE.TorusGeometry(0.03, 0.005, 6, 8, Math.PI),
      new THREE.MeshStandardMaterial({ color: 0x777777, metalness: 0.6 })
    );
    arch.position.set((i - 1) * length * 0.3, 0, 0);
    arch.rotation.y = Math.PI / 2;
    g.add(arch);
  }

  placeOnSurface(g, theta, phi, PLANET_RADIUS, 0.01);
  // Apply extra rotation around up axis
  const up = sphericalToCartesian(theta, phi, 1).normalize();
  const rotQ = new THREE.Quaternion().setFromAxisAngle(up, rotation);
  g.quaternion.premultiply(rotQ);

  return g;
}

// ====== CLOUDS ======
function createClouds(scene: THREE.Scene, count: number): THREE.Mesh[] {
  const clouds: THREE.Mesh[] = [];
  const cloudMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.25,
    roughness: 1,
    depthWrite: false,
  });

  for (let i = 0; i < count; i++) {
    const cloudGroup = new THREE.Group();
    const blobCount = 3 + Math.floor(Math.random() * 4);
    for (let b = 0; b < blobCount; b++) {
      const size = 0.08 + Math.random() * 0.15;
      const blob = new THREE.Mesh(
        new THREE.SphereGeometry(size, 8, 6),
        cloudMat
      );
      blob.position.set(
        (Math.random() - 0.5) * 0.3,
        (Math.random() - 0.5) * 0.05,
        (Math.random() - 0.5) * 0.15
      );
      blob.scale.y = 0.4 + Math.random() * 0.3;
      cloudGroup.add(blob);
      clouds.push(blob);
    }

    const t = Math.random() * Math.PI * 2;
    const p = Math.PI * 0.3 + Math.random() * Math.PI * 0.4;
    const altitude = PLANET_RADIUS + 0.6 + Math.random() * 0.4;
    const pos = sphericalToCartesian(t, p, altitude);
    cloudGroup.position.copy(pos);
    cloudGroup.lookAt(0, 0, 0);
    scene.add(cloudGroup);
  }
  return clouds;
}

// ====== NPC CARS (ambient traffic) ======
function createNPCCar(color: number): THREE.Group {
  const g = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(0.08, 0.025, 0.04),
    new THREE.MeshStandardMaterial({ color, roughness: 0.3, metalness: 0.4 })
  );
  body.position.y = 0.015;
  g.add(body);
  const cab = new THREE.Mesh(
    new THREE.BoxGeometry(0.035, 0.02, 0.035),
    new THREE.MeshStandardMaterial({ color: 0x88bbdd, transparent: true, opacity: 0.5, roughness: 0.1 })
  );
  cab.position.set(-0.005, 0.038, 0);
  g.add(cab);
  // Wheels
  [[-0.025, -1], [-0.025, 1], [0.025, -1], [0.025, 1]].forEach(([x, z]) => {
    const w = new THREE.Mesh(
      new THREE.CylinderGeometry(0.008, 0.008, 0.01, 6),
      new THREE.MeshStandardMaterial({ color: 0x222222 })
    );
    w.position.set(x, 0.005, (z as number) * 0.022);
    w.rotation.x = Math.PI / 2;
    g.add(w);
  });
  // Headlights
  const hl = new THREE.Mesh(new THREE.SphereGeometry(0.004, 4, 4), new THREE.MeshBasicMaterial({ color: 0xffffcc }));
  hl.position.set(0.042, 0.015, 0);
  g.add(hl);
  return g;
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

    // ====== RENDERER ======
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0d1b2a);
    scene.fog = new THREE.FogExp2(0x0d1b2a, 0.012);

    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 200);

    // ====== LIGHTING - Golden hour Tokyo ======
    scene.add(new THREE.AmbientLight(0x4466aa, 0.35));

    const sunLight = new THREE.DirectionalLight(0xffcc88, 1.0);
    sunLight.position.set(8, 12, 6);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.set(2048, 2048);
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 50;
    sunLight.shadow.camera.left = -12;
    sunLight.shadow.camera.right = 12;
    sunLight.shadow.camera.top = 12;
    sunLight.shadow.camera.bottom = -12;
    scene.add(sunLight);

    // Warm sunset fill
    const warmFill = new THREE.DirectionalLight(0xff6633, 0.4);
    warmFill.position.set(-6, 2, 10);
    scene.add(warmFill);

    // Cool rim
    const coolRim = new THREE.DirectionalLight(0x4488cc, 0.25);
    coolRim.position.set(5, -5, -8);
    scene.add(coolRim);

    scene.add(new THREE.HemisphereLight(0x8899cc, 0x553322, 0.4));

    // ====== PLANET ======
    const planetGeo = new THREE.SphereGeometry(PLANET_RADIUS, 96, 96);
    const groundCanvas = document.createElement('canvas');
    groundCanvas.width = 2048;
    groundCanvas.height = 2048;
    const gCtx = groundCanvas.getContext('2d')!;

    // Rich green base
    const gradient = gCtx.createRadialGradient(1024, 1024, 0, 1024, 1024, 1400);
    gradient.addColorStop(0, '#4a7a3f');
    gradient.addColorStop(0.4, '#3d6a35');
    gradient.addColorStop(0.7, '#2d5528');
    gradient.addColorStop(1, '#1d4518');
    gCtx.fillStyle = gradient;
    gCtx.fillRect(0, 0, 2048, 2048);

    // Roads - network of streets
    gCtx.strokeStyle = '#555555';
    gCtx.lineWidth = 14;
    // Main ring road
    gCtx.beginPath();
    gCtx.arc(1024, 1024, 600, 0, Math.PI * 2);
    gCtx.stroke();
    // Cross roads
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      gCtx.beginPath();
      gCtx.moveTo(1024 + Math.cos(angle) * 200, 1024 + Math.sin(angle) * 200);
      gCtx.lineTo(1024 + Math.cos(angle) * 900, 1024 + Math.sin(angle) * 900);
      gCtx.stroke();
    }
    // Road markings (dashed center lines)
    gCtx.strokeStyle = '#999955';
    gCtx.lineWidth = 2;
    gCtx.setLineDash([8, 12]);
    gCtx.beginPath();
    gCtx.arc(1024, 1024, 600, 0, Math.PI * 2);
    gCtx.stroke();
    gCtx.setLineDash([]);

    // Sidewalks along roads
    gCtx.strokeStyle = '#777766';
    gCtx.lineWidth = 18;
    gCtx.globalAlpha = 0.3;
    gCtx.beginPath();
    gCtx.arc(1024, 1024, 600, 0, Math.PI * 2);
    gCtx.stroke();
    gCtx.globalAlpha = 1;

    // Park areas
    gCtx.fillStyle = '#2a6622';
    gCtx.beginPath();
    gCtx.arc(400, 400, 120, 0, Math.PI * 2);
    gCtx.fill();
    gCtx.beginPath();
    gCtx.arc(1600, 1500, 100, 0, Math.PI * 2);
    gCtx.fill();

    // Grass detail
    for (let i = 0; i < 30000; i++) {
      const x = Math.random() * 2048;
      const y = Math.random() * 2048;
      const g = 60 + Math.random() * 60;
      gCtx.fillStyle = `rgba(${30 + Math.random() * 30}, ${g}, ${20 + Math.random() * 20}, ${0.1 + Math.random() * 0.15})`;
      gCtx.fillRect(x, y, 1, 1 + Math.random() * 2);
    }

    const groundTex = new THREE.CanvasTexture(groundCanvas);
    groundTex.wrapS = THREE.RepeatWrapping;
    groundTex.wrapT = THREE.RepeatWrapping;
    const planetMat = new THREE.MeshStandardMaterial({
      map: groundTex,
      roughness: 0.85,
      metalness: 0.05,
      bumpMap: groundTex,
      bumpScale: 0.015,
    });
    const planet = new THREE.Mesh(planetGeo, planetMat);
    planet.receiveShadow = true;
    scene.add(planet);

    // ====== WATER (ocean at bottom hemisphere) ======
    const waterGeo = new THREE.SphereGeometry(PLANET_RADIUS + 0.003, 64, 64, 0, Math.PI * 2, Math.PI * 0.6, Math.PI * 0.4);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x1a6688,
      roughness: 0.1,
      metalness: 0.4,
      transparent: true,
      opacity: 0.7,
    });
    scene.add(new THREE.Mesh(waterGeo, waterMat));

    // ====== RIVERS ======
    createRiver(scene, 0.5, Math.PI / 3, 1.8, Math.PI / 1.8, 30);
    createRiver(scene, 3.5, Math.PI / 2.5, 5.0, Math.PI / 2, 25);

    // ====== BRIDGES ======
    const bridge1 = createBridge(1.0, Math.PI / 2.5, 0.15, 0.3);
    scene.add(bridge1);
    const bridge2 = createBridge(4.2, Math.PI / 2.2, 0.12, -0.5);
    scene.add(bridge2);

    // ====== TOKYO TOWER (landmark) ======
    const tokyoTower = createTokyoTower(1.2);
    placeOnSurface(tokyoTower, Math.PI / 2, Math.PI / 3, PLANET_RADIUS);
    scene.add(tokyoTower);

    // ====== BUILDINGS ======
    const buildingMeshes: { mesh: THREE.Group; id: string; position: THREE.Vector3 }[] = [];

    // Main labeled buildings (resume sections)
    BUILDINGS.forEach((b, i) => {
      const pos = sphericalToCartesian(b.theta, b.phi, PLANET_RADIUS);
      const up = pos.clone().normalize();
      const outerGroup = new THREE.Group();
      outerGroup.position.copy(pos);
      outerGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), up);

      let building: THREE.Group;
      if (i % 3 === 0) {
        building = createSkyscraper(0.25, 0.5 + Math.random() * 0.4, 0.2, b.color, 0xffe4a0);
      } else if (i % 3 === 1) {
        building = createJapaneseShop(0.25, 0.3, 0.2, 0xf0dcc0, b.color, b.glowColor);
      } else {
        building = createSkyscraper(0.2, 0.7 + Math.random() * 0.3, 0.18, 0xccbbaa, 0xffc86e);
      }
      outerGroup.add(building);

      // Warm glow
      const pLight = new THREE.PointLight(b.glowColor, 0.5, 2.5);
      pLight.position.y = 0.6;
      outerGroup.add(pLight);

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
      sprite.scale.set(1.2, 0.35, 1);
      sprite.position.y = 1.0;
      outerGroup.add(sprite);

      // Surrounding cluster of smaller buildings
      const clusterCount = 4 + Math.floor(Math.random() * 4);
      for (let s = 0; s < clusterCount; s++) {
        const angle = (s / clusterCount) * Math.PI * 2 + Math.random() * 0.5;
        const dist = 0.25 + Math.random() * 0.2;
        const h = 0.1 + Math.random() * 0.25;
        const w = 0.06 + Math.random() * 0.06;

        const miniBuilding = new THREE.Mesh(
          new THREE.BoxGeometry(w, h, w * 0.8),
          new THREE.MeshStandardMaterial({
            color: new THREE.Color().setHSL(0.08 + Math.random() * 0.05, 0.2 + Math.random() * 0.3, 0.5 + Math.random() * 0.3),
            roughness: 0.6,
          })
        );
        miniBuilding.position.set(Math.cos(angle) * dist, h / 2, Math.sin(angle) * dist);
        miniBuilding.castShadow = true;
        outerGroup.add(miniBuilding);

        // Windows
        if (Math.random() > 0.3) {
          const winGeo = new THREE.PlaneGeometry(w * 0.5, h * 0.25);
          const winMat = new THREE.MeshBasicMaterial({
            color: Math.random() > 0.5 ? 0xffe4a0 : 0x80c8ff,
            transparent: true, opacity: 0.6, side: THREE.DoubleSide
          });
          const win = new THREE.Mesh(winGeo, winMat);
          win.position.set(Math.cos(angle) * dist, h * 0.4, Math.sin(angle) * dist + w * 0.41);
          outerGroup.add(win);
        }

        // Mini roof
        const roofMesh = new THREE.Mesh(
          new THREE.BoxGeometry(w * 1.15, 0.008, w * 0.92),
          new THREE.MeshStandardMaterial({ color: 0x444444, roughness: 0.5 })
        );
        roofMesh.position.set(Math.cos(angle) * dist, h, Math.sin(angle) * dist);
        outerGroup.add(roofMesh);
      }

      scene.add(outerGroup);
      buildingMeshes.push({ mesh: outerGroup, id: b.id, position: pos.clone() });
    });

    // ====== EXTRA CITY BUILDINGS (not resume buildings) ======
    for (let i = 0; i < 40; i++) {
      const t = Math.random() * Math.PI * 2;
      const p = Math.PI * 0.2 + Math.random() * Math.PI * 0.6;
      const pos = sphericalToCartesian(t, p, PLANET_RADIUS);

      // Don't overlap with main buildings
      let skip = false;
      for (const b of BUILDINGS) {
        if (pos.distanceTo(sphericalToCartesian(b.theta, b.phi, PLANET_RADIUS)) < 1.2) { skip = true; break; }
      }
      if (skip) continue;

      const h = 0.1 + Math.random() * 0.35;
      const w = 0.05 + Math.random() * 0.08;
      const bGroup = new THREE.Group();
      placeOnSurface(bGroup, t, p, PLANET_RADIUS);

      const bMesh = new THREE.Mesh(
        new THREE.BoxGeometry(w, h, w * (0.6 + Math.random() * 0.6)),
        new THREE.MeshStandardMaterial({
          color: new THREE.Color().setHSL(0.05 + Math.random() * 0.1, 0.15 + Math.random() * 0.2, 0.45 + Math.random() * 0.3),
          roughness: 0.5, metalness: 0.2,
        })
      );
      bMesh.position.y = h / 2;
      bMesh.castShadow = true;
      bGroup.add(bMesh);

      // Random lit windows
      const winCount = Math.floor(Math.random() * 4) + 1;
      for (let ww = 0; ww < winCount; ww++) {
        const winMesh = new THREE.Mesh(
          new THREE.PlaneGeometry(w * 0.3, h * 0.15),
          new THREE.MeshBasicMaterial({
            color: Math.random() > 0.5 ? 0xffe4a0 : 0x4488ff,
            transparent: true, opacity: 0.6, side: THREE.DoubleSide
          })
        );
        winMesh.position.set(0, h * (0.2 + ww * 0.2), w * 0.4 + 0.002);
        bGroup.add(winMesh);
      }

      // Roof detail
      const roofMesh = new THREE.Mesh(
        new THREE.BoxGeometry(w * 1.1, 0.005, w * 0.8),
        new THREE.MeshStandardMaterial({ color: 0x555555 })
      );
      roofMesh.position.y = h;
      bGroup.add(roofMesh);

      scene.add(bGroup);
    }

    // ====== STREET LAMPS ======
    for (let i = 0; i < 35; i++) {
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      const pos = sphericalToCartesian(t, p, PLANET_RADIUS);
      let tooClose = false;
      for (const b of BUILDINGS) {
        if (pos.distanceTo(sphericalToCartesian(b.theta, b.phi, PLANET_RADIUS)) < 0.5) { tooClose = true; break; }
      }
      if (tooClose) continue;

      const lampGroup = new THREE.Group();
      placeOnSurface(lampGroup, t, p, PLANET_RADIUS);

      const pole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.006, 0.008, 0.3, 6),
        new THREE.MeshStandardMaterial({ color: 0x444444, metalness: 0.7 })
      );
      pole.position.y = 0.15;
      lampGroup.add(pole);

      const lampHead = new THREE.Mesh(
        new THREE.SphereGeometry(0.015, 6, 6),
        new THREE.MeshBasicMaterial({ color: 0xffeebb })
      );
      lampHead.position.y = 0.31;
      lampGroup.add(lampHead);

      const light = new THREE.PointLight(0xffeebb, 0.25, 0.8);
      light.position.y = 0.31;
      lampGroup.add(light);

      scene.add(lampGroup);
    }

    // ====== CHERRY BLOSSOM TREES ======
    for (let i = 0; i < 30; i++) {
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      const pos = sphericalToCartesian(t, p, PLANET_RADIUS);
      let tooClose = false;
      for (const b of BUILDINGS) {
        if (pos.distanceTo(sphericalToCartesian(b.theta, b.phi, PLANET_RADIUS)) < 0.7) { tooClose = true; break; }
      }
      if (tooClose) continue;

      const tree = new THREE.Group();
      placeOnSurface(tree, t, p, PLANET_RADIUS);

      const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.015, 0.025, 0.18, 6),
        new THREE.MeshStandardMaterial({ color: 0x5a3828, roughness: 0.9 })
      );
      trunk.position.y = 0.09;
      tree.add(trunk);

      const isCherryBlossom = Math.random() > 0.35;
      const canopyColor = isCherryBlossom
        ? [0xff88aa, 0xff99bb, 0xffaacc][Math.floor(Math.random() * 3)]
        : [0x44aa55, 0x338844, 0x55bb66][Math.floor(Math.random() * 3)];

      for (let c = 0; c < 4; c++) {
        const canopy = new THREE.Mesh(
          new THREE.SphereGeometry(0.06 + Math.random() * 0.05, 8, 6),
          new THREE.MeshStandardMaterial({
            color: canopyColor, roughness: 0.8,
            transparent: isCherryBlossom, opacity: isCherryBlossom ? 0.8 : 1,
          })
        );
        canopy.position.set(
          (Math.random() - 0.5) * 0.05,
          0.2 + c * 0.03,
          (Math.random() - 0.5) * 0.05
        );
        canopy.castShadow = true;
        tree.add(canopy);
      }

      scene.add(tree);
    }

    // ====== TRAIN TRACKS (2 lines) ======
    const TRACK_PHI = Math.PI / 2;
    const TRACK_SEGMENTS = 150;
    const TRACK_RADIUS = PLANET_RADIUS + 0.008;

    // Track 1 - equatorial
    const trackPoints1: THREE.Vector3[] = [];
    for (let i = 0; i <= TRACK_SEGMENTS; i++) {
      const t = (i / TRACK_SEGMENTS) * Math.PI * 2;
      trackPoints1.push(sphericalToCartesian(t, TRACK_PHI, TRACK_RADIUS));
    }

    // Rail ties
    const tieMat = new THREE.MeshStandardMaterial({ color: 0x5a4a3a, roughness: 0.9 });
    for (let i = 0; i < TRACK_SEGMENTS; i += 2) {
      const t = (i / TRACK_SEGMENTS) * Math.PI * 2;
      const pos = sphericalToCartesian(t, TRACK_PHI, TRACK_RADIUS);
      const tie = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.003, 0.008), tieMat);
      tie.position.copy(pos);
      tie.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), pos.clone().normalize());
      scene.add(tie);
    }

    // Rails
    const railMat = new THREE.MeshStandardMaterial({ color: 0x999999, metalness: 0.8, roughness: 0.2 });
    const rail1 = new THREE.Mesh(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(trackPoints1, true), 300, 0.003, 4, true),
      railMat
    );
    scene.add(rail1);

    // Second rail offset
    const trackPoints1b: THREE.Vector3[] = [];
    for (let i = 0; i <= TRACK_SEGMENTS; i++) {
      const t = (i / TRACK_SEGMENTS) * Math.PI * 2;
      const p = sphericalToCartesian(t, TRACK_PHI, TRACK_RADIUS);
      const up = p.clone().normalize();
      const nextP = sphericalToCartesian(((i + 1) / TRACK_SEGMENTS) * Math.PI * 2, TRACK_PHI, TRACK_RADIUS);
      const fwd = nextP.clone().sub(p).normalize();
      const right = new THREE.Vector3().crossVectors(up, fwd).normalize();
      trackPoints1b.push(p.clone().add(right.multiplyScalar(0.02)));
    }
    scene.add(new THREE.Mesh(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(trackPoints1b, true), 300, 0.003, 4, true),
      railMat
    ));

    // Track 2 - second ring at different latitude
    const TRACK2_PHI = Math.PI / 2.8;
    const trackPoints2: THREE.Vector3[] = [];
    for (let i = 0; i <= TRACK_SEGMENTS; i++) {
      const t = (i / TRACK_SEGMENTS) * Math.PI * 2;
      trackPoints2.push(sphericalToCartesian(t, TRACK2_PHI, TRACK_RADIUS));
    }
    scene.add(new THREE.Mesh(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(trackPoints2, true), 300, 0.003, 4, true),
      railMat
    ));

    // ====== TRAINS ======
    const train1 = createDetailedTrain(0x226644, 3);
    const train2 = createDetailedTrain(0xcc4411, 2);
    const train3 = createDetailedTrain(0x2244aa, 2);
    scene.add(train1);
    scene.add(train2);
    scene.add(train3);

    // ====== NPC CARS (ambient traffic on roads) ======
    const npcCars: { mesh: THREE.Group; speed: number; offset: number; phi: number }[] = [];
    const carColors = [0xcc2222, 0x2255cc, 0xffcc00, 0x22cc44, 0xffffff, 0x222222, 0xff6600];
    for (let i = 0; i < 12; i++) {
      const npc = createNPCCar(carColors[i % carColors.length]);
      scene.add(npc);
      npcCars.push({
        mesh: npc,
        speed: 0.08 + Math.random() * 0.12,
        offset: Math.random() * Math.PI * 2,
        phi: Math.PI / 2 + (Math.random() - 0.5) * 0.3,
      });
    }

    // ====== CLOUDS ======
    const cloudMeshes = createClouds(scene, 12);

    // ====== FALLING CHERRY BLOSSOM PETALS ======
    const petalCount = 500;
    const petalGeo = new THREE.BufferGeometry();
    const petalPositions = new Float32Array(petalCount * 3);
    const petalColors = new Float32Array(petalCount * 3);
    const petalVelocities: THREE.Vector3[] = [];
    for (let i = 0; i < petalCount; i++) {
      const r = PLANET_RADIUS + 0.3 + Math.random() * 1.5;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      petalPositions[i * 3] = r * Math.sin(p) * Math.cos(t);
      petalPositions[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
      petalPositions[i * 3 + 2] = r * Math.cos(p);
      const pinkness = Math.random();
      petalColors[i * 3] = 1;
      petalColors[i * 3 + 1] = 0.6 + pinkness * 0.3;
      petalColors[i * 3 + 2] = 0.7 + pinkness * 0.2;
      petalVelocities.push(new THREE.Vector3(
        (Math.random() - 0.5) * 0.002,
        (Math.random() - 0.5) * 0.002,
        (Math.random() - 0.5) * 0.002
      ));
    }
    petalGeo.setAttribute('position', new THREE.BufferAttribute(petalPositions, 3));
    petalGeo.setAttribute('color', new THREE.BufferAttribute(petalColors, 3));
    const petalMat = new THREE.PointsMaterial({ size: 0.03, transparent: true, opacity: 0.6, vertexColors: true });
    const petals = new THREE.Points(petalGeo, petalMat);
    scene.add(petals);

    // ====== PLAYER CAR ======
    const playerCar = createCar();
    scene.add(playerCar);

    // ====== ATMOSPHERE ======
    const glowGeo = new THREE.SphereGeometry(PLANET_RADIUS * 1.05, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({ color: 0xffaa66, transparent: true, opacity: 0.04, side: THREE.BackSide });
    scene.add(new THREE.Mesh(glowGeo, glowMat));

    const glowGeo2 = new THREE.SphereGeometry(PLANET_RADIUS * 1.1, 32, 32);
    const glowMat2 = new THREE.MeshBasicMaterial({ color: 0x4488cc, transparent: true, opacity: 0.025, side: THREE.BackSide });
    scene.add(new THREE.Mesh(glowGeo2, glowMat2));

    // ====== STARFIELD ======
    const starCount = 3000;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starCol = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const r = 50 + Math.random() * 100;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      starPos[i * 3] = r * Math.sin(p) * Math.cos(t);
      starPos[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
      starPos[i * 3 + 2] = r * Math.cos(p);
      const w = Math.random();
      starCol[i * 3] = w > 0.7 ? 1 : 0.8;
      starCol[i * 3 + 1] = w > 0.7 ? 0.9 : 0.85;
      starCol[i * 3 + 2] = w > 0.4 ? 1 : 0.7;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starCol, 3));
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ size: 0.12, transparent: true, opacity: 0.7, vertexColors: true })));

    // ====== ANIMATION ======
    const clock = new THREE.Clock();
    let animId: number;
    const camPosSmooth = new THREE.Vector3();
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

      // Tangent basis
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

      // Move car
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

      // Position car
      const charPos = sphericalToCartesian(charThetaRef.current, charPhiRef.current, PLANET_RADIUS);
      const up = charPos.clone().normalize();
      playerCar.position.copy(charPos.clone().add(up.clone().multiplyScalar(CAR_HEIGHT)));

      const baseQuat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), up);
      const headingQuat = new THREE.Quaternion().setFromAxisAngle(up, -headingRef.current);
      playerCar.quaternion.copy(headingQuat.multiply(baseQuat));

      // Slight tilt when turning
      if (Math.abs(turnInput) > 0.01) {
        const tiltQuat = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, -turnInput * 0.08));
        playerCar.quaternion.multiply(tiltQuat);
      }

      // Camera
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
      camera.lookAt(charPos.clone().add(up.clone().multiplyScalar(0.15)));

      // Trains animation
      const trainConfigs = [
        { train: train1, speed: 0.13, phi: TRACK_PHI, offset: 0, radius: TRACK_RADIUS },
        { train: train2, speed: 0.10, phi: TRACK_PHI, offset: Math.PI, radius: TRACK_RADIUS },
        { train: train3, speed: 0.09, phi: TRACK2_PHI, offset: 0.5, radius: TRACK_RADIUS },
      ];
      trainConfigs.forEach(({ train, speed, phi, offset, radius }) => {
        const angle = time * speed + offset;
        const tPos = sphericalToCartesian(angle, phi, radius + 0.012);
        const tUp = tPos.clone().normalize();
        train.position.copy(tPos);
        const nextPos = sphericalToCartesian(angle + 0.05, phi, radius + 0.012);
        const tFwd = nextPos.sub(tPos).normalize();
        const tRight = new THREE.Vector3().crossVectors(tUp, tFwd).normalize();
        const tFwdC = new THREE.Vector3().crossVectors(tRight, tUp).normalize();
        const lookTarget = tPos.clone().add(tFwdC);
        train.quaternion.setFromRotationMatrix(new THREE.Matrix4().lookAt(tPos, lookTarget, tUp));
      });

      // NPC cars
      npcCars.forEach(({ mesh, speed, offset, phi }) => {
        const angle = time * speed + offset;
        const pos = sphericalToCartesian(angle, phi, PLANET_RADIUS + 0.01);
        const upN = pos.clone().normalize();
        mesh.position.copy(pos.clone().add(upN.clone().multiplyScalar(0.01)));
        const nextPos = sphericalToCartesian(angle + 0.05, phi, PLANET_RADIUS + 0.01);
        const fwd = nextPos.sub(pos).normalize();
        const right = new THREE.Vector3().crossVectors(upN, fwd).normalize();
        const fwdC = new THREE.Vector3().crossVectors(right, upN).normalize();
        const lookT = pos.clone().add(fwdC);
        mesh.quaternion.setFromRotationMatrix(new THREE.Matrix4().lookAt(pos, lookT, upN));
      });

      // Animate petals
      const petalPosAttr = petals.geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < petalCount; i++) {
        let px = petalPosAttr.getX(i) + petalVelocities[i].x;
        let py = petalPosAttr.getY(i) + petalVelocities[i].y;
        let pz = petalPosAttr.getZ(i) + petalVelocities[i].z;
        // Add wind
        px += Math.sin(time * 0.5 + i * 0.1) * 0.001;
        py += Math.cos(time * 0.3 + i * 0.2) * 0.001;
        // Gravity toward planet
        const dist = Math.sqrt(px * px + py * py + pz * pz);
        if (dist < PLANET_RADIUS + 0.05) {
          // Reset petal
          const r = PLANET_RADIUS + 0.5 + Math.random() * 1.5;
          const t = Math.random() * Math.PI * 2;
          const p = Math.acos(2 * Math.random() - 1);
          px = r * Math.sin(p) * Math.cos(t);
          py = r * Math.sin(p) * Math.sin(t);
          pz = r * Math.cos(p);
        } else {
          // Slight pull inward
          petalVelocities[i].x -= px / dist * 0.00005;
          petalVelocities[i].y -= py / dist * 0.00005;
          petalVelocities[i].z -= pz / dist * 0.00005;
        }
        petalPosAttr.setXYZ(i, px, py, pz);
      }
      petalPosAttr.needsUpdate = true;

      // Building proximity
      let closestBuilding: string | null = null;
      let closestDist = PROXIMITY_THRESHOLD;
      for (const b of buildingMeshes) {
        const dist = charPos.distanceTo(b.position);
        if (dist < closestDist) { closestDist = dist; closestBuilding = b.id; }
      }
      if (closestBuilding !== activeBuildingRef.current) {
        activeBuildingRef.current = closestBuilding;
        onBuildingProximity(closestBuilding);
      }

      // Animate building lights
      buildingMeshes.forEach((b, i) => {
        b.mesh.traverse(c => {
          if (c instanceof THREE.PointLight) {
            c.intensity = 0.4 + Math.sin(time * 2 + i * 1.5) * 0.15;
          }
        });
      });

      // Tokyo Tower blinking light
      tokyoTower.traverse(c => {
        if (c instanceof THREE.PointLight && c.color.r > 0.9) {
          c.intensity = Math.sin(time * 4) > 0 ? 0.8 : 0.1;
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
