'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { skillCategories } from '../../../lib/data'

function SkillBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <div ref={ref} className="mb-3.5">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs font-medium" style={{ color: 'var(--text-3)' }}>{name}</span>
        <span className="text-xs font-bold tabular-nums" style={{ color }}>{level}%</span>
      </div>
      <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: [0.4, 0, 0.2, 1] }}
          style={{
            background: `linear-gradient(90deg, ${color}, ${color}bb)`,
            boxShadow: `0 0 10px ${color}55`,
          }}
        />
      </div>
    </div>
  )
}

const CATEGORY_META = [
  {
    description: 'CRM platform administration & automation',
    tags: ['Salesforce CRM', 'Flow Builder', 'Apex basics', 'SOQL'],
  },
  {
    description: 'AWS certified cloud & container orchestration',
    tags: ['EC2', 'S3', 'IAM', 'VPC', 'K8s', 'Helm'],
  },
  {
    description: 'Cross-platform apps, scripting & databases',
    tags: ['Flutter', 'Dart', 'Firebase Auth', 'Firestore', 'REST'],
  },
]

export default function Skills() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="section" style={{ background: 'rgba(8,12,22,0.45)' }}>
      <div className="section-inner">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="section-tag mx-auto w-fit mb-4">Technical Skills</div>
          <h2 className="font-bold mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.9rem)', letterSpacing: '-0.025em' }}>
            The{' '}
            <span style={{ background: 'linear-gradient(135deg, #00A1E0, #54C5F8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              full stack
            </span>{' '}
            I bring to every role
          </h2>
          <p className="text-sm max-w-lg mx-auto" style={{ color: 'var(--text-3)' }}>
            From Salesforce CRM administration to AWS cloud infrastructure and Flutter mobile development — a versatile toolkit built for real-world impact.
          </p>
        </motion.div>

        {/* 3-column skill cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: ci * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="p-6 rounded-2xl relative overflow-hidden"
              style={{
                background: 'rgba(13,19,35,0.7)',
                border: `1px solid ${cat.border}`,
                backdropFilter: 'blur(20px)',
              }}
            >
              {/* Subtle glow background */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{ background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${cat.glow}, transparent)` }}
              />

              {/* Card header */}
              <div className="relative flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                  style={{
                    background: cat.glow,
                    border: `1px solid ${cat.border}`,
                    boxShadow: `0 0 16px ${cat.color}25`,
                  }}
                >
                  {cat.icon}
                </div>
                <div>
                  <div className="text-sm font-bold" style={{ color: 'var(--text)' }}>{cat.label}</div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--text-4)' }}>{CATEGORY_META[ci].description}</div>
                </div>
                <div className="ml-auto flex flex-col items-end gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ background: cat.color, boxShadow: `0 0 10px ${cat.color}` }} />
                  <div className="text-xs font-semibold" style={{ color: cat.color }}>{cat.skills.length} skills</div>
                </div>
              </div>

              {/* Skill bars */}
              <div className="relative">
                {cat.skills.map((sk, si) => (
                  <SkillBar
                    key={sk.name}
                    name={sk.name}
                    level={sk.level}
                    color={cat.color}
                    delay={ci * 0.1 + si * 0.07}
                  />
                ))}
              </div>

              {/* Bottom tag cloud */}
              <div className="relative mt-4 pt-4 flex flex-wrap gap-1.5" style={{ borderTop: `1px solid ${cat.border}` }}>
                {CATEGORY_META[ci].tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-full text-xs font-medium"
                    style={{
                      background: cat.glow,
                      border: `1px solid ${cat.border}`,
                      color: cat.color,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional tech chip row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-6 text-center"
        >
          <div className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--text-4)' }}>
            Also proficient with
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              'Linux', 'Bash', 'VS Code', 'Postman', 'Nginx',
              'Prometheus', 'Grafana', 'YAML', 'HCL', 'Dart pub',
              'Git Flow', 'SSH', 'S3 Backend', 'DynamoDB', 'boto3',
            ].map(t => (
              <span key={t} className="skill-chip">{t}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}