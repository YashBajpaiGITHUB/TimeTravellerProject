import { InfoIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SourcesInfo() {
  return (
    <div className="w-full">
      <div className="flex items-center mb-2">
        <InfoIcon className="h-6 w-6 mr-2" />
        <h2 className="text-xl font-semibold">Sources & Information</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-4">Data sources and references</p>

      <div className="space-y-4">
        <div>
          <h3 className="font-medium text-sm mb-1">Historical Sources:</h3>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
            <li>Wikipedia Geographic Location</li>
            <li>National Geographic Historical Maps</li>
            <li>Local Historical Society Records</li>
          </ul>
        </div>

        <div>
          <h3 className="font-medium text-sm mb-1">AI Processing:</h3>
          <p className="text-sm text-muted-foreground">
            This video was generated using advanced AI techniques that analyze historical data, cross-reference multiple
            sources, and create a visual representation of changes over time.
          </p>
        </div>

        <Button variant="outline" size="sm" className="w-full">
          View Technical Details
        </Button>
      </div>
    </div>
  )
}

