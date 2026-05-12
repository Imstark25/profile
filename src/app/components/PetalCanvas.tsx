'use client'
import { useEffect, useRef } from 'react'

/* ── Petal shape paths (SVG d-attribute) ─────────── */
const PETAL_COLORS = [
  'rgba(249,168,201,0.72)',  // soft pink
  'rgba(232,84,122,0.55)',   // rose
  'rgba(252,205,225,0.80)',  // petal light
  'rgba(192,132,180,0.60)',  // lavender
  'rgba(255,182,193,0.70)',  // light pink
  'rgba(240,124,160,0.55)',  // mid pink
]

interface Petal {
  x: number        // start x (%)
  size: number     // px
  duration: number // seconds
  delay: number    // seconds
  drift: number    // px (x drift total)
  spin: number     // degrees
  color: string
  el: HTMLDivElement
}

const PETAL_COUNT = 22

export default function PetalCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const petalsRef    = useRef<Petal[]>([])
  const mounted      = useRef(false)

  useEffect(() => {
    if (mounted.current) return
    mounted.current = true

    const container = containerRef.current
    if (!container) return

    const createPetal = (i: number): Petal => {
      const el = document.createElement('div')
      el.className = 'petal'

      const x        = Math.random() * 100
      const size     = 10 + Math.random() * 16
      const duration = 7 + Math.random() * 10
      const delay    = (i / PETAL_COUNT) * 14 + Math.random() * 4
      const drift    = (Math.random() - 0.5) * 180
      const spin     = 300 + Math.random() * 480
      const color    = PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)]

      el.style.setProperty('--x',        `${x}%`)
      el.style.setProperty('--size',     `${size}px`)
      el.style.setProperty('--duration', `${duration}s`)
      el.style.setProperty('--delay',    `${delay}s`)
      el.style.setProperty('--drift',    `${drift}px`)
      el.style.setProperty('--spin',     `${spin}deg`)
      el.style.setProperty('--color',    color)

      container.appendChild(el)
      return { x, size, duration, delay, drift, spin, color, el }
    }

    for (let i = 0; i < PETAL_COUNT; i++) {
      petalsRef.current.push(createPetal(i))
    }

    return () => {
      petalsRef.current.forEach(p => p.el.remove())
      petalsRef.current = []
      mounted.current = false
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="petal-canvas"
      aria-hidden="true"
    />
  )
}
