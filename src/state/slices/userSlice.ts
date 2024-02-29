import { createSlice } from '@reduxjs/toolkit';

import { loginUser } from '../actions/loginUser';
import { registerUser } from '../actions/registerUser';

interface UserState {
  user: User;
  loading: boolean;
  error?: string;
}

interface RedirectState {
  redirectToLogin: boolean;
}

const initialState: UserState & RedirectState = {
  user: {
    email: '',
    lastName: '',
    location: '',
    name: '',
    token: '',
  },
  loading: false,
  error: '',
  redirectToLogin: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    redirect: (state, action) => {
      state.redirectToLogin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.redirectToLogin = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.redirectToLogin = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.redirectToLogin = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { redirect } = userSlice.actions;

export default userSlice.reducer;
