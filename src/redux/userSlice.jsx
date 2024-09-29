import { createSlice } from '@reduxjs/toolkit';

let user = createSlice({
  name: 'user',
  initialState: {
    user: {},
    profile: {},
    loading: false,
    suggestUsers: [],
    storis: [],
  },
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
    getSuggestUser: (state, action) => {
      state.suggestUsers = action.payload;
    },
    getStoris: (state, action) => {
      state.storis = action.payload;
    },
  },
});
export let {
  currentUserInfo,
  getProfile,
  setLoading,
  getSuggestUser,
  getStoris,
} = user.actions;
export default user.reducer;
