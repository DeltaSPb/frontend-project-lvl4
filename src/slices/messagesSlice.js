import { createSlice } from '@reduxjs/toolkit';
import { removeChannel } from './channelsSlice';

const messagesSlice = createSlice({
  name: 'massagesInfo',
  initialState: { messages: [] },
  reducers: {
    initMessages(state, { payload: { messages } }) {
      return {
        messages,
      };
    },
    addNewMessage(state, { payload: { attributes: newMessage } }) {
      const { messages } = state;
      return {
        messages: [...messages, newMessage],
      };
    },
  },
  extraReducers: {
    [removeChannel](state, { payload: { id: removedChannelId } }) {
      const { messages } = state;
      return {
        messages: messages.filter(({ channelId }) => channelId !== removedChannelId),
      };
    },
  },
});

export const { initMessages, addNewMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
