import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import io from 'socket.io-client';
import reducer from './slices';
import App from './components/App';
import { initMessages, addNewMessage } from './slices/messagesSlice';
import {
  initChannels, addNewChannel, editChannel, removeChannel,
} from './slices/channelsSlice';
import { UserContext, getUserName, setUserName } from './utils';
import './i18n';


export default (data) => {
  const store = configureStore({
    reducer,
  });

  const socket = io();
  socket.on('newMessage', (response) => store.dispatch(addNewMessage(response.data)));
  socket.on('newChannel', (response) => store.dispatch(addNewChannel(response.data)));
  socket.on('removeChannel', (response) => store.dispatch(removeChannel(response.data)));
  socket.on('renameChannel', (response) => store.dispatch(editChannel(response.data)));

  store.dispatch(initChannels(data));
  store.dispatch(initMessages(data));

  setUserName();
  const user = getUserName();

  render(
    <Provider store={store}>
      <UserContext.Provider value={user}>
        <App />
      </UserContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};
