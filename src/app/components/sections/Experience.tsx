'use client'
import { useEffect, useRef, useState } from 'react'
import { experiences } from '../../../lib/data'

/* Timeline dot colors per entry */
const dotColors = ['#6366f1', '#22d3ee', '#a855f7', '#f59e0b', '#10b981']

function ExperienceCard({
  exp, index,
}: {
  exp: { date: string; title: string; company: string; description: string; tech: string[] }
  index: number
}) {
  const ref   = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  const dot   = dotColors[index % dotColors.length]

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
      className="relative"
      style={{
        opacity:    vis ? 1 : 0,
        transform:  vis ? 'translateX(0)' : 'translateX(-30px)',
        transition: `opacity 0.55s ease ${index * 120}ms, transform 0.55s ease ${index * 120}ms`,
      }}
    >
      {/* Timeline connector (left side on desktop) */}
      <div className="flex gap-4 sm:gap-6">

        {/* Timeline track */}
        <div className="flex flex-col items-center shrink-0" style={{ width: '20px' }}>
          {/* Dot */}
          <div
            className="w-3.5 h-3.5 rounded-full shrink-0 mt-1.5 relative z-10"
            style={{
              background: dot,
              boxShadow: `0 0 12px ${dot}88`,
            }}
          >
            {/* Pulse ring */}
            <span
              className="absolute inset-0 rounded-full"
              style={{
                border: `2px solid ${dot}`,
                animation: vis ? 'glow-pulse 2s ease-in-out infinite' : 'none',
                opacity: 0.5,
              }}
            />
          </div>
          {/* Vertical line */}
          {index < (experiences?.length ?? 0) - 1 && (
            <div
              className="flex-1 w-px mt-2"
              style={{
                background: `linear-gradient(180deg, ${dot}55, transparent)`,
                minHeight: '2rem',
              }}
            />
          )}
        </div>

        {/* Card */}
        <div
          className="card p-4 sm:p-6 md:p-7 flex-1 mb-4 sm:mb-5"
          style={{
            borderLeft: `2px solid ${dot}33`,
            cursor: 'default',
          }}
        >
          {/* Date badge */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span
              className="text-[10px] sm:text-xs font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
              style={{
                background: `${dot}12`,
                border: `1px solid ${dot}30`,
                color: dot,
              }}
            >
              {exp.date}
            </span>
          </div>

          {/* Title + Company */}
          <h3
            className="text-base sm:text-lg md:text-xl font-semibold mb-1"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--text)' }}
          >
            {exp.title}
          </h3>
          <p
            className="text-sm font-medium mb-3"
            style={{ color: dot }}
          >
            {exp.company}
          </p>

          {/* Description */}
          <p
            className="text-sm leading-relaxed mb-4"
            style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}
          >
            {exp.description}
          </p>

          {/* Tech Tags */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {exp.tech.map((t, ti) => (
              <span
                key={t}
                className="tech-badge"
                style={{
                  opacity:    vis ? 1 : 0,
                  transition: `opacity 0.3s ease ${index * 120 + ti * 50 + 300}ms`,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Experience() {
  const headerRef = useRef<HTMLDivElement>(null)
  const [headerVis, setHeaderVis] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setHeaderVis(true) },
      { threshold: 0.2 }
    )
    if (headerRef.current) observer.observe(headerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="experience" className="py-16 sm:py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div ref={headerRef} className="mb-10 sm:mb-12">
          <div className={`section-tag ${headerVis ? 'animate-fade-up' : 'opacity-0'}`}>Journey</div>
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 ${headerVis ? 'animate-fade-up delay-100' : 'opacity-0'}`}
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p
            className={`text-sm max-w-md ${headerVis ? 'animate-fade-up delay-200' : 'opacity-0'}`}
            style={{ color: 'var(--text-muted)' }}
          >
            Where I&apos;ve built infrastructure and shipped reliable systems.
          </p>
        </div>

        {/* Timeline Cards */}
        <div>
          {experiences.map((exp, i) => (
            <ExperienceCard key={i} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}