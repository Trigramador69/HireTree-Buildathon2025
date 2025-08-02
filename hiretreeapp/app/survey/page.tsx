"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, User, Mic } from "lucide-react"
import { useRouter } from "next/navigation"
import { AnimatedAvatar } from "@/components/animated-avatar"
import { HireTreeLogo } from "@/components/hire-tree-logo"

interface Message {
  id: string
  text: string
  sender: "interviewer" | "user"
  timestamp: Date
  typing?: boolean
}

const naturalQuestions = [
  {
    id: 1,
    skill: "Comunicación",
    question:
      "Hola, soy el Dr. Morgan. Empecemos con algo sencillo. Cuéntame sobre una vez que tuviste que explicar algo técnico a alguien que no tenía conocimiento del tema. ¿Cómo lo hiciste?",
    followUp: "Interesante. ¿Y qué hiciste cuando notaste que la persona seguía confundida a pesar de tu explicación?",
  },
  {
    id: 2,
    skill: "Liderazgo",
    question:
      "Ahora hablemos de liderazgo. Describe una situación donde tuviste que motivar a un equipo que estaba desmotivado. ¿Cuál fue tu estrategia?",
    followUp:
      "Me parece bien. ¿Hubo algún miembro del equipo que fue particularmente difícil de motivar? ¿Cómo lo manejaste?",
  },
  {
    id: 3,
    skill: "Trabajo en Equipo",
    question:
      "Cuéntame sobre un proyecto donde trabajaste con personas con las que no te llevabas muy bien. ¿Cómo lograste que funcionara?",
    followUp: "Entiendo. ¿Hubo algún momento donde sentiste que ibas a explotar? ¿Cómo controlaste esa situación?",
  },
  {
    id: 4,
    skill: "Resolución de Problemas",
    question:
      "Háblame de un problema complejo que enfrentaste recientemente. Uno que te hizo pensar 'esto no tiene solución'. ¿Cómo lo abordaste?",
    followUp: "Buen enfoque. ¿Qué hiciste cuando tu primera solución no funcionó como esperabas?",
  },
  {
    id: 5,
    skill: "Adaptabilidad",
    question: "Describe una vez donde todo cambió de un día para otro en tu trabajo o proyecto. ¿Cómo te adaptaste?",
    followUp: "Ya veo. ¿Qué fue lo más difícil de ese cambio para ti personalmente?",
  },
  {
    id: 6,
    skill: "Creatividad",
    question:
      "Para terminar, cuéntame sobre una idea que tuviste que otros pensaron que era loca, pero que al final funcionó. ¿Cómo la defendiste?",
    followUp: "Excelente. ¿Cómo reaccionaste cuando inicialmente rechazaron tu idea?",
  },
]

export default function NaturalInterview() {
  const [messages, setMessages] = useState<Message[]>([])
  const [currentInput, setCurrentInput] = useState("")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [awaitingFollowUp, setAwaitingFollowUp] = useState(false)
  const [userData, setUserData] = useState<any>(null)
  const [answers, setAnswers] = useState<Record<string, string[]>>({})
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const hasStartedRef = useRef(false)
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem("userData")
    if (stored && !hasStartedRef.current) {
      setUserData(JSON.parse(stored))
      hasStartedRef.current = true
      setTimeout(() => {
        addInterviewerMessage(naturalQuestions[0].question)
      }, 1500)
    } else if (!stored) {
      router.push("/")
      return
    }
  }, [router])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const addInterviewerMessage = (text: string, delay = 2000) => {
    setIsTyping(true)

    setTimeout(() => {
      const newMessage: Message = {
        id: `interviewer-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        text,
        sender: "interviewer",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, newMessage])
      setIsTyping(false)
    }, delay)
  }

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      text,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, newMessage])
  }

  const handleSendMessage = () => {
    if (!currentInput.trim()) return

    const currentQuestion = naturalQuestions[currentQuestionIndex]

    // Add user message
    addUserMessage(currentInput)

    // Store answer
    const skillKey = currentQuestion.skill
    if (!answers[skillKey]) {
      answers[skillKey] = []
    }
    answers[skillKey].push(currentInput)

    setCurrentInput("")

    // Determine next action
    if (!awaitingFollowUp) {
      // Send follow-up question
      setAwaitingFollowUp(true)
      addInterviewerMessage(currentQuestion.followUp)
    } else {
      // Move to next question or finish
      if (currentQuestionIndex < naturalQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setAwaitingFollowUp(false)

        // Add transition message
        const transitionMessages = [
          "Perfecto, gracias. Sigamos con otro tema.",
          "Muy bien. Cambiemos de tema.",
          "Entiendo. Ahora hablemos de otra cosa.",
          "Claro. Pasemos al siguiente punto.",
        ]

        const randomTransition = transitionMessages[Math.floor(Math.random() * transitionMessages.length)]

        setTimeout(() => {
          addInterviewerMessage(randomTransition, 1200)
          setTimeout(() => {
            addInterviewerMessage(naturalQuestions[currentQuestionIndex + 1].question, 1800)
          }, 1500)
        }, 800)
      } else {
        // Finish interview
        localStorage.setItem("naturalAnswers", JSON.stringify(answers))
        addInterviewerMessage(
          "Excelente. Hemos terminado la entrevista. Ahora voy a analizar todo lo que me contaste para crear tu perfil profesional. Esto tomará unos minutos.",
          1800,
        )

        setTimeout(() => {
          router.push("/analysis")
        }, 3500)
      }
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!userData) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse delay-1000"></div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <HireTreeLogo size="md" />
            <h1 className="text-2xl font-bold text-gray-800">Hire Tree</h1>
          </div>
          <p className="text-gray-600">Entrevista con Dr. Morgan - Especialista en Assessment</p>
          <div className="mt-4 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 inline-block">
            <span className="text-sm text-teal-600 font-medium">
              Tema {currentQuestionIndex + 1} de {naturalQuestions.length}
            </span>
          </div>
        </div>

        {/* Chat Container */}
        <Card className="backdrop-blur-sm bg-white/90 border-0 shadow-2xl rounded-3xl overflow-hidden">
          <CardContent className="p-0">
            {/* Messages Area */}
            <div className="h-[600px] overflow-y-auto p-6 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={`${message.id}-${index}`}
                  className={`flex items-end gap-3 transition-all duration-500 ease-out ${
                    message.sender === "user" ? "flex-row-reverse" : ""
                  }`}
                  style={{
                    opacity: 0,
                    transform: "translateY(20px)",
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`,
                  }}
                >
                  {message.sender === "interviewer" && <AnimatedAvatar isTyping={false} size="md" />}

                  {message.sender === "user" && (
                    <Avatar className="w-10 h-10 border-2 border-emerald-200 transition-all duration-300 hover:scale-110">
                      <AvatarFallback className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
                        <User className="w-5 h-5" />
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div
                    className={`max-w-[75%] px-4 py-3 shadow-sm transition-all duration-300 hover:shadow-md transform hover:scale-[1.02] ${
                      message.sender === "interviewer"
                        ? "bg-white border border-teal-100 text-gray-800 rounded-2xl rounded-bl-md"
                        : "bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-2xl rounded-br-md"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <span
                      className={`text-xs mt-2 block transition-opacity duration-300 ${
                        message.sender === "interviewer" ? "text-gray-400" : "text-white/60"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-end gap-3 animate-fade-in">
                  <AnimatedAvatar isTyping={true} size="md" />

                  <div className="bg-white border border-teal-100 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-100 p-4 bg-gradient-to-r from-gray-50/50 to-teal-50/30">
              <div className="flex gap-3 items-end">
                <div className="flex-1 relative">
                  <textarea
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Escribe tu respuesta aquí..."
                    className="w-full p-3 pr-12 border border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent bg-white shadow-sm transition-all duration-300 hover:shadow-md"
                    rows={2}
                    disabled={isTyping}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-2 text-gray-400 hover:text-teal-500 transition-colors duration-200"
                  >
                    <Mic className="w-4 h-4" />
                  </Button>
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={!currentInput.trim() || isTyping}
                  className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white p-3 rounded-2xl transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>

              <div className="mt-2 text-xs text-gray-400 text-center">
                Presiona Enter para enviar • Shift + Enter para nueva línea
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Indicator */}
        <div className="mt-6 text-center">
          <div className="flex justify-center space-x-2 mb-3">
            {naturalQuestions.map((question, index) => (
              <div
                key={`progress-${question.id}-${index}`}
                className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  index <= currentQuestionIndex
                    ? "bg-gradient-to-r from-teal-500 to-cyan-500 shadow-lg scale-110"
                    : "bg-gray-300 scale-100"
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-600 font-medium">
            {currentQuestionIndex === naturalQuestions.length - 1 && awaitingFollowUp
              ? "Finalizando entrevista..."
              : `Hablando sobre: ${naturalQuestions[currentQuestionIndex]?.skill}`}
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
