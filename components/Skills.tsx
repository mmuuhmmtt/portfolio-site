'use client'

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
    <section id="skills" className="py-32 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <div className="text-terminal-green font-mono text-sm mb-4">
            <span className="terminal-prompt"></span>SKILLS & TECHNOLOGIES
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-mono font-light text-terminal-green crt-glow">
            SKILLS
          </h2>
          <div className="mt-4 text-terminal-cyan font-mono text-sm">
            <span className="terminal-prompt"></span>2 YEARS IN DEVELOPMENT
          </div>
        </div>

        <div className="space-y-12">
          {skillCategories.map((category) => (
            <div key={category.title}>
              <h3 className="text-terminal-green font-mono text-lg mb-6">
                {category.title}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {category.skills.map((skill) => (
                  <div
                    key={skill}
                    className="terminal-border p-4 text-center hover:border-terminal-green transition-all group"
                  >
                    <div className="text-terminal-gray group-hover:text-terminal-green transition-colors font-mono text-xs">
                      {skill}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
