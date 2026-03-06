"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BookOpen,
  Calendar,
  CheckSquare,
  Flame,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
  MessageSquare,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/AuthContext"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  const routes = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/", active: pathname === "/" },
    { label: "Study Rooms", icon: Users, href: "/rooms", active: pathname.startsWith("/rooms") },
    { label: "Tasks", icon: CheckSquare, href: "/tasks", active: pathname === "/tasks" },
    { label: "Resources", icon: BookOpen, href: "/resources", active: pathname.startsWith("/resources") },
    { label: "Notes", icon: BookOpen, href: "/notes", active: pathname.startsWith("/notes") },
    { label: "Assignments", icon: Calendar, href: "/assignments", active: pathname === "/assignments" },
    { label: "Gamification", icon: Flame, href: "/gamification", active: pathname === "/gamification" },
    { label: "Friends Chat", icon: MessageSquare, href: "/chat", active: pathname === "/chat" },
  ]
  
  const { user, logout, isAuthenticated } = useAuth()

  return (
    <div className={cn("pb-12 border-r border-border min-h-screen bg-sidebar", className)}>
      <div className="space-y-4 py-4 relative h-full">
        {/* Logo */}
        <div className="px-4 py-2">
          <Link href="/" className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground tracking-tight">StudyHub</span>
          </Link>

          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2 px-2">
            Main Menu
          </p>

          <div className="space-y-1">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={route.active ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start text-muted-foreground hover:text-foreground hover:bg-muted",
                  route.active && "bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary font-semibold"
                )}
                asChild
              >
                <Link href={route.href}>
                  <route.icon className="mr-2 h-4 w-4" />
                  {route.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="px-4 absolute bottom-4 w-full">
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            {isAuthenticated ? (
              <Button 
                variant="ghost" 
                onClick={logout}
                className="w-full justify-start text-muted-foreground hover:text-rose-500"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log Out
              </Button>
            ) : (
              <Button variant="ghost" asChild className="w-full justify-start text-muted-foreground hover:text-primary">
                <Link href="/login">
                  <LogOut className="mr-2 h-4 w-4 rotate-180" />
                  Login / Register
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
