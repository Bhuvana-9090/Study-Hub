"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Book, Search, Filter, GraduationCap, ChevronRight, FileText } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const subjects = [
  // Semester 3
  {
    id: "dmgt",
    name: "Discrete Mathematics & Graph Theory",
    semester: 3,
    code: "23BS1305",
    icon: Book,
    notesCount: 5,
    description: "Foundational mathematics for computer science including logic, sets, and graph theory."
  },
  {
    id: "adsaa",
    name: "Advanced Data Structures and Algorithm Analysis",
    semester: 3,
    code: "23CS3301",
    icon: FileText,
    notesCount: 6,
    description: "In-depth study of complex data structures and their efficiency analysis."
  },
  {
    id: "oopj",
    name: "Object Oriented Programming Through Java",
    semester: 3,
    code: "23CS3302",
    icon: GraduationCap,
    notesCount: 5,
    description: "Core concepts of OOP using the Java programming language."
  },
  {
    id: "coa",
    name: "Computer Organization and Architecture",
    semester: 3,
    code: "23ES1304",
    icon: FileText,
    notesCount: 4,
    description: "Understanding the internal structure and operation of a computer system."
  },
  {
    id: "os",
    name: "Operating Systems",
    semester: 3,
    code: "23CS3303",
    icon: FileText,
    notesCount: 6,
    description: "Concepts of process management, memory, and file systems."
  },
  
  // Semester 4
  {
    id: "ps",
    name: "Probability and Statistics",
    semester: 4,
    code: "23BS1402",
    icon: Book,
    notesCount: 4,
    description: "Mathematical approaches to uncertainty and data analysis."
  },
  {
    id: "dbms",
    name: "Database Management Systems",
    semester: 4,
    code: "23CS3401",
    icon: FileText,
    notesCount: 6,
    description: "Design and implementation of relational databases using SQL."
  },
  {
    id: "se",
    name: "Software Engineering",
    semester: 4,
    code: "23CS3402",
    icon: GraduationCap,
    notesCount: 5,
    description: "Methodologies and patterns for large-scale software development."
  },
  {
    id: "daa",
    name: "Design and Analysis of Algorithms",
    semester: 4,
    code: "23CS3403",
    icon: FileText,
    notesCount: 6,
    description: "Advanced techniques for creating and analyzing efficient algorithms."
  },
  {
    id: "cn",
    name: "Computer Networks",
    semester: 4,
    code: "23CS3404",
    icon: FileText,
    notesCount: 5,
    description: "Principles and protocols for data communication across networks."
  }
]

export default function NotesPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [semesterFilter, setSemesterFilter] = React.useState<number | "all">("all")

  const filteredSubjects = subjects.filter(subject => {
    const matchesSearch = subject.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          subject.code.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSemester = semesterFilter === "all" || subject.semester === semesterFilter
    return matchesSearch && matchesSemester
  })

  const sem3Subjects = filteredSubjects.filter(s => s.semester === 3)
  const sem4Subjects = filteredSubjects.filter(s => s.semester === 4)

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center md:text-left"
      >
        <h1 className="text-3xl font-bold text-foreground">PVPSIT Study Resources</h1>
        <p className="text-muted-foreground mt-2">Dedicated notes and materials for CSE 2nd Year Students (PVP-23)</p>
      </motion.div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search notes or subjects..." 
            className="pl-10 bg-card border-border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex p-1 bg-muted rounded-xl gap-1">
          <button 
            onClick={() => setSemesterFilter("all")}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${semesterFilter === "all" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
          >
            All
          </button>
          <button 
            onClick={() => setSemesterFilter(3)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${semesterFilter === 3 ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
          >
            Semester 3
          </button>
          <button 
            onClick={() => setSemesterFilter(4)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${semesterFilter === 4 ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
          >
            Semester 4
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="space-y-12">
        {(semesterFilter === "all" || semesterFilter === 3) && sem3Subjects.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold text-foreground">Semester 3</h2>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sem3Subjects.map((subject, i) => (
                <SubjectCard key={subject.id} subject={subject} index={i} />
              ))}
            </div>
          </div>
        )}

        {(semesterFilter === "all" || semesterFilter === 4) && sem4Subjects.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold text-foreground">Semester 4</h2>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sem4Subjects.map((subject, i) => (
                <SubjectCard key={subject.id} subject={subject} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>

      {filteredSubjects.length === 0 && (
        <div className="text-center py-20">
          <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">No subjects found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  )
}

function SubjectCard({ subject, index }: { subject: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Card className="h-full bg-card border-border hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 overflow-hidden">
        <div className="h-2 w-full bg-primary/20 group-hover:bg-primary transition-colors" />
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="p-2.5 bg-primary/10 rounded-xl">
              <subject.icon className="h-6 w-6 text-primary" />
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Sem {subject.semester}
            </Badge>
          </div>
          <CardTitle className="text-lg mt-4 text-foreground line-clamp-2">{subject.name}</CardTitle>
          <p className="text-xs text-muted-foreground font-mono">{subject.code}</p>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {subject.description}
          </p>
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <FileText className="h-4 w-4 text-primary" />
            <span>{subject.notesCount} PDF Materials Available</span>
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group">
            <Link href={`/notes/${subject.id}`}>
              View Notes
              <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
