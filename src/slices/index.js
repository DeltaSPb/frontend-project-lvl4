import { combineReducers } from 'redux';
import channelsReducer from './channelsSlice';
import messagesReducer from './messagesSlice';
import modalReducer from './modalWindowSlice';


export default combineReducers({
  channelsInfo: channelsReducer,
  messagesInfo: messagesReducer,
  modalInfo: modalReducer,
});
