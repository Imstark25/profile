'use client'
import Navbar      from './components/Navbar'
import Hero        from './components/sections/Hero'
import Stats       from './components/sections/About'
import Skills      from './components/sections/Skills'
import Experience  from './components/sections/Experience'
import Contact     from './components/sections/Contact'
import PetalCanvas from './components/PetalCanvas'
import { personal } from '../lib/data'

function GradientDivider() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6">
      <div
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(232,84,122,0.22), rgba(249,168,201,0.18), transparent)',
        }}
      />
    </div>
  )
}

export default function Home() {
  return (
    <main style={{ background: 'var(--bg)', color: 'var(--text)', position: 'relative' }}>
      {/* 🌸 Falling petals — sits behind all content */}
      <PetalCanvas />

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
        style={{ borderTop: '1px solid rgba(232,84,122,0.12)' }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: 'linear-gradient(135deg, var(--primary), var(--petal))' }}
              />
              <span
                className="text-sm font-semibold"
                style={{ fontFamily: 'var(--font-serif)', color: 'var(--text)' }}
              >
                {personal.name}
              </span>
            </div>
            <p className="text-xs" style={{ color: 'var(--text-light)' }}>
              {personal.location} · © {new Date().getFullYear()} · Built with 🌸
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
