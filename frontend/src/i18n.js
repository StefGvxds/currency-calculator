import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

/**
 * Import JSON files containing translations for each language
 */
import translationEN from './Translations/en.json';
import translationDE from './Translations/de.json';
import translationEL from './Translations/el.json';

/**
 * Initialize i18n with language detector and React integration
 */
i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: translationEN },
            de: { translation: translationDE },
            el: { translation: translationEL }
        },
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
