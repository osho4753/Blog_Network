import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import config from "../../config";

export const fetchLogin = createAsyncThunk('auth/fetchLogin', async (params) => {
  const {data} = await config.post('/auth/login', params);
  return data;
});

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
    const {data} = await config.post('/auth/register', params);
    return data;
  });

export const fetchUser = createAsyncThunk('auth/fetchUser', async () => {
    const {data} = await config.get('/auth/me');
    return data;
  });
  

const initialState = {
  data: null,
  status:'loading',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers:{
    logout: (state)=>{
        state.data = null
    }
  },
  extraReducers: {
    [fetchLogin.pending]:(state,actions)=>{
      state.status = 'loading';
      state.data = null;
    },
    [fetchLogin.fulfilled]:(state,actions)=>{
      state.data = actions.payload
      state.status = 'loaded';
    },
    [fetchLogin.rejected]:(state,actions)=>{
        state.status = 'error';
        state.data = null;
    },
      [fetchRegister.pending]:(state,actions)=>{
        state.status = 'loading';
        state.data = null;
      },
      [fetchRegister.fulfilled]:(state,actions)=>{
        state.data = actions.payload
        state.status = 'loaded';
      },
      [fetchRegister.rejected]:(state,actions)=>{
          state.status = 'error';
          state.data = null;
      },
    [fetchUser.pending]:(state,actions)=>{
        state.status = 'loading';
        state.data = null;
      },
      [fetchUser.fulfilled]:(state,actions)=>{
        state.data = actions.payload
        state.status = 'loaded';
      },
      [fetchUser.rejected]:(state,actions)=>{
          state.status = 'error';
          state.data = null;
      },
  },
});

export const isAuth = state => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions

export const selectUserData = (state) => state.auth.data;
