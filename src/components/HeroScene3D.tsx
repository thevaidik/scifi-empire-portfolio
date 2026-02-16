import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Stars } from "@react-three/drei";
import * as THREE from "three";

const SentientCore = () => {
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);
  const ringRef3 = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const particlePositions = useMemo(() => {
    const positions = new Float32Array(300 * 3);
    for (let i = 0; i < 300; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.8 + Math.random() * 1.2;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.3;
      coreRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;
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
  });

  return (
    <group>
      {/* Sentient Core Sphere */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <Sphere ref={coreRef} args={[0.8, 64, 64]}>
          <MeshDistortMaterial
            color="#e8a517"
            emissive="#d4940a"
            emissiveIntensity={0.8}
            roughness={0.1}
            metalness={0.9}
            distort={0.25}
            speed={2}
            transparent
            opacity={0.85}
          />
        </Sphere>
      </Float>

      {/* Inner glow sphere */}
      <Sphere args={[0.5, 32, 32]}>
        <meshBasicMaterial color="#ffd700" transparent opacity={0.3} />
      </Sphere>

      {/* Orbital Ring 1 */}
      <mesh ref={ringRef1}>
        <torusGeometry args={[1.4, 0.015, 16, 100]} />
        <meshStandardMaterial
          color="#e8a517"
          emissive="#e8a517"
          emissiveIntensity={2}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Orbital Ring 2 */}
      <mesh ref={ringRef2}>
        <torusGeometry args={[1.7, 0.01, 16, 100]} />
        <meshStandardMaterial
          color="#3b9fd4"
          emissive="#3b9fd4"
          emissiveIntensity={2}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Orbital Ring 3 */}
      <mesh ref={ringRef3}>
        <torusGeometry args={[2.0, 0.008, 16, 100]} />
        <meshStandardMaterial
          color="#e8a517"
          emissive="#e8a517"
          emissiveIntensity={1.5}
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Floating data particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={300}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#e8a517"
          size={0.02}
          transparent
          opacity={0.7}
          sizeAttenuation
        />
      </points>

      {/* Volumetric light beams */}
      <pointLight position={[0, 0, 0]} color="#e8a517" intensity={3} distance={8} />
      <pointLight position={[2, 1, 1]} color="#3b9fd4" intensity={1} distance={6} />
      <pointLight position={[-2, -1, -1]} color="#e8a517" intensity={0.8} distance={6} />
    </group>
  );
};

const HeroScene3D = () => {
  return (
    <div className="relative w-full h-[500px] md:h-[600px]">
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.15} />
        <Stars
          radius={50}
          depth={50}
          count={1500}
          factor={3}
          saturation={0.5}
          fade
          speed={0.5}
        />
        <SentientCore />
      </Canvas>

      {/* Overlay HUD text */}
      <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-end pb-8">
        {/* Protocol badges */}
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

      {/* Scan line overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-sw-saber/20 to-transparent animate-scan-line" />
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
