"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BookOpen, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/ThemeToggle"
import { useAuth } from "@/context/AuthContext"

export default function LoginPage() {
  const [tab, setTab] = React.useState<"login" | "register">("login")
  const [showPassword, setShowPassword] = React.useState(false)
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    college: ""
  })
  
  const { login, register } = useAuth()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (tab === "login") {
      login(formData.email, "Alex Johnson")
    } else {
      register(formData.name, formData.email, formData.password, formData.college)
    }
    router.push("/")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-foreground tracking-tight">StudyHub</span>
        </Link>
        <ThemeToggle />
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Hero text */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {tab === "login" ? "Welcome back 👋" : "Join StudyHub 🎓"}
            </h1>
            <p className="text-muted-foreground">
              {tab === "login"
                ? "Sign in to continue your study journey."
                : "Create an account and start studying smarter."}
            </p>
          </div>

          {/* Card */}
          <div className="bg-card border border-border rounded-2xl shadow-xl p-8">
            {/* Tabs */}
            <div className="flex p-1 rounded-xl bg-muted mb-6">
              <button
                onClick={() => setTab("login")}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                  tab === "login"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setTab("register")}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                  tab === "register"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Register
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {tab === "register" && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
                  <Input
                    name="name"
                    type="text"
                    required
                    placeholder="Alex Johnson"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-muted border-border focus-visible:ring-primary"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                <Input
                  name="email"
                  type="email"
                  required
                  placeholder="alex@university.edu"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-muted border-border focus-visible:ring-primary"
                />
              </div>

              {tab === "register" && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">College (Optional)</label>
                  <Input
                    name="college"
                    type="text"
                    placeholder="PVPSIT"
                    value={formData.college}
                    onChange={handleInputChange}
                    className="bg-muted border-border focus-visible:ring-primary"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
                <div className="relative">
                  <Input
                    name="password"
                    required
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="bg-muted border-border focus-visible:ring-primary pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {tab === "register" && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Confirm Password</label>
                  <Input
                    name="confirmPassword"
                    required
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="bg-muted border-border focus-visible:ring-primary"
                  />
                </div>
              )}

              {tab === "login" && (
                <div className="flex justify-end">
                  <button type="button" className="text-xs text-primary hover:underline">
                    Forgot password?
                  </button>
                </div>
              )}

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold mt-2">
                {tab === "login" ? "Sign In" : "Create Account"}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 bg-card text-muted-foreground">or continue with</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="border-border hover:bg-muted">
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </Button>
              <Button variant="outline" className="border-border hover:bg-muted">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </Button>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            By signing in, you agree to our{" "}
            <span className="text-primary cursor-pointer hover:underline">Terms of Service</span> and{" "}
            <span className="text-primary cursor-pointer hover:underline">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  )
}
