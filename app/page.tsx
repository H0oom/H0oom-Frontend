"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Video, MessageCircle, Phone, PhoneOff, Mic, MicOff, Camera, CameraOff, ArrowLeft } from "lucide-react"

export default function AuthPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  })

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password: string) => {
    // 최소 8자, 대문자, 소문자, 숫자, 특수문자 포함
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    return passwordRegex.test(password)
  }

  const validateName = (name: string) => {
    return name.trim().length >= 2
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // 실시간 유효성 검사
    let error = ""
    switch (field) {
      case "email":
        if (value && !validateEmail(value)) {
          error = "올바른 이메일 형식을 입력해주세요"
        }
        break
      case "password":
        if (value && !validatePassword(value)) {
          error = "비밀번호는 8자 이상, 대소문자, 숫자, 특수문자를 포함해야 합니다"
        }
        break
      case "name":
        if (value && !validateName(value)) {
          error = "이름은 2자 이상 입력해주세요"
        }
        break
      case "confirmPassword":
        if (value && value !== formData.password) {
          error = "비밀번호가 일치하지 않습니다"
        }
        break
    }
    setErrors((prev) => ({ ...prev, [field]: error }))
  }

  const handleLogin = () => {
    if (validateEmail(formData.email) && formData.password) {
      setIsLoggedIn(true)
    }
  }

  const handleSignup = () => {
    if (
      validateEmail(formData.email) &&
      validatePassword(formData.password) &&
      validateName(formData.name) &&
      formData.password === formData.confirmPassword
    ) {
      setIsLoggedIn(true)
    }
  }

  if (isLoggedIn) {
    return <UserListPage />
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center shadow-lg">
                <Video className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
                <div className="w-3 h-3 bg-black rounded-full"></div>
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-light text-black mb-3 tracking-tight">hoom</h1>
          <p className="text-gray-500 text-lg">Simple. Clean. Connected.</p>
        </div>

        <Card className="bg-white border border-gray-100 shadow-xl">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-black text-2xl font-light">Welcome</CardTitle>
            <CardDescription className="text-gray-500 text-base">Sign in or create your account</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-50 p-1 rounded-xl">
                <TabsTrigger
                  value="login"
                  className="text-gray-600 data-[state=active]:text-black data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg font-medium"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="text-gray-600 data-[state=active]:text-black data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg font-medium"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-6 mt-8">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-black font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`bg-white border-gray-200 text-black placeholder-gray-400 h-12 rounded-xl focus:border-black focus:ring-1 focus:ring-black ${errors.email ? "border-red-500" : ""}`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-black font-medium">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className={`bg-white border-gray-200 text-black placeholder-gray-400 h-12 rounded-xl focus:border-black focus:ring-1 focus:ring-black ${errors.password ? "border-red-500" : ""}`}
                  />
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>
                <Button
                  onClick={handleLogin}
                  className="w-full bg-black hover:bg-gray-800 text-white h-12 rounded-xl font-medium text-base transition-all duration-200"
                >
                  Sign In
                </Button>
              </TabsContent>

              <TabsContent value="signup" className="space-y-6 mt-8">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-black font-medium">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={`bg-white border-gray-200 text-black placeholder-gray-400 h-12 rounded-xl focus:border-black focus:ring-1 focus:ring-black ${errors.name ? "border-red-500" : ""}`}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-black font-medium">
                    Email
                  </Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`bg-white border-gray-200 text-black placeholder-gray-400 h-12 rounded-xl focus:border-black focus:ring-1 focus:ring-black ${errors.email ? "border-red-500" : ""}`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-black font-medium">
                    Password
                  </Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className={`bg-white border-gray-200 text-black placeholder-gray-400 h-12 rounded-xl focus:border-black focus:ring-1 focus:ring-black ${errors.password ? "border-red-500" : ""}`}
                  />
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-black font-medium">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className={`bg-white border-gray-200 text-black placeholder-gray-400 h-12 rounded-xl focus:border-black focus:ring-1 focus:ring-black ${errors.confirmPassword ? "border-red-500" : ""}`}
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
                <Button
                  onClick={handleSignup}
                  className="w-full bg-black hover:bg-gray-800 text-white h-12 rounded-xl font-medium text-base transition-all duration-200"
                >
                  Create Account
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function UserListPage() {
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [isInCall, setIsInCall] = useState(false)

  const users = [
    { id: 1, name: "김민수", status: "online", avatar: "🧑‍💻", statusMessage: "개발 중..." },
    { id: 2, name: "이지은", status: "online", avatar: "👩‍🎨", statusMessage: "디자인 작업 중" },
    { id: 3, name: "박준호", status: "away", avatar: "👨‍💼", statusMessage: "회의 중" },
    { id: 4, name: "최수진", status: "online", avatar: "👩‍🔬", statusMessage: "연구 중" },
    { id: 5, name: "정태현", status: "online", avatar: "👨‍🎓", statusMessage: "공부 중" },
    { id: 6, name: "한소영", status: "away", avatar: "👩‍🏫", statusMessage: "수업 중" },
  ]

  if (isInCall && selectedUser) {
    return <VideoCallPage user={selectedUser} onEndCall={() => setIsInCall(false)} />
  }

  if (selectedUser) {
    return <ChatPage user={selectedUser} onBack={() => setSelectedUser(null)} onStartCall={() => setIsInCall(true)} />
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b border-gray-100 p-6">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
              <Video className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-3xl font-light text-black tracking-tight">hoom</h1>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-600 font-medium">14 online</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-xl font-medium text-black mb-6">People</h2>
          <div className="grid gap-2">
            {users.map((user) => (
              <div
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className="bg-white hover:bg-gray-50 border border-gray-100 rounded-2xl p-5 cursor-pointer transition-all duration-200 hover:shadow-md group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl">
                        {user.avatar}
                      </div>
                      <div
                        className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                          user.status === "online" ? "bg-green-500" : "bg-gray-400"
                        }`}
                      ></div>
                    </div>
                    <div>
                      <h3 className="text-black font-medium text-lg">{user.name}</h3>
                      <p className="text-gray-500 text-sm">{user.statusMessage}</p>
                    </div>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <MessageCircle className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ChatPage({ user, onBack, onStartCall }: { user: any; onBack: () => void; onStartCall: () => void }) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    { id: 1, sender: user.name, content: "안녕하세요!", time: "오전 1:42", isMe: false },
    { id: 2, sender: "나", content: "안녕하세요! 잘 지내시나요?", time: "오전 1:42", isMe: true },
    { id: 3, sender: user.name, content: "네, 잘 지내고 있어요. 오늘 날씨가 좋네요!", time: "오전 1:43", isMe: false },
  ])

  const sendMessage = () => {
    if (message.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: "나",
          content: message,
          time: "오전 1:44",
          isMe: true,
        },
      ])
      setMessage("")
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="bg-white border-b border-gray-100 p-6">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={onBack} className="text-black hover:bg-gray-100 rounded-xl p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">{user.avatar}</div>
            <div>
              <h2 className="text-black font-medium text-lg">{user.name}</h2>
              <p className="text-gray-500 text-sm">{user.status === "online" ? "온라인" : "자리비움"}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button onClick={onStartCall} className="bg-black hover:bg-gray-800 text-white rounded-xl px-6 py-2">
              <Phone className="h-4 w-4 mr-2" />
              통화
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 max-w-4xl mx-auto w-full">
        <div className="space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs lg:max-w-md px-5 py-3 rounded-2xl ${
                  msg.isMe ? "bg-black text-white" : "bg-gray-100 text-black"
                }`}
              >
                <p className="text-base">{msg.content}</p>
                <p className={`text-xs mt-2 ${msg.isMe ? "text-gray-300" : "text-gray-500"}`}>{msg.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border-t border-gray-100 p-6">
        <div className="max-w-4xl mx-auto flex space-x-3">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="메시지를 입력하세요..."
            className="flex-1 bg-gray-50 border-gray-200 text-black placeholder-gray-400 h-12 rounded-xl focus:border-black focus:ring-1 focus:ring-black"
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button onClick={sendMessage} className="bg-black hover:bg-gray-800 text-white px-6 rounded-xl">
            전송
          </Button>
        </div>
      </div>
    </div>
  )
}

function VideoCallPage({ user, onEndCall }: { user: any; onEndCall: () => void }) {
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)

  return (
    <div className="min-h-screen bg-black relative">
      <div className="absolute inset-0 flex items-center justify-center p-4 md:p-6">
        <div className="w-full max-w-6xl">
          {/* 모바일에서는 세로 배치, 데스크톱에서는 가로 배치 */}
          <div className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-6">
            <div className="relative bg-gray-900 rounded-2xl md:rounded-3xl overflow-hidden aspect-video">
              {isVideoOff ? (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 md:w-24 md:h-24 bg-gray-800 rounded-full flex items-center justify-center text-2xl md:text-4xl mb-3 md:mb-4 mx-auto">
                      {user.avatar}
                    </div>
                    <p className="text-white font-medium text-lg md:text-xl">{user.name}</p>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 md:w-24 md:h-24 bg-white/10 rounded-full flex items-center justify-center text-2xl md:text-4xl mb-3 md:mb-4 mx-auto">
                      {user.avatar}
                    </div>
                    <p className="text-white font-medium text-lg md:text-xl">{user.name}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="relative bg-gray-800 rounded-2xl md:rounded-3xl overflow-hidden aspect-video">
              <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 md:w-24 md:h-24 bg-white/10 rounded-full flex items-center justify-center text-2xl md:text-4xl mb-3 md:mb-4 mx-auto">
                    👤
                  </div>
                  <p className="text-white font-medium text-lg md:text-xl">나</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 md:bottom-12 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center space-x-3 md:space-x-4 bg-white/10 backdrop-blur-xl rounded-xl md:rounded-2xl px-6 md:px-8 py-3 md:py-4">
          <Button
            variant={isMuted ? "destructive" : "secondary"}
            size="lg"
            className={`rounded-full w-12 h-12 md:w-14 md:h-14 ${
              isMuted ? "bg-red-500 hover:bg-red-600" : "bg-white/20 hover:bg-white/30"
            } text-white border-0`}
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <MicOff className="h-5 w-5 md:h-6 md:w-6" /> : <Mic className="h-5 w-5 md:h-6 md:w-6" />}
          </Button>

          <Button
            variant={isVideoOff ? "destructive" : "secondary"}
            size="lg"
            className={`rounded-full w-12 h-12 md:w-14 md:h-14 ${
              isVideoOff ? "bg-red-500 hover:bg-red-600" : "bg-white/20 hover:bg-white/30"
            } text-white border-0`}
            onClick={() => setIsVideoOff(!isVideoOff)}
          >
            {isVideoOff ? (
              <CameraOff className="h-5 w-5 md:h-6 md:w-6" />
            ) : (
              <Camera className="h-5 w-5 md:h-6 md:w-6" />
            )}
          </Button>

          <Button
            variant="destructive"
            size="lg"
            className="rounded-full w-12 h-12 md:w-14 md:h-14 bg-red-500 hover:bg-red-600 text-white"
            onClick={onEndCall}
          >
            <PhoneOff className="h-5 w-5 md:h-6 md:w-6" />
          </Button>
        </div>
      </div>

      <div className="absolute top-4 md:top-8 left-4 md:left-8">
        <div className="bg-white/10 backdrop-blur-xl rounded-xl md:rounded-2xl px-4 md:px-6 py-2 md:py-3">
          <p className="text-white font-medium text-sm md:text-base">{user.name}와 통화 중</p>
        </div>
      </div>
    </div>
  )
}
