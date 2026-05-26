'use client'

import { useEffect, useRef } from 'react'
import { useStore } from '../../../store/useStore'

// Math helper constants
const PHI = (1 + Math.sqrt(5)) / 2
const DISTANCE = 2.2 // Camera distance for perspective projection

// 3D Icosahedron Vertices (Normalized)
const rawIcosaVertices = [
  [-1, PHI, 0], [1, PHI, 0], [-1, -PHI, 0], [1, -PHI, 0],
  [0, -1, PHI], [0, 1, PHI], [0, -1, -PHI], [0, 1, -PHI],
  [PHI, 0, -1], [PHI, 0, 1], [-PHI, 0, -1], [-PHI, 0, 1]
]
const icosaVertices = rawIcosaVertices.map(v => {
  const len = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2])
  return [v[0] / len, v[1] / len, v[2] / len]
})

// Generate edges for Icosahedron (30 edges)
const icosaEdges: [number, number][] = []
for (let i = 0; i < icosaVertices.length; i++) {
  for (let j = i + 1; j < icosaVertices.length; j++) {
    const dx = icosaVertices[i][0] - icosaVertices[j][0]
    const dy = icosaVertices[i][1] - icosaVertices[j][1]
    const dz = icosaVertices[i][2] - icosaVertices[j][2]
    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
    if (dist < 1.1) {
      icosaEdges.push([i, j])
    }
  }
}

// 3D Octahedron Vertices (Normalized)
const octaVertices = [
  [1, 0, 0], [-1, 0, 0],
  [0, 1, 0], [0, -1, 0],
  [0, 0, 1], [0, 0, -1]
]
const octaEdges: [number, number][] = [
  [0, 2], [0, 3], [0, 4], [0, 5],
  [1, 2], [1, 3], [1, 4], [1, 5],
  [2, 4], [2, 5], [3, 4], [3, 5]
]

interface Particle {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  vz: number
  size: number
  life: number
  color: string
}

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  // Read theme to coordinate colors
  const theme = useStore((s) => s.theme)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Media query to completely disable custom cursor on mobile/touch screens
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches
    if (isTouchDevice) {
      // Return early and leave default cursor
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // State variables updated on events outside the React state loop (guarantees zero lag)
    let mouseX = -200
    let mouseY = -200
    let prevMouseX = -200
    let prevMouseY = -200
    
    // Core dot (lerps fast for responsive feedback)
    let coreX = -200
    let coreY = -200
    
    // 3D geometry center (lerps with a tiny lag for fluid trailing weight)
    let geometryX = -200
    let geometryY = -200

    let isVisible = false
    let isClicked = false
    let isHovering = false
    let hoverType: 'button' | 'text' = 'button'

    // Snapping center and geometry bounds
    let hoverCenterX = 0
    let hoverCenterY = 0
    let hoverWidth = 0
    let hoverHeight = 0
    let currentRadius = 18
    let targetRadius = 18
    let geometryScaleMultiplier = 1.0

    // Animation rotation speeds
    let angleX = 0
    let angleY = 0
    let angleZ = 0
    let spinSpeedX = 0.008
    let spinSpeedY = 0.012
    let spinSpeedZ = 0.005

    // Click feedback scale bounce
    let clickScale = 1.0

    // Particle storage
    const particles: Particle[] = []

    // Adjust canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Event listeners
    const handleMouseMove = (e: MouseEvent) => {
      prevMouseX = mouseX
      prevMouseY = mouseY
      mouseX = e.clientX
      mouseY = e.clientY
      
      // First move initialization
      if (coreX === -200) {
        coreX = mouseX
        coreY = mouseY
        geometryX = mouseX
        geometryY = mouseY
      }
      
      isVisible = true
    }

    const handleMouseLeave = () => {
      isVisible = false
    }

    const handleMouseEnter = () => {
      isVisible = true
    }

    const spawnClickExplosion = (x: number, y: number, color1: string, color2: string) => {
      const pCount = 28
      for (let i = 0; i < pCount; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 4.5 + 2.0
        particles.push({
          x: x,
          y: y,
          z: (Math.random() - 0.5) * 1.5,
          vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 0.8,
          vy: Math.sin(angle) * speed + (Math.random() - 0.5) * 0.8,
          vz: (Math.random() - 0.5) * 0.25,
          size: Math.random() * 2.8 + 1.2,
          life: 1.0,
          color: Math.random() > 0.5 ? color1 : color2
        })
      }
    }

    const handleMouseDown = () => {
      isClicked = true
      clickScale = 0.35 // Rapid implosion
      
      // Determine colors based on active theme
      const isLight = document.documentElement.classList.contains('light')
      const baseColor1 = isLight ? 'rgba(99, 102, 241, 0.85)' : 'rgba(139, 92, 246, 0.85)' // Violet
      const baseColor2 = isLight ? 'rgba(13, 148, 136, 0.85)' : 'rgba(6, 182, 212, 0.85)'  // Cyan
      spawnClickExplosion(coreX, coreY, baseColor1, baseColor2)
    }

    const handleMouseUp = () => {
      isClicked = false
    }

    // Link and button hover checking
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target) return

      const interactive = target.closest('a, button, [role="button"], input, textarea, select, .interactive, .skill-chip, .btn, [data-hover]')
      if (interactive) {
        isHovering = true
        const rect = interactive.getBoundingClientRect()
        hoverCenterX = rect.left + rect.width / 2
        hoverCenterY = rect.top + rect.height / 2
        hoverWidth = rect.width
        hoverHeight = rect.height

        // Style distinction based on element type
        if (interactive.tagName === 'INPUT' || interactive.tagName === 'TEXTAREA') {
          hoverType = 'text'
          targetRadius = 10
        } else {
          hoverType = 'button'
          targetRadius = Math.max(30, Math.min(rect.width * 0.7, 50))
        }
      } else {
        isHovering = false
        targetRadius = 18
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('mouseenter', handleMouseEnter)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mouseover', handleMouseOver)

    // Math 3D Rotation helper
    const rotate3D = (v: number[], ax: number, ay: number, az: number) => {
      const [x, y, z] = v
      // X-axis rotation
      const cosX = Math.cos(ax), sinX = Math.sin(ax)
      const y1 = y * cosX - z * sinX
      const z1 = y * sinX + z * cosX
      
      // Y-axis rotation
      const cosY = Math.cos(ay), sinY = Math.sin(ay)
      const x2 = x * cosY + z1 * sinY
      const z2 = -x * sinY + z1 * cosY
      
      // Z-axis rotation
      const cosZ = Math.cos(az), sinZ = Math.sin(az)
      const x3 = x2 * cosZ - y1 * sinZ
      const y3 = x2 * sinZ + y1 * cosZ

      return { x: x3, y: y3, z: z2 }
    }

    // Animation Loop
    let animationFrameId: number
    let globalAlpha = 0

    const render = () => {
      // Fade in/out depending on mouse visibility inside window
      if (isVisible) {
        globalAlpha += (1.0 - globalAlpha) * 0.12
      } else {
        globalAlpha += (0.0 - globalAlpha) * 0.12
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (globalAlpha > 0.01) {
        const isLight = document.documentElement.classList.contains('light')
        
        // Colors corresponding to design system
        const color1 = isLight ? 'rgba(99, 102, 241, 0.85)' : 'rgba(139, 92, 246, 0.85)' // Violet
        const color2 = isLight ? 'rgba(13, 148, 136, 0.85)' : 'rgba(6, 182, 212, 0.85)'  // Cyan
        const glowColor = isLight ? 'rgba(99, 102, 241, 0.4)' : 'rgba(139, 92, 246, 0.5)'

        // Core tracking (Very fast, virtually zero-lag)
        coreX += (mouseX - coreX) * 0.42
        coreY += (mouseY - coreY) * 0.42

        // Magnetic Snapping logic for geometries
        if (isHovering && hoverType === 'button') {
          // Magnet attraction: Centers mostly on the button but drifts slightly with the actual mouse
          const pullX = hoverCenterX + (mouseX - hoverCenterX) * 0.22
          const pullY = hoverCenterY + (mouseY - hoverCenterY) * 0.22
          geometryX += (pullX - geometryX) * 0.14
          geometryY += (pullY - geometryY) * 0.14
          
          geometryScaleMultiplier += (1.4 - geometryScaleMultiplier) * 0.12
          spinSpeedX = 0.022
          spinSpeedY = 0.028
        } else if (isHovering && hoverType === 'text') {
          geometryX += (mouseX - geometryX) * 0.15
          geometryY += (mouseY - geometryY) * 0.15
          geometryScaleMultiplier += (0.6 - geometryScaleMultiplier) * 0.12
        } else {
          // Normal tracking
          geometryX += (mouseX - geometryX) * 0.13
          geometryY += (mouseY - geometryY) * 0.13
          geometryScaleMultiplier += (1.0 - geometryScaleMultiplier) * 0.12
          spinSpeedX = 0.008
          spinSpeedY = 0.012
        }

        // Return radius scale
        currentRadius += (targetRadius - currentRadius) * 0.15
        
        // Bounce back from click implosion
        clickScale += (1.0 - clickScale) * 0.12
        const finalRadius = currentRadius * geometryScaleMultiplier * clickScale

        // Mouse motion speed for particle trail & dynamic rotational speed
        const dx = mouseX - prevMouseX
        const dy = mouseY - prevMouseY
        const speed = Math.sqrt(dx * dx + dy * dy)
        
        // Tilt direction matrix based on velocity
        const tiltX = -dy * 0.008
        const tiltY = dx * 0.008

        // Update rotation values (Constant spin + mouse tilt momentum)
        angleX += spinSpeedX + tiltX
        angleY += spinSpeedY + tiltY
        angleZ += spinSpeedZ + (dx + dy) * 0.002

        // Save prev coordinates for speed detection
        prevMouseX = mouseX
        prevMouseY = mouseY

        // 1. Particle Trail Generation
        if (speed > 1.2 && particles.length < 50 && !isHovering) {
          const trailSpawnCount = Math.min(2, Math.floor(speed / 3) + 1)
          for (let k = 0; k < trailSpawnCount; k++) {
            const spread = 6
            particles.push({
              x: coreX + (Math.random() - 0.5) * spread,
              y: coreY + (Math.random() - 0.5) * spread,
              z: (Math.random() - 0.5) * 0.6,
              vx: (Math.random() - 0.5) * 0.6 - dx * 0.06,
              vy: (Math.random() - 0.5) * 0.6 - dy * 0.06,
              vz: (Math.random() - 0.5) * 0.01,
              size: Math.random() * 1.8 + 0.8,
              life: 1.0,
              color: Math.random() > 0.5 ? color1 : color2
            })
          }
        }

        // 2. Draw & Update Particle Trail
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i]
          p.x += p.vx
          p.y += p.vy
          p.z += p.vz
          p.vx *= 0.96 // Drag
          p.vy *= 0.96
          p.life -= 0.024 // Lifespan decay

          if (p.life <= 0) {
            particles.splice(i, 1)
            continue
          }

          const scaleFactor = DISTANCE / (DISTANCE + p.z)
          const px = p.x
          const py = p.y
          const size = p.size * scaleFactor * p.life

          ctx.save()
          ctx.globalAlpha = p.life * globalAlpha
          ctx.shadowBlur = 6
          ctx.shadowColor = p.color
          ctx.fillStyle = p.color
          ctx.beginPath()
          ctx.arc(px, py, size, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        }

        // 3. Draw Snapping Interactive Outer Glow/Boundary
        if (isHovering && hoverType === 'button') {
          ctx.save()
          ctx.globalAlpha = 0.25 * globalAlpha
          ctx.strokeStyle = color2
          ctx.lineWidth = 1.0
          ctx.shadowBlur = 10
          ctx.shadowColor = color2
          ctx.beginPath()
          // Orbiting border box around button center
          ctx.arc(geometryX, geometryY, finalRadius * 1.35, 0, Math.PI * 2)
          ctx.stroke()
          ctx.restore()
        }

        // 4. Draw Core Neon Center Dot
        ctx.save()
        ctx.globalAlpha = globalAlpha
        ctx.shadowBlur = 8
        ctx.shadowColor = color2
        ctx.fillStyle = color2
        ctx.beginPath()
        const dotSize = hoverType === 'text' ? 2 : (isClicked ? 3 : 5)
        ctx.arc(coreX, coreY, dotSize, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        // 5. Draw 3D Nested Gyroscope Geometries
        if (hoverType !== 'text') {
          ctx.save()
          ctx.globalAlpha = globalAlpha
          ctx.translate(geometryX, geometryY)

          // Outer Shell: 3D Icosahedron
          const rotatedIcosa = icosaVertices.map(v => rotate3D(v, angleX, angleY, angleZ))
          const projectedIcosa = rotatedIcosa.map(rv => {
            const scaleFactor = DISTANCE / (DISTANCE + rv.z)
            return {
              x: rv.x * scaleFactor * finalRadius,
              y: rv.y * scaleFactor * finalRadius,
              z: rv.z
            }
          })

          // Draw Icosahedron Edges (Sorted by depth for high-fidelity 3D layer render)
          const sortedIcosaEdges = icosaEdges
            .map(edge => {
              const avgZ = (projectedIcosa[edge[0]].z + projectedIcosa[edge[1]].z) / 2
              return { edge, avgZ }
            })
            .sort((a, b) => b.avgZ - a.avgZ) // Render back-to-front

          sortedIcosaEdges.forEach(({ edge, avgZ }) => {
            const p1 = projectedIcosa[edge[0]]
            const p2 = projectedIcosa[edge[1]]

            // High-fidelity depth fading (lines further away are dimmer and thinner)
            const normalizedDepth = (avgZ + 1) / 2 // 0.0 (closest) to 1.0 (furthest)
            const alpha = Math.max(0.12, 1.0 - normalizedDepth) * 0.45
            const lineWidth = Math.max(0.5, (1.0 - normalizedDepth) * 1.5 + 0.5)

            ctx.strokeStyle = color1
            ctx.lineWidth = lineWidth
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          })

          // Inner Shell: 3D Octahedron spinning in the opposite direction
          const innerAngleX = -angleX * 1.2
          const innerAngleY = -angleY * 1.2
          const innerAngleZ = -angleZ * 0.8
          const innerRadius = finalRadius * 0.52

          const rotatedOcta = octaVertices.map(v => rotate3D(v, innerAngleX, innerAngleY, innerAngleZ))
          const projectedOcta = rotatedOcta.map(rv => {
            const scaleFactor = DISTANCE / (DISTANCE + rv.z)
            return {
              x: rv.x * scaleFactor * innerRadius,
              y: rv.y * scaleFactor * innerRadius,
              z: rv.z
            }
          })

          // Draw Octahedron Edges (Depth sorted)
          const sortedOctaEdges = octaEdges
            .map(edge => {
              const avgZ = (projectedOcta[edge[0]].z + projectedOcta[edge[1]].z) / 2
              return { edge, avgZ }
            })
            .sort((a, b) => b.avgZ - a.avgZ)

          sortedOctaEdges.forEach(({ edge, avgZ }) => {
            const p1 = projectedOcta[edge[0]]
            const p2 = projectedOcta[edge[1]]

            const normalizedDepth = (avgZ + 1) / 2
            const alpha = Math.max(0.1, 1.0 - normalizedDepth) * 0.35
            const lineWidth = Math.max(0.4, (1.0 - normalizedDepth) * 1.0 + 0.3)

            ctx.strokeStyle = color2
            ctx.lineWidth = lineWidth
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          })

          ctx.restore()
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    // Initiate loop
    render()

    // Clean up
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mouseover', handleMouseOver)
      cancelAnimationFrame(animationFrameId)
    }
  }, [theme])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-screen h-screen pointer-events-none z-[99999]"
        style={{ mixBlendMode: 'screen' }}
      />
      {/* Hide the default system cursor on desktop mouse devices */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (pointer: fine) {
          body, a, button, input, textarea, select, [role="button"], .btn, .skill-chip {
            cursor: none !important;
          }
        }
      `}} />
    </>
  )
}
