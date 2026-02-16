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

    // Soft white ambient
    const ambient = new THREE.AmbientLight(0xffffff, 0.3);
    group.add(ambient);

    // Core bioluminescent light
    const light1 = new THREE.PointLight(0xffffff, 2);
    light1.position.set(0, 0, 0);
    group.add(light1);

    const light2 = new THREE.PointLight(0xcccccc, 0.6);
    light2.position.set(3, 1, 2);
    group.add(light2);

    const light3 = new THREE.PointLight(0xdddddd, 0.4);
    light3.position.set(-2, -1, -1);
    group.add(light3);

    // Living core — translucent white organism
    const coreGeo = new THREE.SphereGeometry(0.8, 64, 64);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 0.15,
      roughness: 0.05,
      metalness: 0.1,
      transparent: true,
      opacity: 0.6,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      transmission: 0.3,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    coreRef.current = core;
    group.add(core);

    // Inner pulse — bright white heart
    const glowGeo = new THREE.SphereGeometry(0.4, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.5,
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    glowRef.current = glow;
    group.add(glow);

    // Orbital filaments — organic rings
    const ring1Geo = new THREE.TorusGeometry(1.4, 0.008, 16, 200);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.2 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1Ref.current = ring1;
    group.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(1.8, 0.005, 16, 200);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0xdddddd, transparent: true, opacity: 0.12 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2Ref.current = ring2;
    group.add(ring2);

    const ring3Geo = new THREE.TorusGeometry(2.2, 0.003, 16, 200);
    const ring3Mat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.06 });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3Ref.current = ring3;
    group.add(ring3);

    // Floating spores
    const particleGeo = new THREE.BufferGeometry();
    const pPositions = new Float32Array(500 * 3);
    for (let i = 0; i < 500; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.2 + Math.random() * 2;
      pPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pPositions[i * 3 + 2] = r * Math.cos(phi);
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
    const particleMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.015, transparent: true, opacity: 0.4, sizeAttenuation: true });
    const particles = new THREE.Points(particleGeo, particleMat);
    particlesRef.current = particles;
    group.add(particles);

    // Distant stars — sparse white dust
    const starGeo = new THREE.BufferGeometry();
    const sPositions = new Float32Array(800 * 3);
    for (let i = 0; i < 800; i++) {
      sPositions[i * 3] = (Math.random() - 0.5) * 80;
      sPositions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      sPositions[i * 3 + 2] = (Math.random() - 0.5) * 80;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(sPositions, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.08, transparent: true, opacity: 0.15, sizeAttenuation: true });
    const stars = new THREE.Points(starGeo, starMat);
    starsRef.current = stars;
    group.add(stars);

    return () => {
      scene.remove(group);
      [coreGeo, glowGeo, ring1Geo, ring2Geo, ring3Geo, particleGeo, starGeo].forEach(g => g.dispose());
      [coreMat, glowMat, ring1Mat, ring2Mat, ring3Mat, particleMat, starMat].forEach(m => m.dispose());
    };
  }, [scene]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Organic breathing motion
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.15;
      coreRef.current.rotation.x = Math.sin(t * 0.1) * 0.15;
      const s = 1 + Math.sin(t * 0.8) * 0.08;
      coreRef.current.scale.setScalar(s);
    }
    if (glowRef.current) {
      const gs = 1 + Math.sin(t * 1.2) * 0.15;
      glowRef.current.scale.setScalar(gs);
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = 0.3 + Math.sin(t * 1.5) * 0.2;
    }
    // Slow organic drift
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.2;
      ring1Ref.current.rotation.z = Math.sin(t * 0.15) * 0.5;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = t * 0.15;
      ring2Ref.current.rotation.x = Math.PI / 3 + Math.sin(t * 0.1) * 0.3;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = -t * 0.1;
      ring3Ref.current.rotation.y = Math.PI / 4 + Math.sin(t * 0.08) * 0.2;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.03;
      particlesRef.current.rotation.x = Math.sin(t * 0.05) * 0.1;
    }
    if (starsRef.current) {
      starsRef.current.rotation.y = t * 0.005;
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
          <span className="px-3 py-1 text-[10px] font-mono tracking-[0.2em] border border-white/10 bg-black/60 text-white/40 rounded-full backdrop-blur-sm">
            SENTIENT 3D CORE
          </span>
          <span className="px-3 py-1 text-[10px] font-mono tracking-[0.2em] border border-white/10 bg-black/60 text-white/40 rounded-full backdrop-blur-sm">
            VOLUMETRIC SHADERS
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          <span className="px-3 py-1 text-[10px] font-mono tracking-[0.2em] border border-white/10 bg-black/60 text-white/40 rounded-full backdrop-blur-sm">
            MICROLENDER PROTOCOL
          </span>
          <span className="px-3 py-1 text-[10px] font-mono tracking-[0.2em] border border-white/10 bg-black/60 text-white/40 rounded-full backdrop-blur-sm">
            HYPER-FUTURISTIC MCP-2099
          </span>
        </div>
      </div>

      {/* Corner brackets — thin, ethereal */}
      <div className="absolute top-4 left-4 w-5 h-5 border-t border-l border-white/8 pointer-events-none" />
      <div className="absolute top-4 right-4 w-5 h-5 border-t border-r border-white/8 pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-5 h-5 border-b border-l border-white/8 pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-5 h-5 border-b border-r border-white/8 pointer-events-none" />
    </div>
  );
};

export default HeroScene3D;
