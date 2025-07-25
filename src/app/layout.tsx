import '../shared/styles/globals.css';
import { Inter } from 'next/font/google';
import TanstackProviders from '../shared/libs/TanstackProviders';
import ToastProvider from '../shared/libs/ToastProvider';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'hoom - Simple Video Calling',
  description: 'Connect with friends through video calls',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <TanstackProviders>
          <ToastProvider>{children}</ToastProvider>
        </TanstackProviders>
      </body>
    </html>
  );
}
