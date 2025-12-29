'use client'

import { Github, Linkedin, Mail } from 'lucide-react'
import Link from 'next/link'

const Contact = () => {
  return (
    <footer id="contact" className="py-32 px-6 lg:px-8 border-t border-terminal-green/20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <div className="text-terminal-green font-mono text-sm mb-4">
            <span className="terminal-prompt"></span>GET IN TOUCH
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-mono font-light text-terminal-green crt-glow">
            CONTACT
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="terminal-border p-6">
            <div className="text-terminal-cyan font-mono text-sm mb-4">EMAIL</div>
            <Link
              href="mailto:muhammedcosgun12@gmail.com"
              className="text-terminal-green hover:text-terminal-cyan transition-colors font-mono text-sm break-all"
            >
              MUHAMMEDCOSGUN12@GMAIL.COM
            </Link>
          </div>

          <div className="terminal-border p-6">
            <div className="text-terminal-cyan font-mono text-sm mb-4">LINKEDIN</div>
            <Link
              href="https://www.linkedin.com/in/muhammet-co%C5%9Fgun-86a854219/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-green hover:text-terminal-cyan transition-colors font-mono text-sm break-all"
            >
              LINKEDIN.COM/IN/MUHAMMETCOSGUN
            </Link>
          </div>

          <div className="terminal-border p-6">
            <div className="text-terminal-cyan font-mono text-sm mb-4">GITHUB</div>
            <Link
              href="https://github.com/mmuuhmmtt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-green hover:text-terminal-cyan transition-colors font-mono text-sm break-all"
            >
              GITHUB.COM/MMUUHMMTT
            </Link>
          </div>

          <div className="terminal-border p-6">
            <div className="text-terminal-cyan font-mono text-sm mb-4">LOCATION</div>
            <div className="text-terminal-green font-mono text-sm">
              ANKARA, TURKEY
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-terminal-green/20 text-terminal-gray font-mono text-xs text-center">
          <div className="terminal-prompt">© {new Date().getFullYear()} MUHAMMET COŞGUN. ALL RIGHTS RESERVED.</div>
        </div>
      </div>
    </footer>
  )
}

export default Contact
