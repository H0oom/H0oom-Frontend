import { Video } from 'lucide-react';
import { AiUsers } from '@/entities/user/mockUsers';
import { UserCard } from '@/entities/user/ui/UserCard';
import { useUser } from '@/entities/user/model/hooks/useUser';
import { UserCardSkeleton } from '@/entities/user/ui/UserCardSkeleton';

export function UserListWidget() {
  const { data: users, isLoading, isError } = useUser();

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
            {isLoading && (
              <div className="grid gap-2">
                {Array.from({ length: 6 }).map((_, index) => (
                  <UserCardSkeleton key={index} />
                ))}
              </div>
            )}
            {isError && (
              <div className="text-red-500">
                사용자 목록을 불러오지 못했습니다.
              </div>
            )}
            {users?.map((user) => (
              <UserCard key={user.id} user={user} url={`/chat/${user.id}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
