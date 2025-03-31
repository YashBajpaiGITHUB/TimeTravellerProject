import { NextResponse } from "next/server"
import { DataExtractionService } from "@/lib/data-extraction"

const dataExtractionService = new DataExtractionService()

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const location = url.searchParams.get("location") || "India"
    const start = Number.parseInt(url.searchParams.get("start") || "1850")
    const end = Number.parseInt(url.searchParams.get("end") || "2025")

    console.log(`Fetching historical data for location: ${location}, time range: ${start}-${end}`)

    const data = await dataExtractionService.getHistoricalData(location, start, end)

    console.log(`Found ${data.length} historical events`)

    return NextResponse.json(data)
  } catch (error) {
    console.error("Data loading error:", error)
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 })
  }
}

