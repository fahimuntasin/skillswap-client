"use client"

import { useEffect } from "react"
import gsap from "gsap"

export function GsapInit() {
  useEffect(() => {
    document.querySelectorAll(".gsap-hover").forEach(el => {
      el.addEventListener("mouseenter", () => gsap.to(el, { scale: 1.03, duration: 0.3, ease: "power2.out" }))
      el.addEventListener("mouseleave", () => gsap.to(el, { scale: 1, duration: 0.3, ease: "power2.out" }))
    })
  }, [])
  return null
}
