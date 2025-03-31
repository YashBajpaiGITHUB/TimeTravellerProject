export interface HistoricalData {
  year: number
  description: string
  imageUrl?: string
  source: string
  location?: string
}

export async function getHistoricalDataForLocation(
  location: string | { lat: number; lng: number },
  timeRange: { start: number; end: number },
): Promise<HistoricalData[]> {
  try {
    console.log("Fetching data for:", location, timeRange)

    const locationQuery = typeof location === "string" ? location : `${location.lat},${location.lng}`

    const response = await fetch(
      `/api/historical-data?location=${encodeURIComponent(locationQuery)}&start=${timeRange.start}&end=${timeRange.end}`,
    )

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    console.log("Historical data received:", data)

    return data
  } catch (error) {
    console.error("Data loading error:", error)
    return []
  }
}

export async function generateTimelineVideo(timelineData: HistoricalData[], outputPath?: string): Promise<string> {
  try {
    console.log("Generating video for timeline data:", timelineData.length, "events")

    if (timelineData.length === 0) {
      console.warn("No timeline data provided for video generation")
      return "/placeholder-video.mp4"
    }

    const response = await fetch("/api/generate-timeline", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ timelineData }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Failed to generate video: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    console.log("Video generation response:", data)

    return data.videoUrl || "/placeholder-video.mp4"
  } catch (error) {
    console.error("Video generation error:", error)
    return "/placeholder-video.mp4"
  }
}

