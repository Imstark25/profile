'use client'
import { useRef, useState, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial, Preload, MeshDistortMaterial, Sphere } from '@react-three/drei'
import * as THREE from 'three'
import * as random from 'maath/random/dist/maath-random.esm'

/* ── Mouse-follow spotlight ──────────────────────── */
function MouseLight() {
  const light = useRef<THREE.PointLight>(null)
  const { viewport } = useThree()

  useFrame(({ mouse }) => {
    if (!light.current) return
    // Smoothly follow mouse
    light.current.position.x += (mouse.x * viewport.width  / 2 - light.current.position.x) * 0.06
    light.current.position.y += (mouse.y * viewport.height / 2 - light.current.position.y) * 0.06
  })

  return (
    <pointLight
      ref={light}
      position={[0, 0, 2]}
      intensity={3}
      color="#6366f1"
      distance={8}
      decay={2}
    />
  )
}

/* ── Parallax star layer ─────────────────────────── */
function StarLayer({
  count, radius, size, color, speed, depth,
}: {
  count: number; radius: number; size: number
  color: string; speed: number; depth: number
}) {
  const ref  = useRef<any>(null)
  const [pts] = useState(() => random.inSphere(new Float32Array(count * 3), { radius }))

  useFrame(({ mouse, clock }) => {
    if (!ref.current) return
    ref.current.rotation.x -= 0.0003 * speed
    ref.current.rotation.y -= 0.0005 * speed
    // Parallax: closer layers move more with mouse
    ref.current.rotation.x += mouse.y * 0.0005 * depth
    ref.current.rotation.y += mouse.x * 0.0005 * depth
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={pts} stride={3} frustumCulled>
        <PointMaterial
          transparent color={color} size={size}
          sizeAttenuation depthWrite={false} opacity={0.7}
        />
      </Points>
    </group>
  )
}

/* ── Floating Abstract Orb ───────────────────────── */
function FloatingOrb() {
  const meshRef = useRef<any>(null)
  const time    = useRef(0)

  useFrame(({ mouse, clock }, delta) => {
    if (!meshRef.current) return
    time.current += delta
    // Float up and down
    meshRef.current.position.y = Math.sin(time.current * 0.6) * 0.15
    // Gentle rotation
    meshRef.current.rotation.x += delta * 0.12
    meshRef.current.rotation.z += delta * 0.08
    // Follow mouse slightly
    meshRef.current.rotation.y += (mouse.x * 0.3 - meshRef.current.rotation.y) * 0.04
  })

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} position={[0, 0, 0]}>
      <MeshDistortMaterial
        color="#3b82f6"
        roughness={0.1}
        metalness={0.9}
        distort={0.45}
        speed={2.5}
        envMapIntensity={1.2}
      />
    </Sphere>
  )
}

/* ── Orbit Ring ──────────────────────────────────── */
function OrbitRing() {
  const ref = useRef<any>(null)
  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.x += delta * 0.15
    ref.current.rotation.y += delta * 0.2
  })

  return (
    <mesh ref={ref} rotation={[Math.PI / 4, 0, 0]}>
      <torusGeometry args={[1.6, 0.012, 8, 120]} />
      <meshStandardMaterial
        color="#8b5cf6"
        emissive="#8b5cf6"
        emissiveIntensity={0.6}
        transparent opacity={0.7}
      />
    </mesh>
  )
}

/* ── Second Ring ─────────────────────────────────── */
function OrbitRing2() {
  const ref = useRef<any>(null)
  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.x -= delta * 0.1
    ref.current.rotation.z += delta * 0.12
  })

  return (
    <mesh ref={ref} rotation={[Math.PI / 3, Math.PI / 6, 0]}>
      <torusGeometry args={[2.0, 0.008, 8, 120]} />
      <meshStandardMaterial
        color="#06b6d4"
        emissive="#06b6d4"
        emissiveIntensity={0.5}
        transparent opacity={0.5}
      />
    </mesh>
  )
}

/* ── Full Scene ──────────────────────────────────── */
function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} color="#ffffff" />
      <MouseLight />

      {/* Parallax star layers — near, mid, far */}
      <StarLayer count={3000} radius={1.8} size={0.0025} color="#818cf8" speed={1.2} depth={3} />
      <StarLayer count={2000} radius={2.5} size={0.0018} color="#a5b4fc" speed={0.7} depth={2} />
      <StarLayer count={1500} radius={3.5} size={0.0012} color="#c4b5fd" speed={0.4} depth={1} />

      {/* 3D objects */}
      <FloatingOrb />
      <OrbitRing />
      <OrbitRing2 />
    </>
  )
}

/* ── Canvas Export ───────────────────────────────── */
export function HeroScene() {
  return (
    <div className="absolute inset-0 w-full h-full z-[-1]">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  )
}
