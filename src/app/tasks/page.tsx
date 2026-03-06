"use client"

import * as React from "react"
import { Check, Clock, GripVertical, Plus, Trash2, Flame } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

type Task = {
  id: string
  title: string
  completed: boolean
  tag: string
  priority: "Low" | "Medium" | "High"
  estimatedTime?: string
}

const mockTasks: Task[] = [
  { id: "1", title: "Complete Calculus Chapter 4 Exercises", completed: true, tag: "Math", priority: "High", estimatedTime: "45m" },
  { id: "2", title: "Review Physics Lab Report", completed: true, tag: "Science", priority: "Medium", estimatedTime: "30m" },
  { id: "3", title: "Read History Essay", completed: false, tag: "History", priority: "Low", estimatedTime: "1h" },
  { id: "4", title: "Practice Programming Algorithms", completed: false, tag: "Computer Science", priority: "High", estimatedTime: "1.5h" },
  { id: "5", title: "Revise French Vocabulary", completed: false, tag: "Language", priority: "Medium", estimatedTime: "20m" },
]

export default function TasksPage() {
  const [tasks, setTasks] = React.useState<Task[]>(mockTasks)
  const [newTask, setNewTask] = React.useState("")

  const completedCount = tasks.filter(t => t.completed).length
  const progressPercent = Math.round((completedCount / tasks.length) * 100) || 0

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  const addTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTask.trim()) return
    setTasks([
      ...tasks, 
      { id: Date.now().toString(), title: newTask, completed: false, tag: "General", priority: "Medium" }
    ])
    setNewTask("")
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id))
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-100">Daily Task Planner</h1>
        <p className="text-slate-400 mt-1">Organize your study goals for today.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2 bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-slate-100">To-Do List</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={addTask} className="flex gap-2 mb-6">
              <Input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a new task..."
                className="bg-slate-950 border-slate-800 text-slate-200"
              />
              <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white shrink-0">
                <Plus className="w-4 h-4 mr-2" />
                Add
              </Button>
            </form>

            <div className="space-y-2">
              {tasks.map(task => (
                <div 
                  key={task.id} 
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                    task.completed 
                      ? 'bg-slate-950/50 border-slate-800/50 opacity-60' 
                      : 'bg-slate-800 border-slate-700 hover:border-indigo-500/50'
                  }`}
                >
                  <GripVertical className="w-4 h-4 text-slate-600 cursor-grab active:cursor-grabbing shrink-0" />
                  <Checkbox 
                    checked={task.completed} 
                    onCheckedChange={() => toggleTask(task.id)}
                    className="border-slate-600 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                  />
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium pr-2 truncate ${task.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                      {task.title}
                    </p>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 shrink-0">
                    {task.estimatedTime && (
                      <Badge variant="outline" className="text-slate-400 border-slate-700 bg-slate-900 text-xs font-normal">
                        <Clock className="w-3 h-3 mr-1" />
                        {task.estimatedTime}
                      </Badge>
                    )}
                    <Badge variant="secondary" className="bg-slate-900 text-indigo-400 hover:bg-slate-800 text-xs font-normal">
                      {task.tag}
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className={`text-xs font-normal border-slate-700 ${
                        task.priority === 'High' ? 'text-rose-400' : task.priority === 'Medium' ? 'text-amber-400' : 'text-emerald-400'
                      }`}
                    >
                      {task.priority}
                    </Badge>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => deleteTask(task.id)}
                    className="shrink-0 h-8 w-8 text-slate-500 hover:text-rose-500 hover:bg-rose-500/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              
              {tasks.length === 0 && (
                <div className="text-center py-8 text-slate-500 text-sm">
                  No tasks for today. Enjoy your free time or add new tasks!
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="pb-4">
              <CardTitle className="text-slate-100 text-lg">Daily Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-2">{progressPercent}%</div>
              <Progress value={progressPercent} className="h-2 mb-4 bg-slate-800 [&>div]:bg-emerald-500" />
              <p className="text-sm text-slate-400 mb-6">
                You've completed <span className="text-slate-200 font-medium">{completedCount} of {tasks.length}</span> tasks today.
              </p>
              
              {progressPercent === 100 ? (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-md text-emerald-400 text-sm flex items-start gap-2">
                  <Flame className="w-4 h-4 mt-0.5 shrink-0" />
                  <p>Incredible work! You crushed all your goals for today.</p>
                </div>
              ) : progressPercent > 50 ? (
                <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-md text-indigo-400 text-sm flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 shrink-0" />
                  <p>You're over halfway there! Keep up the great pace.</p>
                </div>
              ) : (
                <div className="p-3 bg-slate-800/80 rounded-md text-slate-400 text-sm flex items-start gap-2">
                  <Clock className="w-4 h-4 mt-0.5 shrink-0" />
                  <p>Ready to start? Pick a task and launch focus mode.</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="pb-4">
              <CardTitle className="text-slate-100 text-lg">Time Tracking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400">Total studied</span>
                <span className="font-medium text-slate-200">2h 45m</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400">Estimated remaining</span>
                <span className="font-medium text-slate-200">2h 50m</span>
              </div>
              <Button className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 mt-2">
                Enter Focus Mode
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
