"use client"

import * as React from "react"

interface User {
  name: string
  email: string
  college?: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, name?: string) => void
  register: (name: string, email: string, password: string, college?: string, avatar?: string) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)

  React.useEffect(() => {
    const savedUser = localStorage.getItem("studyhub_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
      setIsAuthenticated(true)
    }
  }, [])

  const login = (email: string, name: string = "Alex Johnson") => {
    const userData = { email, name }
    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem("studyhub_user", JSON.stringify(userData))
  }

  const register = (name: string, email: string, _password: string, college?: string, avatar?: string) => {
    const userData = { name, email, college, avatar: avatar !== undefined ? avatar : `https://i.pravatar.cc/150?u=${email}` }
    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem("studyhub_user", JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("studyhub_user")
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
