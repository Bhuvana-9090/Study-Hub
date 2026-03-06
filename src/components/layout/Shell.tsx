"use client"

import * as React from "react"
import { Sidebar } from "./Sidebar"
import { Topbar } from "./Topbar"
import { useAuth } from "@/context/AuthContext"
import { usePathname, useRouter } from "next/navigation"

interface ShellProps {
  children: React.ReactNode
}

export function Shell({ children }: ShellProps) {
  const { isAuthenticated } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  React.useEffect(() => {
    // Only protect these routes
    const protectedRoutes = ['/chat', '/rooms', '/assignments', '/gamification']
    if (!isAuthenticated && protectedRoutes.some(route => pathname.startsWith(route))) {
      router.push('/login')
    }
  }, [isAuthenticated, pathname, router])
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar className="hidden lg:block w-64 shrink-0 transition-transform duration-300" />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
