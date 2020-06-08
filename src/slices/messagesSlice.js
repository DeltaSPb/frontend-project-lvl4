import { createSlice } from '@reduxjs/toolkit';

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
    removeMessages(state, { payload: { id: removedChannelId } }) {
      const { messages } = state;
      return {
        messages: messages.filter(({ channelId }) => channelId !== removedChannelId),
      };
    },
  },
});

export const { actions } = messagesSlice;

export default messagesSlice.reducer;
