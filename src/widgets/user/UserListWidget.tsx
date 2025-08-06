import { Video } from 'lucide-react';
import { AiUsers, users } from '@/entities/user/mockUsers';
import { UserCard } from '@/entities/user/ui/UserCard';

export function UserListWidget() {
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
          <h2 className="mb-6 text-xl font-medium text-black">AI</h2>
          <div className="grid gap-2">
            <UserCard user={AiUsers} url="/chat-ai" />
          </div>
        </div>
        <div className="mb-8">
          <h2 className="mb-6 text-xl font-medium text-black">People</h2>
          <div className="grid gap-2">
            {users.map((user) => (
              <UserCard key={user.id} user={user} url={`/chat/${user.id}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
