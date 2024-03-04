import { createAsyncThunk } from '@reduxjs/toolkit';

import customFetch from '../../util/axiosWrapper';

interface LoginErrorResponse {
  response?: {
    data: {
      msg: string;
    };
  };
}

interface LoginSuccessResponse {
  user: User;
}

export const loginUser = createAsyncThunk(
  'user/login',
  async (
    user: {
      email: string;
      password: string;
      token: string;
      isDemo?: boolean;
    },
    thunkAPI
  ) => {
    try {
      const {
        data: { user: userData },
      }: { data: LoginSuccessResponse } = await customFetch.post(
        'auth/login',
        user,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (user.isDemo) {
        userData.isDemo = true;
      }
      return userData;
    } catch (error: unknown) {
      const err = error as LoginErrorResponse;
      if (err.response?.data.msg) {
        return thunkAPI.rejectWithValue(err.response.data.msg);
      } else {
        return thunkAPI.rejectWithValue('An error occurred');
      }
    }
  }
);
