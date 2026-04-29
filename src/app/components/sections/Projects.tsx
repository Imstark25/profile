'use client'
import { motion } from 'framer-motion'
import { ExternalLink, GitBranch, Calendar, Play } from 'lucide-react'
import { projects } from '../../../lib/data'
import { useStore } from '../../../store/useStore'

const accentColors = [
  { bar: 'from-blue-500 to-indigo-600',   dot: '#3b82f6' },
  { bar: 'from-purple-500 to-pink-600',   dot: '#8b5cf6' },
  { bar: 'from-cyan-500 to-blue-500',     dot: '#06b6d4' },
]

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const openModal = useStore((s) => s.openModal)
  const accent    = accentColors[index % accentColors.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -4, scale: 1.015 }}
      className="group relative rounded-2xl glass-card overflow-hidden flex flex-col h-full
                 transition-shadow duration-300 hover:shadow-[0_16px_40px_rgba(0,0,0,0.22)]"
    >
      {/* Top accent bar */}
      <div className={`h-[3px] bg-gradient-to-r ${accent.bar} w-full shrink-0`} />

      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-2 mb-2">
          <Calendar size={11} style={{ color: 'var(--text-muted)', opacity: 0.7 }} />
          <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
            {project.year}
          </span>
          {project.featured && (
            <span
              className="px-2 py-0.5 text-[10px] font-bold tracking-wider rounded-full"
              style={{ background: `${accent.dot}18`, color: accent.dot }}
            >
              FEATURED
            </span>
          )}
        </div>
        <h3 className="text-lg font-bold leading-tight" style={{ color: 'var(--text)' }}>
          {project.title}
        </h3>
      </div>

      {/* Body */}
      <div className="px-6 pb-6 flex flex-col flex-1">
        <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: 'var(--text-muted)' }}>
          {project.description}
        </p>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.map(t => (
            <span key={t} className="tech-badge">{t}</span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium transition-colors"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            <GitBranch size={15} />
            <span>Source</span>
          </a>
          <button
            onClick={() => openModal(project.title, project.demo || '#')}
            className="ml-auto flex items-center gap-1.5 text-sm font-semibold text-blue-400
                       hover:text-blue-300 transition-colors"
          >
            <Play size={13} />
            <span>Live Preview</span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Section ────────────────────────────────────── */
export default function Projects() {
  return (
    <section className="py-28 relative overflow-hidden">
      {/* Minimal decorative blob */}
      <div
        className="ambient-blob w-72 h-72 top-12 left-0"
        style={{ background: 'rgba(139,92,246,0.07)' }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-14"
        >
          <div className="section-tag mx-auto w-fit">Portfolio</div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-3" style={{ color: 'var(--text)' }}>
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="max-w-lg mx-auto text-base" style={{ color: 'var(--text-muted)' }}>
            Real-world cloud infrastructure and DevOps projects built with modern tooling.
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
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-center mt-10"
        >
          <a
            href="https://github.com/Imstark25"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost inline-flex"
          >
            <GitBranch size={17} />
            View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}