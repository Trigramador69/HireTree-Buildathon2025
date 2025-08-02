"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Brain, BarChart3, TrendingUp, Award } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ProfessionalAnalysisPage() {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [userData, setUserData] = useState<any>(null)
  const [analysisInsights, setAnalysisInsights] = useState<string[]>([])
  const router = useRouter()

  const steps = [
    "Procesando respuestas del assessment profesional...",
    "Aplicando algoritmos de análisis de competencias...",
    "Calculando percentiles y benchmarking industrial...",
    "Generando métricas estadísticas avanzadas...",
    "Creando perfil pentagonal de habilidades...",
    "Compilando certificado digital verificable...",
  ]

  const insights = [
    "Analizando profundidad y estructura de las respuestas proporcionadas",
    "Comparando metodologías descritas con mejores prácticas industriales",
    "Evaluando capacidad de análisis situacional y toma de decisiones",
    "Midiendo nivel de detalle y consideración de variables complejas",
    "Calculando índices de adaptabilidad y flexibilidad estratégica",
    "Generando métricas comparativas con base de datos profesional",
  ]

  useEffect(() => {
    const stored = localStorage.getItem("userData")
    if (stored) {
      setUserData(JSON.parse(stored))
    } else {
      router.push("/")
      return
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => router.push("/results"), 2000)
          return 100
        }
        return prev + 1.2
      })
    }, 150)

    return () => clearInterval(interval)
  }, [router])

  useEffect(() => {
    const stepIndex = Math.floor(progress / 16.67)
    setCurrentStep(Math.min(stepIndex, steps.length - 1))

    // Add insights progressively
    if (stepIndex < insights.length && !analysisInsights.includes(insights[stepIndex])) {
      setAnalysisInsights((prev) => [...prev, insights[stepIndex]])
    }
  }, [progress])

  if (!userData) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-cyan-900 to-emerald-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000"></div>

      <div className="relative z-10 container mx-auto px-4 py-16 flex items-center justify-center min-h-screen">
        <div className="max-w-2xl mx-auto text-center">
          {/* Professional Analysis Animation */}
          <div className="mb-8 relative">
            <div className="w-32 h-32 mx-auto relative">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full animate-spin opacity-20"></div>
              <div
                className="absolute inset-2 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full animate-spin opacity-30"
                style={{ animationDirection: "reverse" }}
              ></div>
              <div className="absolute inset-4 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Brain className="w-12 h-12 text-white animate-pulse" />
              </div>
            </div>
            <div className="absolute -top-2 -right-2">
              <BarChart3 className="w-6 h-6 text-teal-400 animate-bounce" />
            </div>
            <div className="absolute -bottom-2 -left-2">
              <TrendingUp className="w-6 h-6 text-cyan-400 animate-bounce delay-500" />
            </div>
          </div>

          <Card className="backdrop-blur-sm bg-white/10 border-white/20 text-white">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Procesando Evaluación Profesional</CardTitle>
              <CardDescription className="text-white/80">
                Dr. Morgan está analizando sus respuestas utilizando algoritmos avanzados de assessment profesional
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progreso del Análisis Estadístico</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-3" />
              </div>

              <div className="text-left space-y-3">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                      index <= currentStep ? "bg-white/20 text-white" : "bg-white/5 text-white/50"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        index < currentStep
                          ? "bg-teal-400"
                          : index === currentStep
                            ? "bg-cyan-400 animate-pulse"
                            : "bg-white/30"
                      }`}
                    />
                    <span className="text-sm font-medium">{step}</span>
                  </div>
                ))}
              </div>

              {/* Professional Insights */}
              {analysisInsights.length > 0 && (
                <div className="bg-white/10 rounded-lg p-4 space-y-2">
                  <h4 className="text-sm font-semibold text-teal-300 flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    Análisis Profesional en Tiempo Real
                  </h4>
                  {analysisInsights.map((insight, index) => (
                    <div
                      key={index}
                      className="text-xs text-white/80 animate-fade-in flex items-center gap-2"
                      style={{ animationDelay: `${index * 0.5}s` }}
                    >
                      <div className="w-1 h-1 bg-cyan-400 rounded-full"></div>
                      {insight}
                    </div>
                  ))}
                </div>
              )}

              {progress === 100 && (
                <div className="text-center py-4">
                  <div className="inline-flex items-center gap-2 text-teal-400 font-semibold">
                    <Award className="w-5 h-5" />
                    Análisis profesional completado
                  </div>
                  <p className="text-white/80 text-sm mt-2">
                    Generando reporte estadístico completo con benchmarking industrial
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Professional Metrics Preview */}
          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold text-teal-300">6</div>
              <div className="text-xs text-white/70">Competencias Evaluadas</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold text-cyan-300">12</div>
              <div className="text-xs text-white/70">Escenarios Analizados</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold text-emerald-300">P{Math.floor(Math.random() * 15) + 85}</div>
              <div className="text-xs text-white/70">Percentil Estimado</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
