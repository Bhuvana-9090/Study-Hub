"use client"

import * as React from "react"
import Link from "next/link"
import { Users, Search, Filter, Play, Clock, Volume2, Shield } from "lucide-react"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

const mockRooms = [
  { id: "math-101", name: "Calculus & Linear Algebra", subject: "Mathematics", users: 12, capacity: 20, active: true },
  { id: "cs-algo", name: "Data Structures & Algos", subject: "Computer Science", users: 8, capacity: 15, active: true },
  { id: "silent-hall", name: "Absolute Silence 🤫", subject: "General Study", users: 45, capacity: 50, active: true },
  { id: "med-bio", name: "Anatomy Revision", subject: "Biology", users: 5, capacity: 10, active: false },
  { id: "language", name: "Spanish Conversation", subject: "Languages", users: 3, capacity: 8, active: true },
  { id: "lit-review", name: "Modern Literature", subject: "English", users: 14, capacity: 25, active: true },
]

export default function RoomsPage() {
  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-100">Study Rooms</h1>
          <p className="text-slate-400 mt-1">Join a virtual space and study alongside peers.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Create Room
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
          <Input
            type="search"
            placeholder="Search for rooms by name or subject..."
            className="pl-9 bg-slate-900 border-slate-800 text-slate-200"
          />
        </div>
        <Button variant="outline" className="border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockRooms.map((room) => (
          <Card key={room.id} className="bg-slate-900 border-slate-800 flex flex-col hover:border-indigo-500/50 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start mb-2">
                <Badge variant="secondary" className="bg-indigo-900/50 text-indigo-300 hover:bg-indigo-900/80">
                  {room.subject}
                </Badge>
                {room.active && (
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500 mt-1.5 animate-pulse"></span>
                )}
              </div>
              <CardTitle className="text-xl text-slate-100 leading-tight">{room.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <div className="flex items-center gap-4 text-sm text-slate-400">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{room.users} / {room.capacity}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Volume2 className="w-4 h-4" />
                  <span>{room.id === 'silent-hall' ? 'Silent' : 'Quiet Chat'}</span>
                </div>
              </div>
              
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Capacity</span>
                  <span>{Math.round((room.users / room.capacity) * 100)}%</span>
                </div>
                <Progress value={(room.users / room.capacity) * 100} className="h-1.5 bg-slate-800 [&>div]:bg-indigo-500" />
              </div>

              <div className="flex -space-x-2 pt-2">
                {[...Array(Math.min(room.users, 4))].map((_, i) => (
                  <Avatar key={i} className="border-2 border-slate-900 h-8 w-8">
                    <AvatarImage src={`https://i.pravatar.cc/150?u=${room.id}${i}`} />
                    <AvatarFallback className="bg-slate-700 text-xs text-white">U</AvatarFallback>
                  </Avatar>
                ))}
                {room.users > 4 && (
                  <div className="h-8 w-8 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-xs font-medium text-slate-400 z-10">
                    +{room.users - 4}
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="pt-2 border-t border-slate-800/50 mt-auto">
              <Button asChild className="w-full bg-slate-800 hover:bg-indigo-600 text-white transition-colors">
                <Link href={`/rooms/${room.id}`}>
                  Join Room
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

function Plus(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}
