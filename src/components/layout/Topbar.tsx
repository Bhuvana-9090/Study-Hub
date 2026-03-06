"use client"

import * as React from "react"
import { Bell, Flame, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/ThemeToggle"
import { useAuth } from "@/context/AuthContext"
import Link from "next/link"

const mockNotifications = [
  { id: 1, type: "invite", title: "Sarah invited you to Study Room", time: "5m ago", read: false },
  { id: 2, type: "alert", title: "Assignment due in 24 hours", time: "1h ago", read: false },
  { id: 3, type: "achievement", title: "You hit a 10-day streak!", time: "2d ago", read: true },
]

export function Topbar() {
  const unreadCount = mockNotifications.filter(n => !n.read).length
  const { user, isAuthenticated } = useAuth()

  return (
    <div className="h-16 border-b border-border flex items-center justify-between px-6 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="flex-1 flex max-w-xl items-center relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search for rooms, resources, or tasks..."
          className="w-full pl-9 bg-muted border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
        />
      </div>

      <div className="flex items-center gap-3 ml-6">
        <div className="flex items-center gap-1.5 text-rose-500 bg-rose-500/10 px-3 py-1.5 rounded-full text-sm font-medium">
          <Flame className="w-4 h-4" />
          <span className="hidden sm:inline">12 Day Streak</span>
        </div>

        {/* Night Mode Toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 bg-card border-border p-0 overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h4 className="font-semibold text-foreground">Notifications</h4>
              <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                {unreadCount} new
              </Badge>
            </div>
            <div className="max-h-[300px] overflow-y-auto divide-y divide-border">
              {mockNotifications.map(notification => (
                <div key={notification.id} className={`p-4 flex gap-3 hover:bg-muted/50 transition-colors ${!notification.read ? 'bg-muted/30' : ''}`}>
                  <div className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${!notification.read ? 'bg-primary' : 'bg-transparent'}`} />
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm tracking-tight ${!notification.read ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                      {notification.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                    {notification.type === 'invite' && (
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" className="h-7 text-xs bg-primary hover:bg-primary/90 w-full text-primary-foreground">Accept</Button>
                        <Button size="sm" variant="outline" className="h-7 text-xs w-full">Decline</Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {isAuthenticated ? (
          <Link href="/profile" className="flex items-center gap-3 hover:bg-muted/50 p-1.5 rounded-xl transition-colors">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-foreground leading-none">{user?.name}</p>
              <p className="text-[10px] text-muted-foreground mt-1">{user?.college || "PVPSIT Student"}</p>
            </div>
            <Avatar className="h-9 w-9 border border-border shadow-sm">
              <AvatarImage src={user?.avatar || undefined} alt={user?.name} />
              <AvatarFallback className="bg-muted text-muted-foreground">
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </Link>
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild className="text-muted-foreground hover:text-foreground">
              <Link href="/login?tab=login">Login</Link>
            </Button>
            <Button variant="default" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20">
              <Link href="/login?tab=register">Register</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
