"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Upload } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { TimeRangeSlider } from "@/components/time-range-slider"

interface UploadImageProps {
  isLoading?: boolean
  setIsLoading?: (loading: boolean) => void
}

export function UploadImage({ isLoading = false, setIsLoading }: UploadImageProps) {
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [question, setQuestion] = useState("")
  const [timeRange, setTimeRange] = useState({ start: 1850, end: 2025 })
  const router = useRouter()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImage(file)

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setPreview(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (setIsLoading) {
      setIsLoading(true)
    }

    try {
      // In a real implementation, you would upload the image to the server
      // and get back a location or extracted text to use for the search

      // For now, we'll just navigate to the results page
      const location = image?.name.split(".")[0] || "Unknown"
      router.push(`/results?location=${encodeURIComponent(location)}&start=${timeRange.start}&end=${timeRange.end}`)
    } catch (error) {
      console.error("Error processing image:", error)
    } finally {
      if (setIsLoading) {
        setIsLoading(false)
      }
    }
  }

  return (
    <Card className="bg-white shadow-sm border-0">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Upload className="h-5 w-5" />
          <span>Upload an Image</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Upload an image of an item or place to see its evolution over time.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="image">Image</Label>
            <div
              className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => document.getElementById("image-upload")?.click()}
            >
              {preview ? (
                <img src={preview || "/placeholder.svg"} alt="Preview" className="max-h-48 object-contain mb-2" />
              ) : (
                <>
                  <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-sm text-center text-muted-foreground">
                    Click to upload or drag and drop
                    <br />
                    JPG, PNG or GIF max 10MB
                  </p>
                </>
              )}
              <Input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="question">Question (Optional)</Label>
            <Input
              id="question"
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

