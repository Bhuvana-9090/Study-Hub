import * as React from "react"
import { Bell, Flame, Search, CheckCircle2, UserPlus, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"

const mockNotifications = [
  { id: 1, type: "invite", title: "Sarah invited you to Study Room", time: "5m ago", read: false },
  { id: 2, type: "alert", title: "Assignment due in 24 hours", time: "1h ago", read: false },
  { id: 3, type: "achievement", title: "You hit a 10-day streak!", time: "2d ago", read: true },
]

export function Topbar() {
  const unreadCount = mockNotifications.filter(n => !n.read).length

  return (
    <div className="h-16 border-b flex items-center justify-between px-6 bg-slate-950/50 backdrop-blur-xl sticky top-0 z-50">
      <div className="flex-1 flex max-w-xl items-center relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
        <Input
          type="search"
          placeholder="Search for study rooms, resources, or tasks..."
          className="w-full pl-9 bg-slate-900 border-slate-800 text-slate-200 placeholder:text-slate-500 focus-visible:ring-indigo-500"
        />
      </div>
      
      <div className="flex items-center gap-4 ml-6">
        <div className="flex items-center gap-2 text-rose-500 bg-rose-500/10 px-3 py-1.5 rounded-full text-sm font-medium">
          <Flame className="w-4 h-4" />
          <span className="hidden sm:inline">12 Day Streak</span>
        </div>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative text-slate-300 hover:text-white">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 bg-slate-900 border-slate-800 p-0 overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-slate-800">
              <h4 className="font-semibold text-slate-100">Notifications</h4>
              <Badge variant="secondary" className="bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20">
                {unreadCount} new
              </Badge>
            </div>
            <div className="max-h-[300px] overflow-y-auto divide-y divide-slate-800">
              {mockNotifications.map(notification => (
                <div key={notification.id} className={`p-4 flex gap-3 hover:bg-slate-800/50 transition-colors ${!notification.read ? 'bg-slate-800/20' : ''}`}>
                  <div className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${!notification.read ? 'bg-indigo-500' : 'bg-transparent'}`} />
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm tracking-tight ${!notification.read ? 'text-slate-100 font-medium' : 'text-slate-400'}`}>
                      {notification.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">{notification.time}</p>
                    {notification.type === 'invite' && (
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" className="h-7 text-xs bg-indigo-600 hover:bg-indigo-700 w-full text-white">Accept</Button>
                        <Button size="sm" variant="outline" className="h-7 text-xs border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800 w-full">Decline</Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        
        <Avatar className="h-8 w-8 border border-slate-800 cursor-pointer">
          <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="@user" />
          <AvatarFallback className="bg-slate-800 text-slate-300">AL</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}
