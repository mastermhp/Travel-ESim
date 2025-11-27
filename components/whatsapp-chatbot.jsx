"use client"

import { useState, useEffect } from "react"
import { MessageCircle, X, Send, Phone, Mail, Sparkles, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function WhatsAppChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [showInitialOptions, setShowInitialOptions] = useState(true)
  const [isVisible, setIsVisible] = useState(false)

  const whatsappNumber = "+4670271587"
  const supportEmail = "support@esimconnect.com"

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 500)
  }, [])

  const quickReplies = [
    {
      id: 1,
      text: "How do I activate my eSIM?",
      message: "Hello! I need help activating my eSIM. Can you guide me through the process?",
      icon: "📱",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      text: "Check my order status",
      message: "Hi! I would like to check the status of my order. Can you help me?",
      icon: "📦",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: 3,
      text: "Data not working",
      message: "Hello! My eSIM data is not working. I need technical support.",
      icon: "🔧",
      gradient: "from-orange-500 to-red-500",
    },
    {
      id: 4,
      text: "Pricing & Plans",
      message: "Hi! I have questions about your pricing and available plans.",
      icon: "💰",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      id: 5,
      text: "Become an Agent",
      message: "Hello! I'm interested in becoming an agent. Can you provide more information?",
      icon: "🤝",
      gradient: "from-indigo-500 to-blue-500",
    },
    {
      id: 6,
      text: "Talk to Support",
      message: "Hi! I need to speak with a support representative.",
      icon: "💬",
      gradient: "from-teal-500 to-cyan-500",
    },
  ]

  const sendWhatsAppMessage = (message) => {
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${whatsappNumber.replace(/\+/g, "")}?text=${encodedMessage}`, "_blank")
  }

  return (
    <>
      {!isOpen && isVisible && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-8 duration-500">
          {/* Pulsing background circles */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 rounded-full bg-[#25D366] opacity-20 animate-ping" />
            <div className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-pulse" />
          </div>

          <Button
            onClick={() => setIsOpen(true)}
            className="relative h-16 w-16 rounded-full shadow-2xl bg-gradient-to-br from-[#25D366] to-[#20BA5A] hover:from-[#20BA5A] hover:to-[#1DA851] transition-all duration-300 hover:scale-110 group border-4 border-white"
            size="icon"
          >
            <MessageCircle className="h-7 w-7 text-white group-hover:rotate-12 transition-transform duration-300" />

            {/* Notification badge with animation */}
            <span className="absolute -top-1 -right-1 flex h-5 w-5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 border-2 border-white" />
            </span>

            {/* Sparkle effect */}
            <Sparkles className="absolute -top-2 -left-2 h-4 w-4 text-yellow-400 animate-pulse" />
          </Button>

          {/* Floating label */}
          <div className="absolute bottom-full right-0 mb-3 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg shadow-lg">
              Need help? Chat with us!
              <div className="absolute top-full right-4 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-gray-900" />
            </div>
          </div>
        </div>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-8 zoom-in-95 duration-300">
          <Card className="w-[400px] h-[650px] shadow-2xl flex flex-col overflow-hidden border-0 ring-1 ring-gray-200">
            <CardHeader className="relative bg-gradient-to-br from-[#25D366] via-[#22C55E] to-[#20BA5A] text-white p-5 overflow-hidden">
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-white rounded-full blur-2xl animate-pulse delay-75" />
              </div>

              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center ring-2 ring-white/30 animate-pulse">
                    <MessageCircle className="h-6 w-6 text-white" />
                    <span className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-400 rounded-full border-2 border-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold">Travel Esim Support</CardTitle>
                    <p className="text-xs text-white/90 flex items-center gap-1">
                      <span className="inline-block w-2 h-2 bg-green-300 rounded-full animate-pulse" />
                      Online - We reply instantly
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-9 w-9 text-white hover:bg-white/20 hover:rotate-90 transition-all duration-300 rounded-full"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto p-5 bg-gradient-to-b from-gray-50 to-white space-y-4">
              <div className="flex gap-2 animate-in slide-in-from-left duration-500">
                <div className="relative bg-white rounded-2xl rounded-tl-none p-4 shadow-md max-w-[300px] border border-gray-100">
                  <div className="absolute -left-2 top-0 w-0 h-0 border-t-[12px] border-r-[12px] border-transparent border-r-white" />

                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-[#25D366] to-[#20BA5A] flex items-center justify-center">
                      <Sparkles className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-xs font-semibold text-gray-600">Support Bot</span>
                  </div>

                  <p className="text-sm text-gray-800 leading-relaxed">
                    Hello! Welcome to{" "}
                    <span className="font-bold bg-gradient-to-r from-[#25D366] to-[#20BA5A] bg-clip-text text-transparent">
                      Travel Esim
                    </span>{" "}
                    support.
                  </p>
                  <p className="text-sm text-gray-600 mt-2">How can we help you today?</p>
                  <p className="text-xs text-gray-400 mt-3">Choose a topic below:</p>
                </div>
              </div>

              {showInitialOptions && (
                <div className="space-y-2">
                  {quickReplies.map((reply, index) => (
                    <div
                      key={reply.id}
                      className="animate-in slide-in-from-right fade-in duration-500"
                      style={{ animationDelay: `${index * 75}ms` }}
                    >
                      <Button
                        variant="outline"
                        className="group relative w-full justify-between text-left h-auto py-3 px-4 bg-white hover:bg-gradient-to-r hover:from-white hover:to-gray-50 border border-gray-200 hover:border-[#25D366] hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden"
                        onClick={() => {
                          sendWhatsAppMessage(reply.message)
                          setShowInitialOptions(false)
                        }}
                      >
                        {/* Gradient overlay on hover */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${reply.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                        />

                        <div className="flex items-center gap-3 relative z-10">
                          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300">
                            {reply.icon}
                          </div>
                          <span className="text-sm text-gray-700 font-medium">{reply.text}</span>
                        </div>

                        <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-[#25D366] group-hover:translate-x-1 transition-all duration-300" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-5 shadow-md border border-gray-100 mt-6 animate-in fade-in slide-in-from-bottom duration-700 delay-500">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-1 w-1 rounded-full bg-[#25D366]" />
                  <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">Direct Contact</p>
                </div>

                <div className="space-y-3">
                  {/* WhatsApp */}
                  <Button
                    variant="outline"
                    className="group w-full justify-start gap-3 h-auto py-4 bg-white hover:bg-gradient-to-r hover:from-[#25D366]/5 hover:to-transparent border-gray-200 hover:border-[#25D366] hover:shadow-md transition-all duration-300 rounded-xl"
                    onClick={() => sendWhatsAppMessage("Hello! I need support.")}
                  >
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#25D366] to-[#20BA5A] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Phone className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-left flex-1">
                      <p className="text-sm font-semibold text-gray-800">WhatsApp Support</p>
                      <p className="text-xs text-gray-500">{whatsappNumber}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-[#25D366] group-hover:translate-x-1 transition-all duration-300" />
                  </Button>

                  {/* Email */}
                  <a href={`mailto:${supportEmail}`}>
                    <Button
                      variant="outline"
                      className="group w-full justify-start gap-3 h-auto py-4 bg-white hover:bg-gradient-to-r hover:from-blue-500/5 hover:to-transparent border-gray-200 hover:border-blue-500 hover:shadow-md transition-all duration-300 rounded-xl"
                    >
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <Mail className="h-5 w-5 text-white" />
                      </div>
                      <div className="text-left flex-1">
                        <p className="text-sm font-semibold text-gray-800">Email Support</p>
                        <p className="text-xs text-gray-500">{supportEmail}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" />
                    </Button>
                  </a>
                </div>
              </div>
            </CardContent>

            <div className="p-4 bg-gradient-to-t from-gray-50 to-white border-t border-gray-100">
              <Button
                className="w-full bg-gradient-to-r from-[#25D366] to-[#20BA5A] hover:from-[#20BA5A] hover:to-[#1DA851] gap-2 h-12 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 font-semibold"
                onClick={() => sendWhatsAppMessage("Hello! I need help with my Travel Esim.")}
              >
                <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                Start WhatsApp Chat
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  )
}
