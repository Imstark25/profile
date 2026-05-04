'use client'
import { useEffect, useRef, useState } from 'react'
import { coreSkills, stackGroups } from '../../../lib/data'

/* ── Animated Progress Bar ──────────────────────── */
function ProgressBar({ level }: { level: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="progress-bar-track">
      <div
        className="progress-bar-fill"
        style={{ width: visible ? `${level}%` : '0%' }}
      />
    </div>
  )
}

/* ── Core Skills Section ────────────────────────── */
export default function Skills() {
  return (
    <section id="skills" className="py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="mb-12">
          <div className="section-tag">Expertise</div>
          <h2
            className="text-3xl md:text-4xl font-semibold mb-3"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Core Skills
          </h2>
          <p className="text-sm max-w-md" style={{ color: 'var(--text-muted)' }}>
            Technologies I work with daily to build and maintain production infrastructure.
          </p>
        </div>

        {/* Skills List — Row Style */}
        <div className="space-y-3 mb-20">
          {coreSkills.map((skill, i) => (
            <div
              key={i}
              className="card p-5 md:p-6"
              style={{ cursor: 'default' }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">

                {/* Icon + Name + Sub-tools */}
                <div className="flex items-center gap-3 sm:w-[280px] shrink-0">
                  <span className="text-xl">{skill.icon}</span>
                  <div>
                    <div className="text-sm font-bold" style={{ color: 'var(--text)' }}>
                      {skill.name}
                    </div>
                    <div className="text-xs" style={{ color: 'var(--text-light)' }}>
                      {skill.subTools}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="flex-1">
                  <ProgressBar level={skill.level} />
                </div>

                {/* Level Label */}
                <div
                  className="text-xs font-semibold px-3 py-1 rounded-full shrink-0"
                  style={{
                    background: skill.label === 'Expert' ? 'var(--green-bg)' : 'var(--bg-alt)',
                    color: skill.label === 'Expert' ? 'var(--green)' : 'var(--text-muted)',
                    border: `1px solid ${skill.label === 'Expert' ? 'rgba(45,80,22,0.18)' : 'var(--border)'}`,
                  }}
                >
                  {skill.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Full Stack Grid Header */}
        <div className="mb-8">
          <h2
            className="text-2xl md:text-3xl font-semibold mb-3"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Full Stack
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Comprehensive tooling across the DevOps lifecycle.
          </p>
        </div>

        {/* 4-box grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stackGroups.map((group, i) => (
            <div
              key={i}
              className="card p-6"
              style={{ cursor: 'default' }}
            >
              <h3
                className="text-base font-semibold mb-4"
                style={{ fontFamily: 'var(--font-serif)', color: 'var(--green)' }}
              >
                {group.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.tools.map((tool) => (
                  <span key={tool} className="tech-badge">{tool}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}