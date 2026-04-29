'use client'
import { useRef, useMemo } from 'react'
import { useFrame, extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'

/* ───────────────────────────────────────────────────
   ACCRETION DISK — glowing rotating torus shader
─────────────────────────────────────────────────── */
const AccretionMaterial = shaderMaterial(
  { time: 0, innerRadius: 1.3, outerRadius: 3.0 },
  /* vertex */ `
    varying vec2 vUv;
    varying vec3 vPos;
    void main() {
      vUv  = uv;
      vPos = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  /* fragment */ `
    uniform float time;
    uniform float innerRadius;
    uniform float outerRadius;
    varying vec2 vUv;
    varying vec3 vPos;

    void main() {
      float radius = length(vPos.xz);
      float t = (radius - innerRadius) / (outerRadius - innerRadius);
      t = clamp(t, 0.0, 1.0);

      /* Radial brightness: hottest near center */
      float brightness = 1.0 - t;
      brightness = pow(brightness, 1.8);

      /* Animated turbulence */
      float angle = atan(vPos.z, vPos.x);
      float turb = sin(angle * 8.0 - time * 2.5) * 0.12 + 1.0;
      turb += sin(angle * 3.0 + time * 1.2) * 0.08;
      brightness *= turb;

      /* Color gradient: white-orange-yellow outer to blue inner */
      vec3 hot   = vec3(1.0, 0.85, 0.45);   /* outer warm */
      vec3 inner = vec3(0.6, 0.75, 1.0);    /* inner cool blue */
      vec3 color = mix(inner, hot, t * 0.7);
      color *= brightness * 3.5;

      /* Fade edges hard */
      float edge = smoothstep(0.0, 0.08, t) * smoothstep(1.0, 0.92, t);
      float alpha = edge * brightness * 1.4;

      gl_FragColor = vec4(color, alpha);
    }
  `
)
extend({ AccretionMaterial })

/* ───────────────────────────────────────────────────
   LENSING SPHERE — warp distant stars near horizon
─────────────────────────────────────────────────── */
const LensingMaterial = shaderMaterial(
  { time: 0 },
  /* vertex */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  /* fragment */ `
    uniform float time;
    varying vec2 vUv;

    float hash(vec2 p) {
      p = fract(p * vec2(234.34, 435.345));
      p += dot(p, p + 34.23);
      return fract(p.x * p.y);
    }

    float star(vec2 uv, float threshold) {
      return step(threshold, hash(floor(uv * 180.0)));
    }

    void main() {
      vec2 center = vec2(0.5);
      vec2 dir    = vUv - center;
      float dist  = length(dir);

      /* Gravitational warp: bend stars around horizon */
      float warp  = 0.18 / max(dist - 0.15, 0.01);
      warp        = clamp(warp, 0.0, 1.4);
      vec2 warped = vUv + normalize(dir) * warp * 0.04 * (1.0 - dist);

      /* Star field with lensing */
      float s = star(warped, 0.993)
              + star(warped * 1.7, 0.996) * 0.6
              + star(warped * 2.3, 0.997) * 0.4;

      /* Fade stars toward center (event horizon covers them) */
      float fade = smoothstep(0.10, 0.35, dist);
      s *= fade;

      /* Subtle tint: gravitationally blue-shifted */
      vec3 color = mix(vec3(0.6, 0.8, 1.0), vec3(1.0), 0.6) * s;

      /* Circular vignette */
      float vig = 1.0 - smoothstep(0.3, 0.55, dist);
      color *= vig;

      gl_FragColor = vec4(color, s * 0.9);
    }
  `
)
extend({ LensingMaterial })

/* ───────────────────────────────────────────────────
   BlackHole Component
─────────────────────────────────────────────────── */
export function BlackHole({ scale = 1 }: { scale?: number }) {
  const diskRef    = useRef<any>(null)
  const lensingRef = useRef<any>(null)
  const glowRef    = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (diskRef.current?.material)    diskRef.current.material.time    = t
    if (lensingRef.current?.material) lensingRef.current.material.time = t
    // Disk spins
    if (diskRef.current) diskRef.current.rotation.z = t * 0.18
    // Glow pulse
    if (glowRef.current) {
      const s = 1 + Math.sin(t * 1.2) * 0.04
      glowRef.current.scale.setScalar(s)
    }
  })

  return (
    <group scale={scale}>
      {/* ── Event horizon: pure black sphere ── */}
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* ── Rim glow sprite ── */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.04, 32, 32]} />
        <meshBasicMaterial
          color="#1a3a8f"
          transparent
          opacity={0.18}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* ── Lensing plane (background star warp) ── */}
      <mesh ref={lensingRef} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[16, 16, 1, 1]} />
        {/* @ts-ignore */}
        <lensingMaterial
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* ── Accretion disk ── */}
      <mesh ref={diskRef} rotation-x={Math.PI / 2 + 0.18}>
        <torusGeometry args={[2.1, 0.85, 3, 200]} />
        {/* @ts-ignore */}
        <accretionMaterial
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* ── Hot inner ring (extra glow) ── */}
      <mesh rotation-x={Math.PI / 2 + 0.08}>
        <torusGeometry args={[1.35, 0.06, 3, 128]} />
        <meshBasicMaterial
          color="#ffd060"
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* ── Point lights for scene illumination ── */}
      <pointLight color="#ff9944" intensity={6} distance={12} decay={2} />
      <pointLight color="#4466ff" intensity={3} distance={8}  decay={2} position={[0, 1, 0]} />
    </group>
  )
}
