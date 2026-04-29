'use client'
import { useRef, useMemo, useCallback } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

interface Layer {
  count:  number
  radius: number
  size:   number
  speed:  number      // gravity pull speed
  color:  [number, number, number]
  depth:  number      // parallax factor
}

const LAYERS: Layer[] = [
  { count: 2400, radius: 18, size: 0.022, speed: 0.006, color: [0.55, 0.70, 1.00], depth: 0.8 },
  { count: 1400, radius: 11, size: 0.035, speed: 0.014, color: [0.80, 0.60, 1.00], depth: 1.8 },
  { count:  800, radius:  6, size: 0.055, speed: 0.024, color: [1.00, 0.90, 0.75], depth: 3.0 },
]

/* ── Single Layer ─────────────────────────────────── */
function ParticleLayer({
  layer,
  mouse,
  warpStrength,
}: {
  layer:        Layer
  mouse:        React.MutableRefObject<THREE.Vector2>
  warpStrength: React.MutableRefObject<number>
}) {
  const ref     = useRef<THREE.Points>(null)
  const clock   = useRef(Math.random() * 100)

  /* Initial positions on a sphere shell */
  const { positions, colors, velocities } = useMemo(() => {
    const pos  = new Float32Array(layer.count * 3)
    const col  = new Float32Array(layer.count * 3)
    const vel  = new Float32Array(layer.count * 3) // radial dir to center

    for (let i = 0; i < layer.count; i++) {
      // Distribute on sphere
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      const r     = layer.radius * (0.6 + Math.random() * 0.4)

      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)

      // Store direction toward center (normalized * speed)
      const len = Math.sqrt(pos[i*3]**2 + pos[i*3+1]**2 + pos[i*3+2]**2)
      vel[i * 3]     = -(pos[i * 3]     / len) * layer.speed
      vel[i * 3 + 1] = -(pos[i * 3 + 1] / len) * layer.speed
      vel[i * 3 + 2] = -(pos[i * 3 + 2] / len) * layer.speed

      // Color with brightness variation
      const brightness = 0.6 + Math.random() * 0.4
      col[i * 3]     = layer.color[0] * brightness
      col[i * 3 + 1] = layer.color[1] * brightness
      col[i * 3 + 2] = layer.color[2] * brightness
    }
    return { positions: pos, colors: col, velocities: vel }
  }, [layer])

  const posRef = useRef(positions.slice())

  useFrame((_, delta) => {
    if (!ref.current) return
    const pos = ref.current.geometry.attributes.position
    const warp = warpStrength.current

    for (let i = 0; i < layer.count; i++) {
      const ix = i * 3, iy = ix + 1, iz = ix + 2

      posRef.current[ix] += velocities[ix] * delta * 60
      posRef.current[iy] += velocities[iy] * delta * 60
      posRef.current[iz] += velocities[iz] * delta * 60

      // Mouse warp — near particles distort toward cursor
      if (warp > 0) {
        posRef.current[ix] += mouse.current.x * 0.002 * warp * layer.depth
        posRef.current[iy] += mouse.current.y * 0.002 * warp * layer.depth
      }

      const dist = Math.sqrt(
        posRef.current[ix] ** 2 +
        posRef.current[iy] ** 2 +
        posRef.current[iz] ** 2
      )

      // Respawn when eaten by black hole
      if (dist < 0.8) {
        const theta = Math.random() * Math.PI * 2
        const phi   = Math.acos(2 * Math.random() - 1)
        const r     = layer.radius
        posRef.current[ix] = r * Math.sin(phi) * Math.cos(theta)
        posRef.current[iy] = r * Math.sin(phi) * Math.sin(theta)
        posRef.current[iz] = r * Math.cos(phi)
      }

      pos.array[ix] = posRef.current[ix]
      pos.array[iy] = posRef.current[iy]
      pos.array[iz] = posRef.current[iz]
    }

    pos.needsUpdate = true

    // Slow parallax rotation
    clock.current += delta * 0.04 * layer.depth
    ref.current.rotation.y = clock.current
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors,    3]} />
      </bufferGeometry>
      <pointsMaterial
        size={layer.size}
        vertexColors
        sizeAttenuation
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/* ── ParticleField ────────────────────────────────── */
export function ParticleField({
  mouse,
  warpStrength,
}: {
  mouse:        React.MutableRefObject<THREE.Vector2>
  warpStrength: React.MutableRefObject<number>
}) {
  return (
    <>
      {LAYERS.map((layer, i) => (
        <ParticleLayer key={i} layer={layer} mouse={mouse} warpStrength={warpStrength} />
      ))}
    </>
  )
}
