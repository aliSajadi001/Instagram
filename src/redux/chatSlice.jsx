import { createSlice } from '@reduxjs/toolkit';

let chat = createSlice({
  name: 'chat',
  initialState: { singleUser: {}, allChats: [] },
  reducers: {
    getSingleUser: (state, action) => {
      state.singleUser = action.payload;
    },
    getAllChats: (state, action) => {
      state.allChats = action.payload;
    },
  },
});
export let { getSingleUser, getAllChats } = chat.actions;
export default chat.reducer;
