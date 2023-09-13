import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import config from "../../config";

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await config.get('/posts');
  return data;
});


export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
  const { data } = await config.get('/tags');
  return data;
});

export const fetchPostsByTag = createAsyncThunk('posts/fetchPostsByTag', async (name) => {
  const { data } = await config.post(`/tags/${name}`);
  return data;
});


export const fetchDelete = createAsyncThunk('posts/fetchDelete', async (id) => {
  await config.delete(`/posts/${id}`);
});

const initialState = {
  posts: {
    items: [],
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  },
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    //Get all posts
    [fetchPosts.pending]:(state,actions)=>{
      state.posts.status = 'loading';
    },
    [fetchPosts.fulfilled]:(state,actions)=>{
      state.posts.items = actions.payload
      state.posts.status = 'loaded';
    },
    [fetchPosts.rejected]:(state,actions)=>{
      state.posts.items = [];
      state.posts.status = 'error';
    },
    //Get all tags
    [fetchTags.pending]:(state,actions)=>{
      state.tags.status = 'loading';
    },
    [fetchTags.fulfilled]:(state,actions)=>{
      state.tags.items = actions.payload
      state.tags.status = 'loaded';
    },
    [fetchTags.rejected]:(state,actions)=>{
      state.tags.items = [];
      state.tags.status = 'error';
    },
    //Delete post
    [fetchDelete.pending]:(state,actions)=>{
      state.posts.items = state.posts.items.filter(post=>post._id !== actions.meta.arg);
    },
    //Get posts By tagname
    [fetchPostsByTag.pending]: (state, actions) => {
      state.posts.status = 'loading';
    },
    [fetchPostsByTag.fulfilled]: (state, actions) => {
      state.posts.items = actions.payload;
      state.posts.status = 'loaded';
    },
    [fetchPostsByTag.rejected]: (state, actions) => {
      state.posts.items = [];
      state.posts.status = 'error';
    },    
  },
});

export const postReducer = postSlice.reducer;
