'use client'

import { Github, Linkedin, Mail } from 'lucide-react'
import Link from 'next/link'

const Contact = () => {
  return (
    <footer id="contact" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 border-t border-terminal-green/20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 sm:mb-12 md:mb-16">
          <div className="text-terminal-green font-mono text-xs sm:text-sm mb-2 sm:mb-4">
            <span className="terminal-prompt"></span>GET IN TOUCH
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-mono font-light text-terminal-green crt-glow">
            CONTACT
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
          <div className="terminal-border p-4 sm:p-6">
            <div className="text-terminal-cyan font-mono text-xs sm:text-sm mb-2 sm:mb-4">EMAIL</div>
            <Link
              href="mailto:muhammedcosgun12@gmail.com"
              className="text-terminal-green hover:text-terminal-cyan transition-colors font-mono text-xs sm:text-sm break-all"
            >
              MUHAMMEDCOSGUN12@GMAIL.COM
            </Link>
          </div>

          <div className="terminal-border p-4 sm:p-6">
            <div className="text-terminal-cyan font-mono text-xs sm:text-sm mb-2 sm:mb-4">LINKEDIN</div>
            <Link
              href="https://www.linkedin.com/in/muhammet-co%C5%9Fgun-86a854219/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-green hover:text-terminal-cyan transition-colors font-mono text-xs sm:text-sm break-all"
            >
              LINKEDIN.COM/IN/MUHAMMETCOSGUN
            </Link>
          </div>

          <div className="terminal-border p-4 sm:p-6">
            <div className="text-terminal-cyan font-mono text-xs sm:text-sm mb-2 sm:mb-4">GITHUB</div>
            <Link
              href="https://github.com/mmuuhmmtt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-green hover:text-terminal-cyan transition-colors font-mono text-xs sm:text-sm break-all"
            >
              GITHUB.COM/MMUUHMMTT
            </Link>
          </div>

          <div className="terminal-border p-4 sm:p-6">
            <div className="text-terminal-cyan font-mono text-xs sm:text-sm mb-2 sm:mb-4">LOCATION</div>
            <div className="text-terminal-green font-mono text-xs sm:text-sm">
              ANKARA, TURKEY
            </div>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 border-t border-terminal-green/20 text-terminal-gray font-mono text-[10px] sm:text-xs text-center">
          <div className="terminal-prompt">© {new Date().getFullYear()} MUHAMMET COŞGUN. ALL RIGHTS RESERVED.</div>
        </div>
      </div>
    </footer>
  )
}

export default Contact
