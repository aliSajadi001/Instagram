import { createSlice } from '@reduxjs/toolkit';

let comment = createSlice({
  name: 'comment',
  initialState: { allcomments: [], singlePost: {}  },
  reducers: {
    allComments: (state, action) => {
      state.allcomments = action.payload;
    },
    getPost: (state, action) => {
      state.singlePost = action.payload;
    },
  },
});
export let { allComments, getPost } = comment.actions;
export default comment.reducer;
