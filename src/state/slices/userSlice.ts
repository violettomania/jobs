import { createSlice } from '@reduxjs/toolkit';

import { loginUser } from '../actions/loginUser';
import { registerUser } from '../actions/registerUser';
import { updateUser } from '../actions/updateUser';

export interface UserState {
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

interface UpdateState {
  updated: boolean;
}

const initialState: UserState & RegisterState & LoginState & UpdateState = {
  user: null,
  loading: false,
  error: '',
  registerPending: false,
  loggedIn: false,
  updated: false,
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
    finishUserUpdate: (state) => {
      state.updated = false;
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
        state.error = action.payload as string;
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
        state.error = action.payload as string;
        state.loggedIn = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.updated = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload };
        state.loading = false;
        state.updated = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
        state.error = action.payload as string;
        state.updated = false;
      });
  },
});

export const { setRegisterPending, logout, resetUser, finishUserUpdate } =
  userSlice.actions;

export default userSlice.reducer;
