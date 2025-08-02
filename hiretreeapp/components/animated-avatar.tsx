"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bot } from "lucide-react"

interface AnimatedAvatarProps {
  isTyping: boolean
  size?: "sm" | "md" | "lg"
}

export function AnimatedAvatar({ isTyping, size = "md" }: AnimatedAvatarProps) {
  const [mouthAnimation, setMouthAnimation] = useState(0)

  useEffect(() => {
    if (isTyping) {
      const interval = setInterval(() => {
        setMouthAnimation((prev) => (prev + 1) % 4)
      }, 200)
      return () => clearInterval(interval)
    } else {
      setMouthAnimation(0)
    }
  }, [isTyping])

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  }

  const getMouthShape = () => {
    if (!isTyping) return "●"
    const shapes = ["○", "◐", "◑", "●"]
    return shapes[mouthAnimation]
  }

  return (
    <div className="relative">
      <Avatar className={`${sizeClasses[size]} border-2 border-teal-200 transition-all duration-200`}>
        <AvatarImage src="/placeholder.svg?height=40&width=40" />
        <AvatarFallback className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white relative overflow-hidden">
          <Bot className="w-5 h-5" />
          {isTyping && (
            <div className="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-cyan-400/20 animate-pulse" />
          )}
        </AvatarFallback>
      </Avatar>

      {/* Speaking indicator */}
      {isTyping && (
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full border-2 border-teal-500 flex items-center justify-center">
          <span className="text-xs text-teal-600 animate-pulse">{getMouthShape()}</span>
        </div>
      )}

      {/* Sound waves animation */}
      {isTyping && (
        <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 flex space-x-1">
          <div className="w-1 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-1 h-3 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-1 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      )}
    </div>
  )
}
