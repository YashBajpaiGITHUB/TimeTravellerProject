"use client"

import { useState, useEffect } from "react"
import { ClockParticles } from "./clock-particles"

interface TimeLoadingEffectProps {
  isLoading: boolean
  loadingText?: string
}

export function TimeLoadingEffect({
  isLoading,
  loadingText = "Generating Time Travel Experience",
}: TimeLoadingEffectProps) {
  const [dots, setDots] = useState("")

  useEffect(() => {
    if (!isLoading) return

    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."))
    }, 500)

    return () => clearInterval(interval)
  }, [isLoading])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
      <ClockParticles count={40} />

      <div className="relative z-10 text-center p-8 rounded-lg bg-background/20 backdrop-blur-md border border-primary/20 max-w-md">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <h3 className="text-xl font-medium text-white mb-2">
          {loadingText}
          <span className="inline-block w-8 text-left">{dots}</span>
        </h3>
        <p className="text-white/70 text-sm">Traversing through time to gather historical data</p>
      </div>
    </div>
  )
}

