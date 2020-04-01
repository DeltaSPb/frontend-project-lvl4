import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
// import thunk from 'redux-thunk';
import { createStore, compose } from 'redux';
import reducers from './reducers';
import App from './components/App';
import init from './actions';

/* eslint-disable no-underscore-dangle */
const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolMiddleware = ext && ext();

export default (data) => {
  const store = createStore(
    reducers,
    compose(
      devtoolMiddleware,
    ),
  );
  console.log('In index.jsx!');

  store.dispatch(init(data));

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('chat'),
  );
};
