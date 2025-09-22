import { ChatWidget } from '@/widgets/chat/ChatWidget';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCreateChatSession } from '@/features/chat/model/hooks/useCreateChatSession';
import { useSocketJoinRoom } from '@/features/chat/model/hooks/useSocketJoinRoom';
import { RootState } from '@/shared/stores/store';
import { useSelector } from 'react-redux';

export default function ChatPage() {
  const router = useRouter();
  const userId = Number(router.query.userId || '0');
  const { mutate: createSession } = useCreateChatSession();
  const roomId = useSelector((state: RootState) => state.chat.roomId);

  useEffect(() => {
    if (!userId) return;
    createSession({ target_user_id: userId });
  }, [userId, createSession]);

  useSocketJoinRoom(roomId);

  return <ChatWidget />;
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'ko', ['chat'])),
    },
  };
};
