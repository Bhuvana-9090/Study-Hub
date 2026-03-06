"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { User, Mail, School, Shield, Save, Camera, LogOut, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function ProfilePage() {
  const { user, register, logout, isAuthenticated } = useAuth()
  const router = useRouter()
  
  const [isEditing, setIsEditing] = React.useState(false)
  const [formData, setFormData] = React.useState({
    name: user?.name || "",
    email: user?.email || "",
    college: user?.college || "",
  })

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) return null

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulated update - we reuse register logic to update the local state
    register(formData.name, formData.email, "dummy_pass", formData.college)
    setIsEditing(false)
    toast.success("Profile updated successfully!")
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Profile Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account information and preferences.</p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => {
            logout()
            router.push("/login")
          }}
          className="text-rose-500 hover:text-rose-600 border-rose-200 hover:bg-rose-50"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Profile Sidebar */}
        <div className="md:col-span-1 space-y-6">
          <Card className="bg-card border-border overflow-hidden">
            <CardContent className="pt-8 pb-6 text-center">
              <div className="relative inline-block">
                <Avatar className="h-24 w-24 border-4 border-background shadow-xl mx-auto ring-2 ring-primary/20">
                  <AvatarImage src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`} />
                  <AvatarFallback className="text-2xl bg-primary/10 text-primary uppercase font-bold">{user?.name?.slice(0, 2)}</AvatarFallback>
                </Avatar>
                
                <div className="absolute -bottom-2 -right-2 flex gap-1">
                  <button className="p-2 bg-primary text-white rounded-full shadow-lg hover:scale-110 transition-transform active:scale-95 group">
                    <Camera className="h-4 w-4" />
                    <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Change Photo</span>
                  </button>
                  <button 
                    onClick={() => {
                      if (formData.name) {
                        register(formData.name, formData.email, "dummy", formData.college, "null") 
                        toast.success("Profile photo removed")
                      }
                    }}
                    className="p-2 bg-rose-500 text-white rounded-full shadow-lg hover:scale-110 transition-transform active:scale-95 group relative"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Remove Photo</span>
                  </button>
                </div>
              </div>
              <h2 className="text-xl font-bold text-foreground mt-6">{user?.name}</h2>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
              
              <div className="mt-8 pt-6 border-t border-border flex flex-col gap-2">
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)} className="w-full bg-primary text-primary-foreground">
                    Edit Profile Details
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button onClick={handleSave} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white">
                      Confirm Changes
                    </Button>
                    <Button variant="ghost" onClick={() => setIsEditing(false)} className="px-3">
                      X
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-1">
            <Button variant="secondary" className="w-full justify-start font-medium bg-primary/5 text-primary border-0">
              <User className="mr-2 h-4 w-4" /> Account Details
            </Button>
            <Button variant="ghost" className="w-full justify-start text-muted-foreground">
              <Mail className="mr-2 h-4 w-4" /> Email Preferences
            </Button>
            <Button variant="ghost" className="w-full justify-start text-muted-foreground">
              <Shield className="mr-2 h-4 w-4" /> Privacy & Security
            </Button>
          </div>
        </div>

        {/* Main Form */}
        <div className="md:col-span-2">
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
              <div>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details and how others see you.</CardDescription>
              </div>
              {!isEditing && (
                <Button onClick={() => setIsEditing(true)} size="sm" variant="outline">
                  Edit Profile
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        disabled={!isEditing}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="pl-10 bg-muted/50 border-border"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">College / Institution</label>
                    <div className="relative">
                      <School className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        disabled={!isEditing}
                        value={formData.college}
                        onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                        className="pl-10 bg-muted/50 border-border"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      disabled
                      value={formData.email}
                      className="pl-10 bg-muted/30 border-border cursor-not-allowed opacity-70"
                    />
                  </div>
                  <p className="text-[10px] text-muted-foreground italic">Email linked to your university account cannot be changed.</p>
                </div>

                {isEditing && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3 pt-4 border-t border-border"
                  >
                    <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      <Save className="mr-2 h-4 w-4" /> Save Changes
                    </Button>
                    <Button type="button" variant="ghost" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </motion.div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
