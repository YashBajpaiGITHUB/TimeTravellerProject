"use client"

import { useState, useEffect, useRef } from "react"
import { Slider } from "@/components/ui/slider"

interface RoyalTimeSliderProps {
  min: number
  max: number
  value: { start: number; end: number }
  onChange: (value: { start: number; end: number }) => void
}

export function RoyalTimeSlider({ min, max, value, onChange }: RoyalTimeSliderProps) {
  const [sliderValue, setSliderValue] = useState<[number, number]>([value.start, value.end])
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    setSliderValue([value.start, value.end])
  }, [value])

  const handleChange = (newValue: number[]) => {
    const [start, end] = newValue as [number, number]
    setSliderValue([start, end])
    onChange({ start, end })
  }

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = 8

    // Draw gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)

    // Past to present color transition (royal theme)
    gradient.addColorStop(0, "#8B4513") // Sepia/brown (old)
    gradient.addColorStop(0.2, "#B8860B") // Dark goldenrod
    gradient.addColorStop(0.4, "#9370DB") // Medium purple
    gradient.addColorStop(0.6, "#4682B4") // Steel blue
    gradient.addColorStop(0.8, "#2E8B57") // Sea green
    gradient.addColorStop(1, "#4169E1") // Royal blue (modern)

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm">
        <span className="font-medium">{sliderValue[0]}</span>
        <span className="text-primary">{">"}</span>
        <span className="font-medium">{sliderValue[1]}</span>
      </div>

      <div className="relative">
        <canvas ref={canvasRef} className="w-full h-2 rounded-lg absolute top-1/2 -translate-y-1/2 z-0" />
        <Slider
          defaultValue={sliderValue}
          min={min}
          max={max}
          step={1}
          value={sliderValue}
          onValueChange={handleChange}
          className="relative z-10"
        />
      </div>

      <div className="grid grid-cols-5 text-xs text-muted-foreground">
        <span>{min}</span>
        <span className="text-center">{min + Math.round((max - min) * 0.25)}</span>
        <span className="text-center">{min + Math.round((max - min) * 0.5)}</span>
        <span className="text-center">{min + Math.round((max - min) * 0.75)}</span>
        <span className="text-right">{max}</span>
      </div>
    </div>
  )
}

