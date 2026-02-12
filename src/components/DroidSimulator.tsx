import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Grid, Environment } from "@react-three/drei";
import * as THREE from "three";

/* ── B1 Battle Droid (geometric primitives) ─────────────────────── */
const BattleDroid = ({ position, walking }: { position: [number, number, number]; walking: boolean }) => {
  const group = useRef<THREE.Group>(null!);
  const leftLeg = useRef<THREE.Group>(null!);
  const rightLeg = useRef<THREE.Group>(null!);
  const leftArm = useRef<THREE.Group>(null!);
  const rightArm = useRef<THREE.Group>(null!);

  const droidMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#c4a35a", roughness: 0.6, metalness: 0.7 }),
    []
  );
  const darkMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#8a7440", roughness: 0.5, metalness: 0.8 }),
    []
  );
  const eyeMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#ff4444",
        emissive: "#ff2222",
        emissiveIntensity: 2,
      }),
    []
  );

  useFrame((state) => {
    if (!walking) return;
    const t = state.clock.elapsedTime * 4;
    const swing = Math.sin(t) * 0.4;
    if (leftLeg.current) leftLeg.current.rotation.x = swing;
    if (rightLeg.current) rightLeg.current.rotation.x = -swing;
    if (leftArm.current) leftArm.current.rotation.x = -swing * 0.6;
    if (rightArm.current) rightArm.current.rotation.x = swing * 0.6;
    // Slight body bob
    if (group.current) group.current.position.y = Math.abs(Math.sin(t * 2)) * 0.03;
  });

  return (
    <group ref={group} position={position}>
      {/* Head - elongated B1 style */}
      <group position={[0, 1.65, 0]}>
        {/* Main head */}
        <mesh material={droidMat}>
          <boxGeometry args={[0.18, 0.2, 0.25]} />
        </mesh>
        {/* Snout */}
        <mesh material={darkMat} position={[0, -0.05, 0.15]}>
          <boxGeometry args={[0.1, 0.08, 0.12]} />
        </mesh>
        {/* Eyes */}
        <mesh material={eyeMat} position={[-0.05, 0.02, 0.13]}>
          <sphereGeometry args={[0.025, 8, 8]} />
        </mesh>
        <mesh material={eyeMat} position={[0.05, 0.02, 0.13]}>
          <sphereGeometry args={[0.025, 8, 8]} />
        </mesh>
        {/* Antenna nub */}
        <mesh material={darkMat} position={[0, 0.12, -0.05]}>
          <cylinderGeometry args={[0.01, 0.015, 0.06, 6]} />
        </mesh>
      </group>

      {/* Neck */}
      <mesh material={darkMat} position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.03, 0.04, 0.12, 8]} />
      </mesh>

      {/* Torso - thin skeletal */}
      <mesh material={droidMat} position={[0, 1.25, 0]}>
        <boxGeometry args={[0.25, 0.35, 0.12]} />
      </mesh>

      {/* Chest plate detail */}
      <mesh material={darkMat} position={[0, 1.3, 0.065]}>
        <boxGeometry args={[0.15, 0.12, 0.02]} />
      </mesh>

      {/* Backpack */}
      <mesh material={darkMat} position={[0, 1.28, -0.09]}>
        <boxGeometry args={[0.18, 0.2, 0.06]} />
      </mesh>

      {/* Waist */}
      <mesh material={darkMat} position={[0, 1.05, 0]}>
        <boxGeometry args={[0.2, 0.08, 0.1]} />
      </mesh>

      {/* Left Arm */}
      <group ref={leftArm} position={[-0.18, 1.35, 0]}>
        {/* Upper arm */}
        <mesh material={droidMat} position={[0, -0.12, 0]}>
          <cylinderGeometry args={[0.025, 0.02, 0.25, 6]} />
        </mesh>
        {/* Elbow joint */}
        <mesh material={darkMat} position={[0, -0.25, 0]}>
          <sphereGeometry args={[0.03, 6, 6]} />
        </mesh>
        {/* Forearm */}
        <mesh material={droidMat} position={[0, -0.38, 0]}>
          <cylinderGeometry args={[0.02, 0.025, 0.22, 6]} />
        </mesh>
      </group>

      {/* Right Arm (holding blaster pose) */}
      <group ref={rightArm} position={[0.18, 1.35, 0]}>
        <mesh material={droidMat} position={[0, -0.12, 0]}>
          <cylinderGeometry args={[0.025, 0.02, 0.25, 6]} />
        </mesh>
        <mesh material={darkMat} position={[0, -0.25, 0]}>
          <sphereGeometry args={[0.03, 6, 6]} />
        </mesh>
        <mesh material={droidMat} position={[0, -0.38, 0]}>
          <cylinderGeometry args={[0.02, 0.025, 0.22, 6]} />
        </mesh>
      </group>

      {/* Left Leg */}
      <group ref={leftLeg} position={[-0.07, 1.0, 0]}>
        {/* Upper leg */}
        <mesh material={droidMat} position={[0, -0.18, 0]}>
          <cylinderGeometry args={[0.03, 0.025, 0.35, 6]} />
        </mesh>
        {/* Knee */}
        <mesh material={darkMat} position={[0, -0.36, 0]}>
          <sphereGeometry args={[0.035, 6, 6]} />
        </mesh>
        {/* Lower leg */}
        <mesh material={droidMat} position={[0, -0.55, 0]}>
          <cylinderGeometry args={[0.025, 0.03, 0.35, 6]} />
        </mesh>
        {/* Foot */}
        <mesh material={darkMat} position={[0, -0.73, 0.02]}>
          <boxGeometry args={[0.06, 0.03, 0.1]} />
        </mesh>
      </group>

      {/* Right Leg */}
      <group ref={rightLeg} position={[0.07, 1.0, 0]}>
        <mesh material={droidMat} position={[0, -0.18, 0]}>
          <cylinderGeometry args={[0.03, 0.025, 0.35, 6]} />
        </mesh>
        <mesh material={darkMat} position={[0, -0.36, 0]}>
          <sphereGeometry args={[0.035, 6, 6]} />
        </mesh>
        <mesh material={droidMat} position={[0, -0.55, 0]}>
          <cylinderGeometry args={[0.025, 0.03, 0.35, 6]} />
        </mesh>
        <mesh material={darkMat} position={[0, -0.73, 0.02]}>
          <boxGeometry args={[0.06, 0.03, 0.1]} />
        </mesh>
      </group>
    </group>
  );
};

/* ── Patrolling Droid that walks in a loop ────────────────────── */
const PatrolDroid = ({ path, speed = 0.6, offset = 0 }: { path: [number, number, number][]; speed?: number; offset?: number }) => {
  const group = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (!group.current || path.length < 2) return;
    const t = ((state.clock.elapsedTime * speed + offset) % path.length);
    const idx = Math.floor(t);
    const frac = t - idx;
    const from = path[idx % path.length];
    const to = path[(idx + 1) % path.length];

    group.current.position.x = THREE.MathUtils.lerp(from[0], to[0], frac);
    group.current.position.z = THREE.MathUtils.lerp(from[2], to[2], frac);

    // Face direction of travel
    const angle = Math.atan2(to[0] - from[0], to[2] - from[2]);
    group.current.rotation.y = angle;
  });

  return (
    <group ref={group}>
      <BattleDroid position={[0, 0, 0]} walking={true} />
    </group>
  );
};

/* ── Ground Platform ──────────────────────────────────────────── */
const Platform = () => (
  <>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.25, 0]} receiveShadow>
      <planeGeometry args={[12, 12]} />
      <meshStandardMaterial color="#1a1a2e" roughness={0.8} metalness={0.3} />
    </mesh>
    <Grid
      args={[12, 12]}
      position={[0, 0.26, 0]}
      cellSize={0.5}
      cellThickness={0.5}
      cellColor="#c4a35a"
      sectionSize={2}
      sectionThickness={1}
      sectionColor="#c4a35a"
      fadeDistance={15}
      fadeStrength={1}
      infiniteGrid={false}
    />
  </>
);

/* ── Main Scene ───────────────────────────────────────────────── */
const DroidSimulator = () => {
  // Patrol paths for multiple droids
  const path1: [number, number, number][] = [
    [-2, 0, -2], [-2, 0, 2], [2, 0, 2], [2, 0, -2],
  ];
  const path2: [number, number, number][] = [
    [0, 0, -3], [3, 0, 0], [0, 0, 3], [-3, 0, 0],
  ];
  const path3: [number, number, number][] = [
    [-4, 0, 0], [-4, 0, -3], [0, 0, -3], [0, 0, 0], [-4, 0, 0],
  ];

  return (
    <div className="sw-card overflow-hidden scan-line-effect">
      <div className="p-5 pb-2">
        <h3 className="font-display text-sm font-bold tracking-[0.2em] text-sw-saber mb-1">
          SEPARATIST DROID PATROL
        </h3>
        <p className="text-xs text-sw-steel font-body tracking-wide">
          B1 Battle Droids executing waypoint navigation — drag to orbit, scroll to zoom
        </p>
      </div>

      <div className="w-full h-[400px] md:h-[500px] cursor-grab active:cursor-grabbing">
        <Canvas
          camera={{ position: [4, 3, 5], fov: 50 }}
          shadows
          gl={{ antialias: true }}
          dpr={[1, 1.5]}
        >
          {/* Lighting */}
          <ambientLight intensity={0.3} color="#ffd700" />
          <directionalLight
            position={[5, 8, 5]}
            intensity={1.2}
            color="#ffe4a0"
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <pointLight position={[-3, 4, -3]} intensity={0.5} color="#4488ff" />
          <pointLight position={[3, 2, 3]} intensity={0.3} color="#ff4444" />

          {/* Fog for depth */}
          <fog attach="fog" args={["#0a0a14", 8, 20]} />

          <Platform />

          {/* Droids on patrol */}
          <PatrolDroid path={path1} speed={0.5} offset={0} />
          <PatrolDroid path={path2} speed={0.4} offset={1.5} />
          <PatrolDroid path={path3} speed={0.35} offset={3} />

          <OrbitControls
            enablePan={false}
            minDistance={3}
            maxDistance={12}
            maxPolarAngle={Math.PI / 2.2}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>

      <div className="px-5 pb-4 pt-2">
        <p className="text-[10px] font-mono tracking-wider text-sw-steel/40 text-center">
          Waypoint-based patrol algorithm — real autonomous navigation used in robotics &amp; game AI
        </p>
      </div>
    </div>
  );
};

export default DroidSimulator;
