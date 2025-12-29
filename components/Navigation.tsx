'use client'

import { useState, useEffect } from 'react'

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Aktif section'ı belirle
      const sections = ['about', 'projects', 'experience', 'skills', 'education', 'contact']
      const scrollPosition = window.scrollY + 100 // Offset for better detection
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          break
        }
      }
    }
    
    // İlk yüklemede hash varsa aktif section'ı ayarla
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.slice(1)
      if (hash) {
        setActiveSection(hash)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    handleScroll() // İlk yüklemede çalıştır
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'ABOUT', href: '#about', id: 'about' },
    { name: 'PROJECTS', href: '#projects', id: 'projects' },
    { name: 'EXPERIENCE', href: '#experience', id: 'experience' },
    { name: 'SKILLS', href: '#skills', id: 'skills' },
    { name: 'EDUCATION', href: '#education', id: 'education' },
    { name: 'CONTACT', href: '#contact', id: 'contact' },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-dark-bg/95 backdrop-blur-sm border-b border-terminal-green/20' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="text-terminal-green font-mono text-sm hover:text-terminal-cyan transition-colors"
          >
            {'>'} MC
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`transition-all duration-300 font-mono text-xs terminal-border px-4 py-2 relative group flex items-center justify-center min-w-[80px] ${
                    isActive
                      ? 'text-terminal-green border-terminal-green bg-dark-bg/50 shadow-[0_0_10px_rgba(0,255,65,0.3)]'
                      : 'text-terminal-gray/90 hover:text-terminal-green hover:border-terminal-green hover:bg-dark-bg/50 hover:shadow-[0_0_10px_rgba(0,255,65,0.3)]'
                  }`}
                >
                  <span className="relative z-10 whitespace-nowrap">{item.name}</span>
                  <span className={`absolute inset-0 transition-all duration-300 ${
                    isActive
                      ? 'bg-terminal-green/10'
                      : 'bg-terminal-green/0 group-hover:bg-terminal-green/10'
                  }`}></span>
                </a>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-terminal-green font-mono text-sm focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? '[CLOSE]' : '[MENU]'}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-terminal-green/20 bg-dark-bg/95 backdrop-blur-sm">
            <div className="px-6 py-4 space-y-3">
              {navItems.map((item) => {
                const isActive = activeSection === item.id
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      handleNavClick(e, item.href)
                      setIsMobileMenuOpen(false)
                    }}
                    className={`block transition-all duration-300 font-mono text-xs py-3 px-4 terminal-border relative group text-center w-full ${
                      isActive
                        ? 'text-terminal-green border-terminal-green bg-dark-bg/50 shadow-[0_0_10px_rgba(0,255,65,0.3)]'
                        : 'text-terminal-gray/90 hover:text-terminal-green hover:border-terminal-green hover:bg-dark-bg/50 hover:shadow-[0_0_10px_rgba(0,255,65,0.3)]'
                    }`}
                  >
                    <span className="relative z-10">{item.name}</span>
                    <span className={`absolute inset-0 transition-all duration-300 ${
                      isActive
                        ? 'bg-terminal-green/10'
                        : 'bg-terminal-green/0 group-hover:bg-terminal-green/10'
                    }`}></span>
                  </a>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation
