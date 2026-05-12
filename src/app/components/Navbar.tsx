'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'About',    href: '#about'    },
  { label: 'Skills',   href: '#skills'   },
  { label: 'Projects', href: '#projects' },
  { label: 'Journey',  href: '#journey'  },
  { label: 'Contact',  href: '#contact'  },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  const scrollTo = (href: string) => {
    setOpen(false)
    setActive(href)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="scroll-progress"
        style={{ scaleX, width: '100%' }}
      />

      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          position: 'fixed',
          background: scrolled ? 'rgba(6,8,22,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(148,163,184,0.07)' : '1px solid transparent',
        }}
      >
        <div className="section-inner flex items-center justify-between py-4">
          {/* Logo */}
          <a
            href="#hero"
            onClick={e => { e.preventDefault(); scrollTo('#hero') }}
            className="flex items-center gap-2.5 group"
            style={{ textDecoration: 'none' }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
              style={{
                background: 'linear-gradient(135deg, var(--violet), var(--cyan))',
                boxShadow: '0 0 16px rgba(139,92,246,0.4)',
              }}
            >
              S
            </div>
            <span
              className="font-semibold text-sm tracking-tight"
              style={{ color: 'var(--text-2)' }}
            >
              subash
              <span style={{
                background: 'linear-gradient(135deg, var(--violet-light), var(--cyan-light))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                .dev
              </span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map(l => (
              <a
                key={l.label}
                href={l.href}
                onClick={e => { e.preventDefault(); scrollTo(l.href) }}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative"
                style={{
                  color: active === l.href ? 'var(--text)' : 'var(--text-3)',
                  background: active === l.href ? 'rgba(139,92,246,0.1)' : 'transparent',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.color = 'var(--text)'
                  ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.color = active === l.href ? 'var(--text)' : 'var(--text-3)'
                  ;(e.currentTarget as HTMLElement).style.background = active === l.href ? 'rgba(139,92,246,0.1)' : 'transparent'
                }}
              >
                {l.label}
              </a>
            ))}

            <a
              href="#contact"
              onClick={e => { e.preventDefault(); scrollTo('#contact') }}
              className="btn btn-primary ml-4 text-sm"
              style={{ padding: '0.6rem 1.25rem' }}
            >
              <span>Hire Me</span>
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(v => !v)}
            className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
            style={{
              background: open ? 'rgba(139,92,246,0.12)' : 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(148,163,184,0.1)',
              color: 'var(--text-2)',
              cursor: 'pointer',
            }}
            aria-label="Menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-x-3 z-40 rounded-2xl overflow-hidden"
            style={{
              top: '72px',
              background: 'rgba(9,12,26,0.97)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(148,163,184,0.10)',
              boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
            }}
          >
            <div className="p-4 flex flex-col gap-1">
              {links.map((l, i) => (
                <motion.a
                  key={l.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  href={l.href}
                  onClick={e => { e.preventDefault(); scrollTo(l.href) }}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium"
                  style={{
                    color: 'var(--text-2)',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(139,92,246,0.1)'
                    ;(e.currentTarget as HTMLElement).style.color = 'var(--violet-light)'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = 'transparent'
                    ;(e.currentTarget as HTMLElement).style.color = 'var(--text-2)'
                  }}
                >
                  <span
                    className="w-1 h-4 rounded-full"
                    style={{ background: 'linear-gradient(180deg, var(--violet), var(--cyan))' }}
                  />
                  {l.label}
                </motion.a>
              ))}

              <div className="mt-2 pt-3" style={{ borderTop: '1px solid rgba(148,163,184,0.07)' }}>
                <a
                  href="#contact"
                  onClick={e => { e.preventDefault(); scrollTo('#contact') }}
                  className="btn btn-primary w-full justify-center"
                >
                  <span>Hire Me</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}