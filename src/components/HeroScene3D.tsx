import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const SentientCore = () => {
  const coreRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);
  const ringRef3 = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const starsRef = useRef<THREE.Points>(null);

  const particleGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(300 * 3);
    for (let i = 0; i < 300; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.8 + Math.random() * 1.2;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  const starGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(1500 * 3);
    for (let i = 0; i < 1500; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  const coreMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#e8a517"),
        emissive: new THREE.Color("#d4940a"),
        emissiveIntensity: 0.8,
        roughness: 0.1,
        metalness: 0.9,
        transparent: true,
        opacity: 0.85,
      }),
    []
  );

  const glowMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#ffd700"),
        transparent: true,
        opacity: 0.3,
      }),
    []
  );

  const ringMat1 = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#e8a517"),
        transparent: true,
        opacity: 0.6,
      }),
    []
  );

  const ringMat2 = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#3b9fd4"),
        transparent: true,
        opacity: 0.4,
      }),
    []
  );

  const ringMat3 = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#e8a517"),
        transparent: true,
        opacity: 0.25,
      }),
    []
  );

  const particleMat = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: new THREE.Color("#e8a517"),
        size: 0.02,
        transparent: true,
        opacity: 0.7,
        sizeAttenuation: true,
      }),
    []
  );

  const starMat = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: new THREE.Color("#ddd8c4"),
        size: 0.15,
        transparent: true,
        opacity: 0.6,
        sizeAttenuation: true,
      }),
    []
  );

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
    if (ringRef1.current) {
      ringRef1.current.rotation.x = t * 0.5;
      ringRef1.current.rotation.z = t * 0.2;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.y = t * 0.4;
      ringRef2.current.rotation.x = Math.PI / 3 + t * 0.1;
    }
    if (ringRef3.current) {
      ringRef3.current.rotation.z = -t * 0.3;
      ringRef3.current.rotation.y = Math.PI / 4;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.05;
    }
    if (starsRef.current) {
      starsRef.current.rotation.y = t * 0.01;
    }
  });

  return (
    <>
      {/* Stars background */}
      <points ref={starsRef} geometry={starGeometry} material={starMat} />

      {/* Core */}
      <mesh ref={coreRef} geometry={new THREE.SphereGeometry(0.8, 64, 64)} material={coreMaterial} />

      {/* Inner glow */}
      <mesh ref={glowRef} geometry={new THREE.SphereGeometry(0.5, 32, 32)} material={glowMaterial} />

      {/* Orbital rings */}
      <mesh ref={ringRef1} geometry={new THREE.TorusGeometry(1.4, 0.015, 16, 100)} material={ringMat1} />
      <mesh ref={ringRef2} geometry={new THREE.TorusGeometry(1.7, 0.01, 16, 100)} material={ringMat2} />
      <mesh ref={ringRef3} geometry={new THREE.TorusGeometry(2.0, 0.008, 16, 100)} material={ringMat3} />

      {/* Particles */}
      <points ref={particlesRef} geometry={particleGeometry} material={particleMat} />

      {/* Lights */}
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 0, 0]} color="#e8a517" intensity={3} />
      <pointLight position={[2, 1, 1]} color="#3b9fd4" intensity={1} />
      <pointLight position={[-2, -1, -1]} color="#e8a517" intensity={0.8} />
    </>
  );
};

const HeroScene3D = () => {
  return (
    <div className="relative w-full h-[500px] md:h-[600px]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <SentientCore />
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
