"use client"

import { useEffect, useRef } from "react"
import type { WhatIDo as WhatIDoType } from "@prisma/client"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import SectionHeading from "@/components/ui/section-heading"

gsap.registerPlugin(ScrollTrigger)

interface WhatIDoProps {
  whatIDo: WhatIDoType[]
}

export default function WhatIDo({ whatIDo }: WhatIDoProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards animation
      gsap.fromTo(
        cardsRef.current?.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  if (!whatIDo.length) return null

  return (
    <section id="services" ref={sectionRef} className="py-20 px-4">
      <div className="container mx-auto">
        <SectionHeading title="What I Do" subtitle="My services" />

        <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {whatIDo.map((service) => (
            <Card key={service.id} className="group hover:border-primary/50 transition-colors">
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
