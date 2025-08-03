import { AuthForm } from "@/features/auth/ui/AuthForm";
import { Video } from "lucide-react";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetServerSideProps } from 'next';

export default function AuthPage() {
  const { t } = useTranslation('common');

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4">
      <div className="w-full max-w-md">
        <div className="mb-12 text-center">
          <div className="mb-6 flex items-center justify-center">
            <div className="relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-black shadow-lg">
                <Video className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md">
                <div className="h-3 w-3 rounded-full bg-black" />
              </div>
            </div>
          </div>
          <h1 className="mb-3 text-5xl font-light tracking-tight text-black">
            hoom
          </h1>
          <p className="text-lg text-gray-500">{t('welcome')}</p>
        </div>
        <AuthForm />
      </div>
    </div>
  );
}

export const getStaticProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'ko', ['common', 'auth'])),
    },
  };
};

