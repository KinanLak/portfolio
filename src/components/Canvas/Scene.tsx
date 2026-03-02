import { Canvas } from "@react-three/fiber";
import ParticleField from "./ParticleField";

interface SceneProps {
  mousePosition: React.MutableRefObject<{ x: number; y: number }>;
}

export default function Scene({ mousePosition }: SceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true }}
    >
      <ParticleField mousePosition={mousePosition} />
    </Canvas>
  );
}
