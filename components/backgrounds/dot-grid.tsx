"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface DotGridProps {
  className?: string
  dotColor?: string
  dotSize?: number
  spacing?: number
  animate?: boolean
}

export default function DotGrid({
  className = "",
  dotColor = "currentColor",
  dotSize = 4,
  spacing = 30,
  animate = true,
}: DotGridProps) {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!animate || !gridRef.current) return

    const dots = gridRef.current.querySelectorAll(".dot")

    // Initial animation
    gsap.fromTo(
      dots,
      { opacity: 0, scale: 0 },
      {
        opacity: 0.5,
        scale: 1,
        duration: 0.8,
        stagger: {
          grid: [Math.ceil(window.innerWidth / spacing), Math.ceil(window.innerHeight / spacing)],
          from: "center",
          amount: 1,
        },
        ease: "power3.out",
      },
    )

    // Subtle pulse animation
    dots.forEach((dot) => {
      const delay = Math.random() * 5
      const duration = 2 + Math.random() * 3

      gsap.to(dot, {
        scale: 1.3,
        opacity: 0.8,
        duration,
        delay,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    })

    return () => {
      gsap.killTweensOf(dots)
    }
  }, [animate, spacing])

  // Generate grid of dots
  const generateDots = () => {
    const dots = []
    const cols = Math.ceil(100 / (spacing / 10))
    const rows = Math.ceil(100 / (spacing / 10))

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        dots.push(
          <div
            key={`${x}-${y}`}
            className="absolute dot rounded-full"
            style={{
              left: `${x * (spacing / 10)}%`,
              top: `${y * (spacing / 10)}%`,
              width: `${dotSize}px`,
              height: `${dotSize}px`,
              backgroundColor: dotColor,
              opacity: 0.3,
            }}
          />,
        )
      }
    }

    return dots
  }

  return (
    <div ref={gridRef} className={`absolute inset-0 overflow-hidden -z-10 ${className}`}>
      {generateDots()}
    </div>
  )
}
