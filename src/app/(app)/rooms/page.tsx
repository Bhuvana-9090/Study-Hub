"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Filter, Plus, Search, Users } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"

const mockRooms = [
  // Semester 3
  { id: "ds", name: "Data Structures", subject: "Semester 3", users: 12, capacity: 20, active: true, color: "from-violet-500 to-indigo-500" },
  { id: "dm", name: "Discrete Mathematics", subject: "Semester 3", users: 8, capacity: 15, active: true, color: "from-blue-500 to-cyan-500" },
  { id: "dld", name: "Digital Logic Design", subject: "Semester 3", users: 5, capacity: 15, active: false, color: "from-emerald-500 to-teal-500" },
  { id: "coa", name: "Computer Organization", subject: "Semester 3", users: 3, capacity: 10, active: true, color: "from-amber-500 to-orange-500" },
  { id: "oop", name: "Object Oriented Programming", subject: "Semester 3", users: 14, capacity: 25, active: true, color: "from-rose-500 to-pink-500" },
  { id: "ps", name: "Probability & Statistics", subject: "Semester 3", users: 6, capacity: 15, active: true, color: "from-indigo-500 to-purple-500" },
  
  // Semester 4
  { id: "daa", name: "Design and Analysis of Algorithms", subject: "Semester 4", users: 10, capacity: 20, active: true, color: "from-cyan-500 to-blue-500" },
  { id: "os", name: "Operating Systems", subject: "Semester 4", users: 15, capacity: 25, active: true, color: "from-orange-500 to-red-500" },
  { id: "dbms", name: "Database Management Systems", subject: "Semester 4", users: 22, capacity: 30, active: true, color: "from-green-500 to-emerald-500" },
  { id: "se", name: "Software Engineering", subject: "Semester 4", users: 0, capacity: 20, active: false, color: "from-slate-500 to-slate-600" },
  { id: "cn", name: "Computer Networks", subject: "Semester 4", users: 7, capacity: 15, active: true, color: "from-blue-600 to-indigo-600" },
  { id: "flat", name: "Formal Languages & Automata Theory", subject: "Semester 4", users: 4, capacity: 10, active: true, color: "from-purple-600 to-pink-600" },
  
  // Extra
  { id: "general", name: "General Discussion Room", subject: "Community", users: 32, capacity: 100, active: true, color: "from-gray-700 to-gray-900" },
]

export default function RoomsPage() {
  const [search, setSearch] = React.useState("")

  const filtered = mockRooms.filter(
    r =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.subject.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Study Rooms</h1>
          <p className="text-muted-foreground mt-1">Join a virtual space and study alongside peers.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shrink-0 hover:scale-105 transition-transform">
          <Plus className="w-4 h-4 mr-2" />
          Create Room
        </Button>
      </motion.div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            type="search"
            placeholder="Search rooms by name or subject..."
            className="pl-9 bg-muted border-border text-foreground"
          />
        </div>
        <Button variant="outline" className="border-border text-foreground hover:bg-muted">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Room Cards Grid */}
      {filtered.length === 0 ? (
        /* Empty State */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-24 text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
            <Users className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-1">No rooms found</h3>
          <p className="text-muted-foreground text-sm mb-6">Try a different search or create your own room.</p>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" /> Create a Room
          </Button>
        </motion.div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((room, i) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <Card className="bg-card border-border flex flex-col overflow-hidden group hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                {/* Gradient top bar */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${room.color}`} />

                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <Badge
                      variant="secondary"
                      className="bg-primary/10 text-primary hover:bg-primary/20 font-medium"
                    >
                      {room.subject}
                    </Badge>
                    {room.active ? (
                      <div className="flex items-center gap-1.5 text-xs text-emerald-500 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Live
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">Offline</span>
                    )}
                  </div>
                  <CardTitle className="text-lg text-foreground leading-snug mt-2 group-hover:text-primary transition-colors">
                    {room.name}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-1 space-y-4 pb-4">
                  {/* Participant avatars */}
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {[...Array(Math.min(room.users, 4))].map((_, j) => (
                        <Avatar key={j} className="border-2 border-card h-8 w-8 hover:scale-110 hover:z-10 transition-transform">
                          <AvatarImage src={`https://i.pravatar.cc/150?u=${room.id}${j}`} />
                          <AvatarFallback className="text-xs bg-primary text-primary-foreground">U</AvatarFallback>
                        </Avatar>
                      ))}
                      {room.users > 4 && (
                        <div className="h-8 w-8 rounded-full bg-muted border-2 border-card flex items-center justify-center text-xs font-medium text-muted-foreground z-10">
                          +{room.users - 4}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Users className="w-3.5 h-3.5" />
                      <span>{room.users}/{room.capacity}</span>
                    </div>
                  </div>

                  {/* Capacity bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Capacity</span>
                      <span>{Math.round((room.users / room.capacity) * 100)}%</span>
                    </div>
                    <Progress
                      value={(room.users / room.capacity) * 100}
                      className="h-1.5 bg-muted [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-pink-400"
                    />
                  </div>
                </CardContent>

                <CardFooter className="pt-0 border-t border-border">
                  <Button
                    asChild
                    className="w-full mt-3 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 font-semibold hover:scale-[1.02]"
                  >
                    <Link href={`/rooms/${room.id}`}>
                      Join Room →
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
