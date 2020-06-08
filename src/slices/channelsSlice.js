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
    addNewChannel(state, { payload: { attributes: newChannel } }) {
      const { channels } = state;
      return {
        ...state,
        channels: [...channels, newChannel],
      };
    },
    removeChannel(state, { payload: { id } }) {
      const { channels, currentChannalId } = state;
      return {
        channels: channels.filter((channel) => channel.id !== id),
        currentChannalId: currentChannalId === id ? 1 : currentChannalId,
      };
    },
    editChannel(state, { payload: { id, attributes } }) {
      const { channels } = state;
      const index = channels.findIndex((channel) => channel.id === id);
      channels[index] = attributes;
    },
  },
});


export const { actions } = channelsSlice;

export default channelsSlice.reducer;
