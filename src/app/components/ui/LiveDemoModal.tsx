'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink } from 'lucide-react'
import { useStore } from '../../../store/useStore'
import { useEffect } from 'react'

export default function LiveDemoModal() {
  const { demoModal, closeModal } = useStore()

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [closeModal])

  return (
    <AnimatePresence>
      {demoModal.open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeModal}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-4 md:inset-10 z-[101] flex flex-col rounded-2xl overflow-hidden glass-card border border-white/10"
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1,   y: 0  }}
            exit={{    opacity: 0, scale: 0.88, y: 20 }}
            transition={{ type: 'spring', stiffness: 200, damping: 24 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/08">
              <div>
                <div className="section-tag w-fit mb-1">Live Preview</div>
                <h3 className="text-lg font-bold text-white">{demoModal.project}</h3>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={demoModal.link} target="_blank" rel="noopener noreferrer"
                  className="btn-ghost py-2 px-4 text-xs flex items-center gap-1.5"
                >
                  <ExternalLink size={13} /> Open in new tab
                </a>
                <button
                  onClick={closeModal}
                  className="w-9 h-9 rounded-xl glass border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* iFrame or placeholder */}
            <div className="flex-1 relative bg-[#060914]">
              {demoModal.link && demoModal.link !== '#' ? (
                <iframe
                  src={demoModal.link}
                  className="w-full h-full border-0"
                  title={demoModal.project}
                  sandbox="allow-scripts allow-same-origin allow-forms"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <div className="text-5xl">🚧</div>
                  <p className="text-gray-400 text-sm">Live demo coming soon</p>
                  <a href="https://github.com/Imstark25" target="_blank" rel="noopener noreferrer"
                    className="btn-primary text-sm py-2 px-5">
                    View Source Code
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
