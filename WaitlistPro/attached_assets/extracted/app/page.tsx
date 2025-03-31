import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { InputOptions } from "@/components/input-options"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#e9ebf0]">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Hero />
        <InputOptions />
      </div>
    </main>
  )
}

