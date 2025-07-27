import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';


// Import translations
import arApp from './locales/ar/app.json';
import enApp from './locales/en/app.json';
import arUpload from './locales/ar/upload.json';
import enUpload from './locales/en/upload.json';
import arAnalysis from './locales/ar/analysis.json';
import enAnalysis from './locales/en/analysis.json';
import arAuth from './locales/ar/auth.json';
import enAuth from './locales/en/auth.json';

// Initialize i18next
i18n
  // Use language detector
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    // Resources contain translations
    resources: {
      en: {
        translation: {
          app: enApp
        },
        app: enApp,
        header: enApp.header,
        hero: enApp.home.hero,
        recentAnalyses: enApp.home.recentAnalyses,
        upload: enUpload,
        analysis: enAnalysis,
        auth: enAuth
      },
      ar: {
        translation: {
          app: arApp
        },
        app: arApp,
        header: arApp.header,
        hero: arApp.home.hero,
        recentAnalyses: arApp.home.recentAnalyses,
        upload: arUpload,
        analysis: arAnalysis,
        auth: arAuth
      }
    },
    // Default language
    fallbackLng: 'en',
    // Debug mode in development
    debug: import.meta.env.DEV,
    // Detect and cache language on localStorage
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      // Convert detected language to base language (en-US -> en)
      convertDetectedLanguage: (lng: string) => lng.split('-')[0]
    },
    // Interpolation configuration
    interpolation: {
      escapeValue: false // React already escapes values
    }
  });

// Function to change language
export const changeLanguage = (lng: string) => {
  i18n.changeLanguage(lng);
  // Set dir attribute for RTL languages
  document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
  // Set lang attribute
  document.documentElement.lang = lng;
};

// Export i18n instance
export default i18n;