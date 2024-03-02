import { createSlice } from '@reduxjs/toolkit';

import { loginUser } from '../actions/loginUser';
import { registerUser } from '../actions/registerUser';

interface UserState {
  user: User | null;
  loading: boolean;
  error?: string;
}

interface RegisterState {
  registerPending: boolean;
}

interface LoginState {
  loggedIn: boolean;
}

const initialState: UserState & RegisterState & LoginState = {
  user: null,
  loading: false,
  error: '',
  registerPending: false,
  loggedIn: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setRegisterPending: (state, action) => {
      state.registerPending = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.loggedIn = false;
    },
    resetUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.registerPending = false;
      state.loggedIn = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.registerPending = false;
        state.loggedIn = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.registerPending = true;
        state.loggedIn = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.registerPending = false;
        state.loggedIn = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.loggedIn = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.loggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.loggedIn = false;
      });
  },
});

export const { setRegisterPending, logout, resetUser } = userSlice.actions;

export default userSlice.reducer;
