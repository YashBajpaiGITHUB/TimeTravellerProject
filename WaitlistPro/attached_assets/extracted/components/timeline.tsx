interface TimelineProps {
  timeRange: {
    start: number
    end: number
  }
  events: Array<{
    year: number
    description: string
  }>
}

export default function Timeline({ timeRange = { start: 1900, end: 2000 }, events = [] }: TimelineProps) {
  // Sort events by year
  const sortedEvents = [...events].sort((a, b) => a.year - b.year)

  return (
    <div className="w-full">
      <div className="flex items-center mb-2">
        <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M3 10H21" stroke="currentColor" strokeWidth="2" />
        </svg>
        <h2 className="text-xl font-semibold">Historical Timeline</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-4">Key events and developments through time</p>

      <div className="space-y-0">
        {sortedEvents.length > 0 ? (
          sortedEvents.map((event, index) => (
            <div key={index} className="relative pl-6 pb-8">
              <div className="absolute left-0 top-1.5 w-3 h-3 bg-primary rounded-full z-10"></div>
              {index < sortedEvents.length - 1 && (
                <div className="absolute left-1.5 top-4 w-px h-full bg-gray-300"></div>
              )}
              <div className="font-medium">{event.year}</div>
              <div className="text-sm text-muted-foreground">{event.description}</div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted-foreground">No events found for this time period</p>
        )}
      </div>
    </div>
  )
}

