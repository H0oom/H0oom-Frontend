import { ChatWidget } from '@/widgets/chat/ChatWidget';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function ChatPage() {
  return <ChatWidget />;
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'ko', ['chat'])),
    },
  };
};