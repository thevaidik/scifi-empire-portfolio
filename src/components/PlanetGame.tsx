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
  { id: 'hero', name: 'HQ TOWER', theta: 0, phi: Math.PI / 3, color: 0xff0033, glowColor: 0xff3366 },
  { id: 'apps', name: 'APP STORE', theta: Math.PI / 3, phi: Math.PI / 2.5, color: 0x00d9ff, glowColor: 0x4cc9f0 },
  { id: 'opensource', name: 'OPEN SOURCE LAB', theta: (2 * Math.PI) / 3, phi: Math.PI / 2, color: 0xff0033, glowColor: 0xe63946 },
  { id: 'connect', name: 'CONNECT HUB', theta: Math.PI, phi: Math.PI / 3, color: 0x00d9ff, glowColor: 0x00d9ff },
  { id: 'interests', name: 'INTEREST DOME', theta: (4 * Math.PI) / 3, phi: Math.PI / 2.2, color: 0x1a535c, glowColor: 0x4cc9f0 },
  { id: 'collab', name: 'COLLAB CENTER', theta: (5 * Math.PI) / 3, phi: Math.PI / 2.8, color: 0xff0033, glowColor: 0xff3366 },
];

function sphericalToCartesian(theta: number, phi: number, r: number): THREE.Vector3 {
  return new THREE.Vector3(
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

const PlanetGame = ({ onBuildingProximity }: PlanetGameProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const keysRef = useRef<Set<string>>(new Set());
  const charThetaRef = useRef(Math.PI / 6);
  const charPhiRef = useRef(Math.PI / 2.5);
  const headingRef = useRef(0); // heading angle on the tangent plane
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

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0e1a);
    scene.fog = new THREE.FogExp2(0x0a0e1a, 0.02);

    // Camera
    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 200);

    // Lights
    scene.add(new THREE.AmbientLight(0x8899bb, 0.8));
    const dirLight = new THREE.DirectionalLight(0xffeedd, 1.2);
    dirLight.position.set(10, 15, 10);
    scene.add(dirLight);
    scene.add(new THREE.HemisphereLight(0x87ceeb, 0x3a7d44, 0.6));

    // ====== PLANET (stationary at origin) ======
    const planetGeo = new THREE.SphereGeometry(PLANET_RADIUS, 64, 64);
    const grassCanvas = document.createElement('canvas');
    grassCanvas.width = 512;
    grassCanvas.height = 512;
    const gCtx = grassCanvas.getContext('2d')!;
    const gradient = gCtx.createRadialGradient(256, 256, 0, 256, 256, 360);
    gradient.addColorStop(0, '#4a8c3f');
    gradient.addColorStop(0.5, '#3a7d44');
    gradient.addColorStop(1, '#2d6a30');
    gCtx.fillStyle = gradient;
    gCtx.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 8000; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const shade = Math.random();
      gCtx.fillStyle = shade > 0.5
        ? `rgba(${60 + Math.random() * 40}, ${120 + Math.random() * 60}, ${40 + Math.random() * 30}, ${0.3 + Math.random() * 0.4})`
        : `rgba(${30 + Math.random() * 30}, ${80 + Math.random() * 40}, ${20 + Math.random() * 20}, ${0.2 + Math.random() * 0.3})`;
      gCtx.fillRect(x, y, 1 + Math.random() * 2, 1 + Math.random() * 3);
    }
    for (let i = 0; i < 15; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const r = 8 + Math.random() * 20;
      gCtx.fillStyle = `rgba(${100 + Math.random() * 40}, ${80 + Math.random() * 30}, ${40 + Math.random() * 20}, 0.3)`;
      gCtx.beginPath();
      gCtx.arc(x, y, r, 0, Math.PI * 2);
      gCtx.fill();
    }
    const grassTex = new THREE.CanvasTexture(grassCanvas);
    grassTex.wrapS = THREE.RepeatWrapping;
    grassTex.wrapT = THREE.RepeatWrapping;
    const planetMat = new THREE.MeshStandardMaterial({ map: grassTex, color: 0x4a8c3f, roughness: 0.9, metalness: 0.05 });
    const planet = new THREE.Mesh(planetGeo, planetMat);
    scene.add(planet);

    // Grass blades
    const grassBladeGeo = new THREE.ConeGeometry(0.02, 0.15, 4);
    const grassBladeMat = new THREE.MeshStandardMaterial({ color: 0x5aaa4a, roughness: 0.8 });
    const grassCount = 1800;
    const grassInstanced = new THREE.InstancedMesh(grassBladeGeo, grassBladeMat, grassCount);
    const dummy = new THREE.Object3D();
    for (let i = 0; i < grassCount; i++) {
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      const surfacePos = sphericalToCartesian(t, p, PLANET_RADIUS);
      const normal = surfacePos.clone().normalize();
      dummy.position.copy(surfacePos.clone().add(normal.clone().multiplyScalar(0.05)));
      dummy.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
      dummy.rotateX((Math.random() - 0.5) * 0.3);
      dummy.rotateZ((Math.random() - 0.5) * 0.3);
      dummy.scale.set(0.6 + Math.random() * 0.8, 0.5 + Math.random() * 1.2, 0.6 + Math.random() * 0.8);
      dummy.updateMatrix();
      grassInstanced.setMatrixAt(i, dummy.matrix);
      grassInstanced.setColorAt(i, new THREE.Color().setHSL(0.28 + Math.random() * 0.08, 0.5 + Math.random() * 0.3, 0.25 + Math.random() * 0.2));
    }
    grassInstanced.instanceColor!.needsUpdate = true;
    scene.add(grassInstanced);

    // Rocks
    const rockGeo = new THREE.DodecahedronGeometry(0.06, 0);
    const rockMat = new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 1.0 });
    for (let i = 0; i < 40; i++) {
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      const pos = sphericalToCartesian(t, p, PLANET_RADIUS);
      const normal = pos.clone().normalize();
      const rock = new THREE.Mesh(rockGeo, rockMat.clone());
      (rock.material as THREE.MeshStandardMaterial).color.setHSL(0, 0, 0.35 + Math.random() * 0.25);
      rock.position.copy(pos.clone().add(normal.clone().multiplyScalar(0.02)));
      rock.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
      rock.scale.setScalar(0.5 + Math.random() * 1.5);
      scene.add(rock);
    }

    // Trees
    const trunkGeo = new THREE.CylinderGeometry(0.03, 0.04, 0.25, 6);
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x6b4226, roughness: 0.9 });
    const canopyGeo = new THREE.SphereGeometry(0.15, 8, 6);
    const canopyColors = [0x2d8c3f, 0x3a9e4a, 0x1f7a2f, 0x4aaa55];
    for (let i = 0; i < 25; i++) {
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      const pos = sphericalToCartesian(t, p, PLANET_RADIUS);
      const normal = pos.clone().normalize();
      let tooClose = false;
      for (const b of BUILDINGS) {
        const bPos = sphericalToCartesian(b.theta, b.phi, PLANET_RADIUS);
        if (pos.distanceTo(bPos) < 1.2) { tooClose = true; break; }
      }
      if (tooClose) continue;
      const treeGroup = new THREE.Group();
      treeGroup.position.copy(pos);
      treeGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.y = 0.125;
      treeGroup.add(trunk);
      const canopyMat = new THREE.MeshStandardMaterial({ color: canopyColors[Math.floor(Math.random() * canopyColors.length)], roughness: 0.8 });
      const canopy = new THREE.Mesh(canopyGeo, canopyMat);
      canopy.position.y = 0.3 + Math.random() * 0.05;
      canopy.scale.setScalar(0.7 + Math.random() * 0.6);
      treeGroup.add(canopy);
      scene.add(treeGroup);
    }

    // Atmosphere glow
    const glowGeo = new THREE.SphereGeometry(PLANET_RADIUS * 1.03, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({ color: 0x87ceeb, transparent: true, opacity: 0.06, side: THREE.BackSide });
    scene.add(new THREE.Mesh(glowGeo, glowMat));

    // ====== BUILDINGS ======
    const buildingMeshes: { mesh: THREE.Group; id: string; position: THREE.Vector3 }[] = [];
    BUILDINGS.forEach((b) => {
      const pos = sphericalToCartesian(b.theta, b.phi, PLANET_RADIUS);
      const up = pos.clone().normalize();
      const group = new THREE.Group();
      group.position.copy(pos);
      group.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), up);

      const bHeight = 0.6 + Math.random() * 0.3;
      const bWidth = 0.3 + Math.random() * 0.15;
      const bodyGeo = new THREE.BoxGeometry(bWidth, bHeight, bWidth);
      const bodyMat = new THREE.MeshStandardMaterial({
        color: 0x111828, emissive: b.color, emissiveIntensity: 0.15,
        roughness: 0.5, metalness: 0.6, transparent: true, opacity: 0.9,
      });
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      body.position.y = bHeight / 2;
      group.add(body);

      const roofGeo = new THREE.BoxGeometry(bWidth + 0.05, 0.05, bWidth + 0.05);
      const roofMat = new THREE.MeshStandardMaterial({ color: b.color, emissive: b.color, emissiveIntensity: 0.5 });
      const roof = new THREE.Mesh(roofGeo, roofMat);
      roof.position.y = bHeight;
      group.add(roof);

      for (let w = 0; w < 3; w++) {
        const windowGeo = new THREE.BoxGeometry(bWidth * 0.6, 0.02, 0.01);
        const windowMat = new THREE.MeshBasicMaterial({ color: b.glowColor, transparent: true, opacity: 0.4 });
        const windowMesh = new THREE.Mesh(windowGeo, windowMat);
        windowMesh.position.set(0, bHeight * 0.25 + w * bHeight * 0.25, bWidth / 2 + 0.01);
        group.add(windowMesh);
      }

      const pointLight = new THREE.PointLight(b.glowColor, 0.5, 3);
      pointLight.position.y = bHeight + 0.3;
      group.add(pointLight);

      // Label
      const canvas = document.createElement('canvas');
      canvas.width = 256; canvas.height = 64;
      const ctx = canvas.getContext('2d')!;
      ctx.clearRect(0, 0, 256, 64);
      ctx.font = 'bold 20px Orbitron, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#00d9ff';
      ctx.shadowColor = '#00d9ff';
      ctx.shadowBlur = 10;
      ctx.fillText(b.name, 128, 40);
      const tex = new THREE.CanvasTexture(canvas);
      const spriteMat = new THREE.SpriteMaterial({ map: tex, transparent: true, opacity: 0.8 });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.scale.set(1.5, 0.4, 1);
      sprite.position.y = bHeight + 0.6;
      group.add(sprite);

      scene.add(group);
      buildingMeshes.push({ mesh: group, id: b.id, position: pos.clone() });
    });

    // ====== DRONE CHARACTER ======
    const droneGroup = new THREE.Group();

    // Main body - flat disc
    const bodyGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.06, 16);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.3, metalness: 0.8 });
    const droneBody = new THREE.Mesh(bodyGeo, bodyMat);
    droneBody.position.y = 0;
    droneGroup.add(droneBody);

    // Top dome / camera eye
    const domeGeo = new THREE.SphereGeometry(0.08, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2);
    const domeMat = new THREE.MeshStandardMaterial({ color: 0x00d9ff, emissive: 0x00d9ff, emissiveIntensity: 0.4, roughness: 0.1, metalness: 0.9 });
    const dome = new THREE.Mesh(domeGeo, domeMat);
    dome.position.y = 0.03;
    droneGroup.add(dome);

    // Front indicator (so you can see which way it faces)
    const frontGeo = new THREE.BoxGeometry(0.04, 0.02, 0.06);
    const frontMat = new THREE.MeshStandardMaterial({ color: 0xff0033, emissive: 0xff0033, emissiveIntensity: 0.6 });
    const frontIndicator = new THREE.Mesh(frontGeo, frontMat);
    frontIndicator.position.set(0, 0, 0.18);
    droneGroup.add(frontIndicator);

    // 4 arms + propellers
    const armGeo = new THREE.BoxGeometry(0.03, 0.02, 0.2);
    const armMat = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.4, metalness: 0.7 });
    const propGeo = new THREE.BoxGeometry(0.15, 0.005, 0.02);
    const propMat = new THREE.MeshStandardMaterial({ color: 0x666666, roughness: 0.3, metalness: 0.5 });

    const propellers: THREE.Mesh[] = [];
    const armAngles = [Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4];
    const armLength = 0.22;

    armAngles.forEach((angle) => {
      const arm = new THREE.Mesh(armGeo, armMat);
      const ax = Math.sin(angle) * armLength * 0.5;
      const az = Math.cos(angle) * armLength * 0.5;
      arm.position.set(ax, 0, az);
      arm.rotation.y = -angle;
      droneGroup.add(arm);

      // Motor hub
      const hubGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.03, 8);
      const hubMat = new THREE.MeshStandardMaterial({ color: 0x444444, metalness: 0.8 });
      const hub = new THREE.Mesh(hubGeo, hubMat);
      hub.position.set(Math.sin(angle) * armLength, 0.02, Math.cos(angle) * armLength);
      droneGroup.add(hub);

      // Propeller blade
      const prop = new THREE.Mesh(propGeo, propMat);
      prop.position.set(Math.sin(angle) * armLength, 0.04, Math.cos(angle) * armLength);
      droneGroup.add(prop);
      propellers.push(prop);
    });

    // Drone light
    const droneLight = new THREE.PointLight(0x00d9ff, 0.5, 2.5);
    droneLight.position.y = -0.1;
    droneGroup.add(droneLight);

    // Landing skids (small)
    const skidGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.12, 6);
    const skidMat = new THREE.MeshStandardMaterial({ color: 0x444444 });
    [-1, 1].forEach(side => {
      const skid = new THREE.Mesh(skidGeo, skidMat);
      skid.position.set(side * 0.1, -0.06, 0);
      droneGroup.add(skid);
    });

    scene.add(droneGroup);

    // Starfield
    const starCount = 1500;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const r = 40 + Math.random() * 80;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      starPositions[i * 3] = r * Math.sin(p) * Math.cos(t);
      starPositions[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
      starPositions[i * 3 + 2] = r * Math.cos(p);
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.15, transparent: true, opacity: 0.6 });
    scene.add(new THREE.Points(starGeo, starMat));

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

      // Keyboard
      if (keys.has('w') || keys.has('arrowup')) moveForward += 1;
      if (keys.has('s') || keys.has('arrowdown')) moveForward -= 1;
      if (keys.has('a') || keys.has('arrowleft')) turnInput -= 1;
      if (keys.has('d') || keys.has('arrowright')) turnInput += 1;

      // Joystick (overrides if active)
      if (joystickActiveRef.current) {
        const jx = joystickRef.current.x;
        const jy = joystickRef.current.y;
        moveForward += -jy; // up on joystick = forward
        turnInput += jx;
      }

      // Clamp
      moveForward = Math.max(-1, Math.min(1, moveForward));
      turnInput = Math.max(-1, Math.min(1, turnInput));

      // --- Update heading ---
      headingRef.current += turnInput * TURN_SPEED;

      // --- Robust tangent basis (no flipping) ---
      const getTangentBasis = (pos: THREE.Vector3) => {
        const up = pos.clone().normalize();
        let east: THREE.Vector3;
        if (prevEastRef.current) {
          // Project previous east onto new tangent plane to maintain continuity
          east = prevEastRef.current.clone()
            .sub(up.clone().multiplyScalar(prevEastRef.current.dot(up)))
            .normalize();
          // If degenerate (at exact pole), fall back
          if (east.lengthSq() < 0.001) {
            const ref = Math.abs(up.y) < 0.99
              ? new THREE.Vector3(0, 1, 0)
              : new THREE.Vector3(1, 0, 0);
            east = new THREE.Vector3().crossVectors(up, ref).normalize();
          }
        } else {
          const ref = Math.abs(up.y) < 0.99
            ? new THREE.Vector3(0, 1, 0)
            : new THREE.Vector3(1, 0, 0);
          east = new THREE.Vector3().crossVectors(up, ref).normalize();
        }
        prevEastRef.current = east.clone();
        const north = new THREE.Vector3().crossVectors(east, up).normalize();
        return { up, east, north };
      };

      // --- Move character on sphere surface ---
      if (Math.abs(moveForward) > 0.01) {
        const currentPos = sphericalToCartesian(charThetaRef.current, charPhiRef.current, PLANET_RADIUS);
        const { east, north } = getTangentBasis(currentPos);

        // Heading-based forward direction on tangent plane
        const forward = new THREE.Vector3()
          .addScaledVector(north, Math.cos(headingRef.current))
          .addScaledVector(east, Math.sin(headingRef.current))
          .normalize();

        // Move along forward, re-project onto sphere
        const newPos = currentPos.clone().addScaledVector(forward, moveForward * MOVE_SPEED);
        newPos.normalize().multiplyScalar(PLANET_RADIUS);

        // Convert back to spherical coords
        const newPhi = Math.acos(Math.max(-1, Math.min(1, newPos.y / PLANET_RADIUS)));
        const newTheta = Math.atan2(newPos.z, newPos.x);

        charThetaRef.current = newTheta;
        charPhiRef.current = newPhi; // no clamping needed - tangent basis handles poles
      }

      // --- Position drone ---
      const charPos = sphericalToCartesian(charThetaRef.current, charPhiRef.current, PLANET_RADIUS);
      const up = charPos.clone().normalize();

      // Hover bob
      const hoverOffset = DRONE_HOVER + Math.sin(time * 3) * 0.03;
      droneGroup.position.copy(charPos.clone().add(up.clone().multiplyScalar(hoverOffset)));

      // Orient drone: align Y to surface normal
      const baseQuat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), up);
      
      // Apply heading rotation around the up axis
      const headingQuat = new THREE.Quaternion().setFromAxisAngle(up, -headingRef.current);
      droneGroup.quaternion.copy(headingQuat.multiply(baseQuat));

      // Slight tilt when moving
      if (Math.abs(moveForward) > 0.01 || Math.abs(turnInput) > 0.01) {
        const tiltAngle = moveForward * 0.15;
        const rollAngle = -turnInput * 0.1;
        const tiltQuat = new THREE.Quaternion().setFromEuler(new THREE.Euler(tiltAngle, 0, rollAngle));
        droneGroup.quaternion.multiply(tiltQuat);
      }

      // Spin propellers
      propellers.forEach((prop, i) => {
        prop.rotation.y = time * 30 + i * Math.PI / 2;
      });

      // --- Camera: follow behind drone (tight) ---
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
        // Very tight follow (0.9) so the globe barely drifts
        camPosSmooth.lerp(targetCamPos, 0.9);
      }
      camera.position.copy(camPosSmooth);
      // Look at the drone position (slightly above surface)
      camera.lookAt(charPos.clone().add(up.clone().multiplyScalar(0.3)));

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
        const light = b.mesh.children.find(c => c instanceof THREE.PointLight) as THREE.PointLight;
        if (light) light.intensity = 0.4 + Math.sin(time * 2 + i * 1.2) * 0.2;
      });

      // Drone glow pulse
      droneLight.intensity = 0.4 + Math.sin(time * 3) * 0.15;

      renderer.render(scene, camera);
    };

    animate();

    // Events
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
      {/* Mobile joystick */}
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
