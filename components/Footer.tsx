'use client'

import { ScrollFadeIn } from '@/components/ScrollAnimations'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 border-t border-terminal-green/20">
      <div className="max-w-6xl mx-auto">
        <ScrollFadeIn delay={0}>
          <div className="text-center space-y-4">
            {/* Kişisel İmza */}
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <span className="text-terminal-green font-mono text-xs sm:text-sm">$</span>
                <span className="text-terminal-gray font-mono text-sm sm:text-base">echo</span>
                <span className="text-terminal-green font-mono text-sm sm:text-base">"Made by"</span>
                <span className="text-terminal-cyan font-mono text-sm sm:text-base font-semibold crt-glow">
                  Muhammet Coşgun
                </span>
              </div>
            </div>

            {/* Minimal Metin */}
            <div className="pt-4 border-t border-terminal-green/10">
              <p className="text-terminal-gray font-mono text-xs sm:text-sm">
                © {currentYear} All rights reserved.
              </p>
              <p className="text-terminal-gray/60 font-mono text-xs mt-2">
                Built with Next.js & TypeScript
              </p>
            </div>
          </div>
        </ScrollFadeIn>
      </div>
    </footer>
  )
}

export default Footer

