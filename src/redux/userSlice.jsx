import { createSlice } from '@reduxjs/toolkit';

let user = createSlice({
  name: 'user',
  initialState: { user: {}, profile: {}, loading: false },
  reducers: {
    currentUserInfo: (state, action) => {
      state.user = action.payload;
    },
    getProfile: (state, action) => {
      state.profile = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});
export let { currentUserInfo, getProfile, setLoading } = user.actions;
export default user.reducer;
