'use client'
import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { useStore } from '../../../store/useStore'

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const setScrollProgress = useStore((s) => s.setScrollProgress)
  const setActiveSection  = useStore((s) => s.setActiveSection)
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration:    1.2,
      easing:      (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    })
    lenisRef.current = lenis

    // Scroll progress + active section tracking
    lenis.on('scroll', ({ progress }: { progress: number }) => {
      setScrollProgress(progress)

      const sections = ['home', 'about', 'projects', 'skills', 'experience', 'contact']
      let current = 'home'
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 130) current = id
      }
      setActiveSection(current)
    })

    // RAF loop
    let rafId: number
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // Expose globally for external usage (e.g. nav links)
    ;(window as any).__lenis = lenis

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [setScrollProgress, setActiveSection])

  return <>{children}</>
}
