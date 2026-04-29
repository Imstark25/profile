'use client'
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

/* ── Orb mesh ───────────────────────────────────── */
function Orb() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    // Gentle float: Y oscillation
    meshRef.current.position.y = Math.sin(t * 0.45) * 0.22
    // Slow rotation
    meshRef.current.rotation.y = t * 0.12
    meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.06
  })

  return (
    <Sphere ref={meshRef} args={[1.7, 64, 64]}>
      <MeshDistortMaterial
        color="#3b82f6"
        roughness={0.18}
        metalness={0.5}
        distort={0.28}
        speed={1.2}
        transparent
        opacity={0.82}
      />
    </Sphere>
  )
}

/* ── Inner soft glow ring ───────────────────────── */
function GlowRing() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.z = clock.getElapsedTime() * 0.08
    ref.current.rotation.x = 0.4 + Math.sin(clock.getElapsedTime() * 0.3) * 0.05
  })
  return (
    <mesh ref={ref}>
      <torusGeometry args={[2.1, 0.04, 8, 120]} />
      <meshBasicMaterial
        color="#8b5cf6"
        transparent
        opacity={0.18}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  )
}

/* ── Canvas export ──────────────────────────────── */
export function FloatingOrb({ isMobile = false }: { isMobile?: boolean }) {
  if (isMobile) return null

  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
      >
        {/* Soft ambient + warm point + cool fill */}
        <ambientLight intensity={0.35} />
        <pointLight position={[4, 4, 4]} intensity={1.8} color="#60a5fa" />
        <pointLight position={[-4, -2, -3]} intensity={0.6} color="#a78bfa" />

        <Orb />
        <GlowRing />
      </Canvas>
    </div>
  )
}
