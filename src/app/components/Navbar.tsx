'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ui/ThemeToggle'
import { useStore } from '../../store/useStore'

const navItems = [
  { name: 'About',      href: '#about' },
  { name: 'Projects',   href: '#projects' },
  { name: 'Skills',     href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Now',        href: '#now' },
  { name: 'Contact',    href: '#contact' },
]

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const activeSection = useStore((s) => s.activeSection)
  const setCursor     = useStore((s) => s.setCursorVariant)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) (window as any).__lenis?.scrollTo(el, { offset: -80 })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'py-3 glass border-b border-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('#home') }} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-black text-white shadow-lg shadow-blue-500/30">S</div>
            <span className="text-lg font-extrabold tracking-tight text-white">STARK<span className="text-blue-500">.</span></span>
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, i) => {
              const sectionId = item.href.replace('#', '')
              const isActive  = activeSection === sectionId
              return (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.href) }}
                  onMouseEnter={() => setCursor('button')}
                  onMouseLeave={() => setCursor('default')}
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive ? 'text-white bg-white/[0.07]' : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.div layoutId="nav-indicator"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full" />
                  )}
                </motion.a>
              )
            })}
            <div className="ml-2 flex items-center gap-2">
              <ThemeToggle />
              <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('#contact') }}
                onMouseEnter={() => setCursor('button')} onMouseLeave={() => setCursor('default')}
                className="btn-primary py-2 px-5 text-sm">
                Hire Me
              </a>
            </div>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button onClick={() => setMobileOpen(v => !v)}
              className="w-9 h-9 rounded-xl glass flex items-center justify-center text-gray-300 hover:text-white transition-colors">
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}
            className="fixed top-[60px] left-0 right-0 z-40 glass border-b border-white/[0.06] overflow-hidden"
          >
            <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
              {navItems.map((item, i) => (
                <motion.a key={item.name} href={item.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.href) }}
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="py-3 px-4 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/[0.05] transition-all">
                  {item.name}
                </motion.a>
              ))}
              <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('#contact') }}
                className="btn-primary mt-2 justify-center text-sm py-3">Hire Me</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}