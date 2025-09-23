import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import '../shared/styles/globals.css';
import TanstackProviders from '../shared/libs/TanstackProviders';
import ToastProvider from '../shared/libs/ToastProvider';
import { Provider } from 'react-redux';
import { store } from '@/shared/stores/store';

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <TanstackProviders>
        <ToastProvider>
          <Component {...pageProps} />
        </ToastProvider>
      </TanstackProviders>
    </Provider>
  );
}

export default appWithTranslation(App);
