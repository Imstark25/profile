'use client'
import { motion } from 'framer-motion'
import { ExternalLink, GitBranch, Check, Play } from 'lucide-react'
import { projects } from '../../../lib/data'
import { useStore } from '../../../store/useStore'

const accentColors = [
  { bar: 'from-blue-500 to-indigo-500',  dot: '#3b82f6' },
  { bar: 'from-violet-500 to-purple-500', dot: '#8b5cf6' },
  { bar: 'from-cyan-500 to-blue-500',    dot: '#06b6d4' },
]

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const openModal = useStore((s) => s.openModal)
  const accent    = accentColors[index % accentColors.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -3 }}
      className="group flex flex-col h-full rounded-2xl overflow-hidden glass-card
                 transition-shadow duration-300 hover:shadow-[0_12px_36px_rgba(0,0,0,0.18)]"
    >
      {/* Top accent bar */}
      <div className={`h-[3px] w-full shrink-0 bg-gradient-to-r ${accent.bar}`} />

      <div className="flex flex-col flex-1 p-6 gap-4">

        {/* Title row */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-semibold tracking-wider uppercase"
              style={{ color: accent.dot }}>{project.year}</span>
            {project.featured && (
              <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full"
                style={{ background: `${accent.dot}15`, color: accent.dot }}>
                Featured
              </span>
            )}
          </div>
          <h3 className="text-base font-bold leading-snug" style={{ color: 'var(--text)' }}>
            {project.title}
          </h3>
        </div>

        {/* Short description */}
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)', lineHeight: 1.65 }}>
          {project.description}
        </p>

        {/* Bullet highlights */}
        <ul className="space-y-1.5 flex-1">
          {project.bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
              <Check size={13} className="mt-0.5 shrink-0" style={{ color: accent.dot }} />
              <span className="leading-relaxed">{b}</span>
            </li>
          ))}
        </ul>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tech.map(t => (
            <span key={t} className="tech-badge">{t}</span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium transition-colors"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            <GitBranch size={14} />
            GitHub
          </a>
          <button
            onClick={() => openModal(project.title, project.demo || '#')}
            className="ml-auto flex items-center gap-1.5 text-sm font-semibold
                       text-blue-400 hover:text-blue-300 transition-colors"
          >
            <Play size={13} />
            Live Demo
          </button>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Section ────────────────────────────────────── */
export default function Projects() {
  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="mb-12"
        >
          <div className="section-tag">Portfolio</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: 'var(--text)' }}>
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-sm max-w-md" style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>
            Real-world cloud & DevOps projects — built, deployed, and monitored in production.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10"
        >
          <a
            href="https://github.com/Imstark25"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost inline-flex"
          >
            <GitBranch size={15} />
            View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}