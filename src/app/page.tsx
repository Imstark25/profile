'use client'
import Navbar      from './components/Navbar'
import Hero        from './components/sections/Hero'
import About       from './components/sections/About'
import Skills      from './components/sections/Skills'
import Projects    from './components/sections/Projects'
import Journey     from './components/sections/Journey'
import GitHubStats from './components/sections/GitHubStats'
import Contact     from './components/sections/Contact'
import { personal } from '../lib/data'
import { Mail, ArrowUp } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../lib/icons'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

/* ── Back to top ─── */
function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!show) return null
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer"
      style={{
        background: 'linear-gradient(135deg, var(--violet), var(--violet-dark))',
        boxShadow: '0 4px 20px rgba(139,92,246,0.4)',
        border: 'none',
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Back to top"
    >
      <ArrowUp size={16} color="#fff" />
    </motion.button>
  )
}

/* ── Section divider ─── */
function Divider() {
  return (
    <div className="section-inner">
      <div style={{
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.2), rgba(6,182,212,0.12), transparent)',
      }} />
    </div>
  )
}

export default function Home() {
  return (
    <main style={{ background: 'var(--bg)', color: 'var(--text)', position: 'relative' }}>
      <Navbar />
      <Hero />
      <Divider />
      <About />
      <Divider />
      <Skills />
      <Divider />
      <Projects />
      <Divider />
      <Journey />
      <Divider />
      <GitHubStats />
      <Divider />
      <Contact />

      {/* ── Footer ── */}
      <footer
        className="py-10 mt-2"
        style={{ borderTop: '1px solid rgba(148,163,184,0.06)' }}
      >
        <div className="section-inner">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
            {/* Brand */}
            <div className="flex items-center gap-2.5">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                style={{
                  background: 'linear-gradient(135deg, var(--violet), var(--cyan))',
                  boxShadow: '0 0 12px rgba(139,92,246,0.35)',
                }}
              >
                S
              </div>
              <div>
                <div className="text-sm font-semibold" style={{ color: 'var(--text-2)', letterSpacing: '-0.01em' }}>
                  {personal.name}
                </div>
                <div className="text-xs" style={{ color: 'var(--text-4)' }}>
                  MCA · DevOps · Cloud · AI
                </div>
              </div>
            </div>

            {/* Center copy */}
            <p className="text-xs text-center" style={{ color: 'var(--text-4)' }}>
              {personal.location} · © {new Date().getFullYear()} · Crafted with precision
            </p>

            {/* Social */}
            <div className="flex items-center gap-2">
              {[
                { icon: GithubIcon,   href: personal.github,           label: 'GitHub'   },
                { icon: LinkedinIcon, href: personal.linkedin,          label: 'LinkedIn' },
                { icon: Mail,         href: `mailto:${personal.email}`, label: 'Email'    },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(148,163,184,0.08)',
                    color: 'var(--text-4)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(139,92,246,0.12)'
                    ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(139,92,246,0.25)'
                    ;(e.currentTarget as HTMLElement).style.color = 'var(--violet-light)'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'
                    ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(148,163,184,0.08)'
                    ;(e.currentTarget as HTMLElement).style.color = 'var(--text-4)'
                  }}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-5 flex items-center justify-center gap-2" style={{ borderTop: '1px solid rgba(148,163,184,0.05)' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--emerald)', boxShadow: '0 0 8px rgba(16,185,129,0.8)' }} />
            <span className="text-xs font-medium" style={{ color: '#10b981' }}>Open to work · Available immediately</span>
          </div>
        </div>
      </footer>

      <BackToTop />
    </main>
  )
}
