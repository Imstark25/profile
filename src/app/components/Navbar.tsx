'use client'
import { useState, useEffect } from 'react'
import { personal } from '../../lib/data'

const navLinks = [
  { name: 'Stack',   href: '#skills' },
  { name: 'Work',    href: '#experience' },
  { name: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

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

  const scrollTo = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <nav
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'py-3 border-b shadow-sm'
            : 'py-5'
        }`}
        style={{
          background: scrolled ? 'rgba(250,248,245,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderColor: scrolled ? 'var(--border)' : 'transparent',
        }}
      >
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollTo('#hero') }}
            className="flex items-center gap-2 group"
          >
            <span
              className="text-lg font-semibold tracking-tight"
              style={{ fontFamily: 'var(--font-serif)', color: 'var(--text)' }}
            >
              {personal.name.split(' ')[0]}
              <span style={{ color: 'var(--green)' }}>.</span>
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => { e.preventDefault(); scrollTo(item.href) }}
                className="nav-link px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'var(--green)'
                  e.currentTarget.style.background = 'var(--green-bg)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'var(--text-muted)'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                {item.name}
              </a>
            ))}

            {/* Open to Work badge */}
            <div
              className="ml-4 flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold"
              style={{
                background: 'var(--green-bg)',
                color: 'var(--green)',
                border: '1px solid rgba(45,80,22,0.18)',
              }}
            >
              <span
                className="w-2 h-2 rounded-full inline-block animate-pulse-dot"
                style={{ background: 'var(--green)' }}
              />
              Open to work
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
            style={{ border: '1px solid var(--border)', color: 'var(--text-muted)' }}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="fixed top-[60px] left-0 right-0 z-40 border-b shadow-md"
          style={{
            background: 'rgba(250,248,245,0.97)',
            backdropFilter: 'blur(12px)',
            borderColor: 'var(--border)',
          }}
        >
          <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col gap-1">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => { e.preventDefault(); scrollTo(item.href) }}
                className="py-3 px-4 rounded-lg text-sm font-medium transition-all"
                style={{ color: 'var(--text-muted)' }}
              >
                {item.name}
              </a>
            ))}
            <div
              className="mt-2 flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold w-fit"
              style={{
                background: 'var(--green-bg)',
                color: 'var(--green)',
                border: '1px solid rgba(45,80,22,0.18)',
              }}
            >
              <span className="w-2 h-2 rounded-full inline-block animate-pulse-dot" style={{ background: 'var(--green)' }} />
              Open to work
            </div>
          </div>
        </div>
      )}
    </>
  )
}