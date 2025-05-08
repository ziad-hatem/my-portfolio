"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface GeometricPatternProps {
  className?: string
  color?: string
  density?: number
  animate?: boolean
}

export default function GeometricPattern({
  className = "",
  color = "currentColor",
  density = 20,
  animate = true,
}: GeometricPatternProps) {
  const patternRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!animate || !patternRef.current) return

    const shapes = patternRef.current.querySelectorAll(".shape")

    gsap.fromTo(
      shapes,
      {
        opacity: 0,
        scale: 0.5,
      },
      {
        opacity: 0.2,
        scale: 1,
        duration: 1,
        stagger: 0.02,
        ease: "power3.out",
      },
    )

    // Subtle continuous animation
    shapes.forEach((shape) => {
      const duration = 3 + Math.random() * 5
      gsap.to(shape, {
        rotation: `+=${Math.random() > 0.5 ? 360 : -360}`,
        duration,
        repeat: -1,
        ease: "none",
      })
    })

    return () => {
      gsap.killTweensOf(shapes)
    }
  }, [animate])

  // Generate shapes
  const shapes = []
  for (let i = 0; i < density; i++) {
    const size = 10 + Math.random() * 30
    const x = Math.random() * 100
    const y = Math.random() * 100
    const type = Math.floor(Math.random() * 3)

    let shapeElement
    if (type === 0) {
      // Circle
      shapeElement = (
        <circle key={i} className="shape" cx={size / 2} cy={size / 2} r={size / 2} fill={color} opacity="0.1" />
      )
    } else if (type === 1) {
      // Square
      shapeElement = <rect key={i} className="shape" width={size} height={size} fill={color} opacity="0.1" />
    } else {
      // Triangle
      const points = `${size / 2},0 ${size},${size} 0,${size}`
      shapeElement = <polygon key={i} className="shape" points={points} fill={color} opacity="0.1" />
    }

    shapes.push(
      <div
        key={i}
        className="absolute shape"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: `${x}%`,
          top: `${y}%`,
          transform: `rotate(${Math.random() * 360}deg)`,
        }}
      >
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {shapeElement}
        </svg>
      </div>,
    )
  }

  return (
    <div ref={patternRef} className={`absolute inset-0 overflow-hidden -z-10 ${className}`}>
      {shapes}
    </div>
  )
}
