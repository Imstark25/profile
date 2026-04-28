'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useStore } from '../../../store/useStore'

export default function ThemeToggle() {
  const theme  = useStore((s) => s.theme)
  const toggle = useStore((s) => s.toggleTheme)

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      className="relative w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center overflow-hidden"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait">
        {theme === 'dark' ? (
          <motion.div
            key="moon"
            initial={{ rotate: -90, opacity: 0, y: -8 }}
            animate={{ rotate: 0,  opacity: 1, y: 0  }}
            exit={{ rotate: 90,  opacity: 0, y:  8  }}
            transition={{ duration: 0.25 }}
          >
            <Moon size={16} className="text-blue-400" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 90,  opacity: 0, y: 8  }}
            animate={{ rotate: 0,   opacity: 1, y: 0  }}
            exit={{ rotate: -90, opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <Sun size={16} className="text-yellow-400" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ripple */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        animate={{ background: theme === 'dark'
          ? 'rgba(59,130,246,0)'
          : 'rgba(251,191,36,0)' }}
        whileTap={{ background: theme === 'dark'
          ? 'rgba(59,130,246,0.2)'
          : 'rgba(251,191,36,0.2)' }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  )
}
