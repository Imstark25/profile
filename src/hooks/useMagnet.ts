import { useRef, useCallback } from 'react'

/**
 * Magnetic hover effect — element follows cursor within proximity
 * @param strength - how far the element moves (0-1, default 0.35)
 */
export function useMagnet(strength = 0.35) {
  const ref = useRef<HTMLElement>(null)

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx   = rect.left + rect.width  / 2
    const cy   = rect.top  + rect.height / 2
    const dx   = (e.clientX - cx) * strength
    const dy   = (e.clientY - cy) * strength
    el.style.transform = `translate(${dx}px, ${dy}px)`
    el.style.transition = 'transform 0.1s ease-out'
  }, [strength])

  const onMouseLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'translate(0px, 0px)'
    el.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
  }, [])

  return { ref, onMouseMove, onMouseLeave }
}
