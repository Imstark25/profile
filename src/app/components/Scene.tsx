'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';

export default function Scene() {
  return (
    <Canvas>
      <OrbitControls enableZoom={false} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 5, 2]} intensity={1} />
      <Sphere visible args={[1, 100, 200]} scale={2}>
        <MeshDistortMaterial
          color="#8352FD"
          attach="material"
          distort={0.5}
          speed={2}
        />
      </Sphere>
    </Canvas>
  );
}
