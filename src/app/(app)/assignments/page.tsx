"use client"

import * as React from "react"
import { Calendar, CheckCircle2, Circle, Clock, MoreVertical, Plus } from "lucide-react"
import { format, addDays } from "date-fns"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const today = new Date()

const mockAssignments = [
  { id: 1, title: "Calculus Problem Set 3", subject: "Mathematics", dueDate: addDays(today, 2), status: "in-progress" },
  { id: 2, title: "History Essay Draft", subject: "History", dueDate: addDays(today, 5), status: "pending" },
  { id: 3, title: "Software Eng Project Proposal", subject: "Computer Science", dueDate: addDays(today, 7), status: "pending" },
  { id: 4, title: "Physics Lab Report", subject: "Physics", dueDate: addDays(today, 1), status: "in-progress" },
  { id: 5, title: "French Oral Presentation Prep", subject: "Languages", dueDate: addDays(today, -1), status: "completed" },
]

export default function AssignmentsPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20"
      case "in-progress": return "text-indigo-400 bg-indigo-500/10 border-indigo-500/20"
      default: return "text-slate-400 bg-slate-800 border-slate-700"
    }
  }

  const getUrgencyColor = (dueDate: Date, status: string) => {
    if (status === "completed") return "text-slate-500"
    const diff = (dueDate.getTime() - today.getTime()) / (1000 * 3600 * 24)
    if (diff < 0) return "text-rose-500 font-bold" // Overdue
    if (diff <= 2) return "text-amber-500 font-medium" // Due soon
    return "text-slate-300"
  }

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-100">Assignments</h1>
          <p className="text-slate-400 mt-1">Track deadlines and coursework progress.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Assignment
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main List Column */}
        <div className="md:col-span-2 space-y-4">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="pb-3 border-b border-slate-800 mb-2">
              <CardTitle className="text-slate-100 font-medium flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500" />
                Active Assignments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-3">
              {mockAssignments.sort((a,b) => a.dueDate.getTime() - b.dueDate.getTime()).map((assignment) => (
                <div 
                  key={assignment.id} 
                  className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border transition-colors ${
                    assignment.status === 'completed' 
                      ? 'bg-slate-950/50 border-slate-800/50 opacity-60' 
                      : 'bg-slate-800/50 border-slate-700 hover:border-indigo-500/50'
                  }`}
                >
                  <div className="flex gap-3 min-w-0">
                    <button className="mt-0.5 shrink-0 text-slate-500 hover:text-emerald-500 transition-colors">
                      {assignment.status === "completed" ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </button>
                    <div className="min-w-0">
                      <p className={`font-medium truncate ${assignment.status === 'completed' ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                        {assignment.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="bg-slate-900 text-slate-400 font-normal hover:bg-slate-800 text-xs">
                          {assignment.subject}
                        </Badge>
                        <Badge variant="outline" className={`font-normal text-xs ${getStatusColor(assignment.status)}`}>
                          {assignment.status.replace("-", " ")}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pl-8 sm:pl-0">
                    <div className="flex flex-col sm:items-end">
                      <span className="text-xs text-slate-500">Due Date</span>
                      <span className={`text-sm ${getUrgencyColor(assignment.dueDate, assignment.status)}`}>
                        {format(assignment.dueDate, "MMM d, yyyy")}
                      </span>
                    </div>
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-200 -mr-2">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Calendar Column */}
        <div className="space-y-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="pb-4">
              <CardTitle className="text-slate-100 text-lg flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-400" />
                Deadlines Ahead
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Mock minimalist calendar UI */}
              <div className="bg-slate-950 rounded-lg p-4 border border-slate-800">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium text-slate-200">{format(today, "MMMM yyyy")}</span>
                  <div className="flex gap-1">
                    <Button variant="ghost" className="h-6 w-6 p-0 text-slate-400">{"<"}</Button>
                    <Button variant="ghost" className="h-6 w-6 p-0 text-slate-400">{">"}</Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-7 gap-1 text-center text-xs text-slate-500 mb-2">
                  <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
                </div>
                
                <div className="grid grid-cols-7 gap-1 text-center text-sm">
                  {/* Just some mock days to represent a calendar */}
                  {[...Array(35)].map((_, i) => {
                    const day = i - 3; // Offset to start month
                    const isToday = day === today.getDate();
                    const hasDeadline = mockAssignments.some(a => a.dueDate.getDate() === day);
                    const isOverdue = hasDeadline && day < today.getDate() && day > 0;
                    
                    if (day <= 0 || day > 30) {
                      return <div key={i} className="h-8 w-8 flex items-center justify-center text-slate-700">{day > 30 ? day - 30 : 31 + day}</div>
                    }
                    
                    return (
                      <div 
                        key={i} 
                        className={`
                          h-8 w-8 mx-auto flex flex-col items-center justify-center rounded-full relative cursor-pointer
                          ${isToday ? 'bg-indigo-600 text-white font-medium' : 'text-slate-300 hover:bg-slate-800'}
                        `}
                      >
                        {day}
                        {hasDeadline && !isToday && (
                          <span className={`absolute bottom-1 w-1 h-1 rounded-full ${isOverdue ? 'bg-rose-500' : 'bg-amber-500'}`} />
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800">
                <h4 className="text-sm font-medium text-slate-300 mb-3">Next 7 Days</h4>
                <div className="space-y-3">
                  {mockAssignments.filter(a => a.status !== "completed" && (a.dueDate.getTime() - today.getTime()) / (1000 * 3600 * 24) <= 7).map(a => (
                    <div key={a.id} className="flex items-start gap-3">
                      <div className={`w-1 shrink-0 rounded-full py-2 ${getUrgencyColor(a.dueDate, a.status).includes('rose') ? 'bg-rose-500' : 'bg-amber-500'}`} />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-200 truncate">{a.title}</p>
                        <p className="text-xs text-slate-500">{format(a.dueDate, "EEEE")}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
