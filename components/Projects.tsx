'use client'

import { ExternalLink, Github } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ScrollSlideUp, ScrollFadeIn, ScrollScale } from '@/components/ScrollAnimations'

interface Project {
  name: string
  description: string
  technologies: string[]
  githubUrl: string
  siteUrl?: string
  featured?: boolean
  imageUrl?: string
}

const defaultProjects: Project[] = [
  {
    name: 'Portfolio Website',
    description: 'Modern ve responsive portföy web sitesi. Next.js ve Tailwind CSS kullanılarak geliştirildi.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    githubUrl: 'https://github.com/mmuuhmmtt/portfolio-site',
    siteUrl: 'https://mmuuhmmtt.github.io/portfolio-site/',
    featured: true,
    imageUrl: '/images/project1.png',
  },
  {
    name: 'AI ChatHub V1',
    description: 'AI destekli sohbet uygulaması. Modern web teknolojileri kullanılarak geliştirilmiştir.',
    technologies: ['Next.js', 'Tailwind CSS', 'React Context API'],
    githubUrl: 'https://github.com/mmuuhmmtt/AI-ChatHub-v1',
    siteUrl: 'https://mmuuhmmtt.github.io/AI-ChatHub-v1/',
    featured: true,
    imageUrl: '/images/project2.png',
  },
  {
    name: 'Pazaryeri Frontend Case',
    description: 'Pazaryeri frontend case study projesi. Modern web teknolojileri kullanılarak geliştirilmiştir.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    githubUrl: 'https://github.com/mmuuhmmtt/pazaryeri-frontend-case',
    siteUrl: 'https://mmuuhmmtt.github.io/pazaryeri-frontend-case/tr',
    featured: true,
    imageUrl: '/images/project3.png',
  },
]

const Projects = () => {
  const [githubProjects, setGithubProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [basePath, setBasePath] = useState('')

  // BasePath kontrolü - GitHub Pages için
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname
      if (pathname.startsWith('/portfolio-site')) {
        setBasePath('/portfolio-site')
      } else {
        setBasePath('')
      }
    }
  }, [])

  useEffect(() => {
    // GitHub API yerine sadece defaultProjects'i kullan
    // Bunlar zaten doğru sırada ve düzgün şekilde tanımlanmış
    setGithubProjects(defaultProjects)
    setIsLoading(false)
  }, [])

  return (
    <section id="projects" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <ScrollSlideUp delay={0}>
          <div className="mb-8 sm:mb-12 md:mb-16">
            <div className="text-terminal-green font-mono text-xs sm:text-sm mb-2 sm:mb-4">
              <span className="terminal-prompt"></span>FEATURED WORK
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-mono font-light text-terminal-green crt-glow">
              PROJECTS
            </h2>
          </div>
        </ScrollSlideUp>

        {isLoading ? (
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="terminal-border p-6 h-32 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {githubProjects.map((project, index) => (
              <ScrollScale key={project.name} delay={index * 120}>
                <div className="terminal-border project-card overflow-hidden hover:border-terminal-green group flex flex-col h-full bg-gradient-to-b from-transparent to-terminal-green/5 cursor-pointer">
                  {/* Proje Görseli */}
                  <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-gradient-to-br from-terminal-green/20 via-terminal-cyan/10 to-terminal-green/20 flex items-center justify-center">
                    {project.imageUrl ? (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <img
                          src={project.imageUrl.startsWith('http') ? project.imageUrl : (basePath + project.imageUrl)}
                          alt={project.name}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                          style={{ maxWidth: '100%', maxHeight: '100%' }}
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            console.error('Görsel yüklenemedi:', project.imageUrl, 'BasePath:', basePath)
                            const target = e.target as HTMLImageElement
                            target.style.display = 'none'
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#05050a] via-transparent to-transparent opacity-60 z-10 pointer-events-none"></div>
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-terminal-green/30 via-terminal-cyan/20 to-terminal-green/30"></div>
                        <div className="relative z-10 text-terminal-green font-mono text-6xl sm:text-7xl font-bold opacity-60">
                          {project.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-24 h-24 border-2 border-terminal-green/40 rounded-sm rotate-45"></div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* İçerik Alanı */}
                  <div className="p-5 sm:p-6 flex flex-col flex-grow">
                    {/* Proje Adı */}
                    <h3 className="text-terminal-green font-mono text-xl sm:text-2xl font-semibold mb-3 group-hover:text-terminal-cyan transition-colors">
                      {project.name}
                    </h3>

                    {/* Açıklama */}
                    <p className="text-terminal-gray font-mono text-sm sm:text-base mb-5 leading-relaxed flex-grow">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs text-terminal-amber font-mono px-3 py-1.5 border border-terminal-amber/30 bg-terminal-amber/5 hover:bg-terminal-amber/10 hover:border-terminal-amber/50 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Linkler */}
                    <div className="flex flex-wrap gap-3 pt-2 border-t border-terminal-green/20">
                      {project.siteUrl && (
                        <Link
                          href={project.siteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-terminal-green hover:text-terminal-cyan transition-colors font-mono text-sm terminal-border px-4 py-2 hover:border-terminal-cyan hover:bg-terminal-cyan/5 flex-1 justify-center"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>LIVE</span>
                        </Link>
                      )}
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-terminal-gray hover:text-terminal-green transition-colors font-mono text-sm terminal-border px-4 py-2 hover:border-terminal-green hover:bg-terminal-green/5 flex-1 justify-center"
                      >
                        <Github className="w-4 h-4" />
                        <span>GITHUB</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollScale>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Projects
