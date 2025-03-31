import { Navbar } from "@/components/navbar"
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <LoginForm />
      </div>
    </main>
  )
}

