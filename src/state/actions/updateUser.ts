import { createAsyncThunk } from '@reduxjs/toolkit';

import customFetch from '../../util/axiosWrapper';
import getCookie from '../../util/getCookie';

export const updateUser = createAsyncThunk(
  'user/update',
  async (user: {
    email: string;
    lastName: string;
    location: string;
    name: string;
  }) => {
    try {
      const token = getCookie('token');
      const response = await customFetch.patch('auth/updateUser', user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: unknown) {
      throw new Error('An error occurred');
    }
  }
);
