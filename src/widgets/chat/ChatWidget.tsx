import { useRouter } from 'next/router';
import { users } from '@/entities/user/mockUsers';
import { useChat } from '@/features/chat/model/useChat';
import { ChatHeader } from '@/features/chat/ui/ChatHeader';
import { ChatInput } from '@/features/chat/ui/ChatInput';
import { ChatMessages } from '@/features/chat/ui/ChatMessages';
import { useTranslation } from 'next-i18next';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export function ChatWidget() {
  const { t } = useTranslation('chat');
  const router = useRouter();
  const userId = Number(router.query.userId || '0');
  const user = users.find((u) => u.id === userId);
  const { message, setMessage, messages, sendMessage } = useChat(
    user?.name || '',
  );

  if (!user) return <div>{t('notFound')}</div>;

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
