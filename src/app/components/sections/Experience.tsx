'use client'
import { experiences } from '../../../lib/data'

export default function Experience() {
  return (
    <section id="experience" className="py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="mb-12">
          <div className="section-tag">Journey</div>
          <h2
            className="text-3xl md:text-4xl font-semibold mb-3"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Experience
          </h2>
          <p className="text-sm max-w-md" style={{ color: 'var(--text-muted)' }}>
            Where I&apos;ve built infrastructure and shipped reliable systems.
          </p>
        </div>

        {/* Stacked Card List */}
        <div className="space-y-4">
          {experiences.map((exp, i) => (
            <div
              key={i}
              className="card p-6 md:p-8"
              style={{ cursor: 'default' }}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">

                {/* Left: Year */}
                <div className="md:w-[140px] shrink-0">
                  <span
                    className="text-xs font-bold tracking-wider uppercase"
                    style={{ color: 'var(--green)' }}
                  >
                    {exp.date}
                  </span>
                </div>

                {/* Right: Content */}
                <div className="flex-1">
                  <h3
                    className="text-lg md:text-xl font-semibold mb-1"
                    style={{ fontFamily: 'var(--font-serif)', color: 'var(--text)' }}
                  >
                    {exp.title}
                  </h3>
                  <p
                    className="text-sm font-medium mb-3"
                    style={{ color: 'var(--green)' }}
                  >
                    {exp.company}
                  </p>
                  <p
                    className="text-sm leading-relaxed mb-4"
                    style={{ color: 'var(--text-muted)', lineHeight: 1.75 }}
                  >
                    {exp.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <span key={t} className="tech-badge">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}