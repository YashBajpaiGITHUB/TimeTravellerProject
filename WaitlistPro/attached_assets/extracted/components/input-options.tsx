"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ImageIcon, MapPinIcon, Compass } from "lucide-react"
import { UploadImage } from "@/components/upload-image"
import { SelectLocation } from "@/components/select-location"
import { EnterCoordinates } from "@/components/enter-coordinates"
import { Button } from "@/components/ui/button"
import { getHistoricalDataForLocation } from "@/lib/data-service"

type InputMethod = "upload" | "map" | "coordinates" | null

export function InputOptions() {
  const [inputMethod, setInputMethod] = useState<InputMethod>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLocationSubmit = async (location: string, timeRange: { start: number; end: number }) => {
    try {
      setIsLoading(true)

      // Get historical data
      const data = await getHistoricalDataForLocation(location, timeRange)

      // Navigate to results page with data
      router.push(`/results?location=${encodeURIComponent(location)}&start=${timeRange.start}&end=${timeRange.end}`)
    } catch (error) {
      console.error("Error processing location:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCoordinatesSubmit = async (
    coordinates: { lat: number; lng: number },
    timeRange: { start: number; end: number },
  ) => {
    try {
      setIsLoading(true)

      // Get historical data
      const data = await getHistoricalDataForLocation(coordinates, timeRange)

      // Navigate to results page with data
      router.push(
        `/results?lat=${coordinates.lat}&lng=${coordinates.lng}&start=${timeRange.start}&end=${timeRange.end}`,
      )
    } catch (error) {
      console.error("Error processing coordinates:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="py-4">
      <div className="flex flex-wrap gap-4 mb-6">
        <Button
          variant={inputMethod === "upload" ? "default" : "outline"}
          className="flex items-center gap-2"
          onClick={() => setInputMethod("upload")}
          disabled={isLoading}
        >
          <ImageIcon className="h-4 w-4" />
          <span>Upload Image</span>
        </Button>
        <Button
          variant={inputMethod === "map" ? "default" : "outline"}
          className="flex items-center gap-2"
          onClick={() => setInputMethod("map")}
          disabled={isLoading}
        >
          <MapPinIcon className="h-4 w-4" />
          <span>Select on Map</span>
        </Button>
        <Button
          variant={inputMethod === "coordinates" ? "default" : "outline"}
          className="flex items-center gap-2"
          onClick={() => setInputMethod("coordinates")}
          disabled={isLoading}
        >
          <Compass className="h-4 w-4" />
          <span>Enter Coordinates</span>
        </Button>
      </div>

      {inputMethod === "upload" && <UploadImage isLoading={isLoading} setIsLoading={setIsLoading} />}
      {inputMethod === "map" && <SelectLocation onSubmit={handleLocationSubmit} isLoading={isLoading} />}
      {inputMethod === "coordinates" && <EnterCoordinates onSubmit={handleCoordinatesSubmit} isLoading={isLoading} />}
    </div>
  )
}

