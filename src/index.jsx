import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
// import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import io from 'socket.io-client';
import reducers from './reducers';
import { initChannels } from './features/channels/channelsSlice.js';
import { initMessages, addNewMessage } from './features/messages/messagesSlice.js';
import App from './components/App';
import { UserContext, getUserName } from './utils';
// import init from './actions';

export default (data) => {
  const store = configureStore({
    reducer: reducers,
  });

  const socket = io();
  socket.on('newMessage', (response) => store.dispatch(addNewMessage(response.data)));

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
