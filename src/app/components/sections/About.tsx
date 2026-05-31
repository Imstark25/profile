'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { personal } from '../../../lib/data'

const HIGHLIGHTS = [
  {
    icon: '☁️',
    title: 'Salesforce Administrator',
    desc: 'Built a full Student Admission CRM system using Salesforce — custom objects, Flow automation, reports, and role-based access.',
    color: '#00A1E0',
    glow: 'rgba(0,161,224,0.12)',
    border: 'rgba(0,161,224,0.22)',
  },
  {
    icon: '⚡',
    title: 'AWS Certified',
    desc: 'AWS Certified Solutions Architect – Associate. Hands-on with EC2, S3, IAM, Lambda, VPC, and infrastructure automation with Terraform.',
    color: '#FF9900',
    glow: 'rgba(255,153,0,0.12)',
    border: 'rgba(255,153,0,0.22)',
  },
  {
    icon: '📱',
    title: 'Flutter Developer',
    desc: 'Developed cross-platform mobile applications with Flutter and Dart during internship at Coreverse Technologies, integrating Firebase backend.',
    color: '#54C5F8',
    glow: 'rgba(84,197,248,0.12)',
    border: 'rgba(84,197,248,0.22)',
  },
]

export default function About() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="section">
      <div className="section-inner">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left: Text */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65 }}
          >
            <div className="section-tag mb-5">About Me</div>

            <h2
              className="font-bold mb-6"
              style={{ fontSize: 'clamp(1.9rem, 4vw, 2.8rem)', letterSpacing: '-0.025em', lineHeight: 1.1 }}
            >
              From{' '}
              <span style={{ color: '#54C5F8' }}>Cloud & Flutter</span>{' '}
              to{' '}
              <span style={{ color: '#00A1E0' }}>Salesforce CRM</span>
            </h2>

            <div className="space-y-4 text-sm leading-relaxed" style={{ color: 'var(--text-3)' }}>
              <p>
                I&apos;m <span style={{ color: 'var(--text)', fontWeight: 600 }}>Subash Chandra Bose A</span> — an MCA graduate from Kongu Engineering College, Chennai.
                My journey started with cloud computing and mobile development, and has since expanded into{' '}
                <span style={{ color: '#00A1E0', fontWeight: 600 }}>Salesforce CRM administration</span> — where I discovered a passion for building systems that directly impact business workflows.
              </p>
              <p>
                As a <span style={{ color: '#FF9900', fontWeight: 600 }}>Cloud & Flutter Developer Intern</span> at Coreverse Technologies, I worked on real AWS deployments and Flutter mobile apps — giving me hands-on production experience that goes beyond coursework.
              </p>
              <p>
                My <span style={{ color: '#FF9900', fontWeight: 600 }}>AWS Certified Solutions Architect – Associate</span> credential, paired with my final-year Salesforce CRM project, positions me uniquely at the intersection of cloud infrastructure and CRM platforms — ideal for modern enterprise roles.
              </p>
              <p>
                I hold a strong belief that the best engineers understand both the business context and the technical stack. That&apos;s what drives my interest in Salesforce: bridging CRM and cloud.
              </p>
            </div>

            {/* MCA badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-8 inline-flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{
                background: 'rgba(167,139,250,0.07)',
                border: '1px solid rgba(167,139,250,0.2)',
              }}
            >
              <span className="text-xl">🎓</span>
              <div>
                <div className="text-sm font-bold" style={{ color: 'var(--text)' }}>Master of Computer Applications (MCA)</div>
                <div className="text-xs" style={{ color: 'var(--text-4)' }}>Kongu Engineering College · 2023 – 2025 · Chennai, India</div>
              </div>
            </motion.div>

            {/* Key facts */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="mt-4 grid grid-cols-2 gap-3"
            >
              {[
                { label: 'Location',       value: 'Chennai, India',     icon: '📍' },
                { label: 'Availability',   value: 'Immediately',         icon: '✅' },
                { label: 'Role Target',    value: '2026 Graduate Jobs',  icon: '🎯' },
                { label: 'AWS Cert',       value: 'SAA-C03 Certified',   icon: '⚡' },
              ].map(fact => (
                <div
                  key={fact.label}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(148,163,184,0.07)' }}
                >
                  <span className="text-sm">{fact.icon}</span>
                  <div>
                    <div className="text-xs" style={{ color: 'var(--text-4)' }}>{fact.label}</div>
                    <div className="text-xs font-semibold" style={{ color: 'var(--text-2)' }}>{fact.value}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Highlight cards */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="space-y-4"
          >
            {HIGHLIGHTS.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="p-5 rounded-2xl relative overflow-hidden"
                style={{
                  background: 'rgba(13,19,35,0.7)',
                  border: `1px solid ${h.border}`,
                  backdropFilter: 'blur(20px)',
                }}
              >
                {/* Glow */}
                <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 80% 50% at 0% 50%, ${h.glow}, transparent)` }} />

                <div className="relative flex items-start gap-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: h.glow, border: `1px solid ${h.border}` }}
                  >
                    {h.icon}
                  </div>
                  <div>
                    <div className="text-sm font-bold mb-1.5" style={{ color: h.color }}>{h.title}</div>
                    <div className="text-xs leading-relaxed" style={{ color: 'var(--text-3)' }}>{h.desc}</div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* What I'm looking for card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.56 }}
              className="p-5 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(0,161,224,0.06), rgba(84,197,248,0.04))',
                border: '1px solid rgba(0,161,224,0.18)',
              }}
            >
              <div className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: '#00A1E0' }}>
                🎯 Targeting 2026 Graduate Roles
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Salesforce Admin', 'Salesforce Developer',
                  'Cloud Engineer', 'AWS Associate',
                  'Flutter Developer', 'DevOps Engineer',
                ].map(role => (
                  <span
                    key={role}
                    className="px-2.5 py-1 rounded-full text-xs font-medium"
                    style={{ background: 'rgba(0,161,224,0.08)', border: '1px solid rgba(0,161,224,0.2)', color: '#54C5F8' }}
                  >
                    {role}
                  </span>
                ))}
              </div>
            </motion.div>

            {personal.location && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.65 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl"
                style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.18)' }}
              >
                <span className="w-2 h-2 rounded-full" style={{ background: '#10b981', boxShadow: '0 0 8px rgba(16,185,129,0.8)' }} />
                <span className="text-xs font-semibold" style={{ color: '#10b981' }}>
                  Open to Work · Available Immediately · {personal.location}
                </span>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}