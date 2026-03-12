import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { musicController } from "@/hooks/useMusicPlayer";

const PARTICLE_COUNT = 800;

interface ParticleFieldBuffers {
  originalPositions: Float32Array;
  positions: Float32Array;
  sizes: Float32Array;
  velocities: Float32Array;
}

interface ParticleFieldProps {
  mousePosition: React.MutableRefObject<{ x: number; y: number }>;
}

function seededRandom(seed: number) {
  const value = Math.sin(seed * 12.9898 + 78.233) * 43758.5453123;
  return value - Math.floor(value);
}

function createParticleFieldData(): ParticleFieldBuffers {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const velocities = new Float32Array(PARTICLE_COUNT * 3);
  const originalPositions = new Float32Array(PARTICLE_COUNT * 3);
  const sizes = new Float32Array(PARTICLE_COUNT);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;
    const positionSeed = i + 1;
    const velocitySeed = i + 1000;

    positions[i3] = (seededRandom(positionSeed * 3) - 0.5) * 20;
    positions[i3 + 1] = (seededRandom(positionSeed * 5) - 0.5) * 20;
    positions[i3 + 2] = (seededRandom(positionSeed * 7) - 0.5) * 10;

    originalPositions[i3] = positions[i3];
    originalPositions[i3 + 1] = positions[i3 + 1];
    originalPositions[i3 + 2] = positions[i3 + 2];

    velocities[i3] = (seededRandom(velocitySeed * 11) - 0.5) * 0.01;
    velocities[i3 + 1] = (seededRandom(velocitySeed * 13) - 0.5) * 0.01;
    velocities[i3 + 2] = (seededRandom(velocitySeed * 17) - 0.5) * 0.005;

    sizes[i] = seededRandom(positionSeed * 19) * 3 + 1;
  }

  return { originalPositions, positions, sizes, velocities };
}

const PARTICLE_DATA = createParticleFieldData();
const PARTICLE_ORIGINAL_POSITIONS = PARTICLE_DATA.originalPositions;
const PARTICLE_POSITIONS = PARTICLE_DATA.positions;
const PARTICLE_SIZES = PARTICLE_DATA.sizes;
const PARTICLE_VELOCITIES = PARTICLE_DATA.velocities;

export default function ParticleField({ mousePosition }: ParticleFieldProps) {
  const meshRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);
  const velocitiesRef = useRef(PARTICLE_VELOCITIES);

  useFrame((_state, delta) => {
    if (!meshRef.current || !materialRef.current) return;

    const beatState = musicController.getBeatState();
    const pulseEnvelope = beatState.isPlaying ? Math.max(0, 1 - beatState.beatPhase * 5) : 0;
    const beatAccent = beatState.beatInBar === 0 || beatState.beatInBar === 2 ? 1 : 0.55;
    const energy = pulseEnvelope * beatAccent;
    const velocities = velocitiesRef.current;
    const positionAttr = meshRef.current.geometry.attributes
      .position as THREE.BufferAttribute;
    const posArray = positionAttr.array as Float32Array;

    const mx = mousePosition.current.x * 5;
    const my = mousePosition.current.y * 5;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      // Base floating motion
      posArray[i3] += velocities[i3];
      posArray[i3 + 1] += velocities[i3 + 1];
      posArray[i3 + 2] += velocities[i3 + 2];

      // Mouse repulsion
      const dx = posArray[i3] - mx;
      const dy = posArray[i3 + 1] - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const safeDist = Math.max(dist, 0.001);

      if (dist < 3) {
        const force = (3 - dist) / 3;
        posArray[i3] += (dx / safeDist) * force * 0.1;
        posArray[i3 + 1] += (dy / safeDist) * force * 0.1;
      }

      const originalX = PARTICLE_ORIGINAL_POSITIONS[i3];
      const originalY = PARTICLE_ORIGINAL_POSITIONS[i3 + 1];
      const originalZ = PARTICLE_ORIGINAL_POSITIONS[i3 + 2];
      const radialX = posArray[i3] - originalX;
      const radialY = posArray[i3 + 1] - originalY;
      const radialZ = posArray[i3 + 2] - originalZ;
      const radialLength = Math.max(
        Math.sqrt(radialX * radialX + radialY * radialY + radialZ * radialZ),
        0.001
      );
      const burst = energy * 0.06;

      posArray[i3] += (radialX / radialLength) * burst;
      posArray[i3 + 1] += (radialY / radialLength) * burst;
      posArray[i3 + 2] += (radialZ / radialLength) * burst * 0.6;

      // Return to original position (spring)
      posArray[i3] += (originalX - posArray[i3]) * (0.002 + energy * 0.01);
      posArray[i3 + 1] +=
        (originalY - posArray[i3 + 1]) * (0.002 + energy * 0.01);
      posArray[i3 + 2] +=
        (originalZ - posArray[i3 + 2]) * (0.002 + energy * 0.008);

      // Boundary wrapping
      if (Math.abs(posArray[i3]) > 12) velocities[i3] *= -1;
      if (Math.abs(posArray[i3 + 1]) > 12) velocities[i3 + 1] *= -1;
      if (Math.abs(posArray[i3 + 2]) > 6) velocities[i3 + 2] *= -1;
    }

    positionAttr.needsUpdate = true;

    // Slow global rotation
    meshRef.current.rotation.y += delta * (0.02 + energy * 0.18);
    meshRef.current.rotation.x += delta * (0.01 + energy * 0.08);

    materialRef.current.size = 0.04 + energy * 0.03;
    materialRef.current.opacity = 0.45 + energy * 0.35;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[PARTICLE_POSITIONS, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[PARTICLE_SIZES, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={0.04}
        color="#FF6600"
        transparent
        opacity={0.45}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
