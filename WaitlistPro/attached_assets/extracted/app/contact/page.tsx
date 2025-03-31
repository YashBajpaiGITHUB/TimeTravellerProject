import { Navbar } from "@/components/navbar"
import { ContactForm } from "@/components/contact-form"

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <ContactForm />
      </div>
    </main>
  )
}

