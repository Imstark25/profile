'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Briefcase, GraduationCap, CheckCircle2 } from 'lucide-react'
import { experiences, certifications } from '../../../lib/data'

function TimelineItem({
  exp,
  index,
}: {
  exp: (typeof experiences)[0]
  index: number
}) {
  const isWork = exp.type === 'work'
  const isLeft = index % 2 === 0

  return (
    <div className="relative grid grid-cols-[1fr_auto_1fr] gap-4 items-start">
      {/* Left content */}
      <div className={`${isLeft ? '' : 'opacity-0 pointer-events-none'}`}>
        {isLeft && (
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card rounded-2xl p-6 text-right"
          >
            <ExperienceCard exp={exp} />
          </motion.div>
        )}
      </div>

      {/* Center dot */}
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15, type: 'spring', stiffness: 250 }}
          className={`relative w-12 h-12 rounded-full border-2 flex items-center justify-center z-10 shadow-lg shrink-0 ${
            isWork
              ? 'bg-[#0b1121] border-blue-500 shadow-blue-500/30'
              : 'bg-[#0b1121] border-purple-500 shadow-purple-500/30'
          }`}
        >
          {isWork
            ? <Briefcase size={18} className="text-blue-400" />
            : <GraduationCap size={18} className="text-purple-400" />}

        </motion.div>
      </div>

      {/* Right content */}
      <div className={`${!isLeft ? '' : 'opacity-0 pointer-events-none'}`}>
        {!isLeft && (
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card rounded-2xl p-6"
          >
            <ExperienceCard exp={exp} />
          </motion.div>
        )}
      </div>
    </div>
  )
}

function ExperienceCard({ exp }: { exp: (typeof experiences)[0] }) {
  const isWork = exp.type === 'work'
  return (
    <div>
      <span className={`inline-block text-xs font-bold tracking-wider uppercase mb-2 ${isWork ? 'text-blue-400' : 'text-purple-400'}`}>
        {exp.date}
      </span>
      <h3 className="text-lg font-bold text-white mb-0.5">{exp.title}</h3>
      <p className={`text-sm font-medium mb-4 ${isWork ? 'text-blue-400/80' : 'text-purple-400/80'}`}>{exp.company}</p>
      <ul className="space-y-1.5">
        {exp.bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2 text-gray-400 text-xs leading-relaxed">
            <CheckCircle2 size={12} className={`mt-0.5 shrink-0 ${isWork ? 'text-blue-500/60' : 'text-purple-500/60'}`} />
            {b}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section className="py-28 relative overflow-hidden" ref={containerRef}>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="section-tag mx-auto w-fit">Journey</div>
          <h2 className="text-4xl md:text-5xl font-extrabold">
            Experience &amp; <span className="text-gradient">Education</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Static background line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/[0.06] -translate-x-1/2" />
          {/* Animated fill line */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-1/2 top-0 w-px -translate-x-1/2 origin-top z-0 bg-gradient-to-b from-blue-500 to-purple-500"
          />

          <div className="space-y-16 relative z-10">
            {experiences.map((exp, i) => (
              <TimelineItem key={i} exp={exp} index={i} />
            ))}
          </div>
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-24"
        >
          <div className="text-center mb-10">
            <div className="section-tag mx-auto w-fit">Credentials</div>
            <h3 className="text-2xl md:text-3xl font-extrabold">
              <span className="text-gradient">Certifications</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {certifications.map((cert, i) => (
              <motion.a
                key={i}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -4 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 200 }}
                className="glass-card rounded-2xl p-5 flex flex-col gap-3 group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-base font-bold"
                    style={{ background: `${cert.color}20`, color: cert.color, border: `1px solid ${cert.color}30` }}
                  >
                    ✦
                  </div>
                  <span
                    className="text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded-full"
                    style={{ background: `${cert.color}15`, color: cert.color }}
                  >
                    Verified
                  </span>
                </div>
                <div>
                  <p className="text-sm font-bold text-white leading-snug mb-1 group-hover:text-blue-300 transition-colors">
                    {cert.name}
                  </p>
                  <p className="text-xs text-gray-500">{cert.issuer}</p>
                </div>
                <div
                  className="h-0.5 w-0 group-hover:w-full rounded-full transition-all duration-500"
                  style={{ background: `linear-gradient(90deg, ${cert.color}, transparent)` }}
                />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}