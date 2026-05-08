'use client'
import { useState, useEffect } from 'react'
import { personal } from '../../lib/data'

const navLinks = [
  { name: 'Stack',      href: '#skills' },
  { name: 'Work',       href: '#experience' },
  { name: 'Contact',    href: '#contact' },
]

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const [activeLink,  setActiveLink]  = useState('')

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

  /* Close mobile menu on outside tap */
  useEffect(() => {
    if (!mobileOpen) return
    const handler = (e: MouseEvent) => {
      const nav = document.getElementById('mobile-menu')
      const btn = document.getElementById('menu-btn')
      if (nav && !nav.contains(e.target as Node) && btn && !btn.contains(e.target as Node)) {
        setMobileOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [mobileOpen])

  const scrollTo = (href: string) => {
    setMobileOpen(false)
    setActiveLink(href)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <nav
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-2' : 'py-4'
        }`}
        style={{
          background: scrolled
            ? 'rgba(13,15,20,0.88)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(99,102,241,0.12)' : '1px solid transparent',
          boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none',
        }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between">

          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollTo('#hero') }}
            className="flex items-center gap-2 group"
            style={{ textDecoration: 'none' }}
          >
            {/* Glowing dot */}
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, var(--primary), var(--cyan))',
                boxShadow: '0 0 8px var(--primary)',
              }}
            />
            <span
              className="text-base sm:text-lg font-semibold tracking-tight"
              style={{ fontFamily: 'var(--font-serif)', color: 'var(--text)' }}
            >
              {personal.name.split(' ')[0]}
              <span
                style={{
                  background: 'linear-gradient(135deg, var(--primary-light), var(--cyan))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >.</span>
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((item, i) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => { e.preventDefault(); scrollTo(item.href) }}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                style={{
                  color: activeLink === item.href ? 'var(--primary-light)' : 'var(--text-muted)',
                  background: activeLink === item.href ? 'var(--primary-bg)' : 'transparent',
                  animationDelay: `${i * 60}ms`,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'var(--primary-light)'
                  e.currentTarget.style.background = 'var(--primary-bg)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = activeLink === item.href ? 'var(--primary-light)' : 'var(--text-muted)'
                  e.currentTarget.style.background = activeLink === item.href ? 'var(--primary-bg)' : 'transparent'
                }}
              >
                {item.name}
              </a>
            ))}

            {/* Open to Work badge */}
            <div
              className="ml-3 flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold"
              style={{
                background: 'var(--emerald-bg)',
                color: 'var(--emerald)',
                border: '1px solid var(--emerald-border)',
                boxShadow: '0 0 10px rgba(16,185,129,0.1)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full inline-block animate-pulse-dot" style={{ background: 'var(--emerald)' }} />
              Open to work
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            id="menu-btn"
            onClick={() => setMobileOpen(v => !v)}
            className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
            style={{
              border: '1px solid rgba(99,102,241,0.25)',
              color: 'var(--text-muted)',
              background: mobileOpen ? 'var(--primary-bg)' : 'transparent',
            }}
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

      {/* Mobile Menu — slide + fade */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="fixed z-40 left-3 right-3 animate-drawer"
          style={{
            top: scrolled ? '56px' : '64px',
            background: 'rgba(18,21,30,0.97)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(99,102,241,0.18)',
            borderRadius: 'var(--radius-xl)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.08)',
          }}
        >
          <div className="px-4 py-5 flex flex-col gap-1">
            {navLinks.map((item, i) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => { e.preventDefault(); scrollTo(item.href) }}
                className="flex items-center gap-3 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200"
                style={{
                  color: 'var(--text-muted)',
                  animationDelay: `${i * 50}ms`,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'var(--primary-light)'
                  e.currentTarget.style.background = 'var(--primary-bg)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'var(--text-muted)'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                <span
                  className="w-1 h-4 rounded-full"
                  style={{ background: 'linear-gradient(180deg, var(--primary), var(--cyan))', opacity: 0.5 }}
                />
                {item.name}
              </a>
            ))}

            <div className="mt-3 pt-3" style={{ borderTop: '1px solid rgba(99,102,241,0.1)' }}>
              <div
                className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold w-fit"
                style={{
                  background: 'var(--emerald-bg)',
                  color: 'var(--emerald)',
                  border: '1px solid var(--emerald-border)',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full inline-block animate-pulse-dot" style={{ background: 'var(--emerald)' }} />
                Open to work
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}