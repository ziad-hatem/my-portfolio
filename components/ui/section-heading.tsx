"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface SectionHeadingProps {
  title: string
  subtitle: string
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  const headingRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Basic animation
      gsap.fromTo(
        [subtitleRef.current, titleRef.current],
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
          },
        },
      )

      // Add a line animation
      const line = document.createElement("div")
      line.className = "h-1 bg-primary w-0 mx-auto mt-4 rounded-full"
      headingRef.current?.appendChild(line)

      gsap.to(line, {
        width: "60px",
        duration: 0.8,
        delay: 0.4,
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
        },
      })

      // Character animation for title
      if (titleRef.current) {
        const text = titleRef.current.textContent || ""
        titleRef.current.innerHTML = ""

        // Create spans for each character
        text.split("").forEach((char) => {
          const span = document.createElement("span")
          span.className = "char inline-block"
          span.textContent = char === " " ? "\u00A0" : char
          titleRef.current?.appendChild(span)
        })

        // Animate each character
        gsap.fromTo(
          titleRef.current.querySelectorAll(".char"),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.03,
            duration: 0.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 80%",
            },
          },
        )
      }
    }, headingRef)

    return () => ctx.revert()
  }, [title, subtitle])

  return (
    <div ref={headingRef} className="text-center mb-12">
      <h3 ref={subtitleRef} className="text-primary font-medium mb-2">
        {subtitle}
      </h3>
      <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold">
        {title}
      </h2>
    </div>
  )
}
