import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


i18n
  .use(initReactI18next)
  .init({
    debug: false,
    resources: {
      en: {
        translation: {
          creating: 'Enter new channel name',
          editing: 'Edit channel',
          removing: 'Are you sure you want to remove the channel? All messages will be lost',
        },
      },
    },
    lng: 'en',
    keySeparator: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
