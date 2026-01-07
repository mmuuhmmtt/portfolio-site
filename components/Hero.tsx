'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

interface HeroProps {
  onLoadingChange?: (isLoading: boolean) => void
}

const Hero = ({ onLoadingChange }: HeroProps = {}) => {
  const [currentTime, setCurrentTime] = useState('')
  const [mounted, setMounted] = useState(false)
  const [displayText1, setDisplayText1] = useState('')
  const [displayText2, setDisplayText2] = useState('')
  const [displayText3, setDisplayText3] = useState('') // FRONTEND DEVELOPER
  const [isAnimating, setIsAnimating] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const [systemReady, setSystemReady] = useState(0) // Yüzde sayacı (0-100)
  const [showReady, setShowReady] = useState(false) // READY ekranını göster
  const [contentVisible, setContentVisible] = useState(false) // Ana içeriği göster
  const videoRef = useRef<HTMLVideoElement>(null)
  
  // Video path - handle basePath for GitHub Pages
  const [videoPath, setVideoPath] = useState('/videos/video.mp4')
  const [imagePath, setImagePath] = useState('/images/profile.jpg')
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check if we're on GitHub Pages
      const pathname = window.location.pathname
      if (pathname.startsWith('/portfolio-site')) {
        setVideoPath('/portfolio-site/videos/video.mp4')
        setImagePath('/portfolio-site/images/profile.jpg')
      } else {
        setVideoPath('/videos/video.mp4')
        setImagePath('/images/profile.jpg')
      }
    }
  }, [])

  const targetText1 = 'MUHAMMET'
  const targetText2 = 'COŞGUN'
  const targetText3 = 'SOFTWARE DEVELOPER'
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'
  
  // Rastgele harf üretme fonksiyonu
  const getRandomText = (length: number) => {
    return Array.from({ length }, () => 
      chars[Math.floor(Math.random() * chars.length)]
    ).join('')
  }

  useEffect(() => {
    setMounted(true)
    
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, '0')
      const minutes = now.getMinutes().toString().padStart(2, '0')
      setCurrentTime(`${hours}:${minutes}`)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    
    // Yüzde sayacı animasyonu - Sadece ilk yüklemede çalışır, performans odaklı
    let progress = 0
    let animationFrameId: number | null = null
    const startTime = Date.now()
    const duration = 1300 // 1.5 saniye
    
    const animate = () => {
      const elapsed = Date.now() - startTime
      progress = Math.min(100, Math.floor((elapsed / duration) * 100))
      
      setSystemReady(progress)
      
      if (progress < 100) {
        animationFrameId = requestAnimationFrame(animate)
      } else {
        // 100% olduğunda READY ekranını göster
        setShowReady(true)
        // 500ms sonra READY ekranını kapat ve içeriği göster
        setTimeout(() => {
          setShowReady(false)
          setContentVisible(true)
        }, 350)
      }
    }
    
    // İlk frame'i başlat
    animationFrameId = requestAnimationFrame(animate)
    
    return () => {
      clearInterval(interval)
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  // Video error handling
  useEffect(() => {
    if (videoRef.current) {
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
    }
  }, [mounted])

  // Loading durumunu parent'a bildir
  useEffect(() => {
    if (onLoadingChange) {
      const isLoading = systemReady < 100 || showReady
      onLoadingChange(isLoading)
    }
  }, [systemReady, showReady, onLoadingChange])

  // Tüm yazılar için scramble animasyonu - hepsi aynı anda (içerik görünür olduğunda başlar)
  useEffect(() => {
    if (!mounted || !contentVisible) return
    
    setIsAnimating(true)
    
    // Tüm metinler için başlangıç değerleri (rastgele harfler)
    const texts = [
      { setter: setDisplayText1, target: targetText1 },
      { setter: setDisplayText2, target: targetText2 },
      { setter: setDisplayText3, target: targetText3 },
    ]
    
    // Her metin için iteration sayacı
    const iterations = texts.map(() => 0)
    
    const interval = setInterval(() => {
      texts.forEach((text, textIndex) => {
        const currentIteration = iterations[textIndex]
        
        if (currentIteration < text.target.length) {
          text.setter(
            text.target
              .split('')
              .map((char, index) => {
                if (index < currentIteration) {
                  return text.target[index]
                }
                return chars[Math.floor(Math.random() * chars.length)]
              })
              .join('')
          )
          iterations[textIndex] += 1 / 3
        } else if (currentIteration >= text.target.length && currentIteration < text.target.length + 0.5) {
          // Son harfi doğru yap
          text.setter(text.target)
          iterations[textIndex] = text.target.length + 1
        }
      })
      
      // Tüm animasyonlar bitti mi kontrol et
      if (iterations.every((iter, idx) => iter >= texts[idx].target.length + 0.5)) {
        clearInterval(interval)
        setIsAnimating(false)
        // Son kontrol - tüm metinleri doğru yap
        texts.forEach((text) => {
          text.setter(text.target)
        })
      }
    }, 50)

    return () => clearInterval(interval)
  }, [mounted, contentVisible])

  return (
    <section className="min-h-screen flex flex-col justify-center px-6 lg:px-8 py-24 relative overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        {!videoError ? (
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
        ) : (
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

      {/* System Ready Loading Screen */}
      {systemReady < 100 && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-dark-bg/95 backdrop-blur-sm">
          <div className="text-center">
            <div className="text-terminal-green font-mono text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 crt-glow">
              <span>SYSTEM</span>
            </div>
            <div className="text-terminal-cyan font-mono text-4xl sm:text-5xl md:text-6xl lg:text-7xl crt-glow">
              {systemReady}%
            </div>
          </div>
        </div>
      )}
      
      {/* READY Screen - Shows briefly after 100% */}
      {showReady && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-dark-bg/95 backdrop-blur-sm transition-opacity duration-500">
          <div className="text-center">
            <div className="text-terminal-green font-mono text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 crt-glow">
              <span>SYSTEM</span>
            </div>
            <div className="text-terminal-cyan font-mono text-4xl sm:text-5xl md:text-6xl lg:text-7xl crt-glow">
              READY
            </div>
          </div>
        </div>
      )}

      {/* Terminal-style header */}
      <div className="absolute top-20 sm:top-8 left-4 right-4 sm:left-6 sm:right-6 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs sm:text-sm text-terminal-gray z-20 gap-2 sm:gap-0">
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
          <span className="text-terminal-green/40">SYSTEM</span>
          <span className="text-terminal-cyan/40">
            {systemReady < 100 ? `${systemReady}%` : 'READY'}
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
          <span className="text-terminal-amber/40 hidden sm:inline">ANKARA, TR</span>
          <span className="text-terminal-green/40">{mounted && currentTime}</span>
        </div>
      </div>

      {/* Main content - Only visible after READY screen */}
      <div className={`max-w-7xl mx-auto w-full relative z-20 pt-16 sm:pt-0 transition-opacity duration-500 ${!contentVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Mobile - Profile Photo (Top) */}
          <div className="flex justify-center items-center lg:hidden mb-4">
            <div className="terminal-border p-2 relative group">
              <div className="relative overflow-hidden">
                <img
                  src={imagePath}
                  alt="Muhammet Coşgun"
                  className="w-40 h-40 sm:w-48 sm:h-48 object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  onError={(e) => {
                    // Fallback if image doesn't exist
                    e.currentTarget.style.display = 'none'
                  }}
                />
                {/* CRT scanline overlay on image */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.15]">
                  <div className="h-full w-full" style={{
                    background: `
                      repeating-linear-gradient(
                        0deg,
                        rgba(0, 255, 65, 0.1) 0px,
                        rgba(0, 255, 65, 0.1) 1px,
                        transparent 1px,
                        transparent 3px
                      )
                    `
                  }}></div>
                </div>
              </div>
              {/* Terminal label */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-terminal-green font-mono text-[10px] opacity-50 whitespace-nowrap">
                <span className="terminal-prompt"></span>PROFILE [
                <span className="group-hover:hidden">DEACTIVE</span>
                <span className="hidden group-hover:inline">ACTIVE</span>
                ]
              </div>
            </div>
          </div>

          {/* Left side - Text content */}
          <div className="space-y-6 sm:space-y-8">
            {/* Terminal prompt style */}
            <div className="text-terminal-green text-xs sm:text-sm mb-2 sm:mb-4">
              <span className="terminal-prompt"></span>
              <span className="cursor-blink"></span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-mono font-light text-terminal-green crt-glow leading-tight ml-2 sm:ml-3 md:ml-4">
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
            
            <div className="text-terminal-cyan font-mono">
              <div className="terminal-prompt text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                {mounted ? (displayText3 || getRandomText(targetText3.length)) : targetText3}
              </div>
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

          {/* Right side - Profile Photo */}
          <div className="hidden lg:flex justify-center items-start relative z-20 -mt-20 lg:-mt-12">
            <div className="terminal-border p-2 relative group">
              <div className="relative overflow-hidden">
                <img
                  src={imagePath}
                  alt="Muhammet Coşgun"
                  className="w-56 h-56 object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  onError={(e) => {
                    // Fallback if image doesn't exist
                    e.currentTarget.style.display = 'none'
                  }}
                />
                {/* CRT scanline overlay on image */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.15]">
                  <div className="h-full w-full" style={{
                    background: `
                      repeating-linear-gradient(
                        0deg,
                        rgba(0, 255, 65, 0.1) 0px,
                        rgba(0, 255, 65, 0.1) 1px,
                        transparent 1px,
                        transparent 3px
                      )
                    `
                  }}></div>
                </div>
              </div>
              {/* Terminal label */}
              <div className="absolute -bottom-8 right-0 text-terminal-green font-mono text-[10px] opacity-50">
                <span className="terminal-prompt"></span>PROFILE [
                <span className="group-hover:hidden">DEACTIVE</span>
                <span className="hidden group-hover:inline">ACTIVE</span>
                ]
              </div>
            </div>
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
