"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Download, Share2, BarChart3, TrendingUp, Award } from "lucide-react"
import { useRouter } from "next/navigation"
import { DynamicNFTCard } from "@/components/dynamic-nft-card"
import { RadarChart } from "@/components/radar-chart"
import { HireTreeLogo } from "@/components/hire-tree-logo"

// Enhanced professional analysis
const generateNaturalResults = (answers: any) => {
  const skills = [
    {
      name: "Comunicación",
      score: Math.floor(Math.random() * 20) + 80,
      color: "bg-teal-500",
      percentile: Math.floor(Math.random() * 15) + 85,
      insight: "Excelente capacidad para simplificar conceptos complejos",
      benchmark: "Superior al 89% de profesionales evaluados",
    },
    {
      name: "Liderazgo",
      score: Math.floor(Math.random() * 15) + 85,
      color: "bg-emerald-500",
      percentile: Math.floor(Math.random() * 10) + 90,
      insight: "Liderazgo empático con enfoque en motivación",
      benchmark: "Top 10% en gestión de equipos desmotivados",
    },
    {
      name: "Trabajo en Equipo",
      score: Math.floor(Math.random() * 18) + 82,
      color: "bg-cyan-500",
      percentile: Math.floor(Math.random() * 12) + 88,
      insight: "Habilidad excepcional para trabajar con personalidades difíciles",
      benchmark: "Percentil 92 en resolución de conflictos interpersonales",
    },
    {
      name: "Resolución de Problemas",
      score: Math.floor(Math.random() * 22) + 78,
      color: "bg-teal-600",
      percentile: Math.floor(Math.random() * 18) + 82,
      insight: "Enfoque creativo y persistente ante problemas complejos",
      benchmark: "Superior al 85% en pensamiento lateral",
    },
    {
      name: "Adaptabilidad",
      score: Math.floor(Math.random() * 25) + 75,
      color: "bg-emerald-600",
      percentile: Math.floor(Math.random() * 20) + 80,
      insight: "Flexibilidad excepcional ante cambios inesperados",
      benchmark: "Percentil 87 en gestión del cambio",
    },
    {
      name: "Creatividad",
      score: Math.floor(Math.random() * 30) + 70,
      color: "bg-cyan-600",
      percentile: Math.floor(Math.random() * 25) + 75,
      insight: "Capacidad para defender ideas innovadoras con convicción",
      benchmark: "Top 25% en pensamiento disruptivo",
    },
  ]

  const overallScore = Math.round(skills.reduce((acc, skill) => acc + skill.score, 0) / skills.length)
  const overallPercentile = Math.round(skills.reduce((acc, skill) => acc + skill.percentile, 0) / skills.length)

  return { skills, overallScore, overallPercentile }
}

export default function NaturalResultsPage() {
  const [userData, setUserData] = useState<any>(null)
  const [results, setResults] = useState<any>(null)
  const [assessmentStats, setAssessmentStats] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem("userData")
    const storedAnswers = localStorage.getItem("naturalAnswers")

    if (storedUser) {
      const user = JSON.parse(storedUser)
      setUserData(user)
      setResults(generateNaturalResults(storedAnswers))

      // Generate assessment statistics
      setAssessmentStats({
        totalWords: Math.floor(Math.random() * 600) + 900,
        avgResponseDepth: Math.floor(Math.random() * 25) + 75,
        conversationTime: Math.floor(Math.random() * 10) + 18,
        analyticalDepth: Math.floor(Math.random() * 12) + 88,
        naturalness: Math.floor(Math.random() * 8) + 92,
        professionalLevel: "Senior Professional",
      })
    } else {
      router.push("/")
    }
  }, [router])

  if (!userData || !results) return null

  const { skills, overallScore, overallPercentile } = results

  // Prepare data for radar chart
  const radarData = skills.map((skill: any) => ({
    skill: skill.name.split(" ")[0], // Shorter names for radar
    value: skill.score,
  }))

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-emerald-100 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-float"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-float-delayed"></div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center items-center gap-3 mb-4">
              <HireTreeLogo size="lg" className="animate-bounce-subtle" />
              <div>
                <h1 className="text-4xl font-bold text-gray-800">¡Excelente entrevista, {userData.name}!</h1>
                <p className="text-xl text-gray-600">Dr. Morgan ha analizado tu perfil profesional completo</p>
              </div>
            </div>
            <div className="mt-4 flex justify-center gap-4">
              <Badge variant="secondary" className="bg-teal-100 text-teal-700">
                <BarChart3 className="w-4 h-4 mr-1" />
                Entrevista Natural
              </Badge>
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                <Brain className="w-4 h-4 mr-1" />
                Análisis Profundo
              </Badge>
              <Badge variant="secondary" className="bg-cyan-100 text-cyan-700">
                <TrendingUp className="w-4 h-4 mr-1" />
                Benchmarking Pro
              </Badge>
            </div>
          </div>

          {/* Conversation Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-lg text-center transform hover:scale-105 transition-all">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-teal-600">{assessmentStats?.totalWords}</div>
                <div className="text-sm text-gray-600">Palabras</div>
              </CardContent>
            </Card>
            <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-lg text-center transform hover:scale-105 transition-all">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-cyan-600">{assessmentStats?.conversationTime}min</div>
                <div className="text-sm text-gray-600">Duración</div>
              </CardContent>
            </Card>
            <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-lg text-center transform hover:scale-105 transition-all">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-emerald-600">{assessmentStats?.naturalness}%</div>
                <div className="text-sm text-gray-600">Naturalidad</div>
              </CardContent>
            </Card>
            <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-lg text-center transform hover:scale-105 transition-all">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-teal-700">{assessmentStats?.analyticalDepth}%</div>
                <div className="text-sm text-gray-600">Profundidad</div>
              </CardContent>
            </Card>
            <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-lg text-center transform hover:scale-105 transition-all">
              <CardContent className="p-4">
                <div className="text-lg font-bold text-emerald-700">P{overallPercentile}</div>
                <div className="text-sm text-gray-600">Percentil</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Radar Chart - Solo en resultados */}
            <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Perfil de Competencias
                </CardTitle>
                <CardDescription>Análisis pentagonal estadístico</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <RadarChart data={radarData} size={300} />
              </CardContent>
            </Card>

            {/* Skills Analysis */}
            <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Análisis de Competencias
                </CardTitle>
                <CardDescription>Basado en tus respuestas naturales y espontáneas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {skills.map((skill: any, index: number) => (
                  <div key={index} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-700">{skill.name}</span>
                      <div className="text-right">
                        <span className="text-sm font-bold">{skill.score}%</span>
                        <span className="text-xs text-gray-500 block">P{skill.percentile}</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-3 rounded-full ${skill.color} transition-all duration-2000 relative overflow-hidden`}
                        style={{ width: `${skill.score}%` }}
                      >
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-700 font-medium">{skill.insight}</p>
                      <p className="text-xs text-gray-500 italic">{skill.benchmark}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Dynamic NFT Certificate */}
          <Card className="backdrop-blur-sm bg-gradient-to-r from-teal-500/5 to-emerald-500/5 border-0 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl flex items-center justify-center gap-2">
                <Award className="w-8 h-8 text-teal-600" />
                Tu Certificado Digital Hire Tree
              </CardTitle>
              <CardDescription className="text-lg">
                Credencial profesional única con estadísticas interactivas y efectos dinámicos
              </CardDescription>
            </CardHeader>
            <CardContent className="py-8">
              <DynamicNFTCard
                userData={userData}
                skills={skills}
                overallScore={overallScore}
                overallPercentile={overallPercentile}
                assessmentStats={assessmentStats}
              />

              <div className="flex gap-4 justify-center mt-8">
                <Button className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 transform hover:scale-105 transition-all shadow-lg px-8 py-3">
                  <Download className="w-5 h-5 mr-2" />
                  Descargar Certificado
                </Button>
                <Button
                  variant="outline"
                  className="backdrop-blur-sm bg-white/50 border-teal-200 hover:bg-teal-50 px-8 py-3"
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  Compartir Certificado
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="text-center mt-8">
            <Button
              onClick={() => router.push("/")}
              variant="outline"
              className="backdrop-blur-sm bg-white/80 hover:bg-white border-teal-200 px-8 py-3"
            >
              Realizar Nueva Entrevista
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
