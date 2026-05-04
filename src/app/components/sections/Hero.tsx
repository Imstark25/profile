'use client'
import { personal } from '../../../lib/data'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center"
      style={{ paddingTop: '6rem' }}
    >
      <div className="max-w-5xl mx-auto px-6 w-full py-16 md:py-24">
        <div className="max-w-2xl">

          {/* Italic headline */}
          <p
            className="text-lg md:text-xl mb-4"
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              color: 'var(--green)',
              fontWeight: 400,
            }}
          >
            &ldquo;{personal.headline}&rdquo;
          </p>

          {/* Name + Title */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-4"
            style={{ fontFamily: 'var(--font-serif)', lineHeight: 1.1 }}
          >
            {personal.name}
          </h1>

          {/* One-line bio */}
          <p
            className="text-base md:text-lg leading-relaxed mb-8 max-w-xl"
            style={{ color: 'var(--text-muted)' }}
          >
            {personal.bio}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#experience"
              className="btn-primary"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              View My Work
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <a
              href="#contact"
              className="btn-ghost"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>

      {/* Decorative element — subtle corner accent */}
      <div
        className="absolute bottom-0 right-0 w-64 h-64 opacity-[0.04] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, var(--green) 0%, transparent 70%)',
        }}
      />
    </section>
  )
}
