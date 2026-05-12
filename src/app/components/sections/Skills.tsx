'use client'
import { useEffect, useRef, useState } from 'react'
import { coreSkills, stackGroups } from '../../../lib/data'

/* ── Animated Progress Bar ──────────────────────── */
function ProgressBar({ level, color }: { level: number; color: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.4 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="progress-bar-track">
      <div
        className="progress-bar-fill"
        style={{
          width: visible ? `${level}%` : '0%',
          background: color,
          boxShadow: visible ? `0 0 8px ${color.split(',')[0].replace('linear-gradient(90deg, ', '')}66` : 'none',
        }}
      />
    </div>
  )
}

const skillColors = [
  'linear-gradient(90deg, #e8547a, #f07ca0)',
  'linear-gradient(90deg, #c084b4, #d8a8cc)',
  'linear-gradient(90deg, #e8547a, #c084b4)',
  'linear-gradient(90deg, #d97706, #f59e0b)',
  'linear-gradient(90deg, #3a8f6a, #52b38a)',
  'linear-gradient(90deg, #f07ca0, #fccde1)',
]

const groupIcons = ['☁️', '🐳', '🔁', '📊']
const groupColors = [
  { accent: '#e8547a', bg: 'rgba(232,84,122,0.07)',   border: 'rgba(232,84,122,0.20)' },
  { accent: '#c084b4', bg: 'rgba(192,132,180,0.07)',  border: 'rgba(192,132,180,0.20)' },
  { accent: '#d97706', bg: 'rgba(217,119,6,0.07)',    border: 'rgba(217,119,6,0.20)'  },
  { accent: '#3a8f6a', bg: 'rgba(58,143,106,0.07)',   border: 'rgba(58,143,106,0.20)' },
]

/* ── Main Section ───────────────────────────────── */
export default function Skills() {
  const headerRef = useRef<HTMLDivElement>(null)
  const [headerVisible, setHeaderVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setHeaderVisible(true) },
      { threshold: 0.2 }
    )
    if (headerRef.current) observer.observe(headerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" className="py-16 sm:py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div ref={headerRef} className="mb-10 sm:mb-12">
          <div className={`section-tag ${headerVisible ? 'animate-fade-up' : 'opacity-0'}`}>Expertise</div>
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 ${headerVisible ? 'animate-fade-up delay-100' : 'opacity-0'}`}
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Core <span className="gradient-text">Skills</span>
          </h2>
          <p
            className={`text-sm max-w-md ${headerVisible ? 'animate-fade-up delay-200' : 'opacity-0'}`}
            style={{ color: 'var(--text-muted)' }}
          >
            Tools and technologies I&apos;m actively learning and practising through projects.
          </p>
        </div>

        {/* Skills List */}
        <div className="space-y-2 sm:space-y-3 mb-16 sm:mb-20">
          {coreSkills.map((skill, i) => {
            const color = skillColors[i % skillColors.length]
            const isExpert = skill.label === 'Comfortable'
            return (
              <SkillRow key={i} skill={skill} index={i} color={color} isExpert={isExpert} />
            )
          })}
        </div>

        {/* Full Stack Header */}
        <div className="mb-6 sm:mb-8">
          <h2
            className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Full Stack <span className="gradient-text-violet">Toolbox</span>
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Comprehensive tooling across the DevOps lifecycle.
          </p>
        </div>

        {/* 4-box grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {stackGroups.map((group, i) => (
            <StackCard key={i} group={group} index={i} icon={groupIcons[i]} colors={groupColors[i % groupColors.length]} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Skill Row (animated on scroll) ─────────────── */
function SkillRow({
  skill, index, color, isExpert,
}: {
  skill: { name: string; icon: string; subTools: string; level: number; label: string }
  index: number; color: string; isExpert: boolean
}) {
  const ref     = useRef<HTMLDivElement>(null)
  const [vis,    setVis]    = useState(false)

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
      className="card p-4 sm:p-5 md:p-6"
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? 'translateX(0)' : 'translateX(-20px)',
        transition: `opacity 0.5s ease ${index * 80}ms, transform 0.5s ease ${index * 80}ms`,
        cursor: 'default',
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">

        {/* Icon + Name */}
        <div className="flex items-center gap-3 sm:w-[260px] shrink-0">
          <span
            className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl text-lg shrink-0"
            style={{ background: 'rgba(232,84,122,0.07)', border: '1px solid rgba(232,84,122,0.18)' }}
          >
            {skill.icon}
          </span>
          <div className="min-w-0">
            <div className="text-sm font-semibold truncate" style={{ color: 'var(--text)' }}>
              {skill.name}
            </div>
            <div className="text-xs truncate" style={{ color: 'var(--text-light)' }}>
              {skill.subTools}
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="flex-1 min-w-0">
          <ProgressBar level={skill.level} color={color} />
        </div>

        {/* Label */}
        <div
          className="text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 self-start sm:self-auto"
          style={{
            background: isExpert ? 'rgba(16,185,129,0.1)' : skill.label === 'Learning' ? 'rgba(99,102,241,0.08)' : 'rgba(107,114,128,0.08)',
            color: isExpert ? 'var(--emerald)' : skill.label === 'Learning' ? 'var(--primary-light)' : 'var(--text-light)',
            border: `1px solid ${isExpert ? 'rgba(16,185,129,0.3)' : skill.label === 'Learning' ? 'rgba(99,102,241,0.2)' : 'rgba(107,114,128,0.2)'}`,
          }}
        >
          {skill.label}
        </div>
      </div>
    </div>
  )
}

/* ── Stack Group Card ────────────────────────────── */
function StackCard({
  group, index, icon, colors,
}: {
  group: { title: string; tools: string[] }
  index: number; icon: string
  colors: { accent: string; bg: string; border: string }
}) {
  const ref   = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="card p-5 sm:p-6"
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.5s ease ${index * 100}ms, transform 0.5s ease ${index * 100}ms`,
        cursor: 'default',
        borderColor: vis ? colors.border : 'var(--border)',
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <span
          className="w-8 h-8 flex items-center justify-center rounded-lg text-base shrink-0"
          style={{ background: colors.bg, border: `1px solid ${colors.border}` }}
        >
          {icon}
        </span>
        <h3
          className="text-sm font-semibold"
          style={{ fontFamily: 'var(--font-serif)', color: colors.accent }}
        >
          {group.title}
        </h3>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {group.tools.map((tool, ti) => (
          <span
            key={tool}
            className="tech-badge"
            style={{
              opacity: vis ? 1 : 0,
              transform: vis ? 'scale(1)' : 'scale(0.8)',
              transition: `opacity 0.3s ease ${index * 80 + ti * 40}ms, transform 0.3s ease ${index * 80 + ti * 40}ms`,
            }}
          >
            {tool}
          </span>
        ))}
      </div>
    </div>
  )
}