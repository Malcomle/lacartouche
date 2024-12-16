import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

const savedLanguage = localStorage.getItem('language') || 'fr';

i18n
  .use(HttpBackend) 
  .use(initReactI18next) 
  .init({
    fallbackLng: 'fr', 
    supportedLngs: ['fr', 'en', 'es'], 
    lng: savedLanguage, 

    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', 
    },
    react: {
      useSuspense: false, 
    },
  });

export default i18n;