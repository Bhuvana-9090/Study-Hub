"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => { setMounted(true) }, [])

  if (!mounted) return null

  const isDark = theme === "dark"

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative text-muted-foreground hover:text-foreground transition-colors"
      aria-label="Toggle night mode"
    >
      <Sun
        className={`w-5 h-5 transition-all duration-300 ${isDark ? "scale-0 opacity-0 absolute" : "scale-100 opacity-100"}`}
      />
      <Moon
        className={`w-5 h-5 transition-all duration-300 ${isDark ? "scale-100 opacity-100" : "scale-0 opacity-0 absolute"}`}
      />
    </Button>
  )
}
