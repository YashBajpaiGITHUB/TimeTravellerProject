"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import VideoPlayer from "@/components/video-player"
import Timeline from "@/components/timeline"
import { SourcesInfo } from "@/components/sources-info"
import { getHistoricalDataForLocation, generateTimelineVideo, type HistoricalData } from "@/lib/data-service"

export default function ResultsPage() {
  const [videoUrl, setVideoUrl] = useState("")
  const [timelineData, setTimelineData] = useState<HistoricalData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [timeRange, setTimeRange] = useState({ start: 1850, end: 2025 })
  const searchParams = useSearchParams()

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)

        // Get location and time range from URL
        const location = searchParams.get("location") || "India"
        const start = Number.parseInt(searchParams.get("start") || "1850")
        const end = Number.parseInt(searchParams.get("end") || "2025")

        setTimeRange({ start, end })

        // Fetch data
        const data = await getHistoricalDataForLocation(location, { start, end })
        console.log("Fetched data from API:", data)

        // Set timeline data
        setTimelineData(data)

        // Generate video if we have data
        if (data.length > 0) {
          const url = await generateTimelineVideo(data)
          setVideoUrl(url)
        }
      } catch (error) {
        console.error("Failed to load results:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [searchParams])

  return (
    <main className="min-h-screen bg-[#e9ebf0]">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <p>Generating your timeline...</p>
          </div>
        ) : (
          <VideoPlayer videoUrl={videoUrl} />
        )}
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Timeline
              timeRange={timeRange}
              events={timelineData.map((item) => ({
                year: item.year,
                description: item.description,
              }))}
            />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <SourcesInfo />
          </div>
        </div>
      </div>
    </main>
  )
}

