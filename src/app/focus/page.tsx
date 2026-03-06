"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, Circle, EyeOff, Music, Pause, Play, RotateCcw, Volume2 } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function FocusModePage() {
  const [timeLeft, setTimeLeft] = React.useState(25 * 60)
  const [isActive, setIsActive] = React.useState(false)
  
  // Tasks for focus mode
  const [tasks, setTasks] = React.useState([
    { id: 1, title: "Complete Calculus Chapter 4 Exercises", completed: false },
    { id: 2, title: "Review past mistakes", completed: false },
  ])

  React.useEffect(() => {
    let interval: NodeJS.Timeout
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsActive(false)
    }
    return () => clearInterval(interval)
  }, [isActive, timeLeft])

  const toggleTimer = () => setIsActive(!isActive)
  
  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center">
      {/* Subtle top navigation */}
      <div className="absolute top-0 w-full p-6 flex justify-between items-center opacity-30 hover:opacity-100 transition-opacity">
        <Button variant="ghost" asChild className="text-slate-400 hover:text-white hover:bg-slate-900">
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Exit Focus
          </Link>
        </Button>
        <div className="flex items-center gap-2 text-slate-400">
          <EyeOff className="w-4 h-4" />
          <span className="text-sm">Distractions Hidden</span>
        </div>
      </div>

      <div className="w-full max-w-lg flex flex-col items-center">
        {/* Timer */}
        <div className="text-[120px] font-mono font-bold text-white tracking-tighter leading-none mb-12 shadow-indigo-500/20 drop-shadow-2xl">
          {formatTime(timeLeft)}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6 mb-16">
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={() => { setIsActive(false); setTimeLeft(25 * 60); }}
            className="w-16 h-16 rounded-full text-slate-400 hover:text-white hover:bg-slate-900"
          >
            <RotateCcw className="w-6 h-6" />
          </Button>
          <Button 
            onClick={toggleTimer}
            className={`w-24 h-24 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 ${
              isActive ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20' 
                       : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20'
            }`}
          >
            {isActive ? <Pause className="w-10 h-10" /> : <Play className="w-10 h-10 ml-2" />}
          </Button>
          <Button 
            size="icon" 
            variant="ghost" 
            className="w-16 h-16 rounded-full text-slate-400 hover:text-white hover:bg-slate-900 relative"
          >
            <Music className="w-6 h-6" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full" />
          </Button>
        </div>

        {/* Current Objective */}
        <div className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
          <h3 className="text-sm font-medium text-slate-400 mb-4 uppercase tracking-wider">Current Objective</h3>
          <div className="space-y-3">
            {tasks.map((task) => (
              <div 
                key={task.id} 
                className="flex items-start gap-4 cursor-pointer group"
                onClick={() => toggleTask(task.id)}
              >
                <div className={`mt-0.5 shrink-0 transition-colors ${task.completed ? 'text-emerald-500' : 'text-slate-600 group-hover:text-indigo-400'}`}>
                  {task.completed ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                </div>
                <p className={`text-lg transition-colors ${task.completed ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
                  {task.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
