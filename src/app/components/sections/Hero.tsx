'use client'
import { personal } from '../../../lib/data'
import { useEffect, useRef, useState } from 'react'

/* ── Typewriter hook ─────────────────────────────── */
function useTypewriter(words: string[], speed = 80, pause = 2000) {
  const [displayed, setDisplayed] = useState('')
  const [wordIdx, setWordIdx]     = useState(0)
  const [charIdx, setCharIdx]     = useState(0)
  const [deleting, setDeleting]   = useState(false)

  useEffect(() => {
    const current = words[wordIdx]
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplayed(current.slice(0, charIdx + 1))
        if (charIdx + 1 === current.length) {
          setTimeout(() => setDeleting(true), pause)
        } else {
          setCharIdx(c => c + 1)
        }
      } else {
        setDisplayed(current.slice(0, charIdx - 1))
        if (charIdx - 1 === 0) {
          setDeleting(false)
          setWordIdx(w => (w + 1) % words.length)
          setCharIdx(0)
        } else {
          setCharIdx(c => c - 1)
        }
      }
    }, deleting ? speed / 2 : speed)
    return () => clearTimeout(timeout)
  }, [charIdx, deleting, wordIdx, words, speed, pause])

  return displayed
}

export default function Hero() {
  const roles = ['Senior DevOps Engineer', 'Cloud Architect', 'Infrastructure Specialist', 'SRE Expert']
  const typed = useTypewriter(roles)

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center overflow-hidden"
      style={{ paddingTop: '5rem' }}
    >
      {/* ── Ambient Glow Blobs ── */}
      <div
        className="absolute top-[-10%] left-[-5%] w-[480px] h-[480px] rounded-full pointer-events-none animate-glow-pulse animate-float"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.14) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute bottom-[10%] right-[-5%] w-[360px] h-[360px] rounded-full pointer-events-none animate-float delay-300"
        style={{
          background: 'radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute top-[40%] right-[20%] w-[240px] h-[240px] rounded-full pointer-events-none animate-float delay-600"
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* ── Grid noise overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 w-full py-16 md:py-24 relative z-10">
        <div className="max-w-3xl">

          {/* Availability pill */}
          <div className="animate-fade-up mb-6 flex flex-wrap gap-3">
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold"
              style={{
                background: 'var(--emerald-bg)',
                border: '1px solid var(--emerald-border)',
                color: 'var(--emerald)',
              }}
            >
              <span className="w-2 h-2 rounded-full inline-block animate-pulse-dot" style={{ background: 'var(--emerald)' }} />
              Available for new opportunities
            </span>
          </div>

          {/* Italic quote */}
          <p
            className="text-base sm:text-lg md:text-xl mb-4 animate-fade-up delay-100"
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              color: 'var(--primary-light)',
              fontWeight: 400,
            }}
          >
            &ldquo;{personal.headline}&rdquo;
          </p>

          {/* Name */}
          <h1
            className="font-semibold tracking-tight mb-3 animate-fade-up delay-200"
            style={{
              fontFamily: 'var(--font-serif)',
              lineHeight: 1.05,
              fontSize: 'clamp(2.2rem, 7vw, 4rem)',
            }}
          >
            {personal.name}
          </h1>

          {/* Typewriter role */}
          <div
            className="flex items-center gap-1 mb-6 animate-fade-up delay-300"
            style={{ minHeight: '2rem' }}
          >
            <span
              className="text-base sm:text-lg md:text-xl font-medium"
              style={{ color: 'var(--cyan)' }}
            >
              {typed}
            </span>
            <span
              className="inline-block w-[2px] h-5 ml-0.5"
              style={{
                background: 'var(--cyan)',
                animation: 'blink 1s step-end infinite',
              }}
            />
          </div>

          {/* Bio */}
          <p
            className="text-sm sm:text-base leading-relaxed mb-8 max-w-xl animate-fade-up delay-400"
            style={{ color: 'var(--text-muted)' }}
          >
            {personal.bio}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 animate-fade-up delay-500">
            <a
              href="#experience"
              className="btn-primary text-center justify-center"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              <span>View My Work</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <a
              href="#contact"
              className="btn-ghost text-center justify-center"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Get in Touch
            </a>
          </div>

          {/* Quick stat pills */}
          <div className="flex flex-wrap gap-4 mt-10 animate-fade-up delay-600">
            {[
              { value: '5+', label: 'Years Exp.' },
              { value: '50+', label: 'Deployments' },
              { value: '99.9%', label: 'Uptime SLA' },
            ].map((s, i) => (
              <div
                key={i}
                className="flex flex-col"
                style={{ borderLeft: '2px solid rgba(99,102,241,0.35)', paddingLeft: '0.75rem' }}
              >
                <span
                  className="text-xl font-bold"
                  style={{ fontFamily: 'var(--font-serif)', color: 'var(--primary-light)' }}
                >
                  {s.value}
                </span>
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to top, var(--bg), transparent)' }}
      />
    </section>
  )
}
