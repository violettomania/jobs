import { createAsyncThunk } from '@reduxjs/toolkit';

import customFetch from '../../util/axiosWrapper';
import getCookie from '../../util/getCookie';

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
  async (user: { email: string; password: string }) => {
    try {
      const token = getCookie('token');
      const {
        data: { user: userData },
      }: { data: LoginSuccessResponse } = await customFetch.post(
        '/auth/login',
        user,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return userData;
    } catch (error: unknown) {
      const err = error as LoginErrorResponse;
      if (err.response?.data.msg) {
        throw new Error(err.response.data.msg);
      } else {
        throw new Error('An error occurred');
      }
    }
  }
);
