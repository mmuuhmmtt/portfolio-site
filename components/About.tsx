'use client'

const About = () => {
  return (
    <section id="about" className="py-32 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <div className="text-terminal-green font-mono text-sm mb-4">
            <span className="terminal-prompt"></span>ABOUT ME
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-mono font-light text-terminal-green crt-glow">
            ABOUT
          </h2>
        </div>

        <div className="terminal-border p-8 max-w-4xl">
          <div className="space-y-4 text-terminal-gray font-mono text-base leading-relaxed">
            <div className="terminal-prompt">
              Bilgisayar Programcılığı altyapısına sahip, Başkent Üniversitesi Yönetim Bilişim Sistemleri öğrencisiyim.
            </div>
            <div className="terminal-prompt">
              Frontend geliştirme ve modern web teknolojileriyle, kullanıcı deneyimini ön planda tutan arayüzler tasarlıyor ve geliştiriyorum.
            </div>
            <div className="terminal-prompt">
              Gerçek projelerde edindiğim kurumsal deneyimlerle, ölçeklenebilir ve sürdürülebilir web çözümleri üretmeyi hedefliyorum.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
