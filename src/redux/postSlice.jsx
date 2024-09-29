import { createSlice } from '@reduxjs/toolkit';

let post = createSlice({
  name: 'post',
  initialState: {
    post: [],
   

  },
  reducers: {
    allPost: (state, action) => {
      state.post =action.payload
    },
  },
});
export let {
  allPost

} = post.actions;
export default post.reducer;
