import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import '../shared/styles/globals.css';
import TanstackProviders from '../shared/libs/TanstackProviders';
import ToastProvider from '../shared/libs/ToastProvider';

function App({ Component, pageProps }: AppProps) {
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

export default appWithTranslation(App);
