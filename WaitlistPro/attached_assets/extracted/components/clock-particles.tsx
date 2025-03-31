"use client"

import { useEffect, useRef } from "react"

interface ClockParticle {
  x: number
  y: number
  size: number
  speed: number
  rotation: number
  rotationSpeed: number
  opacity: number
}

interface ClockParticlesProps {
  count?: number
  isActive?: boolean
}

export function ClockParticles({ count = 30, isActive = true }: ClockParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<ClockParticle[]>([])
  const animationRef = useRef<number>(0)

  useEffect(() => {
    if (!containerRef.current || !isActive) return

    const container = containerRef.current
    const containerRect = container.getBoundingClientRect()

    // Initialize particles
    particlesRef.current = Array.from({ length: count }).map(() => ({
      x: Math.random() * containerRect.width,
      y: Math.random() * -containerRect.height, // Start above the container
      size: 10 + Math.random() * 20,
      speed: 1 + Math.random() * 3,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 2,
      opacity: 0.1 + Math.random() * 0.5,
    }))

    // Create clock elements
    particlesRef.current.forEach((particle) => {
      const clockElement = document.createElement("div")
      clockElement.className = "absolute"
      clockElement.style.left = `${particle.x}px`
      clockElement.style.top = `${particle.y}px`
      clockElement.style.width = `${particle.size}px`
      clockElement.style.height = `${particle.size}px`
      clockElement.style.opacity = `${particle.opacity}`
      clockElement.style.transform = `rotate(${particle.rotation}deg)`

      // Use SVG for clock
      const svgNS = "http://www.w3.org/2000/svg"
      const svg = document.createElementNS(svgNS, "svg")
      svg.setAttribute("viewBox", "0 0 24 24")
      svg.setAttribute("width", "100%")
      svg.setAttribute("height", "100%")
      svg.setAttribute("fill", "none")
      svg.setAttribute("stroke", "currentColor")
      svg.setAttribute("stroke-width", "2")
      svg.setAttribute("stroke-linecap", "round")
      svg.setAttribute("stroke-linejoin", "round")

      // Circle
      const circle = document.createElementNS(svgNS, "circle")
      circle.setAttribute("cx", "12")
      circle.setAttribute("cy", "12")
      circle.setAttribute("r", "10")
      svg.appendChild(circle)

      // Hour hand
      const hourHand = document.createElementNS(svgNS, "line")
      hourHand.setAttribute("x1", "12")
      hourHand.setAttribute("y1", "12")
      hourHand.setAttribute("x2", "12")
      hourHand.setAttribute("y2", "8")
      svg.appendChild(hourHand)

      // Minute hand
      const minuteHand = document.createElementNS(svgNS, "line")
      minuteHand.setAttribute("x1", "12")
      minuteHand.setAttribute("y1", "12")
      minuteHand.setAttribute("x2", "12")
      minuteHand.setAttribute("y2", "6")
      svg.appendChild(minuteHand)

      clockElement.appendChild(svg)
      container.appendChild(clockElement)
    })

    // Animation function
    const animate = () => {
      const clockElements = container.children

      particlesRef.current.forEach((particle, index) => {
        if (index < clockElements.length) {
          const element = clockElements[index] as HTMLElement

          // Update position
          particle.y += particle.speed
          particle.rotation += particle.rotationSpeed

          // Update element
          element.style.transform = `rotate(${particle.rotation}deg)`
          element.style.top = `${particle.y}px`

          // Reset if out of view
          if (particle.y > containerRect.height) {
            particle.y = -particle.size
            particle.x = Math.random() * containerRect.width
          }
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationRef.current)
      while (container.firstChild) {
        container.removeChild(container.firstChild)
      }
    }
  }, [count, isActive])

  return <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none text-primary/30" />
}

