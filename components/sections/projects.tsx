"use client";

import { useEffect, useRef, useState } from "react";
import type { Projects as ProjectType, Technology } from "@prisma/client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github, Youtube } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SectionHeading from "@/components/ui/section-heading";

gsap.registerPlugin(ScrollTrigger);

interface ProjectsProps {
  projects: (ProjectType & {
    technologies: Technology[];
  })[];
}

export default function Projects({ projects }: ProjectsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const [visibleProjects, setVisibleProjects] = useState(6);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Projects animation
      gsap.fromTo(
        projectsRef.current?.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [visibleProjects]);

  if (!projects.length) return null;

  const displayedProjects = projects.slice(0, visibleProjects);
  const hasMoreProjects = projects.length > visibleProjects;

  return (
    <section id="projects" ref={sectionRef} className="py-20 px-4">
      <div className="container mx-auto">
        <SectionHeading title="My Projects" subtitle="Recent work" />

        <div
          ref={projectsRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
        >
          {displayedProjects.map((project) => (
            <Card key={project.id} className="group overflow-hidden">
              <div className="relative h-80 w-full overflow-hidden">
                <Image
                  src={project.imageUrl || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 h-auto w-full group-hover:scale-110"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <Badge key={tech.id} variant="secondary">
                      {tech.name}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge variant="outline">
                      +{project.technologies.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2 mt-4">
                  <Link
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="sm" variant="default">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Project
                    </Button>
                  </Link>

                  {project.githubUrl && (
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button size="sm" variant="outline">
                        <Github className="h-4 w-4" />
                        <span className="sr-only">GitHub</span>
                      </Button>
                    </Link>
                  )}

                  {project.youtubeUrl && (
                    <Link
                      href={project.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button size="sm" variant="outline">
                        <Youtube className="h-4 w-4" />
                        <span className="sr-only">YouTube</span>
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {hasMoreProjects && (
          <div className="flex justify-center mt-12">
            <Button
              onClick={() => setVisibleProjects((prev) => prev + 3)}
              variant="outline"
            >
              Load More Projects
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
