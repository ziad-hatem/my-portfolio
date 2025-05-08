"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface GradientBlobProps {
  className?: string
  colors?: string[]
  speed?: number
}

export default function GradientBlob({
  className = "",
  colors = ["#4f46e5", "#8b5cf6", "#ec4899"],
  speed = 20,
}: GradientBlobProps) {
  const blobRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const blob = blobRef.current
    if (!blob) return

    // Create a timeline for continuous animation
    const tl = gsap.timeline({ repeat: -1, yoyo: true })

    // Animate the blob shape
    tl.to(blob, {
      borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
      duration: speed,
      ease: "sine.inOut",
    })
    tl.to(blob, {
      borderRadius: "40% 60% 70% 30% / 50% 60% 30% 60%",
      duration: speed,
      ease: "sine.inOut",
    })
    tl.to(blob, {
      borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
      duration: speed,
      ease: "sine.inOut",
    })

    // Animate rotation
    gsap.to(blob, {
      rotation: 360,
      duration: speed * 3,
      ease: "none",
      repeat: -1,
    })

    return () => {
      tl.kill()
      gsap.killTweensOf(blob)
    }
  }, [speed])

  const gradientStyle = {
    background: `linear-gradient(45deg, ${colors.join(", ")})`,
  }

  return (
    <div
      ref={blobRef}
      className={`absolute w-[500px] h-[500px] opacity-20 blur-[80px] -z-10 ${className}`}
      style={gradientStyle}
    />
  )
}
