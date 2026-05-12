'use client'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ExternalLink, ArrowRight, Star } from 'lucide-react'
import { GithubIcon } from '../../../lib/icons'

interface Project {
  title: string
  year: string
  description: string
  bullets: string[]
  tech: string[]
  link: string
  demo: string
  featured: boolean
  gradient: string
  icon: string
  accent: string
}

const projects: Project[] = [
  {
    title: 'ML Calorie Prediction System',
    year: '2025',
    description: 'A machine learning model that predicts calorie intake from food images using computer vision and a trained regression model.',
    bullets: [
      'Built with Python, scikit-learn, and OpenCV for image preprocessing',
      'REST API backend using FastAPI with Docker containerization',
      'Trained on custom dataset — 87% accuracy on validation set',
    ],
    tech: ['Python', 'FastAPI', 'scikit-learn', 'Docker', 'OpenCV'],
    link: 'https://github.com/Imstark25',
    demo: '',
    featured: true,
    gradient: 'linear-gradient(135deg, rgba(139,92,246,0.3) 0%, rgba(6,182,212,0.15) 100%)',
    icon: '🧠',
    accent: '#8B5CF6',
  },
  {
    title: 'Node.js CRUD Student App',
    year: '2024',
    description: 'Full-stack student management application with complete CRUD operations, JWT authentication, and responsive UI.',
    bullets: [
      'Node.js + Express REST API with MongoDB Atlas backend',
      'JWT authentication with role-based access control',
      'Deployed on AWS EC2 with Nginx reverse proxy',
    ],
    tech: ['Node.js', 'Express', 'MongoDB', 'JWT', 'AWS EC2', 'Nginx'],
    link: 'https://github.com/Imstark25',
    demo: '',
    featured: true,
    gradient: 'linear-gradient(135deg, rgba(6,182,212,0.25) 0%, rgba(16,185,129,0.15) 100%)',
    icon: '⚡',
    accent: '#06B6D4',
  },
  {
    title: 'Dockerized CI/CD Pipeline',
    year: '2025',
    description: 'Production-grade CI/CD pipeline that auto-builds, tests, and deploys a Node.js app to AWS EC2 on every push.',
    bullets: [
      'GitHub Actions workflow: build → test → push to Docker Hub → deploy',
      'SSH-based zero-downtime deployment with health check gates',
      'Monitoring with basic Prometheus metrics endpoint',
    ],
    tech: ['Docker', 'GitHub Actions', 'AWS EC2', 'Prometheus', 'Bash'],
    link: 'https://github.com/Imstark25',
    demo: '',
    featured: true,
    gradient: 'linear-gradient(135deg, rgba(139,92,246,0.25) 0%, rgba(244,63,94,0.12) 100%)',
    icon: '🚀',
    accent: '#f43f5e',
  },
  {
    title: 'AWS Infrastructure as Code',
    year: '2025',
    description: 'Complete AWS infrastructure provisioned via Terraform — EC2, S3, IAM, VPC all defined as code.',
    bullets: [
      'Terraform modules for reusable VPC, EC2, and S3 configurations',
      'IAM roles with least-privilege security policies',
      'Remote state management in S3 with DynamoDB locking',
    ],
    tech: ['Terraform', 'AWS', 'IAM', 'VPC', 'S3', 'EC2'],
    link: 'https://github.com/Imstark25',
    demo: '',
    featured: false,
    gradient: 'linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(6,182,212,0.12) 100%)',
    icon: '🏗️',
    accent: '#f59e0b',
  },
]

function TiltCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 })

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const handleLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ perspective: 800, rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="relative group"
    >
      <div
        className="relative rounded-2xl overflow-hidden h-full"
        style={{
          background: 'rgba(15,23,42,0.75)',
          border: '1px solid rgba(148,163,184,0.08)',
          backdropFilter: 'blur(20px)',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.borderColor = `${project.accent}44`
          ;(e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px ${project.accent}20`
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(148,163,184,0.08)'
          ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
        }}
      >
        {/* Top gradient banner */}
        <div
          className="h-36 flex items-center justify-center text-5xl relative overflow-hidden"
          style={{ background: project.gradient }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.05) 0%, transparent 60%)',
            }}
          />
          <span style={{ fontSize: '3rem', position: 'relative', zIndex: 1 }}>{project.icon}</span>
          {project.featured && (
            <div
              className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
              style={{
                background: 'rgba(245,158,11,0.15)',
                border: '1px solid rgba(245,158,11,0.3)',
                color: '#fbbf24',
              }}
            >
              <Star size={10} fill="currentColor" />
              Featured
            </div>
          )}
        </div>

        <div className="p-5">
          {/* Meta */}
          <div className="flex items-center justify-between mb-2">
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{
                background: `${project.accent}14`,
                border: `1px solid ${project.accent}30`,
                color: project.accent,
              }}
            >
              {project.year}
            </span>
          </div>

          <h3
            className="text-base font-bold mb-2"
            style={{ color: 'var(--text)', letterSpacing: '-0.01em' }}
          >
            {project.title}
          </h3>

          <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--text-4)' }}>
            {project.description}
          </p>

          {/* Bullets */}
          <ul className="space-y-1.5 mb-4">
            {project.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2">
                <ArrowRight
                  size={12}
                  className="shrink-0 mt-0.5"
                  style={{ color: project.accent }}
                />
                <span className="text-xs" style={{ color: 'var(--text-4)' }}>{b}</span>
              </li>
            ))}
          </ul>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.map(t => (
              <span
                key={t}
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(148,163,184,0.1)',
                  color: 'var(--text-3)',
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(148,163,184,0.1)',
                color: 'var(--text-3)',
                textDecoration: 'none',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'
                ;(e.currentTarget as HTMLElement).style.color = 'var(--text)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'
                ;(e.currentTarget as HTMLElement).style.color = 'var(--text-3)'
              }}
            >
              <GithubIcon size={13} />
              GitHub
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
                style={{
                  background: `${project.accent}14`,
                  border: `1px solid ${project.accent}30`,
                  color: project.accent,
                  textDecoration: 'none',
                }}
              >
                <ExternalLink size={12} />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="section-inner">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="section-tag mx-auto w-fit mb-4">Projects</div>
          <h2
            className="font-bold mb-4"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-0.025em' }}
          >
            Things I&apos;ve{' '}
            <span className="grad-text">built & shipped</span>
          </h2>
          <p className="text-sm max-w-lg mx-auto" style={{ color: 'var(--text-3)' }}>
            Real-world projects spanning cloud infrastructure, DevOps automation, ML, and backend development.
          </p>
        </motion.div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((p, i) => (
            <TiltCard key={p.title} project={p} index={i} />
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-10"
        >
          <a
            href="https://github.com/Imstark25"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            <GithubIcon size={16} />
            <span>View all on GitHub</span>
            <ArrowRight size={15} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}