import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 800;

interface ParticleFieldProps {
  mousePosition: React.MutableRefObject<{ x: number; y: number }>;
}

export default function ParticleField({ mousePosition }: ParticleFieldProps) {
  const meshRef = useRef<THREE.Points>(null);

  const { positions, velocities, originalPositions } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    const originalPositions = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;

      originalPositions[i3] = positions[i3];
      originalPositions[i3 + 1] = positions[i3 + 1];
      originalPositions[i3 + 2] = positions[i3 + 2];

      velocities[i3] = (Math.random() - 0.5) * 0.01;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.005;
    }

    return { positions, velocities, originalPositions };
  }, []);

  const sizes = useMemo(() => {
    const sizes = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      sizes[i] = Math.random() * 3 + 1;
    }
    return sizes;
  }, []);

  useFrame((_state, delta) => {
    if (!meshRef.current) return;
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

      if (dist < 3) {
        const force = (3 - dist) / 3;
        posArray[i3] += (dx / dist) * force * 0.1;
        posArray[i3 + 1] += (dy / dist) * force * 0.1;
      }

      // Return to original position (spring)
      posArray[i3] += (originalPositions[i3] - posArray[i3]) * 0.002;
      posArray[i3 + 1] +=
        (originalPositions[i3 + 1] - posArray[i3 + 1]) * 0.002;
      posArray[i3 + 2] +=
        (originalPositions[i3 + 2] - posArray[i3 + 2]) * 0.002;

      // Boundary wrapping
      if (Math.abs(posArray[i3]) > 12) velocities[i3] *= -1;
      if (Math.abs(posArray[i3 + 1]) > 12) velocities[i3 + 1] *= -1;
      if (Math.abs(posArray[i3 + 2]) > 6) velocities[i3 + 2] *= -1;
    }

    positionAttr.needsUpdate = true;

    // Slow global rotation
    meshRef.current.rotation.y += delta * 0.02;
    meshRef.current.rotation.x += delta * 0.01;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#FF6600"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
