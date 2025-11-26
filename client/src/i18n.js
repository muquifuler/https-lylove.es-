import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importa los JSON de traducción
import en from './locales/en.json';
import es from './locales/es.json';
import fr from './locales/fr.json';

const resources = {
  en: { translation: en },
  es: { translation: es },
  fr: { translation: fr }
};

i18n
  .use(LanguageDetector) // detecta idioma automáticamente
  .use(initReactI18next) // conecta con React
  .init({
    resources,
    fallbackLng: 'en',       // idioma por defecto
    interpolation: {
      escapeValue: false     // react ya escapa por seguridad
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;
