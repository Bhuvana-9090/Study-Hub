"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  BookOpen, 
  Calendar, 
  CheckSquare, 
  FolderPlus, 
  LayoutDashboard, 
  LogOut, 
  Settings, 
  Users,
  Flame
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/",
      active: pathname === "/",
    },
    {
      label: "Study Rooms",
      icon: Users,
      href: "/rooms",
      active: pathname === "/rooms",
    },
    {
      label: "Tasks",
      icon: CheckSquare,
      href: "/tasks",
      active: pathname === "/tasks",
    },
    {
      label: "Resources",
      icon: BookOpen,
      href: "/resources",
      active: pathname === "/resources",
    },
    {
      label: "Assignments",
      icon: Calendar,
      href: "/assignments",
      active: pathname === "/assignments",
    },
    {
      label: "Gamification",
      icon: Flame,
      href: "/gamification",
      active: pathname === "/gamification",
    },
  ]

  return (
    <div className={cn("pb-12 border-r min-h-screen bg-slate-950/50 backdrop-blur-xl", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-500" />
            Virtual Study Hub
          </h2>
          <div className="space-y-1 mt-6">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={route.active ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800",
                  route.active && "bg-slate-800 text-white"
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
        
        <div className="px-3 py-2 absolute bottom-4 w-full">
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start text-slate-400 hover:text-white">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button variant="ghost" className="w-full justify-start text-slate-400 hover:text-rose-400">
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
