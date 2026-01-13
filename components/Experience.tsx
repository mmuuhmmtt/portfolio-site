'use client'

import { ScrollSlideUp, ScrollFadeIn } from '@/components/ScrollAnimations'

interface ExperienceItem {
  title: string
  company: string
  period: string
  type: string
}

const experiences: ExperienceItem[] = [
  {
    title: 'Full-Stack Developer',
    company: 'EG Yazılım',
    period: 'Ocak 2026 – Devam ediyor',
    type: 'Tam Zamanlı',
  },
  {
    title: 'Full-Stack Intern',
    company: 'EG Yazılım',
    period: 'Eylül 2025 – Ocak 2026',
    type: 'Stajyer',
  },
  {
    title: 'Software Development Intern',
    company: 'SmartICT Bilişim A.Ş.',
    period: 'Kasım 2025 – Aralık 2025',
    type: 'Stajyer',
  },
  {
    title: 'Software Development',
    company: 'Fernus Technology',
    period: 'Haziran 2023 – Ocak 2024',
    type: 'Tam Zamanlı',
  },
  {
    title: 'Software Development Intern',
    company: 'Fernus Technology',
    period: 'Eylül 2022 – Ekim 2022',
    type: 'Stajyer',
  },
  {
    title: 'Hardware Intern',
    company: 'Başkent Üniversitesi',
    period: 'Aralık 2022 – Ocak 2023',
    type: 'Stajyer',
  },
]

const Experience = () => {
  return (
    <section id="experience" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <ScrollSlideUp delay={0}>
          <div className="mb-8 sm:mb-12 md:mb-16">
            <div className="text-terminal-green font-mono text-xs sm:text-sm mb-2 sm:mb-4">
              <span className="terminal-prompt"></span>WORK EXPERIENCE
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-mono font-light text-terminal-green crt-glow">
              EXPERIENCE
            </h2>
          </div>
        </ScrollSlideUp>

        <div className="space-y-4 sm:space-y-6">
          {experiences.map((exp, index) => (
            <ScrollFadeIn key={`${exp.company}-${index}`} delay={index * 100}>
              <div
                className="terminal-border p-4 sm:p-6 hover:border-terminal-green transition-all"
              >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                <div className="md:col-span-2">
                  <h3 className="text-terminal-green font-mono text-base sm:text-lg mb-1 sm:mb-2">
                    {exp.title}
                  </h3>
                  <div className="text-terminal-cyan font-mono text-xs sm:text-sm mb-1 sm:mb-2">
                    {exp.company}
                  </div>
                  {exp.period && (
                    <div className="text-terminal-gray font-mono text-xs">
                      {exp.period}
                    </div>
                  )}
                </div>
                <div className="text-terminal-amber font-mono text-xs sm:text-sm text-left md:text-left mt-2 md:mt-0">
                  {exp.type}
                </div>
              </div>
            </div>
            </ScrollFadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
