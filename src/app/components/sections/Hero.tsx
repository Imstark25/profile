'use client'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef, useState, Suspense } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Globe, Network, Mail, MapPin, Phone } from 'lucide-react'
import { personal, techBadges } from '../../../lib/data'
import { useStore } from '../../../store/useStore'
import { useMagnet } from '../../../hooks/useMagnet'

// Lazy-load 3D scene (SSR disabled)
const HeroScene = dynamic(
  () => import('../canvas/HeroScene').then((m) => ({ default: m.HeroScene })),
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

/* ── 3D Tilt Card ───────────────────────────────── */
function TiltCard() {
  const cardRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 25 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 25 })

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
      {/* Glow ring */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 opacity-70 blur-md animate-pulse" />

      <div className="relative rounded-2xl glass-card p-7 z-10 border border-white/10">
        {/* Profile Photo */}
        <div className="relative mb-5">
          {/* Gradient glow ring */}
          <div className="absolute -inset-[3px] rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-400 opacity-80 blur-[2px]" />
          <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-white/10">
            <Image
              src="/profile.jpg"
              alt="Subash Chandra Bose A"
              fill
              className="object-cover object-top"
              priority
            />
          </div>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-[#0b1121] animate-glow" />
        </div>

        <h3 className="text-lg font-bold text-white leading-tight mb-0.5">{personal.name}</h3>
        <p className="text-blue-400 text-xs font-semibold tracking-wider uppercase mb-4">
          DevOps · AWS · Flutter
        </p>

        <div className="space-y-2 text-xs text-gray-400 mb-5">
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

        {/* Social links */}
        <div className="flex gap-2">
          <a href={personal.github} target="_blank" rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium bg-white/5 border border-white/10 hover:bg-blue-500/15 hover:border-blue-500/40 transition-all text-gray-300 hover:text-white">
            <Globe size={13} /> GitHub
          </a>
          <a href={personal.linkedin} target="_blank" rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium bg-white/5 border border-white/10 hover:bg-blue-500/15 hover:border-blue-500/40 transition-all text-gray-300 hover:text-white">
            <Network size={13} /> LinkedIn
          </a>
        </div>

        {/* Sheen effect */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
      </div>
    </motion.div>
  )
}

/* ── Hero ──────────────────────────────────────── */
export default function Hero() {
  const typeText = useTypewriter(personal.roles)

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden hero-grid">
      <HeroScene />

      {/* Ambient blobs */}
      <div className="ambient-blob w-[500px] h-[500px] bg-blue-600/20 top-[10%] left-[-5%]" />
      <div className="ambient-blob w-[400px] h-[400px] bg-purple-600/15 top-[35%] right-[-5%]" style={{ animationDelay: '3s' }} />
      <div className="ambient-blob w-[300px] h-[300px] bg-cyan-600/10 bottom-[5%] left-[40%]" style={{ animationDelay: '6s' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ── Left: Text ─── */}
          <div className="flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="section-tag mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
              Open to Opportunities
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] mb-4"
            >
              Hi, I&apos;m{' '}
              <span className="text-gradient">Subash</span>
              <br />
              <span className="text-gradient">Chandra Bose</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}
              className="text-xl md:text-2xl text-gray-400 font-medium h-9 mb-6 flex items-center gap-1"
            >
              <span className="text-white font-semibold">{typeText}</span>
              <span className="text-blue-500 animate-blink font-light">|</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35 }}
              className="text-gray-400 text-base leading-relaxed max-w-lg mb-8"
            >
              {personal.summary}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.45 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <Link href="#projects" className="btn-primary">
                View Projects <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="#contact" className="btn-ghost">
                Contact Me
              </Link>
            </motion.div>

            {/* Tech badges strip */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-2"
            >
              {techBadges.map((t, i) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.65 + i * 0.04, type: 'spring', stiffness: 200 }}
                  className="tech-badge"
                >
                  {t}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* ── Right: 3D Tilt Card ─── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.9, delay: 0.3, type: 'spring', stiffness: 80 }}
            className="hidden lg:flex justify-center items-center"
          >
            <TiltCard />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-gray-500 tracking-widest uppercase">Scroll</span>
        <div className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-1.5">
          <motion.div
            animate={{ y: [0, 14, 0] }} transition={{ duration: 1.6, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-blue-400"
          />
        </div>
      </motion.div>
    </section>
  )
}
