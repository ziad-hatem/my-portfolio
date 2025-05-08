"use client"

import { useEffect, useRef } from "react"
import type { WorkExperience } from "@prisma/client"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import SectionHeading from "@/components/ui/section-heading"

gsap.registerPlugin(ScrollTrigger)

interface ExperienceProps {
  workExperience: WorkExperience[]
}

export default function Experience({ workExperience }: ExperienceProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline animation
      gsap.fromTo(
        timelineRef.current?.children,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.3,
          duration: 0.8,
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  if (!workExperience.length) return null

  return (
    <section id="experience" ref={sectionRef} className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <SectionHeading title="Work Experience" subtitle="My professional journey" />

        <div
          ref={timelineRef}
          className="mt-12 space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-1/2 before:h-full before:w-0.5 before:bg-border md:before:mx-auto md:before:translate-x-0"
        >
          {workExperience.map((job, index) => (
            <div
              key={job.id}
              className={`relative flex flex-col md:items-center md:flex-row md:gap-6 ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold z-10 md:mx-auto">
                {index + 1}
              </div>

              <Card className={`w-full md:w-[calc(50%-3rem)] mt-3 md:mt-0`}>
                <CardHeader>
                  <CardTitle>{job.title}</CardTitle>
                  <div className="text-sm text-muted-foreground">
                    {format(new Date(job.startDate), "MMM yyyy")} -{" "}
                    {job.endDate ? format(new Date(job.endDate), "MMM yyyy") : "Present"}
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{job.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
