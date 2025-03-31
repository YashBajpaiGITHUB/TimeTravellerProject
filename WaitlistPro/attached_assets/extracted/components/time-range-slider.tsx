"use client"

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"

interface TimeRangeSliderProps {
  min: number
  max: number
  value: { start: number; end: number }
  onChange: (value: { start: number; end: number }) => void
}

export function TimeRangeSlider({ min, max, value, onChange }: TimeRangeSliderProps) {
  const [sliderValue, setSliderValue] = useState<[number, number]>([value.start, value.end])

  useEffect(() => {
    setSliderValue([value.start, value.end])
  }, [value])

  const handleChange = (newValue: number[]) => {
    const [start, end] = newValue as [number, number]
    setSliderValue([start, end])
    onChange({ start, end })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm">
        <span>{sliderValue[0]}</span>
        <span>{">"}</span>
        <span>{sliderValue[1]}</span>
      </div>
      <Slider
        defaultValue={sliderValue}
        min={min}
        max={max}
        step={1}
        value={sliderValue}
        onValueChange={handleChange}
        className="time-slider"
      />
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

