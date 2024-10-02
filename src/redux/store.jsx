import { configureStore } from '@reduxjs/toolkit';

import user from './userSlice';
import post from './postSlice';
import comment from './commentSlice';
import chat from './chatSlice';
import io from './ioSlice';

let store = configureStore({
  reducer: {
    user: user,
    post: post,
    comment: comment,
    chat: chat,
    io: io,
  },
});

export default store;
