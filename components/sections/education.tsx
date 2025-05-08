"use client"

import { useEffect, useRef } from "react"
import type { Education as EducationType } from "@prisma/client"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import SectionHeading from "@/components/ui/section-heading"

gsap.registerPlugin(ScrollTrigger)

interface EducationProps {
  education: EducationType[]
}

export default function Education({ education }: EducationProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const educationRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Education animation
      gsap.fromTo(
        educationRef.current?.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          scrollTrigger: {
            trigger: educationRef.current,
            start: "top 80%",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  if (!education.length) return null

  return (
    <section id="education" ref={sectionRef} className="py-20 px-4">
      <div className="container mx-auto">
        <SectionHeading title="Education" subtitle="Academic background" />

        <div ref={educationRef} className="grid md:grid-cols-2 gap-6 mt-12">
          {education.map((edu) => (
            <Card key={edu.id}>
              <CardHeader>
                <CardTitle>{edu.title}</CardTitle>
                <div className="text-sm text-muted-foreground">
                  {format(new Date(edu.startDate), "MMM yyyy")} - {format(new Date(edu.endDate), "MMM yyyy")}
                </div>
              </CardHeader>
              <CardContent>
                <p>{edu.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
