'use client'
import Navbar     from './components/Navbar'
import Hero       from './components/sections/Hero'
import Stats      from './components/sections/About'
import Skills     from './components/sections/Skills'
import Experience from './components/sections/Experience'
import Contact    from './components/sections/Contact'
import { personal } from '../lib/data'

function GradientDivider() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6">
      <div
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.25), rgba(34,211,238,0.15), transparent)',
        }}
      />
    </div>
  )
}

export default function Home() {
  return (
    <main style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      <Navbar />
      <Hero />

      <div id="stats">
        <Stats />
      </div>

      <GradientDivider />
      <Skills />

      <GradientDivider />
      <Experience />

      <GradientDivider />
      <Contact />

      {/* Footer */}
      <footer
        className="py-8 sm:py-10 mt-2"
        style={{ borderTop: '1px solid rgba(99,102,241,0.1)' }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: 'linear-gradient(135deg, var(--primary), var(--cyan))' }}
              />
              <span
                className="text-sm font-semibold"
                style={{ fontFamily: 'var(--font-serif)', color: 'var(--text)' }}
              >
                {personal.name}
              </span>
            </div>
            <p className="text-xs" style={{ color: 'var(--text-light)' }}>
              {personal.location} · © {new Date().getFullYear()} · Built with ❤️
            </p>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ background: 'var(--emerald)' }} />
              <span className="text-xs font-medium" style={{ color: 'var(--emerald)' }}>Open to work</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
