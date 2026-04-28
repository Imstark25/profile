'use client'
import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useStore } from '../../../store/useStore'

export default function CustomCursor() {
  const variant    = useStore((s) => s.cursorVariant)
  const setCursor  = useStore((s) => s.setCursorPos)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const springConfig = { stiffness: 500, damping: 38, mass: 0.5 }
  const dotX   = useSpring(mouseX, { stiffness: 800, damping: 50 })
  const dotY   = useSpring(mouseY, { stiffness: 800, damping: 50 })
  const ringX  = useSpring(mouseX, springConfig)
  const ringY  = useSpring(mouseY, springConfig)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setCursor({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [mouseX, mouseY, setCursor])

  const sizes = {
    default: { ring: 32, dot: 6, borderColor: 'rgba(99,179,246,0.8)', bg: 'rgba(99,179,246,0.08)' },
    text:    { ring: 56, dot: 4, borderColor: 'rgba(139,92,246,0.8)', bg: 'rgba(139,92,246,0.08)' },
    button:  { ring: 48, dot: 0, borderColor: 'rgba(59,130,246,0.9)', bg: 'rgba(59,130,246,0.15)' },
    hidden:  { ring: 0,  dot: 0, borderColor: 'transparent',          bg: 'transparent' },
  }
  const s = sizes[variant]

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-difference"
        style={{
          x: ringX, y: ringY,
          translateX: `-50%`, translateY: `-50%`,
          width: s.ring, height: s.ring,
          border: `1.5px solid ${s.borderColor}`,
          background: s.bg,
          backdropFilter: 'blur(2px)',
        }}
        animate={{ width: s.ring, height: s.ring, opacity: s.ring === 0 ? 0 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: dotX, y: dotY,
          translateX: '-50%', translateY: '-50%',
          background: 'rgba(99,179,246,0.95)',
        }}
        animate={{ width: s.dot, height: s.dot, opacity: s.dot === 0 ? 0 : 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 40 }}
      />
    </>
  )
}
