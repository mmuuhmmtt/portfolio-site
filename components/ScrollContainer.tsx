'use client'

import { useEffect, useRef, useState, ReactNode, createContext, useContext } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface ScrollContainerProps {
  children: ReactNode
}

interface ScrollContextType {
  goToSection: (index: number) => void
  currentSection: number
  totalSections: number
}

const ScrollContext = createContext<ScrollContextType | null>(null)

export const useScroll = () => {
  const context = useContext(ScrollContext)
  if (!context) {
    throw new Error('useScroll must be used within ScrollContainer')
  }
  return context
}

const ScrollContainer = ({ children }: ScrollContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollAccumulatorRef = useRef(0)
  const [currentSection, setCurrentSection] = useState(0)
  const [sections, setSections] = useState<HTMLElement[]>([])
  const [isScrolling, setIsScrolling] = useState(false)
  const y = useMotionValue(0)
  const springY = useSpring(y, {
    stiffness: 200,
    damping: 40,
    mass: 0.8,
  })

  const goToSection = (index: number) => {
    if (index < 0 || index >= sections.length || isScrolling) return
    
    setIsScrolling(true)
    setCurrentSection(index)

    sections.forEach((section, i) => {
      const offset = (i - index) * 100
      section.style.transform = `translateY(${offset}vh)`
    })

    y.set(-index * 100)

    setTimeout(() => {
      setIsScrolling(false)
    }, 1000)
  }

  useEffect(() => {
    if (!containerRef.current) return

    // Get all section elements (exclude nav)
    const allElements = Array.from(containerRef.current.children) as HTMLElement[]
    const sectionElements = allElements.filter(
      (el) => el.tagName === 'SECTION'
    ) as HTMLElement[]
    setSections(sectionElements)

    // Set initial positions
    sectionElements.forEach((section, index) => {
      section.style.position = 'fixed'
      section.style.top = '0'
      section.style.left = '0'
      section.style.width = '100%'
      section.style.height = '100vh'
      section.style.zIndex = String(sectionElements.length - index)
      section.style.transform = `translateY(${index * 100}vh)`
      section.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
      section.style.willChange = 'transform'
    })
  }, [children])

  useEffect(() => {
    if (sections.length === 0) return

    let scrollTimeout: NodeJS.Timeout
    let isScrollingLocked = false

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()

      if (isScrollingLocked) return

      const delta = e.deltaY
      const scrollThreshold = 30

      // Accumulate scroll
      scrollAccumulatorRef.current += delta

      // Only trigger if accumulated scroll exceeds threshold
      if (Math.abs(scrollAccumulatorRef.current) < scrollThreshold) return

      setIsScrolling(true)
      isScrollingLocked = true

      const direction = scrollAccumulatorRef.current > 0 ? 1 : -1
      scrollAccumulatorRef.current = 0 // Reset accumulator

      if (direction > 0 && currentSection < sections.length - 1) {
        // Scroll down - move content up
        const nextSection = currentSection + 1
        setCurrentSection(nextSection)

        sections.forEach((section, index) => {
          const offset = (index - nextSection) * 100
          section.style.transform = `translateY(${offset}vh)`
        })

        y.set(-nextSection * 100)
      } else if (direction < 0 && currentSection > 0) {
        // Scroll up - move content down
        const prevSection = currentSection - 1
        setCurrentSection(prevSection)

        sections.forEach((section, index) => {
          const offset = (index - prevSection) * 100
          section.style.transform = `translateY(${offset}vh)`
        })

        y.set(-prevSection * 100)
      }

      scrollTimeout = setTimeout(() => {
        setIsScrolling(false)
        isScrollingLocked = false
      }, 1000)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrollingLocked) return

      if (e.key === 'ArrowDown' && currentSection < sections.length - 1) {
        e.preventDefault()
        setIsScrolling(true)
        isScrollingLocked = true

        const nextSection = currentSection + 1
        setCurrentSection(nextSection)

        sections.forEach((section, index) => {
          const offset = (index - nextSection) * 100
          section.style.transform = `translateY(${offset}vh)`
        })

        y.set(-nextSection * 100)

        setTimeout(() => {
          setIsScrolling(false)
          isScrollingLocked = false
        }, 1000)
      } else if (e.key === 'ArrowUp' && currentSection > 0) {
        e.preventDefault()
        setIsScrolling(true)
        isScrollingLocked = true

        const prevSection = currentSection - 1
        setCurrentSection(prevSection)

        sections.forEach((section, index) => {
          const offset = (index - prevSection) * 100
          section.style.transform = `translateY(${offset}vh)`
        })

        y.set(-prevSection * 100)

        setTimeout(() => {
          setIsScrolling(false)
          isScrollingLocked = false
        }, 1000)
      }
    }

    // Touch support for mobile
    let touchStartY = 0
    let touchEndY = 0

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrollingLocked) return

      touchEndY = e.changedTouches[0].clientY
      const swipeDistance = touchStartY - touchEndY
      const swipeThreshold = 50

      if (Math.abs(swipeDistance) < swipeThreshold) return

      setIsScrolling(true)
      isScrollingLocked = true

      if (swipeDistance > 0 && currentSection < sections.length - 1) {
        // Swipe up - move content up
        const nextSection = currentSection + 1
        setCurrentSection(nextSection)

        sections.forEach((section, index) => {
          const offset = (index - nextSection) * 100
          section.style.transform = `translateY(${offset}vh)`
        })

        y.set(-nextSection * 100)
      } else if (swipeDistance < 0 && currentSection > 0) {
        // Swipe down - move content down
        const prevSection = currentSection - 1
        setCurrentSection(prevSection)

        sections.forEach((section, index) => {
          const offset = (index - prevSection) * 100
          section.style.transform = `translateY(${offset}vh)`
        })

        y.set(-prevSection * 100)
      }

      setTimeout(() => {
        setIsScrolling(false)
        isScrollingLocked = false
      }, 600)
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      clearTimeout(scrollTimeout)
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [sections, currentSection, y])

  // Update sections when currentSection changes
  useEffect(() => {
    if (sections.length === 0) return

    sections.forEach((section, index) => {
      const offset = (index - currentSection) * 100
      section.style.transform = `translateY(${offset}vh)`
    })
  }, [currentSection, sections])

  return (
    <ScrollContext.Provider
      value={{
        goToSection,
        currentSection,
        totalSections: sections.length,
      }}
    >
      <div
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden"
        style={{
          height: `${sections.length * 100}vh`,
        }}
      >
        {/* Filter out Navigation from sections */}
        {children}
        
        {/* Scroll indicator */}
        {sections.length > 1 && (
          <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-2 pointer-events-none">
            {sections.map((_, index) => (
              <div
                key={index}
                className={`w-1 h-8 transition-all duration-500 ease-out ${
                  index === currentSection
                    ? 'bg-terminal-green opacity-100 scale-110'
                    : 'bg-terminal-gray opacity-30'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </ScrollContext.Provider>
  )
}

export default ScrollContainer

