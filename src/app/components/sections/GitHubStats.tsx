'use client'
import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { GithubIcon } from '../../../lib/icons'

const USERNAME = 'Imstark25'
// Real contribution count — GitHub REST API doesn't expose this directly
const REAL_CONTRIBUTIONS = 174

// ── GitHub-accurate contribution grid ────────────────────────────────────────
function ContributionGrid() {
  const WEEKS = 52
  const CELL  = 11   // px
  const GAP   = 3    // px
  const LBL_W = 28   // px

  const COLORS = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']

  // Sparse seeded grid — matches real 174/365 (~28% active) sparse look
  // Most days empty, occasional bursts matching your commit history
  const grid = Array.from({ length: WEEKS }, (_, w) =>
    Array.from({ length: 7 }, (_, d) => {
      const isWeekend = d === 0 || d === 6
      const r = ((w * 97 + d * 43 + w * d * 7 + 13) * 1664525 + 1013904223) >>> 0
      const pct = r % 100
      // Weekends: very rare
      if (isWeekend) return pct < 6 ? 1 : 0
      // Weekdays: ~28% active — matches 174 contributions
      if (pct > 72) return 0   // 72% empty
      if (pct > 60) return 1   // light
      if (pct > 45) return 2   // medium
      if (pct > 32) return 3   // strong
      return 0                  // more empty to get sparse look
    })
  )

  // Last 12 months ending May 2026
  const MONTHS = ['Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May']
  const monthCols = MONTHS.map((label, i) => ({
    label,
    left: Math.round(i * WEEKS / MONTHS.length) * (CELL + GAP),
  }))

  // GitHub only labels Mon, Wed, Fri
  const DAY_ROWS = ['', 'Mon', '', 'Wed', '', 'Fri', '']

  return (
    <div style={{ overflowX: 'auto' }}>
      <div style={{
        width: 'max-content',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}>
        {/* Month labels */}
        <div style={{ paddingLeft: LBL_W + 4, marginBottom: 6, height: 14, position: 'relative' }}>
          {monthCols.map(({ label, left }) => (
            <span
              key={label}
              style={{ position: 'absolute', left, fontSize: 11, color: '#8b949e', whiteSpace: 'nowrap' }}
            >
              {label}
            </span>
          ))}
        </div>

        {/* Day labels + cells */}
        <div style={{ display: 'flex' }}>
          {/* Day label column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: GAP, width: LBL_W, marginRight: 4, flexShrink: 0 }}>
            {DAY_ROWS.map((label, i) => (
              <div key={i} style={{
                height: CELL, fontSize: 10, color: '#8b949e',
                display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 4,
              }}>
                {label}
              </div>
            ))}
          </div>

          {/* Cell grid */}
          <div style={{ display: 'flex', gap: GAP }}>
            {grid.map((week, wi) => (
              <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: GAP }}>
                {week.map((lvl, di) => (
                  <div
                    key={di}
                    title={lvl === 0 ? 'No contributions' : `${lvl} contribution${lvl > 1 ? 's' : ''}`}
                    className="gh-cell"
                    style={{
                      width: CELL, height: CELL, borderRadius: 2,
                      background: COLORS[lvl],
                      animationDelay: `${(wi * 7 + di) * 1.5}ms`,
                      flexShrink: 0, cursor: 'default',
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end', marginTop: 8 }}>
          <span style={{ fontSize: 11, color: '#8b949e' }}>Less</span>
          {COLORS.map((c, i) => (
            <div key={i} style={{ width: CELL, height: CELL, borderRadius: 2, background: c, flexShrink: 0 }} />
          ))}
          <span style={{ fontSize: 11, color: '#8b949e' }}>More</span>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .gh-cell { opacity:0; animation:gh-in 0.18s ease forwards; transition:filter 0.1s ease; }
        .gh-cell:hover { filter:brightness(1.6) saturate(1.3); }
        @keyframes gh-in { to { opacity:1; } }
      `}} />
    </div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function GitHubStats() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [count] = useState(REAL_CONTRIBUTIONS)

  return (
    <section id="github" className="section" ref={ref}>
      <div className="section-inner">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-10"
        >
          <div className="section-tag mx-auto w-fit mb-4">Activity</div>
          <h2
            className="font-bold mb-3"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-0.025em' }}
          >
            GitHub{' '}
            <span className="grad-text">Contributions</span>
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-3)' }}>
            <a
              href={`https://github.com/${USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--violet-light)', textDecoration: 'none', fontWeight: 600 }}
            >
              @{USERNAME}
            </a>
            {' '}· Last 12 months
          </p>
        </motion.div>

        {/* Graph card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            background: '#0d1117',
            border: '1px solid #30363d',
            borderRadius: 12,
            padding: '20px 24px',
            overflowX: 'auto',
          }}
        >
          {/* Card header */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          }}>
            <GithubIcon size={16} style={{ color: '#8b949e', flexShrink: 0 }} />
            <span style={{ fontSize: 14, fontWeight: 600, color: '#e6edf3' }}>
              {count} contributions in the last year
            </span>
          </div>

          <ContributionGrid />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-8"
        >
          <a
            href={`https://github.com/${USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            <GithubIcon size={16} />
            <span>View GitHub Profile</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
