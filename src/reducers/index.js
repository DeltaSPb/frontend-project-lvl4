import { keyBy } from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import init from '../actions';

const channels = handleActions({
  [init](state, { payload }) {
    return {
      byId: keyBy(payload.channels, 'id'),
      allIds: payload.channels.map(({ id }) => id),
    };
  },
}, { byId: {}, allIds: [] });


export default combineReducers({
  channels,
//   messages,
});
