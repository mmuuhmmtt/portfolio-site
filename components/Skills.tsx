'use client'

import { ScrollSlideUp, ScrollFadeIn } from '@/components/ScrollAnimations'

interface SkillCategory {
  title: string
  skills: string[]
}

const skillCategories: SkillCategory[] = [
  {
    title: 'LANGUAGES',
    skills: ['HTML', 'CSS/SCSS', 'JavaScript', 'TypeScript', 'PHP', 'SQL', 'C#'],
  },
  {
    title: 'TECHNOLOGIES',
    skills: ['React', 'Next.js', 'Angular', 'Node.js', 'PostgreSQL', 'ABP Framework'],
  },
  {
    title: 'DESIGN TOOLS',
    skills: ['Figma', 'Adobe Illustrator', 'Adobe Animate', 'Tailwind CSS', 'Bootstrap'],
  },
  {
    title: 'DEVELOPER TOOLS',
    skills: ['Git', 'GitHub', 'VS Code', 'Docker'],
  },
]

const Skills = () => {
  return (
    <section id="skills" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <ScrollSlideUp delay={0}>
          <div className="mb-8 sm:mb-12 md:mb-16">
            <div className="text-terminal-green font-mono text-xs sm:text-sm mb-2 sm:mb-4">
              <span className="terminal-prompt"></span>SKILLS & TECHNOLOGIES
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-mono font-light text-terminal-green crt-glow">
              SKILLS
            </h2>
            <div className="mt-2 sm:mt-4 text-terminal-cyan font-mono text-xs sm:text-sm">
              <span className="terminal-prompt"></span>2 YEARS IN DEVELOPMENT
            </div>
          </div>
        </ScrollSlideUp>

        <div className="space-y-8 sm:space-y-12">
          {skillCategories.map((category, categoryIndex) => (
            <ScrollFadeIn key={category.title} delay={categoryIndex * 150}>
              <div>
                <h3 className="text-terminal-green font-mono text-base sm:text-lg mb-4 sm:mb-6">
                  {category.title}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4">
                  {category.skills.map((skill, skillIndex) => (
                    <ScrollFadeIn key={skill} delay={categoryIndex * 150 + skillIndex * 50}>
                      <div
                        className="terminal-border p-2 sm:p-4 text-center hover:border-terminal-green transition-all group"
                      >
                    <div className="text-terminal-gray group-hover:text-terminal-green transition-colors font-mono text-[10px] sm:text-xs break-words">
                      {skill}
                      </div>
                    </div>
                    </ScrollFadeIn>
                  ))}
                </div>
              </div>
            </ScrollFadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
