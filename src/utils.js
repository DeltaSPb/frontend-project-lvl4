import { createContext } from 'react';
import cookies from 'js-cookie';
import faker from 'faker';
import * as Yup from 'yup';
import i18 from './i18n';

export const createUser = () => faker.name.findName();

export const setUserName = () => cookies.get('userName') || cookies.set('userName', createUser(), { expires: 1 });
export const getUserName = () => cookies.get('userName');

export const UserContext = createContext('unknownUser');

export const getCurrentTime = () => new Date().toLocaleTimeString();

export const validation = {
  channel: Yup.object().shape({
    channel: Yup.string()
      .trim()
      .min(1, i18.t('warnings.min'))
      .max(16, i18.t('warnings.max'))
      .required(i18.t('warnings.channelRequired')),
  }),
  message: Yup.object().shape({
    message: Yup.string()
      .trim()
      .required(i18.t('warnings.messageRequired')),
  }),
};
