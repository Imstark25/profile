'use client'
import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Mail, MapPin, Send, ArrowRight, Sparkles } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../../../lib/icons'
import { personal } from '../../../lib/data'

const links = [
  {
    label: 'Email',
    value: personal.email,
    href: `mailto:${personal.email}`,
    icon: Mail,
    color: '#8B5CF6',
    glow: 'rgba(139,92,246,0.12)',
    border: 'rgba(139,92,246,0.22)',
  },
  {
    label: 'LinkedIn',
    value: 'subash-chandra-bose-a',
    href: personal.linkedin,
    icon: LinkedinIcon,
    color: '#06B6D4',
    glow: 'rgba(6,182,212,0.10)',
    border: 'rgba(6,182,212,0.22)',
  },
  {
    label: 'GitHub',
    value: 'Imstark25',
    href: personal.github,
    icon: GithubIcon,
    color: '#10b981',
    glow: 'rgba(16,185,129,0.08)',
    border: 'rgba(16,185,129,0.22)',
  },
]

export default function Contact() {
  const ref     = useRef<HTMLDivElement>(null)
  const inView  = useInView(ref, { once: true, margin: '-80px' })
  const [form, setForm]       = useState({ name: '', email: '', message: '' })
  const [status, setStatus]   = useState<'idle' | 'sending' | 'sent'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setTimeout(() => setStatus('sent'), 1500)
  }

  return (
    <section id="contact" className="section">
      {/* Ambient glow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: '600px', height: '300px',
          background: 'radial-gradient(ellipse, rgba(139,92,246,0.10) 0%, transparent 70%)',
          filter: 'blur(60px)',
          top: 0,
        }}
      />

      <div className="section-inner relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="section-tag mx-auto w-fit mb-4">Contact</div>
          <h2
            className="font-bold mb-4"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-0.025em' }}
          >
            Let&apos;s build something{' '}
            <span className="grad-text">impactful</span>
          </h2>
          <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--text-3)' }}>
            I&apos;m actively seeking my first DevOps, Cloud, or Backend engineering role. If you have an opportunity — or just want to talk shop — I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* Left: Form */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            {status === 'sent' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-2xl text-center"
                style={{
                  background: 'rgba(16,185,129,0.06)',
                  border: '1px solid rgba(16,185,129,0.20)',
                }}
              >
                <Sparkles size={36} className="mx-auto mb-4" style={{ color: '#10b981' }} />
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text)' }}>
                  Message received! 🎉
                </h3>
                <p className="text-sm" style={{ color: 'var(--text-3)' }}>
                  Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: 'var(--text-4)' }}>
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    required
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '0.875rem 1.125rem',
                      borderRadius: '0.875rem',
                      background: 'rgba(15,23,42,0.7)',
                      border: '1px solid rgba(148,163,184,0.09)',
                      color: 'var(--text)',
                      fontSize: '0.875rem',
                      fontFamily: 'var(--font)',
                      outline: 'none',
                      transition: 'all 0.22s ease',
                      backdropFilter: 'blur(12px)',
                    }}
                    onFocus={e => {
                      e.target.style.borderColor = 'rgba(139,92,246,0.45)'
                      e.target.style.boxShadow = '0 0 0 3px rgba(139,92,246,0.12)'
                    }}
                    onBlur={e => {
                      e.target.style.borderColor = 'rgba(148,163,184,0.09)'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: 'var(--text-4)' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    required
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '0.875rem 1.125rem',
                      borderRadius: '0.875rem',
                      background: 'rgba(15,23,42,0.7)',
                      border: '1px solid rgba(148,163,184,0.09)',
                      color: 'var(--text)',
                      fontSize: '0.875rem',
                      fontFamily: 'var(--font)',
                      outline: 'none',
                      transition: 'all 0.22s ease',
                      backdropFilter: 'blur(12px)',
                    }}
                    onFocus={e => {
                      e.target.style.borderColor = 'rgba(139,92,246,0.45)'
                      e.target.style.boxShadow = '0 0 0 3px rgba(139,92,246,0.12)'
                    }}
                    onBlur={e => {
                      e.target.style.borderColor = 'rgba(148,163,184,0.09)'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: 'var(--text-4)' }}>
                    Message
                  </label>
                  <textarea
                    placeholder="Tell me about the opportunity or just say hi..."
                    rows={5}
                    required
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '0.875rem 1.125rem',
                      borderRadius: '0.875rem',
                      background: 'rgba(15,23,42,0.7)',
                      border: '1px solid rgba(148,163,184,0.09)',
                      color: 'var(--text)',
                      fontSize: '0.875rem',
                      fontFamily: 'var(--font)',
                      outline: 'none',
                      resize: 'vertical',
                      transition: 'all 0.22s ease',
                      backdropFilter: 'blur(12px)',
                    }}
                    onFocus={e => {
                      e.target.style.borderColor = 'rgba(139,92,246,0.45)'
                      e.target.style.boxShadow = '0 0 0 3px rgba(139,92,246,0.12)'
                    }}
                    onBlur={e => {
                      e.target.style.borderColor = 'rgba(148,163,184,0.09)'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn btn-primary w-full justify-center"
                  style={{ opacity: status === 'sending' ? 0.7 : 1 }}
                >
                  {status === 'sending' ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }}
                      />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Right: Links + info */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="space-y-4"
          >
            {/* Location */}
            <div
              className="flex items-center gap-3 p-4 rounded-xl"
              style={{
                background: 'rgba(15,23,42,0.6)',
                border: '1px solid rgba(148,163,184,0.07)',
              }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.2)' }}
              >
                <MapPin size={16} style={{ color: 'var(--violet-light)' }} />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: 'var(--text-4)' }}>
                  Location
                </div>
                <div className="text-sm font-medium" style={{ color: 'var(--text-2)' }}>
                  {personal.location} · Available remote
                </div>
              </div>
            </div>

            {/* Available status */}
            <div
              className="p-4 rounded-xl flex items-center gap-4"
              style={{
                background: 'rgba(16,185,129,0.06)',
                border: '1px solid rgba(16,185,129,0.18)',
              }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center text-lg"
                style={{ background: 'rgba(16,185,129,0.12)' }}
              >
                🟢
              </div>
              <div>
                <div className="text-sm font-bold" style={{ color: '#34d399' }}>Available for work</div>
                <div className="text-xs" style={{ color: 'var(--text-4)' }}>
                  Open to full-time · remote · hybrid opportunities
                </div>
              </div>
            </div>

            {/* Contact links */}
            {links.map((l, i) => (
              <motion.a
                key={l.label}
                href={l.href}
                target={l.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.25 + i * 0.1, duration: 0.45 }}
                whileHover={{ x: 4, transition: { duration: 0.18 } }}
                className="flex items-center gap-3 p-4 rounded-xl group cursor-pointer"
                style={{
                  background: l.glow,
                  border: `1px solid ${l.border}`,
                  textDecoration: 'none',
                  transition: 'border-color 0.25s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = l.color + '50'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = l.border
                }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `${l.color}18`, border: `1px solid ${l.color}30` }}
                >
                  <l.icon size={16} style={{ color: l.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: 'var(--text-4)' }}>
                    {l.label}
                  </div>
                  <div className="text-sm font-medium truncate" style={{ color: 'var(--text-2)' }}>
                    {l.value}
                  </div>
                </div>
                <ArrowRight
                  size={15}
                  style={{
                    color: 'var(--text-4)',
                    transition: 'transform 0.2s ease, color 0.2s ease',
                  }}
                  className="group-hover:text-violet-300 group-hover:translate-x-1"
                />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}