"use client"

import * as React from "react"
import Link from "next/link"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { BookOpen, Calendar, CheckSquare, Clock, Flame, Play, Plus } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

const weeklyData = [
  { name: "Mon", hours: 2.5 },
  { name: "Tue", hours: 3.8 },
  { name: "Wed", hours: 1.5 },
  { name: "Thu", hours: 4.2 },
  { name: "Fri", hours: 3.0 },
  { name: "Sat", hours: 5.5 },
  { name: "Sun", hours: 4.0 },
]

export default function Dashboard() {
  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome back, Alex!</h1>
          <p className="text-muted-foreground mt-1">Here is what is happening with your studies today.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Create Task
          </Button>
          <Button variant="secondary" asChild className="bg-slate-800 text-slate-200 hover:bg-slate-700">
            <Link href="/focus">
              <Play className="w-4 h-4 mr-2 text-rose-500" />
              Focus Mode
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">Hours Focused Today</CardTitle>
            <Clock className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">3.5h</div>
            <p className="text-xs text-slate-400 mt-1">+1.2h from yesterday</p>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">Study Streak</CardTitle>
            <Flame className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">12 Days</div>
            <p className="text-xs text-slate-400 mt-1">You're on fire! 🔥</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">Tasks Completed</CardTitle>
            <CheckSquare className="h-4 w-4 text-indigo-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">5 / 12</div>
            <Progress value={41} className="h-2 mt-3 bg-slate-800 [&>div]:bg-indigo-500" />
          </CardContent>
        </Card>
        
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">Upcoming Deadlines</CardTitle>
            <Calendar className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">3</div>
            <p className="text-xs text-amber-500 mt-1">Due within 7 days</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-slate-100">Weekly Study Progress</CardTitle>
            <CardDescription className="text-slate-400">Total hours spent studying this week</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}h`} />
                <Tooltip 
                  cursor={{ fill: '#1e293b' }} 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                />
                <Bar dataKey="hours" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-3 bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-slate-100">Today's Schedule</CardTitle>
            <CardDescription className="text-slate-400">Your upcoming study blocks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { time: "09:00 AM", title: "Calculus Revision", room: "Math Masters", color: "bg-blue-500" },
                { time: "11:30 AM", title: "Physics Lab Report", room: "Physics Lab", color: "bg-indigo-500" },
                { time: "02:00 PM", title: "Read Chapter 4", room: "Silent Study", color: "bg-teal-500" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-3 rounded-lg bg-slate-800/50 border border-slate-800/50 transition-colors hover:bg-slate-800">
                  <div className="w-16 shrink-0 text-sm md:text-xs font-medium text-slate-400 mt-0.5">{item.time}</div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none text-slate-200">{item.title}</p>
                    <div className="flex items-center text-xs text-slate-500">
                      <div className={`w-2 h-2 rounded-full mr-1.5 ${item.color}`} />
                      {item.room}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 shadow-none text-xs text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10">
                    Join
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-slate-800 flex gap-2">
              <Button className="flex-1 justify-center bg-slate-800 text-slate-200 hover:bg-slate-700">
                <BookOpen className="w-4 h-4 mr-2" />
                Resources
              </Button>
              <Button className="flex-1 justify-center bg-slate-800 text-slate-200 hover:bg-slate-700">
                <CheckSquare className="w-4 h-4 mr-2" />
                All Tasks
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
