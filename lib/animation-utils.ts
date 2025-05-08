import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// Fade in animation
export function fadeIn(element: HTMLElement, delay = 0, duration = 0.8) {
  return gsap.fromTo(
    element,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: "power3.out",
    },
  )
}

// Fade in from left
export function fadeInLeft(element: HTMLElement, delay = 0, duration = 0.8) {
  return gsap.fromTo(
    element,
    { opacity: 0, x: -50 },
    {
      opacity: 1,
      x: 0,
      duration,
      delay,
      ease: "power3.out",
    },
  )
}

// Fade in from right
export function fadeInRight(element: HTMLElement, delay = 0, duration = 0.8) {
  return gsap.fromTo(
    element,
    { opacity: 0, x: 50 },
    {
      opacity: 1,
      x: 0,
      duration,
      delay,
      ease: "power3.out",
    },
  )
}

// Scale in animation
export function scaleIn(element: HTMLElement, delay = 0, duration = 0.8) {
  return gsap.fromTo(
    element,
    { opacity: 0, scale: 0.8 },
    {
      opacity: 1,
      scale: 1,
      duration,
      delay,
      ease: "back.out(1.7)",
    },
  )
}

// Staggered animation for multiple elements
export function staggerElements(
  elements: HTMLElement[] | NodeListOf<Element>,
  animation: "fadeIn" | "scaleIn" | "fadeInLeft" | "fadeInRight" = "fadeIn",
  staggerAmount = 0.1,
  duration = 0.8,
) {
  const config = {
    opacity: 0,
    duration,
    stagger: staggerAmount,
    ease: "power3.out",
  }

  switch (animation) {
    case "fadeIn":
      return gsap.fromTo(elements, { opacity: 0, y: 30 }, { ...config, y: 0 })
    case "scaleIn":
      return gsap.fromTo(elements, { opacity: 0, scale: 0.8 }, { ...config, scale: 1, ease: "back.out(1.7)" })
    case "fadeInLeft":
      return gsap.fromTo(elements, { opacity: 0, x: -50 }, { ...config, x: 0 })
    case "fadeInRight":
      return gsap.fromTo(elements, { opacity: 0, x: 50 }, { ...config, x: 0 })
    default:
      return gsap.fromTo(elements, { opacity: 0, y: 30 }, { ...config, y: 0 })
  }
}

// Create a scroll trigger animation
export function createScrollTrigger(
  trigger: string | Element,
  animation: gsap.core.Tween,
  start = "top 80%",
  toggleActions = "play none none none",
) {
  return ScrollTrigger.create({
    trigger,
    start,
    toggleActions,
    animation,
  })
}

// Animate text characters
export function animateTextChars(element: HTMLElement, staggerAmount = 0.03, duration = 0.5) {
  // Split text into spans if not already split
  if (!element.querySelector(".char")) {
    const text = element.textContent
    element.textContent = ""

    if (text) {
      text.split("").forEach((char) => {
        const span = document.createElement("span")
        span.className = "char inline-block"
        span.textContent = char === " " ? "\u00A0" : char
        element.appendChild(span)
      })
    }
  }

  const chars = element.querySelectorAll(".char")

  return gsap.fromTo(
    chars,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger: staggerAmount,
      ease: "power3.out",
    },
  )
}

// Parallax effect
export function createParallax(element: HTMLElement, speed = 0.5) {
  return ScrollTrigger.create({
    trigger: element,
    start: "top bottom",
    end: "bottom top",
    scrub: true,
    onUpdate: (self) => {
      const yPos = -self.progress * 100 * speed
      gsap.set(element, { y: yPos })
    },
  })
}

// Reveal on scroll
export function revealOnScroll(
  element: HTMLElement | string,
  animation: "fadeIn" | "scaleIn" | "fadeInLeft" | "fadeInRight" = "fadeIn",
  start = "top 80%",
) {
  const el = typeof element === "string" ? document.querySelector(element) : element
  if (!el) return

  let tween

  switch (animation) {
    case "fadeIn":
      tween = gsap.fromTo(el, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
      break
    case "scaleIn":
      tween = gsap.fromTo(
        el,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
      )
      break
    case "fadeInLeft":
      tween = gsap.fromTo(el, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" })
      break
    case "fadeInRight":
      tween = gsap.fromTo(el, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" })
      break
    default:
      tween = gsap.fromTo(el, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
  }

  tween.pause()

  ScrollTrigger.create({
    trigger: el,
    start,
    onEnter: () => tween.play(),
  })

  return tween
}
