"use client";

import type React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

const navLinks = [
  { href: "#", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#");
  const navRef = useRef<HTMLElement>(null);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);

    // Determine active section
    const sections = document.querySelectorAll("section[id]");
    const scrollPosition = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = (section as HTMLElement).offsetTop;
      const sectionHeight = (section as HTMLElement).offsetHeight;
      const sectionId = `#${section.getAttribute("id")}`;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        setActiveSection(sectionId);
      }
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animation
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );

      // Link hover animations
      const navItems = navRef.current?.querySelectorAll(".nav-link");

      navItems?.forEach((item) => {
        item.addEventListener("mouseenter", () => {
          gsap.to(item, {
            y: -2,
            color: "hsl(var(--primary))",
            duration: 0.2,
          });
        });

        item.addEventListener("mouseleave", () => {
          if (!(item as HTMLElement).classList.contains("active")) {
            gsap.to(item, {
              y: 0,
              color: "hsl(var(--foreground))",
              duration: 0.2,
            });
          }
        });
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  // Smooth scroll function
  const scrollToSection = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();

      const targetId = href === "#" ? "body" : href.substring(1);
      const targetElement = document.getElementById(targetId) || document.body;

      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });

      setIsOpen(false);
    },
    []
  );

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="#" className="text-xl font-bold">
            Portfolio
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`nav-link transition-colors ${
                  activeSection === link.href
                    ? "text-primary"
                    : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <ModeToggle />
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <ModeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="hover:bg-transparent"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`nav-link transition-colors ${
                    activeSection === link.href
                      ? "text-primary"
                      : "text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
