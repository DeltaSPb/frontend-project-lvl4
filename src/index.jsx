import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import io from 'socket.io-client';
import reducer, { actions } from './slices';
import App from './components/App';
import { UserContext, getUserName } from './utils';
import './i18n';


export default (data) => {
  const store = configureStore({
    reducer,
  });

  const socket = io();
  socket.on('newMessage', (response) => store.dispatch(actions.addNewMessage(response.data)));
  socket.on('newChannel', (response) => store.dispatch(actions.addNewChannel(response.data)));
  socket.on('removeChannel', (response) => {
    store.dispatch(actions.removeChannel(response.data));
    store.dispatch(actions.removeMessages(response.data));
  });
  socket.on('renameChannel', (response) => store.dispatch(actions.editChannel(response.data)));

  store.dispatch(actions.initChannels(data));
  store.dispatch(actions.initMessages(data));

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
