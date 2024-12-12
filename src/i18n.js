// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

// Récupérez la langue sauvegardée ou utilisez la langue par défaut
const savedLanguage = localStorage.getItem('language') || 'fr';

i18n
  .use(HttpBackend) // Utilisez i18next-http-backend pour charger les fichiers de traduction
  .use(initReactI18next) // Passez i18n à react-i18next
  .init({
    fallbackLng: 'fr', // Langue par défaut
    supportedLngs: ['fr', 'en', 'es'], // Langues supportées
    lng: savedLanguage, // Langue initiale

    interpolation: {
      escapeValue: false, // React se charge de l'échappement
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // Chemin vers les fichiers de traduction dans public
    },
    react: {
      useSuspense: false, // Optionnel : désactiver Suspense si vous rencontrez des problèmes
    },
  });

export default i18n;