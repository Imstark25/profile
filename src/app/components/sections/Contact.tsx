'use client'
import { motion } from 'framer-motion'
import { Mail, Network, Phone, MapPin, Send, CheckCircle2, Globe } from 'lucide-react'
import { useState } from 'react'
import { personal } from '../../../lib/data'

const contacts = [
  {
    icon: Mail,
    label: 'Email',
    value: personal.email,
    href: `mailto:${personal.email}`,
    color: '#3b82f6',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: personal.phone,
    href: `tel:${personal.phone}`,
    color: '#10b981',
  },
  {
    icon: Network,
    label: 'LinkedIn',
    value: 'subash-chandra-bose-a',
    href: personal.linkedin,
    color: '#0a66c2',
  },
  {
    icon: Globe,
    label: 'GitHub',
    value: 'Imstark25',
    href: personal.github,
    color: '#8b5cf6',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: personal.location,
    href: '#',
    color: '#f59e0b',
  },
]


export default function Contact() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setSent(true) }, 1800)
  }

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Big ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[400px] bg-blue-600/08 rounded-[100%] blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-tag mx-auto w-fit">Contact</div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-gray-500 max-w-md mx-auto text-base">
            Available for new opportunities, collaborations, or just a friendly chat.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* ── Left: Contact Links ─── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold text-white mb-2">
              Let&apos;s <span className="text-gradient">collaborate</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              I&apos;m currently open to new DevOps, Cloud, or Flutter roles. Whether you have a project in mind
              or want to discuss cloud architecture — I&apos;m just a message away.
            </p>

            <div className="space-y-3">
              {contacts.map((c, i) => (
                <motion.a
                  key={i}
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ x: 6 }}
                  className="flex items-center gap-4 p-4 glass-card rounded-xl group"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                    style={{ background: `${c.color}18`, border: `1px solid ${c.color}25` }}
                  >
                    <c.icon size={18} style={{ color: c.color }} />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 font-semibold tracking-wider uppercase">{c.label}</div>
                    <div className="text-sm text-gray-200 group-hover:text-white transition-colors font-medium">{c.value}</div>
                  </div>
                  <div
                    className="ml-auto h-5 w-0 group-hover:w-8 rounded-full transition-all duration-400 shrink-0 opacity-70"
                    style={{ background: `linear-gradient(90deg, ${c.color}, transparent)` }}
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Form ─── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <div className="glass-card rounded-2xl p-7 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/08 rounded-full blur-[60px]" />

              {sent ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center gap-4"
                >
                  <div className="w-16 h-16 bg-emerald-500/15 rounded-full flex items-center justify-center">
                    <CheckCircle2 size={32} className="text-emerald-400" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Message Sent!</h4>
                  <p className="text-gray-400 text-sm max-w-xs">
                    Thanks for reaching out. I&apos;ll get back to you as soon as possible.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 relative">
                  <h3 className="text-lg font-bold text-white mb-5">Send a message</h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-400 font-medium mb-1.5 block">Your Name</label>
                      <input
                        type="text" required placeholder="John Doe"
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 font-medium mb-1.5 block">Your Email</label>
                      <input
                        type="email" required placeholder="john@example.com"
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-gray-400 font-medium mb-1.5 block">Subject</label>
                    <input
                      type="text" placeholder="DevOps opportunity / Collaboration"
                      className="form-input"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-400 font-medium mb-1.5 block">Message</label>
                    <textarea
                      rows={5} required placeholder="Hi Subash, I'd love to..."
                      className="form-input custom-scrollbar"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}