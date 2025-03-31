"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MapPin, Compass } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { TimeRangeSlider } from "@/components/time-range-slider"

interface EnterCoordinatesProps {
  onSubmit?: (coordinates: { lat: number; lng: number }, timeRange: { start: number; end: number }) => void
  isLoading?: boolean
}

export function EnterCoordinates({ onSubmit, isLoading = false }: EnterCoordinatesProps) {
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")
  const [question, setQuestion] = useState("")
  const [timeRange, setTimeRange] = useState({ start: 1850, end: 2025 })
  const router = useRouter()

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude.toString())
        setLongitude(position.coords.longitude.toString())
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const lat = Number.parseFloat(latitude)
    const lng = Number.parseFloat(longitude)

    if (!isNaN(lat) && !isNaN(lng)) {
      if (onSubmit) {
        onSubmit({ lat, lng }, timeRange)
      } else {
        router.push(`/results?lat=${lat}&lng=${lng}&start=${timeRange.start}&end=${timeRange.end}`)
      }
    }
  }

  return (
    <Card className="bg-white shadow-sm border-0">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Compass className="h-5 w-5" />
          <span>Enter Coordinates</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Provide the latitude and longitude of a location to see its evolution over time.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                id="latitude"
                placeholder="e.g. 25.436298"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                required
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                id="longitude"
                placeholder="e.g. 78.567332"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                required
                className="bg-gray-50"
              />
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={handleUseMyLocation}
          >
            <MapPin className="h-3 w-3" />
            <span>Use My Location</span>
          </Button>

          <div className="space-y-2">
            <Label htmlFor="coord-question">Question (Optional)</Label>
            <Input
              id="coord-question"
              placeholder="Ask a specific question about this item or place..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <Label>Time Range</Label>
            <TimeRangeSlider min={1800} max={2025} value={timeRange} onChange={setTimeRange} />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Processing..." : "Begin Time Travel"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

