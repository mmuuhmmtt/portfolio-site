'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

const Hero = () => {
  const [currentTime, setCurrentTime] = useState('')
  const [mounted, setMounted] = useState(false)
  const [displayText1, setDisplayText1] = useState('')
  const [displayText2, setDisplayText2] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  
  // Get base path for GitHub Pages
  const basePath = typeof window !== 'undefined' 
    ? window.location.pathname.split('/').slice(0, -1).join('/') || ''
    : ''
  
  const videoPath = `${basePath}/videos/video.mp4`

  const targetText1 = 'MUHAMMET'
  const targetText2 = 'COŞGUN'
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'

  useEffect(() => {
    setMounted(true)
    
    // Check if mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, '0')
      const minutes = now.getMinutes().toString().padStart(2, '0')
      setCurrentTime(`${hours}:${minutes}`)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  // Video error handling and mobile optimization
  useEffect(() => {
    if (videoRef.current && !isMobile) {
      const video = videoRef.current
      
      const handleError = () => {
        console.error('Video loading error')
        setVideoError(true)
      }

      const handleLoadedData = () => {
        setVideoError(false)
        video.play().catch((err) => {
          console.error('Video play error:', err)
        })
      }

      video.addEventListener('error', handleError)
      video.addEventListener('loadeddata', handleLoadedData)

      return () => {
        video.removeEventListener('error', handleError)
        video.removeEventListener('loadeddata', handleLoadedData)
      }
    } else if (videoRef.current && isMobile) {
      // Pause video on mobile for better performance
      videoRef.current.pause()
    }
  }, [mounted, isMobile])

  // Text scramble animation for first line - only start after mount
  useEffect(() => {
    if (!mounted) return
    
    setIsAnimating(true)
    
    let iteration = 0
    const interval = setInterval(() => {
      setDisplayText1(
        targetText1
          .split('')
          .map((char, index) => {
            if (index < iteration) {
              return targetText1[index]
            }
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join('')
      )

      if (iteration >= targetText1.length) {
        clearInterval(interval)
        // Start second line animation
        setTimeout(() => {
          let iteration2 = 0
          const interval2 = setInterval(() => {
            setDisplayText2(
              targetText2
                .split('')
                .map((char, index) => {
                  if (index < iteration2) {
                    return targetText2[index]
                  }
                  return chars[Math.floor(Math.random() * chars.length)]
                })
                .join('')
            )

            if (iteration2 >= targetText2.length) {
              clearInterval(interval2)
              setIsAnimating(false)
              setDisplayText2(targetText2)
            }

            iteration2 += 1 / 3
          }, 50)
        }, 200)
      }

      iteration += 1 / 3
    }, 50)

    return () => clearInterval(interval)
  }, [mounted])

  return (
    <section className="min-h-screen flex flex-col justify-center px-6 lg:px-8 py-24 relative overflow-hidden">
      {/* Background Video - Hidden on mobile for better performance */}
      <div className="absolute inset-0 z-0">
        {!videoError && !isMobile ? (
          <video
            ref={videoRef}
            src={videoPath}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover grayscale"
            preload="auto"
            onError={() => {
              console.error('Video load error, trying fallback path')
              setVideoError(true)
            }}
          />
        ) : null}
        
        {/* Static background for mobile */}
        {isMobile && (
          <div className="w-full h-full bg-gradient-to-br from-black via-gray-900 to-black"></div>
        )}
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70"></div>

        {/* Subtle CRT scanline overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.12]">
          <div className="h-full w-full" style={{
            background: `
              repeating-linear-gradient(
                0deg,
                rgba(0, 255, 65, 0.05) 0px,
                rgba(0, 255, 65, 0.05) 1px,
                transparent 1px,
                transparent 3px
              )
            `
          }}></div>
        </div>

        {/* Film grain texture */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.08]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            mixBlendMode: 'overlay'
          }}
        ></div>

        {/* Very slight flicker effect */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            animation: 'flicker 8s infinite',
            background: 'rgba(0, 255, 65, 0.1)'
          }}
        ></div>
      </div>

      {/* Terminal-style header */}
      <div className="absolute top-4 sm:top-8 left-4 right-4 sm:left-6 sm:right-6 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs sm:text-sm text-terminal-gray z-20 gap-2 sm:gap-0">
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="text-terminal-green">SYSTEM</span>
          <span className="text-terminal-cyan">READY</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="text-terminal-amber hidden sm:inline">ANKARA, TR</span>
          <span className="text-terminal-green">{mounted && currentTime}</span>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto w-full relative z-20 pt-16 sm:pt-0">
        <div className="space-y-6 sm:space-y-8">
          {/* Terminal prompt style */}
          <div className="text-terminal-green text-xs sm:text-sm mb-2 sm:mb-4">
            <span className="terminal-prompt"></span>
            <span className="cursor-blink"></span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-mono font-light text-terminal-green crt-glow leading-tight">
            {mounted ? (
              <>
                {displayText1 || targetText1}
                <br />
                {displayText2 || targetText2}
              </>
            ) : (
              <>
                {targetText1}
                <br />
                {targetText2}
              </>
            )}
          </h1>
          
          <div className="space-y-1 sm:space-y-2 text-base sm:text-xl md:text-2xl text-terminal-cyan font-mono">
            <div className="terminal-prompt">FRONTEND DEVELOPER</div>
            <div className="terminal-prompt">BASED IN ANKARA, TURKEY</div>
          </div>

          <div className="pt-4 sm:pt-8 text-sm sm:text-base md:text-lg text-terminal-gray font-mono leading-relaxed max-w-3xl">
            <div className="terminal-prompt">I design and develop interactive experiences</div>
            <div className="terminal-prompt">that break away from sterile patterns,</div>
            <div className="terminal-prompt">reintroducing delight and genuine</div>
            <div className="terminal-prompt">engagement into everyday technology.</div>
          </div>

          {/* Navigation links */}
          <div className="flex flex-wrap gap-4 sm:gap-6 pt-4 sm:pt-8 relative z-30">
            <Link
              href="#projects"
              className="text-terminal-green hover:text-terminal-cyan transition-colors font-mono text-xs sm:text-sm terminal-border px-3 py-1.5 sm:px-4 sm:py-2 bg-dark-bg/50 backdrop-blur-sm hover:bg-dark-bg/70"
            >
              [VIEW PROJECTS]
            </Link>
            <Link
              href="#contact"
              className="text-terminal-green hover:text-terminal-cyan transition-colors font-mono text-xs sm:text-sm terminal-border px-3 py-1.5 sm:px-4 sm:py-2 bg-dark-bg/50 backdrop-blur-sm hover:bg-dark-bg/70"
            >
              [CONTACT]
            </Link>
          </div>
        </div>
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-5 z-5">
        <div className="h-full w-full" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 65, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 65, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Fade-out gradient at bottom for smooth transition - only affects background */}
      <div className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none z-5 bg-gradient-to-t from-dark-bg via-dark-bg/80 to-transparent"></div>
    </section>
  )
}

export default Hero
