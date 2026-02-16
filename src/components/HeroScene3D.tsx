import { useRef, useEffect } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const SentientCoreScene = () => {
  const { scene } = useThree();
  const groupRef = useRef<THREE.Group | null>(null);
  const coreRef = useRef<THREE.Mesh | null>(null);
  const glowRef = useRef<THREE.Mesh | null>(null);
  const ring1Ref = useRef<THREE.Mesh | null>(null);
  const ring2Ref = useRef<THREE.Mesh | null>(null);
  const ring3Ref = useRef<THREE.Mesh | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const starsRef = useRef<THREE.Points | null>(null);

  useEffect(() => {
    const group = new THREE.Group();
    groupRef.current = group;
    scene.add(group);

    // Ambient light
    const ambient = new THREE.AmbientLight(0xffffff, 0.15);
    group.add(ambient);

    // Point lights
    const light1 = new THREE.PointLight(0xe8a517, 3);
    light1.position.set(0, 0, 0);
    group.add(light1);

    const light2 = new THREE.PointLight(0x3b9fd4, 1);
    light2.position.set(2, 1, 1);
    group.add(light2);

    const light3 = new THREE.PointLight(0xe8a517, 0.8);
    light3.position.set(-2, -1, -1);
    group.add(light3);

    // Core sphere
    const coreGeo = new THREE.SphereGeometry(0.8, 64, 64);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xe8a517,
      emissive: 0xd4940a,
      emissiveIntensity: 0.8,
      roughness: 0.1,
      metalness: 0.9,
      transparent: true,
      opacity: 0.85,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    coreRef.current = core;
    group.add(core);

    // Inner glow
    const glowGeo = new THREE.SphereGeometry(0.5, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xffd700,
      transparent: true,
      opacity: 0.3,
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    glowRef.current = glow;
    group.add(glow);

    // Orbital rings
    const ring1Geo = new THREE.TorusGeometry(1.4, 0.015, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0xe8a517, transparent: true, opacity: 0.6 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1Ref.current = ring1;
    group.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(1.7, 0.01, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x3b9fd4, transparent: true, opacity: 0.4 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2Ref.current = ring2;
    group.add(ring2);

    const ring3Geo = new THREE.TorusGeometry(2.0, 0.008, 16, 100);
    const ring3Mat = new THREE.MeshBasicMaterial({ color: 0xe8a517, transparent: true, opacity: 0.25 });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3Ref.current = ring3;
    group.add(ring3);

    // Particles
    const particleGeo = new THREE.BufferGeometry();
    const pPositions = new Float32Array(300 * 3);
    for (let i = 0; i < 300; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.8 + Math.random() * 1.2;
      pPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pPositions[i * 3 + 2] = r * Math.cos(phi);
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
    const particleMat = new THREE.PointsMaterial({ color: 0xe8a517, size: 0.02, transparent: true, opacity: 0.7, sizeAttenuation: true });
    const particles = new THREE.Points(particleGeo, particleMat);
    particlesRef.current = particles;
    group.add(particles);

    // Stars
    const starGeo = new THREE.BufferGeometry();
    const sPositions = new Float32Array(1500 * 3);
    for (let i = 0; i < 1500; i++) {
      sPositions[i * 3] = (Math.random() - 0.5) * 100;
      sPositions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      sPositions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(sPositions, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xddd8c4, size: 0.15, transparent: true, opacity: 0.6, sizeAttenuation: true });
    const stars = new THREE.Points(starGeo, starMat);
    starsRef.current = stars;
    group.add(stars);

    return () => {
      scene.remove(group);
      // Dispose geometries and materials
      [coreGeo, glowGeo, ring1Geo, ring2Geo, ring3Geo, particleGeo, starGeo].forEach(g => g.dispose());
      [coreMat, glowMat, ring1Mat, ring2Mat, ring3Mat, particleMat, starMat].forEach(m => m.dispose());
    };
  }, [scene]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.3;
      coreRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;
      const s = 1 + Math.sin(t * 1.5) * 0.05;
      coreRef.current.scale.setScalar(s);
    }
    if (glowRef.current) {
      const gs = 1 + Math.sin(t * 2) * 0.1;
      glowRef.current.scale.setScalar(gs);
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.5;
      ring1Ref.current.rotation.z = t * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = t * 0.4;
      ring2Ref.current.rotation.x = Math.PI / 3 + t * 0.1;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = -t * 0.3;
      ring3Ref.current.rotation.y = Math.PI / 4;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.05;
    }
    if (starsRef.current) {
      starsRef.current.rotation.y = t * 0.01;
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

      {/* Overlay HUD text */}
      <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-end pb-8">
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <span className="px-3 py-1 text-[10px] font-mono tracking-[0.2em] border border-sw-saber/20 bg-sw-void/80 text-sw-saber/70 rounded-sm backdrop-blur-sm">
            SENTIENT 3D CORE
          </span>
          <span className="px-3 py-1 text-[10px] font-mono tracking-[0.2em] border border-sw-force/20 bg-sw-void/80 text-sw-force/70 rounded-sm backdrop-blur-sm">
            VOLUMETRIC SHADERS
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          <span className="px-3 py-1 text-[10px] font-mono tracking-[0.2em] border border-sw-ember/20 bg-sw-void/80 text-sw-ember/70 rounded-sm backdrop-blur-sm">
            MICROLENDER PROTOCOL
          </span>
          <span className="px-3 py-1 text-[10px] font-mono tracking-[0.2em] border border-sw-holo/20 bg-sw-void/80 text-sw-holo/70 rounded-sm backdrop-blur-sm">
            HYPER-FUTURISTIC MCP-2099
          </span>
        </div>
      </div>

      {/* Corner HUD brackets */}
      <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-sw-saber/30 pointer-events-none" />
      <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-sw-saber/30 pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-sw-saber/30 pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-sw-saber/30 pointer-events-none" />
    </div>
  );
};

export default HeroScene3D;
