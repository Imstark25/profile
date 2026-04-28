import Navbar     from './components/Navbar'
import Hero        from './components/sections/Hero'
import About       from './components/sections/About'
import Projects    from './components/sections/Projects'
import Skills      from './components/sections/Skills'
import Experience  from './components/sections/Experience'
import Contact     from './components/sections/Contact'

export default function Home() {
  return (
    <main className="bg-[#060914] text-white overflow-x-hidden">
      <Navbar />

      <div id="home">
        <Hero />
      </div>

      <div id="about">
        <About />
      </div>

      <div id="projects">
        <Projects />
      </div>

      <div id="skills">
        <Skills />
      </div>

      <div id="experience">
        <Experience />
      </div>

      <div id="contact">
        <Contact />
      </div>

      {/* Footer */}
      <footer className="relative border-t border-white/[0.06] py-10 mt-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/10 to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-black text-white">
                S
              </div>
              <span className="text-sm font-bold text-gray-300">
                STARK<span className="text-blue-500">.</span>
              </span>
            </div>
            <p className="text-xs text-gray-600 text-center">
              © {new Date().getFullYear()} Subash Chandra Bose A · DevOps Engineer · AWS Certified · Flutter Developer
            </p>
            <div className="flex items-center gap-5">
              <a href="https://github.com/Imstark25" target="_blank" rel="noopener noreferrer"
                className="text-gray-600 hover:text-white transition-colors text-xs font-medium">GitHub</a>
              <a href="https://linkedin.com/in/subash-chandra-bose-a-177284301" target="_blank" rel="noopener noreferrer"
                className="text-gray-600 hover:text-white transition-colors text-xs font-medium">LinkedIn</a>
              <a href="mailto:subash.a2502@gmail.com"
                className="text-gray-600 hover:text-white transition-colors text-xs font-medium">Email</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
