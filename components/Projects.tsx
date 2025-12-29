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
}

const defaultProjects: Project[] = [
  {
    name: 'Portfolio Website',
    description: 'Modern ve responsive portföy web sitesi. Next.js ve Tailwind CSS kullanılarak geliştirildi.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    githubUrl: 'https://github.com/mmuuhmmtt/portfolio-site',
    siteUrl: 'https://mmuuhmmtt.github.io/portfolio-site/',
    featured: true,
  },
]

const Projects = () => {
  const [githubProjects, setGithubProjects] = useState<Project[]>(defaultProjects)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        // Direct GitHub API call (works in static export)
        const response = await fetch(
          'https://api.github.com/users/mmuuhmmtt/repos?sort=updated&per_page=10',
          {
            headers: {
              Accept: 'application/vnd.github.v3+json',
            },
          }
        )
        
        if (response.ok) {
          const repos = await response.json()
          
          // Filter out forks and archived repos
          const filteredRepos = repos
            .filter((repo: any) => !repo.fork && !repo.archived)
            .slice(0, 3)
          
          const mappedProjects: Project[] = filteredRepos.map((repo: any) => {
            const techs: string[] = []
            if (repo.language) techs.push(repo.language)
            const repoName = repo.name.toLowerCase()
            if (repoName.includes('next') || repoName.includes('nextjs')) techs.push('Next.js')
            if (repoName.includes('react')) techs.push('React')
            if (repoName.includes('typescript') || repoName.includes('ts')) techs.push('TypeScript')
            if (repoName.includes('tailwind')) techs.push('Tailwind CSS')
            if (repoName.includes('node')) techs.push('Node.js')
            
            return {
              name: repo.name
                .split('-')
                .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' '),
              description: repo.description || 'GitHub repository projesi',
              technologies: techs.length > 0 ? techs : ['JavaScript', 'Git'],
              githubUrl: repo.html_url,
              siteUrl: repo.homepage || undefined, // GitHub Pages veya deployed site URL'i
              featured: true,
            }
          })
          
          if (mappedProjects.length > 0) {
            setGithubProjects(mappedProjects)
          } else {
            setGithubProjects(defaultProjects)
          }
        } else {
          // Fallback to default projects if API fails
          setGithubProjects(defaultProjects)
        }
      } catch (error) {
        console.error('Error fetching GitHub repos:', error)
        // Fallback to default projects on error
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {githubProjects.map((project, index) => (
              <ScrollScale key={project.name} delay={index * 100}>
                <div
                  className="terminal-border p-4 sm:p-6 hover:border-terminal-green transition-all group"
                >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-terminal-green font-mono text-lg group-hover:text-terminal-cyan transition-colors">
                    {project.name}
                  </h3>
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-terminal-gray hover:text-terminal-green transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </Link>
                </div>
                <p className="text-terminal-gray font-mono text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs text-terminal-amber font-mono px-2 py-1 border border-terminal-amber/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  {project.siteUrl && (
                    <Link
                      href={project.siteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-terminal-green hover:text-terminal-cyan transition-colors font-mono text-sm terminal-border px-3 py-1.5 hover:border-terminal-cyan"
                    >
                      <span>VISIT SITE</span>
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  )}
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-terminal-gray hover:text-terminal-green transition-colors font-mono text-sm"
                  >
                    <span>VIEW CODE</span>
                    <Github className="w-4 h-4" />
                  </Link>
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
