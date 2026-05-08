'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const ring = ringRef.current
    if (!ring) return

    let mouseX = -100, mouseY = -100
    let ringX  = -100, ringY  = -100
    let raf: number

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX; mouseY = e.clientY
    }

    const tick = () => {
      ringX += (mouseX - ringX) * 0.5
      ringY += (mouseY - ringY) * 0.5
      ring.style.left = `${ringX}px`; ring.style.top = `${ringY}px`
      raf = requestAnimationFrame(tick)
    }

    const setHover = (active: boolean) => {
      ring.classList.toggle('hover-active', active)
    }

    const isInteractive = (el: HTMLElement) =>
      !!el.closest('a, button, [role="button"], input, textarea, select, label')
    const isImage = (el: HTMLElement) => !!el.closest('img, [data-cursor="zoom"]')

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (isInteractive(t)) {
        setHover(true)
        ring.classList.add('hover-active')
        ring.style.borderColor = 'var(--red-son)'
      } else if (isImage(t)) {
        setHover(false)
        ring.classList.add('hover-active')
        ring.style.borderColor = 'var(--parchment-mid)'
      } else {
        setHover(false)
        ring.style.borderColor = 'rgba(165,42,42,0.5)'
      }
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    raf = requestAnimationFrame(tick)
    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
