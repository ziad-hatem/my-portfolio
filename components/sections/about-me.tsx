"use client"

import { useEffect, useRef } from "react"
import type { AboutMe as AboutMeType } from "@prisma/client"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Award, Clock, GraduationCap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import SectionHeading from "@/components/ui/section-heading"

gsap.registerPlugin(ScrollTrigger)

interface AboutMeProps {
  aboutMe: AboutMeType | null
}

export default function AboutMe({ aboutMe }: AboutMeProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
          },
        },
      )

      // Stats animation
      gsap.fromTo(
        statsRef.current?.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.6,
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  if (!aboutMe) return null

  return (
    <section id="about" ref={sectionRef} className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <SectionHeading title="About Me" subtitle="Get to know me better" />

        <div className="grid md:grid-cols-2 gap-12 mt-12">
          <div ref={contentRef} className="prose dark:prose-invert max-w-none">
            <p className="text-lg">{aboutMe.description}</p>
          </div>

          <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="mb-4 bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-4xl font-bold mb-2">{aboutMe.yearsOfExperience}+</h3>
                <p className="text-muted-foreground">Years of Experience</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="mb-4 bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-4xl font-bold mb-2">{aboutMe.trainingCourses}+</h3>
                <p className="text-muted-foreground">Training Courses</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="mb-4 bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-4xl font-bold mb-2">{aboutMe.awardsCertificates}+</h3>
                <p className="text-muted-foreground">Awards & Certificates</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
