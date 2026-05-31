'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Briefcase, GraduationCap, Trophy, BookOpen } from 'lucide-react'
import { experiences } from '../../../lib/data'

const TYPE_CONFIG = {
  internship:  { icon: Briefcase,       color: '#00A1E0', label: 'Internship',   glow: 'rgba(0,161,224,0.2)'   },
  project:     { icon: GraduationCap,   color: '#a78bfa', label: 'Project',      glow: 'rgba(167,139,250,0.2)' },
  achievement: { icon: Trophy,          color: '#FF9900', label: 'Achievement',  glow: 'rgba(255,153,0,0.2)'   },
  learning:    { icon: BookOpen,        color: '#10b981', label: 'Self-Learning', glow: 'rgba(16,185,129,0.2)'  },
}

export default function Journey() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section id="experience" className="section" style={{ background: 'rgba(8,12,22,0.45)' }}>
      <div className="section-inner">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="section-tag mx-auto w-fit mb-4">
            <Briefcase size={11} />
            Experience
          </div>
          <h2 className="font-bold mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.9rem)', letterSpacing: '-0.025em' }}>
            My{' '}
            <span className="grad-text">journey</span>{' '}
            so far
          </h2>
          <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--text-3)' }}>
            From internship to certifications — building real-world experience across Salesforce, AWS, and Flutter development.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div
            className="absolute left-5 top-0 bottom-0 w-px hidden sm:block"
            style={{ background: 'linear-gradient(180deg, #00A1E0, #a78bfa, #10b981, transparent)' }}
          />

          <div className="space-y-6">
            {experiences.map((exp, i) => {
              const cfg = TYPE_CONFIG[exp.type as keyof typeof TYPE_CONFIG] ?? TYPE_CONFIG.learning
              const Icon = cfg.icon

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                  className="relative sm:pl-16"
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute left-0 top-5 w-10 h-10 rounded-xl items-center justify-center hidden sm:flex"
                    style={{
                      background: `${cfg.color}12`,
                      border: `1px solid ${cfg.color}30`,
                      boxShadow: `0 0 16px ${cfg.color}25`,
                    }}
                  >
                    <Icon size={16} style={{ color: cfg.color }} />
                  </div>

                  {/* Card */}
                  <motion.div
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    className="p-5 rounded-2xl relative overflow-hidden"
                    style={{
                      background: 'rgba(13,19,35,0.7)',
                      border: `1px solid ${cfg.color}20`,
                      backdropFilter: 'blur(20px)',
                    }}
                  >
                    {/* Glow top strip */}
                    <div className="h-0.5 w-full mb-4" style={{ background: `linear-gradient(90deg, ${cfg.color}, ${cfg.color}33)` }} />

                    {/* Top row */}
                    <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
                      <div>
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span
                            className="px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide"
                            style={{ background: `${cfg.color}12`, border: `1px solid ${cfg.color}28`, color: cfg.color }}
                          >
                            {cfg.label}
                          </span>
                          <span className="text-xs font-medium" style={{ color: 'var(--text-4)' }}>{exp.date}</span>
                        </div>
                        <h3 className="font-bold text-base leading-tight" style={{ color: 'var(--text)' }}>
                          {exp.title}
                        </h3>
                        <div className="text-xs font-semibold mt-0.5" style={{ color: cfg.color }}>
                          {exp.company}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--text-3)' }}>
                      {exp.description}
                    </p>

                    {/* Tech chips */}
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tech.map(t => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-full text-xs font-medium"
                          style={{
                            background: `${cfg.color}0e`,
                            border: `1px solid ${cfg.color}22`,
                            color: cfg.color,
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
