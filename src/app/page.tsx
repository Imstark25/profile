'use client'
import Navbar     from './components/Navbar'
import Hero       from './components/sections/Hero'
import Stats      from './components/sections/About'
import Skills     from './components/sections/Skills'
import Experience from './components/sections/Experience'
import Contact    from './components/sections/Contact'
import { personal } from '../lib/data'

export default function Home() {
  return (
    <main style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      <Navbar />

      <Hero />

      <div id="stats">
        <Stats />
      </div>

      <div
        className="max-w-5xl mx-auto px-6"
        style={{ height: '1px', background: 'var(--border)' }}
      />

      <Skills />

      <div
        className="max-w-5xl mx-auto px-6"
        style={{ height: '1px', background: 'var(--border)' }}
      />

      <Experience />

      <div
        className="max-w-5xl mx-auto px-6"
        style={{ height: '1px', background: 'var(--border)' }}
      />

      <Contact />

      {/* Footer */}
      <footer
        className="py-10"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <span
              className="text-sm font-semibold"
              style={{ fontFamily: 'var(--font-serif)', color: 'var(--text)' }}
            >
              {personal.name}
            </span>
            <p
              className="text-xs text-center"
              style={{ color: 'var(--text-light)' }}
            >
              {personal.location} · © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
