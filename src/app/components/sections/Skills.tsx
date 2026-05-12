'use client'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'

const categories = [
  {
    label: 'Cloud',
    color: '#06B6D4',
    glow: 'rgba(6,182,212,0.10)',
    border: 'rgba(6,182,212,0.18)',
    icon: '☁️',
    skills: [
      { name: 'AWS EC2', level: 65 },
      { name: 'AWS S3', level: 70 },
      { name: 'AWS IAM', level: 60 },
      { name: 'AWS Lambda', level: 50 },
      { name: 'AWS Educate', level: 75 },
      { name: 'VPC & Security', level: 45 },
    ],
  },
  {
    label: 'DevOps',
    color: '#8B5CF6',
    glow: 'rgba(139,92,246,0.10)',
    border: 'rgba(139,92,246,0.20)',
    icon: '🔁',
    skills: [
      { name: 'Docker', level: 65 },
      { name: 'Docker Compose', level: 60 },
      { name: 'GitHub Actions', level: 58 },
      { name: 'CI/CD Pipelines', level: 55 },
      { name: 'Bash Scripting', level: 62 },
      { name: 'Linux Admin', level: 65 },
    ],
  },
  {
    label: 'Programming',
    color: '#10b981',
    glow: 'rgba(16,185,129,0.08)',
    border: 'rgba(16,185,129,0.18)',
    icon: '🐍',
    skills: [
      { name: 'Python', level: 60 },
      { name: 'JavaScript', level: 55 },
      { name: 'TypeScript', level: 45 },
      { name: 'Bash', level: 60 },
      { name: 'YAML / JSON', level: 70 },
      { name: 'HCL (Terraform)', level: 40 },
    ],
  },
  {
    label: 'Backend',
    color: '#f43f5e',
    glow: 'rgba(244,63,94,0.08)',
    border: 'rgba(244,63,94,0.18)',
    icon: '⚙️',
    skills: [
      { name: 'Node.js', level: 55 },
      { name: 'REST APIs', level: 58 },
      { name: 'Express.js', level: 52 },
      { name: 'FastAPI', level: 40 },
      { name: 'JWT Auth', level: 48 },
      { name: 'Git / GitHub', level: 72 },
    ],
  },
  {
    label: 'Database',
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.08)',
    border: 'rgba(245,158,11,0.18)',
    icon: '🗄️',
    skills: [
      { name: 'MongoDB', level: 55 },
      { name: 'MySQL', level: 60 },
      { name: 'PostgreSQL', level: 42 },
      { name: 'S3 (Object Store)', level: 65 },
      { name: 'Redis basics', level: 35 },
    ],
  },
  {
    label: 'Tools & AI',
    color: '#a78bfa',
    glow: 'rgba(167,139,250,0.08)',
    border: 'rgba(167,139,250,0.18)',
    icon: '🤖',
    skills: [
      { name: 'Databricks GenAI', level: 55 },
      { name: 'VS Code', level: 80 },
      { name: 'Postman', level: 65 },
      { name: 'Kubernetes (beginner)', level: 35 },
      { name: 'Terraform basics', level: 40 },
      { name: 'Grafana / Prometheus', level: 30 },
    ],
  },
]

function SkillBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="mb-3">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs font-medium" style={{ color: 'var(--text-3)' }}>{name}</span>
        <span className="text-xs font-semibold tabular-nums" style={{ color }}>{level}%</span>
      </div>
      <div
        className="h-1 rounded-full overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.05)' }}
      >
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.1, delay, ease: [0.4, 0, 0.2, 1] }}
          style={{
            background: `linear-gradient(90deg, ${color}, ${color}aa)`,
            boxShadow: `0 0 8px ${color}60`,
          }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="section" style={{ background: 'rgba(10,14,26,0.5)' }}>
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
          <h2
            className="font-bold mb-4"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-0.025em' }}
          >
            Built with the{' '}
            <span className="grad-text">modern stack</span>
          </h2>
          <p className="text-sm max-w-lg mx-auto" style={{ color: 'var(--text-3)' }}>
            A growing toolkit — from cloud infrastructure and containers to AI/ML and backend systems.
          </p>
        </motion.div>

        {/* Category grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: ci * 0.07 }}
              whileHover={{ y: -4, transition: { duration: 0.22 } }}
              className="p-5 rounded-2xl"
              style={{
                background: 'rgba(15,23,42,0.65)',
                border: `1px solid ${cat.border}`,
                backdropFilter: 'blur(16px)',
                cursor: 'default',
              }}
            >
              {/* Card header */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                  style={{ background: cat.glow, border: `1px solid ${cat.border}` }}
                >
                  {cat.icon}
                </div>
                <div>
                  <div className="text-sm font-bold" style={{ color: 'var(--text)' }}>{cat.label}</div>
                  <div className="text-xs" style={{ color: 'var(--text-4)' }}>{cat.skills.length} tools</div>
                </div>
                <div
                  className="ml-auto w-2 h-2 rounded-full"
                  style={{ background: cat.color, boxShadow: `0 0 8px ${cat.color}` }}
                />
              </div>

              {/* Skill bars */}
              <div>
                {cat.skills.map((sk, si) => (
                  <SkillBar
                    key={sk.name}
                    name={sk.name}
                    level={sk.level}
                    color={cat.color}
                    delay={ci * 0.07 + si * 0.06}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tag cloud */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 text-center"
        >
          <div className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--text-4)' }}>
            Also working with
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {['React', 'Next.js', 'Nginx', 'cron', 'boto3', 'Pandas', 'NumPy', 'Ansible', 'Vim', 'tmux', 'SSH', 'Prometheus'].map(t => (
              <span key={t} className="skill-chip">{t}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}