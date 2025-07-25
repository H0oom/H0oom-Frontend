'use client';

import { Mic, MicOff, Camera, CameraOff, PhoneOff } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';
import { Button } from '../../../shared/ui/button';

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

export default function VideoCallPage() {
  const router = useRouter();
  const params = useParams();
  const userId = Number(params.userId);
  const user = users.find((u) => u.id === userId);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  if (!user) return <div>유저를 찾을 수 없습니다.</div>;

  return (
    <div className="relative min-h-screen bg-black">
      <div className="absolute inset-0 flex items-center justify-center p-4 md:p-6">
        <div className="w-full max-w-6xl">
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
            className={`h-12 w-12 rounded-full md:h-14 md:w-14 ${isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-white/20 hover:bg-white/30'} border-0 text-white`}
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
            className={`h-12 w-12 rounded-full md:h-14 md:w-14 ${isVideoOff ? 'bg-red-500 hover:bg-red-600' : 'bg-white/20 hover:bg-white/30'} border-0 text-white`}
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
            onClick={() => router.push('/users')}
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
