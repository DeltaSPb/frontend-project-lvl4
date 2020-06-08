import { createContext } from 'react';
import cookies from 'js-cookie';
import faker from 'faker';
import * as Yup from 'yup';

export const createUser = () => faker.name.findName();

export const setUserName = () => cookies.set('userName', createUser(), { expires: 1 });
export const getUserName = () => cookies.get('userName') || (setUserName() && cookies.get('userName'));

export const UserContext = createContext('unknownUser');

export const getCurrentTime = () => new Date().toLocaleTimeString();

export const validation = {
  channel: Yup.object().shape({
    channel: Yup.string()
      .trim()
      .min(1, 'This name is too short!')
      .max(16, 'This name is too long!')
      .required('name cannot be an empty string'),
  }),
  message: Yup.object().shape({
    message: Yup.string()
      .trim()
      .required('cannot send an empty string'),
  }),
};
