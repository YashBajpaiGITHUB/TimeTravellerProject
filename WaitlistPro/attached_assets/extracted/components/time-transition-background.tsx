"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface TimeTransitionBackgroundProps {
  children: React.ReactNode
  isActive?: boolean
}

export function TimeTransitionBackground({ children, isActive = true }: TimeTransitionBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current || !isActive) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Royal color palette
    const colors = [
      { r: 133, g: 88, b: 111 }, // Royal purple
      { r: 145, g: 67, b: 67 }, // Burgundy
      { r: 184, g: 134, b: 11 }, // Golden
      { r: 0, g: 48, b: 73 }, // Navy blue
      { r: 53, g: 94, b: 59 }, // Forest green
      { r: 120, g: 81, b: 169 }, // Lavender
      { r: 64, g: 64, b: 64 }, // Charcoal grey
    ]

    let colorIndex = 0
    let currentColor = { ...colors[0] }
    let targetColor = { ...colors[1] }
    let transitionProgress = 0
    const transitionSpeed = 0.005

    // Animation
    const animate = () => {
      if (!ctx) return

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)

      // Interpolate between current and target color
      const r = Math.floor(currentColor.r + (targetColor.r - currentColor.r) * transitionProgress)
      const g = Math.floor(currentColor.g + (targetColor.g - currentColor.g) * transitionProgress)
      const b = Math.floor(currentColor.b + (targetColor.b - currentColor.b) * transitionProgress)

      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.1)`)
      gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0.05)`)

      // Apply gradient
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update transition progress
      transitionProgress += transitionSpeed

      // Move to next color when transition complete
      if (transitionProgress >= 1) {
        transitionProgress = 0
        currentColor = { ...targetColor }
        colorIndex = (colorIndex + 1) % colors.length
        targetColor = { ...colors[colorIndex] }
      }

      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [isActive])

  return (
    <div className="relative overflow-hidden">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-10" style={{ opacity: 0.7 }} />
      {children}
    </div>
  )
}

