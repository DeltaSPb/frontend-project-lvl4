import { combineReducers } from 'redux';
import channelsReducer from '../features/channels/channelsSlice';
import messagesReducer from '../features/messages/messagesSlice';
import modalReducer from '../features/modalWindow/modalWindowSlice';


export default combineReducers({
  channelsInfo: channelsReducer,
  messagesInfo: messagesReducer,
  modalInfo: modalReducer,
});
