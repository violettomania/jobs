import { createAsyncThunk } from '@reduxjs/toolkit';

import customFetch from '../../util/axiosWrapper';

interface RegistrationErrorResponse {
  response?: {
    data: {
      msg: string;
    };
  };
}

interface RegistrationSuccessResponse {
  user: User;
}

export const registerUser = createAsyncThunk(
  'user/register',
  async (user: { name: string; email: string; password: string }, thunkAPI) => {
    try {
      const {
        data: { user: userData },
      }: { data: RegistrationSuccessResponse } = await customFetch.post(
        '/auth/register',
        user
      );
      return userData;
    } catch (error: unknown) {
      const err = error as RegistrationErrorResponse;
      if (err.response?.data.msg) {
        return thunkAPI.rejectWithValue(err.response.data.msg);
      } else {
        return thunkAPI.rejectWithValue('An error occurred');
      }
    }
  }
);
