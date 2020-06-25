import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


i18n
  .use(initReactI18next)
  .init({
    debug: process.env.NODE_ENV !== 'production',
    resources: {
      en: {
        translation: {
          modalContent: {
            creating: 'Enter new channel name',
            editing: 'Edit channel',
            removing: 'Are you sure you want to remove the channel? All messages will be lost',
          },
          warnings: {
            min: 'This name is too short!',
            max: 'This name is too long!',
            channelRequired: 'name cannot be an empty string',
            messageRequired: 'cannot send an empty string',
          },
        },
      },
    },
    lng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
