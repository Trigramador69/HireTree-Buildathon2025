"use client"

import { useEffect, useState } from "react"
import { Award, Zap, TrendingUp, Star, BarChart3 } from "lucide-react"

interface DynamicNFTProps {
  userData: any
  skills: any[]
  overallScore: number
  overallPercentile: number
  assessmentStats: any
}

export function DynamicNFTCard({
  userData,
  skills,
  overallScore,
  overallPercentile,
  assessmentStats,
}: DynamicNFTProps) {
  const [animationPhase, setAnimationPhase] = useState(0)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  useEffect(() => {
    // Create floating particles
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }))
    setParticles(newParticles)

    // Animation cycle
    const interval = setInterval(() => {
      setAnimationPhase((prev) => (prev + 1) % 4)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getGradientClass = () => {
    const gradients = [
      "from-teal-400 via-cyan-400 to-emerald-400",
      "from-emerald-400 via-teal-400 to-cyan-400",
      "from-cyan-400 via-emerald-400 to-teal-400",
      "from-teal-500 via-cyan-500 to-emerald-500",
    ]
    return gradients[animationPhase]
  }

  return (
    <div className="relative max-w-sm mx-auto">
      {/* Outer glow effect */}
      <div className="absolute -inset-4 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-3xl blur-lg opacity-30 animate-pulse"></div>

      {/* Main NFT Card */}
      <div
        className={`relative aspect-square bg-gradient-to-br ${getGradientClass()} rounded-3xl p-1 shadow-2xl transform transition-all duration-1000 hover:scale-105`}
      >
        {/* Inner card */}
        <div className="w-full h-full bg-gradient-to-br from-gray-900/90 to-gray-800/90 rounded-3xl p-6 text-white relative overflow-hidden">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-teal-400/20 to-transparent animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-emerald-400/20 to-transparent animate-pulse delay-1000"></div>
          </div>

          {/* Floating particles */}
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute w-1 h-1 bg-teal-400 rounded-full animate-bounce opacity-60"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: "3s",
              }}
            />
          ))}

          {/* Header */}
          <div className="relative z-10 text-center mb-4">
            <div className="flex items-center justify-center mb-2">
              <Award className="w-6 h-6 text-teal-400 animate-pulse" />
            </div>
            <h3 className="text-lg font-bold bg-gradient-to-r from-teal-300 to-emerald-300 bg-clip-text text-transparent">
              {userData.name}
            </h3>
            <p className="text-xs opacity-70">ID: {userData.uniqueId}</p>
            <div className="mt-1 px-3 py-1 bg-teal-500/20 rounded-full inline-block">
              <span className="text-xs font-medium">Hire Tree Certified</span>
            </div>
          </div>

          {/* Central Score with animated ring */}
          <div className="relative flex justify-center mb-4">
            <div className="relative">
              {/* Animated rings */}
              <div className="absolute inset-0 w-20 h-20 border-2 border-teal-400/30 rounded-full animate-spin"></div>
              <div
                className="absolute inset-1 w-18 h-18 border-2 border-emerald-400/30 rounded-full animate-spin"
                style={{ animationDirection: "reverse" }}
              ></div>

              {/* Score display */}
              <div className="relative w-20 h-20 bg-gradient-to-br from-teal-500/20 to-emerald-500/20 rounded-full flex flex-col items-center justify-center backdrop-blur-sm border border-white/10">
                <span className="text-xl font-bold text-teal-300">{overallScore}</span>
                <span className="text-xs opacity-70">SCORE</span>
              </div>
            </div>
          </div>

          {/* Skills with Progress Bars */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-4 h-4 text-teal-400" />
              <span className="text-xs font-medium text-teal-300">Competencias</span>
            </div>
            {skills.slice(0, 5).map((skill: any, index: number) => (
              <div key={index} className="relative">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium">{skill.name.split(" ")[0]}</span>
                  <span className="text-xs text-teal-300 font-bold">{skill.score}%</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full transition-all duration-2000 relative overflow-hidden"
                    style={{ width: `${skill.score}%`, animationDelay: `${index * 0.3}s` }}
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="bg-gradient-to-r from-teal-500/20 to-transparent rounded-lg p-2 border border-teal-400/20">
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-teal-400" />
                <span className="text-xs font-medium">Percentil</span>
              </div>
              <div className="text-lg font-bold text-teal-300">P{overallPercentile}</div>
            </div>

            <div className="bg-gradient-to-l from-emerald-500/20 to-transparent rounded-lg p-2 border border-emerald-400/20">
              <div className="flex items-center gap-1">
                <Zap className="w-3 h-3 text-emerald-400" />
                <span className="text-xs font-medium">Nivel</span>
              </div>
              <div className="text-xs font-bold text-emerald-300">Senior Pro</div>
            </div>
          </div>

          {/* Footer with holographic effect */}
          <div className="relative text-center pt-2 border-t border-white/10">
            <div className="text-xs opacity-70">Certified by Dr. Morgan</div>
            <div className="text-xs opacity-50">Hire Tree Assessment</div>

            {/* Scanning line effect */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-400 to-transparent animate-pulse"></div>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-teal-400/50 rounded-tr-lg"></div>
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-emerald-400/50 rounded-bl-lg"></div>
        </div>
      </div>

      {/* Floating stats */}
      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full p-2 shadow-lg animate-bounce">
        <Star className="w-4 h-4 text-white" />
      </div>

      <div className="absolute -bottom-2 -left-2 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full px-3 py-1 shadow-lg">
        <span className="text-xs font-bold text-white">{assessmentStats?.analyticalDepth}%</span>
      </div>
    </div>
  )
}
