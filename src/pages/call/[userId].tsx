import { VideoCallWidget } from '@/widgets/video-call/VideoCallWidget';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function CallPage() {
  return <VideoCallWidget />;
}
export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'ko', ['video-call'])),
    },
  };
};