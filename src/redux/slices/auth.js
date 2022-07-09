import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchSignin = createAsyncThunk(
  'auth/fetchSignin',
  async (params) => {
    const { data } = await axios.post('/signin', params);
    return data;
  }
);

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
  const { data } = await axios.get('/user/me');
  return data;
});

const initialState = {
  data: null,
  status: 'loading',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: {
    [fetchSignin.pending]: (state, action) => {
      state.data = null;
      state.status = 'loading';
    },
    [fetchSignin.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
    },
    [fetchSignin.rejected]: (state, action) => {
      state.data = null;
      state.status = 'error';
    },
    [fetchAuthMe.pending]: (state, action) => {
      state.data = null;
      state.status = 'loading';
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
    },
    [fetchAuthMe.rejected]: (state, action) => {
      state.data = null;
      state.status = 'error';
    },
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const { logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
