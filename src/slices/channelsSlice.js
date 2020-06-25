import { createSlice } from '@reduxjs/toolkit';

const defaultChannelId = 1;

const channelsSlice = createSlice({
  name: 'channelsInfo',
  initialState: { channels: [], currentChannalId: defaultChannelId },
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
        currentChannalId: currentChannalId === id ? defaultChannelId : currentChannalId,
      };
    },
    editChannel(state, { payload: { id, attributes } }) {
      const { channels } = state;
      const index = channels.findIndex((channel) => channel.id === id);
      channels[index] = attributes;
    },
  },
});

export const {
  initChannels,
  changeChannel,
  addNewChannel,
  removeChannel,
  editChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
