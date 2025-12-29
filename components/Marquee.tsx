'use client'

import { motion } from 'framer-motion'

interface MarqueeProps {
  text: string
  speed?: number
  className?: string
}

const Marquee = ({ text, speed = 50, className = '' }: MarqueeProps) => {
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-block"
        animate={{
          x: ['0%', '-100%'],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: speed,
            ease: 'linear',
          },
        }}
      >
        <span className="inline-block mr-8">{text}</span>
        <span className="inline-block mr-8">{text}</span>
        <span className="inline-block mr-8">{text}</span>
        <span className="inline-block mr-8">{text}</span>
      </motion.div>
    </div>
  )
}

export default Marquee

