import { createSlice } from '@reduxjs/toolkit';

let user = createSlice({
  name: 'user',
  initialState: { user: {}, profile: {} },
  reducers: {
    currentUserInfo: (state, action) => {
      state.user = action.payload;
    },
    getProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
});
export let { currentUserInfo, getProfile } = user.actions;
export default user.reducer;
