import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const LanguageSwitcher = () => {
  const router = useRouter();
  const { t } = useTranslation('common');

  const changeLanguage = (locale: string) => {
    router.push(router.pathname, router.asPath, { locale });
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-600">{t('language')}:</span>
      <button
        onClick={() => changeLanguage('ko')}
        className={`px-3 py-1 text-sm rounded ${
          router.locale === 'ko'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        한국어
      </button>
      <button
        onClick={() => changeLanguage('en')}
        className={`px-3 py-1 text-sm rounded ${
          router.locale === 'en'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        English
      </button>
    </div>
  );
};

export default LanguageSwitcher; 