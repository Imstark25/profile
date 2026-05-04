'use client'
import { personal } from '../../../lib/data'

const contactLinks = [
  {
    label: 'Email',
    value: personal.email,
    href:  `mailto:${personal.email}`,
    icon:  '✉️',
  },
  {
    label: 'LinkedIn',
    value: 'subash-chandra-bose-a',
    href:  personal.linkedin,
    icon:  '🔗',
  },
  {
    label: 'GitHub',
    value: 'Imstark25',
    href:  personal.github,
    icon:  '🐙',
  },
]

export default function Contact() {
  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="mb-12">
          <div className="section-tag">Connect</div>
          <h2
            className="text-3xl md:text-4xl font-semibold mb-3"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Get in Touch
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left: Quote */}
          <div>
            <blockquote
              className="text-xl md:text-2xl leading-relaxed mb-6"
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                color: 'var(--text)',
                borderLeft: '3px solid var(--green)',
                paddingLeft: '1.5rem',
              }}
            >
              &ldquo;The best infrastructure is the one no one notices — it just works, every time, at any scale.&rdquo;
            </blockquote>
            <p
              className="text-sm leading-relaxed"
              style={{ color: 'var(--text-muted)' }}
            >
              I&apos;m always open to discussing DevOps challenges, cloud architecture,
              or collaboration opportunities. Let&apos;s build something reliable together.
            </p>
          </div>

          {/* Right: 3 Contact Links */}
          <div className="space-y-3">
            {contactLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="card flex items-center gap-4 p-5 group"
                style={{ textDecoration: 'none' }}
              >
                <span className="text-xl shrink-0">{link.icon}</span>
                <div className="flex-1 min-w-0">
                  <div
                    className="text-[11px] font-bold tracking-wider uppercase mb-0.5"
                    style={{ color: 'var(--text-light)' }}
                  >
                    {link.label}
                  </div>
                  <div
                    className="text-sm font-medium truncate transition-colors duration-200"
                    style={{ color: 'var(--text)' }}
                  >
                    {link.value}
                  </div>
                </div>
                <svg
                  width="16" height="16" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"
                  className="shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                  style={{ color: 'var(--text-light)' }}
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}