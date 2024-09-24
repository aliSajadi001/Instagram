import { configureStore } from '@reduxjs/toolkit';

import user from './userSlice';
import post from './postSlice';
let store = configureStore({
  reducer: {
    user: user,
    post: post,
  },
});

export default store;
