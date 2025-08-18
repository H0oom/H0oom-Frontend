import { ChatWidget } from '@/widgets/chat/ChatWidget';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCreateChatSession } from '@/features/chat/model/hooks/useCreateChatSession';

export default function ChatPage() {
  const router = useRouter();
  const userId = Number(router.query.userId || '0');
  const { mutate: createSession } = useCreateChatSession();

  useEffect(() => {
    if (!userId) return;
    createSession({ target_user_id: userId });
  }, [userId, createSession]);

  return <ChatWidget />;
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'ko', ['chat'])),
    },
  };
};
