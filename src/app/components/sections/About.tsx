'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Cloud, Server, Code2, Database, Trophy, Star } from 'lucide-react'
import { personal, achievements } from '../../../lib/data'

const highlights = [
  {
    icon: Cloud,
    color: '#3b82f6',
    bg: 'rgba(59,130,246,0.12)',
    title: 'Cloud Engineering',
    desc: 'AWS (EC2, S3, ECS, EKS, Lambda)',
  },
  {
    icon: Server,
    color: '#8b5cf6',
    bg: 'rgba(139,92,246,0.12)',
    title: 'DevOps',
    desc: 'CI/CD · Docker · Kubernetes',
  },
  {
    icon: Code2,
    color: '#06b6d4',
    bg: 'rgba(6,182,212,0.12)',
    title: 'Automation',
    desc: 'Terraform · GitHub Actions · IaC',
  },
  {
    icon: Database,
    color: '#10b981',
    bg: 'rgba(16,185,129,0.12)',
    title: 'Monitoring',
    desc: 'Prometheus · Grafana · CloudWatch',
  },
]

const stats = [
  { label: 'Projects Shipped',     value: '3+' },
  { label: 'AWS Certifications',   value: '3' },
  { label: 'Years Exp.',           value: '1+' },
  { label: 'Technologies',         value: '15+' },
]

export default function About() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Ambient */}
      <div className="ambient-blob w-96 h-96 bg-blue-600/10 top-0 right-0" />
      <div className="ambient-blob w-64 h-64 bg-purple-600/08 bottom-0 left-0" style={{ animationDelay: '4s' }} />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="section-tag mx-auto w-fit">About Me</div>
          <h2 className="text-4xl md:text-5xl font-extrabold">
            Who I <span className="text-gradient">Am</span>
          </h2>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, type: 'spring', stiffness: 200 }}
              className="glass-card rounded-2xl p-5 text-center"
            >
              <div className="text-3xl md:text-4xl font-extrabold text-gradient mb-1">{s.value}</div>
              <div className="text-xs text-gray-500 font-medium tracking-wide">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left — Bio + Achievement */}
          <motion.div
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6 }}
          >
            {/* Profile Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
              className="relative mb-8 flex items-center gap-6"
            >
              {/* Photo with glow ring */}
              <div className="relative shrink-0">
                <div className="absolute -inset-[3px] rounded-3xl bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-400 opacity-90 blur-[3px]" />
                <div className="relative w-28 h-36 rounded-3xl overflow-hidden border border-white/10">
                  <Image
                    src="/profile.jpg"
                    alt="Subash Chandra Bose A"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>
                {/* Online badge */}
                <span className="absolute -bottom-1.5 -right-1.5 flex items-center gap-1 bg-[#0b1121] border border-white/10 rounded-full px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse inline-block" />
                  Available
                </span>
              </div>

              {/* Name + title beside photo */}
              <div>
                <h3 className="text-2xl font-extrabold text-white leading-tight mb-1">
                  Subash<br />
                  <span className="text-gradient">Chandra Bose A</span>
                </h3>
                <p className="text-blue-400 text-xs font-semibold tracking-widest uppercase mb-2">DevOps · AWS · Flutter</p>
                <p className="text-gray-500 text-xs">{personal.location}</p>
              </div>
            </motion.div>
            <div className="glass-card rounded-2xl p-7 mb-6">
              <p className="text-gray-300 leading-relaxed text-[0.95rem] mb-4">
                {personal.summary}
              </p>
              <p className="text-gray-400 leading-relaxed text-[0.93rem]">
                With a strong foundation in infrastructure automation and system monitoring, I bridge
                the gap between development and operations — continuously focused on automated deployment
                pipelines and resilient distributed systems.
              </p>
            </div>

            {/* Achievement card */}
            {achievements.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: 0.2 }}
                className="relative glass-card rounded-2xl p-6 border border-yellow-500/20 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/10 rounded-full blur-[40px]" />
                <div className="flex gap-4 items-start relative">
                  <span className="text-3xl">{a.icon}</span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Trophy size={14} className="text-yellow-400" />
                      <span className="text-yellow-400 text-xs font-bold tracking-wider uppercase">Achievement</span>
                    </div>
                    <h4 className="font-bold text-white text-sm mb-1">{a.title}</h4>
                    <p className="text-gray-400 text-xs leading-relaxed">{a.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right — Highlight cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className="glass-card rounded-2xl p-6 group cursor-default"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{ background: item.bg }}
                >
                  <item.icon size={22} style={{ color: item.color }} />
                </div>
                <h3 className="text-base font-bold text-white mb-1">{item.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>

                {/* Bottom accent */}
                <div
                  className="mt-4 h-0.5 w-0 group-hover:w-full rounded-full transition-all duration-500"
                  style={{ background: `linear-gradient(90deg, ${item.color}, transparent)` }}
                />
              </motion.div>
            ))}

            {/* Areas of Interest card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.4 }}
              className="glass-card rounded-2xl p-6 sm:col-span-2"
            >
              <div className="flex items-center gap-2 mb-4">
                <Star size={14} className="text-blue-400" />
                <span className="text-blue-400 text-xs font-bold tracking-wider uppercase">Areas of Interest</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Cloud Engineering', 'DevOps', 'Platform Engineering', 'Infrastructure Automation', 'Flutter Dev'].map(tag => (
                  <span key={tag} className="tech-badge">{tag}</span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}