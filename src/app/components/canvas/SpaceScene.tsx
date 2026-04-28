'use client'
import { useRef, useState, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Preload }                     from '@react-three/drei'
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing'
import { BlendFunction }               from 'postprocessing'
import * as THREE                      from 'three'
import { BlackHole }                   from './BlackHole'
import { ParticleField }               from './ParticleField'

/* ── Camera Rig — scroll zoom + mouse parallax ────── */
function CameraRig({
  mouse,
  scrollY,
  timeDilation,
}: {
  mouse:        React.MutableRefObject<THREE.Vector2>
  scrollY:      React.MutableRefObject<number>
  timeDilation: React.MutableRefObject<number>
}) {
  const { camera } = useThree()
  const targetPos  = useRef(new THREE.Vector3(0, 0, 7))

  useFrame((_, delta) => {
    const dt   = delta * timeDilation.current
    const slow = dt * 1.2

    // Scroll → zoom toward black hole
    const scrollFactor = Math.min(scrollY.current / 1200, 1)
    targetPos.current.z = 7 - scrollFactor * 3.5

    // Mouse parallax
    targetPos.current.x = mouse.current.x * 1.2
    targetPos.current.y = mouse.current.y * 0.6

    // Slow floating drift
    const t = performance.now() * 0.0002
    targetPos.current.y += Math.sin(t) * 0.15

    // Smooth interpolation
    camera.position.lerp(targetPos.current, slow * 0.8)
    camera.lookAt(0, 0, 0)
  })

  return null
}

/* ── Ripple on Click ─────────────────────────────── */
function ClickRipple({
  triggered,
  onDone,
}: {
  triggered: boolean
  onDone:    () => void
}) {
  const ref = useRef<THREE.Mesh>(null)
  const age = useRef(0)

  useFrame((_, delta) => {
    if (!triggered || !ref.current) return
    age.current += delta * 2.5
    const scale = 1 + age.current * 3
    ref.current.scale.setScalar(scale)
    ;(ref.current.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.6 - age.current * 0.4)
    if (age.current > 2) { age.current = 0; onDone() }
  })

  if (!triggered) return null

  return (
    <mesh ref={ref}>
      <ringGeometry args={[1.0, 1.08, 80]} />
      <meshBasicMaterial
        color="#6699ff"
        transparent
        opacity={0.6}
        side={THREE.DoubleSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

/* ── Scene ───────────────────────────────────────── */
function Scene({
  mouse,
  scrollY,
  timeDilation,
  warpStrength,
  ripple,
  onRippleDone,
  isMobile,
}: {
  mouse:        React.MutableRefObject<THREE.Vector2>
  scrollY:      React.MutableRefObject<number>
  timeDilation: React.MutableRefObject<number>
  warpStrength: React.MutableRefObject<number>
  ripple:       boolean
  onRippleDone: () => void
  isMobile:     boolean
}) {
  return (
    <>
      <CameraRig mouse={mouse} scrollY={scrollY} timeDilation={timeDilation} />
      <BlackHole scale={1} />
      <ParticleField mouse={mouse} warpStrength={warpStrength} />
      <ClickRipple triggered={ripple} onDone={onRippleDone} />
      <ambientLight intensity={0.05} />

      {!isMobile && (
        <EffectComposer>
          <Bloom
            intensity={1.6}
            luminanceThreshold={0.12}
            luminanceSmoothing={0.7}
            mipmapBlur
          />
          <Noise
            premultiply
            blendFunction={BlendFunction.SOFT_LIGHT}
            opacity={0.08}
          />
          <Vignette
            offset={0.35}
            darkness={0.9}
            blendFunction={BlendFunction.NORMAL}
          />
        </EffectComposer>
      )}
    </>
  )
}

/* ── SpaceScene Canvas ───────────────────────────── */
export function SpaceScene() {
  const mouse        = useRef(new THREE.Vector2())
  const scrollY      = useRef(0)
  const timeDilation = useRef(1.0)
  const warpStrength = useRef(0)
  const [ripple, setRipple] = useState(false)

  const isMobile = typeof navigator !== 'undefined' &&
    /Mobi|Android/i.test(navigator.userAgent)

  // Mouse move → update ref
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const x = (e.clientX / window.innerWidth)  * 2 - 1
    const y = -(e.clientY / window.innerHeight) * 2 + 1
    mouse.current.set(x, y)
    warpStrength.current = Math.min(warpStrength.current + 0.05, 1)
  }, [])

  const onMouseLeave = useCallback(() => {
    warpStrength.current = 0
  }, [])

  // Scroll
  const onScroll = useCallback(() => {
    scrollY.current = window.scrollY
  }, [])

  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })
  }

  // Click → ripple + time dilation
  const onClick = useCallback(() => {
    setRipple(true)
    timeDilation.current = 0.15
    setTimeout(() => { timeDilation.current = 1.0 }, 900)
  }, [])

  return (
    <div
      className="absolute inset-0 w-full h-full z-[-1]"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 55 }}
        dpr={isMobile ? [1, 1] : [1, 1.5]}
        gl={{
          antialias:        false,
          alpha:            true,
          powerPreference:  'high-performance',
          toneMapping:      THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.4,
        }}
      >
        <Scene
          mouse={mouse}
          scrollY={scrollY}
          timeDilation={timeDilation}
          warpStrength={warpStrength}
          ripple={ripple}
          onRippleDone={() => setRipple(false)}
          isMobile={isMobile}
        />
        <Preload all />
      </Canvas>
    </div>
  )
}
