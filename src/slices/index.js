import { combineReducers } from 'redux';
import channelsReducer, { actions as channelsActions } from './channelsSlice';
import messagesReducer, { actions as messagesActions } from './messagesSlice';
import modalReducer, { actions as modalActions } from './modalWindowSlice';


export default combineReducers({
  channelsInfo: channelsReducer,
  messagesInfo: messagesReducer,
  modalInfo: modalReducer,
});

export const actions = {
  ...channelsActions,
  ...messagesActions,
  ...modalActions,
};
