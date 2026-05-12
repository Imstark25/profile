'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Mail, Download, ArrowRight, Terminal } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../../../lib/icons'
import { personal } from '../../../lib/data'

const ROLES = [
  'DevOps Engineer',
  'Cloud Architect',
  'Backend Developer',
  'AI/ML Explorer',
]

function useTypewriter(words: string[], speed = 85, pause = 2200) {
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

/* Seeded pseudo-random — same values server + client */
function seededRand(seed: number): number {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

const PARTICLES = Array.from({ length: 30 }, (_, i) => {
  const r0 = seededRand(i * 3)
  const r1 = seededRand(i * 3 + 1)
  const r2 = seededRand(i * 3 + 2)
  const r3 = seededRand(i * 3 + 3)
  const r4 = seededRand(i * 3 + 4)
  const r5 = seededRand(i * 3 + 5)
  const colors = ['rgba(139,92,246,0.6)', 'rgba(6,182,212,0.5)', 'rgba(248,250,252,0.3)']
  return {
    x:     r0 * 100,
    dur:   8 + r1 * 12,
    del:   r2 * 8,
    size:  1.5 + r3 * 2.5,
    color: colors[Math.floor(r4 * 3)],
    drift: (r5 - 0.5) * 120,
  }
})

export default function Hero() {
  const ref  = useRef<HTMLElement>(null)
  const role = useTypewriter(ROLES)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y  = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const op = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      id="hero"
      ref={ref}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{ paddingTop: '5rem' }}
    >
      {/* ── Mesh gradient background ── */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        {/* Deep gradient base */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(139,92,246,0.18) 0%, transparent 65%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 85% 60%, rgba(6,182,212,0.10) 0%, transparent 55%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 15% 80%, rgba(139,92,246,0.08) 0%, transparent 55%)',
          }}
        />

        {/* Glow orbs */}
        <motion.div
          className="orb animate-pulse-glow"
          animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.65, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: '600px', height: '600px',
            background: 'radial-gradient(circle, rgba(139,92,246,0.14) 0%, transparent 70%)',
            top: '-15%', left: '50%', transform: 'translateX(-50%)',
            filter: 'blur(60px)',
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          style={{
            position: 'absolute',
            width: '400px', height: '400px',
            background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)',
            bottom: '10%', right: '-5%',
            filter: 'blur(60px)',
          }}
        />

        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(148,163,184,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(148,163,184,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px',
          }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
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

      {/* ── Main content ── */}
      <motion.div
        className="section-inner relative z-10 text-center"
        style={{ y, opacity: op }}
      >
        {/* Status pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center mb-6"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold"
            style={{
              background: 'rgba(6,182,212,0.08)',
              border: '1px solid rgba(6,182,212,0.2)',
              color: 'var(--cyan-light)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: 'var(--emerald)',
                boxShadow: '0 0 8px rgba(16,185,129,0.8)',
                animation: 'pulse-glow 2s ease-in-out infinite',
              }}
            />
            Available for opportunities · Open to work
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-extrabold tracking-tighter mb-3"
          style={{
            fontSize: 'clamp(2.6rem, 8vw, 5.5rem)',
            lineHeight: 1.04,
            letterSpacing: '-0.035em',
          }}
        >
          {personal.name.split(' ').map((word, wi) =>
            wi === 0 ? (
              <span key={wi} style={{ color: 'var(--text)' }}>{word} </span>
            ) : wi === 1 ? (
              <span key={wi} style={{ color: 'var(--text)' }}>{word} </span>
            ) : (
              <span
                key={wi}
                style={{
                  background: 'linear-gradient(135deg, var(--violet-light), var(--cyan-light))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {word}
              </span>
            )
          )}
        </motion.h1>

        {/* Animated role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-2 mb-5"
          style={{ minHeight: '2.5rem' }}
        >
          <Terminal size={16} style={{ color: 'var(--violet-light)', flexShrink: 0 }} />
          <span
            className="text-lg md:text-xl font-semibold"
            style={{
              color: 'var(--violet-light)',
              fontFamily: "'Fira Code', 'Courier New', monospace",
            }}
          >
            {role}
          </span>
          <span
            style={{
              display: 'inline-block',
              width: '2px',
              height: '1.2em',
              background: 'var(--cyan)',
              animation: 'blink 1s step-end infinite',
            }}
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-10"
          style={{
            color: 'var(--text-3)',
            lineHeight: 1.65,
            fontWeight: 400,
          }}
        >
          Building scalable systems, exploring AI,{' '}
          <span style={{ color: 'var(--text-2)' }}>and crafting cloud-native solutions</span> — one commit at a time.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
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
          <a
            href="/resume.pdf"
            download
            className="btn btn-outline"
          >
            <Download size={15} />
            <span>Download Resume</span>
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex items-center justify-center gap-4"
        >
          {[
            { icon: GithubIcon,   href: personal.github,   label: 'GitHub'   },
            { icon: LinkedinIcon, href: personal.linkedin,  label: 'LinkedIn' },
            { icon: Mail,         href: `mailto:${personal.email}`, label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(148,163,184,0.1)',
                color: 'var(--text-3)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(139,92,246,0.12)'
                ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(139,92,246,0.35)'
                ;(e.currentTarget as HTMLElement).style.color = 'var(--violet-light)'
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'
                ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(148,163,184,0.1)'
                ;(e.currentTarget as HTMLElement).style.color = 'var(--text-3)'
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
              }}
            >
              <Icon size={17} />
            </a>
          ))}
        </motion.div>

        {/* Quick stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex items-center justify-center gap-8 mt-12 flex-wrap"
        >
          {[
            { val: '3+', label: 'Projects' },
            { val: '2',  label: 'AWS Certs' },
            { val: '1',  label: 'Hackathon Win' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <div
                className="text-2xl font-bold"
                style={{
                  background: 'linear-gradient(135deg, var(--violet-light), var(--cyan-light))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {s.val}
              </div>
              <div className="text-xs font-medium" style={{ color: 'var(--text-4)' }}>
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to top, var(--bg), transparent)' }}
      />

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: 'var(--text-4)', fontSize: '0.7rem', letterSpacing: '0.1em' }}
      >
        <span className="uppercase tracking-widest">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            width: '1px',
            height: '30px',
            background: 'linear-gradient(180deg, var(--violet), transparent)',
          }}
        />
      </motion.div>
    </section>
  )
}
