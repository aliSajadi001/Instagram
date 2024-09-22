import { configureStore } from '@reduxjs/toolkit';

import user from './userSlice';
let store = configureStore({
  reducer: {
    user: user,
  },
});

export default store;
