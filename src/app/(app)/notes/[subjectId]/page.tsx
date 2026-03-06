"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ArrowLeft, ExternalLink, FileText, Download, Bookmark, Clock } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const subjectsData = {
  // Semester 3
  "dmgt": {
    name: "Discrete Mathematics & Graph Theory",
    code: "23BS1305",
    semester: 3,
    materials: [
      { name: "Unit 1: Mathematical Logic", type: "Notes", size: "2.4 MB" },
      { name: "Unit 2: Set Theory & Relations", type: "Notes", size: "1.8 MB" },
      { name: "Unit 3: Group Theory", type: "Notes", size: "3.1 MB" },
      { name: "Unit 4: Graph Theory", type: "Notes", size: "4.5 MB" },
      { name: "Previous Question Papers (2023)", type: "PQ", size: "0.8 MB" }
    ]
  },
  "adsaa": {
    name: "Advanced Data Structures and Algorithm Analysis",
    code: "23CS3301",
    semester: 3,
    materials: [
      { name: "Unit 1: Introduction to Data Structures", type: "Notes", size: "2.1 MB" },
      { name: "Unit 2: Advanced Trees & Graphs", type: "Notes", size: "3.5 MB" },
      { name: "Unit 3: Sorting & Searching Algorithms", type: "Notes", size: "2.8 MB" },
      { name: "Unit 4: Dynamic Programming", type: "Notes", size: "4.2 MB" },
      { name: "Lab Manual: ADS Lab", type: "Lab", size: "1.5 MB" }
    ]
  },
  "os": {
    name: "Operating Systems",
    code: "23CS3303",
    semester: 3,
    materials: [
      { name: "Unit 1: OS Overview & Process Mgmt", type: "Notes", size: "3.2 MB" },
      { name: "Unit 2: CPU Scheduling & Synchronization", type: "Notes", size: "2.9 MB" },
      { name: "Unit 3: Memory Management", type: "Notes", size: "3.8 MB" },
      { name: "Unit 4: File Systems & Storage", type: "Notes", size: "2.5 MB" },
      { name: "Important Interview Questions", type: "Extras", size: "0.5 MB" }
    ]
  },
  // Add more as needed...
  "dbms": {
    name: "Database Management Systems",
    code: "23CS3401",
    semester: 4,
    materials: [
      { name: "Unit 1: ER Model & Normalization", type: "Notes", size: "2.7 MB" },
      { name: "Unit 2: Relational Algebra & SQL", type: "Notes", size: "3.1 MB" },
      { name: "Unit 3: Transaction Management", type: "Notes", size: "2.4 MB" },
      { name: "Unit 4: Indexing & Hashing", type: "Notes", size: "2.2 MB" },
      { name: "SQL Practice Queries", type: "Extras", size: "0.3 MB" }
    ]
  }
}

const SERVER_URL = "http://202.53.81.91:8800/"

export default function SubjectNotesPage() {
  const { subjectId } = useParams()
  const subject = subjectsData[subjectId as keyof typeof subjectsData]

  if (!subject) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h1 className="text-2xl font-bold">Subject not found</h1>
        <Button asChild className="mt-4">
          <Link href="/notes">Back to Notes</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Breadcrumb / Back */}
      <Button variant="ghost" asChild className="hover:bg-muted text-muted-foreground hover:text-foreground">
        <Link href="/notes">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
      </Button>

      {/* Hero Header */}
      <div className="bg-gradient-to-br from-primary to-violet-600 rounded-3xl p-8 md:p-12 text-white shadow-xl shadow-primary/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <Badge className="bg-white/20 hover:bg-white/30 text-white border-0 py-1">
              Semester {subject.semester}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{subject.name}</h1>
            <p className="text-white/80 font-mono text-sm uppercase tracking-wider">{subject.code}</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white backdrop-blur-md">
              <Download className="mr-2 h-4 w-4" />
              Download All
            </Button>
            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white backdrop-blur-md">
              <Bookmark className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main materials list */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-foreground">Available Materials</h2>
          {subject.materials.map((file, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ x: 4 }}
            >
              <Card className="bg-card border-border hover:border-primary/50 transition-all group overflow-hidden">
                <div className="flex items-center p-4 gap-4">
                  <div className="p-3 bg-muted rounded-xl group-hover:bg-primary/10 transition-colors">
                    <FileText className="h-6 w-6 text-muted-foreground group-hover:text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">{file.name}</h3>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Badge variant="outline" className="text-[10px] py-0">{file.type}</Badge>
                      </span>
                      <span>{file.size}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Added 2 days ago
                      </span>
                    </div>
                  </div>
                  <Button asChild variant="ghost" className="shrink-0 hover:bg-primary/10 hover:text-primary">
                    <a href={SERVER_URL} target="_blank" rel="noopener noreferrer">
                      Open PDF
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Sidebar info */}
        <div className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg">Quick Navigation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Other Subjects (Sem {subject.semester})</p>
                <div className="space-y-1 mt-2">
                  {Object.entries(subjectsData)
                    .filter(([id, s]) => s.semester === subject.semester && id !== subjectId)
                    .map(([id, s]) => (
                      <Link 
                        key={id} 
                        href={`/notes/${id}`}
                        className="flex items-center justify-between p-2 rounded-lg text-sm hover:bg-muted transition-colors text-foreground"
                      >
                        <span className="truncate">{s.name}</span>
                        <ChevronRight className="h-3 w-3" />
                      </Link>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                <ExternalLink className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-foreground">Need More?</h4>
                <p className="text-sm text-muted-foreground mt-1">Visit the official PVPSIT notes server for more resources.</p>
              </div>
              <Button asChild variant="outline" className="w-full border-primary/30 text-primary hover:bg-primary hover:text-white">
                <a href={SERVER_URL} target="_blank" rel="noopener noreferrer">Visit Notes Server</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function ChevronRight(props: any) {
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
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}
