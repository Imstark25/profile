'use client'
import { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, Preload } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'

function StarField(props: Record<string, unknown>) {
  const ref = useRef<any>(null)
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(8000), { radius: 1.3 })
  )

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 12
      ref.current.rotation.y -= delta / 18
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#a5b4fc"
          size={0.0018}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.7}
        />
      </Points>
    </group>
  )
}

export function StarsCanvas() {
  return (
    <div className="absolute inset-0 w-full h-full z-[-1]">
      <Canvas camera={{ position: [0, 0, 1] }} gl={{ antialias: false }}>
        <Suspense fallback={null}>
          <StarField />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  )
}
