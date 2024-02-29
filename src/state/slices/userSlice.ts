import { createSlice } from '@reduxjs/toolkit';

import { loginUser } from '../actions/loginUser';
import { registerUser } from '../actions/registerUser';

interface UserState {
  user: User;
  loading: boolean;
  registering: boolean;
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
  registering: false,
  loading: false,
  error: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setRegistering: (state, action) => {
      state.registering = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.registering = false;
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.registering = true;
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.registering = false;
        state.error = action.error.message;
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

export const { setRegistering } = userSlice.actions;

export default userSlice.reducer;
