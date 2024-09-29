import { configureStore } from '@reduxjs/toolkit';

import user from './userSlice';
import post from './postSlice';
import comment from './commentSlice';
let store = configureStore({
  reducer: {
    user: user,
    post: post,
    comment: comment,
  },
});

export default store;
