"use client"

import * as React from "react"
import Link from "next/link"
import { UploadCloud, FolderClosed, FileText, Download, Eye, MoreVertical, Plus, Share2, Search, Filter } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const mockFolders = [
  { id: 1, name: "Mathematics", count: 12 },
  { id: 2, name: "Computer Science", count: 8 },
  { id: 3, name: "Physics", count: 5 },
  { id: 4, name: "Literature", count: 15 },
]

const mockFiles = [
  { id: 101, name: "Calculus_Chapter4_Notes.pdf", folder: "Mathematics", size: "2.4 MB", date: "Oct 24, 2023" },
  { id: 102, name: "Data_Structures_Cheat_Sheet.pdf", folder: "Computer Science", size: "850 KB", date: "Oct 22, 2023" },
  { id: 103, name: "Thermodynamics_Formulas.pdf", folder: "Physics", size: "1.2 MB", date: "Oct 20, 2023" },
  { id: 104, name: "Shakespeare_Analysis.pdf", folder: "Literature", size: "4.5 MB", date: "Oct 18, 2023" },
  { id: 105, name: "Linear_Algebra_Practice_Set.pdf", folder: "Mathematics", size: "3.1 MB", date: "Oct 15, 2023" },
  { id: 106, name: "React_Hooks_Guide.pdf", folder: "Computer Science", size: "1.8 MB", date: "Oct 10, 2023" },
]

export default function ResourcesPage() {
  const [selectedFolder, setSelectedFolder] = React.useState<string | null>(null)

  const filteredFiles = selectedFolder 
    ? mockFiles.filter(f => f.folder === selectedFolder)
    : mockFiles

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-100">Resource Library</h1>
          <p className="text-slate-400 mt-1">Manage and study from your uploaded PDFs.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800">
            <FolderClosed className="w-4 h-4 mr-2" />
            New Folder
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <UploadCloud className="w-4 h-4 mr-2" />
            Upload PDF
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {/* Sidebar / Folders */}
        <Card className="bg-slate-900 border-slate-800 md:col-span-1 h-fit">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium text-slate-200">Collections</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <Button 
              variant="ghost" 
              className={`w-full justify-between h-9 px-2 ${!selectedFolder ? 'bg-indigo-500/10 text-indigo-400' : 'text-slate-400 hover:text-slate-200'}`}
              onClick={() => setSelectedFolder(null)}
            >
              <div className="flex items-center font-normal">
                <FolderClosed className="w-4 h-4 mr-2" />
                All Files
              </div>
              <span className="text-xs">{mockFiles.length}</span>
            </Button>
            
            {mockFolders.map((folder) => (
              <Button 
                key={folder.id}
                variant="ghost" 
                className={`w-full justify-between h-9 px-2 ${selectedFolder === folder.name ? 'bg-indigo-500/10 text-indigo-400' : 'text-slate-400 hover:text-slate-200'}`}
                onClick={() => setSelectedFolder(folder.name)}
              >
                <div className="flex items-center font-normal truncate pr-2">
                  <FolderClosed className="w-4 h-4 mr-2 shrink-0" />
                  <span className="truncate">{folder.name}</span>
                </div>
                <span className="text-xs shrink-0">{folder.count}</span>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Main Content Area */}
        <div className="md:col-span-3 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
              <Input
                type="search"
                placeholder="Search PDFs..."
                className="pl-9 bg-slate-900 border-slate-800 text-slate-200"
              />
            </div>
            <Button variant="outline" className="border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800">
              <Filter className="w-4 h-4 mr-2" />
              Sort
            </Button>
          </div>

          <Card className="bg-slate-900 border-slate-800">
            <CardContent className="p-0">
              <div className="divide-y divide-slate-800">
                {filteredFiles.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-4 hover:bg-slate-800/50 transition-colors">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-rose-500/10 flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5 text-rose-500" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-200 truncate">{file.name}</p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                          <Badge variant="secondary" className="bg-slate-800 text-slate-400 hover:bg-slate-800 font-normal">
                            {file.folder}
                          </Badge>
                          <span>{file.size}</span>
                          <span className="hidden sm:inline">•</span>
                          <span className="hidden sm:inline">{file.date}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 shrink-0 ml-4">
                      {/* Navigate to a generic PDF viewer route */}
                      <Button variant="ghost" size="icon" asChild className="text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 hidden sm:flex">
                        <Link href={`/resources/view/${file.id}`}>
                          <Eye className="w-4 h-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-200 hidden sm:flex">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-200">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                {filteredFiles.length === 0 && (
                  <div className="p-12 pl-12 text-center text-slate-500">
                    <FolderClosed className="w-12 h-12 mx-auto mb-4 text-slate-700" />
                    <p className="mb-1 text-slate-300">No files found</p>
                    <p className="text-sm">Upload a PDF to get started</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
