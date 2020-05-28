import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import io from 'socket.io-client';
import reducers from './reducers';
import {
  initChannels, addNewChannel, removeChannel, editChannel,
} from './features/channels/channelsSlice.js';
import { initMessages, addNewMessage, removeMessages } from './features/messages/messagesSlice.js';
import App from './components/App';
import { UserContext, getUserName } from './utils';
import './i18n';


export default (data) => {
  const store = configureStore({
    reducer: reducers,
  });

  const socket = io();
  socket.on('newMessage', (response) => store.dispatch(addNewMessage(response.data)));
  socket.on('newChannel', (response) => store.dispatch(addNewChannel(response.data)));
  socket.on('removeChannel', (response) => {
    store.dispatch(removeChannel(response.data));
    store.dispatch(removeMessages(response.data));
  });
  socket.on('renameChannel', (response) => store.dispatch(editChannel(response.data)));

  store.dispatch(initChannels(data));
  store.dispatch(initMessages(data));

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
