// import { keyBy } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channelsInfo',
  initialState: { channels: [], currentChannalId: 1 },
  reducers: {
    initChannels(state, { payload: { channels } }) {
      return {
        ...state,
        channels,
      };
    },
    changeChannel(state, { payload: { id } }) {
      return {
        ...state,
        currentChannalId: id,
      };
    },
  },
});

export const { initChannels, changeChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
