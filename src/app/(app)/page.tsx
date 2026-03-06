"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { BookOpen, Clock, Flame, Play, Plus, TrendingUp, Users, Zap } from "lucide-react"
import Link from "next/link"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/context/AuthContext"
import Link from "next/link"
import { Settings } from "lucide-react"

const weeklyData = [
  { name: "Mon", hours: 2.5 },
  { name: "Tue", hours: 3.8 },
  { name: "Wed", hours: 1.5 },
  { name: "Thu", hours: 4.2 },
  { name: "Fri", hours: 3.0 },
  { name: "Sat", hours: 5.5 },
  { name: "Sun", hours: 4.0 },
]

const activityFeed = [
  { id: 1, user: "Sarah M.", avatar: "1", action: "joined", target: "Calculus Room", time: "2m ago" },
  { id: 2, user: "John D.", avatar: "2", action: "uploaded", target: "Physics Notes.pdf", time: "8m ago" },
  { id: 3, user: "Emma K.", avatar: "3", action: "completed", target: "3 tasks", time: "12m ago" },
  { id: 4, user: "Marcus L.", avatar: "4", action: "started focus in", target: "Data Structures", time: "20m ago" },
  { id: 5, user: "Aisha R.", avatar: "5", action: "shared", target: "History Essay", time: "35m ago" },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: "easeOut" as const },
  }),
}

export default function Dashboard() {
  const { user } = useAuth()
  
  return (
    <div className="space-y-8 pb-10">

      {/* ── HERO SECTION ───────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative overflow-hidden rounded-2xl p-8 md:p-12"
        style={{
          background: "linear-gradient(135deg, #7c5cbf 0%, #a78bfa 45%, #f472b6 100%)",
        }}
      >
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-white/70 text-sm font-medium mb-1 uppercase tracking-widest">Good evening 👋</p>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
              Welcome back, {user?.name || "Alex Johnson"}!
            </h1>
            <p className="text-white/80 text-base max-w-md mb-6">
              You're on a <span className="font-bold text-white">12-day streak</span>. Keep it going — 3.5h focused today!
            </p>
            <Button asChild variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white backdrop-blur-md">
              <Link href="/profile">
                <Settings className="mr-2 h-4 w-4" />
                Edit My Profile
              </Link>
            </Button>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <Button asChild size="lg" className="bg-white text-purple-700 hover:bg-white/90 font-semibold shadow-lg shadow-black/10 hover:scale-105 transition-transform">
              <Link href="/focus">
                <Play className="w-4 h-4 mr-2" />
                Start Focus
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 hover:scale-105 transition-transform backdrop-blur-sm">
              <Link href="/rooms">
                <Users className="w-4 h-4 mr-2" />
                Browse Rooms
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>

      {/* ── STAT CARDS ─────────────────────────────────────────────── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Hours Focused Today", value: "3.5h", delta: "+1.2h from yesterday", icon: Clock, color: "text-indigo-500", bg: "bg-indigo-500/10" },
          { label: "Study Streak", value: "12 Days", delta: "Best: 21 days 🔥", icon: Flame, color: "text-rose-500", bg: "bg-rose-500/10" },
          { label: "Tasks Completed", value: "5 / 12", delta: "41% of daily goal", icon: Zap, color: "text-amber-500", bg: "bg-amber-500/10", progress: 41 },
          { label: "Upcoming Deadlines", value: "3", delta: "Due within 7 days", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10" },
        ].map((stat, i) => (
          <motion.div key={stat.label} custom={i} variants={fadeUp} initial="hidden" animate="visible">
            <Card className="bg-card border-border hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-default">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${stat.bg}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                {stat.progress !== undefined && (
                  <Progress value={stat.progress} className="h-1.5 mb-1.5 bg-muted [&>div]:bg-amber-500" />
                )}
                <p className="text-xs text-muted-foreground">{stat.delta}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* ── CHART + ACTIVITY ───────────────────────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-3">

        {/* Weekly Chart */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Card className="bg-card border-border h-full">
            <CardHeader>
              <CardTitle className="text-foreground">Weekly Study Progress</CardTitle>
              <CardDescription className="text-muted-foreground">Total hours studied per day this week</CardDescription>
            </CardHeader>
            <CardContent className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <XAxis dataKey="name" stroke="#9490c7" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#9490c7" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}h`} />
                  <Tooltip
                    cursor={{ fill: "rgba(167,139,250,0.08)" }}
                    contentStyle={{ backgroundColor: "var(--card)", borderColor: "var(--border)", color: "var(--foreground)", borderRadius: "0.75rem" }}
                  />
                  <Bar dataKey="hours" fill="#a78bfa" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Live Activity Feed */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Card className="bg-card border-border h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-foreground text-base">Live Activity</CardTitle>
                <span className="flex items-center gap-1.5 text-xs text-emerald-500 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {activityFeed.map((item, i) => (
                <motion.div
                  key={item.id}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="flex items-start gap-3"
                >
                  <Avatar className="h-8 w-8 border-2 border-background shrink-0">
                    <AvatarImage src={`https://i.pravatar.cc/150?u=${item.avatar}`} />
                    <AvatarFallback className="text-xs bg-primary text-primary-foreground">{item.user[0]}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="text-sm text-foreground leading-snug">
                      <span className="font-medium">{item.user}</span>{" "}
                      <span className="text-muted-foreground">{item.action}</span>{" "}
                      <span className="font-medium text-primary">{item.target}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
                  </div>
                </motion.div>
              ))}
              <Button variant="ghost" className="w-full text-primary hover:bg-primary/10 mt-2 text-sm">
                View all activity →
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* ── TODAY'S SCHEDULE ───────────────────────────────────────── */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <Card className="bg-card border-border">
          <CardHeader className="border-b border-border pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-foreground">Today's Schedule</CardTitle>
                <CardDescription className="text-muted-foreground">Your upcoming study blocks</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="border-border text-foreground hover:bg-muted">
                <Plus className="w-3.5 h-3.5 mr-1" />
                Add Block
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-3">
              {[
                { time: "09:00 AM", title: "Calculus Revision", room: "Math Masters", color: "bg-violet-500", tag: "Mathematics" },
                { time: "11:30 AM", title: "Physics Lab Report", room: "Physics Lab", color: "bg-blue-500", tag: "Physics" },
                { time: "02:00 PM", title: "Read Chapter 4", room: "Silent Study", color: "bg-teal-500", tag: "Literature" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.01, x: 4 }}
                  className="flex items-center gap-4 p-3.5 rounded-xl bg-muted/50 border border-border transition-colors hover:bg-muted cursor-pointer group"
                >
                  <div className={`w-1 h-10 rounded-full shrink-0 ${item.color}`} />
                  <div className="w-16 shrink-0 text-xs font-medium text-muted-foreground">{item.time}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.room}</p>
                  </div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 hidden sm:flex">
                    {item.tag}
                  </Badge>
                  <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity text-primary hover:bg-primary/10 text-xs">
                    Join →
                  </Button>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-border flex gap-3">
              <Button asChild className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/resources"><BookOpen className="w-4 h-4 mr-2" /> Resources</Link>
              </Button>
              <Button asChild variant="outline" className="flex-1 border-border text-foreground hover:bg-muted">
                <Link href="/tasks"><Zap className="w-4 h-4 mr-2" /> All Tasks</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

    </div>
  )
}
