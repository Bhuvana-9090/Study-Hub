"use client"

import * as React from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, ZoomIn, ZoomOut, Download, Share2, MessageSquare, Maximize } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

export default function PDFViewerPage() {
  const params = useParams()
  const fileId = params.fileId as string
  
  // Static mock file info
  const fileName = "Calculus_Chapter4_Notes.pdf"
  const folder = "Mathematics"

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col pt-2 pb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild className="text-slate-400 hover:text-white">
            <Link href="/resources">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-xl font-bold text-slate-100 flex items-center gap-3">
              {fileName}
              <Badge variant="secondary" className="bg-indigo-900/40 text-indigo-300 font-normal hover:bg-indigo-900/60 flex-none hidden sm:inline-flex">
                {folder}
              </Badge>
            </h1>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 hidden md:flex">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      <Card className="flex-1 bg-slate-900 border-slate-800 overflow-hidden flex flex-col relative">
        <div className="h-12 border-b border-slate-800 flex items-center justify-between px-4 bg-slate-950/50 relative z-10">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-200">
              <ZoomOut className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium text-slate-300 w-12 text-center">100%</span>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-200">
              <ZoomIn className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-slate-400 font-medium">
            <Button variant="ghost" className="h-8 px-2 text-slate-400">Previous</Button>
            <span>Page 1 of 15</span>
            <Button variant="ghost" className="h-8 px-2 text-slate-400">Next</Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-200">
              <MessageSquare className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-200">
              <Maximize className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {/* PDF Viewer Mock Area */}
        <div className="flex-1 bg-[#1A1E2B] overflow-auto flex items-start justify-center p-6 relative">
          <div className="bg-white w-[800px] aspect-[1/1.414] shadow-2xl relative">
            <div className="absolute inset-0 p-12 text-slate-800">
              <h1 className="text-4xl font-bold mb-8 font-serif border-b-2 pb-4">Chapter 4: Applications of Derivatives</h1>
              <h2 className="text-2xl font-semibold mb-4 text-indigo-900">4.1 Maximum and Minimum Values</h2>
              <p className="mb-6 leading-relaxed font-serif text-lg text-slate-700">
                In this chapter, we explore how derivatives are used to find the extreme values of functions. 
                These extreme values, also known as absolute maxima and minima, play a crucial role in optimization problems.
              </p>
              
              <div className="bg-slate-50 border p-6 my-8 rounded italic font-serif text-lg">
                <strong className="text-indigo-900">Fermat's Theorem:</strong> If f has a local maximum or minimum at c, and if f'(c) exists, then f'(c) = 0.
              </div>

              <p className="mb-6 leading-relaxed font-serif text-lg text-slate-700">
                Determining where a function reaches its highest and lowest points has practical applications in economics, 
                engineering, and physical sciences. For example, minimizing the cost of materials while maximizing volume.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
