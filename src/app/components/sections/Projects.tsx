'use client'
import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ExternalLink, Star, ArrowRight } from 'lucide-react'
import { GithubIcon } from '../../../lib/icons'
import { projects } from '../../../lib/data'

const PROJECT_ICONS: Record<string, string> = {
  'Student Admission Management System':              '🎓',
  'CI/CD Pipeline with Monitoring for Logistics Platform': '🔄',
  'Automated CI/CD Infrastructure Deployment':        '🏗️',
}

export default function Projects() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section id="projects" className="section">
      <div className="section-inner">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="section-tag mx-auto w-fit mb-4">Featured Projects</div>
          <h2 className="font-bold mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.9rem)', letterSpacing: '-0.025em' }}>
            Projects built with{' '}
            <span className="grad-text">real intent</span>
          </h2>
          <p className="text-sm max-w-lg mx-auto" style={{ color: 'var(--text-3)' }}>
            From Salesforce CRM automation to containerized DevOps pipelines and Terraform infrastructure — each project demonstrates production-ready thinking.
          </p>
        </motion.div>

        {/* Project cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              onHoverStart={() => setHovered(i)}
              onHoverEnd={() => setHovered(null)}
              className="rounded-2xl relative overflow-hidden flex flex-col"
              style={{
                background: 'rgba(13,19,35,0.75)',
                border: `1px solid ${hovered === i ? project.color + '40' : 'rgba(148,163,184,0.08)'}`,
                backdropFilter: 'blur(20px)',
                transition: 'border-color 0.3s ease',
                transform: hovered === i ? 'translateY(-6px)' : 'translateY(0)',
              }}
            >
              {/* Top color accent bar */}
              <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${project.color}, ${project.color}44)` }} />

              {/* Card top */}
              <div className="p-6 flex-1">
                {/* Icon + meta row */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
                    style={{
                      background: `${project.color}12`,
                      border: `1px solid ${project.color}28`,
                      boxShadow: hovered === i ? `0 0 20px ${project.color}30` : 'none',
                      transition: 'box-shadow 0.3s ease',
                    }}
                  >
                    {PROJECT_ICONS[project.title] ?? '📦'}
                  </div>
                  <div className="flex items-center gap-2">
                    {project.featured && (
                      <span
                        className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
                        style={{ background: `${project.color}12`, border: `1px solid ${project.color}30`, color: project.color }}
                      >
                        <Star size={9} />
                        Featured
                      </span>
                    )}
                    <span className="text-xs" style={{ color: 'var(--text-4)' }}>{project.year}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-bold mb-2 leading-tight" style={{ fontSize: '1rem', color: 'var(--text)' }}>
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-xs mb-4 leading-relaxed" style={{ color: 'var(--text-3)' }}>
                  {project.description}
                </p>

                {/* Bullets */}
                <ul className="space-y-1.5 mb-4">
                  {project.bullets.slice(0, 3).map((b, bi) => (
                    <li key={bi} className="flex items-start gap-2 text-xs" style={{ color: 'var(--text-4)' }}>
                      <ArrowRight size={10} style={{ color: project.color, marginTop: '3px', flexShrink: 0 }} />
                      {b}
                    </li>
                  ))}
                </ul>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {project.tech.map(t => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-full text-xs font-medium"
                      style={{
                        background: `${project.color}0e`,
                        border: `1px solid ${project.color}22`,
                        color: project.color,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card footer */}
              <div
                className="px-6 py-4 flex items-center gap-3"
                style={{ borderTop: '1px solid rgba(148,163,184,0.07)' }}
              >
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-semibold transition-all duration-200 hover:opacity-80"
                  style={{ color: 'var(--text-3)' }}
                >
                  <GithubIcon size={13} />
                  View Code
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-semibold ml-auto transition-all duration-200"
                    style={{ color: project.color }}
                  >
                    Live Demo
                    <ExternalLink size={11} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <a
            href="https://github.com/Imstark25"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline inline-flex"
          >
            <GithubIcon size={15} />
            <span>See all projects on GitHub</span>
            <ExternalLink size={13} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}