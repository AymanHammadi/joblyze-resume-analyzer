import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import enTranslation from './locales/en/translation.json';
import arTranslation from './locales/ar/translation.json';

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
        translation: enTranslation
      },
      ar: {
        translation: arTranslation
      }
    },
    // Default language
    fallbackLng: 'en',
    // Debug mode in development
    debug: import.meta.env.DEV,
    // Detect and cache language on localStorage
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
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