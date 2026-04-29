'use client'
import { motion } from 'framer-motion'
import { skillGroups } from '../../../lib/data'

function SkillBar({ name, level, delay, color }: { name: string; level: number; delay: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-gray-300 font-medium">{name}</span>
        <span className="text-xs font-bold" style={{ color }}>{level}%</span>
      </div>
      <div className="skill-bar-track">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay, ease: 'easeOut' }}
          className="skill-bar-fill"
          style={{ background: `linear-gradient(90deg, ${color}bb, ${color})` }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section className="py-28 relative overflow-hidden">

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-tag mx-auto w-fit">Expertise</div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Technical <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base">
            My technology stack and proficiency across cloud, DevOps, and development domains.
          </p>
        </motion.div>

        {/* Skill Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={gi}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: gi * 0.12 }}
              whileHover={{ y: -4 }}
              className="glass-card rounded-2xl p-7 relative overflow-hidden group"
            >
              {/* Card glow top-right */}
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[50px]"
                style={{ background: group.color }}
              />

              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold shrink-0"
                  style={{ background: `${group.color}20`, border: `1px solid ${group.color}30` }}
                >
                  {group.icon}
                </div>
                <h3 className="text-lg font-bold text-white">{group.category}</h3>
              </div>

              {/* Skill bars */}
              <div className="space-y-5">
                {group.skills.map((skill, si) => (
                  <SkillBar
                    key={si}
                    name={skill.name}
                    level={skill.level}
                    delay={gi * 0.1 + si * 0.08}
                    color={group.color}
                  />
                ))}
              </div>

              {/* Bottom gradient border animation */}
              <div
                className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-700 rounded-full"
                style={{ background: `linear-gradient(90deg, ${group.color}, transparent)` }}
              />
            </motion.div>
          ))}
        </div>

        {/* Additional tech cloud */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 glass-card rounded-2xl p-6 text-center"
        >
          <p className="text-xs text-gray-500 font-semibold tracking-widest uppercase mb-4">Also Familiar With</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['REST APIs', 'System Design', 'GetX State Mgmt', 'MVC Pattern', 'Firebase Auth', 'Amazon ECR', 'AWS CloudTrail', 'Git'].map(t => (
              <span key={t} className="tech-badge">{t}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}