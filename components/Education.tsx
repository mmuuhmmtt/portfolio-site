'use client'

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
    <section id="education" className="py-32 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <div className="text-terminal-green font-mono text-sm mb-4">
            <span className="terminal-prompt"></span>EDUCATION HISTORY
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-mono font-light text-terminal-green crt-glow">
            EDUCATION
          </h2>
        </div>

        <div className="space-y-6">
          {education.map((edu, index) => (
            <div
              key={`${edu.degree}-${index}`}
              className="terminal-border p-6 hover:border-terminal-green transition-all"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <h3 className="text-terminal-green font-mono text-lg mb-2">
                    {edu.degree}
                  </h3>
                  {edu.institution && (
                    <div className="text-terminal-cyan font-mono text-sm mb-2">
                      {edu.institution}
                    </div>
                  )}
                  <div className="text-terminal-gray font-mono text-xs">
                    {edu.period}
                  </div>
                </div>
                <div className="text-terminal-amber font-mono text-sm text-right md:text-left">
                  {edu.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Education
