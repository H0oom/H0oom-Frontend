'use client';

import { Video, MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

type User = {
  id: number;
  name: string;
  status: 'online' | 'away';
  avatar: string;
  statusMessage: string;
};

export default function UserListPage() {
  const router = useRouter();
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
                onClick={() => router.push(`/chat/${user.id}`)}
                className="group cursor-pointer rounded-2xl border border-gray-100 bg-white p-5 transition-all duration-200 hover:bg-gray-50 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-xl">
                        {user.avatar}
                      </div>
                      <div
                        className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${user.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}
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
