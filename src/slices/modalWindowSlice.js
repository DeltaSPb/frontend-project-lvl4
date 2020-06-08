import { createSlice } from '@reduxjs/toolkit';

const modalWindowSlice = createSlice({
  name: 'modalDialog',
  initialState: { isOpened: false, type: null },
  reducers: {
    showModalWindow(state, { payload: { type, item } }) {
      return {
        isOpened: true,
        type,
        item,
      };
    },
    hideModalWindow() {
      return {
        isOpened: false,
        type: null,
      };
    },
  },
});

export const { actions } = modalWindowSlice;

export default modalWindowSlice.reducer;
