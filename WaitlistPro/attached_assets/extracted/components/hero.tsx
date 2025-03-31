import { Clock } from "lucide-react"

export function Hero() {
  return (
    <div className="py-8">
      <div className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
        <Clock className="h-3 w-3" />
        <span>Time Travel Experience</span>
      </div>
      <h1 className="text-3xl font-bold mb-2">Journey Through</h1>
      <h2 className="text-2xl font-bold text-primary mb-4">Time & Space</h2>
      <p className="text-muted-foreground max-w-2xl mb-4">
        Witness the evolution of places and objects from the past to the present. Upload an image, select a location on
        the map, or use your current coordinates to begin your journey through history.
      </p>
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <Clock className="h-3 w-3" />
        <span>Powered by advanced AI technology</span>
      </div>
    </div>
  )
}

