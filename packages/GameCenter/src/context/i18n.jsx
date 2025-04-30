import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from '../locales/translations/en.json';
import tr from '../locales/translations/tr.json';
import de from '../locales/translations/de.json';
import { storage } from '../utils/storage';

const savedLanguage = storage.getString('language'); 
const initialLanguage = savedLanguage || 'en'; 

i18n.use(initReactI18next).init({
  lng: initialLanguage,
  fallbackLng: 'en',
  resources: {
    en: { translation: en },
    tr: { translation: tr },
    de: { translation: de },
  },
  interpolation: {
    escapeValue: false
  }
});

export default i18n;