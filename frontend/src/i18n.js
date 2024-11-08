import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Übersetzungsdateien importieren
import translationEN from './Translations/en.json';
import translationDE from './Translations/de.json';
import translationEL from './Translations/el.json';

i18n
    .use(LanguageDetector)   // Spracherkennung
    .use(initReactI18next)    // Integration mit React
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
