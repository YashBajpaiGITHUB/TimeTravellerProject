import fs from "fs"
import path from "path"

interface NcertContent {
  chapter: number
  title: string
  content: string
}

interface NcertSubject {
  [subject: string]: NcertContent[]
}

interface NcertData {
  [className: string]: NcertSubject
}

interface HistoricalEvent {
  year: number
  description: string
  source: string
  location?: string
}

export class DataExtractionService {
  private ncertDataPath: string

  constructor() {
    this.ncertDataPath = path.join(process.cwd(), "data", "ncert.json")
  }

  async getNcertData(): Promise<NcertData> {
    try {
      const data = await fs.promises.readFile(this.ncertDataPath, "utf8")
      return JSON.parse(data)
    } catch (error) {
      console.error("Error reading NCERT data:", error)
      return {}
    }
  }

  async extractHistoricalEvents(query: string, startYear: number, endYear: number): Promise<HistoricalEvent[]> {
    try {
      const ncertData = await this.getNcertData()
      const events: HistoricalEvent[] = []

      // Regular expression to find years between startYear and endYear
      const yearPattern = new RegExp(`\\b(${startYear}|${startYear + 1}|${startYear + 2}|...|${endYear})\\b`, "g")

      // Process all content from NCERT data
      Object.keys(ncertData).forEach((className) => {
        const classData = ncertData[className]
        Object.keys(classData).forEach((subject) => {
          const subjectData = classData[subject]
          subjectData.forEach((chapter) => {
            // Search for the query in the content
            if (chapter.content.toLowerCase().includes(query.toLowerCase())) {
              // Extract paragraphs that contain years
              const paragraphs = chapter.content.split("\n")

              paragraphs.forEach((paragraph) => {
                const years = paragraph.match(yearPattern)
                if (years) {
                  years.forEach((yearStr) => {
                    const year = Number.parseInt(yearStr)
                    if (year >= startYear && year <= endYear) {
                      // Extract a reasonable description around the year mention
                      const sentencePattern = new RegExp(`[^.!?]*${year}[^.!?]*[.!?]`, "g")
                      const sentences = paragraph.match(sentencePattern)

                      if (sentences) {
                        sentences.forEach((sentence) => {
                          events.push({
                            year,
                            description: sentence.trim(),
                            source: "NCERT",
                            location: query,
                          })
                        })
                      } else {
                        // If no complete sentence found, use a fragment around the year
                        const startIndex = Math.max(0, paragraph.indexOf(yearStr) - 50)
                        const endIndex = Math.min(paragraph.length, paragraph.indexOf(yearStr) + 50)
                        const description = paragraph.substring(startIndex, endIndex).trim()

                        events.push({
                          year,
                          description,
                          source: "NCERT",
                          location: query,
                        })
                      }
                    }
                  })
                }
              })
            }
          })
        })
      })

      // Remove duplicates based on year and description
      const uniqueEvents = events.filter(
        (event, index, self) =>
          index === self.findIndex((e) => e.year === event.year && e.description === event.description),
      )

      return uniqueEvents.sort((a, b) => a.year - b.year)
    } catch (error) {
      console.error("Error extracting historical events:", error)
      return []
    }
  }

  async getHistoricalData(query: string, startYear: number, endYear: number): Promise<HistoricalEvent[]> {
    // Extract events from NCERT data
    const events = await this.extractHistoricalEvents(query, startYear, endYear)

    // If no events found, try to extract general historical events for the time period
    if (events.length === 0) {
      return this.extractGeneralHistoricalEvents(startYear, endYear)
    }

    return events
  }

  private async extractGeneralHistoricalEvents(startYear: number, endYear: number): Promise<HistoricalEvent[]> {
    try {
      const ncertData = await this.getNcertData()
      const events: HistoricalEvent[] = []

      // Regular expression to find years between startYear and endYear
      const yearPattern = new RegExp(`\\b(${startYear}|${startYear + 1}|${startYear + 2}|...|${endYear})\\b`, "g")

      // Process all content from NCERT data
      Object.keys(ncertData).forEach((className) => {
        const classData = ncertData[className]
        Object.keys(classData).forEach((subject) => {
          const subjectData = classData[subject]
          subjectData.forEach((chapter) => {
            // Extract paragraphs that contain years
            const paragraphs = chapter.content.split("\n")

            paragraphs.forEach((paragraph) => {
              const years = paragraph.match(yearPattern)
              if (years) {
                years.forEach((yearStr) => {
                  const year = Number.parseInt(yearStr)
                  if (year >= startYear && year <= endYear) {
                    // Extract a reasonable description around the year mention
                    const sentencePattern = new RegExp(`[^.!?]*${year}[^.!?]*[.!?]`, "g")
                    const sentences = paragraph.match(sentencePattern)

                    if (sentences) {
                      sentences.forEach((sentence) => {
                        events.push({
                          year,
                          description: sentence.trim(),
                          source: "NCERT",
                          location: "General",
                        })
                      })
                    }
                  }
                })
              }
            })
          })
        })
      })

      // Remove duplicates based on year and description
      const uniqueEvents = events.filter(
        (event, index, self) =>
          index === self.findIndex((e) => e.year === event.year && e.description === event.description),
      )

      return uniqueEvents.sort((a, b) => a.year - b.year)
    } catch (error) {
      console.error("Error extracting general historical events:", error)
      return []
    }
  }
}

