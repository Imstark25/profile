'use client'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef, useState, Suspense } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Globe, Network, Mail, MapPin, Phone } from 'lucide-react'
import { personal, techBadges } from '../../../lib/data'

/* Lazy-load 3D orb (SSR disabled) */
const FloatingOrb = dynamic(
  () => import('../canvas/FloatingOrb').then((m) => ({ default: m.FloatingOrb })),
  { ssr: false, loading: () => null }
)

/* ── Typewriter hook ────────────────────────────── */
function useTypewriter(words: string[], speed = 80, pause = 1800) {
  const [displayed, setDisplayed] = useState('')
  const [wordIdx, setWordIdx]     = useState(0)
  const [deleting, setDeleting]   = useState(false)

  useEffect(() => {
    const current = words[wordIdx]
    let timeout: NodeJS.Timeout

    if (!deleting && displayed === current) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && displayed === '') {
      setDeleting(false)
      setWordIdx(i => (i + 1) % words.length)
    } else {
      timeout = setTimeout(
        () => setDisplayed(current.substring(0, displayed.length + (deleting ? -1 : 1))),
        deleting ? speed / 2 : speed,
      )
    }
    return () => clearTimeout(timeout)
  }, [displayed, deleting, wordIdx, words, speed, pause])

  return displayed
}

/* ── Profile Card (subtle tilt, no aggressive glow) */
function ProfileCard() {
  const cardRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), { stiffness: 180, damping: 28 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), { stiffness: 180, damping: 28 })

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="relative w-full max-w-sm mx-auto"
    >
      <div className="relative rounded-2xl glass-card p-7 border border-[var(--border)]">
        {/* Profile Photo */}
        <div className="relative mb-5">
          <div className="relative w-24 h-24 rounded-2xl overflow-hidden border border-[var(--border)]">
            <Image
              src="/profile.jpg"
              alt="Subash Chandra Bose A"
              fill
              sizes="96px"
              className="object-cover object-top"
              priority
            />
          </div>
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-[var(--surface)]" />
        </div>

        <h3 className="text-lg font-bold leading-tight mb-0.5" style={{ color: 'var(--text)' }}>
          {personal.name}
        </h3>
        <p className="text-blue-400 text-xs font-semibold tracking-wider uppercase mb-4">
          DevOps · AWS · Flutter
        </p>

        <div className="space-y-2 text-xs mb-5" style={{ color: 'var(--text-muted)' }}>
          <div className="flex items-center gap-2">
            <MapPin size={12} className="text-blue-400 shrink-0" />
            <span>{personal.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={12} className="text-blue-400 shrink-0" />
            <span>{personal.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={12} className="text-blue-400 shrink-0" />
            <span>{personal.phone}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <a href={personal.github} target="_blank" rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium transition-all"
            style={{
              background: 'var(--glass-surface-bg)',
              border: '1px solid var(--border)',
              color: 'var(--text-muted)',
            }}>
            <Globe size={13} /> GitHub
          </a>
          <a href={personal.linkedin} target="_blank" rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium transition-all"
            style={{
              background: 'var(--glass-surface-bg)',
              border: '1px solid var(--border)',
              color: 'var(--text-muted)',
            }}>
            <Network size={13} /> LinkedIn
          </a>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Fade-up animation helper ───────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.4, 0, 0.2, 1] as [number,number,number,number] },
})

/* ── Hero ──────────────────────────────────────── */
export default function Hero() {
  const typeText = useTypewriter(personal.roles)

  const isMobile =
    typeof navigator !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent)

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden hero-grid"
    >
      {/* 3D orb — right half, desktop only */}
      <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block">
        <Suspense fallback={null}>
          <FloatingOrb isMobile={isMobile} />
        </Suspense>
      </div>

      {/* Subtle single ambient blob — much smaller than before */}
      <div
        className="ambient-blob w-[320px] h-[320px] top-[15%] left-[-8%]"
        style={{ background: 'rgba(59,130,246,0.10)' }}
      />
      <div
        className="ambient-blob w-[240px] h-[240px] bottom-[10%] right-[8%]"
        style={{ background: 'rgba(139,92,246,0.08)', animationDelay: '4s' }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: Text ─── */}
          <div className="flex flex-col items-start">
            <motion.div {...fadeUp(0)} className="section-tag mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
              Open to Opportunities
            </motion.div>

            <motion.h1
              {...fadeUp(0.1)}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] mb-4"
            >
              Hi, I&apos;m{' '}
              <span className="text-gradient">Subash</span>
              <br />
              <span className="text-gradient">Chandra Bose</span>
            </motion.h1>

            <motion.div
              {...fadeUp(0.22)}
              className="text-xl md:text-2xl font-medium h-9 mb-6 flex items-center gap-1"
              style={{ color: 'var(--text-muted)' }}
            >
              <span className="font-semibold" style={{ color: 'var(--text)' }}>{typeText}</span>
              <span className="text-blue-500 animate-blink font-light">|</span>
            </motion.div>

            <motion.p
              {...fadeUp(0.32)}
              className="text-base leading-relaxed max-w-lg mb-8"
              style={{ color: 'var(--text-muted)' }}
            >
              {personal.summary}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div {...fadeUp(0.42)} className="flex flex-wrap gap-4 mb-10">
              <Link href="#projects" className="btn-primary">
                View Projects <ArrowRight size={16} />
              </Link>
              <Link href="#contact" className="btn-ghost">
                Contact Me
              </Link>
            </motion.div>

            {/* Tech badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex flex-wrap gap-2"
            >
              {techBadges.map((t, i) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.58 + i * 0.035, duration: 0.35 }}
                  className="tech-badge"
                >
                  {t}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Profile Card ─── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.28, ease: [0.4, 0, 0.2, 1] }}
            className="hidden lg:flex justify-center items-center"
          >
            <ProfileCard />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--text-muted)', opacity: 0.5 }}>
          Scroll
        </span>
        <div className="w-5 h-9 rounded-full flex items-start justify-center p-1.5"
          style={{ border: '1px solid var(--border)' }}>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-1 rounded-full bg-blue-400"
          />
        </div>
      </motion.div>
    </section>
  )
}
