'use client'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ExternalLink, GitBranch, Calendar, Play } from 'lucide-react'
import { projects } from '../../../lib/data'
import { useStore } from '../../../store/useStore'

/* ── 3D Project Card ────────────────────────────── */
function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef  = useRef<HTMLDivElement>(null)
  const openModal = useStore((s) => s.openModal)
  const setCursor = useStore((s) => s.setCursorVariant)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 })
  const brightness = useSpring(useTransform(x, [-0.5, 0.5], [0.95, 1.05]), { stiffness: 300, damping: 30 })

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const gradients = [
    'from-blue-600 via-indigo-600 to-purple-600',
    'from-purple-600 via-pink-600 to-rose-500',
    'from-cyan-500 via-blue-500 to-indigo-600',
  ]
  const glows = [
    'rgba(59,130,246,0.25)',
    'rgba(139,92,246,0.25)',
    'rgba(6,182,212,0.25)',
  ]

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      style={{ rotateX, rotateY, transformPerspective: 1000, filter: `brightness(${brightness.get()})` }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative rounded-2xl overflow-hidden"
    >
      {/* Glow on hover */}
      <div
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
        style={{ background: `radial-gradient(ellipse at center, ${glows[index % 3]}, transparent 70%)` }}
      />

      <div className="relative glass-card rounded-2xl overflow-hidden h-full flex flex-col">
        {/* Top color bar */}
        <div className={`h-1 bg-gradient-to-r ${gradients[index % 3]} w-full`} />

        {/* Header area */}
        <div className={`relative p-6 pb-4 bg-gradient-to-br ${gradients[index % 3]} bg-opacity-10`}>
          <div className="absolute inset-0 opacity-[0.06]" style={{
            background: `radial-gradient(ellipse at top left, white 0%, transparent 70%)`
          }} />

          <div className="flex items-start justify-between relative">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Calendar size={12} className="text-white/60" />
                <span className="text-xs text-white/60 font-medium">{project.year}</span>
                {project.featured && (
                  <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider bg-white/15 rounded-full text-white/80">
                    FEATURED
                  </span>
                )}
              </div>
              <h3 className="text-lg font-bold text-white leading-tight max-w-[280px]">
                {project.title}
              </h3>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col flex-1">
          <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">
            {project.description}
          </p>

          {/* Tech badges */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tech.map(t => (
              <span key={t} className="tech-badge">{t}</span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4 border-t border-white/5">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setCursor('button')}
              onMouseLeave={() => setCursor('default')}
              className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white font-medium transition-colors group/link"
            >
              <GitBranch size={16} className="group-hover/link:text-blue-400 transition-colors" />
              <span>Source</span>
            </a>
            <button
              onClick={() => openModal(project.title, project.demo || '#')}
              onMouseEnter={() => setCursor('button')}
              onMouseLeave={() => setCursor('default')}
              className="ml-auto flex items-center gap-1.5 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors group/link"
            >
              <Play size={14} className="group-hover/link:scale-110 transition-transform" />
              <span>Live Preview</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Section ────────────────────────────────────── */
export default function Projects() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="ambient-blob w-96 h-96 bg-purple-600/10 top-0 left-0" />
      <div className="ambient-blob w-80 h-80 bg-blue-600/08 bottom-0 right-0" style={{ animationDelay: '5s' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-tag mx-auto w-fit">Portfolio</div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base">
            Real-world cloud infrastructure and DevOps projects built with modern tooling.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/Imstark25"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost inline-flex"
          >
            <GitBranch size={18} />
            View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}