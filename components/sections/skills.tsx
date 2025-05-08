"use client"

import { useEffect, useRef } from "react"
import type { MySkills } from "@prisma/client"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import SectionHeading from "@/components/ui/section-heading"

gsap.registerPlugin(ScrollTrigger)

interface SkillsProps {
  skills: MySkills[]
}

export default function Skills({ skills }: SkillsProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Skills animation
      gsap.fromTo(
        skillsRef.current?.children,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.05,
          duration: 0.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  if (!skills.length) return null

  return (
    <section id="skills" ref={sectionRef} className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <SectionHeading title="My Skills" subtitle="Technologies I work with" />

        <div ref={skillsRef} className="flex flex-wrap justify-center gap-6 mt-12">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="flex flex-col items-center p-4 bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-16 relative mb-3">
                <Image src={skill.icon || "/placeholder.svg"} alt={skill.name} fill className="object-contain" />
              </div>
              <span className="text-sm font-medium">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
