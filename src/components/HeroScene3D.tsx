import { useRef, useEffect } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const SentientCoreScene = () => {
  const { scene } = useThree();
  const groupRef = useRef<THREE.Group | null>(null);
  const coreRef = useRef<THREE.Mesh | null>(null);
  const innerRef = useRef<THREE.Mesh | null>(null);
  const glowRef = useRef<THREE.Mesh | null>(null);
  const ring1Ref = useRef<THREE.Mesh | null>(null);
  const ring2Ref = useRef<THREE.Mesh | null>(null);
  const ring3Ref = useRef<THREE.Mesh | null>(null);
  const tendrilsRef = useRef<THREE.Points | null>(null);
  const sporesRef = useRef<THREE.Points | null>(null);

  useEffect(() => {
    const group = new THREE.Group();
    groupRef.current = group;
    scene.add(group);

    // Deep sea ambient light
    const ambient = new THREE.AmbientLight(0x1a535c, 0.3);
    group.add(ambient);

    // Bioluminescent red core light
    const redLight = new THREE.PointLight(0xff0033, 2.5);
    redLight.position.set(0, 0, 0);
    group.add(redLight);

    // Cyan accent light
    const cyanLight = new THREE.PointLight(0x00d9ff, 1.2);
    cyanLight.position.set(3, 1.5, 2);
    group.add(cyanLight);

    // Teal fill light
    const tealLight = new THREE.PointLight(0x4cc9f0, 0.6);
    tealLight.position.set(-2, -1, -2);
    group.add(tealLight);

    // Main organism core — translucent red membrane
    const coreGeo = new THREE.SphereGeometry(0.85, 64, 64);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0xff0033,
      emissive: 0xff0033,
      emissiveIntensity: 0.2,
      roughness: 0.05,
      metalness: 0.05,
      transparent: true,
      opacity: 0.45,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
      transmission: 0.4,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    coreRef.current = core;
    group.add(core);

    // Inner beating heart — bright cyan nucleus
    const innerGeo = new THREE.IcosahedronGeometry(0.35, 3);
    const innerMat = new THREE.MeshPhysicalMaterial({
      color: 0x00d9ff,
      emissive: 0x00d9ff,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.7,
      roughness: 0,
      metalness: 0.2,
    });
    const inner = new THREE.Mesh(innerGeo, innerMat);
    innerRef.current = inner;
    group.add(inner);

    // Outer glow shell — teal atmosphere
    const glowGeo = new THREE.SphereGeometry(1.1, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x4cc9f0,
      transparent: true,
      opacity: 0.06,
      side: THREE.BackSide,
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    glowRef.current = glow;
    group.add(glow);

    // Orbital filaments — tendril-like rings
    const ring1Geo = new THREE.TorusGeometry(1.5, 0.01, 16, 200);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0xff0033, transparent: true, opacity: 0.25 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1Ref.current = ring1;
    group.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(1.9, 0.006, 16, 200);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x00d9ff, transparent: true, opacity: 0.15 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2Ref.current = ring2;
    group.add(ring2);

    const ring3Geo = new THREE.TorusGeometry(2.3, 0.004, 16, 200);
    const ring3Mat = new THREE.MeshBasicMaterial({ color: 0x4cc9f0, transparent: true, opacity: 0.08 });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3Ref.current = ring3;
    group.add(ring3);

    // Tendril particles — floating around organism
    const tendrilGeo = new THREE.BufferGeometry();
    const tCount = 600;
    const tPos = new Float32Array(tCount * 3);
    const tColors = new Float32Array(tCount * 3);
    for (let i = 0; i < tCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.3 + Math.random() * 2.5;
      tPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      tPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      tPos[i * 3 + 2] = r * Math.cos(phi);
      // Alternate red and cyan particles
      if (Math.random() > 0.5) {
        tColors[i * 3] = 1; tColors[i * 3 + 1] = 0; tColors[i * 3 + 2] = 0.2;
      } else {
        tColors[i * 3] = 0; tColors[i * 3 + 1] = 0.85; tColors[i * 3 + 2] = 1;
      }
    }
    tendrilGeo.setAttribute("position", new THREE.BufferAttribute(tPos, 3));
    tendrilGeo.setAttribute("color", new THREE.BufferAttribute(tColors, 3));
    const tendrilMat = new THREE.PointsMaterial({
      size: 0.02,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true,
      vertexColors: true,
    });
    const tendrils = new THREE.Points(tendrilGeo, tendrilMat);
    tendrilsRef.current = tendrils;
    group.add(tendrils);

    // Deep sea spores — distant particles
    const sporeGeo = new THREE.BufferGeometry();
    const sCount = 1000;
    const sPos = new Float32Array(sCount * 3);
    for (let i = 0; i < sCount; i++) {
      sPos[i * 3] = (Math.random() - 0.5) * 100;
      sPos[i * 3 + 1] = (Math.random() - 0.5) * 100;
      sPos[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    sporeGeo.setAttribute("position", new THREE.BufferAttribute(sPos, 3));
    const sporeMat = new THREE.PointsMaterial({
      color: 0x4cc9f0,
      size: 0.1,
      transparent: true,
      opacity: 0.12,
      sizeAttenuation: true,
    });
    const spores = new THREE.Points(sporeGeo, sporeMat);
    sporesRef.current = spores;
    group.add(spores);

    return () => {
      scene.remove(group);
      [coreGeo, innerGeo, glowGeo, ring1Geo, ring2Geo, ring3Geo, tendrilGeo, sporeGeo].forEach(g => g.dispose());
      [coreMat, innerMat, glowMat, ring1Mat, ring2Mat, ring3Mat, tendrilMat, sporeMat].forEach(m => m.dispose());
    };
  }, [scene]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Organic breathing — asymmetric timing
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.12;
      coreRef.current.rotation.x = Math.sin(t * 0.08) * 0.2;
      const s = 1 + Math.sin(t * 0.6) * 0.1 + Math.sin(t * 1.7) * 0.03;
      coreRef.current.scale.setScalar(s);
      (coreRef.current.material as THREE.MeshPhysicalMaterial).emissiveIntensity =
        0.15 + Math.sin(t * 0.8) * 0.1;
    }

    // Inner nucleus — faster heartbeat
    if (innerRef.current) {
      const is = 1 + Math.sin(t * 1.8) * 0.2 + Math.sin(t * 3.1) * 0.05;
      innerRef.current.scale.setScalar(is);
      innerRef.current.rotation.x = t * 0.3;
      innerRef.current.rotation.z = t * 0.2;
      (innerRef.current.material as THREE.MeshPhysicalMaterial).emissiveIntensity =
        0.3 + Math.sin(t * 2.2) * 0.3;
    }

    // Glow pulsing
    if (glowRef.current) {
      const gs = 1 + Math.sin(t * 0.5) * 0.1;
      glowRef.current.scale.setScalar(gs);
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.04 + Math.sin(t * 0.7) * 0.03;
    }

    // Organic ring drift — different speeds, unpredictable
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.18 + Math.sin(t * 0.3) * 0.3;
      ring1Ref.current.rotation.z = Math.sin(t * 0.12) * 0.6;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = t * 0.13;
      ring2Ref.current.rotation.x = Math.PI / 3 + Math.sin(t * 0.09) * 0.4;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = -t * 0.08;
      ring3Ref.current.rotation.y = Math.PI / 4 + Math.sin(t * 0.07) * 0.3;
    }

    // Tendril particle drift
    if (tendrilsRef.current) {
      tendrilsRef.current.rotation.y = t * 0.025;
      tendrilsRef.current.rotation.x = Math.sin(t * 0.04) * 0.15;
    }
    if (sporesRef.current) {
      sporesRef.current.rotation.y = t * 0.003;
    }
  });

  return null;
};

const HeroScene3D = () => {
  return (
    <div className="relative w-full h-[500px] md:h-[600px]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <SentientCoreScene />
      </Canvas>

      {/* Overlay HUD badges */}
      <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-end pb-8">
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <span className="px-3 py-1 text-[10px] font-mono tracking-[0.2em] border border-[hsl(190_100%_50%/0.15)] bg-[hsl(228_60%_5%/0.7)] text-[hsl(190_100%_50%/0.5)] rounded-full backdrop-blur-sm">
            SENTIENT 3D CORE
          </span>
          <span className="px-3 py-1 text-[10px] font-mono tracking-[0.2em] border border-[hsl(350_100%_50%/0.15)] bg-[hsl(228_60%_5%/0.7)] text-[hsl(350_100%_50%/0.5)] rounded-full backdrop-blur-sm">
            VOLUMETRIC SHADERS
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          <span className="px-3 py-1 text-[10px] font-mono tracking-[0.2em] border border-[hsl(185_55%_23%/0.2)] bg-[hsl(228_60%_5%/0.7)] text-[hsl(185_55%_23%/0.6)] rounded-full backdrop-blur-sm">
            MICROLENDER PROTOCOL
          </span>
          <span className="px-3 py-1 text-[10px] font-mono tracking-[0.2em] border border-[hsl(190_100%_50%/0.15)] bg-[hsl(228_60%_5%/0.7)] text-[hsl(190_100%_50%/0.5)] rounded-full backdrop-blur-sm">
            HYPER-FUTURISTIC MCP-2099
          </span>
        </div>
      </div>

      {/* Corner brackets — bioluminescent */}
      <div className="absolute top-4 left-4 w-5 h-5 border-t border-l border-[hsl(190_100%_50%/0.15)] pointer-events-none" />
      <div className="absolute top-4 right-4 w-5 h-5 border-t border-r border-[hsl(350_100%_50%/0.12)] pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-5 h-5 border-b border-l border-[hsl(350_100%_50%/0.12)] pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-5 h-5 border-b border-r border-[hsl(190_100%_50%/0.15)] pointer-events-none" />
    </div>
  );
};

export default HeroScene3D;
