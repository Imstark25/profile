'use client'
import { useEffect, useRef, useState } from 'react'
import { personal } from '../../../lib/data'

const contactLinks = [
  {
    label: 'Email',
    value: personal.email,
    href:  `mailto:${personal.email}`,
    icon:  '✉️',
    color: '#6366f1',
    bg:    'rgba(99,102,241,0.06)',
    border: 'rgba(99,102,241,0.2)',
  },
  {
    label: 'LinkedIn',
    value: 'subash-chandra-bose-a',
    href:  personal.linkedin,
    icon:  '🔗',
    color: '#22d3ee',
    bg:    'rgba(34,211,238,0.06)',
    border: 'rgba(34,211,238,0.18)',
  },
  {
    label: 'GitHub',
    value: 'Imstark25',
    href:  personal.github,
    icon:  '🐙',
    color: '#a855f7',
    bg:    'rgba(168,85,247,0.06)',
    border: 'rgba(168,85,247,0.18)',
  },
]

/* ── Contact Link Card ──────────────────────────── */
function ContactCard({
  link, index,
}: {
  link: typeof contactLinks[0]
  index: number
}) {
  const ref   = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true) },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{
        opacity:    vis ? 1 : 0,
        transform:  vis ? 'translateX(0)' : 'translateX(30px)',
        transition: `opacity 0.55s ease ${index * 110}ms, transform 0.55s ease ${index * 110}ms`,
      }}
    >
      <a
        href={link.href}
        target={link.href.startsWith('http') ? '_blank' : undefined}
        rel="noopener noreferrer"
        className="card flex items-center gap-3 sm:gap-4 p-4 sm:p-5 group"
        style={{ textDecoration: 'none', cursor: 'pointer' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Icon */}
        <span
          className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-xl text-lg sm:text-xl shrink-0 transition-all duration-300"
          style={{
            background: hovered ? link.bg : 'rgba(255,255,255,0.04)',
            border: `1px solid ${hovered ? link.border : 'rgba(255,255,255,0.06)'}`,
            boxShadow: hovered ? `0 0 16px ${link.color}33` : 'none',
          }}
        >
          {link.icon}
        </span>

        <div className="flex-1 min-w-0">
          <div
            className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase mb-0.5 transition-colors duration-200"
            style={{ color: hovered ? link.color : 'var(--text-light)' }}
          >
            {link.label}
          </div>
          <div
            className="text-xs sm:text-sm font-medium truncate transition-colors duration-200"
            style={{ color: hovered ? 'var(--text)' : 'var(--text-muted)' }}
          >
            {link.value}
          </div>
        </div>

        {/* Arrow */}
        <svg
          width="16" height="16" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round"
          className="shrink-0 transition-all duration-300"
          style={{
            color: hovered ? link.color : 'var(--text-light)',
            transform: hovered ? 'translateX(4px)' : 'translateX(0)',
          }}
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </a>
    </div>
  )
}

/* ── Contact Section ─────────────────────────────── */
export default function Contact() {
  const headerRef = useRef<HTMLDivElement>(null)
  const quoteRef  = useRef<HTMLDivElement>(null)
  const [headerVis, setHeaderVis] = useState(false)
  const [quoteVis,  setQuoteVis]  = useState(false)

  useEffect(() => {
    const obs1 = new IntersectionObserver(([e]) => { if (e.isIntersecting) setHeaderVis(true) }, { threshold: 0.2 })
    const obs2 = new IntersectionObserver(([e]) => { if (e.isIntersecting) setQuoteVis(true) },  { threshold: 0.2 })
    if (headerRef.current) obs1.observe(headerRef.current)
    if (quoteRef.current)  obs2.observe(quoteRef.current)
    return () => { obs1.disconnect(); obs2.disconnect() }
  }, [])

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div ref={headerRef} className="mb-10 sm:mb-12">
          <div className={`section-tag ${headerVis ? 'animate-fade-up' : 'opacity-0'}`}>Connect</div>
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 ${headerVis ? 'animate-fade-up delay-100' : 'opacity-0'}`}
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Get in <span className="gradient-text">Touch</span>
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-start">

          {/* Left: Quote */}
          <div
            ref={quoteRef}
            style={{
              opacity:    quoteVis ? 1 : 0,
              transform:  quoteVis ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            {/* Decorative glow behind blockquote */}
            <div className="relative">
              <div
                className="absolute -inset-4 rounded-2xl pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at top left, rgba(99,102,241,0.06) 0%, transparent 70%)',
                }}
              />
              <blockquote
                className="relative text-lg sm:text-xl md:text-2xl leading-relaxed mb-6"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  color: 'var(--text)',
                  borderLeft: '3px solid transparent',
                  borderImage: 'linear-gradient(180deg, #6366f1, #22d3ee) 1',
                  paddingLeft: '1.5rem',
                }}
              >
                &ldquo;Every expert was once a beginner — I&apos;m just getting started, and I&apos;m all in.&rdquo;
              </blockquote>
            </div>

            <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--text-muted)' }}>
              I&apos;m actively looking for my first DevOps or cloud role where I can contribute, learn from experienced engineers, and grow. If you have an opportunity or just want to connect — I&apos;d love to hear from you!
            </p>

            {/* Availability card */}
            <div
              className="rounded-xl p-4 sm:p-5 flex items-center gap-4"
              style={{
                background: 'var(--emerald-bg)',
                border: '1px solid var(--emerald-border)',
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{ background: 'rgba(16,185,129,0.15)', fontSize: '1.25rem' }}
              >
                🟢
              </div>
              <div>
                <div className="text-sm font-semibold" style={{ color: 'var(--emerald)' }}>
                  Available for Work
                </div>
                <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  Open to full-time & freelance opportunities
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact links */}
          <div className="space-y-3 sm:space-y-4">
            {contactLinks.map((link, i) => (
              <ContactCard key={i} link={link} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}