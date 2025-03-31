import Link from "next/link"
import { Clock } from "lucide-react"

export function Navbar() {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200">
            <Clock className="h-4 w-4 text-gray-700" />
          </div>
          <span className="font-medium">Chronos</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
            About
          </Link>
          <Link href="/gallery" className="text-sm text-muted-foreground hover:text-foreground">
            Gallery
          </Link>
          <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  )
}

