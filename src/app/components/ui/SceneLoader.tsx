'use client'
import { motion } from 'framer-motion'

export default function SceneLoader() {
  return (
    <div className="absolute inset-0 bg-[#020408] flex flex-col items-center justify-center z-0 select-none">
      {/* Pulsing black hole placeholder */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        className="relative"
      >
        <div className="w-16 h-16 rounded-full bg-black border-2 border-orange-400/40 shadow-[0_0_40px_rgba(255,165,0,0.3)]" />
        <div className="absolute inset-[-6px] rounded-full border border-blue-500/20 animate-spin" style={{ animationDuration: '4s' }} />
        <div className="absolute inset-[-14px] rounded-full border border-purple-500/10 animate-spin" style={{ animationDuration: '8s', animationDirection: 'reverse' }} />
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        className="mt-6 text-xs text-gray-600 tracking-[0.25em] uppercase font-medium"
      >
        Initializing space-time…
      </motion.p>
    </div>
  )
}
