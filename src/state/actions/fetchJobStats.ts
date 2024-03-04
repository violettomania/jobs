import { createAsyncThunk } from '@reduxjs/toolkit';

import customFetch from '../../util/axiosWrapper';

interface FetchJobStatsArg {
  token: string;
}

export const fetchJobStats = createAsyncThunk(
  'jobs/fetchJobStats',
  async ({ token }: FetchJobStatsArg, thunkAPI) => {
    try {
      const response = await customFetch.get('jobs/stats', {
        headers: {
          Authorization: `Bearer ${token}`,
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
