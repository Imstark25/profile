'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ExternalLink, Award, CheckCircle } from 'lucide-react'
import { certifications } from '../../../lib/data'

const CERT_ICONS: Record<string, string> = {
  AWS:  '⚡',
  DB:   '🔷',
  AI:   '🤖',
}

export default function Certifications() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section id="certifications" className="section">
      <div className="section-inner">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="section-tag mx-auto w-fit mb-4">
            <Award size={11} />
            Certifications
          </div>
          <h2 className="font-bold mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.9rem)', letterSpacing: '-0.025em' }}>
            Verified{' '}
            <span style={{ background: 'linear-gradient(135deg, #FF9900, #ffb347)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              credentials
            </span>{' '}
            &amp; expertise
          </h2>
          <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--text-3)' }}>
            Industry-recognized certifications spanning cloud architecture, generative AI, and developer tooling.
          </p>
        </motion.div>

        {/* Cert cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {certifications.map((cert, i) => (
            <motion.a
              key={cert.name}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.2 } }}
              className="block p-5 rounded-2xl relative overflow-hidden group"
              style={{
                background: 'rgba(13,19,35,0.75)',
                border: `1px solid ${cert.border}`,
                backdropFilter: 'blur(20px)',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              {/* Glow on hover */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${cert.glow}, transparent)` }}
              />

              {/* Featured badge */}
              {cert.featured && (
                <div
                  className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
                  style={{ background: 'rgba(255,153,0,0.12)', border: '1px solid rgba(255,153,0,0.28)', color: '#FF9900' }}
                >
                  <CheckCircle size={9} />
                  Featured
                </div>
              )}

              {/* Badge icon */}
              <div className="relative mb-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                  style={{
                    background: cert.glow,
                    border: `1px solid ${cert.border}`,
                    boxShadow: `0 0 20px ${cert.color}20`,
                  }}
                >
                  {CERT_ICONS[cert.badge] ?? '🏅'}
                </div>
              </div>

              {/* Content */}
              <div className="relative">
                <div className="text-xs font-semibold mb-1 uppercase tracking-wide" style={{ color: cert.color }}>
                  {cert.issuer}
                </div>
                <div className="text-sm font-bold mb-2 leading-snug" style={{ color: 'var(--text)' }}>
                  {cert.name}
                </div>
                <div className="text-xs" style={{ color: 'var(--text-4)' }}>
                  Issued {cert.year}
                </div>
              </div>

              {/* Verify link */}
              <div
                className="relative mt-4 pt-4 flex items-center gap-1.5 text-xs font-semibold transition-all duration-200 group-hover:gap-2"
                style={{ borderTop: `1px solid ${cert.border}`, color: cert.color }}
              >
                <ExternalLink size={11} />
                Verify Certificate
              </div>
            </motion.a>
          ))}
        </div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium"
            style={{
              background: 'rgba(16,185,129,0.06)',
              border: '1px solid rgba(16,185,129,0.18)',
              color: '#10b981',
            }}
          >
            <CheckCircle size={12} />
            AWS Certified Solutions Architect – Associate · Active &amp; Verified
          </div>
        </motion.div>
      </div>
    </section>
  )
}
