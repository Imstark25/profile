'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Activity, GitCommit, Star, TrendingUp, Zap } from 'lucide-react'
import { GithubIcon } from '../../../lib/icons'
import { personal } from '../../../lib/data'

const githubStats = [
  { label: 'Public Repos',   value: '8+',  icon: GithubIcon, color: '#8B5CF6', glow: 'rgba(139,92,246,0.15)' },
  { label: 'Total Stars',    value: '12',  icon: Star,       color: '#f59e0b', glow: 'rgba(245,158,11,0.12)' },
  { label: 'Commits (YTD)', value: '200+', icon: GitCommit,  color: '#06B6D4', glow: 'rgba(6,182,212,0.12)' },
  { label: 'Contributions', value: '150+', icon: Activity,   color: '#10b981', glow: 'rgba(16,185,129,0.12)' },
]

const techActivity = [
  { name: 'YAML',          pct: 35, color: '#f59e0b' },
  { name: 'Python',        pct: 28, color: '#8B5CF6' },
  { name: 'JavaScript',    pct: 18, color: '#06B6D4' },
  { name: 'Bash',          pct: 12, color: '#10b981' },
  { name: 'Dockerfile',    pct: 7,  color: '#f43f5e' },
]

/* Simple contribution grid simulation */
function ContributionGrid() {
  const weeks = 26
  const days  = 7
  const grid  = Array.from({ length: weeks }, (_, w) =>
    Array.from({ length: days }, (_, d) => {
      const seed = w * 7 + d
      const r    = (seed * 2654435761) >>> 0
      const lvl  = r % 4 // 0–3 intensity
      return lvl
    })
  )

  const colors = [
    'rgba(148,163,184,0.06)',
    'rgba(139,92,246,0.25)',
    'rgba(139,92,246,0.50)',
    'rgba(139,92,246,0.85)',
  ]

  return (
    <div style={{ overflowX: 'auto' }}>
      <div className="flex gap-1" style={{ width: 'max-content' }}>
        {grid.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((lvl, di) => (
              <div
                key={di}
                className="w-3 h-3 rounded-sm contrib-cell"
                style={{
                  background: colors[lvl],
                  animationDelay: `${(wi * 7 + di) * 4}ms`,
                }}
              />
            ))}
          </div>
        ))}
      </div>
      {/* Single CSS rule handles all 182 cells — zero JS overhead */}
      <style dangerouslySetInnerHTML={{ __html: `
        .contrib-cell {
          opacity: 0;
          animation: cell-in 0.3s ease forwards;
        }
        @keyframes cell-in {
          to { opacity: 1; }
        }
      `}} />
    </div>
  )
}


export default function GitHubStats() {
  return (
    <section id="github" className="section">
      <div className="section-inner">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="section-tag mx-auto w-fit mb-4">Activity</div>
          <h2
            className="font-bold mb-4"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-0.025em' }}
          >
            GitHub &{' '}
            <span className="grad-text">Coding Stats</span>
          </h2>
          <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--text-3)' }}>
            The graph of curiosity — commits, experiments, and shipped code.
          </p>
        </motion.div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {githubStats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-4 rounded-2xl text-center cursor-default"
              style={{
                background: s.glow,
                border: `1px solid ${s.color}25`,
                backdropFilter: 'blur(16px)',
              }}
            >
              <s.icon size={20} className="mx-auto mb-2" style={{ color: s.color }} />
              <div
                className="text-2xl font-extrabold mb-0.5"
                style={{
                  color: s.color,
                  textShadow: `0 0 20px ${s.color}60`,
                }}
              >
                {s.value}
              </div>
              <div className="text-xs" style={{ color: 'var(--text-4)' }}>{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Main grid: contribution + languages */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

          {/* Contribution graph */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 p-5 rounded-2xl"
            style={{
              background: 'rgba(15,23,42,0.7)',
              border: '1px solid rgba(148,163,184,0.08)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <GithubIcon size={16} style={{ color: 'var(--violet-light)' }} />
              <span className="text-sm font-semibold" style={{ color: 'var(--text-2)' }}>
                Contribution Activity
              </span>
              <span className="ml-auto text-xs" style={{ color: 'var(--text-4)' }}>Last 26 weeks</span>
            </div>
            <ContributionGrid />
            <div className="flex items-center gap-2 mt-4 justify-end">
              <span className="text-xs" style={{ color: 'var(--text-4)' }}>Less</span>
              {['rgba(148,163,184,0.06)', 'rgba(139,92,246,0.25)', 'rgba(139,92,246,0.50)', 'rgba(139,92,246,0.85)'].map((c, i) => (
                <div key={i} className="w-3 h-3 rounded-sm" style={{ background: c }} />
              ))}
              <span className="text-xs" style={{ color: 'var(--text-4)' }}>More</span>
            </div>
          </motion.div>

          {/* Language stats */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 p-5 rounded-2xl"
            style={{
              background: 'rgba(15,23,42,0.7)',
              border: '1px solid rgba(148,163,184,0.08)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp size={16} style={{ color: 'var(--cyan-light)' }} />
              <span className="text-sm font-semibold" style={{ color: 'var(--text-2)' }}>
                Most Used
              </span>
            </div>

            <div className="space-y-3">
              {techActivity.map((t, i) => (
                <div key={t.name}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-xs font-medium" style={{ color: 'var(--text-3)' }}>{t.name}</span>
                    <span className="text-xs font-semibold tabular-nums" style={{ color: t.color }}>{t.pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${t.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.0, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] }}
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${t.color}, ${t.color}aa)`,
                        boxShadow: `0 0 8px ${t.color}50`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Streak */}
            <div
              className="mt-5 p-3 rounded-xl flex items-center gap-3"
              style={{
                background: 'rgba(139,92,246,0.08)',
                border: '1px solid rgba(139,92,246,0.18)',
              }}
            >
              <Zap size={18} style={{ color: '#f59e0b', flexShrink: 0 }} />
              <div>
                <div className="text-xs font-bold" style={{ color: 'var(--text-2)' }}>Active learner</div>
                <div className="text-xs" style={{ color: 'var(--text-4)' }}>Commits daily — building in public</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* GitHub link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-8"
        >
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            <GithubIcon size={16} />
            <span>Visit GitHub Profile</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
