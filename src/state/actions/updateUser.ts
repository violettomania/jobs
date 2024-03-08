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
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
      }
      return thunkAPI.rejectWithValue('An error occurred');
    }
  }
);
