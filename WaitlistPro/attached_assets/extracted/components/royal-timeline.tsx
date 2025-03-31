import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TimelineEvent {
  year: number
  description: string
}

interface RoyalTimelineProps {
  events: TimelineEvent[]
}

export function RoyalTimeline({ events }: RoyalTimelineProps) {
  // Sort events chronologically
  const sortedEvents = [...events].sort((a, b) => a.year - b.year)

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-primary/10">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-primary-foreground">
          <span>Historical Timeline</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">Key events and developments through time</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-0">
          {sortedEvents.map((event, index) => {
            // Calculate color based on position in timeline (past to present)
            const position = index / (sortedEvents.length - 1)
            let dotColor = ""

            if (position < 0.2) {
              dotColor = "bg-amber-700" // Sepia/brown for oldest events
            } else if (position < 0.4) {
              dotColor = "bg-amber-500" // Golden for older events
            } else if (position < 0.6) {
              dotColor = "bg-purple-500" // Purple for middle events
            } else if (position < 0.8) {
              dotColor = "bg-blue-500" // Blue for newer events
            } else {
              dotColor = "bg-indigo-600" // Royal blue for newest events
            }

            return (
              <div key={index} className="timeline-item">
                <div className={`absolute left-0 top-1.5 w-3 h-3 ${dotColor} rounded-full z-10`} />
                <div className="font-medium">{event.year}</div>
                <div className="text-sm text-muted-foreground">{event.description}</div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

