'use client';

import { useParams, useRouter } from 'next/navigation';
import { users } from '@/src/entities/user/mockUsers';
import { useChat } from '@/src/features/chat/model/useChat';
import { ChatHeader } from '@/src/features/chat/ui/ChatHeader';
import { ChatInput } from '@/src/features/chat/ui/ChatInput';
import { ChatMessages } from '@/src/features/chat/ui/ChatMessages';

export function ChatWidget() {
  const router = useRouter();
  const params = useParams();
  const userId = Number(params.userId);
  const user = users.find((u) => u.id === userId);
  const { message, setMessage, messages, sendMessage } = useChat(
    user?.name || '',
  );

  if (!user) return <div>유저를 찾을 수 없습니다.</div>;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <ChatHeader
        user={user}
        onBack={() => router.push('/users')}
        onCall={() => router.push(`/call/${user.id}`)}
      />
      <ChatMessages messages={messages} />
      <ChatInput
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </div>
  );
}
