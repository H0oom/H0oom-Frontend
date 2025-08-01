'use client';

import { useRouter } from 'next/navigation';
import { AiUsers } from '@/src/entities/user/mockUsers';
import { useAiChat } from '@/src/features/chat/model/useAiChat';
import { ChatHeader } from '@/src/features/chat/ui/ChatHeader';
import { ChatInput } from '@/src/features/chat/ui/ChatInput';
import { ChatMessages } from '@/src/features/chat/ui/ChatMessages';

export function AiChatWidget() {
  const router = useRouter();
  const { message, setMessage, messages, sendMessage, isLoading } =
    useAiChat('AI 어시스턴트');

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <ChatHeader user={AiUsers} onBack={() => router.push('/users')} />
      <ChatMessages messages={messages} />
      <ChatInput
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
        isLoading={isLoading}
      />
    </div>
  );
}
