import { useRouter } from 'next/router';
import { AiUsers } from '@/entities/user/mockUsers';
import { useAiChat } from '@/features/chat/model/hooks/useAiChat';
import { ChatHeader } from '@/features/chat/ui/ChatHeader';
import { ChatInput } from '@/features/chat/ui/ChatInput';
import { ChatAiMessages } from '@/features/chat/ui/ChatAiMessages';

export function AiChatWidget() {
  const router = useRouter();
  const { message, setMessage, messages, sendMessage, isLoading } =
    useAiChat('AI 어시스턴트');

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <ChatHeader user={AiUsers} onBack={() => router.push('/users')} />
      <ChatAiMessages messages={messages} />
      <ChatInput
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
        isLoading={isLoading}
      />
    </div>
  );
}
