'use client';

import { Label } from '@radix-ui/react-label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import {
  Video,
  MessageCircle,
  Phone,
  PhoneOff,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  ArrowLeft,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '../shared/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../shared/ui/card';
import { Input } from '../shared/ui/input';

type User = {
  id: number;
  name: string;
  status: 'online' | 'away';
  avatar: string;
  statusMessage: string;
};

export default function AuthPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateName = (name: string) => {
    return name.trim().length >= 2;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    let error = '';
    switch (field) {
      case 'email':
        if (value && !validateEmail(value)) {
          error = '올바른 이메일 형식을 입력해주세요';
        }
        break;
      case 'password':
        if (value && !validatePassword(value)) {
          error =
            '비밀번호는 8자 이상, 대소문자, 숫자, 특수문자를 포함해야 합니다';
        }
        break;
      case 'name':
        if (value && !validateName(value)) {
          error = '이름은 2자 이상 입력해주세요';
        }
        break;
      case 'confirmPassword':
        if (value && value !== formData.password) {
          error = '비밀번호가 일치하지 않습니다';
        }
        break;
    }
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleLogin = () => {
    if (validateEmail(formData.email) && formData.password) {
      setIsLoggedIn(true);
    }
  };

  const handleSignup = () => {
    if (
      validateEmail(formData.email) &&
      validatePassword(formData.password) &&
      validateName(formData.name) &&
      formData.password === formData.confirmPassword
    ) {
      setIsLoggedIn(true);
    }
  };

  if (isLoggedIn) {
    return <UserListPage />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4">
      <div className="w-full max-w-md">
        <div className="mb-12 text-center">
          <div className="mb-6 flex items-center justify-center">
            <div className="relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-black shadow-lg">
                <Video className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md">
                <div className="h-3 w-3 rounded-full bg-black" />
              </div>
            </div>
          </div>
          <h1 className="mb-3 text-5xl font-light tracking-tight text-black">
            hoom
          </h1>
          <p className="text-lg text-gray-500">Simple. Clean. Connected.</p>
        </div>

        <Card className="border border-gray-100 bg-white shadow-xl">
          <CardHeader className="pb-2 text-center">
            <CardTitle className="text-2xl font-light text-black">
              Welcome
            </CardTitle>
            <CardDescription className="text-base text-gray-500">
              Sign in or create your account
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 rounded-xl bg-gray-50 p-1">
                <TabsTrigger
                  value="login"
                  className="rounded-lg font-medium text-gray-600 data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="rounded-lg font-medium text-gray-600 data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="mt-8 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-medium text-black">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`h-12 rounded-xl border-gray-200 bg-white text-black placeholder-gray-400 focus:border-black focus:ring-1 focus:ring-black ${
                      errors.email ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="font-medium text-black">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange('password', e.target.value)
                    }
                    className={`h-12 rounded-xl border-gray-200 bg-white text-black placeholder-gray-400 focus:border-black focus:ring-1 focus:ring-black ${
                      errors.password ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.password}
                    </p>
                  )}
                </div>
                <Button
                  onClick={handleLogin}
                  className="h-12 w-full rounded-xl bg-black text-base font-medium text-white transition-all duration-200 hover:bg-gray-800"
                >
                  Sign In
                </Button>
              </TabsContent>

              <TabsContent value="signup" className="mt-8 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-medium text-black">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`h-12 rounded-xl border-gray-200 bg-white text-black placeholder-gray-400 focus:border-black focus:ring-1 focus:ring-black ${
                      errors.name ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="signup-email"
                    className="font-medium text-black"
                  >
                    Email
                  </Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`h-12 rounded-xl border-gray-200 bg-white text-black placeholder-gray-400 focus:border-black focus:ring-1 focus:ring-black ${
                      errors.email ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="signup-password"
                    className="font-medium text-black"
                  >
                    Password
                  </Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange('password', e.target.value)
                    }
                    className={`h-12 rounded-xl border-gray-200 bg-white text-black placeholder-gray-400 focus:border-black focus:ring-1 focus:ring-black ${
                      errors.password ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.password}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="confirm-password"
                    className="font-medium text-black"
                  >
                    Confirm Password
                  </Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange('confirmPassword', e.target.value)
                    }
                    className={`h-12 rounded-xl border-gray-200 bg-white text-black placeholder-gray-400 focus:border-black focus:ring-1 focus:ring-black ${
                      errors.confirmPassword ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
                <Button
                  onClick={handleSignup}
                  className="h-12 w-full rounded-xl bg-black text-base font-medium text-white transition-all duration-200 hover:bg-gray-800"
                >
                  Create Account
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// 아래 컴포넌트들은 별도 파일로 분리 예정
function UserListPage() {
  // 2. UserListPage에서 any 대신 User 타입 사용
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isInCall, setIsInCall] = useState(false);

  const users: User[] = [
    {
      id: 1,
      name: '김민수',
      status: 'online',
      avatar: '🧑‍💻',
      statusMessage: '개발 중...',
    },
    {
      id: 2,
      name: '이지은',
      status: 'online',
      avatar: '👩‍🎨',
      statusMessage: '디자인 작업 중',
    },
    {
      id: 3,
      name: '박준호',
      status: 'away',
      avatar: '👨‍💼',
      statusMessage: '회의 중',
    },
    {
      id: 4,
      name: '최수진',
      status: 'online',
      avatar: '👩‍🔬',
      statusMessage: '연구 중',
    },
    {
      id: 5,
      name: '정태현',
      status: 'online',
      avatar: '👨‍🎓',
      statusMessage: '공부 중',
    },
    {
      id: 6,
      name: '한소영',
      status: 'away',
      avatar: '👩‍🏫',
      statusMessage: '수업 중',
    },
  ];

  if (isInCall && selectedUser) {
    return (
      <VideoCallPage user={selectedUser} onEndCall={() => setIsInCall(false)} />
    );
  }

  if (selectedUser) {
    return (
      <ChatPage
        user={selectedUser}
        onBack={() => setSelectedUser(null)}
        onStartCall={() => setIsInCall(true)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100 bg-white p-6">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black">
              <Video className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-3xl font-light tracking-tight text-black">
              hoom
            </h1>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span className="font-medium text-gray-600">14 online</span>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl p-6">
        <div className="mb-8">
          <h2 className="mb-6 text-xl font-medium text-black">People</h2>
          <div className="grid gap-2">
            {users.map((user) => (
              <div
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className="group cursor-pointer rounded-2xl border border-gray-100 bg-white p-5 transition-all duration-200 hover:bg-gray-50 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-xl">
                        {user.avatar}
                      </div>
                      <div
                        className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${
                          user.status === 'online'
                            ? 'bg-green-500'
                            : 'bg-gray-400'
                        }`}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-black">
                        {user.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {user.statusMessage}
                      </p>
                    </div>
                  </div>
                  <div className="opacity-0 transition-opacity group-hover:opacity-100">
                    <MessageCircle className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatPage({
  user,
  onBack,
  onStartCall,
}: {
  user: User;
  onBack: () => void;
  onStartCall: () => void;
}) {
  // 2. ChatPage에서 any 대신 User 타입 사용
  const [message, setMessage] = useState('');
  type Message = {
    id: number;
    sender: string;
    content: string;
    time: string;
    isMe: boolean;
  };
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: user.name,
      content: '안녕하세요!',
      time: '오전 1:42',
      isMe: false,
    },
    {
      id: 2,
      sender: '나',
      content: '안녕하세요! 잘 지내시나요?',
      time: '오전 1:42',
      isMe: true,
    },
    {
      id: 3,
      sender: user.name,
      content: '네, 잘 지내고 있어요. 오늘 날씨가 좋네요!',
      time: '오전 1:43',
      isMe: false,
    },
  ]);

  const sendMessage = () => {
    if (message.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: '나',
          content: message,
          time: '오전 1:44',
          isMe: true,
        },
      ]);
      setMessage('');
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="border-b border-gray-100 bg-white p-6">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={onBack}
              className="rounded-xl p-2 text-black hover:bg-gray-100"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
              {user.avatar}
            </div>
            <div>
              <h2 className="text-lg font-medium text-black">{user.name}</h2>
              <p className="text-sm text-gray-500">
                {user.status === 'online' ? '온라인' : '자리비움'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              onClick={onStartCall}
              className="rounded-xl bg-black px-6 py-2 text-white hover:bg-gray-800"
            >
              <Phone className="mr-2 h-4 w-4" />
              통화
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-4xl flex-1 overflow-y-auto p-6">
        <div className="space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs rounded-2xl px-5 py-3 lg:max-w-md ${
                  msg.isMe ? 'bg-black text-white' : 'bg-gray-100 text-black'
                }`}
              >
                <p className="text-base">{msg.content}</p>
                <p
                  className={`mt-2 text-xs ${
                    msg.isMe ? 'text-gray-300' : 'text-gray-500'
                  }`}
                >
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-100 bg-white p-6">
        <div className="mx-auto flex max-w-4xl space-x-3">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="메시지를 입력하세요..."
            className="h-12 flex-1 rounded-xl border-gray-200 bg-gray-50 text-black placeholder-gray-400 focus:border-black focus:ring-1 focus:ring-black"
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <Button
            onClick={sendMessage}
            className="rounded-xl bg-black px-6 text-white hover:bg-gray-800"
          >
            전송
          </Button>
        </div>
      </div>
    </div>
  );
}

function VideoCallPage({
  user,
  onEndCall,
}: {
  user: User;
  onEndCall: () => void;
}) {
  // 2. VideoCallPage에서 any 대신 User 타입 사용
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  return (
    <div className="relative min-h-screen bg-black">
      <div className="absolute inset-0 flex items-center justify-center p-4 md:p-6">
        <div className="w-full max-w-6xl">
          {/* 모바일에서는 세로 배치, 데스크톱에서는 가로 배치 */}
          <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-6">
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-gray-900 md:rounded-3xl">
              {isVideoOff ? (
                <div className="flex h-full w-full items-center justify-center">
                  <div className="text-center">
                    <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gray-800 text-2xl md:mb-4 md:h-24 md:w-24 md:text-4xl">
                      {user.avatar}
                    </div>
                    <p className="text-lg font-medium text-white md:text-xl">
                      {user.name}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                  <div className="text-center">
                    <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-2xl md:mb-4 md:h-24 md:w-24 md:text-4xl">
                      {user.avatar}
                    </div>
                    <p className="text-lg font-medium text-white md:text-xl">
                      {user.name}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="relative aspect-video overflow-hidden rounded-2xl bg-gray-800 md:rounded-3xl">
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800">
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-2xl md:mb-4 md:h-24 md:w-24 md:text-4xl">
                    👤
                  </div>
                  <p className="text-lg font-medium text-white md:text-xl">
                    나
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 transform md:bottom-12">
        <div className="flex items-center space-x-3 rounded-xl bg-white/10 px-6 py-3 backdrop-blur-xl md:space-x-4 md:rounded-2xl md:px-8 md:py-4">
          <Button
            variant={isMuted ? 'destructive' : 'secondary'}
            size="lg"
            className={`h-12 w-12 rounded-full md:h-14 md:w-14 ${
              isMuted
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-white/20 hover:bg-white/30'
            } border-0 text-white`}
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? (
              <MicOff className="h-5 w-5 md:h-6 md:w-6" />
            ) : (
              <Mic className="h-5 w-5 md:h-6 md:w-6" />
            )}
          </Button>

          <Button
            variant={isVideoOff ? 'destructive' : 'secondary'}
            size="lg"
            className={`h-12 w-12 rounded-full md:h-14 md:w-14 ${
              isVideoOff
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-white/20 hover:bg-white/30'
            } border-0 text-white`}
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
            className="h-12 w-12 rounded-full bg-red-500 text-white hover:bg-red-600 md:h-14 md:w-14"
            onClick={onEndCall}
          >
            <PhoneOff className="h-5 w-5 md:h-6 md:w-6" />
          </Button>
        </div>
      </div>

      <div className="absolute left-4 top-4 md:left-8 md:top-8">
        <div className="rounded-xl bg-white/10 px-4 py-2 backdrop-blur-xl md:rounded-2xl md:px-6 md:py-3">
          <p className="text-sm font-medium text-white md:text-base">
            {user.name}와 통화 중
          </p>
        </div>
      </div>
    </div>
  );
}
