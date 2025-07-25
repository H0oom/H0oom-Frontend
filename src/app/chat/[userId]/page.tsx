'use client';

import { ArrowLeft, Phone } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';
import { Button } from '../../../shared/ui/button';
import { Input } from '../../../shared/ui/input';

type User = {
  id: number;
  name: string;
  status: 'online' | 'away';
  avatar: string;
  statusMessage: string;
};

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

export default function ChatPage() {
  const router = useRouter();
  const params = useParams();
  const userId = Number(params.userId);
  const user = users.find((u) => u.id === userId);
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
      sender: user?.name || '',
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
      sender: user?.name || '',
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

  if (!user) return <div>유저를 찾을 수 없습니다.</div>;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="border-b border-gray-100 bg-white p-6">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => router.push('/users')}
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
              onClick={() => router.push(`/call/${user.id}`)}
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
                className={`max-w-xs rounded-2xl px-5 py-3 lg:max-w-md ${msg.isMe ? 'bg-black text-white' : 'bg-gray-100 text-black'}`}
              >
                <p className="text-base">{msg.content}</p>
                <p
                  className={`mt-2 text-xs ${msg.isMe ? 'text-gray-300' : 'text-gray-500'}`}
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
