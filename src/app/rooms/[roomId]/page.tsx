"use client"

import * as React from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, Maximize2, MessageSquare, Pause, Play, RotateCcw, Send, Settings, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ActiveRoomPage() {
  const params = useParams()
  const roomId = params.roomId as string

  const [timeLeft, setTimeLeft] = React.useState(25 * 60)
  const [isActive, setIsActive] = React.useState(false)
  const [mode, setMode] = React.useState<"focus" | "break">("focus")

  React.useEffect(() => {
    let interval: NodeJS.Timeout
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsActive(false)
      // Play sound, switch to break etc.
    }
    return () => clearInterval(interval)
  }, [isActive, timeLeft])

  const toggleTimer = () => setIsActive(!isActive)
  const resetTimer = () => {
    setIsActive(false)
    setTimeLeft(mode === "focus" ? 25 * 60 : 5 * 60)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const progress = mode === "focus" 
    ? ((25 * 60 - timeLeft) / (25 * 60)) * 100 
    : ((5 * 60 - timeLeft) / (5 * 60)) * 100

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col pt-2 pb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild className="text-slate-400 hover:text-white">
            <Link href="/rooms">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              Calculus & Linear Algebra
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse ml-2" />
            </h1>
            <p className="text-sm text-slate-400">12 members active</p>
          </div>
        </div>
        <Button variant="outline" className="border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800">
          <Maximize2 className="w-4 h-4 mr-2" />
          Focus Mode
        </Button>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
        
        {/* Left Sidebar: Timer */}
        <div className="flex flex-col gap-6">
          <Card className="bg-slate-900 border-slate-800 flex-none relative overflow-hidden">
            <div 
              className="absolute bottom-0 left-0 h-1 bg-indigo-500 transition-all duration-1000 ease-linear"
              style={{ width: `${progress}%` }}
            />
            <CardContent className="pt-6 pb-8 flex flex-col items-center justify-center text-center">
              <div className="flex items-center justify-center gap-2 mb-6 bg-slate-800/50 p-1 rounded-lg">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className={mode === "focus" ? "bg-slate-700 text-white" : "text-slate-400"}
                  onClick={() => { setMode("focus"); setIsActive(false); setTimeLeft(25 * 60) }}
                >
                  Focus
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className={mode === "break" ? "bg-slate-700 text-white" : "text-slate-400"}
                  onClick={() => { setMode("break"); setIsActive(false); setTimeLeft(5 * 60) }}
                >
                  Break
                </Button>
              </div>

              <div className="text-6xl md:text-7xl font-bold text-white tracking-tighter mb-8 font-mono">
                {formatTime(timeLeft)}
              </div>

              <div className="flex items-center gap-4">
                <Button 
                  size="icon" 
                  variant="outline"
                  onClick={resetTimer}
                  className="h-12 w-12 rounded-full border-slate-700 bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white"
                >
                  <RotateCcw className="w-5 h-5" />
                </Button>
                <Button 
                  size="icon"
                  onClick={toggleTimer}
                  className={`h-16 w-16 rounded-full ${
                    isActive ? 'bg-amber-600 hover:bg-amber-700' : 'bg-indigo-600 hover:bg-indigo-700'
                  } text-white shadow-lg`}
                >
                  {isActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                </Button>
                <Button 
                  size="icon" 
                  variant="outline"
                  className="h-12 w-12 rounded-full border-slate-700 bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white"
                >
                  <Settings className="w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-900 border-slate-800 flex-1 flex flex-col min-h-0">
            <CardHeader className="py-4 border-b border-slate-800">
              <CardTitle className="text-sm font-medium text-slate-200">Current Task</CardTitle>
            </CardHeader>
            <CardContent className="py-4">
              <div className="p-3 bg-slate-800/50 border border-indigo-500/30 rounded-lg">
                <p className="text-sm text-slate-200">Complete Calculus Chapter 4 Exercises</p>
                <p className="text-xs text-slate-500 mt-1">2/5 problems completed</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Center/Right: Study Space & Chat */}
        <Card className="lg:col-span-2 bg-slate-900 border-slate-800 flex flex-col min-h-0">
          <Tabs defaultValue="chat" className="flex-1 flex flex-col min-h-0">
            <div className="px-4 py-2 border-b border-slate-800 flex items-center justify-between">
              <TabsList className="bg-slate-800 border-slate-700 text-slate-400 h-9">
                <TabsTrigger value="chat" className="data-[state=active]:bg-slate-950 data-[state=active]:text-white text-xs">
                  <MessageSquare className="w-3.5 h-3.5 mr-2" />
                  Study Chat
                </TabsTrigger>
                <TabsTrigger value="members" className="data-[state=active]:bg-slate-950 data-[state=active]:text-white text-xs">
                  <Users className="w-3.5 h-3.5 mr-2" />
                  Members (12)
                </TabsTrigger>
              </TabsList>
              <div className="text-xs text-slate-500 bg-slate-800/50 px-2 py-1 rounded">
                Quiet Room
              </div>
            </div>
            
            <TabsContent value="chat" className="flex-1 flex flex-col min-h-0 p-0 m-0 data-[state=active]:flex">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4 pb-4">
                  <div className="text-center my-4">
                    <span className="text-xs text-slate-500 bg-slate-800/50 px-2 py-1 rounded-full">
                      Welcome! Keep discussions focused on Calculus & Linear Algebra.
                    </span>
                  </div>
                  
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8 mt-0.5">
                      <AvatarImage src="https://i.pravatar.cc/150?u=1" />
                      <AvatarFallback>S1</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm font-medium text-indigo-400">Sarah M.</span>
                        <span className="text-xs text-slate-500">10:42 AM</span>
                      </div>
                      <p className="text-sm text-slate-300 bg-slate-800 p-2.5 rounded-lg rounded-tl-none">
                        Does anyone understand how to apply the Mean Value Theorem on question 4?
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8 mt-0.5">
                      <AvatarImage src="https://i.pravatar.cc/150?u=2" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm font-medium text-emerald-400">John D.</span>
                        <span className="text-xs text-slate-500">10:45 AM</span>
                      </div>
                      <p className="text-sm text-slate-300 bg-slate-800 p-2.5 rounded-lg rounded-tl-none">
                        Yeah, you need to verify that f(x) is continuous on [a,b] and differentiable on (a,b) first. I uploaded a reference PDF in the Resources tab.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollArea>
              
              <div className="p-4 border-t border-slate-800 bg-slate-900/50">
                <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                  <Input 
                    placeholder="Ask a question or discuss studies..." 
                    className="bg-slate-950 border-slate-800 text-slate-200"
                  />
                  <Button type="submit" size="icon" className="bg-indigo-600 hover:bg-indigo-700 shrink-0">
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </TabsContent>
            
            <TabsContent value="members" className="flex-1 min-h-0 p-4 m-0">
              <div className="space-y-4">
                {/* Mock members list would iterate here */}
                <div className="text-sm text-slate-400 text-center py-8">
                  Member list view
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
        
      </div>
    </div>
  )
}
