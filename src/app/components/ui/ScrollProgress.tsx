'use client'
import { motion, useSpring } from 'framer-motion'
import { useStore } from '../../../store/useStore'

export default function ScrollProgress() {
  const raw = useStore((s) => s.scrollProgress)
  const smoothed = useSpring(raw, { stiffness: 120, damping: 25 })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left pointer-events-none"
      style={{
        scaleX: smoothed,
        background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4)',
        boxShadow: '0 0 10px rgba(59,130,246,0.8), 0 0 20px rgba(139,92,246,0.4)',
      }}
    />
  )
}
