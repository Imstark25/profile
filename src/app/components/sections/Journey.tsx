'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Award, BookOpen, Trophy, Rocket, Code2, GraduationCap, Cpu } from 'lucide-react'

const timeline = [
  {
    year: '2025',
    title: 'MCA Graduate',
    org: 'Kongu Engineering College, Erode',
    desc: 'Completed Master of Computer Applications with focus on cloud computing, software engineering, and AI fundamentals. Graduated with distinction.',
    tags: ['MCA', 'Cloud Computing', 'Algorithms', 'DBMS'],
    icon: GraduationCap,
    color: '#8B5CF6',
    glow: 'rgba(139,92,246,0.15)',
    type: 'education',
  },
  {
    year: '2024–25',
    title: 'AWS Cloud Quest — 1st Place',
    org: 'Department Hackathon, KEC',
    desc: 'Won department-level AWS Cloud Quest challenge. Demonstrated hands-on EC2, S3, IAM, and Lambda knowledge under time pressure — beating peers from all final-year batches.',
    tags: ['AWS EC2', 'S3', 'IAM', 'Lambda', '🏆 Winner'],
    icon: Trophy,
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.15)',
    type: 'achievement',
  },
  {
    year: '2024–25',
    title: 'DevOps CI/CD Final Year Project',
    org: 'Personal + Academic',
    desc: 'Built a full CI/CD pipeline from scratch using GitHub Actions + Docker + AWS EC2. First real encounter with production-style DevOps workflows.',
    tags: ['GitHub Actions', 'Docker', 'AWS EC2', 'Node.js'],
    icon: Rocket,
    color: '#06B6D4',
    glow: 'rgba(6,182,212,0.15)',
    type: 'project',
  },
  {
    year: '2024',
    title: 'AWS Certifications',
    org: 'Amazon Web Services',
    desc: 'Earned AWS Solutions Architect Associate and multiple AWS Educate completions. Alongside Databricks Generative AI Fundamentals certification — cementing cloud + AI skills.',
    tags: ['AWS SAA', 'AWS Educate', 'Databricks GenAI'],
    icon: Award,
    color: '#10b981',
    glow: 'rgba(16,185,129,0.15)',
    type: 'certification',
  },
  {
    year: '2023–24',
    title: 'Backend & Full-Stack Learning',
    org: 'Personal Projects',
    desc: 'Built CRUD apps with Node.js, Express, and MongoDB. Explored JWT authentication, REST API design patterns, and deployment on EC2. Code got progressively better, and so did the confidence.',
    tags: ['Node.js', 'Express', 'MongoDB', 'REST APIs', 'JWT'],
    icon: Code2,
    color: '#f43f5e',
    glow: 'rgba(244,63,94,0.15)',
    type: 'learning',
  },
  {
    year: '2023',
    title: 'Linux & Python Deep Dive',
    org: 'Self-study',
    desc: 'Switched daily driver to Linux. Fell in love with the terminal. Started writing Bash scripts, Python automation tools, and cron jobs. Infrastructure started making sense.',
    tags: ['Linux', 'Python', 'Bash', 'Cron', 'Automation'],
    icon: BookOpen,
    color: '#a78bfa',
    glow: 'rgba(167,139,250,0.15)',
    type: 'learning',
  },
  {
    year: 'Now →',
    title: 'Targeting Cloud & DevOps Roles',
    org: 'Open to opportunities',
    desc: 'Actively building, learning Kubernetes and Terraform deeper, contributing to open source, and preparing for cloud/DevOps/backend engineering roles at product companies and startups.',
    tags: ['Kubernetes', 'Terraform', 'Open Source', 'Hiring'],
    icon: Cpu,
    color: '#8B5CF6',
    glow: 'rgba(139,92,246,0.15)',
    type: 'current',
  },
]

function TimelineItem({ item, index }: { item: typeof timeline[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -32 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      className="relative flex gap-5 sm:gap-8"
    >
      {/* Timeline column */}
      <div className="flex flex-col items-center" style={{ width: '44px', flexShrink: 0 }}>
        {/* Glowing dot */}
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : { scale: 0 }}
          transition={{ delay: index * 0.08 + 0.2, type: 'spring', stiffness: 300 }}
          className="w-11 h-11 rounded-2xl flex items-center justify-center relative z-10"
          style={{
            background: item.glow,
            border: `1px solid ${item.color}40`,
            boxShadow: inView ? `0 0 20px ${item.color}30` : 'none',
            transition: 'box-shadow 0.5s ease',
          }}
        >
          <item.icon size={18} style={{ color: item.color }} />
        </motion.div>

        {/* Vertical line */}
        {index < timeline.length - 1 && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.6, delay: index * 0.08 + 0.35, ease: [0.4, 0, 0.2, 1] }}
            style={{
              width: '1px',
              flex: 1,
              marginTop: '8px',
              background: `linear-gradient(180deg, ${item.color}60, transparent)`,
              transformOrigin: 'top',
              minHeight: '2rem',
            }}
          />
        )}
      </div>

      {/* Content */}
      <motion.div
        whileHover={{ x: 4, transition: { duration: 0.2 } }}
        className="flex-1 pb-10"
      >
        <div
          className="p-5 rounded-2xl cursor-default"
          style={{
            background: 'rgba(15,23,42,0.65)',
            border: `1px solid rgba(148,163,184,0.07)`,
            backdropFilter: 'blur(16px)',
            transition: 'border-color 0.3s ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.borderColor = `${item.color}30`
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(148,163,184,0.07)'
          }}
        >
          <div className="flex flex-wrap items-start gap-3 mb-2">
            <span
              className="text-xs font-bold px-2.5 py-1 rounded-full"
              style={{
                background: `${item.color}14`,
                border: `1px solid ${item.color}30`,
                color: item.color,
              }}
            >
              {item.year}
            </span>
            <span
              className="text-xs px-2.5 py-1 rounded-full"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(148,163,184,0.08)',
                color: 'var(--text-4)',
              }}
            >
              {item.type}
            </span>
          </div>

          <h3
            className="text-base font-bold mb-0.5"
            style={{ color: 'var(--text)', letterSpacing: '-0.01em' }}
          >
            {item.title}
          </h3>
          <p className="text-xs mb-3 font-medium" style={{ color: item.color }}>
            {item.org}
          </p>
          <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-4)' }}>
            {item.desc}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {item.tags.map(t => (
              <span
                key={t}
                className="text-xs px-2.5 py-0.5 rounded-full font-medium"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(148,163,184,0.09)',
                  color: 'var(--text-3)',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Journey() {
  return (
    <section id="journey" className="section" style={{ background: 'rgba(10,14,26,0.4)' }}>
      <div className="section-inner">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="section-tag mx-auto w-fit mb-4">Journey</div>
          <h2
            className="font-bold mb-4"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-0.025em' }}
          >
            From zero to{' '}
            <span className="grad-text">cloud-native</span>
          </h2>
          <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--text-3)' }}>
            Every expert was once a beginner. This is my story — the milestones, the certifications, and the code.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-2xl mx-auto">
          {timeline.map((item, i) => (
            <TimelineItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
