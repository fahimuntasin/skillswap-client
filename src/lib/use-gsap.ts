"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function useGsapReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    gsap.fromTo(el, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, delay, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%" } })
  }, [delay])

  return ref
}

export function useGsapStagger(selector: string, delay = 0.1) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const items = el.querySelectorAll(selector)
    gsap.fromTo(items, { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: delay, duration: 0.6, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 80%" } })
  }, [selector, delay])

  return ref
}
