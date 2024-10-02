import { createSlice } from '@reduxjs/toolkit';
let io = createSlice({
  name: 'io',
  initialState: { onlineUsers: [] },
  reducers: {
    onlineUser: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
});
export let { onlineUser } = io.actions;
export default io.reducer;
