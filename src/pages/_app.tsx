import type { AppProps } from 'next/app';
import '../shared/styles/globals.css';
import TanstackProviders from '../shared/libs/TanstackProviders';
import ToastProvider from '../shared/libs/ToastProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <TanstackProviders>
        <ToastProvider>
          <Component {...pageProps} />
        </ToastProvider>
      </TanstackProviders>
    </div>
  );
}
