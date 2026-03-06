"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Search, 
  MessageSquare, 
  UserPlus, 
  Send, 
  MoreVertical, 
  Phone, 
  Video, 
  Info,
  Check,
  Clock
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"

const mockFriends = [
  { id: 1, name: "Vandana", status: "online", lastMessage: "Did you check the new OS notes?", time: "2m", avatar: "v" },
  { id: 2, name: "Rahul", status: "offline", lastMessage: "Let's study at 9 PM", time: "1h", avatar: "r" },
  { id: 3, name: "Anil", status: "online", lastMessage: "Thanks for the help!", time: "5h", avatar: "a" },
  { id: 4, name: "Sarah M.", status: "away", lastMessage: "See you in the library", time: "1d", avatar: "s" },
]

const initialMessages = [
  { id: 1, sender: "Rahul", text: "Did you complete the OS assignment?", time: "10:30 AM", isMe: false },
  { id: 2, sender: "You", text: "Not yet, starting tonight.", time: "10:32 AM", isMe: true },
  { id: 3, sender: "Rahul", text: "Okay, let me know if you need help with Unit 2.", time: "10:33 AM", isMe: false },
]

export default function FriendsChatPage() {
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()
  const [messages, setMessages] = React.useState(initialMessages)
  const [newMessage, setNewMessage] = React.useState("")
  const [activeChat, setActiveChat] = React.useState(mockFriends[1]) // Rahul by default
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  React.useEffect(scrollToBottom, [messages])

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) return null

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const msg = {
      id: messages.length + 1,
      sender: "You",
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    }
    setMessages([...messages, msg])
    setNewMessage("")

    // Simulate reply
    setTimeout(() => {
      const reply = {
        id: messages.length + 2,
        sender: activeChat.name,
        text: "That sounds great! I'll be waiting.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: false
      }
      setMessages(prev => [...prev, reply])
    }, 2000)
  }

  return (
    <div className="flex h-[calc(100vh-120px)] overflow-hidden bg-background border border-border rounded-2xl shadow-xl">
      {/* Sidebar - Friends List */}
      <div className="w-80 border-r border-border flex flex-col bg-muted/30">
        <div className="p-4 border-b border-border space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground">Friends Chat</h2>
            <Button size="icon" variant="ghost" className="rounded-full">
              <UserPlus className="h-5 w-5" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search friends..." 
              className="pl-9 bg-background border-border"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {mockFriends.map((friend) => (
            <button
              key={friend.id}
              onClick={() => setActiveChat(friend)}
              className={`w-full p-4 flex items-start gap-3 hover:bg-muted/50 transition-colors border-b border-border/50 ${activeChat.id === friend.id ? 'bg-primary/5 border-r-2 border-r-primary' : ''}`}
            >
              <div className="relative">
                <Avatar className="h-12 w-12 border border-border">
                  <AvatarImage src={`https://i.pravatar.cc/150?u=${friend.avatar}`} />
                  <AvatarFallback className="bg-primary/10 text-primary">{friend.avatar.toUpperCase()}</AvatarFallback>
                </Avatar>
                {friend.status === "online" && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-background rounded-full" />
                )}
                {friend.status === "away" && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-amber-500 border-2 border-background rounded-full" />
                )}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-semibold text-foreground truncate">{friend.name}</span>
                  <span className="text-[10px] text-muted-foreground">{friend.time}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate">{friend.lastMessage}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-background">
        {/* Chat Header */}
        <div className="p-4 border-b border-border flex items-center justify-between bg-background/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-3 text-left">
            <Avatar className="h-10 w-10 border border-border">
              <AvatarImage src={`https://i.pravatar.cc/150?u=${activeChat.avatar}`} />
              <AvatarFallback className="bg-primary/10 text-primary">{activeChat.avatar.toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-foreground text-sm uppercase tracking-tight">{activeChat.name}</h3>
              <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                {activeChat.status === 'online' ? (
                  <><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> Active Now</>
                ) : (
                  <><Clock className="h-2 w-2" /> Left {activeChat.time} ago</>
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button size="icon" variant="ghost"><Phone className="h-4 w-4" /></Button>
            <Button size="icon" variant="ghost"><Video className="h-4 w-4" /></Button>
            <Button size="icon" variant="ghost"><Info className="h-4 w-4" /></Button>
            <Button size="icon" variant="ghost"><MoreVertical className="h-4 w-4" /></Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-muted/[0.02]">
          {messages.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2 }}
              className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[70%] ${msg.isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                {!msg.isMe && (
                  <Avatar className="h-8 w-8 mt-auto shrink-0 border border-border">
                    <AvatarImage src={`https://i.pravatar.cc/150?u=${activeChat.avatar}`} />
                    <AvatarFallback>{activeChat.name[0]}</AvatarFallback>
                  </Avatar>
                )}
                <div>
                  <div className={`p-3.5 rounded-2xl text-sm shadow-sm ${
                    msg.isMe 
                      ? 'bg-primary text-primary-foreground rounded-tr-none' 
                      : 'bg-muted/50 border border-border text-foreground rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                  <div className={`flex items-center gap-1 mt-1.5 text-[10px] text-muted-foreground ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                    <span>{msg.time}</span>
                    {msg.isMe && <Check className="h-3 w-3 text-primary" />}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-border bg-background">
          <form 
            onSubmit={handleSendMessage}
            className="flex items-center gap-2 bg-muted/30 p-2 rounded-2xl border border-border focus-within:ring-2 focus-within:ring-primary/20 transition-all"
          >
            <Input 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..." 
              className="flex-1 border-0 bg-transparent focus-visible:ring-0 shadow-none h-10 px-4"
            />
            <Button 
              type="submit" 
              size="icon" 
              className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground h-10 w-10 shrink-0"
              disabled={!newMessage.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
          <div className="flex items-center gap-4 mt-2 px-2 text-[10px] text-muted-foreground">
            <span>Press Enter to send</span>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              <span>Rahul is typing...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
