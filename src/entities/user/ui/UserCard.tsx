'use client';

import { MessageCircle } from 'lucide-react';
import { useRouter } from 'next/router';
import { User } from '../types';

interface UserCardProps {
  user: User;
  url: string;
}

export function UserCard({ user, url }: UserCardProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(url)}
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
            <h3 className="text-lg font-medium text-black">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.statusMessage}</p>
          </div>
        </div>
        <div className="opacity-0 transition-opacity group-hover:opacity-100">
          <MessageCircle className="h-5 w-5 text-gray-400" />
        </div>
      </div>
    </div>
  );
}
