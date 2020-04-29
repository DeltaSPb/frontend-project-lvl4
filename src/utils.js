import { createContext } from 'react';
import cookies from 'js-cookie';
import faker from 'faker';

export const createUser = () => faker.name.findName();

export const setUserName = () => cookies.set('userName', createUser(), { expires: 1 });
export const getUserName = () => cookies.get('userName') || (setUserName() && cookies.get('userName'));

export const UserContext = createContext('unknownUser');

export const getCurrentTime = () => new Date().toLocaleTimeString();
