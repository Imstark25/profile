'use client'
import { motion } from 'framer-motion'

const nowItems = [
  {
    emoji: '☁️',
    title: 'AWS Solutions Architect – Professional',
    desc: 'Deepening expertise in advanced AWS architecture patterns, multi-region deployments, and cost optimization.',
    status: 'Studying',
    color: '#FF9900',
  },
  {
    emoji: '🔧',
    title: 'Platform Engineering & SRE',
    desc: 'Learning SLOs, error budgets, incident response frameworks, and building internal developer platforms.',
    status: 'Exploring',
    color: '#8b5cf6',
  },
  {
    emoji: '🤖',
    title: 'AI/ML in Cloud Infrastructure',
    desc: 'Integrating ML pipelines with AWS SageMaker, Databricks, and automating intelligent deployment decisions.',
    status: 'Building',
    color: '#06b6d4',
  },
  {
    emoji: '📱',
    title: 'Flutter Advanced Patterns',
    desc: 'Mastering clean architecture, advanced animations, and cross-platform performance in Dart & Flutter.',
    status: 'Practicing',
    color: '#10b981',
  },
]

export default function Now() {
  return (
    <section id="now" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.5, ease: [0.4,0,0.2,1] }}
          className="mb-12"
        >
          <div className="section-tag">📡 Live Status</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: 'var(--text)' }}>
            What I&apos;m <span className="text-gradient">Doing Now</span>
          </h2>
          <p className="text-sm max-w-md" style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>
            What I&apos;m currently learning, building, and exploring.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {nowItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="glass-card rounded-2xl p-6 group relative overflow-hidden"
            >
              {/* Glow */}
              <div
                className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[40px]"
                style={{ background: item.color }}
              />

              <div className="flex items-start gap-4 relative">
                <span className="text-2xl shrink-0 mt-0.5">{item.emoji}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold" style={{ color: 'var(--text)' }}>{item.title}</h3>
                    <span
                      className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full shrink-0 ml-2"
                      style={{
                        background: `${item.color}15`,
                        color: item.color,
                        border: `1px solid ${item.color}28`,
                      }}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)', lineHeight: 1.65 }}>
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Bottom accent */}
              <div
                className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-700 rounded-full"
                style={{ background: `linear-gradient(90deg, ${item.color}, transparent)` }}
              />
            </motion.div>
          ))}
        </div>

        {/* Last updated */}
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.5 }}
          className="text-center text-xs text-gray-600 mt-8"
        >
          Last updated · April 2026
        </motion.p>
      </div>
    </section>
  )
}
