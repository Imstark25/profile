'use client'
import { motion } from 'framer-motion'
import Navbar     from './components/Navbar'
import Hero       from './components/sections/Hero'
import About      from './components/sections/About'
import Projects   from './components/sections/Projects'
import Skills     from './components/sections/Skills'
import Experience from './components/sections/Experience'
import Now        from './components/sections/Now'
import Contact    from './components/sections/Contact'

export default function Home() {
  return (
    <motion.main
      className="overflow-x-hidden"
      style={{ background: 'var(--bg)', color: 'var(--text)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Navbar />

      <div id="home">   <Hero />       </div>
      <div id="about">  <About />      </div>
      <div id="projects"><Projects />  </div>
      <div id="skills"> <Skills />     </div>
      <div id="experience"><Experience /></div>
      <div id="now">    <Now />        </div>
      <div id="contact"><Contact />    </div>

      {/* Footer */}
      <footer
        className="relative py-10 mt-8 overflow-hidden"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600
                              flex items-center justify-center text-xs font-black text-white">
                S
              </div>
              <span className="text-sm font-bold" style={{ color: 'var(--text-muted)' }}>
                STARK<span className="text-blue-500">.</span>
              </span>
            </div>
            <p className="text-xs text-center" style={{ color: 'var(--text-muted)', opacity: 0.5 }}>
              © {new Date().getFullYear()} Subash Chandra Bose A · DevOps Engineer · AWS Certified
            </p>
            <div className="flex items-center gap-5">
              {[
                { label: 'GitHub',   href: 'https://github.com/Imstark25' },
                { label: 'LinkedIn', href: 'https://linkedin.com/in/subash-chandra-bose-a-177284301' },
                { label: 'Email',    href: 'mailto:subash.a2502@gmail.com' },
              ].map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                   className="text-xs font-medium transition-colors"
                   style={{ color: 'var(--text-muted)', opacity: 0.6 }}
                   onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                   onMouseLeave={e => (e.currentTarget.style.opacity = '0.6')}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </motion.main>
  )
}
