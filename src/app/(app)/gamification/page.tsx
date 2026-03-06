"use client"

import * as React from "react"
import { Award, Clock, Flame, Info, Medal, Trophy, Zap } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

const leaderboardData = [
  { id: 1, name: "Alex (You)", hours: 24.5, streak: 12, rank: 1, avatar: "a042581f4e29026704d" },
  { id: 2, name: "Sarah Chen", hours: 22.1, streak: 8, rank: 2, avatar: "1" },
  { id: 3, name: "Marcus Johnson", hours: 19.8, streak: 15, rank: 3, avatar: "2" },
  { id: 4, name: "Emma Wilson", hours: 18.2, streak: 5, rank: 4, avatar: "3" },
  { id: 5, name: "David Kim", hours: 16.5, streak: 21, rank: 5, avatar: "4" },
]

const recentBadges = [
  { id: "b1", title: "Early Bird", description: "Completed a focus session before 7 AM", icon: Zap, color: "text-amber-500", bg: "bg-amber-500/10" },
  { id: "b2", title: "Marathoner", description: "Studied for 4+ hours in a single day", icon: Clock, color: "text-indigo-500", bg: "bg-indigo-500/10" },
  { id: "b3", title: "Collaborator", description: "Helped answer 5 questions in Study Chat", icon: Award, color: "text-emerald-500", bg: "bg-emerald-500/10" },
]

export default function GamificationPage() {
  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-100">Achievements</h1>
        <p className="text-slate-400 mt-1">Track your progress and stay motivated.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Columns */}
        <div className="md:col-span-2 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="bg-slate-900 border-slate-800 relative overflow-hidden group">
              <div className="absolute top-0 right-0 -mr-4 -mt-4 text-rose-500/10 group-hover:text-rose-500/20 transition-colors">
                <Flame className="w-32 h-32" />
              </div>
              <CardHeader className="pb-2 relative z-10">
                <CardTitle className="text-sm font-medium text-slate-400">Current Streak</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-white tracking-tighter">12</span>
                  <span className="text-slate-400 font-medium">Days</span>
                </div>
                <p className="text-xs text-rose-400 mt-2 flex items-center gap-1">
                  <Flame className="w-3 h-3" />
                  Best streak: 21 days
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800 relative overflow-hidden group">
              <div className="absolute top-0 right-0 -mr-4 -mt-4 text-indigo-500/10 group-hover:text-indigo-500/20 transition-colors">
                <Trophy className="w-32 h-32" />
              </div>
              <CardHeader className="pb-2 relative z-10">
                <CardTitle className="text-sm font-medium text-slate-400">Class Rank</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-white tracking-tighter">#1</span>
                  <span className="text-slate-400 font-medium">/ 124</span>
                </div>
                <p className="text-xs text-indigo-400 mt-2 font-medium">
                  Top 1% of your cohort
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-slate-100 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                Recent Badges
              </CardTitle>
              <CardDescription className="text-slate-400">Medals and milestones you've unlocked.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-3">
                {recentBadges.map((badge) => (
                  <div key={badge.id} className="flex flex-col items-center text-center p-4 rounded-xl border border-slate-800 bg-slate-950/50">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${badge.bg} ${badge.color}`}>
                      <badge.icon className="w-6 h-6" />
                    </div>
                    <h4 className="font-semibold text-slate-200 text-sm mb-1">{badge.title}</h4>
                    <p className="text-xs text-slate-500 leading-snug">{badge.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Global Leaderboard */}
        <div className="space-y-6">
          <Card className="bg-slate-900 border-slate-800 flex flex-col h-full">
            <CardHeader className="pb-4 border-b border-slate-800">
              <div className="flex items-center justify-between">
                <CardTitle className="text-slate-100 text-lg flex items-center gap-2">
                  <Medal className="w-5 h-5 text-amber-500" />
                  Leaderboard
                </CardTitle>
                <Badge variant="outline" className="border-slate-700 bg-slate-950 text-slate-300">
                  This Week
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0 flex-1">
              <div className="divide-y divide-slate-800">
                {leaderboardData.map((user) => (
                  <div 
                    key={user.id} 
                    className={`flex items-center gap-4 p-4 ${user.id === 1 ? 'bg-indigo-500/5 hover:bg-indigo-500/10' : 'hover:bg-slate-800/50'} transition-colors`}
                  >
                    <div className="w-6 font-bold text-center text-slate-500">
                      {user.rank === 1 ? <span className="text-amber-500">1</span> :
                       user.rank === 2 ? <span className="text-slate-300">2</span> :
                       user.rank === 3 ? <span className="text-amber-700">3</span> :
                       user.rank}
                    </div>
                    <Avatar className="h-10 w-10 border border-slate-800">
                      <AvatarImage src={`https://i.pravatar.cc/150?u=${user.avatar}`} />
                      <AvatarFallback className="bg-slate-800">U{user.rank}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${user.id === 1 ? 'text-indigo-400' : 'text-slate-200'}`}>
                        {user.name}
                      </p>
                      <p className="text-xs text-slate-500">{user.hours}h focused</p>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-medium text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded">
                      <Flame className="w-3 h-3" />
                      {user.streak}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
