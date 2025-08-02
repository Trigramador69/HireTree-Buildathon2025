"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Brain, Sparkles, User, Hash } from "lucide-react"
import { useRouter } from "next/navigation"
import { FloatingParticles } from "@/components/floating-particles"
import { HireTreeLogo } from "@/components/hire-tree-logo"

export default function HomePage() {
  const [formData, setFormData] = useState({
    name: "",
    uniqueId: "",
  })
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.uniqueId) {
      // Store user data in localStorage for demo purposes
      localStorage.setItem("userData", JSON.stringify(formData))
      router.push("/survey")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-100 relative overflow-hidden">
      {/* Background blur elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
      <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-2000"></div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white/20 backdrop-blur-sm rounded-full animate-bounce-subtle">
              <HireTreeLogo size="lg" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4 relative z-20">
            <span className="bg-white/50 backdrop-blur-md px-4 py-2 rounded-lg inline-block">
              <span className="text-gray-800">Hire</span>{" "}
              <span className="text-emerald-600 font-black drop-shadow-[0_2px_2px_rgba(0,0,0,0.2)] animate-pulse">Tree</span>
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.3s" }}>
            Descubre y certifica tus habilidades profesionales a través de IA avanzada. Genera tu NFT digital
            único basado en tu perfil de competencias.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-teal-600" />
                Comenzar Evaluación
              </CardTitle>
              <CardDescription>Ingresa tus datos para iniciar el análisis profesional</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Nombre completo
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Ej: María González"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="backdrop-blur-sm bg-white/50 border-teal-200 focus:border-teal-400"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="uniqueId" className="flex items-center gap-2">
                    <Hash className="w-4 h-4" />
                    Identificador único
                  </Label>
                  <Input
                    id="uniqueId"
                    type="text"
                    placeholder="Ej: MG2024001 o email@ejemplo.com"
                    value={formData.uniqueId}
                    onChange={(e) => setFormData({ ...formData, uniqueId: e.target.value })}
                    className="backdrop-blur-sm bg-white/50 border-teal-200 focus:border-teal-400"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold py-3 rounded-lg shadow-lg transform transition hover:scale-105 animate-bounce-subtle"
                >
                  Iniciar Evaluación
                  <Brain className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 backdrop-blur-sm bg-white/60 rounded-xl card-hover smooth-transition">
            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🧠</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Análisis IA</h3>
            <p className="text-gray-600 text-sm">Evaluación inteligente de tus respuestas</p>
          </div>

          <div className="text-center p-6 backdrop-blur-sm bg-white/60 rounded-xl card-hover smooth-transition">
            <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Soft Skills</h3>
            <p className="text-gray-600 text-sm">Medición precisa de competencias</p>
          </div>

          <div className="text-center p-6 backdrop-blur-sm bg-white/60 rounded-xl card-hover smooth-transition">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🏆</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Certificado Digital</h3>
            <p className="text-gray-600 text-sm">Credencial única y verificable</p>
          </div>
        </div>
      </div>
      <FloatingParticles />
    </div>
  )
}
