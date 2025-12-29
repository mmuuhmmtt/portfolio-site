'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Experience from '@/components/Experience'
import Skills from '@/components/Skills'
import Education from '@/components/Education'
import Contact from '@/components/Contact'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <main className="min-h-screen bg-dark-bg">
      <Navigation isLoading={isLoading} />
      <Hero onLoadingChange={setIsLoading} />
      <About />
      <Projects />
      <Experience />
      <Skills />
      <Education />
      <Contact />
    </main>
  )
}

