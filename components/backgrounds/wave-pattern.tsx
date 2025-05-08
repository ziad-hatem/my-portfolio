"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface WavePatternProps {
  className?: string
  color?: string
  waveCount?: number
  amplitude?: number
  frequency?: number
  speed?: number
}

export default function WavePattern({
  className = "",
  color = "currentColor",
  waveCount = 3,
  amplitude = 20,
  frequency = 0.02,
  speed = 15,
}: WavePatternProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const paths = svgRef.current.querySelectorAll("path")

    // Animate each wave
    paths.forEach((path, index) => {
      // Create a timeline for continuous animation
      gsap.to(path, {
        attr: { d: generateWavePath(index, true) },
        duration: speed + index * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    })

    function generateWavePath(index: number, alternate = false) {
      const height = 100
      const width = 100
      const waveHeight = amplitude - index * (amplitude / waveCount)
      const waveFrequency = frequency + index * (frequency / waveCount) * 0.5
      const offset = alternate ? 50 : 0

      let path = `M 0 ${height / 2}`

      for (let x = 0; x <= width; x++) {
        const y = Math.sin((x + offset) * waveFrequency) * waveHeight + height / 2
        path += ` L ${x} ${y}`
      }

      path += ` L ${width} ${height} L 0 ${height} Z`
      return path
    }

    return () => {
      gsap.killTweensOf(paths)
    }
  }, [amplitude, frequency, speed, waveCount])

  // Generate wave paths
  const waves = Array.from({ length: waveCount }).map((_, index) => {
    const opacity = 0.1 - index * (0.1 / waveCount)

    return (
      <path
        key={index}
        d={`M 0 50 ${Array.from({ length: 100 })
          .map((_, x) => `L ${x} ${Math.sin(x * frequency) * (amplitude - index * (amplitude / waveCount)) + 50}`)
          .join(" ")} L 100 100 L 0 100 Z`}
        fill={color}
        opacity={opacity}
      />
    )
  })

  return (
    <div className={`absolute inset-0 overflow-hidden -z-10 ${className}`}>
      <svg ref={svgRef} viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
        {waves}
      </svg>
    </div>
  )
}
