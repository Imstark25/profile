'use client'
import { stats } from '../../../lib/data'
import { useEffect, useRef, useState } from 'react'

/* ── Animated Counter ───────────────────────────── */
function useCounter(target: number, duration = 1600, active: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [active, target, duration])
  return count
}

/* ── Stat Card ──────────────────────────────────── */
function StatCard({ stat, index, visible }: { stat: { value: string; label: string }, index: number, visible: boolean }) {
  /* Parse numeric part for animation */
  const numericMatch = stat.value.match(/(\d+\.?\d*)/)
  const numericVal  = numericMatch ? parseFloat(numericMatch[1]) : 0
  const suffix      = stat.value.replace(/[\d.]/g, '')
  const count       = useCounter(numericVal, 1400 + index * 100, visible)

  const colors = [
    { grad: 'linear-gradient(135deg, #6366f1, #818cf8)', glow: 'rgba(99,102,241,0.15)' },
    { grad: 'linear-gradient(135deg, #22d3ee, #67e8f9)', glow: 'rgba(34,211,238,0.12)' },
    { grad: 'linear-gradient(135deg, #a855f7, #c084fc)', glow: 'rgba(168,85,247,0.12)' },
    { grad: 'linear-gradient(135deg, #f59e0b, #fbbf24)', glow: 'rgba(245,158,11,0.12)' },
  ]
  const c = colors[index % colors.length]

  return (
    <div
      className="card p-5 sm:p-6 text-center cursor-default animate-scale-up"
      style={{
        animationDelay: `${index * 100}ms`,
        boxShadow: visible ? `0 0 30px ${c.glow}` : 'none',
        transition: 'box-shadow 0.6s ease',
      }}
    >
      {/* Top accent bar */}
      <div
        className="h-0.5 w-12 mx-auto rounded-full mb-4"
        style={{ background: c.grad }}
      />
      <div
        className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1"
        style={{
          fontFamily: 'var(--font-serif)',
          background: c.grad,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {numericMatch ? `${count}${suffix}` : stat.value}
      </div>
      <div className="text-xs sm:text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
        {stat.label}
      </div>
    </div>
  )
}

/* ── Stats Section ──────────────────────────────── */
export default function Stats() {
  const ref     = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="stats" className="py-10 md:py-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-6" ref={ref}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  )
}