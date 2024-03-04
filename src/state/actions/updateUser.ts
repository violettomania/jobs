import { createAsyncThunk } from '@reduxjs/toolkit';

import customFetch from '../../util/axiosWrapper';

export const updateUser = createAsyncThunk(
  'user/update',
  async (
    user: {
      email: string;
      lastName: string;
      location: string;
      name: string;
      token: string;
    },
    thunkAPI
  ) => {
    try {
      const response = await customFetch.patch('auth/updateUser', user, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('An error occurred');
    }
  }
);
