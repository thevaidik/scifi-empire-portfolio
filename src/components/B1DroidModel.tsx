import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type B1DroidModelProps = {
  action: string | null;
};

// Procedural B1 Battle Droid — Clone Wars style
// Tan/bone skeletal frame, elongated head, thin limbs, E-5 blaster
const B1DroidModel = ({ action }: B1DroidModelProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Group>(null);
  const rightLegRef = useRef<THREE.Group>(null);
  const blasterRef = useRef<THREE.Group>(null);
  const eyeRef = useRef<THREE.Mesh>(null);

  const droidMat = useMemo(() => new THREE.MeshStandardMaterial({ 
    color: new THREE.Color("#c4a46a"), 
    roughness: 0.6, 
    metalness: 0.4 
  }), []);

  const darkMat = useMemo(() => new THREE.MeshStandardMaterial({ 
    color: new THREE.Color("#2a2520"), 
    roughness: 0.3, 
    metalness: 0.7 
  }), []);

  const blasterMat = useMemo(() => new THREE.MeshStandardMaterial({ 
    color: new THREE.Color("#1a1a2e"), 
    roughness: 0.3, 
    metalness: 0.8 
  }), []);

  const eyeColor = useMemo(() => {
    if (action === "fire") return "#ff3333";
    if (action === "alert") return "#ff3333";
    if (action === "scan") return "#44aaff";
    return "#ff4444";
  }, [action]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Idle sway
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.08;
    }

    // Head bob
    if (headRef.current) {
      headRef.current.rotation.z = Math.sin(t * 0.8) * 0.03;
      if (action === "scan") {
        headRef.current.rotation.y = Math.sin(t * 2) * 0.4;
      } else if (action === "alert") {
        headRef.current.rotation.y = Math.sin(t * 6) * 0.15;
      } else {
        headRef.current.rotation.y = Math.sin(t * 0.6) * 0.05;
      }
    }

    // Arm animations
    if (leftArmRef.current && rightArmRef.current) {
      if (action === "march") {
        leftArmRef.current.rotation.x = Math.sin(t * 4) * 0.3;
        rightArmRef.current.rotation.x = -Math.sin(t * 4) * 0.3;
      } else if (action === "fire") {
        // Raise blaster arm
        rightArmRef.current.rotation.x = -0.8 + Math.sin(t * 12) * 0.05;
      } else if (action === "shield") {
        leftArmRef.current.rotation.x = -0.5;
        leftArmRef.current.rotation.z = 0.3;
        rightArmRef.current.rotation.x = -0.5;
        rightArmRef.current.rotation.z = -0.3;
      } else {
        leftArmRef.current.rotation.x = Math.sin(t * 0.5) * 0.02;
        leftArmRef.current.rotation.z = 0;
        rightArmRef.current.rotation.x = Math.sin(t * 0.5 + 1) * 0.02;
        rightArmRef.current.rotation.z = 0;
      }
    }

    // Leg animations
    if (leftLegRef.current && rightLegRef.current) {
      if (action === "march") {
        leftLegRef.current.rotation.x = Math.sin(t * 4) * 0.25;
        rightLegRef.current.rotation.x = -Math.sin(t * 4) * 0.25;
      } else {
        leftLegRef.current.rotation.x = 0;
        rightLegRef.current.rotation.x = 0;
      }
    }

    // Eye glow pulse
    if (eyeRef.current) {
      const mat = eyeRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 1 + Math.sin(t * 3) * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1.2, 0]} scale={0.9}>
      {/* ═══ HEAD ═══ */}
      <group ref={headRef} position={[0, 2.7, 0]}>
        {/* Elongated cranium — B1 signature shape */}
        <mesh material={droidMat}>
          <boxGeometry args={[0.35, 0.28, 0.55]} />
        </mesh>
        {/* Front face plate */}
        <mesh position={[0, -0.05, 0.2]} material={darkMat}>
          <boxGeometry args={[0.28, 0.15, 0.12]} />
        </mesh>
        {/* Visor / eye slit */}
        <mesh ref={eyeRef} position={[0, -0.02, 0.27]}>
          <boxGeometry args={[0.22, 0.04, 0.02]} />
          <meshStandardMaterial color={eyeColor} emissive={eyeColor} emissiveIntensity={1.5} />
        </mesh>
        {/* Antenna nub */}
        <mesh position={[0.12, 0.18, -0.1]} material={darkMat}>
          <cylinderGeometry args={[0.015, 0.015, 0.12, 6]} />
        </mesh>
        {/* Neck */}
        <mesh position={[0, -0.22, 0.05]} material={darkMat}>
          <cylinderGeometry args={[0.06, 0.07, 0.18, 8]} />
        </mesh>
      </group>

      {/* ═══ TORSO ═══ */}
      <group position={[0, 1.85, 0]}>
        {/* Chest core */}
        <mesh material={droidMat}>
          <boxGeometry args={[0.5, 0.65, 0.25]} />
        </mesh>
        {/* Center chest plate */}
        <mesh position={[0, 0.05, 0.13]} material={darkMat}>
          <boxGeometry args={[0.2, 0.2, 0.02]} />
        </mesh>
        {/* Chest indicator light */}
        <mesh position={[0, 0.05, 0.15]}>
          <boxGeometry args={[0.04, 0.04, 0.01]} />
          <meshStandardMaterial 
            color={action === "alert" ? "#ff0000" : "#883322"} 
            emissive={action === "alert" ? "#ff0000" : "#883322"} 
            emissiveIntensity={action === "alert" ? 2 : 0.5} 
          />
        </mesh>
        {/* Abdomen — thinner waist */}
        <mesh position={[0, -0.45, 0]} material={darkMat}>
          <cylinderGeometry args={[0.08, 0.12, 0.25, 8]} />
        </mesh>
        {/* Hip block */}
        <mesh position={[0, -0.65, 0]} material={droidMat}>
          <boxGeometry args={[0.4, 0.15, 0.2]} />
        </mesh>
      </group>

      {/* ═══ LEFT ARM ═══ */}
      <group ref={leftArmRef} position={[-0.35, 2.05, 0]}>
        {/* Shoulder joint */}
        <mesh material={darkMat}>
          <sphereGeometry args={[0.07, 8, 8]} />
        </mesh>
        {/* Upper arm */}
        <mesh position={[0, -0.25, 0]} material={droidMat}>
          <cylinderGeometry args={[0.04, 0.035, 0.4, 6]} />
        </mesh>
        {/* Elbow */}
        <mesh position={[0, -0.45, 0]} material={darkMat}>
          <sphereGeometry args={[0.045, 6, 6]} />
        </mesh>
        {/* Forearm */}
        <mesh position={[0, -0.65, 0]} material={droidMat}>
          <cylinderGeometry args={[0.035, 0.03, 0.3, 6]} />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.82, 0]} material={darkMat}>
          <boxGeometry args={[0.06, 0.06, 0.04]} />
        </mesh>
      </group>

      {/* ═══ RIGHT ARM + BLASTER ═══ */}
      <group ref={rightArmRef} position={[0.35, 2.05, 0]}>
        <mesh material={darkMat}>
          <sphereGeometry args={[0.07, 8, 8]} />
        </mesh>
        <mesh position={[0, -0.25, 0]} material={droidMat}>
          <cylinderGeometry args={[0.04, 0.035, 0.4, 6]} />
        </mesh>
        <mesh position={[0, -0.45, 0]} material={darkMat}>
          <sphereGeometry args={[0.045, 6, 6]} />
        </mesh>
        <mesh position={[0, -0.65, 0]} material={droidMat}>
          <cylinderGeometry args={[0.035, 0.03, 0.3, 6]} />
        </mesh>
        {/* Hand holding blaster */}
        <group ref={blasterRef} position={[0, -0.82, 0.08]}>
          <mesh material={darkMat}>
            <boxGeometry args={[0.06, 0.06, 0.04]} />
          </mesh>
          {/* E-5 Blaster Rifle */}
          <mesh position={[0, 0, 0.15]} material={blasterMat}>
            <boxGeometry args={[0.035, 0.04, 0.35]} />
          </mesh>
          <mesh position={[0, -0.02, 0.35]} material={blasterMat}>
            <cylinderGeometry args={[0.015, 0.015, 0.06, 6]} />
          </mesh>
          {/* Blaster bolt */}
          {action === "fire" && (
            <mesh position={[0, 0, 0.5]}>
              <sphereGeometry args={[0.025, 8, 8]} />
              <meshStandardMaterial color="#ff2200" emissive="#ff2200" emissiveIntensity={4} />
            </mesh>
          )}
        </group>
      </group>

      {/* ═══ LEFT LEG ═══ */}
      <group ref={leftLegRef} position={[-0.13, 1.05, 0]}>
        <mesh material={darkMat}>
          <sphereGeometry args={[0.06, 8, 8]} />
        </mesh>
        {/* Thigh */}
        <mesh position={[0, -0.28, 0]} material={droidMat}>
          <cylinderGeometry args={[0.045, 0.04, 0.45, 6]} />
        </mesh>
        {/* Knee */}
        <mesh position={[0, -0.5, 0]} material={darkMat}>
          <sphereGeometry args={[0.05, 6, 6]} />
        </mesh>
        {/* Shin */}
        <mesh position={[0, -0.75, 0]} material={droidMat}>
          <cylinderGeometry args={[0.04, 0.035, 0.4, 6]} />
        </mesh>
        {/* Foot */}
        <mesh position={[0, -0.98, 0.03]} material={droidMat}>
          <boxGeometry args={[0.08, 0.04, 0.14]} />
        </mesh>
      </group>

      {/* ═══ RIGHT LEG ═══ */}
      <group ref={rightLegRef} position={[0.13, 1.05, 0]}>
        <mesh material={darkMat}>
          <sphereGeometry args={[0.06, 8, 8]} />
        </mesh>
        <mesh position={[0, -0.28, 0]} material={droidMat}>
          <cylinderGeometry args={[0.045, 0.04, 0.45, 6]} />
        </mesh>
        <mesh position={[0, -0.5, 0]} material={darkMat}>
          <sphereGeometry args={[0.05, 6, 6]} />
        </mesh>
        <mesh position={[0, -0.75, 0]} material={droidMat}>
          <cylinderGeometry args={[0.04, 0.035, 0.4, 6]} />
        </mesh>
        <mesh position={[0, -0.98, 0.03]} material={droidMat}>
          <boxGeometry args={[0.08, 0.04, 0.14]} />
        </mesh>
      </group>

      {/* Shield bubble */}
      {action === "shield" && (
        <mesh position={[0, 1.5, 0]}>
          <sphereGeometry args={[1.5, 24, 24]} />
          <meshStandardMaterial color="#c4a46a" transparent opacity={0.08} wireframe />
        </mesh>
      )}
    </group>
  );
};

export default B1DroidModel;
