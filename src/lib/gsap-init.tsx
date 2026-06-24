"use client"

import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function GsapInit() {
  useEffect(() => {
    // Hover scale effect on all interactive elements
    document.querySelectorAll(".gsap-hover").forEach(el => {
      el.addEventListener("mouseenter", () => gsap.to(el, { scale: 1.04, duration: 0.3, ease: "power2.out" }))
      el.addEventListener("mouseleave", () => gsap.to(el, { scale: 1, duration: 0.3, ease: "power2.out" }))
    })

    // Animate section headings on scroll
    gsap.utils.toArray(".gsap-heading").forEach((el: any) => {
      gsap.fromTo(el, { opacity: 0, y: 50, filter: "blur(8px)" }, {
        opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%" }
      })
    })

    // Animate cards with stagger
    gsap.utils.toArray(".gsap-cards").forEach((el: any) => {
      const cards = el.querySelectorAll(".gsap-card")
      gsap.fromTo(cards, { opacity: 0, y: 60, rotateX: 2 }, {
        opacity: 1, y: 0, rotateX: 0, stagger: 0.1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%" }
      })
    })

    // Animate section borders/divders
    gsap.utils.toArray(".gsap-border").forEach((el: any) => {
      gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "power3.inOut", scrollTrigger: { trigger: el, start: "top 90%" }, transformOrigin: "left center" })
    })

    // Animate CTA buttons with bounce
    gsap.utils.toArray(".gsap-cta").forEach((el: any) => {
      gsap.fromTo(el, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)", scrollTrigger: { trigger: el, start: "top 85%" } })
    })

    // Animate stats numbers counting up
    gsap.utils.toArray(".gsap-count").forEach((el: any) => {
      const val = parseInt(el.textContent) || 0
      gsap.fromTo(el, { innerText: 0 }, { innerText: val, duration: 2, ease: "power2.out", snap: { innerText: 1 }, scrollTrigger: { trigger: el, start: "top 90%" } })
    })
  }, [])
  return null
}
