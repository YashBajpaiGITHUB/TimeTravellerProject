"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { TimeRangeSlider } from "@/components/time-range-slider"

interface SelectLocationProps {
  onSubmit?: (location: string, timeRange: { start: number; end: number }) => void
  isLoading?: boolean
}

export function SelectLocation({ onSubmit, isLoading = false }: SelectLocationProps) {
  const [location, setLocation] = useState("")
  const [question, setQuestion] = useState("")
  const [timeRange, setTimeRange] = useState({ start: 1850, end: 2025 })
  const router = useRouter()

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        // For simplicity, we'll just set a generic location name
        setLocation("Current Location")
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (location) {
      if (onSubmit) {
        onSubmit(location, timeRange)
      } else {
        router.push(`/results?location=${encodeURIComponent(location)}&start=${timeRange.start}&end=${timeRange.end}`)
      }
    }
  }

  return (
    <Card className="bg-white shadow-sm border-0">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          <span>Select Location on Map</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Click on the map to select a location or use your current location.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="space-y-2">
              <Input
                id="location"
                placeholder="Search for a location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="bg-gray-50"
              />
              <div className="w-full h-64 bg-gray-100 rounded-md overflow-hidden">
                {/* Map would be implemented here using a library like Leaflet or Google Maps */}
                <div className="w-full h-full flex items-center justify-center bg-gray-100 text-muted-foreground">
                  Map Interface
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
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="map-question">Question (Optional)</Label>
            <Input
              id="map-question"
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

