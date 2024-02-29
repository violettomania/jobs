import { createSlice } from '@reduxjs/toolkit';

import { loginUser } from '../actions/loginUser';
import { registerUser } from '../actions/registerUser';

interface UserState {
  user: User;
  loading: boolean;
  registered: boolean;
  loggedIn: boolean;
  error?: string;
}

const initialState: UserState = {
  user: {
    email: '',
    lastName: '',
    location: '',
    name: '',
    token: '',
  },
  registered: false,
  loggedIn: false,
  loading: false,
  error: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.registered = false;
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.registered = true;
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.registered = false;
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.loggedIn = false;
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loggedIn = true;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loggedIn = false;
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
