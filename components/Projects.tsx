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
    const fetchRepos = async () => {
      try {
        // Direct GitHub API call (works in static export)
        // Rate limit'i azaltmak için daha az parametre kullan
        const response = await fetch(
          'https://api.github.com/users/mmuuhmmtt/repos?sort=updated&per_page=6',
          {
            headers: {
              Accept: 'application/vnd.github.v3+json',
            },
            // Rate limit'i azaltmak için cache kullan
            cache: 'force-cache',
          }
        )
        
        if (response.ok) {
          const repos = await response.json()
          console.log('📦 GitHub repos alındı:', repos.length, 'repo', repos.map((r: any) => r.name))
          
          // Filter out forks, archived repos, and profile repo
          const filteredRepos = repos
            .filter((repo: any) => !repo.fork && !repo.archived && repo.name !== 'mmuuhmmtt')
            .slice(0, 3)
          
          console.log('🔍 Filtrelenmiş repolar:', filteredRepos.map((r: any) => ({ name: r.name, description: r.description })))
          
          // package.json'dan teknoloji çıkarma (daha güvenilir)
          const extractTechsFromPackageJson = async (repoFullName: string): Promise<string[]> => {
            const techs: string[] = []
            
            try {
              // package.json dosyasını direkt oku
              const packageJsonResponse = await fetch(
                `https://api.github.com/repos/${repoFullName}/contents/package.json`,
                {
                  headers: {
                    Accept: 'application/vnd.github.v3+json',
                  },
                }
              )
              
              if (packageJsonResponse.ok) {
                const packageJsonData = await packageJsonResponse.json()
                const packageContent = JSON.parse(atob(packageJsonData.content.replace(/\s/g, '')))
                
                // Dependencies ve devDependencies birleştir
                const allDeps = {
                  ...packageContent.dependencies || {},
                  ...packageContent.devDependencies || {},
                }
                
                // Package name'den teknoloji mapping
                const packageToTech: { [key: string]: string } = {
                  'next': 'Next.js',
                  'react': 'React',
                  'react-dom': 'React',
                  'vue': 'Vue.js',
                  '@vue/cli': 'Vue.js',
                  'angular': 'Angular',
                  '@angular/core': 'Angular',
                  'typescript': 'TypeScript',
                  'tailwindcss': 'Tailwind CSS',
                  'next-themes': 'next-themes',
                  'zustand': 'Zustand',
                  'next-intl': 'next-intl',
                  'framer-motion': 'Framer Motion',
                  'lucide-react': 'Lucide React',
                  '@testing-library/react': 'React Testing Library',
                  '@testing-library/jest-dom': 'React Testing Library',
                  'jest': 'Jest',
                  'express': 'Express.js',
                  'mongodb': 'MongoDB',
                  'mongoose': 'MongoDB',
                  'prisma': 'Prisma',
                  '@prisma/client': 'Prisma',
                  'graphql': 'GraphQL',
                  'apollo-server': 'GraphQL',
                  'redis': 'Redis',
                  'firebase': 'Firebase',
                  'cypress': 'Cypress',
                  '@storybook/react': 'Storybook',
                  'svelte': 'Svelte',
                  'nuxt': 'Nuxt.js',
                  '@remix-run/node': 'Remix',
                  'postgresql': 'PostgreSQL',
                  'pg': 'PostgreSQL',
                  'mysql': 'MySQL',
                  'mysql2': 'MySQL',
                }
                
                // Dependencies'leri kontrol et
                for (const [pkgName] of Object.entries(allDeps)) {
                  if (packageToTech[pkgName] && !techs.includes(packageToTech[pkgName])) {
                    techs.push(packageToTech[pkgName])
                  }
                }
              }
            } catch (error) {
              console.log(`package.json okunamadı: ${repoFullName}`, error)
            }
            
            return techs
          }
          
          const mappedProjects: Project[] = await Promise.all(
            filteredRepos.map(async (repo: any, index: number) => {
              const techs: string[] = []
              
              // 1. package.json'dan teknoloji çıkarma (daha güvenilir - sadece gerçek dependencies)
              const packageTechs = await extractTechsFromPackageJson(repo.full_name)
              packageTechs.forEach((tech: string) => {
                if (!techs.includes(tech)) techs.push(tech)
              })
              
              // 2. Primary language - sadece package.json'da teknoloji yoksa ve JavaScript/TypeScript ise ekle
              if (techs.length === 0 && repo.language) {
                const allowedLanguages = ['TypeScript', 'JavaScript']
                if (allowedLanguages.includes(repo.language)) {
                  techs.push(repo.language)
                }
              } else if (repo.language && (repo.language === 'TypeScript' || repo.language === 'JavaScript')) {
                // TypeScript/JavaScript varsa ekle (package.json'da olmayabilir)
                if (!techs.includes(repo.language)) {
                  techs.push(repo.language)
                }
              }
              
              // 3. Repo adı ve açıklamadan fallback teknoloji tespiti
              if (techs.length === 0) {
                const repoName = repo.name.toLowerCase()
                const description = (repo.description || '').toLowerCase()
                const combined = (repoName + ' ' + description).toLowerCase()
                
                if (combined.includes('next') || combined.includes('nextjs')) {
                  techs.push('Next.js')
                } else if (combined.includes('react')) {
                  techs.push('React')
                } else if (combined.includes('vue')) {
                  techs.push('Vue.js')
                }
                
                if (combined.includes('typescript') || combined.includes('ts-')) {
                  if (!techs.includes('TypeScript')) techs.push('TypeScript')
                }
                if (combined.includes('tailwind')) {
                  if (!techs.includes('Tailwind CSS')) techs.push('Tailwind CSS')
                }
              }
              
              // DefaultProjects'teki görselleri sırayla atama
              const imageUrls = ['/images/project1.png', '/images/project2.png', '/images/project3.png']
              
              // İsim formatlama - daha okunabilir
              const formatProjectName = (name: string): string => {
                // Özel durumlar
                if (name === 'AI-ChatHub-v1') return 'AI ChatHub V1'
                if (name === 'pazaryeri-frontend-case') return 'Pazaryeri Frontend Case'
                if (name === 'portfolio-site') return 'Portfolio Website'
                
                // Genel formatlama
                return name
                  .split('-')
                  .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')
              }
              
              // Açıklama iyileştirme - GitHub'dan gelen açıklamayı kullan
              let finalDescription = repo.description || ''
              
              // Eğer açıklama yoksa veya çok kısaysa, proje adından açıklama oluştur
              if (!finalDescription || finalDescription.length < 20) {
                const projectName = formatProjectName(repo.name)
                finalDescription = `${projectName} projesi. Modern web teknolojileri kullanılarak geliştirilmiştir.`
              }
              
              return {
                name: formatProjectName(repo.name),
                description: finalDescription,
                technologies: techs.length > 0 ? techs : ['JavaScript'],
                githubUrl: repo.html_url,
                siteUrl: repo.homepage || undefined,
                featured: true,
                imageUrl: imageUrls[index] || undefined,
              }
            })
          )
          
          if (mappedProjects.length > 0) {
            console.log(' GitHub projeleri yüklendi:', mappedProjects)
            setGithubProjects(mappedProjects)
          } else {
            console.log(' GitHub projesi bulunamadı, default projeler kullanılıyor')
            setGithubProjects(defaultProjects)
          }
        } else {
          console.log(' GitHub API yanıtı başarısız, default projeler kullanılıyor')
          setGithubProjects(defaultProjects)
        }
      } catch (error) {
        console.error(' Error fetching GitHub repos:', error)
        setGithubProjects(defaultProjects)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRepos()
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
