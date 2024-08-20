import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import Cookies from 'js-cookie';

i18n
    .use(Backend) // load translations using http (default public/assets/locals/en/translations)
    .use(initReactI18next) // pass the i18n instance to react-i18next.
    .init({
        backend: {
            loadPath: ''
        },

        fallbackLng: Cookies.get('lang') ? JSON.parse(Cookies.get('lang')).lang : 'en', // fallback language is german.
        
        debug: false,
        
        interpolation: {
            escapeValue: false, // no need for react. it escapes by default
            formatSeparator: ','
        },

        detection: {
            checkWhitelist: true, // options for language detection
        }
    });

export default i18n;
