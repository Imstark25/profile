'use client'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Cloud, Container, Terminal, Brain, Server, Sparkles } from 'lucide-react'
import { personal, stats } from '../../../lib/data'

const pillars = [
  {
    icon: Cloud,
    title: 'Cloud & AWS',
    desc: 'Hands-on with EC2, S3, IAM, Lambda — building practical cloud environments.',
    color: 'var(--cyan)',
    glow: 'rgba(6,182,212,0.12)',
    border: 'rgba(6,182,212,0.20)',
  },
  {
    icon: Container,
    title: 'DevOps',
    desc: 'Docker, CI/CD pipelines, GitHub Actions — automating everything from code to deploy.',
    color: 'var(--violet-light)',
    glow: 'rgba(139,92,246,0.12)',
    border: 'rgba(139,92,246,0.22)',
  },
  {
    icon: Terminal,
    title: 'Linux & Python',
    desc: 'Comfortable in the terminal — scripting, automation, and system-level work.',
    color: '#10b981',
    glow: 'rgba(16,185,129,0.10)',
    border: 'rgba(16,185,129,0.20)',
  },
  {
    icon: Brain,
    title: 'AI / ML',
    desc: 'Databricks Gen AI certified — exploring ML models, embeddings, and LLM applications.',
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.10)',
    border: 'rgba(245,158,11,0.20)',
  },
  {
    icon: Server,
    title: 'Backend Dev',
    desc: 'Node.js, REST APIs, databases — building the invisible engines behind great products.',
    color: '#f43f5e',
    glow: 'rgba(244,63,94,0.10)',
    border: 'rgba(244,63,94,0.20)',
  },
  {
    icon: Sparkles,
    title: 'Always Learning',
    desc: 'Kubernetes, Terraform, Grafana — constantly expanding the depth of the stack.',
    color: 'var(--violet-light)',
    glow: 'rgba(139,92,246,0.10)',
    border: 'rgba(139,92,246,0.18)',
  },
]

function StatCard({ value, label, index }: { value: string; label: string; index: number }) {
  const colors = [
    { from: '#8B5CF6', to: '#a78bfa' },
    { from: '#06B6D4', to: '#22d3ee' },
    { from: '#10b981', to: '#34d399' },
    { from: '#f59e0b', to: '#fbbf24' },
  ]
  const c = colors[index % colors.length]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5, type: 'spring', stiffness: 200 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="p-5 rounded-2xl text-center"
      style={{
        background: 'rgba(15,23,42,0.7)',
        border: '1px solid rgba(148,163,184,0.08)',
        backdropFilter: 'blur(16px)',
      }}
    >
      <div
        className="text-3xl font-extrabold mb-1 tracking-tight"
        style={{
          background: `linear-gradient(135deg, ${c.from}, ${c.to})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {value}
      </div>
      <div className="text-xs font-medium" style={{ color: 'var(--text-4)' }}>
        {label}
      </div>
    </motion.div>
  )
}

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="section">
      <div className="section-inner">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-tag mx-auto w-fit mb-4">About me</div>
          <h2
            className="font-bold mb-4"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-0.025em' }}
          >
            Turning curiosity into{' '}
            <span className="grad-text">working systems</span>
          </h2>
          <p
            className="text-base max-w-xl mx-auto leading-relaxed"
            style={{ color: 'var(--text-3)' }}
          >
            {personal.summary}
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">

          {/* Left — bio text */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65 }}
          >
            {/* Terminal-style intro card */}
            <div
              className="rounded-2xl p-6 mb-6 font-mono text-sm"
              style={{
                background: 'rgba(9,12,26,0.9)',
                border: '1px solid rgba(148,163,184,0.09)',
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#f43f5e' }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#f59e0b' }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#10b981' }} />
                <span className="ml-2 text-xs" style={{ color: 'var(--text-4)' }}>whoami.sh</span>
              </div>
              <div style={{ color: 'var(--cyan-light)', lineHeight: 1.9 }}>
                <span style={{ color: 'var(--text-4)' }}>$ </span>
                <span style={{ color: '#a78bfa' }}>cat</span>
                {' '}about.json<br />
                <span style={{ color: 'var(--text-4)' }}>{'{'}</span>
                <br />
                <span style={{ color: 'var(--text-4)', paddingLeft: '1rem' }}>&quot;name&quot;: </span>
                <span style={{ color: '#34d399' }}>&quot;{personal.name}&quot;</span>,<br />
                <span style={{ color: 'var(--text-4)', paddingLeft: '1rem' }}>&quot;role&quot;: </span>
                <span style={{ color: '#34d399' }}>&quot;MCA Graduate&quot;</span>,<br />
                <span style={{ color: 'var(--text-4)', paddingLeft: '1rem' }}>&quot;focus&quot;: </span>
                <span style={{ color: '#34d399' }}>&quot;DevOps + Cloud + AI&quot;</span>,<br />
                <span style={{ color: 'var(--text-4)', paddingLeft: '1rem' }}>&quot;location&quot;: </span>
                <span style={{ color: '#34d399' }}>&quot;{personal.location}&quot;</span>,<br />
                <span style={{ color: 'var(--text-4)', paddingLeft: '1rem' }}>&quot;status&quot;: </span>
                <span style={{ color: '#10b981' }}>&quot;Open to Work ✓&quot;</span><br />
                <span style={{ color: 'var(--text-4)' }}>{'}'}</span>
              </div>
            </div>

            <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--text-3)' }}>
              I&apos;m a fresher MCA graduate from Chennai with a deep interest in
              {' '}<span style={{ color: 'var(--violet-light)', fontWeight: 500 }}>cloud infrastructure</span>,
              {' '}<span style={{ color: 'var(--cyan-light)', fontWeight: 500 }}>DevOps practices</span>, and
              {' '}<span style={{ color: '#f59e0b', fontWeight: 500 }}>AI/ML applications</span>.
            </p>
            <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--text-3)' }}>
              My journey started with curiosity about how the internet works — and evolved into
              building CI/CD pipelines, containerized apps, and cloud environments. I learn by
              building, breaking, and rebuilding until things work beautifully.
            </p>

            {/* Philosophy bullets */}
            <div className="space-y-3">
              {[
                'Ship fast, learn faster — iterate until it&apos;s right',
                'Infrastructure as code is poetry in motion',
                'Every system is a design problem first',
              ].map((t, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span
                    className="mt-1 w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
                    style={{ background: 'rgba(139,92,246,0.15)', color: 'var(--violet-light)' }}
                  >
                    ✓
                  </span>
                  <span
                    dangerouslySetInnerHTML={{ __html: t }}
                    className="text-sm"
                    style={{ color: 'var(--text-3)' }}
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — pillar cards */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="p-4 rounded-xl cursor-default"
                style={{
                  background: p.glow,
                  border: `1px solid ${p.border}`,
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                  style={{ background: `${p.glow}`, border: `1px solid ${p.border}` }}
                >
                  <p.icon size={16} style={{ color: p.color }} />
                </div>
                <div className="text-sm font-semibold mb-1" style={{ color: 'var(--text-2)' }}>
                  {p.title}
                </div>
                <div className="text-xs leading-relaxed" style={{ color: 'var(--text-4)' }}>
                  {p.desc}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stats.map((s, i) => (
            <StatCard key={i} value={s.value} label={s.label} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}