import { AiChatWidget } from '@/widgets/chat/AiChatWidget';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function AiChatPage() {
  return <AiChatWidget />;
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'ko', ['chat'])),
    },
  };
};