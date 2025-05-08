"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { User } from "@prisma/client";
import { ArrowDown, Linkedin, Mail, MapPin, FileDown } from "lucide-react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import GradientBlob from "@/components/backgrounds/gradient-blob";

interface HeroProps {
  user: User;
}

export default function Hero({ user }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Simplified hero animation
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1 }
      );

      if (contentRef.current?.children) {
        tl.fromTo(
          contentRef.current.children,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.6 },
          "-=0.5"
        );
      }

      // Simplified title animation
      if (titleRef.current) {
        const text = titleRef.current.textContent || "";
        titleRef.current.innerHTML = "";

        const chars = text.split("").map((char) => {
          const span = document.createElement("span");
          span.className = "char inline-block";
          span.textContent = char === " " ? "\u00A0" : char;
          return span;
        });

        titleRef.current.append(...chars);

        gsap.fromTo(
          chars,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.02,
            duration: 0.6,
            ease: "power3.out",
            delay: 0.3,
          }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex flex-col items-center justify-center py-20 px-4 relative overflow-hidden"
    >
      {/* Background elements */}
      <GradientBlob
        className="left-1/4 -top-1/4"
        colors={["#4f46e5", "#8b5cf6", "#ec4899"]}
      />
      <GradientBlob
        className="right-1/4 -bottom-1/4"
        colors={["#06b6d4", "#3b82f6", "#8b5cf6"]}
      />

      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div ref={imageRef} className="order-2 md:order-1 flex justify-center">
          {user.image ? (
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl">
              <Image
                src={user.image || "/placeholder.svg"}
                alt={user.name || "Portfolio Owner"}
                fill
                className="object-cover"
                priority
              />
            </div>
          ) : (
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-muted flex items-center justify-center text-4xl font-bold shadow-xl">
              {user.name?.charAt(0) || "P"}
            </div>
          )}
        </div>

        <div
          ref={contentRef}
          className="order-1 md:order-2 text-center md:text-left"
        >
          <p className="text-primary font-medium mb-2">Hello, I'm</p>
          <h1
            ref={titleRef}
            className="text-4xl md:text-6xl font-bold mb-4 leading-tight"
          >
            {user.name || "Portfolio Owner"}
          </h1>
          <h2 className="text-2xl md:text-3xl text-muted-foreground mb-6">
            {user.position || "Web Developer"}
          </h2>

          <div className="flex flex-wrap gap-4 mb-8 justify-center md:justify-start">
            {user.location && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin size={16} />
                <span>{user.location}</span>
              </div>
            )}

            {user.email && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Mail size={16} />
                <span>{user.email}</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-4 mb-8 justify-center md:justify-start">
            {user.linkedinUrl && (
              <Link
                href={user.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="hover:scale-110 transition-transform"
                >
                  <Linkedin size={20} />
                  <span className="sr-only">LinkedIn</span>
                </Button>
              </Link>
            )}

            {user.cvUrl && (
              <Link href={user.cvUrl} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  className="hover:scale-105 transition-transform"
                >
                  <FileDown size={20} className="mr-2" />
                  Download CV
                </Button>
              </Link>
            )}

            <Link href="#contact">
              <Button className="hover:scale-105 transition-transform">
                Contact Me
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <Link href="#about">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:scale-110 transition-transform"
          >
            <ArrowDown />
            <span className="sr-only">Scroll Down</span>
          </Button>
        </Link>
      </div>
    </section>
  );
}
