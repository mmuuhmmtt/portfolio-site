'use client'

import { ScrollSlideUp, ScrollFadeIn } from '@/components/ScrollAnimations'

const About = () => {
  return (
    <section id="about" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <ScrollSlideUp delay={0}>
          <div className="mb-8 sm:mb-12 md:mb-16">
            <div className="text-terminal-green font-mono text-xs sm:text-sm mb-2 sm:mb-4">
              <span className="terminal-prompt"></span>ABOUT ME
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-mono font-light text-terminal-green crt-glow">
              ABOUT
            </h2>
          </div>
        </ScrollSlideUp>

        <ScrollFadeIn delay={200}>
          <div className="terminal-border p-4 sm:p-6 md:p-8 max-w-4xl">
            <div className="space-y-3 sm:space-y-4 text-terminal-gray font-mono text-sm sm:text-base leading-relaxed">
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
        </ScrollFadeIn>
      </div>
    </section>
  )
}

export default About
