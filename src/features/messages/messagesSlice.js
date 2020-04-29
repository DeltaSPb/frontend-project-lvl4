// import { keyBy, uniqueId } from 'lodash';
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
    addNewMessage(state, { payload }) {
      const { messages } = state;
      const { attributes } = payload;
      return {
        messages: [...messages, attributes],
        // messages: [attributes, ...messages],

      };
    },
  },
});

export const { initMessages, addNewMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
