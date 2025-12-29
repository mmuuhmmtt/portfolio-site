'use client'

import { ScrollSlideUp, ScrollFadeIn } from '@/components/ScrollAnimations'

interface EducationItem {
  degree: string
  institution: string
  period: string
  status: string
}

const education: EducationItem[] = [
  {
    degree: 'Yönetim Bilişim Sistemleri',
    institution: 'Başkent Üniversitesi',
    period: 'Devam ediyor',
    status: 'Lisans',
  },
  {
    degree: 'Bilgisayar Programcılığı',
    institution: 'Başkent Üniversitesi',
    period: 'Mezun',
    status: 'Ön Lisans',
  },
]

const Education = () => {
  return (
    <section id="education" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <ScrollSlideUp delay={0}>
          <div className="mb-8 sm:mb-12 md:mb-16">
            <div className="text-terminal-green font-mono text-xs sm:text-sm mb-2 sm:mb-4">
              <span className="terminal-prompt"></span>EDUCATION HISTORY
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-mono font-light text-terminal-green crt-glow">
              EDUCATION
            </h2>
          </div>
        </ScrollSlideUp>

        <div className="space-y-4 sm:space-y-6">
          {education.map((edu, index) => (
            <ScrollFadeIn key={`${edu.degree}-${index}`} delay={index * 100}>
              <div
                className="terminal-border p-4 sm:p-6 hover:border-terminal-green transition-all"
              >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                <div className="md:col-span-2">
                  <h3 className="text-terminal-green font-mono text-base sm:text-lg mb-1 sm:mb-2">
                    {edu.degree}
                  </h3>
                  {edu.institution && (
                    <div className="text-terminal-cyan font-mono text-xs sm:text-sm mb-1 sm:mb-2">
                      {edu.institution}
                    </div>
                  )}
                  <div className="text-terminal-gray font-mono text-xs">
                    {edu.period}
                  </div>
                </div>
                <div className="text-terminal-amber font-mono text-xs sm:text-sm text-left md:text-left mt-2 md:mt-0">
                  {edu.status}
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

export default Education
