import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import fr from './locales/fr.json';
import ar from './locales/ar.json';
import { getLanguageFromPath } from './routeConfig';

const initialLanguage =
  typeof window === 'undefined' ? 'en' : getLanguageFromPath(window.location.pathname);

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      ar: { translation: ar },
    },
    lng: initialLanguage,
    fallbackLng: 'en',
    debug: false,
    interpolation: { escapeValue: false },
  });

i18n.on('languageChanged', (lng) => {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lng.split('-')[0];
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
  }
});

export default i18n;
