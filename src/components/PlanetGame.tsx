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
const CHAR_HEIGHT = 0.4;
const CHAR_RADIUS = 0.15;
const MOVE_SPEED = 0.018;
const CAMERA_DISTANCE = 3;
const CAMERA_HEIGHT = 1.5;
const PROXIMITY_THRESHOLD = 1.8;

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
  const activeBuildingRef = useRef<string | null>(null);

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
    const ambientLight = new THREE.AmbientLight(0x8899bb, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffeedd, 1.2);
    dirLight.position.set(10, 15, 10);
    scene.add(dirLight);

    const hemiLight = new THREE.HemisphereLight(0x87ceeb, 0x3a7d44, 0.6);
    scene.add(hemiLight);

    // Planet — green grassy surface
    const planetGeo = new THREE.SphereGeometry(PLANET_RADIUS, 64, 64);

    // Generate a procedural grass texture
    const grassCanvas = document.createElement('canvas');
    grassCanvas.width = 512;
    grassCanvas.height = 512;
    const gCtx = grassCanvas.getContext('2d')!;
    // Base green
    const gradient = gCtx.createRadialGradient(256, 256, 0, 256, 256, 360);
    gradient.addColorStop(0, '#4a8c3f');
    gradient.addColorStop(0.5, '#3a7d44');
    gradient.addColorStop(1, '#2d6a30');
    gCtx.fillStyle = gradient;
    gCtx.fillRect(0, 0, 512, 512);
    // Grass texture noise
    for (let i = 0; i < 8000; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const shade = Math.random();
      gCtx.fillStyle = shade > 0.5
        ? `rgba(${60 + Math.random() * 40}, ${120 + Math.random() * 60}, ${40 + Math.random() * 30}, ${0.3 + Math.random() * 0.4})`
        : `rgba(${30 + Math.random() * 30}, ${80 + Math.random() * 40}, ${20 + Math.random() * 20}, ${0.2 + Math.random() * 0.3})`;
      gCtx.fillRect(x, y, 1 + Math.random() * 2, 1 + Math.random() * 3);
    }
    // Dirt patches
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

    const planetMat = new THREE.MeshStandardMaterial({
      map: grassTex,
      color: 0x4a8c3f,
      roughness: 0.9,
      metalness: 0.05,
    });
    const planet = new THREE.Mesh(planetGeo, planetMat);
    scene.add(planet);

    // Grass blades — instanced cones on the surface
    const grassBladeGeo = new THREE.ConeGeometry(0.02, 0.15, 4);
    const grassBladeMat = new THREE.MeshStandardMaterial({
      color: 0x5aaa4a,
      roughness: 0.8,
      metalness: 0.0,
    });
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
      // Random tilt for organic feel
      dummy.rotateX((Math.random() - 0.5) * 0.3);
      dummy.rotateZ((Math.random() - 0.5) * 0.3);
      dummy.scale.set(0.6 + Math.random() * 0.8, 0.5 + Math.random() * 1.2, 0.6 + Math.random() * 0.8);
      dummy.updateMatrix();
      grassInstanced.setMatrixAt(i, dummy.matrix);
      // Vary green shades
      const greenShade = new THREE.Color().setHSL(0.28 + Math.random() * 0.08, 0.5 + Math.random() * 0.3, 0.25 + Math.random() * 0.2);
      grassInstanced.setColorAt(i, greenShade);
    }
    grassInstanced.instanceColor!.needsUpdate = true;
    scene.add(grassInstanced);

    // Small rocks scattered on surface
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

    // Trees — simple trunk + sphere canopy
    const trunkGeo = new THREE.CylinderGeometry(0.03, 0.04, 0.25, 6);
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x6b4226, roughness: 0.9 });
    const canopyGeo = new THREE.SphereGeometry(0.15, 8, 6);
    const canopyColors = [0x2d8c3f, 0x3a9e4a, 0x1f7a2f, 0x4aaa55];
    for (let i = 0; i < 25; i++) {
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      const pos = sphericalToCartesian(t, p, PLANET_RADIUS);
      const normal = pos.clone().normalize();

      // Check not too close to buildings
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

      const canopyMat = new THREE.MeshStandardMaterial({
        color: canopyColors[Math.floor(Math.random() * canopyColors.length)],
        roughness: 0.8,
      });
      const canopy = new THREE.Mesh(canopyGeo, canopyMat);
      canopy.position.y = 0.3 + Math.random() * 0.05;
      canopy.scale.setScalar(0.7 + Math.random() * 0.6);
      treeGroup.add(canopy);

      scene.add(treeGroup);
    }

    // Atmosphere glow
    const glowGeo = new THREE.SphereGeometry(PLANET_RADIUS * 1.03, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x87ceeb,
      transparent: true,
      opacity: 0.06,
      side: THREE.BackSide,
    });
    scene.add(new THREE.Mesh(glowGeo, glowMat));

    // Buildings
    const buildingMeshes: { mesh: THREE.Group; id: string; position: THREE.Vector3 }[] = [];

    BUILDINGS.forEach((b) => {
      const pos = sphericalToCartesian(b.theta, b.phi, PLANET_RADIUS);
      const up = pos.clone().normalize();

      const group = new THREE.Group();
      group.position.copy(pos);

      // Orient building outward
      const quaternion = new THREE.Quaternion();
      quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), up);
      group.setRotationFromQuaternion(quaternion);

      // Building body
      const bHeight = 0.6 + Math.random() * 0.3;
      const bWidth = 0.3 + Math.random() * 0.15;
      const bodyGeo = new THREE.BoxGeometry(bWidth, bHeight, bWidth);
      const bodyMat = new THREE.MeshStandardMaterial({
        color: 0x111828,
        emissive: b.color,
        emissiveIntensity: 0.15,
        roughness: 0.5,
        metalness: 0.6,
        transparent: true,
        opacity: 0.9,
      });
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      body.position.y = bHeight / 2;
      group.add(body);

      // Roof accent
      const roofGeo = new THREE.BoxGeometry(bWidth + 0.05, 0.05, bWidth + 0.05);
      const roofMat = new THREE.MeshStandardMaterial({
        color: b.color,
        emissive: b.color,
        emissiveIntensity: 0.5,
      });
      const roof = new THREE.Mesh(roofGeo, roofMat);
      roof.position.y = bHeight;
      group.add(roof);

      // Window lines
      for (let w = 0; w < 3; w++) {
        const windowGeo = new THREE.BoxGeometry(bWidth * 0.6, 0.02, 0.01);
        const windowMat = new THREE.MeshBasicMaterial({ color: b.glowColor, transparent: true, opacity: 0.4 });
        const windowMesh = new THREE.Mesh(windowGeo, windowMat);
        windowMesh.position.set(0, bHeight * 0.25 + w * bHeight * 0.25, bWidth / 2 + 0.01);
        group.add(windowMesh);
      }

      // Point light
      const pointLight = new THREE.PointLight(b.glowColor, 0.5, 3);
      pointLight.position.y = bHeight + 0.3;
      group.add(pointLight);

      // Label sprite
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 64;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = 'transparent';
      ctx.fillRect(0, 0, 256, 64);
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

    // Character
    const charGroup = new THREE.Group();
    // Body capsule
    const capsuleGeo = new THREE.CapsuleGeometry(CHAR_RADIUS, CHAR_HEIGHT, 8, 16);
    const capsuleMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x00d9ff,
      emissiveIntensity: 0.3,
      roughness: 0.3,
      metalness: 0.7,
    });
    const capsule = new THREE.Mesh(capsuleGeo, capsuleMat);
    capsule.position.y = CHAR_HEIGHT / 2 + CHAR_RADIUS;
    charGroup.add(capsule);

    // Visor
    const visorGeo = new THREE.SphereGeometry(CHAR_RADIUS * 0.6, 8, 8, 0, Math.PI);
    const visorMat = new THREE.MeshStandardMaterial({
      color: 0xff0033,
      emissive: 0xff0033,
      emissiveIntensity: 0.5,
      roughness: 0.1,
    });
    const visor = new THREE.Mesh(visorGeo, visorMat);
    visor.position.set(0, CHAR_HEIGHT / 2 + CHAR_RADIUS + 0.1, CHAR_RADIUS * 0.5);
    visor.rotation.y = Math.PI;
    charGroup.add(visor);

    // Character glow
    const charLight = new THREE.PointLight(0x00d9ff, 0.4, 2);
    charLight.position.y = CHAR_HEIGHT;
    charGroup.add(charLight);

    scene.add(charGroup);

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

    // Animation loop
    const clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const dt = clock.getDelta();
      const time = clock.getElapsedTime();

      // Movement
      const keys = keysRef.current;
      let dTheta = 0;
      let dPhi = 0;
      if (keys.has('w') || keys.has('arrowup')) dPhi -= MOVE_SPEED;
      if (keys.has('s') || keys.has('arrowdown')) dPhi += MOVE_SPEED;
      if (keys.has('a') || keys.has('arrowleft')) dTheta -= MOVE_SPEED;
      if (keys.has('d') || keys.has('arrowright')) dTheta += MOVE_SPEED;

      charThetaRef.current += dTheta;
      charPhiRef.current = Math.max(0.3, Math.min(Math.PI - 0.3, charPhiRef.current + dPhi));

      const charPos = sphericalToCartesian(charThetaRef.current, charPhiRef.current, PLANET_RADIUS);
      const up = charPos.clone().normalize();

      // Position character on surface
      charGroup.position.copy(charPos);
      const charQuat = new THREE.Quaternion();
      charQuat.setFromUnitVectors(new THREE.Vector3(0, 1, 0), up);
      charGroup.setRotationFromQuaternion(charQuat);

      // Orient character facing direction
      if (dTheta !== 0 || dPhi !== 0) {
        const forward = sphericalToCartesian(
          charThetaRef.current + dTheta * 5,
          charPhiRef.current + dPhi * 5,
          PLANET_RADIUS
        ).sub(charPos).normalize();

        // Project forward onto tangent plane
        const tangentForward = forward.sub(up.clone().multiplyScalar(forward.dot(up))).normalize();
        if (tangentForward.length() > 0.01) {
          const lookTarget = charPos.clone().add(tangentForward);
          const lookMat = new THREE.Matrix4();
          lookMat.lookAt(charPos, lookTarget, up);
          const lookQuat = new THREE.Quaternion().setFromRotationMatrix(lookMat);
          charGroup.quaternion.copy(lookQuat);
        }
      }

      // Camera follow
      const camOffset = up.clone().multiplyScalar(CAMERA_HEIGHT);
      const behindDir = sphericalToCartesian(
        charThetaRef.current - Math.PI * 0.03,
        charPhiRef.current - 0.15,
        PLANET_RADIUS + CAMERA_DISTANCE
      );
      camera.position.lerp(behindDir.add(camOffset.multiplyScalar(0.3)), 0.05);
      camera.lookAt(charPos.clone().add(up.clone().multiplyScalar(0.5)));

      // Proximity check
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
        if (light) {
          light.intensity = 0.4 + Math.sin(time * 2 + i * 1.2) * 0.2;
        }
      });

      // Character glow pulse
      charLight.intensity = 0.3 + Math.sin(time * 3) * 0.15;
      (capsuleMat as THREE.MeshStandardMaterial).emissiveIntensity = 0.2 + Math.sin(time * 2) * 0.1;

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

      // Dispose
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

  return <div ref={containerRef} className="planet-game-canvas" />;
};

export default PlanetGame;
