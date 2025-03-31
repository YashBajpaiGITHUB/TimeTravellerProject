"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Download, Maximize, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface TimeVideoPlayerProps {
  videoUrl?: string
  title: string
  subtitle: string
}

export function TimeVideoPlayer({ videoUrl, title, subtitle }: TimeVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleSeek = (value: number[]) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  // Time particles effect when no video is available
  useEffect(() => {
    if (!videoUrl && canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // Set canvas dimensions
      const resizeCanvas = () => {
        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight
      }

      resizeCanvas()
      window.addEventListener("resize", resizeCanvas)

      // Clock particles
      const particles: {
        x: number
        y: number
        size: number
        speed: number
        color: string
        rotation: number
      }[] = []

      // Create particles
      for (let i = 0; i < 20; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: 10 + Math.random() * 30,
          speed: 0.5 + Math.random() * 1.5,
          color: `hsl(${Math.random() * 360}, 70%, 60%)`,
          rotation: Math.random() * Math.PI * 2,
        })
      }

      // Draw clock
      const drawClock = (x: number, y: number, size: number, rotation: number, color: string) => {
        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(rotation)

        // Clock face
        ctx.beginPath()
        ctx.arc(0, 0, size, 0, Math.PI * 2)
        ctx.strokeStyle = color
        ctx.lineWidth = size / 10
        ctx.stroke()

        // Hour hand
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(0, -size * 0.5)
        ctx.strokeStyle = color
        ctx.lineWidth = size / 15
        ctx.stroke()

        // Minute hand
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(size * 0.7, 0)
        ctx.strokeStyle = color
        ctx.lineWidth = size / 20
        ctx.stroke()

        ctx.restore()
      }

      // Animation
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Draw gradient background
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
        gradient.addColorStop(0, "rgba(0, 0, 0, 0.9)")
        gradient.addColorStop(1, "rgba(30, 30, 60, 0.9)")
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Update and draw particles
        particles.forEach((particle) => {
          // Update position
          particle.y += particle.speed
          particle.rotation += 0.01

          // Reset if out of view
          if (particle.y > canvas.height + particle.size) {
            particle.y = -particle.size
            particle.x = Math.random() * canvas.width
          }

          // Draw clock
          drawClock(particle.x, particle.y, particle.size, particle.rotation, particle.color)
        })

        animationRef.current = requestAnimationFrame(animate)
      }

      animationRef.current = requestAnimationFrame(animate)

      return () => {
        window.removeEventListener("resize", resizeCanvas)
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [videoUrl])

  return (
    <Card className="w-full bg-white/95 backdrop-blur-sm border-primary/10">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Clock className="h-5 w-5 text-primary" />
          <span className="text-primary">{title}</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </CardHeader>
      <CardContent>
        <div className="video-container relative overflow-hidden rounded-md">
          {videoUrl ? (
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <canvas ref={canvasRef} className="w-full h-full" />
          )}

          {/* Video controls */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
            <div className="flex items-center gap-2 mb-2">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={togglePlay}>
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
              <span className="text-xs text-white">{formatTime(currentTime)}</span>

              <div className="flex-1 mx-2">
                <Slider
                  value={[currentTime]}
                  min={0}
                  max={duration || 100}
                  step={0.1}
                  onValueChange={handleSeek}
                  className="time-slider"
                />
              </div>

              <span className="text-xs text-white">{formatTime(duration)}</span>

              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Maximize className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

