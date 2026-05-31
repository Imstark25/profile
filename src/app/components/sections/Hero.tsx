'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Mail, Download, ArrowRight } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../../../lib/icons'
import { personal } from '../../../lib/data'

const ROLES = [
  'Salesforce Administrator',
  'AWS Cloud Engineer',
  'Flutter Developer',
  'MCA Graduate 2025',
]

function useTypewriter(words: string[], speed = 80, pause = 2000) {
  const [displayed, setDisplayed] = useState('')
  const [wordIdx, setWordIdx]     = useState(0)
  const [charIdx, setCharIdx]     = useState(0)
  const [deleting, setDeleting]   = useState(false)

  useEffect(() => {
    const current = words[wordIdx]
    const t = setTimeout(() => {
      if (!deleting) {
        setDisplayed(current.slice(0, charIdx + 1))
        if (charIdx + 1 === current.length) setTimeout(() => setDeleting(true), pause)
        else setCharIdx(c => c + 1)
      } else {
        setDisplayed(current.slice(0, charIdx - 1))
        if (charIdx - 1 === 0) {
          setDeleting(false)
          setWordIdx(w => (w + 1) % words.length)
          setCharIdx(0)
        } else setCharIdx(c => c - 1)
      }
    }, deleting ? speed / 2 : speed)
    return () => clearTimeout(t)
  }, [charIdx, deleting, wordIdx, words, speed, pause])

  return displayed
}

function seededRand(seed: number): number {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

const PARTICLES = Array.from({ length: 16 }, (_, i) => {
  const r0 = seededRand(i * 3)
  const r1 = seededRand(i * 3 + 1)
  const r2 = seededRand(i * 3 + 2)
  const r3 = seededRand(i * 3 + 3)
  const r4 = seededRand(i * 3 + 4)
  const r5 = seededRand(i * 3 + 5)
  const colors = ['rgba(0,161,224,0.45)', 'rgba(255,153,0,0.35)', 'rgba(84,197,248,0.4)', 'rgba(139,92,246,0.3)']
  return {
    x:     r0 * 100,
    dur:   12 + r1 * 14,
    del:   r2 * 10,
    size:  1.5 + r3 * 2.5,
    color: colors[Math.floor(r4 * 4)],
    drift: (r5 - 0.5) * 100,
  }
})

// Floating tech icons with pure CSS animation
const FLOAT_ICONS = [
  { symbol: '⚡', label: 'AWS',        x: '8%',   y: '22%', delay: '0s',    dur: '7s',  size: '2rem', opacity: 0.5 },
  { symbol: '☁️', label: 'Salesforce', x: '88%',  y: '18%', delay: '1.2s',  dur: '8s',  size: '2rem', opacity: 0.5 },
  { symbol: '📱', label: 'Flutter',    x: '6%',   y: '65%', delay: '0.6s',  dur: '9s',  size: '1.75rem', opacity: 0.45 },
  { symbol: '🐳', label: 'Docker',     x: '90%',  y: '58%', delay: '1.8s',  dur: '7.5s',size: '1.75rem', opacity: 0.4 },
  { symbol: '🏗️', label: 'Terraform',  x: '78%',  y: '78%', delay: '2.4s',  dur: '8.5s',size: '1.5rem', opacity: 0.35 },
  { symbol: '🔥', label: 'Firebase',   x: '18%',  y: '80%', delay: '3s',    dur: '6.5s',size: '1.5rem', opacity: 0.35 },
]

// Role color mapping
const ROLE_COLORS: Record<string, string> = {
  'Salesforce Administrator': '#00A1E0',
  'AWS Cloud Engineer':       '#FF9900',
  'Flutter Developer':        '#54C5F8',
  'MCA Graduate 2025':        '#a78bfa',
}

export default function Hero() {
  const ref  = useRef<HTMLElement>(null)
  const role = useTypewriter(ROLES)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y  = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const op = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  // Determine current role color for cursor
  const currentColor = Object.entries(ROLE_COLORS).find(([r]) => role.startsWith(r.slice(0, 6)))?.[1] ?? '#a78bfa'

  return (
    <section
      id="hero"
      ref={ref}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{ paddingTop: '5rem' }}
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 90% 65% at 50% -5%, rgba(0,161,224,0.12) 0%, transparent 60%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 45% at 90% 60%, rgba(255,153,0,0.08) 0%, transparent 55%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 50% 40% at 5% 70%, rgba(84,197,248,0.07) 0%, transparent 55%)' }} />

        {/* Ambient orbs */}
        <div className="orb animate-pulse-glow" style={{ width: '520px', height: '520px', background: 'radial-gradient(circle, rgba(0,161,224,0.10) 0%, transparent 70%)', top: '-12%', left: '50%', transform: 'translateX(-50%)' }} />
        <div className="orb" style={{ width: '280px', height: '280px', background: 'radial-gradient(circle, rgba(255,153,0,0.09) 0%, transparent 70%)', bottom: '8%', right: '-4%', animation: 'pulse-glow 8s ease-in-out 2s infinite' }} />

        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.018]" style={{ backgroundImage: `linear-gradient(rgba(148,163,184,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.5) 1px, transparent 1px)`, backgroundSize: '64px 64px' }} />

        {/* Floating tech icons */}
        {FLOAT_ICONS.map((icon, i) => (
          <div
            key={i}
            aria-label={icon.label}
            style={{
              position: 'absolute',
              left: icon.x,
              top: icon.y,
              fontSize: icon.size,
              opacity: icon.opacity,
              animation: `float ${icon.dur} ease-in-out ${icon.delay} infinite`,
              userSelect: 'none',
              pointerEvents: 'none',
              filter: 'blur(0.3px)',
            }}
          >
            {icon.symbol}
          </div>
        ))}

        {/* Particles */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          {PARTICLES.map((p, i) => (
            <span
              key={i}
              style={{
                position: 'absolute',
                left: `${p.x}%`,
                bottom: '-10px',
                width: `${p.size}px`,
                height: `${p.size}px`,
                borderRadius: '50%',
                background: p.color,
                animation: `particle-drift ${p.dur}s ease-in ${p.del}s infinite`,
                '--drift': `${p.drift}px`,
              } as React.CSSProperties}
            />
          ))}
        </div>
      </div>

      {/* Main content */}
      <motion.div
        className="section-inner relative z-10 text-center"
        style={{ y, opacity: op }}
      >
        {/* Status pill */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex items-center justify-center mb-7">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold" style={{ background: 'rgba(0,161,224,0.08)', border: '1px solid rgba(0,161,224,0.22)', color: '#22d3ee' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#10b981', boxShadow: '0 0 8px rgba(16,185,129,0.9)', animation: 'pulse-glow 2s ease-in-out infinite' }} />
            Open to Work · 2026 Graduate Roles · Chennai, India
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="font-extrabold tracking-tighter mb-4"
          style={{ fontSize: 'clamp(2.4rem, 7.5vw, 5.2rem)', lineHeight: 1.05, letterSpacing: '-0.035em' }}
        >
          <span style={{ color: 'var(--text)' }}>Subash </span>
          <span style={{ color: 'var(--text)' }}>Chandra{' '}</span>
          <span style={{ background: 'linear-gradient(135deg, #00A1E0, #54C5F8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Bose A
          </span>
        </motion.h1>

        {/* Role type badges row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="flex items-center justify-center flex-wrap gap-2 mb-6"
        >
          {[
            { label: 'Salesforce Admin', color: '#00A1E0', bg: 'rgba(0,161,224,0.08)', border: 'rgba(0,161,224,0.22)' },
            { label: 'AWS Cloud Engineer', color: '#FF9900', bg: 'rgba(255,153,0,0.08)', border: 'rgba(255,153,0,0.22)' },
            { label: 'Flutter Developer', color: '#54C5F8', bg: 'rgba(84,197,248,0.08)', border: 'rgba(84,197,248,0.22)' },
          ].map(badge => (
            <span key={badge.label} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold" style={{ background: badge.bg, border: `1px solid ${badge.border}`, color: badge.color }}>
              <span className="w-1 h-1 rounded-full" style={{ background: badge.color }} />
              {badge.label}
            </span>
          ))}
        </motion.div>

        {/* Animated role typewriter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.26 }}
          className="flex items-center justify-center gap-2 mb-6"
          style={{ minHeight: '2.2rem' }}
        >
          <span className="text-base md:text-lg font-mono font-medium" style={{ color: 'var(--text-3)' }}>
            {'> '}
          </span>
          <span
            className="text-base md:text-lg font-semibold font-mono"
            style={{ color: currentColor, transition: 'color 0.5s ease' }}
          >
            {role}
          </span>
          <span style={{ display: 'inline-block', width: '2px', height: '1.2em', background: currentColor, animation: 'blink 1s step-end infinite', opacity: 0.85 }} />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.32 }}
          className="text-base md:text-lg max-w-xl mx-auto mb-10"
          style={{ color: 'var(--text-3)', lineHeight: 1.7, fontWeight: 400 }}
        >
          Building{' '}
          <span style={{ color: '#00A1E0', fontWeight: 600 }}>Salesforce CRM solutions</span>,{' '}
          <span style={{ color: '#FF9900', fontWeight: 600 }}>AWS cloud infrastructure</span>,{' '}
          and{' '}
          <span style={{ color: '#54C5F8', fontWeight: 600 }}>Flutter mobile apps</span>{' '}
          — MCA graduate ready for 2026 roles.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-10"
        >
          <a
            href="#projects"
            onClick={e => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="btn btn-primary"
          >
            <span>View Projects</span>
            <ArrowRight size={16} />
          </a>
          <a href="/Subash__Copy_.pdf" download className="btn btn-outline">
            <Download size={15} />
            <span>Download Resume</span>
          </a>
          <a href={`mailto:${personal.email}`} className="btn btn-outline">
            <Mail size={15} />
            <span>Contact Me</span>
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.48 }}
          className="flex items-center justify-center gap-3 mb-14"
        >
          {[
            { icon: GithubIcon,   href: personal.github,            label: 'GitHub',   color: 'rgba(139,92,246,0.35)' },
            { icon: LinkedinIcon, href: personal.linkedin,           label: 'LinkedIn', color: 'rgba(0,161,224,0.35)'  },
            { icon: Mail,         href: `mailto:${personal.email}`,  label: 'Email',    color: 'rgba(16,185,129,0.35)' },
          ].map(({ icon: Icon, href, label, color }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(148,163,184,0.1)', color: 'var(--text-3)' }}
              onMouseEnter={e => {
                ;(e.currentTarget as HTMLElement).style.background = color.replace('0.35)', '0.12)')
                ;(e.currentTarget as HTMLElement).style.borderColor = color
                ;(e.currentTarget as HTMLElement).style.color = '#fff'
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'
              }}
              onMouseLeave={e => {
                ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'
                ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(148,163,184,0.1)'
                ;(e.currentTarget as HTMLElement).style.color = 'var(--text-3)'
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
              }}
            >
              <Icon size={17} />
            </a>
          ))}
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.56 }}
          className="flex items-center justify-center gap-8 sm:gap-12 flex-wrap"
        >
          {[
            { val: '4',    label: 'Certifications', color: '#FF9900' },
            { val: '3+',   label: 'Projects Built',  color: '#00A1E0' },
            { val: 'MCA',  label: 'Graduate 2025',   color: '#54C5F8' },
            { val: '1',    label: 'Internship',       color: '#a78bfa' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-bold" style={{ color: s.color, textShadow: `0 0 20px ${s.color}60` }}>
                {s.val}
              </div>
              <div className="text-xs font-medium mt-0.5" style={{ color: 'var(--text-4)' }}>
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" style={{ background: 'linear-gradient(to top, var(--bg), transparent)' }} />

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: 'var(--text-4)', fontSize: '0.65rem', letterSpacing: '0.12em' }}
      >
        <span className="uppercase tracking-widest">scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          style={{ width: '1px', height: '28px', background: 'linear-gradient(180deg, #00A1E0, transparent)' }}
        />
      </motion.div>
    </section>
  )
}
