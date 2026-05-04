'use client'
import { stats } from '../../../lib/data'

export default function Stats() {
  return (
    <section id="stats" className="py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="card p-6 text-center"
              style={{ cursor: 'default' }}
            >
              <div
                className="text-3xl md:text-4xl font-bold mb-1"
                style={{ fontFamily: 'var(--font-serif)', color: 'var(--green)' }}
              >
                {stat.value}
              </div>
              <div
                className="text-xs md:text-sm font-medium"
                style={{ color: 'var(--text-muted)' }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}